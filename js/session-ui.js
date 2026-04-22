import { getExerciseCatalog } from './exercises.js';
import { saveHistoryEntry } from './history.js';
import { localizedText, t } from './i18n.js';
import { getRouteParams } from './router.js';
import {
  createWorkoutSession,
  restoreActiveWorkoutSession,
  SESSION_STATUSES,
} from './session.js';
import { refreshStore, setRoute } from './state.js';
import {
  clamp,
  escapeAttribute,
  escapeHtml,
  formatCalories,
  formatClock,
  normalizeString,
  setText,
} from './utils.js';
import { getWorkouts } from './workouts.js';

const TIME_ADJUSTMENT_SEC = 10;
const RATING_OPTIONS = [
  { value: '1', emoji: '😐' },
  { value: '2', emoji: '🙂' },
  { value: '3', emoji: '😅' },
  { value: '4', emoji: '😵' },
  { value: '5', emoji: '🤮' },
];

let activeSession = null;
let activeWorkoutId = '';

export function initWorkoutRunUi(state) {
  const root = document.querySelector('[data-session-root]');

  if (!root || state.route !== 'workout-run') {
    pauseActiveSessionOnRouteExit();
    return;
  }

  const workoutId = root.dataset.workoutId || getRouteParams().id;
  const exercises = getExerciseCatalog(state);
  const workout = getWorkouts().find((item) => item.id === workoutId);

  if (!workout) {
    return;
  }

  if (activeSession && activeWorkoutId !== workoutId && activeSession.isActive()) {
    activeSession.pause();
  }

  if (!activeSession || activeWorkoutId !== workoutId) {
    activeSession = createOrRestoreSession(workout, exercises, state, workoutId);
    activeWorkoutId = workoutId;
    activeSession.start();
  }

  bindSessionControls(root, state);
  renderSessionSnapshot(root, activeSession.getSnapshot(), state);
}

function createOrRestoreSession(workout, exercises, state, workoutId) {
  const hooks = createSessionHooks(state);
  const restored = restoreActiveWorkoutSession(exercises, {
    ...hooks,
    autoStartTimer: true,
  });

  if (restored?.workout?.id === workoutId) {
    return restored;
  }

  return createWorkoutSession(workout, exercises, hooks);
}

function pauseActiveSessionOnRouteExit() {
  if (!activeSession?.isActive?.()) {
    return;
  }

  const snapshot = activeSession.getSnapshot();

  if (snapshot.status === SESSION_STATUSES.RUNNING) {
    activeSession.pause();
  }
}

function createSessionHooks(state) {
  return {
    onTick: (snapshot) => updateSessionUi(snapshot, state),
    onStepChange: (snapshot) => {
      updateSessionUi(snapshot, state);
    },
    onPhaseChange: (snapshot) => {
      updateSessionUi(snapshot, state);
    },
    onWorkoutComplete: (snapshot) => {
      updateSessionUi(snapshot, state);
    },
    onWorkoutAbort: (snapshot) => {
      updateSessionUi(snapshot, state);
    },
  };
}

function bindSessionControls(root, state) {
  if (root.dataset.sessionControlsBound === 'true') {
    return;
  }

  root.dataset.sessionControlsBound = 'true';
  root.addEventListener('click', (event) => {
    const button = event.target.closest('[data-session-action]');

    if (!button || !activeSession) {
      return;
    }

    const action = button.dataset.sessionAction;

    if (action === 'pause-resume') {
      const snapshot = activeSession.getSnapshot();
      if (snapshot.status === SESSION_STATUSES.PAUSED) {
        activeSession.resume();
      } else {
        activeSession.pause();
      }
    } else if (action === 'skip') {
      activeSession.skipCurrentStep();
    } else if (action === 'add-time') {
      activeSession.addTime(TIME_ADJUSTMENT_SEC);
    } else if (action === 'subtract-time') {
      activeSession.subtractTime(TIME_ADJUSTMENT_SEC);
    } else if (action === 'abort' && window.confirm(t(state, 'sessionAbortConfirm'))) {
      activeSession.abort();
    }

    renderSessionSnapshot(root, activeSession.getSnapshot(), state);
  });

  root.addEventListener('submit', (event) => {
    const form = event.target.closest('[data-session-finish-form]');

    if (!form || !activeSession) {
      return;
    }

    event.preventDefault();
    handleFinishFormSubmit(form, activeSession.getSnapshot(), state);
  });
}

function updateSessionUi(snapshot, state) {
  const root = document.querySelector('[data-session-root]');

  if (!root) {
    return;
  }

  renderSessionSnapshot(root, snapshot, state);
}

function renderSessionSnapshot(root, snapshot, state) {
  const currentStep = snapshot.currentStep;
  const nextStep = getNextStep(snapshot);
  const currentPhase = snapshot.currentPhase;
  const currentRemainingSec = currentPhase?.type === 'rep'
    ? currentPhase.remainingSec
    : currentStep?.remainingSec ?? 0;
  const progressPercent = Math.round(clamp(snapshot.progress, 0, 1) * 100);

  setText(root, '[data-session-exercise]', getStepExerciseName(currentStep, state));
  setText(root, '[data-session-step-kind]', getStepKindLabel(currentStep, state));
  setText(root, '[data-session-sets]', formatSetCounter(currentStep, state));
  setText(root, '[data-session-reps]', formatRepCounter(currentStep, currentPhase, state));
  setText(root, '[data-session-phase]', getPhaseLabel(currentPhase, state));
  setText(root, '[data-session-current-time]', formatClock(currentRemainingSec));
  setText(root, '[data-session-total-time]', formatClock(snapshot.elapsedSec));
  setText(root, '[data-session-progress-value]', `${progressPercent}%`);
  setText(root, '[data-session-next]', formatNextStep(nextStep, state));
  setText(root, '[data-session-status]', getStatusLabel(snapshot.status, state));

  const progress = root.querySelector('[data-session-progress]');
  if (progress) {
    progress.style.width = `${progressPercent}%`;
    progress.closest('[role="progressbar"]')?.setAttribute('aria-valuenow', String(progressPercent));
  }

  const pauseResume = root.querySelector('[data-session-action="pause-resume"]');
  if (pauseResume) {
    pauseResume.textContent = snapshot.status === SESSION_STATUSES.PAUSED
      ? t(state, 'sessionResume')
      : t(state, 'sessionPause');
  }

  const isFinished = isTerminal(snapshot.status);
  root.querySelectorAll('[data-session-action]').forEach((button) => {
    button.disabled = isFinished;
  });

  renderFinishScreen(root, snapshot, state);
}

function renderFinishScreen(root, snapshot, state) {
  const finish = root.querySelector('[data-session-finish]');

  if (!finish) {
    return;
  }

  if (!isTerminal(snapshot.status)) {
    finish.hidden = true;
    finish.innerHTML = '';
    return;
  }

  const summary = buildSessionSummary(snapshot);

  finish.hidden = false;
  finish.innerHTML = `
    <form class="session-finish__form" data-session-finish-form>
      <div class="session-finish__header">
        <div>
          <h2>${t(state, 'sessionFinishTitle')}</h2>
          <p class="muted">${t(state, 'sessionFinishHint')}</p>
        </div>
        <span class="session-finish__status session-finish__status--${escapeAttribute(snapshot.status)}">${escapeHtml(getStatusLabel(snapshot.status, state))}</span>
      </div>

      <div class="session-finish__stats">
        ${renderFinishStat(t(state, 'sessionFinishDuration'), formatClock(summary.durationSec))}
        ${renderFinishStat(t(state, 'sessionFinishExercises'), summary.totalExercisesCompleted)}
        ${renderFinishStat(t(state, 'sessionFinishSets'), summary.totalSetsCompleted)}
        ${renderFinishStat(t(state, 'sessionFinishCalories'), formatCalories(summary.estimatedCaloriesBurned))}
      </div>

      <label class="field session-finish__note" for="session-finish-note">
        <span>${t(state, 'sessionFinishNote')}</span>
        <textarea id="session-finish-note" name="note" rows="4" placeholder="${escapeAttribute(t(state, 'sessionFinishNotePlaceholder'))}"></textarea>
      </label>

      <fieldset class="session-rating">
        <legend>${t(state, 'sessionFinishRating')}</legend>
        <div class="session-rating__options">
          ${RATING_OPTIONS.map((option, index) => `
            <label class="session-rating__option">
              <input class="sr-only" type="radio" name="ratingEmoji" value="${escapeAttribute(option.emoji)}" ${index === 1 ? 'checked' : ''}>
              <span aria-hidden="true">${option.emoji}</span>
              <small>${option.value}</small>
            </label>
          `).join('')}
        </div>
      </fieldset>

      <p class="notice" data-session-finish-status role="status" aria-live="polite"></p>

      <div class="toolbar">
        <button class="button button--primary" type="submit">${t(state, 'sessionFinishSave')}</button>
      </div>
    </form>
  `;
}

function renderFinishStat(label, value) {
  return `
    <article class="session-finish__stat">
      <strong>${escapeHtml(value)}</strong>
      <span>${escapeHtml(label)}</span>
    </article>
  `;
}

function handleFinishFormSubmit(form, snapshot, state) {
  if (!isTerminal(snapshot.status)) {
    return;
  }

  const submitButton = form.querySelector('button[type="submit"]');
  const status = form.querySelector('[data-session-finish-status]');
  const formData = new FormData(form);
  const summary = buildSessionSummary(snapshot);

  submitButton?.setAttribute('disabled', 'true');

  try {
    saveHistoryEntry({
      workoutId: snapshot.workout?.id || '',
      workoutTitleSnapshot: snapshot.workout?.title || t(state, 'workoutViewTitle'),
      startedAt: snapshot.startedAt,
      endedAt: snapshot.endedAt || new Date().toISOString(),
      durationSec: summary.durationSec,
      status: snapshot.status === SESSION_STATUSES.ABORTED ? 'aborted' : 'completed',
      completedItems: summary.completedItems,
      note: normalizeString(formData.get('note')),
      ratingEmoji: normalizeString(formData.get('ratingEmoji')),
      estimatedCaloriesBurned: summary.estimatedCaloriesBurned,
      totalExercisesCompleted: summary.totalExercisesCompleted,
      totalSetsCompleted: summary.totalSetsCompleted,
    });

    activeSession = null;
    activeWorkoutId = '';
    window.location.hash = 'home';
    setRoute('home');
    refreshStore();
  } catch (error) {
    if (status) {
      status.textContent = error.message || t(state, 'sessionFinishSaveFailed');
      status.dataset.type = 'error';
    }
    submitButton?.removeAttribute('disabled');
  }
}

function buildSessionSummary(snapshot) {
  const completedExerciseSteps = getCompletedExerciseSteps(snapshot);
  const completedByItem = completedExerciseSteps.reduce((items, step) => {
    const key = step.workoutItemId || step.id;
    const current = items.get(key) || {
      workoutItemId: step.workoutItemId || '',
      exerciseId: step.exerciseId || '',
      exerciseNameSnapshot: step.exercise?.name || '',
      setsCompleted: 0,
      repsCompleted: null,
      durationSec: null,
      skipped: false,
      note: step.notes || '',
      estimatedCaloriesBurned: 0,
    };

    current.setsCompleted += 1;

    if (step.executionMode === 'reps') {
      current.repsCompleted = (current.repsCompleted || 0) + Math.max(0, Number(step.reps) || 0);
    } else {
      current.durationSec = (current.durationSec || 0) + Math.max(0, Number(step.durationSec) || 0);
    }

    current.estimatedCaloriesBurned += getStepCalories(step);
    items.set(key, current);
    return items;
  }, new Map());

  const completedItems = Array.from(completedByItem.values()).map((item) => ({
    workoutItemId: item.workoutItemId,
    exerciseId: item.exerciseId,
    exerciseNameSnapshot: item.exerciseNameSnapshot,
    setsCompleted: item.setsCompleted,
    repsCompleted: item.repsCompleted,
    durationSec: item.durationSec,
    skipped: item.skipped,
    note: item.note,
  }));

  return {
    durationSec: Math.max(0, Math.round(Number(snapshot.elapsedSec) || 0)),
    completedItems,
    estimatedCaloriesBurned: roundToOneDecimal(
      Array.from(completedByItem.values()).reduce((total, item) => total + item.estimatedCaloriesBurned, 0),
    ),
    totalExercisesCompleted: completedItems.length,
    totalSetsCompleted: completedItems.reduce((total, item) => total + item.setsCompleted, 0),
  };
}

function getCompletedExerciseSteps(snapshot) {
  const steps = Array.isArray(snapshot.steps) ? snapshot.steps : [];
  const currentStepIndex = Number.isInteger(snapshot.currentStepIndex) ? snapshot.currentStepIndex : steps.length;
  const completedThroughIndex = snapshot.status === SESSION_STATUSES.COMPLETED
    ? steps.length
    : Math.max(0, currentStepIndex);

  return steps
    .slice(0, completedThroughIndex)
    .filter((step) => step?.type === 'exercise');
}

function getStepCalories(step) {
  const caloriesPerMinute = Math.max(0, Number(step.exercise?.estimatedCalories) || 0);
  const durationSec = Math.max(0, Number(step.durationSec) || 0);
  return (durationSec / 60) * caloriesPerMinute;
}

function roundToOneDecimal(value) {
  return Math.round(Math.max(0, Number(value) || 0) * 10) / 10;
}

function getNextStep(snapshot) {
  const nextIndex = snapshot.currentStepIndex + 1;
  return snapshot.steps?.[nextIndex] || null;
}

function getStepExerciseName(step, state) {
  if (!step) {
    return t(state, 'sessionFinished');
  }

  return localizedText(step.exercise?.name, state.settings.language) || step.exerciseId || t(state, 'emptyValue');
}

function getStepKindLabel(step, state) {
  if (!step) {
    return t(state, 'sessionNoCurrentStep');
  }

  if (step.type === 'exercise') {
    return t(state, 'sessionExerciseStep');
  }

  if (step.type === 'rest-between-sets') {
    return t(state, 'sessionRestBetweenSets');
  }

  return t(state, 'sessionRestBetweenExercises');
}

function formatSetCounter(step, state) {
  if (!step?.setNumber || !step?.totalSets) {
    return t(state, 'sessionNotApplicable');
  }

  return `${step.setNumber} / ${step.totalSets}`;
}

function formatRepCounter(step, phase, state) {
  if (!step || step.executionMode !== 'reps' || !step.reps) {
    return t(state, 'sessionNotApplicable');
  }

  const repNumber = phase?.repNumber || Math.min(
    step.reps,
    Math.floor((step.elapsedSec || 0) / Math.max(1, step.effort?.repDurationSec || 1)) + 1,
  );

  return `${repNumber} / ${step.reps}`;
}

function getPhaseLabel(phase, state) {
  if (!phase) {
    return t(state, 'emptyValue');
  }

  return t(state, `sessionPhase_${phase.key}`) || phase.name || phase.key;
}

function formatNextStep(step, state) {
  if (!step) {
    return t(state, 'sessionNoNextStep');
  }

  const name = getStepExerciseName(step, state);
  const kind = getStepKindLabel(step, state);
  return `${kind}: ${name}`;
}

function getStatusLabel(status, state) {
  return t(state, `sessionStatus_${status}`) || status;
}

function isTerminal(status) {
  return status === SESSION_STATUSES.COMPLETED || status === SESSION_STATUSES.ABORTED;
}

import { normalizeFormString } from './form-utils.js';

export function applyExerciseCatalogFilters() {
  const searchInput = document.querySelector('[data-exercises-search]');
  const typeSelect = document.querySelector('[data-exercises-type-filter]');
  const muscleSelect = document.querySelector('[data-exercises-muscle-filter]');
  const list = document.querySelector('[data-exercise-list]');
  const noResults = document.querySelector('[data-exercise-no-results]');

  if (!list) return;

  const query = normalizeFormString(searchInput?.value).toLowerCase().trim();
  const type = normalizeFormString(typeSelect?.value).toLowerCase();
  const muscle = normalizeFormString(muscleSelect?.value).toLowerCase();

  const cards = Array.from(list.querySelectorAll('.exercise-card'));
  let visibleCount = 0;

  cards.forEach(card => {
    const searchText = (card.dataset.exerciseSearch || '').toLowerCase();
    const cardType = (card.dataset.exerciseType || '').toLowerCase();
    const muscles = card.dataset.exerciseMuscles ? card.dataset.exerciseMuscles.split('|') : [];

    const matchesQuery = !query || searchText.includes(query);
    const matchesType = !type || cardType === type;
    const matchesMuscle = !muscle || muscles.includes(muscle);

    const visible = matchesQuery && matchesType && matchesMuscle;
    card.style.display = visible ? 'block' : 'none';

    if (visible) visibleCount++;
  });

  if (noResults) noResults.hidden = visibleCount > 0;
}

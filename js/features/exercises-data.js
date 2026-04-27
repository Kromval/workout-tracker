// Generated from data/exercises.json. Keep this module static so built-in exercises work without fetch or a server.
export const builtInExerciseRecords = [
  {
    id: 'push-ups',
    slug: 'push-ups',
    names: {
      ru: 'Отжимания',
      en: 'Push-ups',
    },
    aliases: ['press-up', 'floor-push-up'],
    classification: {
      modality: 'strength',
      exerciseFamily: 'push-up',
      movementPatterns: ['horizontal-push'],
      difficulty: 'beginner',
      equipment: ['bodyweight'],
      bodyPosition: 'prone',
      laterality: 'bilateral',
    },
    mechanics: {
      executionMode: 'reps',
      tempo: {
        eccentric: 2,
        pauseBottom: 0,
        concentric: 1,
        pauseTop: 0,
      },
      rangeOfMotion: 'full-controlled',
      loadType: 'bodyweight',
    },
    muscles: {
      primary: ['chest', 'triceps'],
      secondary: ['shoulders', 'core'],
      stabilizers: ['shoulders', 'upper-back', 'glutes'],
      jointActions: [
        'elbow-extension',
        'shoulder-horizontal-adduction',
        'scapular-protraction',
        'core-anti-extension',
      ],
    },
    technique: {
      setup: {
        ru: 'Поставьте ладони немного шире плеч, вытяните ноги назад и упритесь носками в пол. Напрягите пресс и ягодицы, чтобы тело образовало прямую линию от головы до пяток.',
        en: 'Place your hands slightly wider than shoulder-width, extend your legs back, and support yourself on your toes. Brace your core and glutes so your body forms a straight line from head to heels.',
      },
      steps: {
        ru: 'Из исходного положения согните локти и опускайтесь контролируемо, сохраняя корпус ровным. Доведите грудь близко к полу без провала в пояснице, затем оттолкнитесь ладонями и вернитесь в верхнее положение.',
        en: 'From the starting position, bend your elbows and lower with control while keeping your body straight. Bring your chest close to the floor without sagging through the lower back, then press through your hands to return to the top.',
      },
      keyCues: {
        ru: 'Тело — одной линией; локти направлены слегка назад; ладони активно отталкивают пол; пресс и ягодицы напряжены.',
        en: 'Keep one straight body line; angle the elbows slightly back; push the floor away; keep the core and glutes engaged.',
      },
      commonErrors: {
        ru: 'Провисание поясницы, слишком широкое разведение локтей, неполная амплитуда, запрокидывание головы, потеря контроля в нижней фазе.',
        en: 'Sagging the lower back, flaring the elbows too wide, using a partial range of motion, lifting the head, and losing control at the bottom.',
      },
      breathing: {
        ru: 'Вдыхайте при опускании и выдыхайте при отжимании вверх.',
        en: 'Inhale as you lower and exhale as you press back up.',
      },
    },
    dosage: {
      strength: {
        sets: '2-4',
        reps: '5-8',
        restSec: '90-150',
      },
      hypertrophy: {
        sets: '2-4',
        reps: '8-12',
        restSec: '60-120',
      },
      endurance: {
        sets: '2-3',
        reps: '12-20',
        restSec: '30-60',
      },
    },
    safety: {
      contraindications: ['joint-wrist-pain', 'joint-shoulder-impingement'],
      precautions: [
        'keep-wrists-stacked-under-hands',
        'avoid-lower-back-sagging',
        'reduce-range-if-shoulder-discomfort',
        'stop-if-sharp-pain',
      ],
      impactLevel: 'low',
    },
    progression: {
      regressions: ['incline-push-up', 'knee-push-up', 'wall-push-up'],
      progressions: ['decline-push-up', 'diamond-push-up', 'tempo-push-up'],
      alternatives: ['bench-press', 'dumbbell-chest-press', 'chest-press-machine'],
    },
    media: {
      images: [],
      videos: [],
      thumbnail: '',
    },
  },
  {
    id: 'squats',
    slug: 'squats',
    names: {
      ru: 'Приседания',
      en: 'Squats',
    },
    aliases: ['bodyweight-squat', 'air-squat'],
    classification: {
      modality: 'strength',
      exerciseFamily: 'squat',
      movementPatterns: ['squat'],
      difficulty: 'beginner',
      equipment: ['bodyweight'],
      bodyPosition: 'standing',
      laterality: 'bilateral',
    },
    mechanics: {
      executionMode: 'reps',
      tempo: {
        eccentric: 2,
        pauseBottom: 0,
        concentric: 1,
        pauseTop: 0,
      },
      rangeOfMotion: 'full-controlled',
      loadType: 'bodyweight',
    },
    muscles: {
      primary: ['quads', 'glutes'],
      secondary: ['hamstrings', 'core'],
      stabilizers: ['adductors', 'calves', 'lower-back'],
      jointActions: [
        'hip-flexion',
        'hip-extension',
        'knee-flexion',
        'knee-extension',
        'ankle-dorsiflexion',
        'ankle-plantar-flexion',
      ],
    },
    technique: {
      setup: {
        ru: 'Встаньте прямо, стопы примерно на ширине плеч, носки слегка развернуты наружу. Распределите вес по всей стопе и слегка напрягите корпус.',
        en: 'Stand tall with your feet about shoulder-width apart and toes slightly turned out. Distribute your weight across the whole foot and lightly brace your core.',
      },
      steps: {
        ru: 'Отведите таз назад и согните колени, опускаясь в присед с нейтральной спиной. Направляйте колени по линии стоп, затем оттолкнитесь всей стопой от пола и вернитесь в положение стоя.',
        en: 'Send your hips back and bend your knees, lowering into a squat with a neutral spine. Track your knees in line with your feet, then press through the whole foot to stand back up.',
      },
      keyCues: {
        ru: 'Грудь раскрыта; колени следуют за носками; пятки остаются на полу; спина нейтральная; движение контролируемое.',
        en: 'Keep the chest open; knees track with the toes; heels stay down; spine stays neutral; move with control.',
      },
      commonErrors: {
        ru: 'Заваливание коленей внутрь, отрыв пяток, округление спины, слишком быстрый спуск, перенос веса только на носки.',
        en: 'Knees collapsing inward, heels lifting, rounding the back, dropping too fast, and shifting all weight onto the toes.',
      },
      breathing: {
        ru: 'Вдыхайте при опускании и выдыхайте при подъеме.',
        en: 'Inhale as you lower and exhale as you stand up.',
      },
    },
    dosage: {
      strength: {
        sets: '2-4',
        reps: '5-8',
        restSec: '90-150',
      },
      hypertrophy: {
        sets: '2-4',
        reps: '8-12',
        restSec: '60-120',
      },
      endurance: {
        sets: '2-3',
        reps: '12-20',
        restSec: '30-60',
      },
    },
    safety: {
      contraindications: ['joint-knee-pain', 'region-lower-back-pain'],
      precautions: [
        'keep-knees-tracking-over-feet',
        'avoid-forcing-depth',
        'maintain-neutral-spine',
        'stop-if-sharp-pain',
      ],
      impactLevel: 'low',
    },
    progression: {
      regressions: ['box-squat', 'chair-squat', 'assisted-squat'],
      progressions: ['goblet-squat', 'tempo-squat', 'jump-squat'],
      alternatives: ['leg-press', 'split-squat', 'step-up'],
    },
    media: {
      images: [],
      videos: [],
      thumbnail: '',
    },
  },
  {
    id: 'plank',
    slug: 'plank',
    names: {
      ru: 'Планка',
      en: 'Plank',
    },
    aliases: ['forearm-plank', 'front-plank'],
    classification: {
      modality: 'static',
      exerciseFamily: 'plank',
      movementPatterns: ['core-anti-extension'],
      difficulty: 'beginner',
      equipment: ['bodyweight'],
      bodyPosition: 'prone',
      laterality: 'bilateral',
    },
    mechanics: {
      executionMode: 'hold',
      tempo: {
        eccentric: 0,
        pauseBottom: 0,
        concentric: 0,
        pauseTop: 0,
      },
      rangeOfMotion: 'full-controlled',
      loadType: 'bodyweight',
    },
    muscles: {
      primary: ['core'],
      secondary: ['shoulders'],
      stabilizers: ['glutes', 'quads', 'upper-back', 'lower-back'],
      jointActions: [
        'core-anti-extension',
        'scapular-protraction',
        'shoulder-stabilization',
        'hip-extension-isometric',
      ],
    },
    technique: {
      setup: {
        ru: 'Лягте лицом вниз и поставьте локти под плечи. Вытяните ноги назад, упритесь носками в пол и слегка напрягите пресс, ягодицы и бедра.',
        en: 'Lie face down and place your elbows under your shoulders. Extend your legs back, support yourself on your toes, and lightly brace your core, glutes, and thighs.',
      },
      steps: {
        ru: 'Поднимите корпус от пола и удерживайте прямую линию от плеч до пяток. Не допускайте провала в пояснице или подъема таза слишком высоко, сохраняйте ровное дыхание.',
        en: 'Lift your body off the floor and hold a straight line from shoulders to heels. Avoid sagging through the lower back or lifting the hips too high, and keep breathing steadily.',
      },
      keyCues: {
        ru: 'Локти под плечами; ребра подтянуты; таз в нейтрали; ягодицы напряжены; шея продолжает линию позвоночника.',
        en: 'Elbows under shoulders; ribs pulled down; pelvis neutral; glutes engaged; neck aligned with the spine.',
      },
      commonErrors: {
        ru: 'Провисание поясницы, слишком высокий таз, задержка дыхания, напряжение шеи, перенос веса далеко назад.',
        en: 'Lower-back sagging, hips too high, holding the breath, neck tension, and shifting the weight too far back.',
      },
      breathing: {
        ru: 'Дышите спокойно и ритмично, не задерживайте дыхание во время удержания.',
        en: 'Breathe calmly and rhythmically; do not hold your breath during the hold.',
      },
    },
    dosage: {
      strength: {
        sets: '2-4',
        reps: '5-8',
        restSec: '90-150',
      },
      hypertrophy: {
        sets: '2-4',
        reps: '8-12',
        restSec: '60-120',
      },
      endurance: {
        sets: '2-3',
        reps: '12-20',
        restSec: '30-60',
      },
    },
    safety: {
      contraindications: ['region-lower-back-pain', 'joint-shoulder-irritation'],
      precautions: [
        'avoid-lower-back-sagging',
        'keep-elbows-under-shoulders',
        'reduce-hold-time-if-form-breaks',
        'stop-if-sharp-pain',
      ],
      impactLevel: 'low',
    },
    progression: {
      regressions: ['knee-plank', 'incline-plank', 'short-lever-plank'],
      progressions: ['long-lever-plank', 'plank-with-leg-lift', 'weighted-plank'],
      alternatives: ['dead-bug', 'hollow-hold', 'bird-dog'],
    },
    media: {
      images: [],
      videos: [],
      thumbnail: '',
    },
  },
  {
    id: 'jumping-jacks',
    slug: 'jumping-jacks',
    names: {
      ru: 'Прыжки Jumping Jacks',
      en: 'Jumping Jacks',
    },
    aliases: ['star-jumps', 'side-straddle-hop'],
    classification: {
      modality: 'cardio',
      exerciseFamily: 'jumping-jack',
      movementPatterns: ['cardio', 'full-body-dynamic'],
      difficulty: 'beginner',
      equipment: ['bodyweight'],
      bodyPosition: 'standing',
      laterality: 'bilateral',
    },
    mechanics: {
      executionMode: 'time',
      tempo: {
        eccentric: 0,
        pauseBottom: 0,
        concentric: 0,
        pauseTop: 0,
      },
      rangeOfMotion: 'full-controlled',
      loadType: 'bodyweight',
    },
    muscles: {
      primary: ['full-body'],
      secondary: ['shoulders', 'calves', 'glutes', 'adductors', 'abductors'],
      stabilizers: ['core', 'quads', 'hamstrings'],
      jointActions: [
        'shoulder-abduction',
        'shoulder-adduction',
        'hip-abduction',
        'hip-adduction',
        'ankle-plantar-flexion',
        'knee-extension',
      ],
    },
    technique: {
      setup: {
        ru: 'Встаньте прямо, стопы вместе, руки опущены вдоль тела. Слегка согните колени и подготовьтесь к мягкому приземлению.',
        en: 'Stand tall with your feet together and arms by your sides. Slightly bend your knees and prepare to land softly.',
      },
      steps: {
        ru: 'Одновременно подпрыгните, разведите ноги в стороны и поднимите руки над головой. Затем мягко подпрыгните обратно, сведите стопы вместе и опустите руки, сохраняя ровный ритм.',
        en: 'Jump lightly, move your feet out to the sides, and raise your arms overhead at the same time. Then jump back softly, bring your feet together, and lower your arms while keeping a steady rhythm.',
      },
      keyCues: {
        ru: 'Приземляйтесь мягко; держите корпус высоким; двигайтесь ритмично; колени остаются слегка согнутыми; руки и ноги работают синхронно.',
        en: 'Land softly; keep the torso tall; move rhythmically; keep the knees slightly bent; coordinate arms and legs.',
      },
      commonErrors: {
        ru: 'Жесткое приземление на прямые ноги, потеря ритма, сутулость, слишком широкий шаг, задержка дыхания.',
        en: 'Landing hard on straight legs, losing rhythm, slouching, jumping too wide, and holding the breath.',
      },
      breathing: {
        ru: 'Дышите ритмично в темпе движения, не задерживайте дыхание.',
        en: 'Breathe rhythmically with the movement and avoid holding your breath.',
      },
    },
    dosage: {
      strength: {
        sets: '3-5',
        reps: '20-40 sec',
        restSec: '90-180',
      },
      hypertrophy: {
        sets: '2-4',
        reps: '30-60 sec',
        restSec: '60-120',
      },
      endurance: {
        sets: '2-4',
        reps: '45-90 sec',
        restSec: '30-60',
      },
    },
    safety: {
      contraindications: ['joint-ankle-instability', 'joint-knee-instability'],
      precautions: [
        'land-softly',
        'keep-knees-slightly-bent',
        'use-low-impact-option-if-needed',
        'stop-if-sharp-pain',
      ],
      impactLevel: 'medium',
    },
    progression: {
      regressions: ['step-jack', 'low-impact-jumping-jack', 'marching-jack'],
      progressions: ['power-jumping-jack', 'squat-jack', 'cross-jack'],
      alternatives: ['high-knees', 'march-in-place', 'skater-steps'],
    },
    media: {
      images: [],
      videos: [],
      thumbnail: '',
    },
  },
  {
    id: 'lunges',
    slug: 'lunges',
    names: {
      ru: 'Выпады',
      en: 'Lunges',
    },
    aliases: ['forward-lunge', 'bodyweight-lunge'],
    classification: {
      modality: 'strength',
      exerciseFamily: 'lunge',
      movementPatterns: ['lunge'],
      difficulty: 'beginner',
      equipment: ['bodyweight'],
      bodyPosition: 'standing',
      laterality: 'bilateral',
    },
    mechanics: {
      executionMode: 'reps',
      tempo: {
        eccentric: 2,
        pauseBottom: 0,
        concentric: 1,
        pauseTop: 0,
      },
      rangeOfMotion: 'full-controlled',
      loadType: 'bodyweight',
    },
    muscles: {
      primary: ['quads', 'glutes'],
      secondary: ['hamstrings'],
      stabilizers: ['core', 'adductors', 'calves', 'abductors'],
      jointActions: [
        'hip-flexion',
        'hip-extension',
        'knee-flexion',
        'knee-extension',
        'ankle-dorsiflexion',
        'ankle-plantar-flexion',
      ],
    },
    technique: {
      setup: {
        ru: 'Встаньте прямо, стопы на ширине таза, корпус высокий. Напрягите пресс и выберите точку перед собой для устойчивости.',
        en: 'Stand tall with your feet hip-width apart. Brace your core and focus on a point in front of you for balance.',
      },
      steps: {
        ru: 'Шагните вперед и опуститесь контролируемо, пока оба колена не согнутся примерно до 90 градусов. Держите переднее колено по линии стопы, затем оттолкнитесь передней ногой и вернитесь в исходное положение.',
        en: 'Step forward and lower with control until both knees are bent to about 90 degrees. Keep the front knee tracking with the foot, then push through the front leg to return to the starting position.',
      },
      keyCues: {
        ru: 'Корпус высокий; передняя стопа полностью на полу; колено следует за стопой; шаг достаточно длинный; движение без рывков.',
        en: 'Keep the torso tall; keep the front foot flat; knee tracks with the foot; use a long enough step; move without jerking.',
      },
      commonErrors: {
        ru: 'Заваливание переднего колена внутрь, слишком короткий шаг, отрыв пятки передней ноги, наклон корпуса вперед, потеря баланса.',
        en: 'Front knee collapsing inward, stepping too short, lifting the front heel, leaning the torso forward, and losing balance.',
      },
      breathing: {
        ru: 'Вдыхайте при опускании и выдыхайте при возвращении в стойку.',
        en: 'Inhale as you lower and exhale as you return to standing.',
      },
    },
    dosage: {
      strength: {
        sets: '2-4',
        reps: '5-8',
        restSec: '90-150',
      },
      hypertrophy: {
        sets: '2-4',
        reps: '8-12',
        restSec: '60-120',
      },
      endurance: {
        sets: '2-3',
        reps: '12-20',
        restSec: '30-60',
      },
    },
    safety: {
      contraindications: ['joint-knee-pain', 'joint-ankle-instability'],
      precautions: [
        'keep-front-knee-tracking-over-foot',
        'use-controlled-step-length',
        'avoid-bouncing-at-bottom',
        'stop-if-sharp-pain',
      ],
      impactLevel: 'low',
    },
    progression: {
      regressions: ['assisted-lunge', 'split-squat', 'reverse-lunge'],
      progressions: ['walking-lunge', 'dumbbell-lunge', 'jump-lunge'],
      alternatives: ['step-up', 'split-squat', 'single-leg-leg-press'],
    },
    media: {
      images: [],
      videos: [],
      thumbnail: '',
    },
  },
  {
    id: 'burpees',
    slug: 'burpees',
    names: {
      ru: 'Берпи',
      en: 'Burpees',
    },
    aliases: ['burpee-jump', 'full-body-burpee'],
    classification: {
      modality: 'cardio',
      exerciseFamily: 'burpee',
      movementPatterns: ['full-body-dynamic', 'cardio'],
      difficulty: 'intermediate',
      equipment: ['bodyweight'],
      bodyPosition: 'standing',
      laterality: 'bilateral',
    },
    mechanics: {
      executionMode: 'reps',
      tempo: {
        eccentric: 2,
        pauseBottom: 0,
        concentric: 1,
        pauseTop: 0,
      },
      rangeOfMotion: 'full',
      loadType: 'bodyweight',
    },
    muscles: {
      primary: ['full-body'],
      secondary: ['core'],
      stabilizers: ['core', 'shoulders'],
      jointActions: [
        'hip-flexion',
        'hip-extension',
        'knee-flexion',
        'knee-extension',
        'shoulder-flexion',
        'elbow-extension',
      ],
    },
    technique: {
      setup: {
        ru: 'Встаньте прямо, ноги на ширине плеч, корпус напряжен.',
        en: 'Stand upright with feet shoulder-width apart and core braced.',
      },
      steps: {
        ru: 'Присядьте и поставьте руки на пол. Отпрыгните ногами назад в упор лежа и выполните отжимание. Затем прыжком подтяните ноги обратно к рукам и выпрыгните вверх, поднимая руки над головой.',
        en: 'Squat down and place your hands on the floor. Jump your feet back into a plank and perform a push-up. Jump your feet back toward your hands and explosively jump up with arms overhead.',
      },
      keyCues: {
        ru: 'Держите корпус напряженным, мягко приземляйтесь, двигайтесь плавно и контролируемо.',
        en: 'Keep your core tight, land softly, and move smoothly with control.',
      },
      commonErrors: {
        ru: 'Провисание в пояснице, жесткое приземление, неполное разгибание в прыжке.',
        en: 'Sagging lower back, hard landings, and not fully extending during the jump.',
      },
      breathing: {
        ru: 'Вдох при опускании вниз, выдох при подъеме и прыжке.',
        en: 'Inhale on the way down, exhale as you push up and jump.',
      },
    },
    dosage: {
      strength: {
        sets: '3-5',
        reps: '4-8',
        restSec: '90-180',
      },
      hypertrophy: {
        sets: '2-4',
        reps: '6-15',
        restSec: '60-120',
      },
      endurance: {
        sets: '2-4',
        reps: '12-20',
        restSec: '30-60',
      },
    },
    safety: {
      contraindications: ['joint-wrist-pain', 'joint-knee-pain', 'joint-shoulder-irritation'],
      precautions: ['avoid-hard-landings', 'maintain-neutral-spine', 'use-controlled-pace'],
      impactLevel: 'high',
    },
    progression: {
      regressions: ['step-back-burpee', 'no-push-up-burpee', 'half-burpee'],
      progressions: ['burpee-with-tuck-jump', 'burpee-pull-up', 'single-leg-burpee'],
      alternatives: ['jump-squat', 'thrusters', 'mountain-climbers'],
    },
    media: {
      images: [],
      videos: [],
      thumbnail: '',
    },
  },
  {
    id: 'mountain-climbers',
    slug: 'mountain-climbers',
    names: {
      ru: 'Скалолазы',
      en: 'Mountain Climbers',
    },
    aliases: ['running-plank', 'plank-knee-drives'],
    classification: {
      modality: 'cardio',
      exerciseFamily: 'plank',
      movementPatterns: ['core-anti-extension', 'cardio'],
      difficulty: 'beginner',
      equipment: ['bodyweight'],
      bodyPosition: 'prone',
      laterality: 'bilateral',
    },
    mechanics: {
      executionMode: 'time',
      tempo: {
        eccentric: 0,
        pauseBottom: 0,
        concentric: 0,
        pauseTop: 0,
      },
      rangeOfMotion: 'dynamic',
      loadType: 'bodyweight',
    },
    muscles: {
      primary: ['core'],
      secondary: ['shoulders'],
      stabilizers: ['core', 'glutes'],
      jointActions: ['hip-flexion', 'shoulder-stabilization'],
    },
    technique: {
      setup: {
        ru: 'Примите положение планки на прямых руках, тело выпрямлено в линию.',
        en: 'Start in a high plank position with your body in a straight line.',
      },
      steps: {
        ru: 'Из положения планки поочередно подтягивайте колени к груди в быстром темпе, сохраняя стабильное положение корпуса.',
        en: 'From a plank position, alternately drive your knees toward your chest at a quick pace while keeping your torso stable.',
      },
      keyCues: {
        ru: 'Держите корпус жестким, не поднимайте таз, двигайте ноги быстро и ритмично.',
        en: 'Keep your core tight, avoid lifting hips, and move your legs quickly and rhythmically.',
      },
      commonErrors: {
        ru: 'Провисание поясницы, чрезмерное поднятие таза, потеря контроля корпуса.',
        en: 'Sagging lower back, hips too high, and losing core control.',
      },
      breathing: {
        ru: 'Дышите ровно, не задерживайте дыхание.',
        en: 'Breathe steadily and avoid holding your breath.',
      },
    },
    dosage: {
      strength: {
        sets: '3-5',
        reps: '20-40 sec',
        restSec: '90-180',
      },
      hypertrophy: {
        sets: '2-4',
        reps: '30-60 sec',
        restSec: '60-120',
      },
      endurance: {
        sets: '2-4',
        reps: '45-90 sec',
        restSec: '30-60',
      },
    },
    safety: {
      contraindications: ['joint-wrist-pain', 'joint-shoulder-irritation'],
      precautions: ['maintain-neutral-spine', 'avoid-excessive-speed', 'use-stable-surface'],
      impactLevel: 'medium',
    },
    progression: {
      regressions: ['slow-mountain-climbers', 'elevated-hands-mountain-climbers'],
      progressions: [
        'cross-body-mountain-climbers',
        'sliding-mountain-climbers',
        'spiderman-climbers',
      ],
      alternatives: ['high-knees', 'plank', 'burpees'],
    },
    media: {
      images: [],
      videos: [],
      thumbnail: '',
    },
  },
  {
    id: 'glute-bridge',
    slug: 'glute-bridge',
    names: {
      ru: 'Ягодичный мостик',
      en: 'Glute Bridge',
    },
    aliases: ['hip-bridge', 'floor-glute-bridge'],
    classification: {
      modality: 'strength',
      exerciseFamily: 'bridge',
      movementPatterns: ['hinge'],
      difficulty: 'beginner',
      equipment: ['bodyweight'],
      bodyPosition: 'supine',
      laterality: 'bilateral',
    },
    mechanics: {
      executionMode: 'reps',
      tempo: {
        eccentric: 2,
        pauseBottom: 1,
        concentric: 1,
        pauseTop: 0,
      },
      rangeOfMotion: 'full',
      loadType: 'bodyweight',
    },
    muscles: {
      primary: ['glutes'],
      secondary: ['hamstrings', 'core'],
      stabilizers: ['core'],
      jointActions: ['hip-extension'],
    },
    technique: {
      setup: {
        ru: 'Лягте на спину, согните ноги в коленях, стопы на полу на ширине таза.',
        en: 'Lie on your back with knees bent and feet flat on the floor hip-width apart.',
      },
      steps: {
        ru: 'Упритесь пятками в пол и поднимите таз вверх, сжимая ягодицы. В верхней точке сделайте короткую паузу и медленно опуститесь обратно.',
        en: 'Drive through your heels to lift your hips up while squeezing your glutes. Pause briefly at the top, then lower back down with control.',
      },
      keyCues: {
        ru: 'Сжимайте ягодицы вверху, не прогибайтесь в пояснице, держите корпус стабильным.',
        en: 'Squeeze your glutes at the top, avoid arching your lower back, and keep your torso stable.',
      },
      commonErrors: {
        ru: 'Переразгибание поясницы, недостаточная активация ягодиц, слишком быстрые движения.',
        en: 'Overarching the lower back, not engaging glutes, and moving too quickly.',
      },
      breathing: {
        ru: 'Выдох при подъеме таза, вдох при опускании.',
        en: 'Exhale as you lift your hips, inhale as you lower down.',
      },
    },
    dosage: {
      strength: {
        sets: '2-4',
        reps: '5-8',
        restSec: '90-150',
      },
      hypertrophy: {
        sets: '2-4',
        reps: '8-12',
        restSec: '60-120',
      },
      endurance: {
        sets: '2-3',
        reps: '12-20',
        restSec: '30-60',
      },
    },
    safety: {
      contraindications: ['region-lower-back-pain'],
      precautions: ['avoid-overextension', 'engage-core', 'control-movement'],
      impactLevel: 'low',
    },
    progression: {
      regressions: ['partial-range-glute-bridge', 'supported-glute-bridge'],
      progressions: ['single-leg-glute-bridge', 'weighted-glute-bridge', 'hip-thrust'],
      alternatives: ['hip-thrust', 'deadlift', 'kettlebell-swing'],
    },
    media: {
      images: [],
      videos: [],
      thumbnail: '',
    },
  },
  {
    id: 'bicycle-crunch',
    slug: 'bicycle-crunch',
    names: {
      ru: 'Велосипед',
      en: 'Bicycle Crunches',
    },
    aliases: ['bicycle-ab-crunch', 'alternating-crunch'],
    classification: {
      modality: 'strength',
      exerciseFamily: 'crunch',
      movementPatterns: ['core-rotation'],
      difficulty: 'beginner',
      equipment: ['bodyweight'],
      bodyPosition: 'supine',
      laterality: 'bilateral',
    },
    mechanics: {
      executionMode: 'reps',
      tempo: {
        eccentric: 2,
        pauseBottom: 0,
        concentric: 1,
        pauseTop: 0,
      },
      rangeOfMotion: 'full',
      loadType: 'bodyweight',
    },
    muscles: {
      primary: ['core', 'obliques'],
      secondary: ['hip-flexors'],
      stabilizers: ['core'],
      jointActions: ['spinal-flexion', 'spinal-rotation', 'hip-flexion'],
    },
    technique: {
      setup: {
        ru: 'Лягте на спину, руки за головой, ноги приподняты.',
        en: 'Lie on your back with hands behind your head and legs lifted.',
      },
      steps: {
        ru: 'Поднимите лопатки от пола и поочередно подтягивайте противоположное колено к локтю, выполняя скручивание корпуса.',
        en: 'Lift your shoulder blades off the floor and alternately bring opposite knee to elbow while rotating your torso.',
      },
      keyCues: {
        ru: 'Двигайтесь медленно, контролируйте корпус, не тяните шею руками.',
        en: 'Move slowly, control your torso, and avoid pulling on your neck.',
      },
      commonErrors: {
        ru: 'Рывки, напряжение в шее, слишком быстрый темп.',
        en: 'Jerky movements, neck strain, and going too fast.',
      },
      breathing: {
        ru: 'Выдох при скручивании, вдох при возвращении.',
        en: 'Exhale during the twist, inhale as you return.',
      },
    },
    dosage: {
      strength: {
        sets: '2-4',
        reps: '5-8',
        restSec: '90-150',
      },
      hypertrophy: {
        sets: '2-4',
        reps: '8-12',
        restSec: '60-120',
      },
      endurance: {
        sets: '2-3',
        reps: '12-20',
        restSec: '30-60',
      },
    },
    safety: {
      contraindications: ['region-neck-pain'],
      precautions: ['support-head-lightly', 'avoid-neck-strain', 'control-rotation'],
      impactLevel: 'low',
    },
    progression: {
      regressions: ['basic-crunch', 'heel-taps'],
      progressions: ['weighted-bicycle-crunch', 'slow-tempo-bicycle-crunch'],
      alternatives: ['russian-twists', 'plank', 'leg-raises'],
    },
    media: {
      images: [],
      videos: [],
      thumbnail: '',
    },
  },
  {
    id: 'leg-raise',
    slug: 'leg-raise',
    names: {
      ru: 'Подъемы ног',
      en: 'Leg Raises',
    },
    aliases: ['lying-leg-raise', 'straight-leg-raise'],
    classification: {
      modality: 'strength',
      exerciseFamily: 'raise',
      movementPatterns: ['core-anti-extension'],
      difficulty: 'beginner',
      equipment: ['bodyweight'],
      bodyPosition: 'supine',
      laterality: 'bilateral',
    },
    mechanics: {
      executionMode: 'reps',
      tempo: {
        eccentric: 2,
        pauseBottom: 0,
        concentric: 1,
        pauseTop: 0,
      },
      rangeOfMotion: 'full',
      loadType: 'bodyweight',
    },
    muscles: {
      primary: ['core'],
      secondary: ['hip-flexors'],
      stabilizers: ['core'],
      jointActions: ['hip-flexion'],
    },
    technique: {
      setup: {
        ru: 'Лягте на спину, руки вдоль тела или под тазом для поддержки.',
        en: 'Lie on your back with arms by your sides or under your hips for support.',
      },
      steps: {
        ru: 'Поднимите прямые ноги вверх до вертикального положения, затем медленно опустите их, не отрывая поясницу от пола.',
        en: 'Raise your straight legs up to a vertical position, then slowly lower them without letting your lower back lift off the floor.',
      },
      keyCues: {
        ru: 'Держите поясницу прижатой к полу, контролируйте движение, не используйте инерцию.',
        en: 'Keep your lower back pressed down, control the movement, and avoid momentum.',
      },
      commonErrors: {
        ru: 'Прогиб в пояснице, резкое опускание ног, использование инерции.',
        en: 'Arching the lower back, dropping legs too fast, and using momentum.',
      },
      breathing: {
        ru: 'Выдох при подъеме ног, вдох при опускании.',
        en: 'Exhale as you lift your legs, inhale as you lower them.',
      },
    },
    dosage: {
      strength: {
        sets: '2-4',
        reps: '5-8',
        restSec: '90-150',
      },
      hypertrophy: {
        sets: '2-4',
        reps: '8-12',
        restSec: '60-120',
      },
      endurance: {
        sets: '2-3',
        reps: '12-20',
        restSec: '30-60',
      },
    },
    safety: {
      contraindications: ['region-lower-back-pain'],
      precautions: ['maintain-lower-back-contact', 'control-descent', 'avoid-swinging'],
      impactLevel: 'low',
    },
    progression: {
      regressions: ['bent-knee-leg-raise', 'partial-range-leg-raise'],
      progressions: ['hanging-leg-raise', 'weighted-leg-raise', 'toes-to-bar'],
      alternatives: ['reverse-crunch', 'dead-bug', 'plank'],
    },
    media: {
      images: [],
      videos: [],
      thumbnail: '',
    },
  },
  {
    id: 'superman',
    slug: 'superman',
    names: {
      ru: 'Супермен',
      en: 'Superman',
    },
    aliases: ['prone-superman', 'back-extension-hold'],
    classification: {
      modality: 'strength',
      exerciseFamily: 'extension',
      movementPatterns: ['core-anti-extension', 'back-extension'],
      difficulty: 'beginner',
      equipment: ['bodyweight'],
      bodyPosition: 'prone',
      laterality: 'bilateral',
    },
    mechanics: {
      executionMode: 'reps',
      tempo: {
        eccentric: 2,
        pauseBottom: 1,
        concentric: 1,
        pauseTop: 0,
      },
      rangeOfMotion: 'full-controlled',
      loadType: 'bodyweight',
    },
    muscles: {
      primary: ['back', 'glutes'],
      secondary: ['shoulders'],
      stabilizers: ['core'],
      jointActions: ['spine-extension', 'hip-extension', 'shoulder-flexion'],
    },
    technique: {
      setup: {
        ru: 'Лягте на живот, вытяните руки вперед и выпрямите ноги. Лоб направлен к полу, корпус расслаблен.',
        en: 'Lie face down with arms extended overhead and legs straight. Keep your forehead toward the floor and body relaxed.',
      },
      steps: {
        ru: 'Лежа на животе, одновременно поднимите руки, грудь и ноги. Задержитесь на мгновение в верхней точке и медленно опуститесь обратно.',
        en: 'Lie face down, lift arms, chest, and legs simultaneously. Pause briefly at the top, then lower under control.',
      },
      keyCues: {
        ru: 'Тянитесь руками и ногами в противоположные стороны; держите шею нейтральной; поднимайтесь за счет спины и ягодиц.',
        en: 'Reach long through arms and legs; keep neck neutral; lift using back and glutes, not momentum.',
      },
      commonErrors: {
        ru: 'Переразгибание шеи; резкие рывки; чрезмерный прогиб в пояснице; недостаточный контроль при опускании.',
        en: 'Overextending the neck; jerking movements; excessive lower back arch; lack of control on the way down.',
      },
      breathing: {
        ru: 'Выдох при подъеме, вдох при возвращении в исходное положение.',
        en: 'Exhale as you lift, inhale as you return to the start.',
      },
    },
    dosage: {
      strength: {
        sets: '2-4',
        reps: '5-8',
        restSec: '90-150',
      },
      hypertrophy: {
        sets: '2-4',
        reps: '8-12',
        restSec: '60-120',
      },
      endurance: {
        sets: '2-3',
        reps: '12-20',
        restSec: '30-60',
      },
    },
    safety: {
      contraindications: ['region-lower-back-pain'],
      precautions: [
        'avoid-excessive-lumbar-arch',
        'maintain-neutral-neck',
        'use-controlled-movement',
      ],
      impactLevel: 'low',
    },
    progression: {
      regressions: ['arm-only-lifts', 'leg-only-lifts', 'partial-range-superman'],
      progressions: ['superman-hold', 'alternating-superman', 'weighted-superman'],
      alternatives: ['bird-dog', 'back-extension', 'reverse-hyperextension'],
    },
    media: {
      images: [],
      videos: [],
      thumbnail: '',
    },
  },
  {
    id: 'high-knees',
    slug: 'high-knees',
    names: {
      ru: 'Высокие колени',
      en: 'High Knees',
    },
    aliases: ['running-in-place', 'high-knee-run'],
    classification: {
      modality: 'cardio',
      exerciseFamily: 'run',
      movementPatterns: ['cardio', 'full-body-dynamic'],
      difficulty: 'beginner',
      equipment: ['bodyweight'],
      bodyPosition: 'standing',
      laterality: 'bilateral',
    },
    mechanics: {
      executionMode: 'time',
      tempo: {
        eccentric: 0,
        pauseBottom: 0,
        concentric: 0,
        pauseTop: 0,
      },
      rangeOfMotion: 'full-controlled',
      loadType: 'bodyweight',
    },
    muscles: {
      primary: ['full-body'],
      secondary: ['quads', 'hip-flexors', 'calves'],
      stabilizers: ['core'],
      jointActions: ['hip-flexion', 'knee-flexion', 'ankle-plantarflexion'],
    },
    technique: {
      setup: {
        ru: 'Встаньте прямо, ноги на ширине плеч, руки согнуты в локтях как при беге.',
        en: 'Stand upright with feet hip-width apart and arms bent as if running.',
      },
      steps: {
        ru: 'Бегите на месте, высоко поднимая колени к груди. Двигайте руками в ритме бега и поддерживайте быстрый темп.',
        en: 'Run in place, lifting knees high toward chest. Pump your arms and maintain a quick rhythm.',
      },
      keyCues: {
        ru: 'Поднимайте колени до уровня бедер; держите корпус прямо; приземляйтесь мягко на носки.',
        en: 'Lift knees to hip height; keep torso upright; land softly on the balls of your feet.',
      },
      commonErrors: {
        ru: 'Сутулость; низкое поднятие коленей; жесткое приземление; потеря ритма.',
        en: 'Slouching; low knee lift; hard landings; inconsistent rhythm.',
      },
      breathing: {
        ru: 'Дышите ритмично и глубоко, не задерживайте дыхание.',
        en: 'Breathe rhythmically and deeply, avoid holding your breath.',
      },
    },
    dosage: {
      strength: {
        sets: '3-5',
        reps: '20-40 sec',
        restSec: '90-180',
      },
      hypertrophy: {
        sets: '2-4',
        reps: '30-60 sec',
        restSec: '60-120',
      },
      endurance: {
        sets: '2-4',
        reps: '45-90 sec',
        restSec: '30-60',
      },
    },
    safety: {
      contraindications: ['joint-knee-instability', 'joint-ankle-instability'],
      precautions: ['land-softly', 'use-supportive-footwear', 'avoid-hard-surfaces'],
      impactLevel: 'high',
    },
    progression: {
      regressions: ['marching-high-knees', 'slow-tempo-high-knees'],
      progressions: ['high-knees-sprint', 'high-knees-with-resistance-band'],
      alternatives: ['jumping-jacks', 'butt-kicks', 'mountain-climbers'],
    },
    media: {
      images: [],
      videos: [],
      thumbnail: '',
    },
  },
  {
    id: 'russian-twists',
    slug: 'russian-twists',
    names: {
      ru: 'Русские скручивания',
      en: 'Russian Twists',
    },
    aliases: ['seated-twist', 'torso-rotation'],
    classification: {
      modality: 'strength',
      exerciseFamily: 'rotation',
      movementPatterns: ['core-rotation'],
      difficulty: 'beginner',
      equipment: ['bodyweight'],
      bodyPosition: 'seated',
      laterality: 'bilateral',
    },
    mechanics: {
      executionMode: 'reps',
      tempo: {
        eccentric: 2,
        pauseBottom: 0,
        concentric: 1,
        pauseTop: 0,
      },
      rangeOfMotion: 'full-controlled',
      loadType: 'bodyweight',
    },
    muscles: {
      primary: ['core', 'obliques'],
      secondary: ['hip-flexors'],
      stabilizers: ['lower-back'],
      jointActions: ['spine-rotation', 'spine-flexion'],
    },
    technique: {
      setup: {
        ru: 'Сядьте на пол, согните колени, слегка отклонитесь назад, держите спину прямой.',
        en: 'Sit on the floor with knees bent, lean back slightly, and keep your back straight.',
      },
      steps: {
        ru: 'Сидя, откиньтесь назад и поворачивайте корпус из стороны в сторону, контролируя движение и сохраняя напряжение в корпусе.',
        en: 'Sit with knees bent, lean back, and rotate torso side to side with control, keeping the core engaged.',
      },
      keyCues: {
        ru: 'Держите корпус напряженным; вращайте корпус, а не только руки; сохраняйте прямую спину.',
        en: 'Keep core tight; rotate through the torso, not just the arms; maintain a straight back.',
      },
      commonErrors: {
        ru: 'Сутулость; вращение только руками; слишком быстрый темп; потеря контроля.',
        en: 'Rounding the back; rotating only arms; moving too fast; losing control.',
      },
      breathing: {
        ru: 'Выдыхайте при повороте, вдыхайте при возвращении в центр.',
        en: 'Exhale as you rotate, inhale as you return to center.',
      },
    },
    dosage: {
      strength: {
        sets: '2-4',
        reps: '5-8',
        restSec: '90-150',
      },
      hypertrophy: {
        sets: '2-4',
        reps: '8-12',
        restSec: '60-120',
      },
      endurance: {
        sets: '2-3',
        reps: '12-20',
        restSec: '30-60',
      },
    },
    safety: {
      contraindications: ['region-lower-back-pain'],
      precautions: ['avoid-excessive-spine-flexion', 'move-with-control', 'keep-neutral-spine'],
      impactLevel: 'low',
    },
    progression: {
      regressions: ['feet-on-floor-twists', 'reduced-range-twists'],
      progressions: ['weighted-russian-twists', 'feet-elevated-twists'],
      alternatives: ['bicycle-crunches', 'plank-rotation', 'woodchoppers'],
    },
    media: {
      images: [],
      videos: [],
      thumbnail: '',
    },
  },
  {
    id: 'wall-sit',
    slug: 'wall-sit',
    names: {
      ru: 'Приседание у стены',
      en: 'Wall Sit',
    },
    aliases: ['wall-squat-hold', 'isometric-wall-sit'],
    classification: {
      modality: 'static',
      exerciseFamily: 'squat',
      movementPatterns: ['squat', 'isometric'],
      difficulty: 'beginner',
      equipment: ['bodyweight'],
      bodyPosition: 'standing',
      laterality: 'bilateral',
    },
    mechanics: {
      executionMode: 'hold',
      tempo: {
        eccentric: 0,
        pauseBottom: 0,
        concentric: 0,
        pauseTop: 0,
      },
      rangeOfMotion: 'full-controlled',
      loadType: 'bodyweight',
    },
    muscles: {
      primary: ['quads'],
      secondary: ['glutes'],
      stabilizers: ['core'],
      jointActions: ['knee-flexion', 'hip-flexion'],
    },
    technique: {
      setup: {
        ru: 'Встаньте спиной к стене, ноги на ширине плеч, немного впереди корпуса.',
        en: 'Stand with your back against a wall, feet shoulder-width apart and slightly forward.',
      },
      steps: {
        ru: 'Прислонитесь спиной к стене и опуститесь, как будто сидите на стуле. Удерживайте позицию с углом в коленях около 90 градусов.',
        en: 'Lean back against wall and lower into a seated position. Hold with knees at about 90 degrees.',
      },
      keyCues: {
        ru: 'Держите спину прижатой к стене; колени над стопами; вес на пятках.',
        en: 'Keep back flat against wall; knees over feet; weight through heels.',
      },
      commonErrors: {
        ru: 'Колени выходят за носки; отрыв спины от стены; слишком высокий или низкий угол.',
        en: 'Knees going past toes; back lifting off wall; incorrect depth.',
      },
      breathing: {
        ru: 'Дышите спокойно и равномерно на протяжении удержания.',
        en: 'Breathe steadily and calmly throughout the hold.',
      },
    },
    dosage: {
      strength: {
        sets: '2-4',
        reps: '5-8',
        restSec: '90-150',
      },
      hypertrophy: {
        sets: '2-4',
        reps: '8-12',
        restSec: '60-120',
      },
      endurance: {
        sets: '2-3',
        reps: '12-20',
        restSec: '30-60',
      },
    },
    safety: {
      contraindications: ['joint-knee-pain'],
      precautions: ['avoid-deep-knee-angle-if-pain', 'keep-knees-aligned', 'use-flat-surface'],
      impactLevel: 'low',
    },
    progression: {
      regressions: ['higher-wall-sit', 'short-duration-hold'],
      progressions: ['single-leg-wall-sit', 'weighted-wall-sit'],
      alternatives: ['bodyweight-squat', 'leg-press', 'split-squat'],
    },
    media: {
      images: [],
      videos: [],
      thumbnail: '',
    },
  },
  {
    id: 'calf-raise',
    slug: 'calf-raise',
    names: {
      ru: 'Подъемы на носки',
      en: 'Calf Raises',
    },
    aliases: ['standing-calf-raise', 'heel-raise'],
    classification: {
      modality: 'strength',
      exerciseFamily: 'raise',
      movementPatterns: ['calf-raise'],
      difficulty: 'beginner',
      equipment: ['bodyweight'],
      bodyPosition: 'standing',
      laterality: 'bilateral',
    },
    mechanics: {
      executionMode: 'reps',
      tempo: {
        eccentric: 2,
        pauseBottom: 1,
        concentric: 1,
        pauseTop: 0,
      },
      rangeOfMotion: 'full-controlled',
      loadType: 'bodyweight',
    },
    muscles: {
      primary: ['calves'],
      secondary: [],
      stabilizers: ['feet'],
      jointActions: ['ankle-plantarflexion'],
    },
    technique: {
      setup: {
        ru: 'Встаньте прямо, стопы на ширине плеч, можно держаться за опору для баланса.',
        en: 'Stand upright with feet hip-width apart, optionally holding support for balance.',
      },
      steps: {
        ru: 'Стоя, поднимитесь на носки максимально высоко, затем медленно опуститесь вниз под контролем.',
        en: 'Stand and rise onto toes as high as possible, then lower slowly under control.',
      },
      keyCues: {
        ru: 'Поднимайтесь максимально вверх; контролируйте опускание; держите корпус устойчивым.',
        en: 'Lift as high as possible; control the descent; keep body stable.',
      },
      commonErrors: {
        ru: 'Резкие движения; неполная амплитуда; завал стоп внутрь или наружу.',
        en: 'Bouncing; partial range; feet collapsing inward or outward.',
      },
      breathing: {
        ru: 'Выдох при подъеме, вдох при опускании.',
        en: 'Exhale as you rise, inhale as you lower.',
      },
    },
    dosage: {
      strength: {
        sets: '2-4',
        reps: '5-8',
        restSec: '90-150',
      },
      hypertrophy: {
        sets: '2-4',
        reps: '8-12',
        restSec: '60-120',
      },
      endurance: {
        sets: '2-3',
        reps: '12-20',
        restSec: '30-60',
      },
    },
    safety: {
      contraindications: ['joint-ankle-pain'],
      precautions: ['avoid-bouncing', 'use-support-if-needed', 'control-range-of-motion'],
      impactLevel: 'low',
    },
    progression: {
      regressions: ['partial-range-calf-raise', 'seated-calf-raise'],
      progressions: ['single-leg-calf-raise', 'weighted-calf-raise'],
      alternatives: ['jump-rope', 'farmer-walk-on-toes', 'leg-press-calf-raise'],
    },
    media: {
      images: [],
      videos: [],
      thumbnail: '',
    },
  },
  {
    id: 'side-plank',
    slug: 'side-plank',
    names: {
      ru: 'Боковая планка',
      en: 'Side Plank',
    },
    aliases: ['side-bridge'],
    classification: {
      modality: 'static',
      exerciseFamily: 'plank',
      movementPatterns: ['core-anti-lateral-flexion'],
      difficulty: 'intermediate',
      equipment: ['bodyweight'],
      bodyPosition: 'prone',
      laterality: 'unilateral',
    },
    mechanics: {
      executionMode: 'hold',
      tempo: {
        eccentric: 0,
        pauseBottom: 0,
        concentric: 0,
        pauseTop: 0,
      },
      rangeOfMotion: 'isometric',
      loadType: 'bodyweight',
    },
    muscles: {
      primary: ['core', 'obliques'],
      secondary: ['shoulders'],
      stabilizers: ['glutes', 'shoulders'],
      jointActions: ['spine-stabilization', 'shoulder-stabilization'],
    },
    technique: {
      setup: {
        ru: 'Лягте на бок, поставьте локоть строго под плечом, ноги вытянуты и сложены одна на другую.',
        en: 'Lie on your side with your elbow directly under your shoulder and legs extended, stacked on top of each other.',
      },
      steps: {
        ru: 'Поднимите таз от пола, образуя прямую линию от головы до пят. Удерживайте корпус напряженным, не позволяя тазу опускаться. Держите положение заданное время.',
        en: 'Lift your hips off the floor to form a straight line from head to heels. Keep your core braced and prevent hips from dropping. Hold the position for the prescribed time.',
      },
      keyCues: {
        ru: 'Держите корпус в одной линии; напрягайте пресс и ягодицы; не проваливайтесь в плечо.',
        en: 'Keep your body in a straight line; brace your core and glutes; avoid sinking into the shoulder.',
      },
      commonErrors: {
        ru: 'Провисание таза; наклон вперед или назад; перегрузка плеча; расслабленный корпус.',
        en: 'Dropping hips; leaning forward or backward; overloading the shoulder; relaxed core.',
      },
      breathing: {
        ru: 'Дышите ровно и спокойно, не задерживайте дыхание.',
        en: 'Breathe steadily and avoid holding your breath.',
      },
    },
    dosage: {
      strength: {
        sets: '3-5',
        reps: '4-8',
        restSec: '90-180',
      },
      hypertrophy: {
        sets: '2-4',
        reps: '6-15',
        restSec: '60-120',
      },
      endurance: {
        sets: '2-4',
        reps: '12-20',
        restSec: '30-60',
      },
    },
    safety: {
      contraindications: ['joint-shoulder-pain', 'joint-wrist-pain'],
      precautions: ['avoid-shoulder-overload', 'maintain-neutral-spine'],
      impactLevel: 'low',
    },
    progression: {
      regressions: ['kneeling-side-plank', 'side-plank-with-support'],
      progressions: ['side-plank-with-leg-lift', 'weighted-side-plank'],
      alternatives: ['plank', 'dead-bug'],
    },
    media: {
      images: [],
      videos: [],
      thumbnail: '',
    },
  },
  {
    id: 'diamond-push-up',
    slug: 'diamond-push-up',
    names: {
      ru: 'Алмазные отжимания',
      en: 'Diamond Push-ups',
    },
    aliases: ['close-grip-push-up', 'triangle-push-up'],
    classification: {
      modality: 'strength',
      exerciseFamily: 'push-up',
      movementPatterns: ['horizontal-push'],
      difficulty: 'intermediate',
      equipment: ['bodyweight'],
      bodyPosition: 'prone',
      laterality: 'bilateral',
    },
    mechanics: {
      executionMode: 'reps',
      tempo: {
        eccentric: 2,
        pauseBottom: 0,
        concentric: 1,
        pauseTop: 0,
      },
      rangeOfMotion: 'full-controlled',
      loadType: 'bodyweight',
    },
    muscles: {
      primary: ['triceps', 'chest'],
      secondary: ['shoulders'],
      stabilizers: ['core', 'shoulders'],
      jointActions: ['elbow-extension', 'shoulder-horizontal-adduction'],
    },
    technique: {
      setup: {
        ru: 'Примите упор лежа, руки поставьте близко друг к другу под грудью, соединяя большие и указательные пальцы.',
        en: 'Get into a push-up position with hands close together under your chest, forming a diamond shape with thumbs and index fingers.',
      },
      steps: {
        ru: 'Сгибайте руки в локтях, опуская корпус вниз, сохраняя прямую линию тела. Затем выжмите себя вверх, полностью разгибая руки.',
        en: 'Bend your elbows to lower your body while keeping a straight line. Push back up by extending your arms fully.',
      },
      keyCues: {
        ru: 'Держите локти близко к корпусу; напрягайте пресс; сохраняйте прямую линию тела.',
        en: 'Keep elbows close to your body; engage your core; maintain a straight body line.',
      },
      commonErrors: {
        ru: 'Разведение локтей в стороны; провисание таза; неполная амплитуда.',
        en: 'Flaring elbows; sagging hips; incomplete range of motion.',
      },
      breathing: {
        ru: 'Вдох при опускании, выдох при выжимании вверх.',
        en: 'Inhale on the way down, exhale as you push up.',
      },
    },
    dosage: {
      strength: {
        sets: '3-5',
        reps: '4-8',
        restSec: '90-180',
      },
      hypertrophy: {
        sets: '2-4',
        reps: '6-15',
        restSec: '60-120',
      },
      endurance: {
        sets: '2-4',
        reps: '12-20',
        restSec: '30-60',
      },
    },
    safety: {
      contraindications: ['joint-wrist-pain', 'joint-elbow-irritation'],
      precautions: ['avoid-excessive-wrist-extension', 'control-elbow-position'],
      impactLevel: 'low',
    },
    progression: {
      regressions: ['kneeling-diamond-push-up', 'incline-diamond-push-up'],
      progressions: ['weighted-diamond-push-up', 'decline-diamond-push-up'],
      alternatives: ['push-up', 'bench-dips'],
    },
    media: {
      images: [],
      videos: [],
      thumbnail: '',
    },
  },
  {
    id: 'pike-push-up',
    slug: 'pike-push-up',
    names: {
      ru: 'Отжимания в пике',
      en: 'Pike Push-ups',
    },
    aliases: ['pike-press-up'],
    classification: {
      modality: 'strength',
      exerciseFamily: 'push-up',
      movementPatterns: ['vertical-push'],
      difficulty: 'intermediate',
      equipment: ['bodyweight'],
      bodyPosition: 'prone',
      laterality: 'bilateral',
    },
    mechanics: {
      executionMode: 'reps',
      tempo: {
        eccentric: 2,
        pauseBottom: 0,
        concentric: 1,
        pauseTop: 0,
      },
      rangeOfMotion: 'full-controlled',
      loadType: 'bodyweight',
    },
    muscles: {
      primary: ['shoulders'],
      secondary: ['triceps', 'chest'],
      stabilizers: ['core'],
      jointActions: ['shoulder-flexion', 'elbow-extension'],
    },
    technique: {
      setup: {
        ru: 'Встаньте в положение «домика»: руки и ноги на полу, таз поднят вверх.',
        en: 'Start in a pike position with hands and feet on the floor and hips lifted high.',
      },
      steps: {
        ru: 'Сгибайте руки, опуская голову к полу между руками. Затем выжмите себя вверх, возвращаясь в исходное положение.',
        en: 'Bend your arms to lower your head toward the floor between your hands, then push back up to the starting position.',
      },
      keyCues: {
        ru: 'Держите таз высоко; направляйте движение вниз и вперед; контролируйте корпус.',
        en: 'Keep hips high; move down and slightly forward; maintain core control.',
      },
      commonErrors: {
        ru: 'Слишком низкое положение таза; чрезмерный прогиб в спине; неполная амплитуда.',
        en: 'Hips too low; excessive lower back arch; partial range of motion.',
      },
      breathing: {
        ru: 'Вдох при опускании, выдох при подъеме.',
        en: 'Inhale while lowering, exhale while pushing up.',
      },
    },
    dosage: {
      strength: {
        sets: '3-5',
        reps: '4-8',
        restSec: '90-180',
      },
      hypertrophy: {
        sets: '2-4',
        reps: '6-15',
        restSec: '60-120',
      },
      endurance: {
        sets: '2-4',
        reps: '12-20',
        restSec: '30-60',
      },
    },
    safety: {
      contraindications: ['joint-shoulder-impingement', 'joint-wrist-pain'],
      precautions: ['avoid-neck-strain', 'control-shoulder-loading'],
      impactLevel: 'low',
    },
    progression: {
      regressions: ['incline-pike-push-up', 'kneeling-pike-push-up'],
      progressions: ['feet-elevated-pike-push-up', 'handstand-push-up'],
      alternatives: ['overhead-press', 'wall-supported-handstand-push-up'],
    },
    media: {
      images: [],
      videos: [],
      thumbnail: '',
    },
  },
  {
    id: 'squat-jumps',
    slug: 'squat-jumps',
    names: {
      ru: 'Приседания с прыжком',
      en: 'Squat Jumps',
    },
    aliases: ['jump-squat'],
    classification: {
      modality: 'cardio',
      exerciseFamily: 'squat',
      movementPatterns: ['squat', 'plyometric'],
      difficulty: 'intermediate',
      equipment: ['bodyweight'],
      bodyPosition: 'standing',
      laterality: 'bilateral',
    },
    mechanics: {
      executionMode: 'reps',
      tempo: {
        eccentric: 1,
        pauseBottom: 0,
        concentric: 1,
        pauseTop: 0,
      },
      rangeOfMotion: 'full-controlled',
      loadType: 'bodyweight',
    },
    muscles: {
      primary: ['quads', 'glutes'],
      secondary: ['calves'],
      stabilizers: ['core'],
      jointActions: ['knee-extension', 'hip-extension', 'ankle-plantarflexion'],
    },
    technique: {
      setup: {
        ru: 'Встаньте прямо, ноги на ширине плеч, носки слегка разведены.',
        en: 'Stand upright with feet shoulder-width apart and toes slightly turned out.',
      },
      steps: {
        ru: 'Опуститесь в присед, затем мощно выпрыгните вверх. Приземляйтесь мягко, сгибая колени и сразу переходя в следующий повтор.',
        en: 'Lower into a squat, then explosively jump upward. Land softly by bending your knees and transition into the next rep.',
      },
      keyCues: {
        ru: 'Прыгайте взрывно; приземляйтесь мягко; держите колени по линии носков.',
        en: 'Jump explosively; land softly; keep knees tracking over toes.',
      },
      commonErrors: {
        ru: 'Жесткое приземление; завал коленей внутрь; недостаточная глубина приседа.',
        en: 'Hard landings; knees collapsing inward; shallow squat depth.',
      },
      breathing: {
        ru: 'Вдох при опускании, выдох при прыжке.',
        en: 'Inhale while lowering, exhale during the jump.',
      },
    },
    dosage: {
      strength: {
        sets: '3-5',
        reps: '4-8',
        restSec: '90-180',
      },
      hypertrophy: {
        sets: '2-4',
        reps: '6-15',
        restSec: '60-120',
      },
      endurance: {
        sets: '2-4',
        reps: '12-20',
        restSec: '30-60',
      },
    },
    safety: {
      contraindications: ['joint-knee-pain', 'joint-ankle-instability'],
      precautions: ['ensure-soft-landing', 'avoid-excessive-impact'],
      impactLevel: 'high',
    },
    progression: {
      regressions: ['bodyweight-squat', 'half-squat-jump'],
      progressions: ['weighted-squat-jump', 'box-jump'],
      alternatives: ['lunges', 'step-ups'],
    },
    media: {
      images: [],
      videos: [],
      thumbnail: '',
    },
  },
  {
    id: 'jump-lunge',
    slug: 'jump-lunge',
    names: {
      ru: 'Выпады с прыжком',
      en: 'Jump Lunges',
    },
    aliases: ['plyometric-lunge'],
    classification: {
      modality: 'cardio',
      exerciseFamily: 'lunge',
      movementPatterns: ['lunge', 'plyometric'],
      difficulty: 'advanced',
      equipment: ['bodyweight'],
      bodyPosition: 'standing',
      laterality: 'bilateral',
    },
    mechanics: {
      executionMode: 'reps',
      tempo: {
        eccentric: 1,
        pauseBottom: 0,
        concentric: 1,
        pauseTop: 0,
      },
      rangeOfMotion: 'full-controlled',
      loadType: 'bodyweight',
    },
    muscles: {
      primary: ['quads', 'glutes'],
      secondary: ['hamstrings'],
      stabilizers: ['core'],
      jointActions: ['knee-extension', 'hip-extension'],
    },
    technique: {
      setup: {
        ru: 'Встаньте прямо, сделайте шаг вперед в выпад.',
        en: 'Stand upright and step forward into a lunge position.',
      },
      steps: {
        ru: 'Из нижнего положения выпада выпрыгните вверх и поменяйте ноги в воздухе. Приземлитесь в выпад с противоположной ногой впереди.',
        en: 'From the bottom of the lunge, jump upward and switch legs in the air. Land in a lunge with the opposite leg forward.',
      },
      keyCues: {
        ru: 'Держите корпус ровным; приземляйтесь мягко; контролируйте колени.',
        en: 'Keep your torso upright; land softly; control knee alignment.',
      },
      commonErrors: {
        ru: 'Потеря баланса; жесткое приземление; колени заваливаются внутрь.',
        en: 'Loss of balance; hard landings; knees collapsing inward.',
      },
      breathing: {
        ru: 'Вдох перед прыжком, выдох во время усилия.',
        en: 'Inhale before the jump, exhale during the effort.',
      },
    },
    dosage: {
      strength: {
        sets: '3-5',
        reps: '4-8',
        restSec: '90-180',
      },
      hypertrophy: {
        sets: '2-4',
        reps: '6-15',
        restSec: '60-120',
      },
      endurance: {
        sets: '2-4',
        reps: '12-20',
        restSec: '30-60',
      },
    },
    safety: {
      contraindications: ['joint-knee-pain', 'joint-ankle-instability'],
      precautions: ['maintain-balance-control', 'avoid-hard-landing'],
      impactLevel: 'high',
    },
    progression: {
      regressions: ['reverse-lunge', 'walking-lunge'],
      progressions: ['weighted-jump-lunge', 'split-squat-jump'],
      alternatives: ['step-back-lunge', 'bulgarian-split-squat'],
    },
    media: {
      images: [],
      videos: [],
      thumbnail: '',
    },
  },
  {
    id: 'donkey-kicks',
    slug: 'donkey-kicks',
    names: {
      ru: 'Ослячьи удары',
      en: 'Donkey Kicks',
    },
    aliases: ['quadruped-hip-extension', 'bent-knee-hip-extension'],
    classification: {
      modality: 'strength',
      exerciseFamily: 'hip-extension',
      movementPatterns: ['hip-extension'],
      difficulty: 'beginner',
      equipment: ['bodyweight'],
      bodyPosition: 'quadruped',
      laterality: 'bilateral',
    },
    mechanics: {
      executionMode: 'reps',
      tempo: {
        eccentric: 2,
        pauseBottom: 1,
        concentric: 1,
        pauseTop: 0,
      },
      rangeOfMotion: 'full-controlled',
      loadType: 'bodyweight',
    },
    muscles: {
      primary: ['glutes'],
      secondary: ['hamstrings'],
      stabilizers: ['core', 'shoulders'],
      jointActions: ['hip-extension', 'spine-stabilization'],
    },
    technique: {
      setup: {
        ru: 'Встаньте на четвереньки: ладони под плечами, колени под тазом, спина в нейтральном положении.',
        en: 'Start on all fours with hands under shoulders, knees under hips, and your spine in a neutral position.',
      },
      steps: {
        ru: 'Напрягите корпус и поднимите согнутую ногу вверх, двигаясь за счет ягодицы. Не прогибайте поясницу и не разворачивайте таз. Подконтрольно опустите колено обратно и повторите на другую сторону.',
        en: 'Brace your core and lift one bent leg upward by squeezing the glute. Avoid arching your lower back or rotating your pelvis. Lower the knee with control and repeat on the other side.',
      },
      keyCues: {
        ru: 'Двигайтесь от тазобедренного сустава; держите таз ровно; напрягайте ягодицу в верхней точке.',
        en: 'Move from the hip; keep your pelvis level; squeeze the glute at the top.',
      },
      commonErrors: {
        ru: 'Прогиб в пояснице; разворот таза наружу; слишком быстрые махи; перенос веса на одну руку.',
        en: 'Arching the lower back; rotating the pelvis outward; swinging too fast; shifting weight into one hand.',
      },
      breathing: {
        ru: 'Выдыхайте при подъеме ноги, вдыхайте при возвращении вниз.',
        en: 'Exhale as you lift the leg, inhale as you lower it.',
      },
    },
    dosage: {
      strength: {
        sets: '2-4',
        reps: '5-8',
        restSec: '90-150',
      },
      hypertrophy: {
        sets: '2-4',
        reps: '8-12',
        restSec: '60-120',
      },
      endurance: {
        sets: '2-3',
        reps: '12-20',
        restSec: '30-60',
      },
    },
    safety: {
      contraindications: ['joint-knee-pain'],
      precautions: [
        'use-padding-under-knees',
        'maintain-neutral-spine',
        'avoid-lumbar-overextension',
      ],
      impactLevel: 'low',
    },
    progression: {
      regressions: ['smaller-range-donkey-kick', 'forearm-supported-donkey-kick'],
      progressions: ['banded-donkey-kick', 'ankle-weight-donkey-kick'],
      alternatives: ['glute-bridge', 'standing-hip-extension'],
    },
    media: {
      images: [],
      videos: [],
      thumbnail: '',
    },
  },
  {
    id: 'fire-hydrants',
    slug: 'fire-hydrants',
    names: {
      ru: 'Пожарные гидранты',
      en: 'Fire Hydrants',
    },
    aliases: ['quadruped-hip-abduction', 'bent-knee-hip-abduction'],
    classification: {
      modality: 'strength',
      exerciseFamily: 'hip-abduction',
      movementPatterns: ['hip-abduction'],
      difficulty: 'beginner',
      equipment: ['bodyweight'],
      bodyPosition: 'quadruped',
      laterality: 'bilateral',
    },
    mechanics: {
      executionMode: 'reps',
      tempo: {
        eccentric: 2,
        pauseBottom: 1,
        concentric: 1,
        pauseTop: 0,
      },
      rangeOfMotion: 'full-controlled',
      loadType: 'bodyweight',
    },
    muscles: {
      primary: ['glutes'],
      secondary: ['abductors'],
      stabilizers: ['core', 'shoulders'],
      jointActions: ['hip-abduction', 'spine-stabilization'],
    },
    technique: {
      setup: {
        ru: 'Встаньте на четвереньки, расположив ладони под плечами, колени под тазом и сохраняя нейтральную спину.',
        en: 'Start on all fours with hands under shoulders, knees under hips, and your spine neutral.',
      },
      steps: {
        ru: 'Напрягите корпус и отведите согнутую ногу в сторону, не разворачивая корпус. Поднимайте ногу до комфортной амплитуды, затем медленно верните колено вниз и повторите на другую сторону.',
        en: 'Brace your core and lift one bent leg out to the side without rotating your torso. Raise it through a comfortable range, then slowly lower the knee and repeat on the other side.',
      },
      keyCues: {
        ru: 'Держите таз ровно; движение идет от бедра; не переносите вес резко в сторону.',
        en: 'Keep your pelvis level; move from the hip; avoid shifting your weight sharply to the side.',
      },
      commonErrors: {
        ru: 'Разворот таза; прогиб в пояснице; слишком высокий подъем за счет корпуса; быстрые неконтролируемые повторы.',
        en: 'Rotating the pelvis; arching the lower back; lifting too high by twisting the torso; fast uncontrolled reps.',
      },
      breathing: {
        ru: 'Выдыхайте при отведении ноги, вдыхайте при возвращении вниз.',
        en: 'Exhale as you lift the leg out, inhale as you lower it.',
      },
    },
    dosage: {
      strength: {
        sets: '2-4',
        reps: '5-8',
        restSec: '90-150',
      },
      hypertrophy: {
        sets: '2-4',
        reps: '8-12',
        restSec: '60-120',
      },
      endurance: {
        sets: '2-3',
        reps: '12-20',
        restSec: '30-60',
      },
    },
    safety: {
      contraindications: ['joint-knee-pain'],
      precautions: ['use-padding-under-knees', 'maintain-neutral-spine', 'avoid-pelvic-rotation'],
      impactLevel: 'low',
    },
    progression: {
      regressions: ['smaller-range-fire-hydrant', 'forearm-supported-fire-hydrant'],
      progressions: ['banded-fire-hydrant', 'ankle-weight-fire-hydrant'],
      alternatives: ['side-lying-hip-abduction', 'clamshell'],
    },
    media: {
      images: [],
      videos: [],
      thumbnail: '',
    },
  },
  {
    id: 'bird-dog',
    slug: 'bird-dog',
    names: {
      ru: 'Птица-собака',
      en: 'Bird Dog',
    },
    aliases: ['quadruped-opposite-arm-leg-extension', 'bird-dog-extension'],
    classification: {
      modality: 'strength',
      exerciseFamily: 'core-stability',
      movementPatterns: ['core-anti-extension'],
      difficulty: 'beginner',
      equipment: ['bodyweight'],
      bodyPosition: 'quadruped',
      laterality: 'bilateral',
    },
    mechanics: {
      executionMode: 'reps',
      tempo: {
        eccentric: 2,
        pauseBottom: 1,
        concentric: 1,
        pauseTop: 1,
      },
      rangeOfMotion: 'full-controlled',
      loadType: 'bodyweight',
    },
    muscles: {
      primary: ['core', 'back'],
      secondary: ['glutes', 'shoulders'],
      stabilizers: ['obliques', 'hips'],
      jointActions: ['spine-stabilization', 'hip-extension', 'shoulder-flexion'],
    },
    technique: {
      setup: {
        ru: 'Встаньте на четвереньки: ладони под плечами, колени под тазом, шея продолжает линию позвоночника.',
        en: 'Start on all fours with hands under shoulders, knees under hips, and your neck in line with your spine.',
      },
      steps: {
        ru: 'Напрягите корпус и одновременно вытяните противоположные руку и ногу. Сохраняйте таз ровным и не прогибайтесь в пояснице. Ненадолго зафиксируйте положение, затем медленно вернитесь и повторите на другую сторону.',
        en: 'Brace your core and extend the opposite arm and leg at the same time. Keep your pelvis level and avoid arching your lower back. Pause briefly, then return with control and repeat on the other side.',
      },
      keyCues: {
        ru: 'Тянитесь рукой вперед, пяткой назад; держите ребра собранными; двигайтесь медленно и подконтрольно.',
        en: 'Reach your hand forward and heel back; keep ribs down; move slowly and with control.',
      },
      commonErrors: {
        ru: 'Прогиб в пояснице; разворот таза; слишком высокий подъем ноги; запрокидывание головы.',
        en: 'Arching the lower back; rotating the pelvis; lifting the leg too high; looking up and straining the neck.',
      },
      breathing: {
        ru: 'Выдыхайте при вытяжении руки и ноги, вдыхайте при возвращении.',
        en: 'Exhale as you extend the arm and leg, inhale as you return.',
      },
    },
    dosage: {
      strength: {
        sets: '2-4',
        reps: '5-8',
        restSec: '90-150',
      },
      hypertrophy: {
        sets: '2-4',
        reps: '8-12',
        restSec: '60-120',
      },
      endurance: {
        sets: '2-3',
        reps: '12-20',
        restSec: '30-60',
      },
    },
    safety: {
      contraindications: ['region-lower-back-pain', 'joint-wrist-pain'],
      precautions: [
        'maintain-neutral-spine',
        'avoid-lumbar-overextension',
        'keep-movement-controlled',
      ],
      impactLevel: 'low',
    },
    progression: {
      regressions: ['arm-only-bird-dog', 'leg-only-bird-dog'],
      progressions: ['bird-dog-hold', 'bird-dog-elbow-to-knee'],
      alternatives: ['dead-bug', 'plank'],
    },
    media: {
      images: [],
      videos: [],
      thumbnail: '',
    },
  },
  {
    id: 'dead-bug',
    slug: 'dead-bug',
    names: {
      ru: 'Мёртвый жук',
      en: 'Dead Bug',
    },
    aliases: ['dead-bug-exercise', 'supine-opposite-arm-leg-lower'],
    classification: {
      modality: 'strength',
      exerciseFamily: 'core-stability',
      movementPatterns: ['core-anti-extension'],
      difficulty: 'beginner',
      equipment: ['bodyweight'],
      bodyPosition: 'supine',
      laterality: 'bilateral',
    },
    mechanics: {
      executionMode: 'reps',
      tempo: {
        eccentric: 2,
        pauseBottom: 0,
        concentric: 1,
        pauseTop: 0,
      },
      rangeOfMotion: 'full-controlled',
      loadType: 'bodyweight',
    },
    muscles: {
      primary: ['core'],
      secondary: ['hip-flexors'],
      stabilizers: ['obliques', 'lower-back'],
      jointActions: ['spine-stabilization', 'hip-flexion', 'shoulder-flexion'],
    },
    technique: {
      setup: {
        ru: 'Лягте на спину, поднимите руки вверх, бедра держите вертикально, колени согнуты примерно под прямым углом.',
        en: 'Lie on your back with arms reaching up, hips vertical, and knees bent at about 90 degrees.',
      },
      steps: {
        ru: 'Прижмите поясницу к полу мягким напряжением корпуса. Медленно опустите противоположные руку и ногу к полу, не теряя положения спины. Вернитесь в исходное положение и повторите на другую сторону.',
        en: 'Use gentle core tension to keep your lower back close to the floor. Slowly lower the opposite arm and leg toward the floor without losing spinal position. Return to start and repeat on the other side.',
      },
      keyCues: {
        ru: 'Поясница остается стабильной; ребра не раскрываются; движение медленное и точное.',
        en: 'Keep your lower back stable; avoid flaring the ribs; move slowly and precisely.',
      },
      commonErrors: {
        ru: 'Отрыв поясницы от пола; слишком быстрая работа; чрезмерное напряжение шеи; слишком большая амплитуда.',
        en: 'Lower back lifting from the floor; moving too fast; neck tension; using too much range.',
      },
      breathing: {
        ru: 'Выдыхайте при опускании руки и ноги, вдыхайте при возврате.',
        en: 'Exhale as you lower the arm and leg, inhale as you return.',
      },
    },
    dosage: {
      strength: {
        sets: '2-4',
        reps: '5-8',
        restSec: '90-150',
      },
      hypertrophy: {
        sets: '2-4',
        reps: '8-12',
        restSec: '60-120',
      },
      endurance: {
        sets: '2-3',
        reps: '12-20',
        restSec: '30-60',
      },
    },
    safety: {
      contraindications: ['region-neck-pain'],
      precautions: ['keep-neck-relaxed', 'avoid-lumbar-arching', 'reduce-range-if-control-is-lost'],
      impactLevel: 'low',
    },
    progression: {
      regressions: ['heel-tap', 'arms-fixed-dead-bug'],
      progressions: ['straight-leg-dead-bug', 'weighted-dead-bug'],
      alternatives: ['bird-dog', 'hollow-body-hold'],
    },
    media: {
      images: [],
      videos: [],
      thumbnail: '',
    },
  },
  {
    id: 'flutter-kicks',
    slug: 'flutter-kicks',
    names: {
      ru: 'Ножницы',
      en: 'Flutter Kicks',
    },
    aliases: ['flutter-kick', 'scissor-kicks'],
    classification: {
      modality: 'strength',
      exerciseFamily: 'core-stability',
      movementPatterns: ['core-anti-extension'],
      difficulty: 'intermediate',
      equipment: ['bodyweight'],
      bodyPosition: 'supine',
      laterality: 'bilateral',
    },
    mechanics: {
      executionMode: 'time',
      tempo: {
        eccentric: 0,
        pauseBottom: 0,
        concentric: 0,
        pauseTop: 0,
      },
      rangeOfMotion: 'short-controlled',
      loadType: 'bodyweight',
    },
    muscles: {
      primary: ['core'],
      secondary: ['hip-flexors', 'quads'],
      stabilizers: ['lower-back', 'obliques'],
      jointActions: ['spine-stabilization', 'hip-flexion', 'hip-extension'],
    },
    technique: {
      setup: {
        ru: 'Лягте на спину, вытяните ноги и расположите руки вдоль тела или под тазом для поддержки.',
        en: 'Lie on your back with legs extended and hands by your sides or under your hips for support.',
      },
      steps: {
        ru: 'Напрягите корпус и слегка поднимите ноги над полом. Выполняйте короткие быстрые движения ногами вверх-вниз или перекрестно, сохраняя поясницу стабильной. Продолжайте в заданном темпе до окончания подхода.',
        en: 'Brace your core and lift your legs slightly off the floor. Perform short, quick up-and-down or scissor-like leg movements while keeping your lower back stable. Continue at the prescribed pace until the set is complete.',
      },
      keyCues: {
        ru: 'Держите поясницу под контролем; ноги работают коротко и ритмично; не задерживайте дыхание.',
        en: 'Keep your lower back controlled; move the legs in a short, rhythmic pattern; do not hold your breath.',
      },
      commonErrors: {
        ru: 'Сильный прогиб в пояснице; слишком высокая амплитуда; напряжение шеи; потеря ритма.',
        en: 'Excessive lower back arch; too much range of motion; neck tension; losing rhythm.',
      },
      breathing: {
        ru: 'Дышите ровно и ритмично на протяжении всего подхода.',
        en: 'Breathe steadily and rhythmically throughout the set.',
      },
    },
    dosage: {
      strength: {
        sets: '3-5',
        reps: '20-40 sec',
        restSec: '90-180',
      },
      hypertrophy: {
        sets: '2-4',
        reps: '30-60 sec',
        restSec: '60-120',
      },
      endurance: {
        sets: '2-4',
        reps: '45-90 sec',
        restSec: '30-60',
      },
    },
    safety: {
      contraindications: ['region-lower-back-pain'],
      precautions: ['avoid-lumbar-arching', 'raise-legs-if-control-is-lost', 'keep-neck-relaxed'],
      impactLevel: 'low',
    },
    progression: {
      regressions: ['bent-knee-flutter-kicks', 'higher-leg-flutter-kicks'],
      progressions: ['lower-leg-flutter-kicks', 'ankle-weight-flutter-kicks'],
      alternatives: ['dead-bug', 'hollow-body-hold'],
    },
    media: {
      images: [],
      videos: [],
      thumbnail: '',
    },
  },
  {
    id: 'v-ups',
    slug: 'v-ups',
    names: {
      ru: 'V-подъёмы',
      en: 'V-ups',
    },
    aliases: ['v-sit-up', 'jackknife-sit-up'],
    classification: {
      modality: 'strength',
      exerciseFamily: 'core-flexion',
      movementPatterns: ['core-anti-extension'],
      difficulty: 'intermediate',
      equipment: ['bodyweight'],
      bodyPosition: 'supine',
      laterality: 'bilateral',
    },
    mechanics: {
      executionMode: 'reps',
      tempo: {
        eccentric: 2,
        pauseBottom: 0,
        concentric: 1,
        pauseTop: 0,
      },
      rangeOfMotion: 'full-controlled',
      loadType: 'bodyweight',
    },
    muscles: {
      primary: ['core'],
      secondary: ['hip-flexors'],
      stabilizers: ['lower-back', 'obliques'],
      jointActions: ['spine-flexion', 'hip-flexion'],
    },
    technique: {
      setup: {
        ru: 'Лягте на спину, вытяните ноги и руки за головой, удерживая корпус под контролем.',
        en: 'Lie on your back with legs extended and arms reaching overhead, keeping your torso controlled.',
      },
      steps: {
        ru: 'Одновременно поднимите прямые ноги и корпус, тянитесь руками к стопам. В верхней точке сформируйте V-образное положение, затем медленно опуститесь обратно, не теряя контроля поясницы.',
        en: 'Lift your straight legs and torso at the same time, reaching your hands toward your feet. Form a V shape at the top, then lower back down slowly without losing lower-back control.',
      },
      keyCues: {
        ru: 'Поднимайтесь за счет пресса; держите ноги длинными; опускайтесь медленно и подконтрольно.',
        en: 'Lift through your abs; keep your legs long; lower slowly and with control.',
      },
      commonErrors: {
        ru: 'Рывок корпусом; сильный прогиб в пояснице при опускании; сгибание шеи; падение ног на пол.',
        en: 'Jerking the torso; excessive lower-back arch while lowering; straining the neck; dropping the legs to the floor.',
      },
      breathing: {
        ru: 'Выдыхайте при подъеме, вдыхайте при опускании.',
        en: 'Exhale as you lift, inhale as you lower.',
      },
    },
    dosage: {
      strength: {
        sets: '3-5',
        reps: '4-8',
        restSec: '90-180',
      },
      hypertrophy: {
        sets: '2-4',
        reps: '6-15',
        restSec: '60-120',
      },
      endurance: {
        sets: '2-4',
        reps: '12-20',
        restSec: '30-60',
      },
    },
    safety: {
      contraindications: ['region-lower-back-pain'],
      precautions: ['avoid-lumbar-arching', 'move-with-control', 'reduce-range-if-control-is-lost'],
      impactLevel: 'low',
    },
    progression: {
      regressions: ['tuck-up', 'bent-knee-v-up'],
      progressions: ['weighted-v-up', 'slow-tempo-v-up'],
      alternatives: ['dead-bug', 'reverse-crunch'],
    },
    media: {
      images: [],
      videos: [],
      thumbnail: '',
    },
  },
  {
    id: 'hollow-hold',
    slug: 'hollow-hold',
    names: {
      ru: 'Пустая лодочка',
      en: 'Hollow Hold',
    },
    aliases: ['hollow-body-hold', 'hollow-body-position'],
    classification: {
      modality: 'static',
      exerciseFamily: 'core-stability',
      movementPatterns: ['core-anti-extension'],
      difficulty: 'intermediate',
      equipment: ['bodyweight'],
      bodyPosition: 'supine',
      laterality: 'bilateral',
    },
    mechanics: {
      executionMode: 'hold',
      tempo: {
        eccentric: 0,
        pauseBottom: 0,
        concentric: 0,
        pauseTop: 0,
      },
      rangeOfMotion: 'full-controlled',
      loadType: 'bodyweight',
    },
    muscles: {
      primary: ['core'],
      secondary: ['hip-flexors'],
      stabilizers: ['obliques', 'lower-back'],
      jointActions: ['spine-stabilization', 'hip-flexion'],
    },
    technique: {
      setup: {
        ru: 'Лягте на спину, вытяните ноги и руки, мягко прижмите поясницу к полу за счет напряжения корпуса.',
        en: 'Lie on your back with legs and arms extended, gently pressing your lower back toward the floor by bracing your core.',
      },
      steps: {
        ru: 'Оторвите плечи и ноги от пола, сохраняя поясницу стабильной. Удерживайте вытянутое положение с напряженным корпусом, не позволяя ребрам раскрываться и пояснице прогибаться.',
        en: 'Lift your shoulders and legs off the floor while keeping your lower back stable. Hold the extended position with your core engaged, avoiding rib flare or lower-back arching.',
      },
      keyCues: {
        ru: 'Ребра вниз; поясница под контролем; тянитесь руками и ногами в разные стороны.',
        en: 'Keep ribs down; control your lower back; reach long through your arms and legs.',
      },
      commonErrors: {
        ru: 'Отрыв поясницы от пола; задержка дыхания; слишком низкое положение ног без контроля; напряжение шеи.',
        en: 'Lower back lifting from the floor; holding the breath; legs too low without control; neck tension.',
      },
      breathing: {
        ru: 'Дышите коротко и ровно, сохраняя напряжение корпуса.',
        en: 'Breathe steadily in short controlled breaths while maintaining core tension.',
      },
    },
    dosage: {
      strength: {
        sets: '3-5',
        reps: '4-8',
        restSec: '90-180',
      },
      hypertrophy: {
        sets: '2-4',
        reps: '6-15',
        restSec: '60-120',
      },
      endurance: {
        sets: '2-4',
        reps: '12-20',
        restSec: '30-60',
      },
    },
    safety: {
      contraindications: ['region-lower-back-pain'],
      precautions: ['avoid-lumbar-arching', 'raise-legs-if-control-is-lost', 'keep-neck-relaxed'],
      impactLevel: 'low',
    },
    progression: {
      regressions: ['tuck-hollow-hold', 'one-leg-hollow-hold'],
      progressions: ['hollow-rock', 'weighted-hollow-hold'],
      alternatives: ['dead-bug', 'plank'],
    },
    media: {
      images: [],
      videos: [],
      thumbnail: '',
    },
  },
  {
    id: 'shoulder-taps',
    slug: 'shoulder-taps',
    names: {
      ru: 'Касания плеч в планке',
      en: 'Shoulder Taps',
    },
    aliases: ['plank-shoulder-taps', 'alternating-shoulder-taps'],
    classification: {
      modality: 'strength',
      exerciseFamily: 'plank',
      movementPatterns: ['core-anti-extension'],
      difficulty: 'beginner',
      equipment: ['bodyweight'],
      bodyPosition: 'prone',
      laterality: 'bilateral',
    },
    mechanics: {
      executionMode: 'time',
      tempo: {
        eccentric: 0,
        pauseBottom: 0,
        concentric: 0,
        pauseTop: 0,
      },
      rangeOfMotion: 'full-controlled',
      loadType: 'bodyweight',
    },
    muscles: {
      primary: ['core'],
      secondary: ['shoulders'],
      stabilizers: ['glutes', 'obliques', 'chest'],
      jointActions: ['spine-stabilization', 'shoulder-stabilization'],
    },
    technique: {
      setup: {
        ru: 'Примите положение высокой планки: ладони под плечами, ноги вытянуты, корпус в прямой линии.',
        en: 'Start in a high plank with hands under shoulders, legs extended, and your body in a straight line.',
      },
      steps: {
        ru: 'Напрягите пресс и ягодицы. Поднимите одну руку и коснитесь противоположного плеча, удерживая таз неподвижным. Верните руку на пол и повторите на другую сторону.',
        en: 'Brace your abs and glutes. Lift one hand and tap the opposite shoulder while keeping your hips still. Place the hand back down and repeat on the other side.',
      },
      keyCues: {
        ru: 'Таз остается ровным; давите опорной рукой в пол; двигайтесь медленно.',
        en: 'Keep your hips level; press the supporting hand into the floor; move slowly.',
      },
      commonErrors: {
        ru: 'Раскачивание таза; провисание поясницы; слишком широкие или слишком узкие стопы; быстрые касания без контроля.',
        en: 'Rocking the hips; sagging through the lower back; feet too wide or too narrow; fast taps without control.',
      },
      breathing: {
        ru: 'Дышите ровно, выдыхая на касании плеча.',
        en: 'Breathe steadily, exhaling as you tap the shoulder.',
      },
    },
    dosage: {
      strength: {
        sets: '3-5',
        reps: '20-40 sec',
        restSec: '90-180',
      },
      hypertrophy: {
        sets: '2-4',
        reps: '30-60 sec',
        restSec: '60-120',
      },
      endurance: {
        sets: '2-4',
        reps: '45-90 sec',
        restSec: '30-60',
      },
    },
    safety: {
      contraindications: ['joint-wrist-pain', 'joint-shoulder-irritation'],
      precautions: ['avoid-wrist-overload', 'maintain-neutral-spine', 'control-hip-rotation'],
      impactLevel: 'low',
    },
    progression: {
      regressions: ['incline-shoulder-taps', 'kneeling-shoulder-taps'],
      progressions: ['narrow-stance-shoulder-taps', 'weighted-shoulder-taps'],
      alternatives: ['plank', 'dead-bug'],
    },
    media: {
      images: [],
      videos: [],
      thumbnail: '',
    },
  },
  {
    id: 'reverse-crunch',
    slug: 'reverse-crunch',
    names: {
      ru: 'Обратные скручивания',
      en: 'Reverse Crunches',
    },
    aliases: ['reverse-crunches', 'hip-lift-crunch'],
    classification: {
      modality: 'strength',
      exerciseFamily: 'crunch',
      movementPatterns: ['core-anti-extension'],
      difficulty: 'beginner',
      equipment: ['bodyweight'],
      bodyPosition: 'supine',
      laterality: 'bilateral',
    },
    mechanics: {
      executionMode: 'reps',
      tempo: {
        eccentric: 2,
        pauseBottom: 0,
        concentric: 1,
        pauseTop: 0,
      },
      rangeOfMotion: 'full-controlled',
      loadType: 'bodyweight',
    },
    muscles: {
      primary: ['core'],
      secondary: ['hip-flexors'],
      stabilizers: ['obliques', 'lower-back'],
      jointActions: ['spine-flexion', 'posterior-pelvic-tilt'],
    },
    technique: {
      setup: {
        ru: 'Лягте на спину, руки положите вдоль тела или слегка в стороны, колени согните.',
        en: 'Lie on your back with arms by your sides or slightly out to the sides, and bend your knees.',
      },
      steps: {
        ru: 'Напрягите пресс и подкрутите таз, подтягивая колени к груди. Ненадолго задержитесь в верхней точке, затем медленно опустите таз и ноги обратно без рывка.',
        en: 'Brace your abs and curl your pelvis up, drawing your knees toward your chest. Pause briefly at the top, then slowly lower your hips and legs back down without swinging.',
      },
      keyCues: {
        ru: 'Подкручивайте таз, а не размахивайте ногами; держите движение коротким и контролируемым; не тяните шею.',
        en: 'Curl the pelvis instead of swinging the legs; keep the movement short and controlled; avoid pulling through the neck.',
      },
      commonErrors: {
        ru: 'Мах ногами вместо работы прессом; слишком высокая амплитуда; резкое опускание таза; напряжение шеи.',
        en: 'Swinging the legs instead of using the abs; too much range; dropping the hips quickly; neck tension.',
      },
      breathing: {
        ru: 'Выдыхайте при подтягивании таза к груди, вдыхайте при опускании.',
        en: 'Exhale as you curl the hips toward the chest, inhale as you lower.',
      },
    },
    dosage: {
      strength: {
        sets: '2-4',
        reps: '5-8',
        restSec: '90-150',
      },
      hypertrophy: {
        sets: '2-4',
        reps: '8-12',
        restSec: '60-120',
      },
      endurance: {
        sets: '2-3',
        reps: '12-20',
        restSec: '30-60',
      },
    },
    safety: {
      contraindications: ['region-lower-back-pain'],
      precautions: [
        'avoid-swinging-legs',
        'keep-movement-controlled',
        'reduce-range-if-discomfort-occurs',
      ],
      impactLevel: 'low',
    },
    progression: {
      regressions: ['bent-knee-reverse-crunch', 'heel-tap'],
      progressions: ['straight-leg-reverse-crunch', 'reverse-crunch-with-hip-lift'],
      alternatives: ['dead-bug', 'v-ups'],
    },
    media: {
      images: [],
      videos: [],
      thumbnail: '',
    },
  },
  {
    id: 'heel-touches',
    slug: 'heel-touches',
    names: {
      ru: 'Касания пяток',
      en: 'Heel Touches',
    },
    aliases: ['heel-taps', 'alternate-heel-touches'],
    classification: {
      modality: 'strength',
      exerciseFamily: 'core-flexion',
      movementPatterns: ['core-rotation'],
      difficulty: 'beginner',
      equipment: ['bodyweight'],
      bodyPosition: 'supine',
      laterality: 'bilateral',
    },
    mechanics: {
      executionMode: 'reps',
      tempo: {
        eccentric: 2,
        pauseBottom: 0,
        concentric: 1,
        pauseTop: 0,
      },
      rangeOfMotion: 'full-controlled',
      loadType: 'bodyweight',
    },
    muscles: {
      primary: ['core', 'obliques'],
      secondary: ['abs'],
      stabilizers: ['lower-back'],
      jointActions: ['spine-lateral-flexion', 'spine-flexion'],
    },
    technique: {
      setup: {
        ru: 'Лягте на спину, согните колени, поставьте стопы на пол на удобном расстоянии от таза.',
        en: 'Lie on your back, bend your knees, and place your feet on the floor at a comfortable distance from your hips.',
      },
      steps: {
        ru: 'Слегка поднимите плечи от пола и напрягите пресс. Поочередно тянитесь рукой к одноименной пятке, выполняя боковое скручивание. Двигайтесь ритмично, сохраняя шею расслабленной.',
        en: 'Lift your shoulders slightly off the floor and brace your abs. Reach one hand toward the same-side heel, performing a small side crunch. Move rhythmically while keeping your neck relaxed.',
      },
      keyCues: {
        ru: 'Скользите ребрами к тазу; шея расслаблена; амплитуда небольшая и контролируемая.',
        en: 'Draw ribs toward hips; keep your neck relaxed; use a small controlled range.',
      },
      commonErrors: {
        ru: 'Тяга головой вперед; раскачивание корпусом; слишком высокая амплитуда; задержка дыхания.',
        en: 'Pulling the head forward; rocking the torso; using too much range; holding the breath.',
      },
      breathing: {
        ru: 'Выдыхайте на каждом касании, вдыхайте при возвращении к центру.',
        en: 'Exhale on each touch, inhale as you return to center.',
      },
    },
    dosage: {
      strength: {
        sets: '2-4',
        reps: '5-8',
        restSec: '90-150',
      },
      hypertrophy: {
        sets: '2-4',
        reps: '8-12',
        restSec: '60-120',
      },
      endurance: {
        sets: '2-3',
        reps: '12-20',
        restSec: '30-60',
      },
    },
    safety: {
      contraindications: ['region-neck-pain'],
      precautions: [
        'keep-neck-relaxed',
        'avoid-pulling-head-forward',
        'use-small-controlled-range',
      ],
      impactLevel: 'low',
    },
    progression: {
      regressions: ['smaller-range-heel-touches', 'supported-crunch-hold'],
      progressions: ['feet-farther-heel-touches', 'weighted-heel-touches'],
      alternatives: ['side-plank', 'bicycle-crunch'],
    },
    media: {
      images: [],
      videos: [],
      thumbnail: '',
    },
  },
  {
    id: 'single-leg-glute-bridge',
    slug: 'single-leg-glute-bridge',
    names: {
      ru: 'Ягодичный мостик на одной ноге',
      en: 'Single-Leg Glute Bridge',
    },
    aliases: ['single-leg-hip-bridge', 'one-leg-glute-bridge'],
    classification: {
      modality: 'strength',
      exerciseFamily: 'bridge',
      movementPatterns: ['hinge'],
      difficulty: 'intermediate',
      equipment: ['bodyweight'],
      bodyPosition: 'supine',
      laterality: 'unilateral',
    },
    mechanics: {
      executionMode: 'reps',
      tempo: {
        eccentric: 2,
        pauseBottom: 1,
        concentric: 1,
        pauseTop: 0,
      },
      rangeOfMotion: 'full-controlled',
      loadType: 'bodyweight',
    },
    muscles: {
      primary: ['glutes'],
      secondary: ['hamstrings', 'core'],
      stabilizers: ['obliques', 'hips'],
      jointActions: ['hip-extension', 'spine-stabilization'],
    },
    technique: {
      setup: {
        ru: 'Лягте на спину, одну ногу согните и поставьте стопу на пол, вторую вытяните. Руки вдоль тела.',
        en: 'Lie on your back with one leg bent and foot on the floor, the other leg extended. Arms by your sides.',
      },
      steps: {
        ru: 'Напрягите пресс и ягодицу опорной ноги. Поднимите таз вверх, сохраняя прямую линию от плеч до колена. Опуститесь обратно подконтрольно и повторите.',
        en: 'Brace your core and squeeze the working glute. Lift your hips to form a straight line from shoulders to knee. Lower down with control and repeat.',
      },
      keyCues: {
        ru: 'Давите пяткой в пол; держите таз ровным; не прогибайтесь в пояснице.',
        en: 'Drive through your heel; keep hips level; avoid arching the lower back.',
      },
      commonErrors: {
        ru: 'Перекос таза; переразгибание поясницы; толчок вместо контроля; опора на шею.',
        en: 'Hips tilting; overextending the lower back; using momentum; pushing through the neck.',
      },
      breathing: {
        ru: 'Выдыхайте при подъеме таза, вдыхайте при опускании.',
        en: 'Exhale as you lift your hips, inhale as you lower.',
      },
    },
    dosage: {
      strength: {
        sets: '3-5',
        reps: '4-8',
        restSec: '90-180',
      },
      hypertrophy: {
        sets: '2-4',
        reps: '6-15',
        restSec: '60-120',
      },
      endurance: {
        sets: '2-4',
        reps: '12-20',
        restSec: '30-60',
      },
    },
    safety: {
      contraindications: ['region-lower-back-pain'],
      precautions: ['maintain-neutral-spine', 'avoid-hip-rotation', 'control-range-of-motion'],
      impactLevel: 'low',
    },
    progression: {
      regressions: ['glute-bridge', 'short-range-single-leg-bridge'],
      progressions: ['elevated-single-leg-glute-bridge', 'weighted-single-leg-glute-bridge'],
      alternatives: ['hip-thrust', 'step-ups'],
    },
    media: {
      images: [],
      videos: [],
      thumbnail: '',
    },
  },
  {
    id: 'lateral-lunge',
    slug: 'lateral-lunge',
    names: {
      ru: 'Боковые выпады',
      en: 'Lateral Lunges',
    },
    aliases: ['side-lunge', 'lateral-step-lunge'],
    classification: {
      modality: 'strength',
      exerciseFamily: 'lunge',
      movementPatterns: ['lunge'],
      difficulty: 'beginner',
      equipment: ['bodyweight'],
      bodyPosition: 'standing',
      laterality: 'bilateral',
    },
    mechanics: {
      executionMode: 'reps',
      tempo: {
        eccentric: 2,
        pauseBottom: 0,
        concentric: 1,
        pauseTop: 0,
      },
      rangeOfMotion: 'full-controlled',
      loadType: 'bodyweight',
    },
    muscles: {
      primary: ['quads', 'glutes'],
      secondary: ['adductors'],
      stabilizers: ['core', 'hips'],
      jointActions: ['knee-flexion', 'hip-abduction', 'hip-extension'],
    },
    technique: {
      setup: {
        ru: 'Встаньте прямо, ноги на ширине плеч или чуть шире.',
        en: 'Stand upright with feet shoulder-width apart or slightly wider.',
      },
      steps: {
        ru: 'Сделайте широкий шаг в сторону и опуститесь в выпад, сгибая опорную ногу и отводя таз назад. Вернитесь в исходное положение и повторите на другую сторону.',
        en: 'Take a wide step to the side and lower into a lunge by bending the working leg and pushing your hips back. Return to the start and repeat on the other side.',
      },
      keyCues: {
        ru: 'Таз назад; колено следует за носком; вторая нога остается прямой.',
        en: 'Push hips back; keep knee tracking over toes; keep the opposite leg straight.',
      },
      commonErrors: {
        ru: 'Сведение коленей внутрь; наклон корпуса вперед; недостаточная глубина; перенос веса на носок.',
        en: 'Knees collapsing inward; leaning forward excessively; shallow depth; shifting weight to the toes.',
      },
      breathing: {
        ru: 'Вдох при опускании, выдох при возврате.',
        en: 'Inhale as you lower, exhale as you return.',
      },
    },
    dosage: {
      strength: {
        sets: '2-4',
        reps: '5-8',
        restSec: '90-150',
      },
      hypertrophy: {
        sets: '2-4',
        reps: '8-12',
        restSec: '60-120',
      },
      endurance: {
        sets: '2-3',
        reps: '12-20',
        restSec: '30-60',
      },
    },
    safety: {
      contraindications: ['joint-knee-pain'],
      precautions: ['control-knee-alignment', 'avoid-excessive-depth-if-pain', 'maintain-balance'],
      impactLevel: 'low',
    },
    progression: {
      regressions: ['partial-range-lateral-lunge', 'assisted-lateral-lunge'],
      progressions: ['weighted-lateral-lunge', 'lateral-lunge-to-balance'],
      alternatives: ['forward-lunge', 'step-ups'],
    },
    media: {
      images: [],
      videos: [],
      thumbnail: '',
    },
  },
  {
    id: 'bear-crawls',
    slug: 'bear-crawls',
    names: {
      ru: 'Медвежья ходьба',
      en: 'Bear Crawls',
    },
    aliases: ['bear-crawl', 'quadruped-crawl'],
    classification: {
      modality: 'cardio',
      exerciseFamily: 'locomotion',
      movementPatterns: ['full-body-dynamic', 'gait'],
      difficulty: 'intermediate',
      equipment: ['bodyweight'],
      bodyPosition: 'quadruped',
      laterality: 'bilateral',
    },
    mechanics: {
      executionMode: 'time',
      tempo: {
        eccentric: 0,
        pauseBottom: 0,
        concentric: 0,
        pauseTop: 0,
      },
      rangeOfMotion: 'full-controlled',
      loadType: 'bodyweight',
    },
    muscles: {
      primary: ['full-body'],
      secondary: ['core'],
      stabilizers: ['shoulders', 'glutes'],
      jointActions: ['shoulder-flexion', 'hip-flexion', 'spine-stabilization'],
    },
    technique: {
      setup: {
        ru: 'Встаньте на четвереньки, колени слегка приподнимите над полом, спина нейтральная.',
        en: 'Start on all fours with knees slightly off the ground and a neutral spine.',
      },
      steps: {
        ru: 'Двигайтесь вперед, одновременно перемещая противоположные руку и ногу. Сохраняйте корпус стабильным и таз низким.',
        en: 'Move forward by stepping opposite arm and leg together. Keep your torso stable and hips low.',
      },
      keyCues: {
        ru: 'Двигайтесь медленно и подконтрольно; держите колени близко к полу; сохраняйте напряжение корпуса.',
        en: 'Move slowly and with control; keep knees close to the floor; maintain core tension.',
      },
      commonErrors: {
        ru: 'Высокий таз; раскачивание корпуса; быстрые неконтролируемые движения; напряжение в шее.',
        en: 'Hips too high; torso swaying; fast uncontrolled movement; neck tension.',
      },
      breathing: {
        ru: 'Дышите равномерно на протяжении движения.',
        en: 'Breathe steadily throughout the movement.',
      },
    },
    dosage: {
      strength: {
        sets: '3-5',
        reps: '20-40 sec',
        restSec: '90-180',
      },
      hypertrophy: {
        sets: '2-4',
        reps: '30-60 sec',
        restSec: '60-120',
      },
      endurance: {
        sets: '2-4',
        reps: '45-90 sec',
        restSec: '30-60',
      },
    },
    safety: {
      contraindications: ['joint-wrist-pain'],
      precautions: ['avoid-wrist-overload', 'keep-neutral-spine', 'control-movement-speed'],
      impactLevel: 'medium',
    },
    progression: {
      regressions: ['static-bear-hold', 'slow-bear-crawl'],
      progressions: ['faster-bear-crawl', 'weighted-bear-crawl'],
      alternatives: ['plank', 'mountain-climbers'],
    },
    media: {
      images: [],
      videos: [],
      thumbnail: '',
    },
  },
  {
    id: 'inchworm',
    slug: 'inchworm',
    names: {
      ru: 'Гусеница',
      en: 'Inchworm',
    },
    aliases: ['inchworm-walkout', 'hand-walkout'],
    classification: {
      modality: 'cardio',
      exerciseFamily: 'full-body',
      movementPatterns: ['full-body-dynamic'],
      difficulty: 'beginner',
      equipment: ['bodyweight'],
      bodyPosition: 'standing',
      laterality: 'bilateral',
    },
    mechanics: {
      executionMode: 'reps',
      tempo: {
        eccentric: 2,
        pauseBottom: 0,
        concentric: 1,
        pauseTop: 0,
      },
      rangeOfMotion: 'full-controlled',
      loadType: 'bodyweight',
    },
    muscles: {
      primary: ['full-body'],
      secondary: ['core', 'hamstrings', 'shoulders'],
      stabilizers: ['lower-back', 'glutes'],
      jointActions: ['hip-flexion', 'shoulder-flexion', 'spine-stabilization'],
    },
    technique: {
      setup: {
        ru: 'Встаньте прямо, ноги на ширине таза.',
        en: 'Stand upright with feet hip-width apart.',
      },
      steps: {
        ru: 'Наклонитесь вперед и поставьте руки на пол. Шагайте руками вперед до положения планки, затем шагайте ногами к рукам и вернитесь в исходное положение.',
        en: 'Bend forward and place your hands on the floor. Walk your hands forward into a plank, then walk your feet toward your hands and return to standing.',
      },
      keyCues: {
        ru: 'Держите ноги почти прямыми; контролируйте корпус в планке; двигайтесь плавно.',
        en: 'Keep legs mostly straight; control your body in plank; move smoothly.',
      },
      commonErrors: {
        ru: 'Сгибание коленей без необходимости; провисание поясницы в планке; быстрые рывки.',
        en: 'Unnecessary knee bending; sagging in the plank; jerky movements.',
      },
      breathing: {
        ru: 'Дышите ровно, выдыхая при выходе в планку.',
        en: 'Breathe steadily, exhaling as you walk into the plank.',
      },
    },
    dosage: {
      strength: {
        sets: '2-4',
        reps: '5-8',
        restSec: '90-150',
      },
      hypertrophy: {
        sets: '2-4',
        reps: '8-12',
        restSec: '60-120',
      },
      endurance: {
        sets: '2-3',
        reps: '12-20',
        restSec: '30-60',
      },
    },
    safety: {
      contraindications: ['joint-wrist-pain'],
      precautions: ['avoid-wrist-overload', 'maintain-control-in-plank', 'bend-knees-if-needed'],
      impactLevel: 'low',
    },
    progression: {
      regressions: ['partial-range-inchworm', 'elevated-hand-inchworm'],
      progressions: ['inchworm-with-push-up', 'single-leg-inchworm'],
      alternatives: ['plank-walkout', 'mountain-climbers'],
    },
    media: {
      images: [],
      videos: [],
      thumbnail: '',
    },
  },
  {
    id: 'tricep-dips',
    slug: 'tricep-dips',
    names: {
      ru: 'Отжимания на трицепс',
      en: 'Tricep Dips',
    },
    aliases: ['bench-dips', 'bodyweight-dips'],
    classification: {
      modality: 'strength',
      exerciseFamily: 'dip',
      movementPatterns: ['vertical-push'],
      difficulty: 'intermediate',
      equipment: ['bodyweight', 'bench'],
      bodyPosition: 'seated',
      laterality: 'bilateral',
    },
    mechanics: {
      executionMode: 'reps',
      tempo: {
        eccentric: 2,
        pauseBottom: 0,
        concentric: 1,
        pauseTop: 0,
      },
      rangeOfMotion: 'full-controlled',
      loadType: 'bodyweight',
    },
    muscles: {
      primary: ['triceps'],
      secondary: ['shoulders', 'chest'],
      stabilizers: ['core', 'upper-back'],
      jointActions: ['elbow-extension', 'shoulder-extension'],
    },
    technique: {
      setup: {
        ru: 'Сядьте на край опоры, поставьте ладони рядом с бедрами, ноги вытяните вперед.',
        en: 'Sit on the edge of a bench with hands next to your hips and legs extended forward.',
      },
      steps: {
        ru: 'Сдвиньте таз с опоры и опускайтесь вниз, сгибая локти. Затем выжмите себя вверх, полностью разгибая руки.',
        en: 'Slide your hips off the bench and lower your body by bending your elbows. Push back up by extending your arms.',
      },
      keyCues: {
        ru: 'Локти направлены назад; держите плечи стабильно; корпус близко к опоре.',
        en: 'Keep elbows pointing back; stabilize your shoulders; keep your body close to the bench.',
      },
      commonErrors: {
        ru: 'Разведение локтей в стороны; опускание слишком глубоко; нагрузка на плечи; провисание корпуса.',
        en: 'Flaring elbows; going too deep; excessive shoulder strain; sagging body.',
      },
      breathing: {
        ru: 'Вдох при опускании, выдох при подъеме.',
        en: 'Inhale as you lower, exhale as you push up.',
      },
    },
    dosage: {
      strength: {
        sets: '3-5',
        reps: '4-8',
        restSec: '90-180',
      },
      hypertrophy: {
        sets: '2-4',
        reps: '6-15',
        restSec: '60-120',
      },
      endurance: {
        sets: '2-4',
        reps: '12-20',
        restSec: '30-60',
      },
    },
    safety: {
      contraindications: ['joint-shoulder-pain'],
      precautions: [
        'avoid-deep-shoulder-extension',
        'control-elbow-position',
        'keep-shoulders-stable',
      ],
      impactLevel: 'low',
    },
    progression: {
      regressions: ['bent-knee-dips', 'assisted-dips'],
      progressions: ['weighted-dips', 'straight-leg-dips'],
      alternatives: ['diamond-push-up', 'bench-press'],
    },
    media: {
      images: [],
      videos: [],
      thumbnail: '',
    },
  },
  {
    id: 'wide-push-up',
    slug: 'wide-push-up',
    names: {
      ru: 'Широкие отжимания',
      en: 'Wide Push-ups',
    },
    aliases: ['wide-grip-push-up', 'wide-hand-push-up'],
    classification: {
      modality: 'strength',
      exerciseFamily: 'push-up',
      movementPatterns: ['horizontal-push'],
      difficulty: 'beginner',
      equipment: ['bodyweight'],
      bodyPosition: 'prone',
      laterality: 'bilateral',
    },
    mechanics: {
      executionMode: 'reps',
      tempo: {
        eccentric: 2,
        pauseBottom: 0,
        concentric: 1,
        pauseTop: 0,
      },
      rangeOfMotion: 'full-controlled',
      loadType: 'bodyweight',
    },
    muscles: {
      primary: ['chest'],
      secondary: ['shoulders'],
      stabilizers: ['core', 'triceps', 'upper-back'],
      jointActions: ['shoulder-horizontal-adduction', 'elbow-extension', 'scapular-stabilization'],
    },
    technique: {
      setup: {
        ru: 'Примите упор лежа, поставив ладони шире плеч. Ноги вытянуты, корпус образует прямую линию от головы до пят.',
        en: 'Start in a push-up position with hands wider than shoulder-width. Legs extended and body forming a straight line from head to heels.',
      },
      steps: {
        ru: 'Согните локти и подконтрольно опустите грудь к полу, сохраняя корпус прямым. Затем выжмите себя вверх, не теряя положения плеч и таза.',
        en: 'Bend your elbows and lower your chest toward the floor with control while keeping your body straight. Press back up without losing shoulder or hip position.',
      },
      keyCues: {
        ru: 'Держите корпус жестким; локти движутся под контролем; давите ладонями в пол.',
        en: 'Keep your body rigid; control the elbows; press your palms into the floor.',
      },
      commonErrors: {
        ru: 'Провисание таза; слишком широкая постановка рук; резкое опускание; чрезмерное разведение локтей.',
        en: 'Sagging hips; placing hands too wide; dropping too quickly; excessive elbow flare.',
      },
      breathing: {
        ru: 'Вдох при опускании, выдох при подъеме.',
        en: 'Inhale as you lower, exhale as you press up.',
      },
    },
    dosage: {
      strength: {
        sets: '2-4',
        reps: '5-8',
        restSec: '90-150',
      },
      hypertrophy: {
        sets: '2-4',
        reps: '8-12',
        restSec: '60-120',
      },
      endurance: {
        sets: '2-3',
        reps: '12-20',
        restSec: '30-60',
      },
    },
    safety: {
      contraindications: ['joint-wrist-pain', 'joint-shoulder-impingement'],
      precautions: [
        'avoid-excessive-hand-width',
        'control-shoulder-position',
        'maintain-neutral-spine',
      ],
      impactLevel: 'low',
    },
    progression: {
      regressions: ['kneeling-wide-push-up', 'incline-wide-push-up'],
      progressions: ['decline-wide-push-up', 'weighted-wide-push-up'],
      alternatives: ['push-up', 'dumbbell-bench-press'],
    },
    media: {
      images: [],
      videos: [],
      thumbnail: '',
    },
  },
  {
    id: 'dumbbell-bench-press',
    slug: 'dumbbell-bench-press',
    names: {
      ru: 'Жим гантелей лёжа',
      en: 'Dumbbell Bench Press',
    },
    aliases: ['db-bench-press', 'dumbbell-chest-press'],
    classification: {
      modality: 'strength',
      exerciseFamily: 'press',
      movementPatterns: ['horizontal-push'],
      difficulty: 'beginner',
      equipment: ['dumbbells', 'bench'],
      bodyPosition: 'supine',
      laterality: 'bilateral',
    },
    mechanics: {
      executionMode: 'reps',
      tempo: {
        eccentric: 2,
        pauseBottom: 0,
        concentric: 1,
        pauseTop: 0,
      },
      rangeOfMotion: 'full-controlled',
      loadType: 'external-load',
    },
    muscles: {
      primary: ['chest'],
      secondary: ['shoulders', 'triceps'],
      stabilizers: ['core', 'upper-back'],
      jointActions: ['shoulder-horizontal-adduction', 'elbow-extension', 'scapular-stabilization'],
    },
    technique: {
      setup: {
        ru: 'Лягте на скамью, стопы поставьте на пол, гантели держите над грудью или у уровня груди с контролем.',
        en: 'Lie on a bench with feet on the floor, holding the dumbbells over your chest or at chest level with control.',
      },
      steps: {
        ru: 'Опустите гантели к сторонам груди, сохраняя лопатки стабильными. Затем выжмите гантели вверх по контролируемой траектории, не сталкивая их вверху.',
        en: 'Lower the dumbbells toward the sides of your chest while keeping your shoulder blades stable. Press them upward on a controlled path without banging them together at the top.',
      },
      keyCues: {
        ru: 'Лопатки стабильны; запястья над локтями; контролируйте нижнюю точку.',
        en: 'Keep shoulder blades stable; wrists over elbows; control the bottom position.',
      },
      commonErrors: {
        ru: 'Слишком глубокое опускание; развал запястий; отрыв стоп от пола; резкое столкновение гантелей.',
        en: 'Lowering too deep; wrists collapsing; feet lifting from the floor; banging dumbbells together.',
      },
      breathing: {
        ru: 'Вдох при опускании гантелей, выдох при жиме вверх.',
        en: 'Inhale as you lower the dumbbells, exhale as you press up.',
      },
    },
    dosage: {
      strength: {
        sets: '2-4',
        reps: '5-8',
        restSec: '90-150',
      },
      hypertrophy: {
        sets: '2-4',
        reps: '8-12',
        restSec: '60-120',
      },
      endurance: {
        sets: '2-3',
        reps: '12-20',
        restSec: '30-60',
      },
    },
    safety: {
      contraindications: ['joint-shoulder-pain'],
      precautions: ['control-bottom-range', 'keep-wrists-neutral', 'use-manageable-load'],
      impactLevel: 'low',
    },
    progression: {
      regressions: ['floor-dumbbell-press', 'single-arm-dumbbell-bench-press'],
      progressions: ['incline-dumbbell-bench-press', 'heavier-dumbbell-bench-press'],
      alternatives: ['push-up', 'barbell-bench-press'],
    },
    media: {
      images: [],
      videos: [],
      thumbnail: '',
    },
  },
  {
    id: 'dumbbell-overhead-press',
    slug: 'dumbbell-overhead-press',
    names: {
      ru: 'Жим гантелей над головой',
      en: 'Dumbbell Overhead Press',
    },
    aliases: ['db-overhead-press', 'dumbbell-shoulder-press'],
    classification: {
      modality: 'strength',
      exerciseFamily: 'press',
      movementPatterns: ['vertical-push'],
      difficulty: 'beginner',
      equipment: ['dumbbells'],
      bodyPosition: 'standing',
      laterality: 'bilateral',
    },
    mechanics: {
      executionMode: 'reps',
      tempo: {
        eccentric: 2,
        pauseBottom: 0,
        concentric: 1,
        pauseTop: 0,
      },
      rangeOfMotion: 'full-controlled',
      loadType: 'external-load',
    },
    muscles: {
      primary: ['shoulders'],
      secondary: ['triceps'],
      stabilizers: ['core', 'upper-back', 'glutes'],
      jointActions: ['shoulder-flexion', 'shoulder-abduction', 'elbow-extension'],
    },
    technique: {
      setup: {
        ru: 'Встаньте устойчиво или сядьте, удерживая гантели у плеч. Корпус напряжен, запястья нейтральны.',
        en: 'Stand firmly or sit holding the dumbbells at shoulder level. Brace your torso and keep wrists neutral.',
      },
      steps: {
        ru: 'Выжмите гантели вверх над головой, сохраняя контроль корпуса. В верхней точке руки почти выпрямлены, затем плавно опустите гантели к плечам.',
        en: 'Press the dumbbells overhead while keeping your torso controlled. At the top, arms are nearly straight, then lower the dumbbells smoothly back to the shoulders.',
      },
      keyCues: {
        ru: 'Ребра вниз; пресс напряжен; жмите гантели по стабильной вертикальной траектории.',
        en: 'Keep ribs down; brace your core; press the dumbbells on a stable vertical path.',
      },
      commonErrors: {
        ru: 'Прогиб в пояснице; развал локтей и запястий; слишком тяжелый вес; неполный контроль при опускании.',
        en: 'Arching the lower back; elbows or wrists collapsing; using too much weight; poor control while lowering.',
      },
      breathing: {
        ru: 'Вдох перед жимом или при опускании, выдох при подъеме.',
        en: 'Inhale before the press or while lowering, exhale as you press up.',
      },
    },
    dosage: {
      strength: {
        sets: '2-4',
        reps: '5-8',
        restSec: '90-150',
      },
      hypertrophy: {
        sets: '2-4',
        reps: '8-12',
        restSec: '60-120',
      },
      endurance: {
        sets: '2-3',
        reps: '12-20',
        restSec: '30-60',
      },
    },
    safety: {
      contraindications: ['joint-shoulder-impingement'],
      precautions: ['avoid-lumbar-overextension', 'keep-wrists-neutral', 'use-controlled-range'],
      impactLevel: 'low',
    },
    progression: {
      regressions: ['seated-dumbbell-overhead-press', 'single-arm-dumbbell-overhead-press'],
      progressions: ['standing-dumbbell-overhead-press', 'heavier-dumbbell-overhead-press'],
      alternatives: ['pike-push-up', 'landmine-press'],
    },
    media: {
      images: [],
      videos: [],
      thumbnail: '',
    },
  },
  {
    id: 'single-arm-dumbbell-row',
    slug: 'single-arm-dumbbell-row',
    names: {
      ru: 'Тяга гантели одной рукой',
      en: 'Single-Arm Dumbbell Row',
    },
    aliases: ['one-arm-dumbbell-row', 'single-arm-db-row'],
    classification: {
      modality: 'strength',
      exerciseFamily: 'row',
      movementPatterns: ['horizontal-pull'],
      difficulty: 'beginner',
      equipment: ['dumbbells', 'bench'],
      bodyPosition: 'standing',
      laterality: 'unilateral',
    },
    mechanics: {
      executionMode: 'reps',
      tempo: {
        eccentric: 2,
        pauseBottom: 1,
        concentric: 1,
        pauseTop: 0,
      },
      rangeOfMotion: 'full-controlled',
      loadType: 'external-load',
    },
    muscles: {
      primary: ['back'],
      secondary: ['biceps'],
      stabilizers: ['core', 'lower-back', 'upper-back'],
      jointActions: ['shoulder-extension', 'elbow-flexion', 'scapular-retraction'],
    },
    technique: {
      setup: {
        ru: 'Поставьте одно колено и одноименную руку на скамью, вторую стопу на пол. Возьмите гантель свободной рукой, спина нейтральная.',
        en: 'Place one knee and the same-side hand on a bench, with the other foot on the floor. Hold a dumbbell in the free hand with a neutral spine.',
      },
      steps: {
        ru: 'Потяните гантель к бедру, ведя локоть назад и удерживая плечо под контролем. Медленно опустите гантель вниз до полного растяжения без скручивания корпуса.',
        en: 'Pull the dumbbell toward your hip, driving the elbow back and keeping the shoulder controlled. Lower the dumbbell slowly to a full stretch without twisting your torso.',
      },
      keyCues: {
        ru: 'Тяните локтем к бедру; держите спину ровной; не разворачивайте корпус.',
        en: 'Drive the elbow toward the hip; keep your back flat; avoid rotating the torso.',
      },
      commonErrors: {
        ru: 'Рывок корпусом; подъем плеча к уху; округление спины; слишком короткая амплитуда.',
        en: 'Jerking with the torso; shrugging the shoulder; rounding the back; cutting the range short.',
      },
      breathing: {
        ru: 'Выдыхайте при тяге вверх, вдыхайте при опускании.',
        en: 'Exhale as you row up, inhale as you lower.',
      },
    },
    dosage: {
      strength: {
        sets: '2-4',
        reps: '5-8',
        restSec: '90-150',
      },
      hypertrophy: {
        sets: '2-4',
        reps: '8-12',
        restSec: '60-120',
      },
      endurance: {
        sets: '2-3',
        reps: '12-20',
        restSec: '30-60',
      },
    },
    safety: {
      contraindications: ['region-lower-back-pain'],
      precautions: ['maintain-neutral-spine', 'avoid-torso-rotation', 'use-manageable-load'],
      impactLevel: 'low',
    },
    progression: {
      regressions: ['chest-supported-dumbbell-row', 'lighter-single-arm-dumbbell-row'],
      progressions: ['unsupported-single-arm-dumbbell-row', 'heavier-single-arm-dumbbell-row'],
      alternatives: ['seated-cable-row', 'inverted-row'],
    },
    media: {
      images: [],
      videos: [],
      thumbnail: '',
    },
  },
  {
    id: 'dumbbell-romanian-deadlift',
    slug: 'dumbbell-romanian-deadlift',
    names: {
      ru: 'Румынская тяга с гантелями',
      en: 'Dumbbell Romanian Deadlift',
    },
    aliases: ['dumbbell-rdl', 'db-romanian-deadlift'],
    classification: {
      modality: 'strength',
      exerciseFamily: 'deadlift',
      movementPatterns: ['hinge'],
      difficulty: 'beginner',
      equipment: ['dumbbells'],
      bodyPosition: 'standing',
      laterality: 'bilateral',
    },
    mechanics: {
      executionMode: 'reps',
      tempo: {
        eccentric: 3,
        pauseBottom: 1,
        concentric: 1,
        pauseTop: 0,
      },
      rangeOfMotion: 'full-controlled',
      loadType: 'external-load',
    },
    muscles: {
      primary: ['hamstrings', 'glutes'],
      secondary: ['back'],
      stabilizers: ['core', 'lats', 'forearms'],
      jointActions: ['hip-extension', 'hip-hinge', 'spine-stabilization'],
    },
    technique: {
      setup: {
        ru: 'Встаньте прямо, удерживая гантели перед бедрами. Стопы на ширине таза, колени слегка согнуты, спина нейтральная.',
        en: 'Stand tall holding dumbbells in front of your thighs. Feet hip-width apart, knees slightly bent, and spine neutral.',
      },
      steps: {
        ru: 'Отведите таз назад и наклонитесь вперед, опуская гантели вдоль ног. Почувствуйте растяжение задней поверхности бедра, затем разогните таз и вернитесь в стойку.',
        en: 'Push your hips back and hinge forward, lowering the dumbbells along your legs. Feel a stretch in the hamstrings, then extend the hips to return to standing.',
      },
      keyCues: {
        ru: 'Таз назад; гантели близко к ногам; спина длинная и стабильная.',
        en: 'Hips back; keep dumbbells close to the legs; maintain a long, stable spine.',
      },
      commonErrors: {
        ru: 'Округление спины; присед вместо наклона; гантели уходят далеко вперед; переразгибание в верхней точке.',
        en: 'Rounding the back; squatting instead of hinging; letting dumbbells drift forward; overextending at the top.',
      },
      breathing: {
        ru: 'Вдох при опускании, выдох при подъеме.',
        en: 'Inhale as you lower, exhale as you stand up.',
      },
    },
    dosage: {
      strength: {
        sets: '2-4',
        reps: '5-8',
        restSec: '90-150',
      },
      hypertrophy: {
        sets: '2-4',
        reps: '8-12',
        restSec: '60-120',
      },
      endurance: {
        sets: '2-3',
        reps: '12-20',
        restSec: '30-60',
      },
    },
    safety: {
      contraindications: ['region-lower-back-pain'],
      precautions: ['maintain-neutral-spine', 'avoid-rounding-back', 'keep-load-close-to-body'],
      impactLevel: 'low',
    },
    progression: {
      regressions: ['bodyweight-hip-hinge', 'lighter-dumbbell-romanian-deadlift'],
      progressions: ['heavier-dumbbell-romanian-deadlift', 'single-leg-dumbbell-romanian-deadlift'],
      alternatives: ['glute-bridge', 'kettlebell-deadlift'],
    },
    media: {
      images: [],
      videos: [],
      thumbnail: '',
    },
  },
  {
    id: 'dumbbell-lunge',
    slug: 'dumbbell-lunge',
    names: {
      ru: 'Выпады с гантелями',
      en: 'Dumbbell Lunges',
    },
    aliases: ['db-lunge', 'weighted-lunge'],
    classification: {
      modality: 'strength',
      exerciseFamily: 'lunge',
      movementPatterns: ['lunge'],
      difficulty: 'beginner',
      equipment: ['dumbbells'],
      bodyPosition: 'standing',
      laterality: 'bilateral',
    },
    mechanics: {
      executionMode: 'reps',
      tempo: {
        eccentric: 2,
        pauseBottom: 0,
        concentric: 1,
        pauseTop: 0,
      },
      rangeOfMotion: 'full-controlled',
      loadType: 'external-load',
    },
    muscles: {
      primary: ['quads', 'glutes'],
      secondary: ['hamstrings'],
      stabilizers: ['core', 'hips'],
      jointActions: ['knee-extension', 'hip-extension', 'spine-stabilization'],
    },
    technique: {
      setup: {
        ru: 'Встаньте прямо, удерживая гантели по бокам корпуса. Стопы на ширине таза, корпус стабилен.',
        en: 'Stand tall holding dumbbells at your sides. Keep feet hip-width apart and your torso stable.',
      },
      steps: {
        ru: 'Сделайте шаг вперед и опуститесь в выпад, сгибая оба колена. Оттолкнитесь передней ногой и вернитесь в исходное положение, затем повторите на другую сторону.',
        en: 'Step forward and lower into a lunge by bending both knees. Push through the front foot to return to the start, then repeat on the other side.',
      },
      keyCues: {
        ru: 'Держите корпус вертикально; колено следует за носком; контролируйте шаг и глубину.',
        en: 'Keep your torso upright; track the knee over the toes; control your step and depth.',
      },
      commonErrors: {
        ru: 'Завал колена внутрь; слишком короткий шаг; наклон корпуса вперед; потеря равновесия.',
        en: 'Knee collapsing inward; step too short; leaning forward; losing balance.',
      },
      breathing: {
        ru: 'Вдох при опускании, выдох при возврате вверх.',
        en: 'Inhale as you lower, exhale as you return up.',
      },
    },
    dosage: {
      strength: {
        sets: '2-4',
        reps: '5-8',
        restSec: '90-150',
      },
      hypertrophy: {
        sets: '2-4',
        reps: '8-12',
        restSec: '60-120',
      },
      endurance: {
        sets: '2-3',
        reps: '12-20',
        restSec: '30-60',
      },
    },
    safety: {
      contraindications: ['joint-knee-pain'],
      precautions: ['control-knee-alignment', 'use-manageable-load', 'maintain-balance'],
      impactLevel: 'low',
    },
    progression: {
      regressions: ['bodyweight-lunge', 'assisted-lunge'],
      progressions: ['heavier-dumbbell-lunge', 'walking-dumbbell-lunge'],
      alternatives: ['reverse-lunge', 'split-squat'],
    },
    media: {
      images: [],
      videos: [],
      thumbnail: '',
    },
  },
  {
    id: 'dumbbell-bicep-curl',
    slug: 'dumbbell-bicep-curl',
    names: {
      ru: 'Сгибания рук с гантелями',
      en: 'Dumbbell Bicep Curls',
    },
    aliases: ['db-bicep-curl', 'dumbbell-curl'],
    classification: {
      modality: 'strength',
      exerciseFamily: 'curl',
      movementPatterns: ['elbow-flexion'],
      difficulty: 'beginner',
      equipment: ['dumbbells'],
      bodyPosition: 'standing',
      laterality: 'bilateral',
    },
    mechanics: {
      executionMode: 'reps',
      tempo: {
        eccentric: 2,
        pauseBottom: 0,
        concentric: 1,
        pauseTop: 1,
      },
      rangeOfMotion: 'full-controlled',
      loadType: 'external-load',
    },
    muscles: {
      primary: ['biceps'],
      secondary: ['forearms'],
      stabilizers: ['core', 'shoulders'],
      jointActions: ['elbow-flexion', 'forearm-supination'],
    },
    technique: {
      setup: {
        ru: 'Встаньте прямо, удерживая гантели по бокам корпуса ладонями вперед или нейтрально.',
        en: 'Stand tall holding dumbbells at your sides with palms facing forward or neutral.',
      },
      steps: {
        ru: 'Сохраняя локти близко к корпусу, согните руки и поднимите гантели к плечам. На секунду зафиксируйте верхнюю точку и медленно опустите гантели вниз.',
        en: 'Keeping your elbows close to your body, curl the dumbbells toward your shoulders. Pause briefly at the top, then lower the dumbbells slowly.',
      },
      keyCues: {
        ru: 'Локти остаются неподвижными; не раскачивайте корпус; опускайте вес медленно.',
        en: 'Keep elbows still; avoid swinging your body; lower the weight slowly.',
      },
      commonErrors: {
        ru: 'Раскачивание корпусом; выведение локтей вперед или назад; слишком тяжелый вес; неполное опускание.',
        en: 'Swinging the torso; moving elbows forward or backward; using too much weight; not lowering fully.',
      },
      breathing: {
        ru: 'Выдыхайте при подъеме, вдыхайте при опускании.',
        en: 'Exhale as you curl up, inhale as you lower.',
      },
    },
    dosage: {
      strength: {
        sets: '2-4',
        reps: '5-8',
        restSec: '90-150',
      },
      hypertrophy: {
        sets: '2-4',
        reps: '8-12',
        restSec: '60-120',
      },
      endurance: {
        sets: '2-3',
        reps: '12-20',
        restSec: '30-60',
      },
    },
    safety: {
      contraindications: [],
      precautions: ['avoid-swinging', 'keep-wrists-neutral', 'use-manageable-load'],
      impactLevel: 'low',
    },
    progression: {
      regressions: ['lighter-dumbbell-curl', 'seated-dumbbell-curl'],
      progressions: ['heavier-dumbbell-curl', 'alternating-dumbbell-curl'],
      alternatives: ['hammer-curl', 'band-bicep-curl'],
    },
    media: {
      images: [],
      videos: [],
      thumbnail: '',
    },
  },
  {
    id: 'dumbbell-lateral-raise',
    slug: 'dumbbell-lateral-raise',
    names: {
      ru: 'Махи гантелями в стороны',
      en: 'Dumbbell Lateral Raises',
    },
    aliases: ['db-lateral-raise', 'side-lateral-raise'],
    classification: {
      modality: 'strength',
      exerciseFamily: 'raise',
      movementPatterns: ['shoulder-abduction'],
      difficulty: 'beginner',
      equipment: ['dumbbells'],
      bodyPosition: 'standing',
      laterality: 'bilateral',
    },
    mechanics: {
      executionMode: 'reps',
      tempo: {
        eccentric: 2,
        pauseBottom: 1,
        concentric: 1,
        pauseTop: 0,
      },
      rangeOfMotion: 'full-controlled',
      loadType: 'external-load',
    },
    muscles: {
      primary: ['shoulders'],
      secondary: ['upper-back'],
      stabilizers: ['core', 'upper-back'],
      jointActions: ['shoulder-abduction', 'scapular-stabilization'],
    },
    technique: {
      setup: {
        ru: 'Встаньте прямо, удерживая гантели по бокам. Локти слегка согнуты, корпус стабилен.',
        en: 'Stand tall holding dumbbells at your sides. Keep elbows slightly bent and torso stable.',
      },
      steps: {
        ru: 'Поднимите руки через стороны до уровня плеч, сохраняя легкий сгиб в локтях. Медленно опустите гантели вниз без раскачки.',
        en: 'Raise your arms out to the sides to shoulder level while keeping a slight bend in the elbows. Lower the dumbbells slowly without swinging.',
      },
      keyCues: {
        ru: 'Ведите локти в стороны; плечи не поднимайте к ушам; используйте легкий контролируемый вес.',
        en: 'Lead with the elbows; do not shrug the shoulders; use a light, controlled weight.',
      },
      commonErrors: {
        ru: 'Рывки корпусом; подъем выше комфортного уровня; пожимание плечами; слишком тяжелые гантели.',
        en: 'Using body momentum; raising above a comfortable level; shrugging; using dumbbells that are too heavy.',
      },
      breathing: {
        ru: 'Выдыхайте при подъеме рук, вдыхайте при опускании.',
        en: 'Exhale as you raise the arms, inhale as you lower.',
      },
    },
    dosage: {
      strength: {
        sets: '2-4',
        reps: '5-8',
        restSec: '90-150',
      },
      hypertrophy: {
        sets: '2-4',
        reps: '8-12',
        restSec: '60-120',
      },
      endurance: {
        sets: '2-3',
        reps: '12-20',
        restSec: '30-60',
      },
    },
    safety: {
      contraindications: ['joint-shoulder-impingement'],
      precautions: ['avoid-shrugging', 'use-light-load', 'stay-within-comfortable-range'],
      impactLevel: 'low',
    },
    progression: {
      regressions: ['lighter-dumbbell-lateral-raise', 'seated-dumbbell-lateral-raise'],
      progressions: ['heavier-dumbbell-lateral-raise', 'slow-tempo-lateral-raise'],
      alternatives: ['band-lateral-raise', 'cable-lateral-raise'],
    },
    media: {
      images: [],
      videos: [],
      thumbnail: '',
    },
  },
  {
    id: 'dumbbell-chest-fly',
    slug: 'dumbbell-chest-fly',
    names: {
      ru: 'Разведения гантелей лёжа',
      en: 'Dumbbell Chest Fly',
    },
    aliases: ['db-chest-fly', 'dumbbell-fly'],
    classification: {
      modality: 'strength',
      exerciseFamily: 'fly',
      movementPatterns: ['horizontal-adduction'],
      difficulty: 'beginner',
      equipment: ['dumbbells', 'bench'],
      bodyPosition: 'supine',
      laterality: 'bilateral',
    },
    mechanics: {
      executionMode: 'reps',
      tempo: {
        eccentric: 3,
        pauseBottom: 1,
        concentric: 1,
        pauseTop: 0,
      },
      rangeOfMotion: 'full-controlled',
      loadType: 'external-load',
    },
    muscles: {
      primary: ['chest'],
      secondary: ['shoulders'],
      stabilizers: ['core', 'upper-back'],
      jointActions: ['shoulder-horizontal-adduction', 'scapular-stabilization'],
    },
    technique: {
      setup: {
        ru: 'Лягте на скамью, удерживая гантели над грудью. Локти слегка согнуты, лопатки стабильны.',
        en: 'Lie on a bench holding the dumbbells over your chest. Keep elbows slightly bent and shoulder blades stable.',
      },
      steps: {
        ru: 'Медленно разведите руки в стороны до комфортного растяжения груди. Затем сведите гантели обратно над грудью по дуге, сохраняя одинаковый сгиб в локтях.',
        en: 'Slowly open your arms out to the sides until you feel a comfortable chest stretch. Bring the dumbbells back together over your chest in an arc while keeping the same elbow bend.',
      },
      keyCues: {
        ru: 'Локти мягко согнуты; движение идет по дуге; не опускайте гантели слишком глубоко.',
        en: 'Keep elbows softly bent; move in an arc; do not lower the dumbbells too deep.',
      },
      commonErrors: {
        ru: 'Слишком глубокое разведение; превращение движения в жим; потеря контроля запястий; тяжелый вес.',
        en: 'Opening too deep; turning the movement into a press; losing wrist control; using too much weight.',
      },
      breathing: {
        ru: 'Вдох при разведении рук, выдох при сведении.',
        en: 'Inhale as you open the arms, exhale as you bring them together.',
      },
    },
    dosage: {
      strength: {
        sets: '2-4',
        reps: '5-8',
        restSec: '90-150',
      },
      hypertrophy: {
        sets: '2-4',
        reps: '8-12',
        restSec: '60-120',
      },
      endurance: {
        sets: '2-3',
        reps: '12-20',
        restSec: '30-60',
      },
    },
    safety: {
      contraindications: ['joint-shoulder-pain'],
      precautions: [
        'avoid-excessive-depth',
        'use-light-to-moderate-load',
        'keep-elbows-slightly-bent',
      ],
      impactLevel: 'low',
    },
    progression: {
      regressions: ['floor-dumbbell-chest-fly', 'lighter-dumbbell-chest-fly'],
      progressions: ['incline-dumbbell-chest-fly', 'heavier-dumbbell-chest-fly'],
      alternatives: ['dumbbell-bench-press', 'push-up'],
    },
    media: {
      images: [],
      videos: [],
      thumbnail: '',
    },
  },
  {
    id: 'renegade-row',
    slug: 'renegade-row',
    names: {
      ru: 'Отжимания с тягой гантелей',
      en: 'Renegade Row',
    },
    aliases: ['plank-dumbbell-row', 'renegade-dumbbell-row'],
    classification: {
      modality: 'strength',
      exerciseFamily: 'row',
      movementPatterns: ['horizontal-pull', 'core-anti-extension'],
      difficulty: 'advanced',
      equipment: ['dumbbells'],
      bodyPosition: 'prone',
      laterality: 'bilateral',
    },
    mechanics: {
      executionMode: 'reps',
      tempo: {
        eccentric: 1,
        pauseBottom: 0,
        concentric: 1,
        pauseTop: 0,
      },
      rangeOfMotion: 'full-controlled',
      loadType: 'external-load',
    },
    muscles: {
      primary: ['back', 'core'],
      secondary: ['chest'],
      stabilizers: ['shoulders', 'glutes', 'triceps'],
      jointActions: ['shoulder-extension', 'elbow-flexion', 'spine-stabilization'],
    },
    technique: {
      setup: {
        ru: 'Примите упор лежа, удерживая гантели под плечами. Стопы поставьте шире таза для устойчивости.',
        en: 'Start in a push-up position holding dumbbells under your shoulders. Place feet wider than hips for stability.',
      },
      steps: {
        ru: 'Напрягите корпус и ягодицы. Подтяните одну гантель к поясу, не разворачивая таз. Поставьте гантель обратно и повторите другой рукой.',
        en: 'Brace your core and glutes. Row one dumbbell toward your waist without rotating your hips. Place it back down and repeat with the other arm.',
      },
      keyCues: {
        ru: 'Таз остается ровным; тяните локоть к ребрам; давите опорной рукой в гантель.',
        en: 'Keep hips level; pull the elbow toward the ribs; press the supporting hand into the dumbbell.',
      },
      commonErrors: {
        ru: 'Разворот таза; провисание поясницы; слишком узкая постановка стоп; рывок гантели.',
        en: 'Rotating the hips; sagging the lower back; feet too narrow; jerking the dumbbell.',
      },
      breathing: {
        ru: 'Выдыхайте при тяге, вдыхайте при возвращении гантели вниз.',
        en: 'Exhale as you row, inhale as you lower the dumbbell.',
      },
    },
    dosage: {
      strength: {
        sets: '3-5',
        reps: '4-8',
        restSec: '90-180',
      },
      hypertrophy: {
        sets: '2-4',
        reps: '6-15',
        restSec: '60-120',
      },
      endurance: {
        sets: '2-4',
        reps: '12-20',
        restSec: '30-60',
      },
    },
    safety: {
      contraindications: ['joint-wrist-pain', 'region-lower-back-pain'],
      precautions: ['use-stable-dumbbells', 'avoid-hip-rotation', 'maintain-neutral-spine'],
      impactLevel: 'medium',
    },
    progression: {
      regressions: ['kneeling-renegade-row', 'plank-shoulder-taps'],
      progressions: ['renegade-row-with-push-up', 'heavier-renegade-row'],
      alternatives: ['single-arm-dumbbell-row', 'plank'],
    },
    media: {
      images: [],
      videos: [],
      thumbnail: '',
    },
  },
  {
    id: 'dumbbell-thrusters',
    slug: 'dumbbell-thrusters',
    names: {
      ru: 'Трастеры с гантелями',
      en: 'Dumbbell Thrusters',
    },
    aliases: ['db-thrusters', 'dumbbell-squat-to-press'],
    classification: {
      modality: 'cardio',
      exerciseFamily: 'thruster',
      movementPatterns: ['squat', 'vertical-push'],
      difficulty: 'intermediate',
      equipment: ['dumbbells'],
      bodyPosition: 'standing',
      laterality: 'bilateral',
    },
    mechanics: {
      executionMode: 'reps',
      tempo: {
        eccentric: 2,
        pauseBottom: 0,
        concentric: 1,
        pauseTop: 0,
      },
      rangeOfMotion: 'full-controlled',
      loadType: 'external-load',
    },
    muscles: {
      primary: ['quads', 'glutes', 'shoulders'],
      secondary: ['triceps', 'core'],
      stabilizers: ['upper-back', 'hips'],
      jointActions: ['knee-extension', 'hip-extension', 'shoulder-flexion', 'elbow-extension'],
    },
    technique: {
      setup: {
        ru: 'Встаньте прямо, удерживая гантели у плеч. Стопы на ширине плеч, корпус напряжен.',
        en: 'Stand tall holding dumbbells at shoulder level. Feet shoulder-width apart and torso braced.',
      },
      steps: {
        ru: 'Опуститесь в присед, удерживая гантели у плеч. Из нижней точки мощно встаньте и продолжите движение жимом гантелей над головой. Подконтрольно верните гантели к плечам и повторите.',
        en: 'Lower into a squat while keeping the dumbbells at your shoulders. Drive up powerfully and continue into an overhead press. Lower the dumbbells back to your shoulders with control and repeat.',
      },
      keyCues: {
        ru: 'Используйте силу ног для жима; держите ребра вниз; колени следуют за носками.',
        en: 'Use leg drive for the press; keep ribs down; track knees over toes.',
      },
      commonErrors: {
        ru: 'Прогиб в пояснице при жиме; завал коленей внутрь; слишком тяжелые гантели; разрыв движения между приседом и жимом.',
        en: 'Arching the lower back during the press; knees collapsing inward; using dumbbells that are too heavy; disconnecting the squat from the press.',
      },
      breathing: {
        ru: 'Вдох при опускании в присед, выдох при подъеме и жиме.',
        en: 'Inhale as you lower into the squat, exhale as you stand and press.',
      },
    },
    dosage: {
      strength: {
        sets: '3-5',
        reps: '4-8',
        restSec: '90-180',
      },
      hypertrophy: {
        sets: '2-4',
        reps: '6-15',
        restSec: '60-120',
      },
      endurance: {
        sets: '2-4',
        reps: '12-20',
        restSec: '30-60',
      },
    },
    safety: {
      contraindications: ['joint-shoulder-pain', 'joint-knee-pain'],
      precautions: ['use-manageable-load', 'control-knee-alignment', 'avoid-lumbar-overextension'],
      impactLevel: 'medium',
    },
    progression: {
      regressions: ['dumbbell-front-squat', 'dumbbell-overhead-press'],
      progressions: ['heavier-dumbbell-thrusters', 'single-arm-dumbbell-thruster'],
      alternatives: ['kettlebell-goblet-squat', 'push-press'],
    },
    media: {
      images: [],
      videos: [],
      thumbnail: '',
    },
  },
  {
    id: 'kettlebell-swing',
    slug: 'kettlebell-swing',
    names: {
      ru: 'Махи гирей',
      en: 'Kettlebell Swing',
    },
    aliases: ['kb-swing', 'russian-kettlebell-swing'],
    classification: {
      modality: 'cardio',
      exerciseFamily: 'swing',
      movementPatterns: ['hinge', 'cardio'],
      difficulty: 'intermediate',
      equipment: ['kettlebell'],
      bodyPosition: 'standing',
      laterality: 'bilateral',
    },
    mechanics: {
      executionMode: 'reps',
      tempo: {
        eccentric: 1,
        pauseBottom: 0,
        concentric: 1,
        pauseTop: 0,
      },
      rangeOfMotion: 'full-controlled',
      loadType: 'external-load',
    },
    muscles: {
      primary: ['glutes', 'hamstrings'],
      secondary: ['core'],
      stabilizers: ['back', 'lats', 'forearms'],
      jointActions: ['hip-extension', 'hip-hinge', 'spine-stabilization'],
    },
    technique: {
      setup: {
        ru: 'Встаньте перед гирей, стопы чуть шире таза. Наклонитесь через таз и возьмите рукоять обеими руками.',
        en: 'Stand in front of the kettlebell with feet slightly wider than hip-width. Hinge at the hips and grip the handle with both hands.',
      },
      steps: {
        ru: 'Заведите гирю назад между бедрами, сохраняя спину нейтральной. Мощно разогните таз и позвольте гире подняться примерно до уровня груди. Затем снова направьте гирю назад через тазовый наклон.',
        en: 'Hike the kettlebell back between your thighs while keeping a neutral spine. Powerfully extend your hips and let the kettlebell rise to about chest height. Guide it back into the hinge for the next rep.',
      },
      keyCues: {
        ru: 'Движение идет от бедер; руки как крюки; гиря летит, а не поднимается плечами.',
        en: 'Drive from the hips; arms act like hooks; the bell floats rather than being lifted by the shoulders.',
      },
      commonErrors: {
        ru: 'Присед вместо наклона; подъем гирей руками; округление спины; переразгибание поясницы вверху.',
        en: 'Squatting instead of hinging; lifting with the arms; rounding the back; overextending the lower back at the top.',
      },
      breathing: {
        ru: 'Резко выдыхайте при разгибании таза, вдыхайте при возврате гири назад.',
        en: 'Exhale sharply as you extend the hips, inhale as the kettlebell returns back.',
      },
    },
    dosage: {
      strength: {
        sets: '3-5',
        reps: '4-8',
        restSec: '90-180',
      },
      hypertrophy: {
        sets: '2-4',
        reps: '6-15',
        restSec: '60-120',
      },
      endurance: {
        sets: '2-4',
        reps: '12-20',
        restSec: '30-60',
      },
    },
    safety: {
      contraindications: ['region-lower-back-pain'],
      precautions: [
        'maintain-neutral-spine',
        'avoid-lifting-with-arms',
        'keep-kettlebell-close-on-backswing',
      ],
      impactLevel: 'medium',
    },
    progression: {
      regressions: ['kettlebell-deadlift', 'hip-hinge-drill'],
      progressions: ['heavier-kettlebell-swing', 'single-arm-kettlebell-swing'],
      alternatives: ['dumbbell-romanian-deadlift', 'glute-bridge'],
    },
    media: {
      images: [],
      videos: [],
      thumbnail: '',
    },
  },
  {
    id: 'kettlebell-goblet-squat',
    slug: 'kettlebell-goblet-squat',
    names: {
      ru: 'Гоблет-приседания с гирей',
      en: 'Kettlebell Goblet Squat',
    },
    aliases: ['kb-goblet-squat', 'goblet-squat'],
    classification: {
      modality: 'strength',
      exerciseFamily: 'squat',
      movementPatterns: ['squat'],
      difficulty: 'beginner',
      equipment: ['kettlebell'],
      bodyPosition: 'standing',
      laterality: 'bilateral',
    },
    mechanics: {
      executionMode: 'reps',
      tempo: {
        eccentric: 2,
        pauseBottom: 1,
        concentric: 1,
        pauseTop: 0,
      },
      rangeOfMotion: 'full-controlled',
      loadType: 'external-load',
    },
    muscles: {
      primary: ['quads', 'glutes'],
      secondary: ['core'],
      stabilizers: ['upper-back', 'adductors'],
      jointActions: ['knee-extension', 'hip-extension', 'spine-stabilization'],
    },
    technique: {
      setup: {
        ru: 'Встаньте прямо, удерживая гирю у груди за рукоять или боковые части. Стопы на ширине плеч.',
        en: 'Stand tall holding the kettlebell at your chest by the handle or horns. Feet shoulder-width apart.',
      },
      steps: {
        ru: 'Опуститесь в присед, удерживая грудь поднятой и гирю близко к корпусу. Задержитесь коротко внизу, затем встаньте, разгибая колени и таз.',
        en: 'Lower into a squat while keeping your chest up and the kettlebell close to your body. Pause briefly at the bottom, then stand by extending knees and hips.',
      },
      keyCues: {
        ru: 'Гиря близко к груди; колени следуют за носками; спина длинная.',
        en: 'Keep the bell close to your chest; track knees over toes; maintain a long spine.',
      },
      commonErrors: {
        ru: 'Завал коленей внутрь; округление спины; отрыв пяток; потеря контроля в нижней точке.',
        en: 'Knees collapsing inward; rounding the back; heels lifting; losing control at the bottom.',
      },
      breathing: {
        ru: 'Вдох при опускании, выдох при подъеме.',
        en: 'Inhale as you lower, exhale as you stand up.',
      },
    },
    dosage: {
      strength: {
        sets: '2-4',
        reps: '5-8',
        restSec: '90-150',
      },
      hypertrophy: {
        sets: '2-4',
        reps: '8-12',
        restSec: '60-120',
      },
      endurance: {
        sets: '2-3',
        reps: '12-20',
        restSec: '30-60',
      },
    },
    safety: {
      contraindications: ['joint-knee-pain'],
      precautions: ['control-knee-alignment', 'keep-load-close-to-body', 'avoid-losing-balance'],
      impactLevel: 'low',
    },
    progression: {
      regressions: ['bodyweight-squat', 'box-goblet-squat'],
      progressions: ['heavier-kettlebell-goblet-squat', 'goblet-squat-with-pause'],
      alternatives: ['dumbbell-goblet-squat', 'front-squat'],
    },
    media: {
      images: [],
      videos: [],
      thumbnail: '',
    },
  },
  {
    id: 'kettlebell-clean-and-press',
    slug: 'kettlebell-clean-and-press',
    names: {
      ru: 'Взятие гири на грудь и жим',
      en: 'Kettlebell Clean and Press',
    },
    aliases: ['kb-clean-and-press', 'kettlebell-clean-press'],
    classification: {
      modality: 'strength',
      exerciseFamily: 'clean-and-press',
      movementPatterns: ['hinge', 'vertical-push'],
      difficulty: 'advanced',
      equipment: ['kettlebell'],
      bodyPosition: 'standing',
      laterality: 'bilateral',
    },
    mechanics: {
      executionMode: 'reps',
      tempo: {
        eccentric: 2,
        pauseBottom: 0,
        concentric: 1,
        pauseTop: 0,
      },
      rangeOfMotion: 'full-controlled',
      loadType: 'external-load',
    },
    muscles: {
      primary: ['full-body'],
      secondary: ['shoulders', 'glutes', 'core'],
      stabilizers: ['upper-back', 'forearms', 'hips'],
      jointActions: ['hip-extension', 'shoulder-flexion', 'elbow-extension', 'spine-stabilization'],
    },
    technique: {
      setup: {
        ru: 'Встаньте устойчиво с гирей перед собой или между стопами. Возьмите рукоять одной или двумя руками в зависимости от варианта.',
        en: 'Stand firmly with the kettlebell in front of you or between your feet. Grip the handle with one or both hands depending on the variation.',
      },
      steps: {
        ru: 'Через мощное разгибание бедер поднимите гирю в положение у груди, мягко принимая ее без удара по предплечью. Из устойчивой стойки выжмите гирю над головой, затем подконтрольно верните к груди и вниз.',
        en: 'Use a powerful hip extension to clean the kettlebell to the rack position, catching it softly without slamming the forearm. From a stable stance, press it overhead, then return it to the rack and down with control.',
      },
      keyCues: {
        ru: 'Гиря движется близко к телу; ловите мягко; перед жимом стабилизируйте корпус.',
        en: 'Keep the bell close to the body; catch it softly; stabilize your torso before pressing.',
      },
      commonErrors: {
        ru: 'Удар гири по предплечью; тяга рукой вместо работы бедер; прогиб поясницы при жиме; потеря контроля в опускании.',
        en: 'Letting the bell slam the forearm; pulling with the arm instead of using the hips; arching the lower back during the press; losing control on the way down.',
      },
      breathing: {
        ru: 'Выдыхайте при взятии и при жиме, вдыхайте при контролируемом возврате.',
        en: 'Exhale during the clean and the press, inhale during the controlled return.',
      },
    },
    dosage: {
      strength: {
        sets: '3-5',
        reps: '4-8',
        restSec: '90-180',
      },
      hypertrophy: {
        sets: '2-4',
        reps: '6-15',
        restSec: '60-120',
      },
      endurance: {
        sets: '2-4',
        reps: '12-20',
        restSec: '30-60',
      },
    },
    safety: {
      contraindications: ['joint-shoulder-pain', 'region-lower-back-pain'],
      precautions: ['learn-clean-before-press', 'avoid-forearm-impact', 'maintain-neutral-spine'],
      impactLevel: 'medium',
    },
    progression: {
      regressions: ['kettlebell-clean', 'kettlebell-strict-press'],
      progressions: ['heavier-kettlebell-clean-and-press', 'double-kettlebell-clean-and-press'],
      alternatives: ['dumbbell-thrusters', 'dumbbell-overhead-press'],
    },
    media: {
      images: [],
      videos: [],
      thumbnail: '',
    },
  },
  {
    id: 'turkish-get-up',
    slug: 'turkish-get-up',
    names: {
      ru: 'Турецкий подъём с гирей',
      en: 'Turkish Get-Up',
    },
    aliases: ['tgu', 'kettlebell-turkish-get-up'],
    classification: {
      modality: 'strength',
      exerciseFamily: 'get-up',
      movementPatterns: ['full-body-dynamic'],
      difficulty: 'advanced',
      equipment: ['kettlebell'],
      bodyPosition: 'supine',
      laterality: 'bilateral',
    },
    mechanics: {
      executionMode: 'reps',
      tempo: {
        eccentric: 3,
        pauseBottom: 1,
        concentric: 3,
        pauseTop: 1,
      },
      rangeOfMotion: 'full-controlled',
      loadType: 'external-load',
    },
    muscles: {
      primary: ['shoulders', 'core'],
      secondary: ['full-body'],
      stabilizers: ['glutes', 'upper-back', 'hips'],
      jointActions: [
        'shoulder-stabilization',
        'spine-stabilization',
        'hip-extension',
        'knee-extension',
      ],
    },
    technique: {
      setup: {
        ru: 'Лягте на спину с гирей в одной руке над плечом. Нога со стороны гири согнута, противоположная рука и нога расположены в сторону для опоры.',
        en: 'Lie on your back with the kettlebell in one hand over the shoulder. Bend the leg on the kettlebell side, with the opposite arm and leg out to the side for support.',
      },
      steps: {
        ru: 'Не сводя глаз с гири, перекатитесь на локоть, затем на ладонь. Поднимите таз, проведите ногу назад в положение выпада, встаньте. Обратно выполните те же этапы в обратном порядке, сохраняя руку с гирей вертикально.',
        en: 'Keep your eyes on the kettlebell as you roll to the elbow, then to the hand. Lift the hips, sweep the leg back into a lunge position, and stand up. Reverse the same steps to return to the floor while keeping the kettlebell arm vertical.',
      },
      keyCues: {
        ru: 'Рука с гирей вертикальна; двигайтесь по этапам; не торопитесь и сохраняйте контроль плеча.',
        en: 'Keep the kettlebell arm vertical; move step by step; stay slow and maintain shoulder control.',
      },
      commonErrors: {
        ru: 'Потеря вертикали руки; спешка между этапами; нестабильное плечо; слишком тяжелая гиря.',
        en: 'Losing vertical arm alignment; rushing between steps; unstable shoulder; using a kettlebell that is too heavy.',
      },
      breathing: {
        ru: 'Дышите ровно на каждом этапе, делая выдох при переходах вверх.',
        en: 'Breathe steadily through each step, exhaling during upward transitions.',
      },
    },
    dosage: {
      strength: {
        sets: '3-5',
        reps: '4-8',
        restSec: '90-180',
      },
      hypertrophy: {
        sets: '2-4',
        reps: '6-15',
        restSec: '60-120',
      },
      endurance: {
        sets: '2-4',
        reps: '12-20',
        restSec: '30-60',
      },
    },
    safety: {
      contraindications: ['joint-shoulder-pain', 'region-lower-back-pain'],
      precautions: [
        'use-light-load-while-learning',
        'keep-eyes-on-kettlebell',
        'maintain-shoulder-stability',
      ],
      impactLevel: 'low',
    },
    progression: {
      regressions: ['bodyweight-turkish-get-up', 'shoe-turkish-get-up'],
      progressions: ['heavier-turkish-get-up', 'paused-turkish-get-up'],
      alternatives: ['windmill', 'half-kneeling-kettlebell-press'],
    },
    media: {
      images: [],
      videos: [],
      thumbnail: '',
    },
  },
  {
    id: 'kettlebell-snatch',
    slug: 'kettlebell-snatch',
    names: {
      ru: 'Рывок гири',
      en: 'Kettlebell Snatch',
    },
    aliases: ['kb-snatch', 'single-arm-kettlebell-snatch'],
    classification: {
      modality: 'cardio',
      exerciseFamily: 'snatch',
      movementPatterns: ['vertical-pull', 'cardio'],
      difficulty: 'advanced',
      equipment: ['kettlebell'],
      bodyPosition: 'standing',
      laterality: 'bilateral',
    },
    mechanics: {
      executionMode: 'reps',
      tempo: {
        eccentric: 1,
        pauseBottom: 0,
        concentric: 1,
        pauseTop: 0,
      },
      rangeOfMotion: 'full-controlled',
      loadType: 'external-load',
    },
    muscles: {
      primary: ['shoulders', 'back'],
      secondary: ['glutes'],
      stabilizers: ['core', 'forearms', 'upper-back'],
      jointActions: ['hip-extension', 'shoulder-flexion', 'elbow-extension', 'spine-stabilization'],
    },
    technique: {
      setup: {
        ru: 'Встаньте устойчиво, гиря перед вами или между стопами. Возьмите рукоять одной рукой, спина нейтральная, корпус напряжен.',
        en: 'Stand firmly with the kettlebell in front of you or between your feet. Grip the handle with one hand, keeping your spine neutral and core braced.',
      },
      steps: {
        ru: 'Через тазовый наклон заведите гирю назад между бедрами. Мощно разогните таз и направьте гирю вверх близко к телу, мягко переводя руку в положение над головой. Зафиксируйте гирю сверху, затем подконтрольно верните ее вниз.',
        en: 'Hinge at the hips and hike the kettlebell back between your thighs. Powerfully extend your hips and guide the bell upward close to the body, punching the hand through softly overhead. Stabilize at the top, then return it down with control.',
      },
      keyCues: {
        ru: 'Гиря движется близко к телу; ловите мягко без удара по предплечью; держите корпус стабильным.',
        en: 'Keep the bell close to the body; catch softly without forearm impact; keep your torso stable.',
      },
      commonErrors: {
        ru: 'Удар гири по предплечью; подъем рукой вместо работы бедер; округление спины; потеря контроля над гирей сверху.',
        en: 'Letting the bell slam the forearm; lifting with the arm instead of driving with the hips; rounding the back; losing control overhead.',
      },
      breathing: {
        ru: 'Резко выдыхайте при рывке вверх, вдыхайте при возврате гири вниз.',
        en: 'Exhale sharply during the snatch upward, inhale as the kettlebell returns down.',
      },
    },
    dosage: {
      strength: {
        sets: '3-5',
        reps: '4-8',
        restSec: '90-180',
      },
      hypertrophy: {
        sets: '2-4',
        reps: '6-15',
        restSec: '60-120',
      },
      endurance: {
        sets: '2-4',
        reps: '12-20',
        restSec: '30-60',
      },
    },
    safety: {
      contraindications: ['joint-shoulder-pain'],
      precautions: [
        'learn-swing-and-clean-first',
        'avoid-forearm-impact',
        'maintain-overhead-control',
      ],
      impactLevel: 'medium',
    },
    progression: {
      regressions: ['kettlebell-swing', 'kettlebell-clean'],
      progressions: ['heavier-kettlebell-snatch', 'alternating-kettlebell-snatch'],
      alternatives: ['kettlebell-clean-and-press', 'dumbbell-snatch'],
    },
    media: {
      images: [],
      videos: [],
      thumbnail: '',
    },
  },
  {
    id: 'kettlebell-windmill',
    slug: 'kettlebell-windmill',
    names: {
      ru: 'Мельница с гирей',
      en: 'Kettlebell Windmill',
    },
    aliases: ['kb-windmill', 'overhead-kettlebell-windmill'],
    classification: {
      modality: 'strength',
      exerciseFamily: 'windmill',
      movementPatterns: ['core-rotation'],
      difficulty: 'advanced',
      equipment: ['kettlebell'],
      bodyPosition: 'standing',
      laterality: 'bilateral',
    },
    mechanics: {
      executionMode: 'reps',
      tempo: {
        eccentric: 3,
        pauseBottom: 0,
        concentric: 2,
        pauseTop: 1,
      },
      rangeOfMotion: 'full-controlled',
      loadType: 'external-load',
    },
    muscles: {
      primary: ['core', 'obliques'],
      secondary: ['shoulders'],
      stabilizers: ['glutes', 'hamstrings', 'upper-back'],
      jointActions: ['spine-rotation', 'hip-hinge', 'shoulder-stabilization'],
    },
    technique: {
      setup: {
        ru: 'Встаньте устойчиво и выжмите гирю над плечом. Стопы слегка разверните в сторону от рабочей руки, свободная рука направлена вниз.',
        en: 'Stand firmly and press the kettlebell overhead. Turn your feet slightly away from the working arm, with the free hand pointing down.',
      },
      steps: {
        ru: 'Сохраняя руку с гирей вертикальной, отведите таз в сторону и наклонитесь через тазобедренные суставы. Свободной рукой тянитесь к полу или голени, затем подконтрольно вернитесь в стойку.',
        en: 'Keeping the kettlebell arm vertical, shift your hips to the side and hinge at the hips. Reach the free hand toward the floor or shin, then return to standing with control.',
      },
      keyCues: {
        ru: 'Смотрите на гирю; держите плечо стабильным; двигайтесь через таз, а не через поясницу.',
        en: 'Look at the kettlebell; keep the shoulder stable; move through the hips rather than the lower back.',
      },
      commonErrors: {
        ru: 'Потеря вертикали руки; округление спины; слишком большая амплитуда; спешка при подъеме.',
        en: 'Losing vertical arm alignment; rounding the back; using too much range; rushing the return.',
      },
      breathing: {
        ru: 'Вдыхайте при наклоне, выдыхайте при возвращении в стойку.',
        en: 'Inhale as you lower, exhale as you return to standing.',
      },
    },
    dosage: {
      strength: {
        sets: '3-5',
        reps: '4-8',
        restSec: '90-180',
      },
      hypertrophy: {
        sets: '2-4',
        reps: '6-15',
        restSec: '60-120',
      },
      endurance: {
        sets: '2-4',
        reps: '12-20',
        restSec: '30-60',
      },
    },
    safety: {
      contraindications: ['region-lower-back-pain'],
      precautions: [
        'use-light-load-while-learning',
        'maintain-shoulder-stability',
        'avoid-forcing-range',
      ],
      impactLevel: 'low',
    },
    progression: {
      regressions: ['bodyweight-windmill', 'low-kettlebell-windmill'],
      progressions: ['heavier-kettlebell-windmill', 'double-kettlebell-windmill'],
      alternatives: ['turkish-get-up', 'side-plank'],
    },
    media: {
      images: [],
      videos: [],
      thumbnail: '',
    },
  },
  {
    id: 'kettlebell-halo',
    slug: 'kettlebell-halo',
    names: {
      ru: 'Круговая мельница гири',
      en: 'Kettlebell Halo',
    },
    aliases: ['kb-halo', 'halo'],
    classification: {
      modality: 'strength',
      exerciseFamily: 'shoulder-mobility',
      movementPatterns: ['shoulder-mobility'],
      difficulty: 'intermediate',
      equipment: ['kettlebell'],
      bodyPosition: 'standing',
      laterality: 'bilateral',
    },
    mechanics: {
      executionMode: 'reps',
      tempo: {
        eccentric: 2,
        pauseBottom: 0,
        concentric: 2,
        pauseTop: 0,
      },
      rangeOfMotion: 'full-controlled',
      loadType: 'external-load',
    },
    muscles: {
      primary: ['shoulders'],
      secondary: ['core'],
      stabilizers: ['upper-back', 'forearms'],
      jointActions: ['shoulder-circumduction', 'scapular-stabilization', 'spine-stabilization'],
    },
    technique: {
      setup: {
        ru: 'Встаньте прямо или сядьте, удерживая гирю за боковые части у груди. Корпус стабилен, ребра опущены.',
        en: 'Stand tall or sit holding the kettlebell by the horns at chest level. Keep your torso stable and ribs down.',
      },
      steps: {
        ru: 'Медленно проведите гирю вокруг головы по кругу, удерживая ее близко к голове, но не касаясь. Верните гирю к груди и выполните круг в другую сторону.',
        en: 'Slowly circle the kettlebell around your head, keeping it close without touching. Return it to the chest and repeat the circle in the opposite direction.',
      },
      keyCues: {
        ru: 'Двигайтесь плавно; корпус не раскачивается; плечи остаются под контролем.',
        en: 'Move smoothly; avoid torso sway; keep shoulders controlled.',
      },
      commonErrors: {
        ru: 'Слишком тяжелая гиря; прогиб в пояснице; резкие движения; подъем плеч к ушам.',
        en: 'Using a kettlebell that is too heavy; arching the lower back; jerky movement; shrugging the shoulders.',
      },
      breathing: {
        ru: 'Дышите ровно на протяжении всего круга.',
        en: 'Breathe steadily throughout the circle.',
      },
    },
    dosage: {
      strength: {
        sets: '3-5',
        reps: '4-8',
        restSec: '90-180',
      },
      hypertrophy: {
        sets: '2-4',
        reps: '6-15',
        restSec: '60-120',
      },
      endurance: {
        sets: '2-4',
        reps: '12-20',
        restSec: '30-60',
      },
    },
    safety: {
      contraindications: ['joint-shoulder-pain'],
      precautions: ['use-light-load', 'avoid-neck-contact', 'keep-ribs-down'],
      impactLevel: 'low',
    },
    progression: {
      regressions: ['bodyweight-shoulder-circles', 'light-kettlebell-halo'],
      progressions: ['heavier-kettlebell-halo', 'half-kneeling-kettlebell-halo'],
      alternatives: ['band-shoulder-dislocates', 'dumbbell-lateral-raise'],
    },
    media: {
      images: [],
      videos: [],
      thumbnail: '',
    },
  },
  {
    id: 'farmer-carry',
    slug: 'farmer-carry',
    names: {
      ru: 'Фермерская прогулка',
      en: 'Farmer Carry',
    },
    aliases: ['farmers-walk', 'farmer-walk'],
    classification: {
      modality: 'strength',
      exerciseFamily: 'carry',
      movementPatterns: ['carry'],
      difficulty: 'beginner',
      equipment: ['dumbbells', 'kettlebell'],
      bodyPosition: 'standing',
      laterality: 'bilateral',
    },
    mechanics: {
      executionMode: 'time',
      tempo: {
        eccentric: 0,
        pauseBottom: 0,
        concentric: 0,
        pauseTop: 0,
      },
      rangeOfMotion: 'gait-controlled',
      loadType: 'external-load',
    },
    muscles: {
      primary: ['core'],
      secondary: ['forearms'],
      stabilizers: ['upper-back', 'traps', 'glutes'],
      jointActions: ['grip', 'spine-stabilization', 'shoulder-stabilization'],
    },
    technique: {
      setup: {
        ru: 'Возьмите гантели или гири в обе руки и встаньте прямо. Плечи опущены, корпус напряжен.',
        en: 'Pick up dumbbells or kettlebells in both hands and stand tall. Keep shoulders down and your torso braced.',
      },
      steps: {
        ru: 'Идите вперед небольшими контролируемыми шагами, удерживая корпус вертикально. Не позволяйте весу раскачиваться или тянуть плечи вниз. В конце подхода аккуратно поставьте снаряды на пол.',
        en: 'Walk forward with small controlled steps while keeping your torso upright. Do not let the weights swing or pull your shoulders down. Set the weights down carefully at the end of the set.',
      },
      keyCues: {
        ru: 'Идите ровно; плечи назад и вниз; держите корпус высоким.',
        en: 'Walk evenly; shoulders back and down; keep your torso tall.',
      },
      commonErrors: {
        ru: 'Скругление спины; раскачивание веса; слишком длинные шаги; задержка дыхания.',
        en: 'Rounding the back; swinging the weights; taking overly long steps; holding the breath.',
      },
      breathing: {
        ru: 'Дышите ровно и ритмично во время ходьбы.',
        en: 'Breathe steadily and rhythmically while walking.',
      },
    },
    dosage: {
      strength: {
        sets: '3-5',
        reps: '20-40 sec',
        restSec: '90-180',
      },
      hypertrophy: {
        sets: '2-4',
        reps: '30-60 sec',
        restSec: '60-120',
      },
      endurance: {
        sets: '2-4',
        reps: '45-90 sec',
        restSec: '30-60',
      },
    },
    safety: {
      contraindications: ['region-lower-back-pain'],
      precautions: [
        'maintain-upright-posture',
        'avoid-weight-swinging',
        'set-load-down-with-control',
      ],
      impactLevel: 'low',
    },
    progression: {
      regressions: ['lighter-farmer-carry', 'short-distance-farmer-carry'],
      progressions: ['heavier-farmer-carry', 'longer-distance-farmer-carry'],
      alternatives: ['suitcase-carry', 'rack-carry'],
    },
    media: {
      images: [],
      videos: [],
      thumbnail: '',
    },
  },
  {
    id: 'single-arm-kettlebell-row',
    slug: 'single-arm-kettlebell-row',
    names: {
      ru: 'Тяга гири одной рукой',
      en: 'Single-Arm Kettlebell Row',
    },
    aliases: ['one-arm-kettlebell-row', 'single-arm-kb-row'],
    classification: {
      modality: 'strength',
      exerciseFamily: 'row',
      movementPatterns: ['horizontal-pull'],
      difficulty: 'intermediate',
      equipment: ['kettlebell'],
      bodyPosition: 'standing',
      laterality: 'unilateral',
    },
    mechanics: {
      executionMode: 'reps',
      tempo: {
        eccentric: 2,
        pauseBottom: 1,
        concentric: 1,
        pauseTop: 0,
      },
      rangeOfMotion: 'full-controlled',
      loadType: 'external-load',
    },
    muscles: {
      primary: ['back'],
      secondary: ['biceps'],
      stabilizers: ['core', 'lower-back', 'upper-back'],
      jointActions: ['shoulder-extension', 'elbow-flexion', 'scapular-retraction'],
    },
    technique: {
      setup: {
        ru: 'Встаньте в наклон с нейтральной спиной, одну руку можно опереть на бедро или скамью. Гиря находится под плечом рабочей руки.',
        en: 'Set up in a bent-over position with a neutral spine, optionally supporting one hand on your thigh or a bench. The kettlebell starts under the working shoulder.',
      },
      steps: {
        ru: 'Потяните гирю к поясу, ведя локоть назад и удерживая корпус неподвижным. Ненадолго зафиксируйте верхнюю точку, затем медленно опустите гирю вниз.',
        en: 'Row the kettlebell toward your waist, driving the elbow back while keeping your torso still. Pause briefly at the top, then lower the kettlebell slowly.',
      },
      keyCues: {
        ru: 'Локоть к бедру; спина ровная; не разворачивайте корпус.',
        en: 'Elbow toward the hip; back flat; avoid rotating the torso.',
      },
      commonErrors: {
        ru: 'Рывок корпусом; округление спины; подъем плеча к уху; неполная амплитуда.',
        en: 'Jerking with the torso; rounding the back; shrugging the shoulder; incomplete range of motion.',
      },
      breathing: {
        ru: 'Выдыхайте при тяге вверх, вдыхайте при опускании.',
        en: 'Exhale as you row up, inhale as you lower.',
      },
    },
    dosage: {
      strength: {
        sets: '3-5',
        reps: '4-8',
        restSec: '90-180',
      },
      hypertrophy: {
        sets: '2-4',
        reps: '6-15',
        restSec: '60-120',
      },
      endurance: {
        sets: '2-4',
        reps: '12-20',
        restSec: '30-60',
      },
    },
    safety: {
      contraindications: ['region-lower-back-pain'],
      precautions: ['maintain-neutral-spine', 'avoid-torso-rotation', 'use-manageable-load'],
      impactLevel: 'low',
    },
    progression: {
      regressions: ['supported-single-arm-kettlebell-row', 'lighter-single-arm-kettlebell-row'],
      progressions: ['heavier-single-arm-kettlebell-row', 'unsupported-single-arm-kettlebell-row'],
      alternatives: ['single-arm-dumbbell-row', 'seated-cable-row'],
    },
    media: {
      images: [],
      videos: [],
      thumbnail: '',
    },
  },
  {
    id: 'dumbbell-arnold-press',
    slug: 'dumbbell-arnold-press',
    names: {
      ru: 'Жим Арнольда',
      en: 'Dumbbell Arnold Press',
    },
    aliases: ['arnold-press', 'db-arnold-press'],
    classification: {
      modality: 'strength',
      exerciseFamily: 'press',
      movementPatterns: ['vertical-push'],
      difficulty: 'intermediate',
      equipment: ['dumbbells'],
      bodyPosition: 'seated',
      laterality: 'bilateral',
    },
    mechanics: {
      executionMode: 'reps',
      tempo: {
        eccentric: 2,
        pauseBottom: 0,
        concentric: 1,
        pauseTop: 0,
      },
      rangeOfMotion: 'full-controlled',
      loadType: 'external-load',
    },
    muscles: {
      primary: ['shoulders'],
      secondary: ['triceps', 'chest'],
      stabilizers: ['core', 'upper-back'],
      jointActions: [
        'shoulder-flexion',
        'shoulder-abduction',
        'shoulder-external-rotation',
        'elbow-extension',
      ],
    },
    technique: {
      setup: {
        ru: 'Сядьте или встаньте устойчиво, удерживая гантели перед плечами ладонями к себе. Корпус напряжен, спина нейтральная.',
        en: 'Sit or stand firmly holding dumbbells in front of your shoulders with palms facing you. Brace your torso and keep your spine neutral.',
      },
      steps: {
        ru: 'Начните жим вверх, одновременно разворачивая ладони вперед. В верхней точке руки почти выпрямлены над головой. Подконтрольно опустите гантели обратно, разворачивая ладони к себе.',
        en: 'Press upward while rotating your palms forward. At the top, your arms are nearly straight overhead. Lower the dumbbells with control while rotating the palms back toward you.',
      },
      keyCues: {
        ru: 'Двигайтесь плавно; держите ребра вниз; не заваливайте запястья.',
        en: 'Move smoothly; keep ribs down; avoid letting the wrists collapse.',
      },
      commonErrors: {
        ru: 'Прогиб в пояснице; рывок при развороте; слишком тяжелые гантели; подъем плеч к ушам.',
        en: 'Arching the lower back; jerking through the rotation; using dumbbells that are too heavy; shrugging the shoulders.',
      },
      breathing: {
        ru: 'Выдыхайте при жиме вверх, вдыхайте при опускании.',
        en: 'Exhale as you press up, inhale as you lower.',
      },
    },
    dosage: {
      strength: {
        sets: '3-5',
        reps: '4-8',
        restSec: '90-180',
      },
      hypertrophy: {
        sets: '2-4',
        reps: '6-15',
        restSec: '60-120',
      },
      endurance: {
        sets: '2-4',
        reps: '12-20',
        restSec: '30-60',
      },
    },
    safety: {
      contraindications: ['joint-shoulder-impingement'],
      precautions: ['use-controlled-rotation', 'avoid-lumbar-overextension', 'use-manageable-load'],
      impactLevel: 'low',
    },
    progression: {
      regressions: ['seated-dumbbell-overhead-press', 'lighter-dumbbell-arnold-press'],
      progressions: ['standing-dumbbell-arnold-press', 'heavier-dumbbell-arnold-press'],
      alternatives: ['dumbbell-overhead-press', 'pike-push-up'],
    },
    media: {
      images: [],
      videos: [],
      thumbnail: '',
    },
  },
  {
    id: 'dumbbell-hip-thrust',
    slug: 'dumbbell-hip-thrust',
    names: {
      ru: 'Ягодичный мостик с гантелей',
      en: 'Dumbbell Hip Thrust',
    },
    aliases: ['db-hip-thrust', 'weighted-hip-thrust'],
    classification: {
      modality: 'strength',
      exerciseFamily: 'hip-thrust',
      movementPatterns: ['hinge'],
      difficulty: 'beginner',
      equipment: ['dumbbells', 'bench'],
      bodyPosition: 'supine',
      laterality: 'bilateral',
    },
    mechanics: {
      executionMode: 'reps',
      tempo: {
        eccentric: 2,
        pauseBottom: 0,
        concentric: 1,
        pauseTop: 1,
      },
      rangeOfMotion: 'full-controlled',
      loadType: 'external-load',
    },
    muscles: {
      primary: ['glutes'],
      secondary: ['hamstrings', 'core'],
      stabilizers: ['hips', 'lower-back'],
      jointActions: ['hip-extension', 'posterior-pelvic-tilt', 'spine-stabilization'],
    },
    technique: {
      setup: {
        ru: 'Расположите верх спины на скамье или лягте на пол. Поставьте стопы на пол, гантель разместите на тазу и удерживайте руками.',
        en: 'Place your upper back on a bench or lie on the floor. Set your feet on the floor, place a dumbbell across your hips, and hold it with your hands.',
      },
      steps: {
        ru: 'Напрягите корпус и поднимите таз вверх, сжимая ягодицы. В верхней точке корпус и бедра образуют прямую линию. Задержитесь на секунду и подконтрольно опуститесь вниз.',
        en: 'Brace your core and drive your hips upward by squeezing the glutes. At the top, your torso and thighs form a straight line. Pause for one second, then lower with control.',
      },
      keyCues: {
        ru: 'Толкайтесь пятками; подкрутите таз вверху; не переразгибайте поясницу.',
        en: 'Drive through the heels; tuck the pelvis at the top; avoid overextending the lower back.',
      },
      commonErrors: {
        ru: 'Прогиб в пояснице; стопы слишком далеко или слишком близко; подъем за счет поясницы; потеря контроля гантели.',
        en: 'Arching the lower back; feet too far or too close; lifting through the lower back; losing control of the dumbbell.',
      },
      breathing: {
        ru: 'Выдыхайте при подъеме таза, вдыхайте при опускании.',
        en: 'Exhale as you lift the hips, inhale as you lower.',
      },
    },
    dosage: {
      strength: {
        sets: '2-4',
        reps: '5-8',
        restSec: '90-150',
      },
      hypertrophy: {
        sets: '2-4',
        reps: '8-12',
        restSec: '60-120',
      },
      endurance: {
        sets: '2-3',
        reps: '12-20',
        restSec: '30-60',
      },
    },
    safety: {
      contraindications: ['region-lower-back-pain'],
      precautions: ['avoid-lumbar-overextension', 'pad-hips-if-needed', 'keep-load-secure'],
      impactLevel: 'low',
    },
    progression: {
      regressions: ['glute-bridge', 'bodyweight-hip-thrust'],
      progressions: ['heavier-dumbbell-hip-thrust', 'single-leg-hip-thrust'],
      alternatives: ['single-leg-glute-bridge', 'dumbbell-romanian-deadlift'],
    },
    media: {
      images: [],
      videos: [],
      thumbnail: '',
    },
  },
  {
    id: 'banded-glute-bridge',
    slug: 'banded-glute-bridge',
    names: {
      ru: 'Ягодичный мостик с резинкой',
      en: 'Banded Glute Bridge',
    },
    aliases: ['resistance-band-glute-bridge', 'mini-band-glute-bridge'],
    classification: {
      modality: 'strength',
      exerciseFamily: 'bridge',
      movementPatterns: ['hinge'],
      difficulty: 'beginner',
      equipment: ['resistance-band'],
      bodyPosition: 'supine',
      laterality: 'bilateral',
    },
    mechanics: {
      executionMode: 'reps',
      tempo: {
        eccentric: 2,
        pauseBottom: 0,
        concentric: 1,
        pauseTop: 1,
      },
      rangeOfMotion: 'full-controlled',
      loadType: 'elastic-resistance',
    },
    muscles: {
      primary: ['glutes'],
      secondary: ['hamstrings'],
      stabilizers: ['core', 'hips'],
      jointActions: ['hip-extension', 'hip-abduction', 'posterior-pelvic-tilt'],
    },
    technique: {
      setup: {
        ru: 'Лягте на спину, согните колени и поставьте стопы на пол. Наденьте резинку выше колен и слегка разведите колени наружу.',
        en: 'Lie on your back with knees bent and feet on the floor. Place the band above your knees and gently press the knees outward.',
      },
      steps: {
        ru: 'Напрягите корпус и поднимите таз вверх, удерживая колени разведенными против сопротивления резинки. Сожмите ягодицы в верхней точке, затем медленно опуститесь вниз.',
        en: 'Brace your core and lift your hips while keeping your knees pressed out against the band. Squeeze the glutes at the top, then lower slowly.',
      },
      keyCues: {
        ru: 'Колени не заваливаются внутрь; толкайтесь пятками; держите поясницу под контролем.',
        en: 'Do not let knees collapse inward; drive through the heels; keep the lower back controlled.',
      },
      commonErrors: {
        ru: 'Потеря натяжения резинки; прогиб поясницы; подъем на носки; слишком быстрые повторы.',
        en: 'Losing band tension; arching the lower back; rising onto the toes; moving too quickly.',
      },
      breathing: {
        ru: 'Выдыхайте при подъеме таза, вдыхайте при опускании.',
        en: 'Exhale as you lift the hips, inhale as you lower.',
      },
    },
    dosage: {
      strength: {
        sets: '2-4',
        reps: '5-8',
        restSec: '90-150',
      },
      hypertrophy: {
        sets: '2-4',
        reps: '8-12',
        restSec: '60-120',
      },
      endurance: {
        sets: '2-3',
        reps: '12-20',
        restSec: '30-60',
      },
    },
    safety: {
      contraindications: ['joint-knee-pain'],
      precautions: [
        'control-knee-alignment',
        'avoid-lumbar-overextension',
        'use-appropriate-band-tension',
      ],
      impactLevel: 'low',
    },
    progression: {
      regressions: ['glute-bridge', 'lighter-banded-glute-bridge'],
      progressions: ['single-leg-banded-glute-bridge', 'banded-hip-thrust'],
      alternatives: ['dumbbell-hip-thrust', 'clamshell'],
    },
    media: {
      images: [],
      videos: [],
      thumbnail: '',
    },
  },
  {
    id: 'banded-donkey-kicks',
    slug: 'banded-donkey-kicks',
    names: {
      ru: 'Ослячьи удары с резинкой',
      en: 'Banded Donkey Kicks',
    },
    aliases: ['banded-quadruped-hip-extension', 'resistance-band-donkey-kicks'],
    classification: {
      modality: 'strength',
      exerciseFamily: 'hip-extension',
      movementPatterns: ['hip-extension'],
      difficulty: 'beginner',
      equipment: ['resistance-band'],
      bodyPosition: 'quadruped',
      laterality: 'bilateral',
    },
    mechanics: {
      executionMode: 'reps',
      tempo: {
        eccentric: 2,
        pauseBottom: 1,
        concentric: 1,
        pauseTop: 0,
      },
      rangeOfMotion: 'full-controlled',
      loadType: 'elastic-resistance',
    },
    muscles: {
      primary: ['glutes'],
      secondary: ['hamstrings'],
      stabilizers: ['core', 'shoulders', 'hips'],
      jointActions: ['hip-extension', 'spine-stabilization'],
    },
    technique: {
      setup: {
        ru: 'Встаньте на четвереньки, наденьте резинку выше колен или закрепите ее так, чтобы она создавала сопротивление при подъеме ноги. Ладони под плечами, колени под тазом.',
        en: 'Start on all fours with the band above your knees or anchored to create resistance as you lift the leg. Hands under shoulders and knees under hips.',
      },
      steps: {
        ru: 'Напрягите корпус и поднимите согнутую ногу вверх против сопротивления резинки. Не разворачивайте таз и не прогибайте поясницу. Подконтрольно верните колено вниз и повторите на другую сторону.',
        en: 'Brace your core and lift one bent leg upward against the band resistance. Avoid rotating the pelvis or arching the lower back. Lower the knee with control and repeat on the other side.',
      },
      keyCues: {
        ru: 'Двигайтесь от бедра; таз остается ровным; сжимайте ягодицу в верхней точке.',
        en: 'Move from the hip; keep your pelvis level; squeeze the glute at the top.',
      },
      commonErrors: {
        ru: 'Прогиб в пояснице; разворот таза; потеря натяжения резинки; быстрые махи.',
        en: 'Arching the lower back; rotating the pelvis; losing band tension; kicking too fast.',
      },
      breathing: {
        ru: 'Выдыхайте при подъеме ноги, вдыхайте при возвращении вниз.',
        en: 'Exhale as you lift the leg, inhale as you lower it.',
      },
    },
    dosage: {
      strength: {
        sets: '2-4',
        reps: '5-8',
        restSec: '90-150',
      },
      hypertrophy: {
        sets: '2-4',
        reps: '8-12',
        restSec: '60-120',
      },
      endurance: {
        sets: '2-3',
        reps: '12-20',
        restSec: '30-60',
      },
    },
    safety: {
      contraindications: ['joint-knee-pain'],
      precautions: [
        'use-padding-under-knees',
        'maintain-neutral-spine',
        'use-appropriate-band-tension',
      ],
      impactLevel: 'low',
    },
    progression: {
      regressions: ['donkey-kicks', 'lighter-banded-donkey-kicks'],
      progressions: ['stronger-banded-donkey-kicks', 'banded-donkey-kick-hold'],
      alternatives: ['banded-glute-bridge', 'standing-band-hip-extension'],
    },
    media: {
      images: [],
      videos: [],
      thumbnail: '',
    },
  },
  {
    id: 'banded-fire-hydrants',
    slug: 'banded-fire-hydrants',
    names: {
      ru: 'Пожарные гидранты с резинкой',
      en: 'Banded Fire Hydrants',
    },
    aliases: ['banded-quadruped-hip-abduction', 'resistance-band-fire-hydrants'],
    classification: {
      modality: 'strength',
      exerciseFamily: 'hip-abduction',
      movementPatterns: ['hip-abduction'],
      difficulty: 'beginner',
      equipment: ['resistance-band'],
      bodyPosition: 'quadruped',
      laterality: 'bilateral',
    },
    mechanics: {
      executionMode: 'reps',
      tempo: {
        eccentric: 2,
        pauseBottom: 1,
        concentric: 1,
        pauseTop: 0,
      },
      rangeOfMotion: 'full-controlled',
      loadType: 'elastic-resistance',
    },
    muscles: {
      primary: ['glutes'],
      secondary: ['abductors'],
      stabilizers: ['core', 'shoulders', 'hips'],
      jointActions: ['hip-abduction', 'spine-stabilization'],
    },
    technique: {
      setup: {
        ru: 'Встаньте на четвереньки, наденьте резинку выше колен. Ладони под плечами, колени под тазом, спина нейтральная.',
        en: 'Start on all fours with the band above your knees. Hands under shoulders, knees under hips, and spine neutral.',
      },
      steps: {
        ru: 'Напрягите корпус и отведите согнутую ногу в сторону против сопротивления резинки. Сохраняйте таз ровным, затем медленно верните колено вниз и повторите на другую сторону.',
        en: 'Brace your core and lift one bent leg out to the side against the band resistance. Keep your pelvis level, then slowly lower the knee and repeat on the other side.',
      },
      keyCues: {
        ru: 'Колено движется в сторону; корпус неподвижен; сохраняйте натяжение резинки.',
        en: 'Move the knee out to the side; keep the torso still; maintain band tension.',
      },
      commonErrors: {
        ru: 'Разворот таза; прогиб в пояснице; перенос веса на одну руку; слишком быстрые повторы.',
        en: 'Rotating the pelvis; arching the lower back; shifting weight into one hand; moving too fast.',
      },
      breathing: {
        ru: 'Выдыхайте при отведении ноги, вдыхайте при возвращении вниз.',
        en: 'Exhale as you lift the leg out, inhale as you lower it.',
      },
    },
    dosage: {
      strength: {
        sets: '2-4',
        reps: '5-8',
        restSec: '90-150',
      },
      hypertrophy: {
        sets: '2-4',
        reps: '8-12',
        restSec: '60-120',
      },
      endurance: {
        sets: '2-3',
        reps: '12-20',
        restSec: '30-60',
      },
    },
    safety: {
      contraindications: ['joint-knee-pain'],
      precautions: [
        'use-padding-under-knees',
        'avoid-pelvic-rotation',
        'use-appropriate-band-tension',
      ],
      impactLevel: 'low',
    },
    progression: {
      regressions: ['fire-hydrants', 'lighter-banded-fire-hydrants'],
      progressions: ['stronger-banded-fire-hydrants', 'banded-fire-hydrant-hold'],
      alternatives: ['clamshell', 'side-lying-hip-abduction'],
    },
    media: {
      images: [],
      videos: [],
      thumbnail: '',
    },
  },
  {
    id: 'banded-lateral-walks',
    slug: 'banded-lateral-walks',
    names: {
      ru: 'Боковые шаги с резинкой',
      en: 'Banded Lateral Walks',
    },
    aliases: ['lateral-band-walk', 'monster-walk'],
    classification: {
      modality: 'strength',
      exerciseFamily: 'lateral-walk',
      movementPatterns: ['gait'],
      difficulty: 'beginner',
      equipment: ['resistance-band'],
      bodyPosition: 'standing',
      laterality: 'bilateral',
    },
    mechanics: {
      executionMode: 'time',
      tempo: {
        eccentric: 0,
        pauseBottom: 0,
        concentric: 0,
        pauseTop: 0,
      },
      rangeOfMotion: 'short-controlled',
      loadType: 'elastic-resistance',
    },
    muscles: {
      primary: ['glutes'],
      secondary: ['quads'],
      stabilizers: ['core', 'hips'],
      jointActions: ['hip-abduction', 'knee-stabilization', 'spine-stabilization'],
    },
    technique: {
      setup: {
        ru: 'Наденьте резинку выше колен или на голени. Встаньте в полуприсед, стопы на ширине таза, колени слегка направлены наружу.',
        en: 'Place the band above your knees or around your shins. Stand in a mini-squat with feet hip-width apart and knees slightly pressed outward.',
      },
      steps: {
        ru: 'Сохраняя натяжение резинки, сделайте шаг в сторону одной ногой, затем подтяните вторую ногу без полного сведения стоп. Продолжайте шагать в одну сторону, затем вернитесь обратно.',
        en: 'Keeping tension on the band, step to the side with one foot, then bring the other foot in without fully closing the gap. Continue stepping one way, then return back.',
      },
      keyCues: {
        ru: 'Колени смотрят по линии стоп; держите полуприсед; шаги короткие и контролируемые.',
        en: 'Keep knees tracking with the feet; stay in a mini-squat; use short controlled steps.',
      },
      commonErrors: {
        ru: 'Сведение коленей внутрь; потеря натяжения резинки; выпрямление корпуса; слишком большие шаги.',
        en: 'Knees collapsing inward; losing band tension; standing too upright; taking steps that are too large.',
      },
      breathing: {
        ru: 'Дышите ровно и ритмично во время шагов.',
        en: 'Breathe steadily and rhythmically while stepping.',
      },
    },
    dosage: {
      strength: {
        sets: '3-5',
        reps: '20-40 sec',
        restSec: '90-180',
      },
      hypertrophy: {
        sets: '2-4',
        reps: '30-60 sec',
        restSec: '60-120',
      },
      endurance: {
        sets: '2-4',
        reps: '45-90 sec',
        restSec: '30-60',
      },
    },
    safety: {
      contraindications: ['joint-knee-pain'],
      precautions: [
        'control-knee-alignment',
        'use-appropriate-band-tension',
        'avoid-excessive-step-width',
      ],
      impactLevel: 'low',
    },
    progression: {
      regressions: ['lighter-banded-lateral-walks', 'bodyweight-lateral-walks'],
      progressions: ['stronger-banded-lateral-walks', 'lower-band-lateral-walks'],
      alternatives: ['banded-clamshells', 'side-lying-hip-abduction'],
    },
    media: {
      images: [],
      videos: [],
      thumbnail: '',
    },
  },
  {
    id: 'banded-clamshells',
    slug: 'banded-clamshells',
    names: {
      ru: 'Ракушки с резинкой',
      en: 'Banded Clamshells',
    },
    aliases: ['resistance-band-clamshell', 'mini-band-clamshell'],
    classification: {
      modality: 'strength',
      exerciseFamily: 'clamshell',
      movementPatterns: ['hip-abduction'],
      difficulty: 'beginner',
      equipment: ['resistance-band'],
      bodyPosition: 'side-lying',
      laterality: 'bilateral',
    },
    mechanics: {
      executionMode: 'reps',
      tempo: {
        eccentric: 2,
        pauseBottom: 0,
        concentric: 1,
        pauseTop: 1,
      },
      rangeOfMotion: 'full-controlled',
      loadType: 'elastic-resistance',
    },
    muscles: {
      primary: ['glutes'],
      secondary: ['abductors'],
      stabilizers: ['core', 'hips'],
      jointActions: ['hip-abduction', 'hip-external-rotation'],
    },
    technique: {
      setup: {
        ru: 'Лягте на бок, согните колени и наденьте резинку выше колен. Стопы держите вместе, таз расположен ровно.',
        en: 'Lie on your side with knees bent and the band above your knees. Keep your feet together and hips stacked.',
      },
      steps: {
        ru: 'Не отрывая стопы друг от друга, поднимите верхнее колено против сопротивления резинки. Задержитесь на секунду, затем медленно опустите колено обратно.',
        en: 'Keeping your feet together, lift the top knee against the band resistance. Pause for one second, then slowly lower the knee back down.',
      },
      keyCues: {
        ru: 'Таз не заваливается назад; движение идет от бедра; сохраняйте контроль резинки.',
        en: 'Do not roll the hips backward; move from the hip; keep the band controlled.',
      },
      commonErrors: {
        ru: 'Разворот таза назад; отрыв стоп; слишком большая амплитуда; быстрые неконтролируемые повторы.',
        en: 'Rolling the hips backward; separating the feet; using too much range; fast uncontrolled reps.',
      },
      breathing: {
        ru: 'Выдыхайте при разведении коленей, вдыхайте при опускании.',
        en: 'Exhale as you open the knees, inhale as you lower.',
      },
    },
    dosage: {
      strength: {
        sets: '2-4',
        reps: '5-8',
        restSec: '90-150',
      },
      hypertrophy: {
        sets: '2-4',
        reps: '8-12',
        restSec: '60-120',
      },
      endurance: {
        sets: '2-3',
        reps: '12-20',
        restSec: '30-60',
      },
    },
    safety: {
      contraindications: ['joint-hip-pain'],
      precautions: [
        'avoid-pelvic-rotation',
        'use-comfortable-range',
        'use-appropriate-band-tension',
      ],
      impactLevel: 'low',
    },
    progression: {
      regressions: ['bodyweight-clamshell', 'lighter-banded-clamshell'],
      progressions: ['stronger-banded-clamshell', 'side-plank-clamshell'],
      alternatives: ['banded-fire-hydrants', 'side-lying-hip-abduction'],
    },
    media: {
      images: [],
      videos: [],
      thumbnail: '',
    },
  },
  {
    id: 'goblet-sumo-squat',
    slug: 'goblet-sumo-squat',
    names: {
      ru: 'Гоблет-приседания сумо с гирей',
      en: 'Goblet Sumo Squat',
    },
    aliases: ['kettlebell-sumo-goblet-squat', 'sumo-goblet-squat'],
    classification: {
      modality: 'strength',
      exerciseFamily: 'squat',
      movementPatterns: ['squat'],
      difficulty: 'beginner',
      equipment: ['kettlebell'],
      bodyPosition: 'standing',
      laterality: 'bilateral',
    },
    mechanics: {
      executionMode: 'reps',
      tempo: {
        eccentric: 2,
        pauseBottom: 1,
        concentric: 1,
        pauseTop: 0,
      },
      rangeOfMotion: 'full-controlled',
      loadType: 'external-load',
    },
    muscles: {
      primary: ['glutes', 'quads'],
      secondary: ['adductors'],
      stabilizers: ['core', 'upper-back'],
      jointActions: ['knee-extension', 'hip-extension', 'hip-abduction'],
    },
    technique: {
      setup: {
        ru: 'Встаньте широко, носки слегка разверните наружу. Удерживайте гирю у груди, корпус напряжен.',
        en: 'Stand in a wide stance with toes slightly turned out. Hold the kettlebell at your chest and brace your torso.',
      },
      steps: {
        ru: 'Опуститесь в присед, направляя колени по линии носков и удерживая гирю близко к груди. Задержитесь внизу на секунду, затем встаньте, разгибая колени и таз.',
        en: 'Lower into a squat while tracking your knees over your toes and keeping the kettlebell close to your chest. Pause briefly at the bottom, then stand by extending knees and hips.',
      },
      keyCues: {
        ru: 'Колени наружу по линии стоп; грудь поднята; вес распределен по всей стопе.',
        en: 'Press knees out in line with feet; keep chest lifted; distribute weight through the whole foot.',
      },
      commonErrors: {
        ru: 'Завал коленей внутрь; округление спины; отрыв пяток; слишком широкий шаг без контроля.',
        en: 'Knees collapsing inward; rounding the back; heels lifting; stance too wide without control.',
      },
      breathing: {
        ru: 'Вдох при опускании, выдох при подъеме.',
        en: 'Inhale as you lower, exhale as you stand.',
      },
    },
    dosage: {
      strength: {
        sets: '2-4',
        reps: '5-8',
        restSec: '90-150',
      },
      hypertrophy: {
        sets: '2-4',
        reps: '8-12',
        restSec: '60-120',
      },
      endurance: {
        sets: '2-3',
        reps: '12-20',
        restSec: '30-60',
      },
    },
    safety: {
      contraindications: ['joint-knee-pain'],
      precautions: ['control-knee-alignment', 'keep-load-close-to-body', 'avoid-forcing-depth'],
      impactLevel: 'low',
    },
    progression: {
      regressions: ['bodyweight-sumo-squat', 'box-sumo-squat'],
      progressions: ['heavier-goblet-sumo-squat', 'paused-goblet-sumo-squat'],
      alternatives: ['kettlebell-goblet-squat', 'lateral-lunge'],
    },
    media: {
      images: [],
      videos: [],
      thumbnail: '',
    },
  },
  {
    id: 'dumbbell-curtsy-lunge',
    slug: 'dumbbell-curtsy-lunge',
    names: {
      ru: 'Выпады-реверанс с гантелями',
      en: 'Dumbbell Curtsy Lunge',
    },
    aliases: ['weighted-curtsy-lunge', 'db-curtsy-lunge'],
    classification: {
      modality: 'strength',
      exerciseFamily: 'lunge',
      movementPatterns: ['lunge'],
      difficulty: 'intermediate',
      equipment: ['dumbbells'],
      bodyPosition: 'standing',
      laterality: 'bilateral',
    },
    mechanics: {
      executionMode: 'reps',
      tempo: {
        eccentric: 2,
        pauseBottom: 0,
        concentric: 1,
        pauseTop: 0,
      },
      rangeOfMotion: 'full-controlled',
      loadType: 'external-load',
    },
    muscles: {
      primary: ['glutes'],
      secondary: ['quads'],
      stabilizers: ['core', 'hips', 'adductors'],
      jointActions: ['hip-extension', 'knee-extension', 'hip-adduction'],
    },
    technique: {
      setup: {
        ru: 'Встаньте прямо, удерживая гантели по бокам корпуса. Стопы на ширине таза, корпус стабилен.',
        en: 'Stand tall holding dumbbells at your sides. Feet hip-width apart and torso stable.',
      },
      steps: {
        ru: 'Сделайте шаг назад по диагонали за опорную ногу и опуститесь в выпад. Переднее колено направляйте по линии стопы. Оттолкнитесь передней ногой и вернитесь в исходное положение.',
        en: 'Step one foot back diagonally behind the standing leg and lower into a lunge. Track the front knee in line with the foot. Push through the front foot to return to the start.',
      },
      keyCues: {
        ru: 'Контролируйте колено передней ноги; держите таз ровно; шагайте назад по диагонали без скручивания.',
        en: 'Control the front knee; keep hips level; step diagonally back without twisting.',
      },
      commonErrors: {
        ru: 'Завал колена внутрь; слишком глубокий перекрестный шаг; потеря баланса; наклон корпуса вперед.',
        en: 'Knee collapsing inward; crossing too far behind; losing balance; leaning the torso forward.',
      },
      breathing: {
        ru: 'Вдох при опускании, выдох при подъеме.',
        en: 'Inhale as you lower, exhale as you rise.',
      },
    },
    dosage: {
      strength: {
        sets: '3-5',
        reps: '4-8',
        restSec: '90-180',
      },
      hypertrophy: {
        sets: '2-4',
        reps: '6-15',
        restSec: '60-120',
      },
      endurance: {
        sets: '2-4',
        reps: '12-20',
        restSec: '30-60',
      },
    },
    safety: {
      contraindications: ['joint-knee-pain'],
      precautions: ['control-knee-alignment', 'avoid-excessive-cross-step', 'use-manageable-load'],
      impactLevel: 'low',
    },
    progression: {
      regressions: ['bodyweight-curtsy-lunge', 'assisted-curtsy-lunge'],
      progressions: ['heavier-dumbbell-curtsy-lunge', 'curtsy-lunge-to-balance'],
      alternatives: ['reverse-lunge', 'lateral-lunge'],
    },
    media: {
      images: [],
      videos: [],
      thumbnail: '',
    },
  },
  {
    id: 'dumbbell-bulgarian-split-squat',
    slug: 'dumbbell-bulgarian-split-squat',
    names: {
      ru: 'Болгарские выпады с гантелями',
      en: 'Dumbbell Bulgarian Split Squat',
    },
    aliases: ['db-bulgarian-split-squat', 'weighted-bulgarian-split-squat'],
    classification: {
      modality: 'strength',
      exerciseFamily: 'squat',
      movementPatterns: ['lunge'],
      difficulty: 'advanced',
      equipment: ['dumbbells', 'bench'],
      bodyPosition: 'standing',
      laterality: 'bilateral',
    },
    mechanics: {
      executionMode: 'reps',
      tempo: {
        eccentric: 2,
        pauseBottom: 0,
        concentric: 1,
        pauseTop: 0,
      },
      rangeOfMotion: 'full-controlled',
      loadType: 'external-load',
    },
    muscles: {
      primary: ['glutes'],
      secondary: ['quads'],
      stabilizers: ['core', 'hamstrings', 'hips'],
      jointActions: ['hip-extension', 'knee-extension', 'spine-stabilization'],
    },
    technique: {
      setup: {
        ru: 'Встаньте спиной к скамье, удерживая гантели по бокам. Поставьте заднюю стопу на скамью, передняя стопа устойчиво на полу.',
        en: 'Stand facing away from a bench while holding dumbbells at your sides. Place the rear foot on the bench and keep the front foot stable on the floor.',
      },
      steps: {
        ru: 'Опуститесь вниз, сгибая переднее колено и сохраняя корпус под контролем. Дойдите до комфортной глубины, затем оттолкнитесь передней стопой и вернитесь вверх.',
        en: 'Lower down by bending the front knee while keeping your torso controlled. Reach a comfortable depth, then push through the front foot to return up.',
      },
      keyCues: {
        ru: 'Вес на передней ноге; колено следует за носком; держите таз ровно.',
        en: 'Keep weight on the front leg; track the knee over the toes; keep hips level.',
      },
      commonErrors: {
        ru: 'Слишком близкая постановка передней стопы; завал колена внутрь; потеря баланса; чрезмерный прогиб поясницы.',
        en: 'Front foot too close; knee collapsing inward; losing balance; excessive lower-back arch.',
      },
      breathing: {
        ru: 'Вдох при опускании, выдох при подъеме.',
        en: 'Inhale as you lower, exhale as you rise.',
      },
    },
    dosage: {
      strength: {
        sets: '3-5',
        reps: '4-8',
        restSec: '90-180',
      },
      hypertrophy: {
        sets: '2-4',
        reps: '6-15',
        restSec: '60-120',
      },
      endurance: {
        sets: '2-4',
        reps: '12-20',
        restSec: '30-60',
      },
    },
    safety: {
      contraindications: ['joint-knee-pain'],
      precautions: ['control-knee-alignment', 'maintain-balance', 'use-manageable-load'],
      impactLevel: 'low',
    },
    progression: {
      regressions: ['bodyweight-bulgarian-split-squat', 'assisted-bulgarian-split-squat'],
      progressions: [
        'heavier-dumbbell-bulgarian-split-squat',
        'paused-dumbbell-bulgarian-split-squat',
      ],
      alternatives: ['dumbbell-lunge', 'split-squat'],
    },
    media: {
      images: [],
      videos: [],
      thumbnail: '',
    },
  },
  {
    id: 'banded-standing-kickback',
    slug: 'banded-standing-kickback',
    names: {
      ru: 'Отведения ноги назад с резинкой',
      en: 'Banded Standing Kickback',
    },
    aliases: ['banded-standing-glute-kickback', 'resistance-band-kickback'],
    classification: {
      modality: 'strength',
      exerciseFamily: 'hip-extension',
      movementPatterns: ['hip-extension'],
      difficulty: 'beginner',
      equipment: ['resistance-band'],
      bodyPosition: 'standing',
      laterality: 'bilateral',
    },
    mechanics: {
      executionMode: 'reps',
      tempo: {
        eccentric: 2,
        pauseBottom: 1,
        concentric: 1,
        pauseTop: 0,
      },
      rangeOfMotion: 'full-controlled',
      loadType: 'elastic-resistance',
    },
    muscles: {
      primary: ['glutes'],
      secondary: ['hamstrings'],
      stabilizers: ['core', 'hips'],
      jointActions: ['hip-extension', 'spine-stabilization'],
    },
    technique: {
      setup: {
        ru: 'Встаньте прямо, наденьте резинку на щиколотки или закрепите ее так, чтобы она создавала сопротивление при отведении ноги назад. При необходимости держитесь за опору.',
        en: 'Stand tall with the band around your ankles or anchored so it creates resistance as you move the leg backward. Hold a support if needed.',
      },
      steps: {
        ru: 'Напрягите корпус и отведите одну ногу назад, двигаясь от тазобедренного сустава. Не прогибайте поясницу и не наклоняйте корпус вперед. Подконтрольно верните ногу обратно и повторите на другую сторону.',
        en: 'Brace your core and kick one leg backward from the hip. Avoid arching your lower back or leaning forward. Return the leg with control and repeat on the other side.',
      },
      keyCues: {
        ru: 'Двигайтесь от бедра; корпус остается высоким; сжимайте ягодицу в конце движения.',
        en: 'Move from the hip; keep your torso tall; squeeze the glute at the end of the movement.',
      },
      commonErrors: {
        ru: 'Прогиб в пояснице; мах ногой без контроля; потеря равновесия; разворот таза.',
        en: 'Arching the lower back; swinging the leg without control; losing balance; rotating the pelvis.',
      },
      breathing: {
        ru: 'Выдыхайте при отведении ноги назад, вдыхайте при возврате.',
        en: 'Exhale as you kick the leg back, inhale as you return.',
      },
    },
    dosage: {
      strength: {
        sets: '2-4',
        reps: '5-8',
        restSec: '90-150',
      },
      hypertrophy: {
        sets: '2-4',
        reps: '8-12',
        restSec: '60-120',
      },
      endurance: {
        sets: '2-3',
        reps: '12-20',
        restSec: '30-60',
      },
    },
    safety: {
      contraindications: ['region-lower-back-pain'],
      precautions: [
        'maintain-neutral-spine',
        'use-support-if-needed',
        'use-appropriate-band-tension',
      ],
      impactLevel: 'low',
    },
    progression: {
      regressions: ['bodyweight-standing-kickback', 'lighter-banded-standing-kickback'],
      progressions: ['stronger-banded-standing-kickback', 'banded-standing-kickback-hold'],
      alternatives: ['banded-donkey-kicks', 'glute-bridge'],
    },
    media: {
      images: [],
      videos: [],
      thumbnail: '',
    },
  },
  {
    id: 'banded-pull-apart',
    slug: 'banded-pull-apart',
    names: {
      ru: 'Разведения рук с резинкой',
      en: 'Banded Pull-Aparts',
    },
    aliases: ['resistance-band-pull-apart', 'band-pull-apart'],
    classification: {
      modality: 'strength',
      exerciseFamily: 'pull-apart',
      movementPatterns: ['horizontal-pull'],
      difficulty: 'beginner',
      equipment: ['resistance-band'],
      bodyPosition: 'standing',
      laterality: 'bilateral',
    },
    mechanics: {
      executionMode: 'reps',
      tempo: {
        eccentric: 2,
        pauseBottom: 0,
        concentric: 1,
        pauseTop: 1,
      },
      rangeOfMotion: 'full-controlled',
      loadType: 'elastic-resistance',
    },
    muscles: {
      primary: ['back'],
      secondary: ['shoulders'],
      stabilizers: ['core', 'upper-back'],
      jointActions: ['shoulder-horizontal-abduction', 'scapular-retraction'],
    },
    technique: {
      setup: {
        ru: 'Встаньте прямо и возьмите резинку двумя руками перед грудью. Руки почти прямые, плечи опущены.',
        en: 'Stand tall and hold the band with both hands in front of your chest. Arms nearly straight and shoulders down.',
      },
      steps: {
        ru: 'Разведите руки в стороны, растягивая резинку и сводя лопатки. Ненадолго задержитесь в конце движения, затем медленно вернитесь в исходное положение.',
        en: 'Pull your hands apart to stretch the band while squeezing your shoulder blades together. Pause briefly at the end, then return slowly to the start.',
      },
      keyCues: {
        ru: 'Сводите лопатки; не поднимайте плечи к ушам; держите ребра вниз.',
        en: 'Squeeze the shoulder blades; do not shrug; keep ribs down.',
      },
      commonErrors: {
        ru: 'Сгибание локтей вместо разведения рук; прогиб в пояснице; слишком сильная резинка; рывки.',
        en: 'Bending the elbows instead of pulling apart; arching the lower back; using a band that is too strong; jerky movement.',
      },
      breathing: {
        ru: 'Выдыхайте при разведении рук, вдыхайте при возвращении.',
        en: 'Exhale as you pull apart, inhale as you return.',
      },
    },
    dosage: {
      strength: {
        sets: '2-4',
        reps: '5-8',
        restSec: '90-150',
      },
      hypertrophy: {
        sets: '2-4',
        reps: '8-12',
        restSec: '60-120',
      },
      endurance: {
        sets: '2-3',
        reps: '12-20',
        restSec: '30-60',
      },
    },
    safety: {
      contraindications: [],
      precautions: ['avoid-shrugging', 'use-appropriate-band-tension', 'keep-movement-controlled'],
      impactLevel: 'low',
    },
    progression: {
      regressions: ['lighter-banded-pull-apart', 'shorter-range-banded-pull-apart'],
      progressions: ['stronger-banded-pull-apart', 'paused-banded-pull-apart'],
      alternatives: ['banded-seated-row', 'face-pull'],
    },
    media: {
      images: [],
      videos: [],
      thumbnail: '',
    },
  },
  {
    id: 'side-plank-hip-dip',
    slug: 'side-plank-hip-dip',
    names: {
      ru: 'Боковая планка с опусканием таза',
      en: 'Side Plank Hip Dip',
    },
    aliases: ['side-plank-dips', 'side-plank-hip-lift'],
    classification: {
      modality: 'strength',
      exerciseFamily: 'plank',
      movementPatterns: ['core-anti-lateral-flexion'],
      difficulty: 'intermediate',
      equipment: ['bodyweight'],
      bodyPosition: 'prone',
      laterality: 'unilateral',
    },
    mechanics: {
      executionMode: 'reps',
      tempo: {
        eccentric: 2,
        pauseBottom: 0,
        concentric: 1,
        pauseTop: 0,
      },
      rangeOfMotion: 'full-controlled',
      loadType: 'bodyweight',
    },
    muscles: {
      primary: ['core', 'obliques'],
      secondary: ['shoulders'],
      stabilizers: ['glutes', 'hips'],
      jointActions: ['spine-lateral-flexion', 'spine-stabilization', 'shoulder-stabilization'],
    },
    technique: {
      setup: {
        ru: 'Примите боковую планку: локоть под плечом, ноги вытянуты, корпус в прямой линии.',
        en: 'Set up in a side plank with elbow under shoulder, legs extended, and body in a straight line.',
      },
      steps: {
        ru: 'Медленно опустите таз к полу, сохраняя контроль плеча и корпуса. Затем поднимите таз обратно до прямой линии, напрягая косые мышцы и ягодицы.',
        en: 'Slowly lower your hips toward the floor while keeping shoulder and torso control. Lift the hips back to a straight line by engaging the obliques and glutes.',
      },
      keyCues: {
        ru: 'Двигайтесь плавно; не проваливайтесь в плечо; таз поднимается за счет боковой линии корпуса.',
        en: 'Move smoothly; do not sink into the shoulder; lift the hips through the side of your torso.',
      },
      commonErrors: {
        ru: 'Падение таза без контроля; разворот корпуса вперед; перегрузка плеча; слишком большая амплитуда.',
        en: 'Dropping the hips without control; rotating the torso forward; overloading the shoulder; using too much range.',
      },
      breathing: {
        ru: 'Вдыхайте при опускании таза, выдыхайте при подъеме.',
        en: 'Inhale as you lower the hips, exhale as you lift.',
      },
    },
    dosage: {
      strength: {
        sets: '3-5',
        reps: '4-8',
        restSec: '90-180',
      },
      hypertrophy: {
        sets: '2-4',
        reps: '6-15',
        restSec: '60-120',
      },
      endurance: {
        sets: '2-4',
        reps: '12-20',
        restSec: '30-60',
      },
    },
    safety: {
      contraindications: ['joint-shoulder-pain'],
      precautions: [
        'control-shoulder-position',
        'avoid-excessive-hip-drop',
        'maintain-straight-body-line',
      ],
      impactLevel: 'low',
    },
    progression: {
      regressions: ['side-plank', 'kneeling-side-plank-hip-dip'],
      progressions: ['weighted-side-plank-hip-dip', 'side-plank-hip-dip-with-leg-lift'],
      alternatives: ['side-plank', 'heel-touches'],
    },
    media: {
      images: [],
      videos: [],
      thumbnail: '',
    },
  },
  {
    id: 'banded-seated-row',
    slug: 'banded-seated-row',
    names: {
      ru: 'Тяга резинки сидя',
      en: 'Banded Seated Row',
    },
    aliases: ['resistance-band-seated-row', 'seated-band-row'],
    classification: {
      modality: 'strength',
      exerciseFamily: 'row',
      movementPatterns: ['horizontal-pull'],
      difficulty: 'beginner',
      equipment: ['resistance-band'],
      bodyPosition: 'seated',
      laterality: 'bilateral',
    },
    mechanics: {
      executionMode: 'reps',
      tempo: {
        eccentric: 2,
        pauseBottom: 1,
        concentric: 1,
        pauseTop: 0,
      },
      rangeOfMotion: 'full-controlled',
      loadType: 'elastic-resistance',
    },
    muscles: {
      primary: ['back'],
      secondary: ['biceps', 'rear-delts'],
      stabilizers: ['core', 'upper-back'],
      jointActions: ['shoulder-extension', 'elbow-flexion', 'scapular-retraction'],
    },
    technique: {
      setup: {
        ru: 'Сядьте с вытянутыми ногами и закрепите резинку за стопами или устойчивой опорой перед собой. Держите спину нейтральной.',
        en: 'Sit with legs extended and anchor the band around your feet or a stable point in front of you. Keep your spine neutral.',
      },
      steps: {
        ru: 'Потяните резинку к нижней части ребер или животу, сводя лопатки. Не отклоняйтесь корпусом назад. Медленно выпрямите руки и вернитесь в исходное положение.',
        en: 'Pull the band toward your lower ribs or stomach while squeezing your shoulder blades. Avoid leaning back. Slowly extend your arms and return to the start.',
      },
      keyCues: {
        ru: 'Локти назад; грудь открыта; спина ровная.',
        en: 'Elbows back; chest open; back straight.',
      },
      commonErrors: {
        ru: 'Круглая спина; тяга корпусом; подъем плеч к ушам; потеря натяжения резинки.',
        en: 'Rounding the back; pulling with the torso; shrugging the shoulders; losing band tension.',
      },
      breathing: {
        ru: 'Выдыхайте при тяге, вдыхайте при возвращении рук вперед.',
        en: 'Exhale as you row, inhale as your arms return forward.',
      },
    },
    dosage: {
      strength: {
        sets: '2-4',
        reps: '5-8',
        restSec: '90-150',
      },
      hypertrophy: {
        sets: '2-4',
        reps: '8-12',
        restSec: '60-120',
      },
      endurance: {
        sets: '2-3',
        reps: '12-20',
        restSec: '30-60',
      },
    },
    safety: {
      contraindications: [],
      precautions: ['secure-band-anchor', 'avoid-rounding-back', 'control-band-return'],
      impactLevel: 'low',
    },
    progression: {
      regressions: ['lighter-banded-seated-row', 'shorter-range-banded-seated-row'],
      progressions: ['stronger-banded-seated-row', 'paused-banded-seated-row'],
      alternatives: ['single-arm-kettlebell-row', 'banded-pull-apart'],
    },
    media: {
      images: [],
      videos: [],
      thumbnail: '',
    },
  },
  {
    id: 'frog-pumps',
    slug: 'frog-pumps',
    names: {
      ru: 'Лягушачьи качания',
      en: 'Frog Pumps',
    },
    aliases: ['frog-glute-bridge', 'frog-hip-thrust'],
    classification: {
      modality: 'strength',
      exerciseFamily: 'bridge',
      movementPatterns: ['hinge'],
      difficulty: 'beginner',
      equipment: ['bodyweight'],
      bodyPosition: 'supine',
      laterality: 'bilateral',
    },
    mechanics: {
      executionMode: 'reps',
      tempo: {
        eccentric: 2,
        pauseBottom: 0,
        concentric: 1,
        pauseTop: 1,
      },
      rangeOfMotion: 'full-controlled',
      loadType: 'bodyweight',
    },
    muscles: {
      primary: ['glutes'],
      secondary: ['hamstrings', 'adductors'],
      stabilizers: ['core', 'hips'],
      jointActions: ['hip-extension', 'hip-external-rotation', 'posterior-pelvic-tilt'],
    },
    technique: {
      setup: {
        ru: 'Лягте на спину, соедините подошвы стоп, колени разведите в стороны. Руки положите вдоль тела.',
        en: 'Lie on your back with the soles of your feet together and knees opened out to the sides. Place your arms by your sides.',
      },
      steps: {
        ru: 'Напрягите корпус и поднимите таз вверх, сжимая ягодицы. В верхней точке сделайте короткую паузу, затем медленно опустите таз обратно.',
        en: 'Brace your core and lift your hips by squeezing the glutes. Pause briefly at the top, then lower your hips back down slowly.',
      },
      keyCues: {
        ru: 'Стопы вместе; колени раскрыты; поднимайтесь за счет ягодиц, а не поясницы.',
        en: 'Keep feet together; knees open; lift through the glutes, not the lower back.',
      },
      commonErrors: {
        ru: 'Прогиб в пояснице; слишком высокая амплитуда; потеря контакта стоп; быстрые неконтролируемые повторы.',
        en: 'Arching the lower back; lifting too high; losing foot contact; fast uncontrolled reps.',
      },
      breathing: {
        ru: 'Выдыхайте при подъеме таза, вдыхайте при опускании.',
        en: 'Exhale as you lift the hips, inhale as you lower.',
      },
    },
    dosage: {
      strength: {
        sets: '2-4',
        reps: '5-8',
        restSec: '90-150',
      },
      hypertrophy: {
        sets: '2-4',
        reps: '8-12',
        restSec: '60-120',
      },
      endurance: {
        sets: '2-3',
        reps: '12-20',
        restSec: '30-60',
      },
    },
    safety: {
      contraindications: ['region-lower-back-pain'],
      precautions: [
        'avoid-lumbar-overextension',
        'use-comfortable-hip-position',
        'control-range-of-motion',
      ],
      impactLevel: 'low',
    },
    progression: {
      regressions: ['glute-bridge', 'short-range-frog-pumps'],
      progressions: ['banded-frog-pumps', 'weighted-frog-pumps'],
      alternatives: ['banded-glute-bridge', 'dumbbell-hip-thrust'],
    },
    media: {
      images: [],
      videos: [],
      thumbnail: '',
    },
  },
  {
    id: 'dumbbell-lateral-lunge',
    slug: 'dumbbell-lateral-lunge',
    names: {
      ru: 'Боковые выпады с гантелями',
      en: 'Dumbbell Lateral Lunge',
    },
    aliases: ['weighted-lateral-lunge', 'db-side-lunge'],
    classification: {
      modality: 'strength',
      exerciseFamily: 'lunge',
      movementPatterns: ['lunge'],
      difficulty: 'intermediate',
      equipment: ['dumbbells'],
      bodyPosition: 'standing',
      laterality: 'bilateral',
    },
    mechanics: {
      executionMode: 'reps',
      tempo: {
        eccentric: 2,
        pauseBottom: 0,
        concentric: 1,
        pauseTop: 0,
      },
      rangeOfMotion: 'full-controlled',
      loadType: 'external-load',
    },
    muscles: {
      primary: ['quads', 'glutes'],
      secondary: ['adductors'],
      stabilizers: ['core', 'hips'],
      jointActions: ['knee-flexion', 'knee-extension', 'hip-abduction', 'hip-extension'],
    },
    technique: {
      setup: {
        ru: 'Встаньте прямо, удерживая гантели по бокам корпуса или перед собой. Стопы на ширине таза, корпус стабилен.',
        en: 'Stand tall holding dumbbells at your sides or in front of you. Feet hip-width apart and torso stable.',
      },
      steps: {
        ru: 'Сделайте широкий шаг в сторону и опуститесь в выпад, сгибая рабочую ногу и отводя таз назад. Вторая нога остается почти прямой. Оттолкнитесь рабочей стопой и вернитесь в исходное положение.',
        en: 'Take a wide step to the side and lower into a lunge by bending the working leg and pushing your hips back. Keep the other leg mostly straight. Push through the working foot to return to the start.',
      },
      keyCues: {
        ru: 'Таз назад; колено по линии носка; гантели держите под контролем.',
        en: 'Hips back; knee tracks over toes; keep the dumbbells controlled.',
      },
      commonErrors: {
        ru: 'Завал колена внутрь; перенос веса на носок; округление спины; слишком короткий шаг.',
        en: 'Knee collapsing inward; shifting weight onto the toes; rounding the back; stepping too short.',
      },
      breathing: {
        ru: 'Вдох при опускании, выдох при возвращении в стойку.',
        en: 'Inhale as you lower, exhale as you return to standing.',
      },
    },
    dosage: {
      strength: {
        sets: '3-5',
        reps: '4-8',
        restSec: '90-180',
      },
      hypertrophy: {
        sets: '2-4',
        reps: '6-15',
        restSec: '60-120',
      },
      endurance: {
        sets: '2-4',
        reps: '12-20',
        restSec: '30-60',
      },
    },
    safety: {
      contraindications: ['joint-knee-pain'],
      precautions: ['control-knee-alignment', 'use-manageable-load', 'avoid-forcing-depth'],
      impactLevel: 'low',
    },
    progression: {
      regressions: ['lateral-lunge', 'assisted-lateral-lunge'],
      progressions: ['heavier-dumbbell-lateral-lunge', 'dumbbell-lateral-lunge-to-balance'],
      alternatives: ['goblet-sumo-squat', 'dumbbell-curtsy-lunge'],
    },
    media: {
      images: [],
      videos: [],
      thumbnail: '',
    },
  },
  {
    id: 'downward-facing-dog',
    slug: 'downward-facing-dog',
    names: {
      ru: 'Собака мордой вниз',
      en: 'Downward-Facing Dog',
    },
    aliases: ['down-dog', 'adho-mukha-svanasana'],
    classification: {
      modality: 'yoga',
      exerciseFamily: 'yoga-pose',
      movementPatterns: ['inversion', 'stretch'],
      difficulty: 'beginner',
      equipment: ['bodyweight'],
      bodyPosition: 'quadruped',
      laterality: 'bilateral',
    },
    mechanics: {
      executionMode: 'hold',
      tempo: {
        eccentric: 0,
        pauseBottom: 30,
        concentric: 0,
        pauseTop: 0,
      },
      rangeOfMotion: 'full-controlled',
      loadType: 'bodyweight',
    },
    muscles: {
      primary: ['full-body'],
      secondary: ['hamstrings', 'shoulders'],
      stabilizers: ['core', 'upper-back', 'calves'],
      jointActions: ['shoulder-flexion', 'hip-flexion', 'ankle-dorsiflexion', 'spine-lengthening'],
    },
    technique: {
      setup: {
        ru: 'Начните из положения планки или на четвереньках, ладони под плечами, стопы на ширине таза.',
        en: 'Start from a plank or all-fours position with hands under shoulders and feet hip-width apart.',
      },
      steps: {
        ru: 'Поднимите таз вверх и назад, выпрямляя руки и вытягивая спину. Ноги можно слегка согнуть, если тянет заднюю поверхность бедра. Удерживайте ладони прижатыми к полу и дышите спокойно.',
        en: 'Lift your hips up and back, straightening your arms and lengthening your spine. Keep knees slightly bent if the hamstrings feel tight. Press your palms into the floor and breathe calmly.',
      },
      keyCues: {
        ru: 'Тяните таз вверх; удлиняйте спину; распределяйте вес между ладонями и стопами.',
        en: 'Reach hips up; lengthen the spine; distribute weight between hands and feet.',
      },
      commonErrors: {
        ru: 'Округление спины; перенос всего веса на запястья; жесткое выпрямление коленей; зажим шеи.',
        en: 'Rounding the back; dumping all weight into the wrists; locking the knees hard; tensing the neck.',
      },
      breathing: {
        ru: 'Дышите ровно и глубоко, сохраняя вытяжение на каждом выдохе.',
        en: 'Breathe steadily and deeply, maintaining length with each exhale.',
      },
    },
    dosage: {
      strength: {
        sets: '2-4',
        reps: '5-8',
        restSec: '90-150',
      },
      hypertrophy: {
        sets: '2-4',
        reps: '8-12',
        restSec: '60-120',
      },
      endurance: {
        sets: '2-3',
        reps: '12-20',
        restSec: '30-60',
      },
    },
    safety: {
      contraindications: [
        'joint-wrist-pain',
        'joint-shoulder-irritation',
        'cardio-high-blood-pressure',
      ],
      precautions: ['avoid-wrist-overload', 'bend-knees-if-needed', 'keep-neck-relaxed'],
      impactLevel: 'low',
    },
    progression: {
      regressions: ['bent-knee-downward-facing-dog', 'hands-elevated-downward-facing-dog'],
      progressions: ['three-legged-downward-facing-dog', 'downward-facing-dog-to-plank'],
      alternatives: ['childs-pose', 'cat-cow'],
    },
    media: {
      images: [],
      videos: [],
      thumbnail: '',
    },
  },
  {
    id: 'cat-cow',
    slug: 'cat-cow',
    names: {
      ru: 'Кошка-Корова',
      en: 'Cat-Cow Pose',
    },
    aliases: ['cat-cow-stretch', 'marjaryasana-bitilasana'],
    classification: {
      modality: 'yoga',
      exerciseFamily: 'spinal-mobility',
      movementPatterns: ['spinal-mobility'],
      difficulty: 'beginner',
      equipment: ['bodyweight'],
      bodyPosition: 'quadruped',
      laterality: 'bilateral',
    },
    mechanics: {
      executionMode: 'reps',
      tempo: {
        eccentric: 2,
        pauseBottom: 0,
        concentric: 2,
        pauseTop: 0,
      },
      rangeOfMotion: 'full-controlled',
      loadType: 'bodyweight',
    },
    muscles: {
      primary: ['back'],
      secondary: ['core'],
      stabilizers: ['shoulders', 'hips'],
      jointActions: ['spine-flexion', 'spine-extension', 'pelvic-tilt'],
    },
    technique: {
      setup: {
        ru: 'Встаньте на четвереньки: ладони под плечами, колени под тазом, шея продолжает линию позвоночника.',
        en: 'Start on all fours with hands under shoulders, knees under hips, and neck in line with your spine.',
      },
      steps: {
        ru: 'На выдохе округлите спину вверх и мягко подтяните подбородок. На вдохе опустите живот, раскройте грудь и слегка направьте взгляд вперед. Двигайтесь плавно в ритме дыхания.',
        en: 'On the exhale, round your back upward and gently tuck your chin. On the inhale, lower your belly, open your chest, and look slightly forward. Move smoothly with your breath.',
      },
      keyCues: {
        ru: 'Двигайте позвоночник позвонок за позвонком; не давите в поясницу; плечи держите от ушей.',
        en: 'Move the spine segment by segment; avoid forcing the lower back; keep shoulders away from ears.',
      },
      commonErrors: {
        ru: 'Резкие движения; чрезмерный прогиб в пояснице; зажим шеи; перенос веса только на запястья.',
        en: 'Jerky movement; excessive lower-back arch; neck tension; dumping weight into the wrists.',
      },
      breathing: {
        ru: 'Выдох в положении «кошка», вдох в положении «корова».',
        en: 'Exhale into cat, inhale into cow.',
      },
    },
    dosage: {
      strength: {
        sets: '2-4',
        reps: '5-8',
        restSec: '90-150',
      },
      hypertrophy: {
        sets: '2-4',
        reps: '8-12',
        restSec: '60-120',
      },
      endurance: {
        sets: '2-3',
        reps: '12-20',
        restSec: '30-60',
      },
    },
    safety: {
      contraindications: ['region-back-severe-pain'],
      precautions: [
        'move-within-comfortable-range',
        'avoid-forcing-extension',
        'use-padding-under-knees',
      ],
      impactLevel: 'low',
    },
    progression: {
      regressions: ['smaller-range-cat-cow', 'seated-cat-cow'],
      progressions: ['cat-cow-with-hip-circles', 'cat-cow-to-childs-pose'],
      alternatives: ['childs-pose', 'bird-dog'],
    },
    media: {
      images: [],
      videos: [],
      thumbnail: '',
    },
  },
  {
    id: 'childs-pose',
    slug: 'childs-pose',
    names: {
      ru: 'Поза ребёнка',
      en: "Child's Pose",
    },
    aliases: ['balasana', 'child-pose'],
    classification: {
      modality: 'yoga',
      exerciseFamily: 'yoga-pose',
      movementPatterns: ['stretch'],
      difficulty: 'beginner',
      equipment: ['bodyweight'],
      bodyPosition: 'kneeling',
      laterality: 'bilateral',
    },
    mechanics: {
      executionMode: 'hold',
      tempo: {
        eccentric: 0,
        pauseBottom: 60,
        concentric: 0,
        pauseTop: 0,
      },
      rangeOfMotion: 'full-controlled',
      loadType: 'bodyweight',
    },
    muscles: {
      primary: ['back', 'hips'],
      secondary: ['shoulders', 'glutes'],
      stabilizers: ['core'],
      jointActions: ['hip-flexion', 'spine-flexion', 'shoulder-flexion'],
    },
    technique: {
      setup: {
        ru: 'Встаньте на колени, соедините большие пальцы стоп и разведите колени на комфортную ширину.',
        en: 'Kneel down, bring your big toes together, and separate your knees to a comfortable width.',
      },
      steps: {
        ru: 'Опустите таз к пяткам, вытяните руки вперед и мягко опустите лоб к коврику. Расслабьте плечи и удерживайте позу в спокойном дыхании.',
        en: 'Sit your hips back toward your heels, reach your arms forward, and gently lower your forehead toward the mat. Relax your shoulders and hold the pose with calm breathing.',
      },
      keyCues: {
        ru: 'Таз тянется к пяткам; плечи расслаблены; дыхание направляйте в спину.',
        en: 'Reach hips toward heels; relax the shoulders; breathe into the back.',
      },
      commonErrors: {
        ru: 'Напряжение плеч; дискомфорт в коленях без поддержки; задержка дыхания; чрезмерное давление лбом в пол.',
        en: 'Shoulder tension; knee discomfort without support; holding the breath; pressing the forehead too hard into the floor.',
      },
      breathing: {
        ru: 'Дышите медленно и глубоко, расслабляясь на каждом выдохе.',
        en: 'Breathe slowly and deeply, relaxing with each exhale.',
      },
    },
    dosage: {
      strength: {
        sets: '2-4',
        reps: '5-8',
        restSec: '90-150',
      },
      hypertrophy: {
        sets: '2-4',
        reps: '8-12',
        restSec: '60-120',
      },
      endurance: {
        sets: '2-3',
        reps: '12-20',
        restSec: '30-60',
      },
    },
    safety: {
      contraindications: [],
      precautions: [
        'use-padding-under-knees',
        'avoid-forcing-hip-flexion',
        'support-forehead-if-needed',
      ],
      impactLevel: 'low',
    },
    progression: {
      regressions: ['supported-childs-pose', 'wide-knee-childs-pose'],
      progressions: ['thread-the-needle', 'extended-childs-pose'],
      alternatives: ['cat-cow', 'downward-facing-dog'],
    },
    media: {
      images: [],
      videos: [],
      thumbnail: '',
    },
  },
  {
    id: 'mountain-pose',
    slug: 'mountain-pose',
    names: {
      ru: 'Поза горы',
      en: 'Mountain Pose',
    },
    aliases: ['tadasana', 'standing-mountain-pose'],
    classification: {
      modality: 'yoga',
      exerciseFamily: 'yoga-pose',
      movementPatterns: ['balance'],
      difficulty: 'beginner',
      equipment: ['bodyweight'],
      bodyPosition: 'standing',
      laterality: 'bilateral',
    },
    mechanics: {
      executionMode: 'hold',
      tempo: {
        eccentric: 0,
        pauseBottom: 30,
        concentric: 0,
        pauseTop: 0,
      },
      rangeOfMotion: 'isometric',
      loadType: 'bodyweight',
    },
    muscles: {
      primary: ['core'],
      secondary: ['full-body'],
      stabilizers: ['glutes', 'feet', 'upper-back'],
      jointActions: ['postural-alignment', 'spine-stabilization', 'balance'],
    },
    technique: {
      setup: {
        ru: 'Встаньте прямо, стопы вместе или на ширине таза, вес равномерно распределен по всей стопе.',
        en: 'Stand tall with feet together or hip-width apart, weight evenly distributed through the whole foot.',
      },
      steps: {
        ru: 'Мягко подтяните корпус, удлините позвоночник и направьте макушку вверх. Плечи расслабьте вниз, руки держите вдоль тела. Удерживайте спокойное устойчивое положение.',
        en: 'Gently engage your torso, lengthen the spine, and reach the crown of your head upward. Relax shoulders down and keep arms by your sides. Hold a calm, steady posture.',
      },
      keyCues: {
        ru: 'Стопы укоренены; макушка вверх; плечи мягкие и расслабленные.',
        en: 'Root through the feet; crown reaches upward; shoulders stay soft and relaxed.',
      },
      commonErrors: {
        ru: 'Зажатые плечи; прогиб в пояснице; перенос веса на пятки или носки; задержка дыхания.',
        en: 'Tense shoulders; lower-back arch; shifting weight too far to heels or toes; holding the breath.',
      },
      breathing: {
        ru: 'Дышите спокойно и ровно, сохраняя устойчивость.',
        en: 'Breathe calmly and evenly while maintaining stability.',
      },
    },
    dosage: {
      strength: {
        sets: '2-4',
        reps: '5-8',
        restSec: '90-150',
      },
      hypertrophy: {
        sets: '2-4',
        reps: '8-12',
        restSec: '60-120',
      },
      endurance: {
        sets: '2-3',
        reps: '12-20',
        restSec: '30-60',
      },
    },
    safety: {
      contraindications: [],
      precautions: ['avoid-locking-knees', 'distribute-weight-evenly', 'keep-breath-steady'],
      impactLevel: 'low',
    },
    progression: {
      regressions: ['feet-hip-width-mountain-pose', 'wall-supported-mountain-pose'],
      progressions: ['mountain-pose-eyes-closed', 'mountain-pose-with-arm-raise'],
      alternatives: ['tree-pose', 'standing-breathing'],
    },
    media: {
      images: [],
      videos: [],
      thumbnail: '',
    },
  },
  {
    id: 'warrior-i',
    slug: 'warrior-i',
    names: {
      ru: 'Воин I',
      en: 'Warrior I',
    },
    aliases: ['virabhadrasana-i', 'warrior-one'],
    classification: {
      modality: 'yoga',
      exerciseFamily: 'yoga-pose',
      movementPatterns: ['lunge', 'balance'],
      difficulty: 'beginner',
      equipment: ['bodyweight'],
      bodyPosition: 'standing',
      laterality: 'bilateral',
    },
    mechanics: {
      executionMode: 'hold',
      tempo: {
        eccentric: 0,
        pauseBottom: 30,
        concentric: 0,
        pauseTop: 0,
      },
      rangeOfMotion: 'full-controlled',
      loadType: 'bodyweight',
    },
    muscles: {
      primary: ['quads', 'glutes'],
      secondary: ['shoulders'],
      stabilizers: ['core', 'hips', 'calves'],
      jointActions: ['hip-flexion', 'hip-extension', 'knee-flexion', 'shoulder-flexion'],
    },
    technique: {
      setup: {
        ru: 'Встаньте прямо, сделайте шаг одной ногой назад и разверните заднюю стопу слегка наружу. Передняя стопа направлена вперед.',
        en: 'Stand tall, step one foot back, and turn the rear foot slightly outward. Keep the front foot pointing forward.',
      },
      steps: {
        ru: 'Согните переднее колено до комфортного угла, удерживая его по линии стопы. Поднимите руки вверх, вытяните корпус и сохраняйте таз максимально ровным.',
        en: 'Bend the front knee to a comfortable angle while tracking it over the foot. Raise your arms overhead, lengthen the torso, and keep the hips as square as possible.',
      },
      keyCues: {
        ru: 'Переднее колено по линии носка; таз смотрит вперед; ребра не раскрываются.',
        en: 'Track the front knee over the toes; square the hips forward; avoid flaring the ribs.',
      },
      commonErrors: {
        ru: 'Завал колена внутрь; чрезмерный прогиб в пояснице; поднятые плечи; слишком узкая стойка.',
        en: 'Front knee collapsing inward; excessive lower-back arch; shoulders shrugged; stance too narrow.',
      },
      breathing: {
        ru: 'Дышите ровно и глубоко, сохраняя вытяжение на каждом вдохе.',
        en: 'Breathe steadily and deeply, maintaining length with each inhale.',
      },
    },
    dosage: {
      strength: {
        sets: '2-4',
        reps: '5-8',
        restSec: '90-150',
      },
      hypertrophy: {
        sets: '2-4',
        reps: '8-12',
        restSec: '60-120',
      },
      endurance: {
        sets: '2-3',
        reps: '12-20',
        restSec: '30-60',
      },
    },
    safety: {
      contraindications: ['joint-knee-pain'],
      precautions: [
        'control-knee-alignment',
        'avoid-lumbar-overextension',
        'use-comfortable-stance',
      ],
      impactLevel: 'low',
    },
    progression: {
      regressions: ['short-stance-warrior-i', 'hands-on-hips-warrior-i'],
      progressions: ['deeper-warrior-i', 'warrior-i-with-backbend'],
      alternatives: ['warrior-ii', 'low-lunge'],
    },
    media: {
      images: [],
      videos: [],
      thumbnail: '',
    },
  },
  {
    id: 'warrior-ii',
    slug: 'warrior-ii',
    names: {
      ru: 'Воин II',
      en: 'Warrior II',
    },
    aliases: ['virabhadrasana-ii', 'warrior-two'],
    classification: {
      modality: 'yoga',
      exerciseFamily: 'yoga-pose',
      movementPatterns: ['lunge', 'balance'],
      difficulty: 'beginner',
      equipment: ['bodyweight'],
      bodyPosition: 'standing',
      laterality: 'bilateral',
    },
    mechanics: {
      executionMode: 'hold',
      tempo: {
        eccentric: 0,
        pauseBottom: 30,
        concentric: 0,
        pauseTop: 0,
      },
      rangeOfMotion: 'full-controlled',
      loadType: 'bodyweight',
    },
    muscles: {
      primary: ['quads', 'glutes'],
      secondary: ['shoulders'],
      stabilizers: ['core', 'hips', 'adductors'],
      jointActions: ['hip-abduction', 'knee-flexion', 'shoulder-abduction', 'spine-stabilization'],
    },
    technique: {
      setup: {
        ru: 'Встаньте в широкую стойку, переднюю стопу направьте вперед, заднюю разверните в сторону.',
        en: 'Stand in a wide stance with the front foot pointing forward and the back foot turned out to the side.',
      },
      steps: {
        ru: 'Согните переднее колено, удерживая его по линии стопы. Разведите руки в стороны на уровне плеч и направьте взгляд над передней рукой.',
        en: 'Bend the front knee while keeping it aligned with the foot. Extend your arms out at shoulder level and gaze over the front hand.',
      },
      keyCues: {
        ru: 'Переднее колено над стопой; руки вытянуты в стороны; корпус высокий и стабильный.',
        en: 'Front knee over the foot; arms reach in opposite directions; torso tall and stable.',
      },
      commonErrors: {
        ru: 'Завал переднего колена внутрь; наклон корпуса вперед; поднятые плечи; потеря опоры на задней стопе.',
        en: 'Front knee collapsing inward; leaning the torso forward; shrugging the shoulders; losing pressure through the back foot.',
      },
      breathing: {
        ru: 'Дышите спокойно, удерживая устойчивость и раскрытие грудной клетки.',
        en: 'Breathe calmly while maintaining stability and an open chest.',
      },
    },
    dosage: {
      strength: {
        sets: '2-4',
        reps: '5-8',
        restSec: '90-150',
      },
      hypertrophy: {
        sets: '2-4',
        reps: '8-12',
        restSec: '60-120',
      },
      endurance: {
        sets: '2-3',
        reps: '12-20',
        restSec: '30-60',
      },
    },
    safety: {
      contraindications: ['joint-knee-pain'],
      precautions: ['control-knee-alignment', 'avoid-forcing-depth', 'keep-shoulders-relaxed'],
      impactLevel: 'low',
    },
    progression: {
      regressions: ['short-stance-warrior-ii', 'hands-on-hips-warrior-ii'],
      progressions: ['deeper-warrior-ii', 'reverse-warrior'],
      alternatives: ['warrior-i', 'triangle-pose'],
    },
    media: {
      images: [],
      videos: [],
      thumbnail: '',
    },
  },
  {
    id: 'triangle-pose',
    slug: 'triangle-pose',
    names: {
      ru: 'Поза треугольника',
      en: 'Triangle Pose',
    },
    aliases: ['trikonasana', 'extended-triangle-pose'],
    classification: {
      modality: 'yoga',
      exerciseFamily: 'yoga-pose',
      movementPatterns: ['lateral-flexion'],
      difficulty: 'beginner',
      equipment: ['bodyweight'],
      bodyPosition: 'standing',
      laterality: 'bilateral',
    },
    mechanics: {
      executionMode: 'hold',
      tempo: {
        eccentric: 0,
        pauseBottom: 30,
        concentric: 0,
        pauseTop: 0,
      },
      rangeOfMotion: 'full-controlled',
      loadType: 'bodyweight',
    },
    muscles: {
      primary: ['obliques'],
      secondary: ['hamstrings', 'core'],
      stabilizers: ['glutes', 'hips', 'shoulders'],
      jointActions: ['spine-lateral-flexion', 'hip-hinge', 'shoulder-abduction'],
    },
    technique: {
      setup: {
        ru: 'Встаньте в широкую стойку, переднюю стопу направьте вперед, заднюю разверните слегка наружу. Руки вытяните в стороны.',
        en: 'Stand in a wide stance with the front foot pointing forward and the back foot slightly turned out. Extend your arms to the sides.',
      },
      steps: {
        ru: 'Потянитесь корпусом вперед над передней ногой, затем наклонитесь в сторону. Нижнюю руку разместите на голени, блоке или бедре, верхнюю вытяните вверх. Шею держите комфортно.',
        en: 'Reach your torso forward over the front leg, then tilt to the side. Place the lower hand on your shin, a block, or thigh, and reach the top arm upward. Keep the neck comfortable.',
      },
      keyCues: {
        ru: 'Удлиняйте оба бока корпуса; не заваливайтесь вперед; опора нижней руки легкая.',
        en: 'Lengthen both sides of the torso; avoid collapsing forward; keep the lower hand light.',
      },
      commonErrors: {
        ru: 'Округление спины; опора всем весом на голень; переразгибание колена; поворот головы при дискомфорте в шее.',
        en: 'Rounding the back; dumping weight into the shin; locking the knee hard; turning the head despite neck discomfort.',
      },
      breathing: {
        ru: 'Дышите ровно, сохраняя длину корпуса на вдохе и мягкое раскрытие на выдохе.',
        en: 'Breathe steadily, keeping length on the inhale and soft opening on the exhale.',
      },
    },
    dosage: {
      strength: {
        sets: '2-4',
        reps: '5-8',
        restSec: '90-150',
      },
      hypertrophy: {
        sets: '2-4',
        reps: '8-12',
        restSec: '60-120',
      },
      endurance: {
        sets: '2-3',
        reps: '12-20',
        restSec: '30-60',
      },
    },
    safety: {
      contraindications: ['region-neck-pain'],
      precautions: ['keep-neck-comfortable', 'avoid-locking-knee', 'use-support-if-needed'],
      impactLevel: 'low',
    },
    progression: {
      regressions: ['triangle-pose-with-block', 'short-stance-triangle-pose'],
      progressions: ['extended-triangle-pose', 'revolved-triangle-pose'],
      alternatives: ['warrior-ii', 'side-angle-pose'],
    },
    media: {
      images: [],
      videos: [],
      thumbnail: '',
    },
  },
  {
    id: 'tree-pose',
    slug: 'tree-pose',
    names: {
      ru: 'Поза дерева',
      en: 'Tree Pose',
    },
    aliases: ['vrikshasana', 'tree-balance'],
    classification: {
      modality: 'yoga',
      exerciseFamily: 'yoga-pose',
      movementPatterns: ['balance'],
      difficulty: 'intermediate',
      equipment: ['bodyweight'],
      bodyPosition: 'standing',
      laterality: 'bilateral',
    },
    mechanics: {
      executionMode: 'hold',
      tempo: {
        eccentric: 0,
        pauseBottom: 30,
        concentric: 0,
        pauseTop: 0,
      },
      rangeOfMotion: 'isometric',
      loadType: 'bodyweight',
    },
    muscles: {
      primary: ['core'],
      secondary: ['quads'],
      stabilizers: ['glutes', 'feet', 'hips'],
      jointActions: ['balance', 'hip-external-rotation', 'spine-stabilization'],
    },
    technique: {
      setup: {
        ru: 'Встаньте прямо и перенесите вес на одну ногу. Найдите устойчивую точку взгляда перед собой.',
        en: 'Stand tall and shift your weight onto one leg. Find a steady point to gaze at in front of you.',
      },
      steps: {
        ru: 'Поставьте стопу второй ноги на внутреннюю поверхность голени или бедра, избегая давления на колено. Сложите ладони у груди или поднимите руки вверх. Удерживайте равновесие и повторите на другую сторону.',
        en: 'Place the other foot on the inner calf or thigh, avoiding pressure on the knee. Bring palms together at the chest or raise arms overhead. Hold your balance and repeat on the other side.',
      },
      keyCues: {
        ru: 'Стопа не давит на колено; таз ровный; взгляд спокойный и фиксированный.',
        en: 'Do not press the foot into the knee; keep hips level; maintain a calm fixed gaze.',
      },
      commonErrors: {
        ru: 'Опора стопой на коленный сустав; завал таза; задержка дыхания; напряжение плеч.',
        en: 'Pressing the foot into the knee joint; hips tilting; holding the breath; shoulder tension.',
      },
      breathing: {
        ru: 'Дышите ровно и спокойно, возвращая внимание к балансу на каждом выдохе.',
        en: 'Breathe evenly and calmly, returning attention to balance with each exhale.',
      },
    },
    dosage: {
      strength: {
        sets: '3-5',
        reps: '4-8',
        restSec: '90-180',
      },
      hypertrophy: {
        sets: '2-4',
        reps: '6-15',
        restSec: '60-120',
      },
      endurance: {
        sets: '2-4',
        reps: '12-20',
        restSec: '30-60',
      },
    },
    safety: {
      contraindications: ['joint-ankle-pain'],
      precautions: [
        'avoid-pressing-foot-on-knee',
        'use-wall-support-if-needed',
        'maintain-steady-gaze',
      ],
      impactLevel: 'low',
    },
    progression: {
      regressions: ['kickstand-tree-pose', 'wall-supported-tree-pose'],
      progressions: ['tree-pose-eyes-closed', 'tree-pose-with-arm-raise'],
      alternatives: ['mountain-pose', 'single-leg-balance'],
    },
    media: {
      images: [],
      videos: [],
      thumbnail: '',
    },
  },
  {
    id: 'cobra-pose',
    slug: 'cobra-pose',
    names: {
      ru: 'Поза кобры',
      en: 'Cobra Pose',
    },
    aliases: ['bhujangasana', 'cobra-stretch'],
    classification: {
      modality: 'yoga',
      exerciseFamily: 'yoga-pose',
      movementPatterns: ['back-extension'],
      difficulty: 'beginner',
      equipment: ['bodyweight'],
      bodyPosition: 'prone',
      laterality: 'bilateral',
    },
    mechanics: {
      executionMode: 'hold',
      tempo: {
        eccentric: 0,
        pauseBottom: 20,
        concentric: 0,
        pauseTop: 0,
      },
      rangeOfMotion: 'full-controlled',
      loadType: 'bodyweight',
    },
    muscles: {
      primary: ['back'],
      secondary: ['core'],
      stabilizers: ['glutes', 'shoulders', 'upper-back'],
      jointActions: ['spine-extension', 'shoulder-extension', 'scapular-retraction'],
    },
    technique: {
      setup: {
        ru: 'Лягте на живот, ладони поставьте под плечами, локти держите близко к корпусу. Ноги вытянуты назад.',
        en: 'Lie on your stomach with palms under shoulders and elbows close to your body. Extend your legs back.',
      },
      steps: {
        ru: 'Мягко поднимите грудь от пола, помогая руками, но не перенося весь вес на ладони. Лопатки направьте назад и вниз, шею держите длинной. Удерживайте комфортную высоту.',
        en: 'Gently lift your chest off the floor, using the hands for support without dumping all weight into them. Draw shoulder blades back and down, keeping the neck long. Hold at a comfortable height.',
      },
      keyCues: {
        ru: 'Грудь вперед и вверх; локти близко к телу; поясница без сжатия.',
        en: 'Chest forward and up; elbows close to the body; avoid compression in the lower back.',
      },
      commonErrors: {
        ru: 'Слишком сильный прогиб в пояснице; выпрямление локтей ценой контроля; поднятые плечи; запрокидывание головы.',
        en: 'Overarching the lower back; locking the elbows at the expense of control; shrugging the shoulders; throwing the head back.',
      },
      breathing: {
        ru: 'Вдыхайте, расширяя грудную клетку, и выдыхайте, сохраняя мягкое вытяжение.',
        en: 'Inhale to expand the chest and exhale while maintaining gentle length.',
      },
    },
    dosage: {
      strength: {
        sets: '2-4',
        reps: '5-8',
        restSec: '90-150',
      },
      hypertrophy: {
        sets: '2-4',
        reps: '8-12',
        restSec: '60-120',
      },
      endurance: {
        sets: '2-3',
        reps: '12-20',
        restSec: '30-60',
      },
    },
    safety: {
      contraindications: ['region-lower-back-pain'],
      precautions: ['avoid-forcing-back-extension', 'keep-neck-long', 'use-comfortable-range'],
      impactLevel: 'low',
    },
    progression: {
      regressions: ['baby-cobra-pose', 'sphinx-pose'],
      progressions: ['higher-cobra-pose', 'upward-facing-dog'],
      alternatives: ['cat-cow', 'childs-pose'],
    },
    media: {
      images: [],
      videos: [],
      thumbnail: '',
    },
  },
  {
    id: 'bridge-pose',
    slug: 'bridge-pose',
    names: {
      ru: 'Поза моста',
      en: 'Bridge Pose',
    },
    aliases: ['setu-bandhasana', 'yoga-bridge'],
    classification: {
      modality: 'yoga',
      exerciseFamily: 'bridge',
      movementPatterns: ['back-extension'],
      difficulty: 'beginner',
      equipment: ['bodyweight'],
      bodyPosition: 'supine',
      laterality: 'bilateral',
    },
    mechanics: {
      executionMode: 'hold',
      tempo: {
        eccentric: 0,
        pauseBottom: 30,
        concentric: 0,
        pauseTop: 0,
      },
      rangeOfMotion: 'full-controlled',
      loadType: 'bodyweight',
    },
    muscles: {
      primary: ['glutes', 'back'],
      secondary: ['core'],
      stabilizers: ['hamstrings', 'hips', 'upper-back'],
      jointActions: ['hip-extension', 'spine-extension', 'posterior-pelvic-tilt'],
    },
    technique: {
      setup: {
        ru: 'Лягте на спину, согните колени и поставьте стопы на пол на ширине таза. Руки расположите вдоль тела.',
        en: 'Lie on your back, bend your knees, and place your feet hip-width apart on the floor. Keep your arms by your sides.',
      },
      steps: {
        ru: 'Надавите стопами в пол и поднимите таз вверх, мягко раскрывая переднюю поверхность тела. Удерживайте вес на стопах и плечах, не сжимая шею. Дышите спокойно и опуститесь вниз с контролем.',
        en: 'Press your feet into the floor and lift your hips, gently opening the front of the body. Keep weight on your feet and shoulders without compressing the neck. Breathe calmly and lower down with control.',
      },
      keyCues: {
        ru: 'Толкайтесь стопами; удлиняйте переднюю линию тела; держите шею свободной.',
        en: 'Press through the feet; lengthen the front body; keep the neck free.',
      },
      commonErrors: {
        ru: 'Чрезмерный прогиб в пояснице; давление на шею; колени расходятся или заваливаются внутрь; задержка дыхания.',
        en: 'Excessive lower-back arch; pressure on the neck; knees drifting out or collapsing inward; holding the breath.',
      },
      breathing: {
        ru: 'Дышите ровно, мягко расширяя грудную клетку на вдохе.',
        en: 'Breathe steadily, gently expanding the chest on each inhale.',
      },
    },
    dosage: {
      strength: {
        sets: '2-4',
        reps: '5-8',
        restSec: '90-150',
      },
      hypertrophy: {
        sets: '2-4',
        reps: '8-12',
        restSec: '60-120',
      },
      endurance: {
        sets: '2-3',
        reps: '12-20',
        restSec: '30-60',
      },
    },
    safety: {
      contraindications: ['region-lower-back-pain'],
      precautions: ['avoid-neck-pressure', 'avoid-lumbar-overextension', 'control-knee-alignment'],
      impactLevel: 'low',
    },
    progression: {
      regressions: ['supported-bridge-pose', 'low-bridge-pose'],
      progressions: ['bridge-pose-with-clasped-hands', 'single-leg-bridge-pose'],
      alternatives: ['glute-bridge', 'cobra-pose'],
    },
    media: {
      images: [],
      videos: [],
      thumbnail: '',
    },
  },
  {
    id: 'boat-pose',
    slug: 'boat-pose',
    names: {
      ru: 'Поза лодки',
      en: 'Boat Pose',
    },
    aliases: ['navasana', 'full-boat-pose'],
    classification: {
      modality: 'yoga',
      exerciseFamily: 'core-stability',
      movementPatterns: ['core-anti-extension'],
      difficulty: 'intermediate',
      equipment: ['bodyweight'],
      bodyPosition: 'seated',
      laterality: 'bilateral',
    },
    mechanics: {
      executionMode: 'hold',
      tempo: {
        eccentric: 0,
        pauseBottom: 20,
        concentric: 0,
        pauseTop: 0,
      },
      rangeOfMotion: 'full-controlled',
      loadType: 'bodyweight',
    },
    muscles: {
      primary: ['core'],
      secondary: ['hip-flexors'],
      stabilizers: ['lower-back', 'quads', 'hips'],
      jointActions: ['spine-stabilization', 'hip-flexion', 'knee-extension'],
    },
    technique: {
      setup: {
        ru: 'Сядьте на коврик, согните колени и поставьте стопы на пол. Удлините позвоночник и слегка отклонитесь назад.',
        en: 'Sit on the mat with knees bent and feet on the floor. Lengthen your spine and lean back slightly.',
      },
      steps: {
        ru: 'Поднимите стопы от пола и найдите баланс на седалищных костях. Вытяните руки вперед, а ноги оставьте согнутыми или выпрямите, если сохраняете ровную спину. Удерживайте корпус активным.',
        en: 'Lift your feet off the floor and balance on your sit bones. Reach arms forward and keep knees bent or straighten the legs if you can maintain a long spine. Keep your torso active.',
      },
      keyCues: {
        ru: 'Грудь поднята; спина длинная; держите живот собранным.',
        en: 'Keep the chest lifted; maintain a long spine; keep the abdomen engaged.',
      },
      commonErrors: {
        ru: 'Округление поясницы; задержка дыхания; чрезмерное напряжение шеи; слишком низкое положение ног без контроля.',
        en: 'Rounding the lower back; holding the breath; excessive neck tension; lowering the legs without control.',
      },
      breathing: {
        ru: 'Дышите ровно и спокойно, удерживая стабильное положение корпуса.',
        en: 'Breathe evenly and calmly while maintaining a stable torso.',
      },
    },
    dosage: {
      strength: {
        sets: '3-5',
        reps: '4-8',
        restSec: '90-180',
      },
      hypertrophy: {
        sets: '2-4',
        reps: '6-15',
        restSec: '60-120',
      },
      endurance: {
        sets: '2-4',
        reps: '12-20',
        restSec: '30-60',
      },
    },
    safety: {
      contraindications: ['region-lower-back-pain'],
      precautions: ['maintain-long-spine', 'bend-knees-if-needed', 'avoid-neck-tension'],
      impactLevel: 'low',
    },
    progression: {
      regressions: ['bent-knee-boat-pose', 'hands-supported-boat-pose'],
      progressions: ['full-boat-pose', 'low-boat-pose'],
      alternatives: ['dead-bug', 'hollow-hold'],
    },
    media: {
      images: [],
      videos: [],
      thumbnail: '',
    },
  },
  {
    id: 'pigeon-pose',
    slug: 'pigeon-pose',
    names: {
      ru: 'Поза голубя',
      en: 'Pigeon Pose',
    },
    aliases: ['eka-pada-rajakapotasana-prep', 'half-pigeon-pose'],
    classification: {
      modality: 'yoga',
      exerciseFamily: 'hip-opener',
      movementPatterns: ['hip-opener'],
      difficulty: 'beginner',
      equipment: ['bodyweight'],
      bodyPosition: 'seated',
      laterality: 'bilateral',
    },
    mechanics: {
      executionMode: 'hold',
      tempo: {
        eccentric: 0,
        pauseBottom: 45,
        concentric: 0,
        pauseTop: 0,
      },
      rangeOfMotion: 'full-controlled',
      loadType: 'bodyweight',
    },
    muscles: {
      primary: ['glutes', 'hips'],
      secondary: ['hip-flexors'],
      stabilizers: ['core', 'hips'],
      jointActions: ['hip-external-rotation', 'hip-extension', 'hip-flexion'],
    },
    technique: {
      setup: {
        ru: 'Начните из положения на четвереньках или из собаки мордой вниз. Подведите одну ногу вперед, размещая голень перед корпусом в комфортном угле.',
        en: 'Start from all fours or downward-facing dog. Bring one leg forward, placing the shin in front of your body at a comfortable angle.',
      },
      steps: {
        ru: 'Вытяните вторую ногу назад и опустите таз к полу или на опору. Держите таз ровным настолько, насколько комфортно, и не давите в колено. Оставайтесь выше или наклонитесь вперед, если положение устойчивое.',
        en: 'Extend the other leg back and lower your hips toward the floor or onto support. Keep the hips as level as comfortable and avoid pressure in the knee. Stay upright or fold forward if the position feels stable.',
      },
      keyCues: {
        ru: 'Ищите растяжение в ягодице, не в колене; используйте опору под таз; дышите мягко.',
        en: 'Look for a stretch in the glute, not the knee; use support under the hip; breathe softly.',
      },
      commonErrors: {
        ru: 'Давление в колене; перекос таза без опоры; принудительное опускание таза; задержка дыхания.',
        en: 'Pressure in the knee; unsupported hip tilt; forcing the hips down; holding the breath.',
      },
      breathing: {
        ru: 'Дышите медленно, расслабляя таз и ягодицы на каждом выдохе.',
        en: 'Breathe slowly, relaxing the hips and glutes with each exhale.',
      },
    },
    dosage: {
      strength: {
        sets: '2-4',
        reps: '5-8',
        restSec: '90-150',
      },
      hypertrophy: {
        sets: '2-4',
        reps: '8-12',
        restSec: '60-120',
      },
      endurance: {
        sets: '2-3',
        reps: '12-20',
        restSec: '30-60',
      },
    },
    safety: {
      contraindications: ['joint-knee-pain'],
      precautions: ['avoid-knee-pressure', 'use-hip-support-if-needed', 'do-not-force-range'],
      impactLevel: 'low',
    },
    progression: {
      regressions: ['supine-figure-four-stretch', 'supported-pigeon-pose'],
      progressions: ['forward-fold-pigeon-pose', 'upright-pigeon-pose'],
      alternatives: ['figure-four-stretch', 'childs-pose'],
    },
    media: {
      images: [],
      videos: [],
      thumbnail: '',
    },
  },
  {
    id: 'seated-forward-bend',
    slug: 'seated-forward-bend',
    names: {
      ru: 'Наклон вперёд сидя',
      en: 'Seated Forward Bend',
    },
    aliases: ['paschimottanasana', 'seated-hamstring-stretch'],
    classification: {
      modality: 'yoga',
      exerciseFamily: 'forward-bend',
      movementPatterns: ['stretch'],
      difficulty: 'beginner',
      equipment: ['bodyweight'],
      bodyPosition: 'seated',
      laterality: 'bilateral',
    },
    mechanics: {
      executionMode: 'hold',
      tempo: {
        eccentric: 0,
        pauseBottom: 45,
        concentric: 0,
        pauseTop: 0,
      },
      rangeOfMotion: 'full-controlled',
      loadType: 'bodyweight',
    },
    muscles: {
      primary: ['hamstrings'],
      secondary: ['back'],
      stabilizers: ['core', 'calves'],
      jointActions: ['hip-flexion', 'spine-flexion', 'knee-extension'],
    },
    technique: {
      setup: {
        ru: 'Сядьте на пол, вытяните ноги вперед и удлините позвоночник. При необходимости слегка согните колени.',
        en: 'Sit on the floor with legs extended forward and spine long. Bend the knees slightly if needed.',
      },
      steps: {
        ru: 'Наклонитесь вперед от тазобедренных суставов и тянитесь руками к голеням, стопам или опоре. Не тяните себя силой вниз. Удерживайте мягкое растяжение и дышите спокойно.',
        en: 'Hinge forward from the hips and reach toward your shins, feet, or a support. Do not pull yourself down forcefully. Hold a gentle stretch and breathe calmly.',
      },
      keyCues: {
        ru: 'Начинайте наклон от таза; держите шею мягкой; колени можно согнуть.',
        en: 'Fold from the hips; keep the neck soft; knees may bend.',
      },
      commonErrors: {
        ru: 'Сильное округление поясницы; рывки руками; блокировка коленей; задержка дыхания.',
        en: 'Excessive lower-back rounding; pulling with the arms; locking the knees; holding the breath.',
      },
      breathing: {
        ru: 'На вдохе удлиняйте позвоночник, на выдохе мягко расслабляйтесь в наклоне.',
        en: 'Inhale to lengthen the spine, exhale to gently relax into the fold.',
      },
    },
    dosage: {
      strength: {
        sets: '2-4',
        reps: '5-8',
        restSec: '90-150',
      },
      hypertrophy: {
        sets: '2-4',
        reps: '8-12',
        restSec: '60-120',
      },
      endurance: {
        sets: '2-3',
        reps: '12-20',
        restSec: '30-60',
      },
    },
    safety: {
      contraindications: ['region-lower-back-pain'],
      precautions: [
        'bend-knees-if-needed',
        'avoid-forcing-stretch',
        'move-within-comfortable-range',
      ],
      impactLevel: 'low',
    },
    progression: {
      regressions: ['bent-knee-seated-forward-bend', 'seated-forward-bend-with-strap'],
      progressions: ['deeper-seated-forward-bend', 'seated-forward-bend-with-long-hold'],
      alternatives: ['childs-pose', 'downward-facing-dog'],
    },
    media: {
      images: [],
      videos: [],
      thumbnail: '',
    },
  },
  {
    id: 'eagle-pose',
    slug: 'eagle-pose',
    names: {
      ru: 'Поза орла',
      en: 'Eagle Pose',
    },
    aliases: ['garudasana', 'eagle-balance'],
    classification: {
      modality: 'yoga',
      exerciseFamily: 'yoga-pose',
      movementPatterns: ['balance'],
      difficulty: 'intermediate',
      equipment: ['bodyweight'],
      bodyPosition: 'standing',
      laterality: 'bilateral',
    },
    mechanics: {
      executionMode: 'hold',
      tempo: {
        eccentric: 0,
        pauseBottom: 20,
        concentric: 0,
        pauseTop: 0,
      },
      rangeOfMotion: 'full-controlled',
      loadType: 'bodyweight',
    },
    muscles: {
      primary: ['core'],
      secondary: ['shoulders', 'hips'],
      stabilizers: ['glutes', 'feet', 'hips'],
      jointActions: ['balance', 'hip-adduction', 'shoulder-protraction', 'spine-stabilization'],
    },
    technique: {
      setup: {
        ru: 'Встаньте прямо и слегка согните колени. Перенесите вес на одну ногу, сохраняя взгляд в одной точке.',
        en: 'Stand tall and bend your knees slightly. Shift your weight onto one leg while keeping your gaze fixed on one point.',
      },
      steps: {
        ru: 'Перекрестите вторую ногу поверх опорной, при необходимости касаясь носком пола для баланса. Скрестите руки перед собой и поднимите локти до комфортного уровня. Удерживайте корпус высоким, затем повторите на другую сторону.',
        en: 'Cross the other leg over the standing leg, touching the toes to the floor if needed for balance. Cross your arms in front and lift the elbows to a comfortable level. Keep the torso tall, then repeat on the other side.',
      },
      keyCues: {
        ru: 'Взгляд устойчивый; колени мягкие; плечи расслаблены вниз.',
        en: 'Keep a steady gaze; knees soft; shoulders relaxed down.',
      },
      commonErrors: {
        ru: 'Скручивание колена с болью; поднятые плечи; задержка дыхания; завал таза в сторону.',
        en: 'Twisting the knee into discomfort; shrugging the shoulders; holding the breath; hips shifting to one side.',
      },
      breathing: {
        ru: 'Дышите медленно и ровно, сохраняя баланс на каждом выдохе.',
        en: 'Breathe slowly and evenly, maintaining balance with each exhale.',
      },
    },
    dosage: {
      strength: {
        sets: '3-5',
        reps: '4-8',
        restSec: '90-180',
      },
      hypertrophy: {
        sets: '2-4',
        reps: '6-15',
        restSec: '60-120',
      },
      endurance: {
        sets: '2-4',
        reps: '12-20',
        restSec: '30-60',
      },
    },
    safety: {
      contraindications: ['joint-shoulder-pain', 'joint-knee-pain'],
      precautions: ['avoid-knee-twisting', 'use-toe-support-if-needed', 'keep-shoulders-relaxed'],
      impactLevel: 'low',
    },
    progression: {
      regressions: ['eagle-pose-with-toe-support', 'eagle-arms-only'],
      progressions: ['deeper-eagle-pose', 'eagle-pose-eyes-closed'],
      alternatives: ['tree-pose', 'mountain-pose'],
    },
    media: {
      images: [],
      videos: [],
      thumbnail: '',
    },
  },
  {
    id: 'chair-pose',
    slug: 'chair-pose',
    names: {
      ru: 'Поза стула',
      en: 'Chair Pose',
    },
    aliases: ['utkatasana', 'fierce-pose'],
    classification: {
      modality: 'yoga',
      exerciseFamily: 'yoga-pose',
      movementPatterns: ['squat'],
      difficulty: 'intermediate',
      equipment: ['bodyweight'],
      bodyPosition: 'standing',
      laterality: 'bilateral',
    },
    mechanics: {
      executionMode: 'hold',
      tempo: {
        eccentric: 0,
        pauseBottom: 30,
        concentric: 0,
        pauseTop: 0,
      },
      rangeOfMotion: 'full-controlled',
      loadType: 'bodyweight',
    },
    muscles: {
      primary: ['quads', 'glutes'],
      secondary: ['core'],
      stabilizers: ['calves', 'shoulders', 'upper-back'],
      jointActions: ['knee-flexion', 'hip-flexion', 'shoulder-flexion', 'spine-stabilization'],
    },
    technique: {
      setup: {
        ru: 'Встаньте прямо, стопы вместе или на ширине таза, вес равномерно распределен по всей стопе.',
        en: 'Stand tall with feet together or hip-width apart, weight evenly distributed through the whole foot.',
      },
      steps: {
        ru: 'Согните колени и отведите таз назад, будто садитесь на стул. Поднимите руки вверх или держите их перед грудью, сохраняя корпус длинным и устойчивым.',
        en: 'Bend your knees and send your hips back as if sitting into a chair. Raise your arms overhead or keep them at your chest while maintaining a long, steady torso.',
      },
      keyCues: {
        ru: 'Таз назад; колени по линии стоп; ребра вниз и корпус активен.',
        en: 'Hips back; knees track with feet; ribs down and torso active.',
      },
      commonErrors: {
        ru: 'Завал коленей внутрь; чрезмерный прогиб в пояснице; перенос веса на носки; поднятые плечи.',
        en: 'Knees collapsing inward; excessive lower-back arch; shifting weight onto the toes; shrugging the shoulders.',
      },
      breathing: {
        ru: 'Дышите ровно, сохраняя устойчивость и мягкое напряжение корпуса.',
        en: 'Breathe evenly while maintaining stability and gentle core tension.',
      },
    },
    dosage: {
      strength: {
        sets: '3-5',
        reps: '4-8',
        restSec: '90-180',
      },
      hypertrophy: {
        sets: '2-4',
        reps: '6-15',
        restSec: '60-120',
      },
      endurance: {
        sets: '2-4',
        reps: '12-20',
        restSec: '30-60',
      },
    },
    safety: {
      contraindications: ['joint-knee-pain'],
      precautions: [
        'control-knee-alignment',
        'avoid-lumbar-overextension',
        'keep-weight-evenly-distributed',
      ],
      impactLevel: 'low',
    },
    progression: {
      regressions: ['wall-supported-chair-pose', 'hands-at-chest-chair-pose'],
      progressions: ['deeper-chair-pose', 'chair-pose-with-twist'],
      alternatives: ['mountain-pose', 'bodyweight-squat'],
    },
    media: {
      images: [],
      videos: [],
      thumbnail: '',
    },
  },
  {
    id: 'locust-pose',
    slug: 'locust-pose',
    names: {
      ru: 'Поза саранчи',
      en: 'Locust Pose',
    },
    aliases: ['shalabhasana', 'locust'],
    classification: {
      modality: 'yoga',
      exerciseFamily: 'back-extension',
      movementPatterns: ['back-extension'],
      difficulty: 'intermediate',
      equipment: ['bodyweight'],
      bodyPosition: 'prone',
      laterality: 'bilateral',
    },
    mechanics: {
      executionMode: 'hold',
      tempo: {
        eccentric: 0,
        pauseBottom: 20,
        concentric: 0,
        pauseTop: 0,
      },
      rangeOfMotion: 'full-controlled',
      loadType: 'bodyweight',
    },
    muscles: {
      primary: ['back'],
      secondary: ['glutes', 'shoulders'],
      stabilizers: ['hamstrings', 'core', 'upper-back'],
      jointActions: ['spine-extension', 'hip-extension', 'shoulder-extension'],
    },
    technique: {
      setup: {
        ru: 'Лягте на живот, вытяните ноги назад, руки расположите вдоль тела или вперед. Шея продолжает линию позвоночника.',
        en: 'Lie on your stomach with legs extended back and arms by your sides or reaching forward. Keep your neck in line with your spine.',
      },
      steps: {
        ru: 'На вдохе мягко поднимите грудь, руки и ноги от пола. Сохраняйте ягодицы активными, но не сжимайте поясницу. Удерживайте комфортную высоту и опуститесь вниз с контролем.',
        en: 'On an inhale, gently lift your chest, arms, and legs off the floor. Keep the glutes active without compressing the lower back. Hold at a comfortable height and lower with control.',
      },
      keyCues: {
        ru: 'Тянитесь вперед макушкой и назад стопами; шея длинная; подъем умеренный.',
        en: 'Reach forward through the crown and back through the feet; keep the neck long; lift moderately.',
      },
      commonErrors: {
        ru: 'Запрокидывание головы; чрезмерный прогиб поясницы; рывок вверх; задержка дыхания.',
        en: 'Throwing the head back; excessive lower-back arch; jerking upward; holding the breath.',
      },
      breathing: {
        ru: 'Дышите ровно, сохраняя мягкое вытяжение корпуса.',
        en: 'Breathe steadily while maintaining gentle length through the body.',
      },
    },
    dosage: {
      strength: {
        sets: '3-5',
        reps: '4-8',
        restSec: '90-180',
      },
      hypertrophy: {
        sets: '2-4',
        reps: '6-15',
        restSec: '60-120',
      },
      endurance: {
        sets: '2-4',
        reps: '12-20',
        restSec: '30-60',
      },
    },
    safety: {
      contraindications: ['region-lower-back-pain'],
      precautions: ['avoid-forcing-back-extension', 'keep-neck-long', 'use-comfortable-range'],
      impactLevel: 'low',
    },
    progression: {
      regressions: ['baby-locust-pose', 'single-leg-locust-pose'],
      progressions: ['full-locust-pose', 'locust-pose-with-arm-reach'],
      alternatives: ['cobra-pose', 'sphinx-pose'],
    },
    media: {
      images: [],
      videos: [],
      thumbnail: '',
    },
  },
  {
    id: 'camel-pose',
    slug: 'camel-pose',
    names: {
      ru: 'Поза верблюда',
      en: 'Camel Pose',
    },
    aliases: ['ustrasana', 'camel'],
    classification: {
      modality: 'yoga',
      exerciseFamily: 'back-extension',
      movementPatterns: ['back-extension'],
      difficulty: 'intermediate',
      equipment: ['bodyweight'],
      bodyPosition: 'kneeling',
      laterality: 'bilateral',
    },
    mechanics: {
      executionMode: 'hold',
      tempo: {
        eccentric: 0,
        pauseBottom: 20,
        concentric: 0,
        pauseTop: 0,
      },
      rangeOfMotion: 'full-controlled',
      loadType: 'bodyweight',
    },
    muscles: {
      primary: ['back'],
      secondary: ['core'],
      stabilizers: ['glutes', 'shoulders', 'hip-flexors'],
      jointActions: ['spine-extension', 'hip-extension', 'shoulder-extension'],
    },
    technique: {
      setup: {
        ru: 'Встаньте на колени, колени и стопы на ширине таза. Положите ладони на таз или поясницу для поддержки.',
        en: 'Kneel with knees and feet hip-width apart. Place your hands on your pelvis or lower back for support.',
      },
      steps: {
        ru: 'Мягко направьте таз вперед и поднимите грудь вверх. Отклоняйтесь назад только до комфортной глубины, при необходимости оставляя руки на тазу. Если доступно, дотянитесь руками до пяток без сжатия поясницы и шеи.',
        en: 'Gently guide your hips forward and lift your chest upward. Lean back only to a comfortable depth, keeping hands on your pelvis if needed. If available, reach for the heels without compressing the lower back or neck.',
      },
      keyCues: {
        ru: 'Грудь вверх; таз мягко вперед; шея длинная и без запрокидывания.',
        en: 'Chest up; hips gently forward; neck long without throwing the head back.',
      },
      commonErrors: {
        ru: 'Сжатие поясницы; запрокидывание головы; уход таза назад; попытка достать пятки любой ценой.',
        en: 'Compressing the lower back; throwing the head back; hips drifting backward; reaching for the heels at any cost.',
      },
      breathing: {
        ru: 'Дышите спокойно, расширяя грудную клетку на вдохе и сохраняя контроль на выдохе.',
        en: 'Breathe calmly, expanding the chest on the inhale and maintaining control on the exhale.',
      },
    },
    dosage: {
      strength: {
        sets: '3-5',
        reps: '4-8',
        restSec: '90-180',
      },
      hypertrophy: {
        sets: '2-4',
        reps: '6-15',
        restSec: '60-120',
      },
      endurance: {
        sets: '2-4',
        reps: '12-20',
        restSec: '30-60',
      },
    },
    safety: {
      contraindications: ['region-lower-back-pain', 'region-neck-pain'],
      precautions: ['avoid-forcing-backbend', 'keep-neck-supported', 'engage-glutes-lightly'],
      impactLevel: 'low',
    },
    progression: {
      regressions: ['hands-on-pelvis-camel-pose', 'supported-camel-pose'],
      progressions: ['full-camel-pose', 'camel-pose-with-thigh-press'],
      alternatives: ['bridge-pose', 'cobra-pose'],
    },
    media: {
      images: [],
      videos: [],
      thumbnail: '',
    },
  },
  {
    id: 'supine-twist',
    slug: 'supine-twist',
    names: {
      ru: 'Лежачий скрут',
      en: 'Supine Twist',
    },
    aliases: ['reclined-spinal-twist', 'supta-matsyendrasana'],
    classification: {
      modality: 'yoga',
      exerciseFamily: 'spinal-twist',
      movementPatterns: ['core-rotation'],
      difficulty: 'beginner',
      equipment: ['bodyweight'],
      bodyPosition: 'supine',
      laterality: 'bilateral',
    },
    mechanics: {
      executionMode: 'hold',
      tempo: {
        eccentric: 0,
        pauseBottom: 30,
        concentric: 0,
        pauseTop: 0,
      },
      rangeOfMotion: 'full-controlled',
      loadType: 'bodyweight',
    },
    muscles: {
      primary: ['core', 'obliques'],
      secondary: ['hips', 'back'],
      stabilizers: ['shoulders'],
      jointActions: ['spine-rotation', 'hip-flexion'],
    },
    technique: {
      setup: {
        ru: 'Лягте на спину, вытяните одну ногу или согните обе. Руки разведите в стороны для опоры.',
        en: 'Lie on your back with one leg extended or both knees bent. Extend your arms out to the sides for support.',
      },
      steps: {
        ru: 'Подтяните одно колено к груди и мягко опустите его через корпус в сторону. Плечи старайтесь оставлять на полу, а голову держите в удобном положении. Удерживайте растяжение без усилия.',
        en: 'Draw one knee toward your chest and gently lower it across the body to the side. Try to keep both shoulders on the floor and your head in a comfortable position. Hold the stretch without forcing.',
      },
      keyCues: {
        ru: 'Плечи тяжелые; скручивание мягкое; двигайтесь в комфортной амплитуде.',
        en: 'Keep shoulders heavy; twist gently; stay within a comfortable range.',
      },
      commonErrors: {
        ru: 'Принудительное давление на колено; отрыв обоих плеч; резкий поворот шеи; задержка дыхания.',
        en: 'Forcing the knee down; lifting both shoulders; sharply turning the neck; holding the breath.',
      },
      breathing: {
        ru: 'Дышите медленно, расслабляясь глубже на каждом выдохе.',
        en: 'Breathe slowly, softening deeper with each exhale.',
      },
    },
    dosage: {
      strength: {
        sets: '2-4',
        reps: '5-8',
        restSec: '90-150',
      },
      hypertrophy: {
        sets: '2-4',
        reps: '8-12',
        restSec: '60-120',
      },
      endurance: {
        sets: '2-3',
        reps: '12-20',
        restSec: '30-60',
      },
    },
    safety: {
      contraindications: [],
      precautions: [
        'avoid-forcing-twist',
        'keep-shoulders-supported',
        'move-within-comfortable-range',
      ],
      impactLevel: 'low',
    },
    progression: {
      regressions: ['bent-knee-supine-twist', 'supported-supine-twist'],
      progressions: ['straight-leg-supine-twist', 'double-knee-supine-twist'],
      alternatives: ['childs-pose', 'cat-cow'],
    },
    media: {
      images: [],
      videos: [],
      thumbnail: '',
    },
  },
  {
    id: 'corpse-pose',
    slug: 'corpse-pose',
    names: {
      ru: 'Поза трупа',
      en: 'Corpse Pose',
    },
    aliases: ['savasana', 'shavasana'],
    classification: {
      modality: 'yoga',
      exerciseFamily: 'relaxation',
      movementPatterns: ['relaxation'],
      difficulty: 'beginner',
      equipment: ['bodyweight'],
      bodyPosition: 'supine',
      laterality: 'bilateral',
    },
    mechanics: {
      executionMode: 'hold',
      tempo: {
        eccentric: 0,
        pauseBottom: 300,
        concentric: 0,
        pauseTop: 0,
      },
      rangeOfMotion: 'isometric',
      loadType: 'bodyweight',
    },
    muscles: {
      primary: ['full-body'],
      secondary: [],
      stabilizers: [],
      jointActions: ['relaxation', 'breathing-control'],
    },
    technique: {
      setup: {
        ru: 'Лягте на спину, удобно расположите ноги чуть шире таза, руки положите вдоль тела ладонями вверх.',
        en: 'Lie on your back with legs comfortably wider than hip-width and arms by your sides, palms facing up.',
      },
      steps: {
        ru: 'Закройте глаза или смягчите взгляд. Позвольте телу расслабиться на полу, отпуская напряжение в лице, плечах, животе и ногах. Оставайтесь неподвижно в спокойном дыхании.',
        en: 'Close your eyes or soften your gaze. Let your body relax into the floor, releasing tension in the face, shoulders, abdomen, and legs. Remain still with calm breathing.',
      },
      keyCues: {
        ru: 'Тело тяжелое; дыхание спокойное; ничего не удерживайте силой.',
        en: 'Let the body feel heavy; keep the breath calm; do not hold tension anywhere.',
      },
      commonErrors: {
        ru: 'Напряжение в плечах; дискомфорт в пояснице без поддержки; попытка контролировать дыхание слишком сильно; беспокойные движения.',
        en: 'Shoulder tension; lower-back discomfort without support; overcontrolling the breath; restless movement.',
      },
      breathing: {
        ru: 'Дышите естественно, постепенно удлиняя выдохи без усилия.',
        en: 'Breathe naturally, gradually lengthening the exhales without effort.',
      },
    },
    dosage: {
      strength: {
        sets: '2-4',
        reps: '5-8',
        restSec: '90-150',
      },
      hypertrophy: {
        sets: '2-4',
        reps: '8-12',
        restSec: '60-120',
      },
      endurance: {
        sets: '2-3',
        reps: '12-20',
        restSec: '30-60',
      },
    },
    safety: {
      contraindications: [],
      precautions: [
        'support-knees-if-lower-back-discomfort',
        'keep-body-warm',
        'return-to-sitting-slowly',
      ],
      impactLevel: 'low',
    },
    progression: {
      regressions: ['supported-corpse-pose', 'knees-bent-corpse-pose'],
      progressions: ['longer-corpse-pose', 'guided-body-scan'],
      alternatives: ['childs-pose', 'supine-breathing'],
    },
    media: {
      images: [],
      videos: [],
      thumbnail: '',
    },
  },
  {
    id: 'sun-salutation',
    slug: 'sun-salutation',
    names: {
      ru: 'Приветствие солнцу',
      en: 'Sun Salutation',
    },
    aliases: ['surya-namaskar', 'sun-salutation-flow'],
    classification: {
      modality: 'yoga',
      exerciseFamily: 'yoga-flow',
      movementPatterns: ['full-body-dynamic'],
      difficulty: 'intermediate',
      equipment: ['bodyweight'],
      bodyPosition: 'standing',
      laterality: 'bilateral',
    },
    mechanics: {
      executionMode: 'reps',
      tempo: {
        eccentric: 2,
        pauseBottom: 0,
        concentric: 2,
        pauseTop: 0,
      },
      rangeOfMotion: 'full-controlled',
      loadType: 'bodyweight',
    },
    muscles: {
      primary: ['full-body'],
      secondary: ['shoulders', 'core', 'hamstrings'],
      stabilizers: ['glutes', 'upper-back'],
      jointActions: ['shoulder-flexion', 'hip-flexion', 'spine-extension', 'spine-stabilization'],
    },
    technique: {
      setup: {
        ru: 'Начните стоя в позе горы, стопы устойчиво на полу, дыхание спокойное.',
        en: 'Start standing in mountain pose with feet grounded and breath calm.',
      },
      steps: {
        ru: 'Плавно переходите через позы: гора, наклон вперед, планка, кобра или низкая кобра, собака мордой вниз и возврат к стойке. Двигайтесь в ритме дыхания и сохраняйте контроль в каждом переходе.',
        en: 'Flow smoothly through mountain pose, forward fold, plank, cobra or low cobra, downward-facing dog, and back to standing. Move with your breath and keep control through each transition.',
      },
      keyCues: {
        ru: 'Синхронизируйте движение с дыханием; не торопитесь; держите запястья и плечи под контролем.',
        en: 'Sync movement with breath; do not rush; keep wrists and shoulders controlled.',
      },
      commonErrors: {
        ru: 'Провисание поясницы в планке; резкие переходы; перегрузка запястий; задержка дыхания.',
        en: 'Sagging the lower back in plank; rushing transitions; overloading the wrists; holding the breath.',
      },
      breathing: {
        ru: 'Обычно вдох на раскрывающих движениях и выдох на наклонах или переходах вниз.',
        en: 'Generally inhale on opening movements and exhale on folds or downward transitions.',
      },
    },
    dosage: {
      strength: {
        sets: '3-5',
        reps: '4-8',
        restSec: '90-180',
      },
      hypertrophy: {
        sets: '2-4',
        reps: '6-15',
        restSec: '60-120',
      },
      endurance: {
        sets: '2-4',
        reps: '12-20',
        restSec: '30-60',
      },
    },
    safety: {
      contraindications: ['joint-wrist-pain'],
      precautions: ['avoid-wrist-overload', 'move-with-control', 'modify-plank-if-needed'],
      impactLevel: 'medium',
    },
    progression: {
      regressions: ['slow-sun-salutation', 'knees-down-sun-salutation'],
      progressions: ['faster-sun-salutation-flow', 'sun-salutation-with-chaturanga'],
      alternatives: ['cat-cow', 'downward-facing-dog'],
    },
    media: {
      images: [],
      videos: [],
      thumbnail: '',
    },
  },
  {
    id: 'pull-ups',
    slug: 'pull-ups',
    names: {
      ru: 'Подтягивания',
      en: 'Pull-ups',
    },
    aliases: ['overhand-pull-up', 'strict-pull-up'],
    classification: {
      modality: 'strength',
      exerciseFamily: 'pull-up',
      movementPatterns: ['vertical-pull'],
      difficulty: 'intermediate',
      equipment: ['pull-up-bar'],
      bodyPosition: 'hanging',
      laterality: 'bilateral',
    },
    mechanics: {
      executionMode: 'reps',
      tempo: {
        eccentric: 2,
        pauseBottom: 0,
        concentric: 1,
        pauseTop: 1,
      },
      rangeOfMotion: 'full-controlled',
      loadType: 'bodyweight',
    },
    muscles: {
      primary: ['back', 'biceps'],
      secondary: ['shoulders', 'core'],
      stabilizers: ['forearms', 'upper-back'],
      jointActions: ['shoulder-adduction', 'elbow-flexion', 'scapular-depression'],
    },
    technique: {
      setup: {
        ru: 'Возьмитесь за перекладину хватом сверху чуть шире плеч. Повисните с активными плечами и напряженным корпусом.',
        en: 'Grip the bar with an overhand grip slightly wider than shoulders. Hang with active shoulders and a braced core.',
      },
      steps: {
        ru: 'Начните движение с опускания лопаток, затем подтяните грудь к перекладине, пока подбородок не окажется выше нее. Задержитесь коротко и опуститесь вниз подконтрольно до полного выпрямления рук.',
        en: 'Start by drawing the shoulder blades down, then pull your chest toward the bar until your chin clears it. Pause briefly and lower with control until the arms are fully extended.',
      },
      keyCues: {
        ru: 'Ведите грудь к перекладине; плечи вниз; корпус остается собранным.',
        en: 'Lead the chest to the bar; keep shoulders down; maintain a tight body.',
      },
      commonErrors: {
        ru: 'Рывки ногами; неполная амплитуда; подтягивание плеч к ушам; резкое падение вниз.',
        en: 'Kipping with the legs; partial range of motion; shrugging shoulders toward ears; dropping down quickly.',
      },
      breathing: {
        ru: 'Выдыхайте при подтягивании вверх, вдыхайте при опускании.',
        en: 'Exhale as you pull up, inhale as you lower.',
      },
    },
    dosage: {
      strength: {
        sets: '3-5',
        reps: '4-8',
        restSec: '90-180',
      },
      hypertrophy: {
        sets: '2-4',
        reps: '6-15',
        restSec: '60-120',
      },
      endurance: {
        sets: '2-4',
        reps: '12-20',
        restSec: '30-60',
      },
    },
    safety: {
      contraindications: ['joint-shoulder-impingement', 'joint-elbow-pain'],
      precautions: [
        'avoid-kipping-if-uncontrolled',
        'control-eccentric-phase',
        'maintain-shoulder-depression',
      ],
      impactLevel: 'low',
    },
    progression: {
      regressions: ['assisted-pull-up', 'negative-pull-up'],
      progressions: ['weighted-pull-up', 'chest-to-bar-pull-up'],
      alternatives: ['chin-ups', 'australian-pull-up'],
    },
    media: {
      images: [],
      videos: [],
      thumbnail: '',
    },
  },
  {
    id: 'chin-ups',
    slug: 'chin-ups',
    names: {
      ru: 'Подтягивания обратным хватом',
      en: 'Chin-ups',
    },
    aliases: ['underhand-pull-up', 'supinated-pull-up'],
    classification: {
      modality: 'strength',
      exerciseFamily: 'pull-up',
      movementPatterns: ['vertical-pull'],
      difficulty: 'intermediate',
      equipment: ['pull-up-bar'],
      bodyPosition: 'hanging',
      laterality: 'bilateral',
    },
    mechanics: {
      executionMode: 'reps',
      tempo: {
        eccentric: 2,
        pauseBottom: 0,
        concentric: 1,
        pauseTop: 1,
      },
      rangeOfMotion: 'full-controlled',
      loadType: 'bodyweight',
    },
    muscles: {
      primary: ['back', 'biceps'],
      secondary: ['shoulders', 'core'],
      stabilizers: ['forearms', 'upper-back'],
      jointActions: ['shoulder-extension', 'elbow-flexion', 'scapular-depression'],
    },
    technique: {
      setup: {
        ru: 'Возьмитесь за перекладину обратным хватом, ладони направлены к себе. Повисните с активными плечами и напряженным корпусом.',
        en: 'Grip the bar with an underhand grip, palms facing you. Hang with active shoulders and a braced core.',
      },
      steps: {
        ru: 'Подтянитесь вверх, ведя грудь к перекладине и удерживая локти под контролем. Подбородок проходит выше перекладины, затем медленно опуститесь вниз до полного разгибания рук.',
        en: 'Pull yourself up by bringing your chest toward the bar and keeping the elbows controlled. Let the chin pass the bar, then lower slowly until the arms are fully extended.',
      },
      keyCues: {
        ru: 'Локти тянутся вниз; грудь к перекладине; не раскачивайтесь.',
        en: 'Drive elbows down; chest to the bar; avoid swinging.',
      },
      commonErrors: {
        ru: 'Рывок корпусом; неполное опускание; перегрузка локтей; поднятие плеч к ушам.',
        en: 'Jerking the body; not lowering fully; overloading the elbows; shrugging shoulders toward ears.',
      },
      breathing: {
        ru: 'Выдыхайте при подъеме, вдыхайте при опускании.',
        en: 'Exhale as you pull up, inhale as you lower.',
      },
    },
    dosage: {
      strength: {
        sets: '3-5',
        reps: '4-8',
        restSec: '90-180',
      },
      hypertrophy: {
        sets: '2-4',
        reps: '6-15',
        restSec: '60-120',
      },
      endurance: {
        sets: '2-4',
        reps: '12-20',
        restSec: '30-60',
      },
    },
    safety: {
      contraindications: ['joint-shoulder-impingement', 'joint-elbow-pain'],
      precautions: ['control-elbow-stress', 'avoid-swinging', 'lower-with-control'],
      impactLevel: 'low',
    },
    progression: {
      regressions: ['assisted-chin-up', 'negative-chin-up'],
      progressions: ['weighted-chin-up', 'slow-tempo-chin-up'],
      alternatives: ['pull-ups', 'australian-pull-up'],
    },
    media: {
      images: [],
      videos: [],
      thumbnail: '',
    },
  },
  {
    id: 'negative-pull-up',
    slug: 'negative-pull-up',
    names: {
      ru: 'Негативные подтягивания',
      en: 'Negative Pull-ups',
    },
    aliases: ['eccentric-pull-up', 'negative-pullup'],
    classification: {
      modality: 'strength',
      exerciseFamily: 'pull-up',
      movementPatterns: ['vertical-pull'],
      difficulty: 'beginner',
      equipment: ['pull-up-bar'],
      bodyPosition: 'hanging',
      laterality: 'bilateral',
    },
    mechanics: {
      executionMode: 'reps',
      tempo: {
        eccentric: 4,
        pauseBottom: 1,
        concentric: 0,
        pauseTop: 0,
      },
      rangeOfMotion: 'full-controlled',
      loadType: 'bodyweight',
    },
    muscles: {
      primary: ['back', 'biceps'],
      secondary: ['shoulders', 'core'],
      stabilizers: ['forearms', 'upper-back'],
      jointActions: ['shoulder-adduction', 'elbow-flexion', 'scapular-depression'],
    },
    technique: {
      setup: {
        ru: 'Встаньте на опору или подпрыгните так, чтобы начать в верхней точке подтягивания с подбородком выше перекладины.',
        en: 'Use a step or a small jump to start at the top of a pull-up with your chin above the bar.',
      },
      steps: {
        ru: 'Удерживая корпус напряженным, медленно опускайтесь вниз 3–5 секунд. Контролируйте плечи и локти до полного разгибания рук, затем снова вернитесь в верхнюю точку с помощью опоры.',
        en: 'Keeping your body braced, lower slowly for 3–5 seconds. Control the shoulders and elbows until the arms are fully extended, then return to the top using support.',
      },
      keyCues: {
        ru: 'Опускайтесь медленно; плечи активны; не падайте в нижнюю точку.',
        en: 'Lower slowly; keep shoulders active; do not drop into the bottom.',
      },
      commonErrors: {
        ru: 'Слишком быстрое опускание; расслабленные плечи; прыжок без контроля; боль в локтях из-за перегрузки.',
        en: 'Lowering too quickly; relaxed shoulders; uncontrolled jumping; elbow discomfort from overload.',
      },
      breathing: {
        ru: 'Дышите ровно во время опускания, не задерживайте дыхание.',
        en: 'Breathe steadily during the lowering phase and avoid holding your breath.',
      },
    },
    dosage: {
      strength: {
        sets: '2-4',
        reps: '5-8',
        restSec: '90-150',
      },
      hypertrophy: {
        sets: '2-4',
        reps: '8-12',
        restSec: '60-120',
      },
      endurance: {
        sets: '2-3',
        reps: '12-20',
        restSec: '30-60',
      },
    },
    safety: {
      contraindications: ['joint-shoulder-impingement'],
      precautions: ['use-step-for-entry', 'avoid-dropping-from-bar', 'control-shoulder-position'],
      impactLevel: 'low',
    },
    progression: {
      regressions: ['assisted-pull-up', 'scapular-pull-up'],
      progressions: ['pull-ups', 'weighted-negative-pull-up'],
      alternatives: ['australian-pull-up', 'banded-seated-row'],
    },
    media: {
      images: [],
      videos: [],
      thumbnail: '',
    },
  },
  {
    id: 'australian-pull-up',
    slug: 'australian-pull-up',
    names: {
      ru: 'Австралийские подтягивания',
      en: 'Australian Pull-ups',
    },
    aliases: ['inverted-row', 'bodyweight-row'],
    classification: {
      modality: 'strength',
      exerciseFamily: 'pull-up',
      movementPatterns: ['horizontal-pull'],
      difficulty: 'beginner',
      equipment: ['bar'],
      bodyPosition: 'supine',
      laterality: 'bilateral',
    },
    mechanics: {
      executionMode: 'reps',
      tempo: {
        eccentric: 2,
        pauseBottom: 0,
        concentric: 1,
        pauseTop: 1,
      },
      rangeOfMotion: 'full-controlled',
      loadType: 'bodyweight',
    },
    muscles: {
      primary: ['back', 'biceps'],
      secondary: ['shoulders', 'core'],
      stabilizers: ['glutes', 'upper-back', 'forearms'],
      jointActions: ['shoulder-extension', 'elbow-flexion', 'scapular-retraction'],
    },
    technique: {
      setup: {
        ru: 'Лягте под низкую перекладину и возьмитесь за нее хватом чуть шире плеч. Ноги вытянуты или согнуты, корпус в прямой линии.',
        en: 'Lie under a low bar and grip it slightly wider than shoulder-width. Keep legs extended or bent and body in a straight line.',
      },
      steps: {
        ru: 'Подтяните грудь к перекладине, сводя лопатки и удерживая корпус жестким. Задержитесь на секунду, затем медленно опуститесь до выпрямления рук.',
        en: 'Pull your chest toward the bar by squeezing your shoulder blades while keeping your body rigid. Pause for one second, then lower slowly until the arms are straight.',
      },
      keyCues: {
        ru: 'Грудь к перекладине; тело как доска; лопатки сводятся назад.',
        en: 'Chest to the bar; body like a plank; shoulder blades squeeze back.',
      },
      commonErrors: {
        ru: 'Провисание таза; тяга подбородком вместо грудью; рывки корпусом; неполное опускание.',
        en: 'Sagging hips; reaching with the chin instead of the chest; jerking the torso; not lowering fully.',
      },
      breathing: {
        ru: 'Выдыхайте при подтягивании, вдыхайте при опускании.',
        en: 'Exhale as you pull, inhale as you lower.',
      },
    },
    dosage: {
      strength: {
        sets: '2-4',
        reps: '5-8',
        restSec: '90-150',
      },
      hypertrophy: {
        sets: '2-4',
        reps: '8-12',
        restSec: '60-120',
      },
      endurance: {
        sets: '2-3',
        reps: '12-20',
        restSec: '30-60',
      },
    },
    safety: {
      contraindications: [],
      precautions: ['use-stable-bar', 'maintain-straight-body-line', 'control-eccentric-phase'],
      impactLevel: 'low',
    },
    progression: {
      regressions: ['bent-knee-australian-pull-up', 'higher-bar-australian-pull-up'],
      progressions: ['feet-elevated-australian-pull-up', 'weighted-australian-pull-up'],
      alternatives: ['banded-seated-row', 'single-arm-dumbbell-row'],
    },
    media: {
      images: [],
      videos: [],
      thumbnail: '',
    },
  },
  {
    id: 'lat-pulldown',
    slug: 'lat-pulldown',
    names: {
      ru: 'Тяга верхнего блока',
      en: 'Lat Pulldown',
    },
    aliases: ['cable-lat-pulldown', 'wide-grip-lat-pulldown'],
    classification: {
      modality: 'strength',
      exerciseFamily: 'pulldown',
      movementPatterns: ['vertical-pull'],
      difficulty: 'beginner',
      equipment: ['cable-machine'],
      bodyPosition: 'seated',
      laterality: 'bilateral',
    },
    mechanics: {
      executionMode: 'reps',
      tempo: {
        eccentric: 2,
        pauseBottom: 0,
        concentric: 1,
        pauseTop: 1,
      },
      rangeOfMotion: 'full-controlled',
      loadType: 'external-load',
    },
    muscles: {
      primary: ['back'],
      secondary: ['biceps', 'shoulders'],
      stabilizers: ['core', 'upper-back', 'forearms'],
      jointActions: ['shoulder-adduction', 'elbow-flexion', 'scapular-depression'],
    },
    technique: {
      setup: {
        ru: 'Сядьте в тренажер, зафиксируйте бедра под упорами и возьмитесь за рукоять хватом чуть шире плеч.',
        en: 'Sit at the machine, secure your thighs under the pads, and grip the handle slightly wider than shoulder-width.',
      },
      steps: {
        ru: 'Слегка отклонитесь назад и опустите лопатки. Потяните рукоять к верхней части груди, ведя локти вниз. Подконтрольно верните рукоять вверх, сохраняя напряжение в спине.',
        en: 'Lean back slightly and draw your shoulder blades down. Pull the handle to your upper chest, driving elbows downward. Return the handle upward with control while keeping tension in your back.',
      },
      keyCues: {
        ru: 'Локти вниз; грудь к рукояти; плечи не поднимайте к ушам.',
        en: 'Elbows down; chest toward the handle; keep shoulders away from ears.',
      },
      commonErrors: {
        ru: 'Тяга за шею; раскачивание корпусом; слишком тяжелый вес; неполное контролируемое возвращение.',
        en: 'Pulling behind the neck; swinging the torso; using too much weight; uncontrolled return.',
      },
      breathing: {
        ru: 'Выдыхайте при тяге вниз, вдыхайте при возвращении рукояти вверх.',
        en: 'Exhale as you pull down, inhale as the handle returns upward.',
      },
    },
    dosage: {
      strength: {
        sets: '2-4',
        reps: '5-8',
        restSec: '90-150',
      },
      hypertrophy: {
        sets: '2-4',
        reps: '8-12',
        restSec: '60-120',
      },
      endurance: {
        sets: '2-3',
        reps: '12-20',
        restSec: '30-60',
      },
    },
    safety: {
      contraindications: ['joint-shoulder-impingement'],
      precautions: [
        'avoid-behind-neck-pulldown',
        'control-shoulder-position',
        'use-manageable-load',
      ],
      impactLevel: 'low',
    },
    progression: {
      regressions: ['lighter-lat-pulldown', 'banded-lat-pulldown'],
      progressions: ['heavier-lat-pulldown', 'pull-ups'],
      alternatives: ['chin-ups', 'banded-seated-row'],
    },
    media: {
      images: [],
      videos: [],
      thumbnail: '',
    },
  },
  {
    id: 'seated-cable-row',
    slug: 'seated-cable-row',
    names: {
      ru: 'Тяга горизонтального блока',
      en: 'Seated Cable Row',
    },
    aliases: ['cable-seated-row', 'low-cable-row'],
    classification: {
      modality: 'strength',
      exerciseFamily: 'row',
      movementPatterns: ['horizontal-pull'],
      difficulty: 'beginner',
      equipment: ['cable-machine'],
      bodyPosition: 'seated',
      laterality: 'bilateral',
    },
    mechanics: {
      executionMode: 'reps',
      tempo: {
        eccentric: 2,
        pauseBottom: 0,
        concentric: 1,
        pauseTop: 1,
      },
      rangeOfMotion: 'full-controlled',
      loadType: 'external-load',
    },
    muscles: {
      primary: ['back'],
      secondary: ['biceps', 'shoulders'],
      stabilizers: ['core', 'upper-back', 'forearms'],
      jointActions: ['shoulder-extension', 'elbow-flexion', 'scapular-retraction'],
    },
    technique: {
      setup: {
        ru: 'Сядьте в тренажер, поставьте стопы на платформу и возьмитесь за рукоять. Спина нейтральная, корпус высокий.',
        en: 'Sit at the machine, place your feet on the platform, and hold the handle. Keep your spine neutral and torso tall.',
      },
      steps: {
        ru: 'Потяните рукоять к животу или нижним ребрам, сводя лопатки. Задержитесь на секунду, затем медленно выпрямите руки, не округляя спину.',
        en: 'Pull the handle toward your abdomen or lower ribs while squeezing your shoulder blades. Pause for a second, then slowly extend your arms without rounding your back.',
      },
      keyCues: {
        ru: 'Грудь открыта; локти назад; спина остается ровной.',
        en: 'Chest open; elbows drive back; keep your back straight.',
      },
      commonErrors: {
        ru: 'Тяга корпусом назад; округление спины; подъем плеч к ушам; резкое возвращение веса.',
        en: 'Leaning back to pull; rounding the back; shrugging the shoulders; letting the weight return too quickly.',
      },
      breathing: {
        ru: 'Выдыхайте при тяге к себе, вдыхайте при возвращении.',
        en: 'Exhale as you row toward your body, inhale as you return.',
      },
    },
    dosage: {
      strength: {
        sets: '2-4',
        reps: '5-8',
        restSec: '90-150',
      },
      hypertrophy: {
        sets: '2-4',
        reps: '8-12',
        restSec: '60-120',
      },
      endurance: {
        sets: '2-3',
        reps: '12-20',
        restSec: '30-60',
      },
    },
    safety: {
      contraindications: ['region-lower-back-pain'],
      precautions: ['maintain-neutral-spine', 'avoid-using-momentum', 'control-cable-return'],
      impactLevel: 'low',
    },
    progression: {
      regressions: ['lighter-seated-cable-row', 'banded-seated-row'],
      progressions: ['heavier-seated-cable-row', 'single-arm-seated-cable-row'],
      alternatives: ['single-arm-dumbbell-row', 'australian-pull-up'],
    },
    media: {
      images: [],
      videos: [],
      thumbnail: '',
    },
  },
  {
    id: 'bent-over-barbell-row',
    slug: 'bent-over-barbell-row',
    names: {
      ru: 'Тяга штанги в наклоне',
      en: 'Bent-over Barbell Row',
    },
    aliases: ['barbell-row', 'bent-over-row'],
    classification: {
      modality: 'strength',
      exerciseFamily: 'row',
      movementPatterns: ['horizontal-pull'],
      difficulty: 'intermediate',
      equipment: ['barbell'],
      bodyPosition: 'standing',
      laterality: 'bilateral',
    },
    mechanics: {
      executionMode: 'reps',
      tempo: {
        eccentric: 2,
        pauseBottom: 0,
        concentric: 1,
        pauseTop: 1,
      },
      rangeOfMotion: 'full-controlled',
      loadType: 'external-load',
    },
    muscles: {
      primary: ['back'],
      secondary: ['biceps', 'shoulders', 'core'],
      stabilizers: ['lower-back', 'glutes', 'hamstrings', 'upper-back'],
      jointActions: [
        'shoulder-extension',
        'elbow-flexion',
        'scapular-retraction',
        'spine-stabilization',
      ],
    },
    technique: {
      setup: {
        ru: 'Возьмите штангу хватом примерно на ширине плеч. Слегка согните колени и наклонитесь через таз, сохраняя нейтральную спину.',
        en: 'Grip the barbell about shoulder-width apart. Slightly bend your knees and hinge at the hips while keeping a neutral spine.',
      },
      steps: {
        ru: 'Удерживая корпус стабильным, потяните штангу к нижней части живота. Сведите лопатки в верхней точке, затем подконтрольно опустите штангу до выпрямления рук.',
        en: 'Keeping your torso stable, pull the bar toward your lower abdomen. Squeeze your shoulder blades at the top, then lower the bar with control until arms are straight.',
      },
      keyCues: {
        ru: 'Спина нейтральная; локти назад; штанга движется близко к телу.',
        en: 'Neutral spine; elbows drive back; keep the bar close to the body.',
      },
      commonErrors: {
        ru: 'Округление спины; рывок корпусом; слишком вертикальное положение корпуса; подъем плеч к ушам.',
        en: 'Rounding the back; jerking with the torso; standing too upright; shrugging shoulders toward ears.',
      },
      breathing: {
        ru: 'Выдыхайте при тяге вверх, вдыхайте при опускании.',
        en: 'Exhale as you row up, inhale as you lower.',
      },
    },
    dosage: {
      strength: {
        sets: '3-5',
        reps: '4-8',
        restSec: '90-180',
      },
      hypertrophy: {
        sets: '2-4',
        reps: '6-15',
        restSec: '60-120',
      },
      endurance: {
        sets: '2-4',
        reps: '12-20',
        restSec: '30-60',
      },
    },
    safety: {
      contraindications: ['region-lower-back-pain'],
      precautions: ['maintain-neutral-spine', 'avoid-jerking-weight', 'use-manageable-load'],
      impactLevel: 'medium',
    },
    progression: {
      regressions: ['chest-supported-row', 'lighter-bent-over-barbell-row'],
      progressions: ['heavier-bent-over-barbell-row', 'paused-bent-over-barbell-row'],
      alternatives: ['seated-cable-row', 't-bar-row'],
    },
    media: {
      images: [],
      videos: [],
      thumbnail: '',
    },
  },
  {
    id: 't-bar-row',
    slug: 't-bar-row',
    names: {
      ru: 'Тяга T-грифа',
      en: 'T-bar Row',
    },
    aliases: ['tbar-row', 'landmine-row'],
    classification: {
      modality: 'strength',
      exerciseFamily: 'row',
      movementPatterns: ['horizontal-pull'],
      difficulty: 'intermediate',
      equipment: ['t-bar'],
      bodyPosition: 'standing',
      laterality: 'bilateral',
    },
    mechanics: {
      executionMode: 'reps',
      tempo: {
        eccentric: 2,
        pauseBottom: 0,
        concentric: 1,
        pauseTop: 1,
      },
      rangeOfMotion: 'full-controlled',
      loadType: 'external-load',
    },
    muscles: {
      primary: ['back'],
      secondary: ['biceps', 'shoulders'],
      stabilizers: ['core', 'lower-back', 'glutes', 'upper-back'],
      jointActions: [
        'shoulder-extension',
        'elbow-flexion',
        'scapular-retraction',
        'spine-stabilization',
      ],
    },
    technique: {
      setup: {
        ru: 'Встаньте над T-грифом или у рукояти, слегка согните колени и наклонитесь через таз. Возьмитесь за рукоять, сохраняя спину нейтральной.',
        en: 'Stand over the T-bar or at the handle, slightly bend your knees, and hinge at the hips. Grip the handle while keeping your spine neutral.',
      },
      steps: {
        ru: 'Потяните рукоять к нижней части груди или верхней части живота, сводя лопатки. Задержитесь на секунду и медленно опустите вес вниз без округления спины.',
        en: 'Pull the handle toward your lower chest or upper abdomen while squeezing your shoulder blades. Pause for a second and lower the weight slowly without rounding your back.',
      },
      keyCues: {
        ru: 'Корпус стабилен; локти назад; шея продолжает линию позвоночника.',
        en: 'Torso stable; elbows drive back; neck stays in line with the spine.',
      },
      commonErrors: {
        ru: 'Рывки корпусом; округление поясницы; слишком тяжелый вес; неполная амплитуда.',
        en: 'Jerking with the torso; rounding the lower back; using too much weight; incomplete range of motion.',
      },
      breathing: {
        ru: 'Выдыхайте при тяге, вдыхайте при опускании веса.',
        en: 'Exhale as you row, inhale as you lower the weight.',
      },
    },
    dosage: {
      strength: {
        sets: '3-5',
        reps: '4-8',
        restSec: '90-180',
      },
      hypertrophy: {
        sets: '2-4',
        reps: '6-15',
        restSec: '60-120',
      },
      endurance: {
        sets: '2-4',
        reps: '12-20',
        restSec: '30-60',
      },
    },
    safety: {
      contraindications: ['region-lower-back-pain'],
      precautions: ['maintain-neutral-spine', 'avoid-excessive-load', 'control-eccentric-phase'],
      impactLevel: 'medium',
    },
    progression: {
      regressions: ['chest-supported-t-bar-row', 'lighter-t-bar-row'],
      progressions: ['heavier-t-bar-row', 'paused-t-bar-row'],
      alternatives: ['bent-over-barbell-row', 'seated-cable-row'],
    },
    media: {
      images: [],
      videos: [],
      thumbnail: '',
    },
  },
  {
    id: 'one-arm-dumbbell-row',
    slug: 'one-arm-dumbbell-row',
    names: {
      ru: 'Тяга гантелей к поясу в наклоне',
      en: 'One-Arm Dumbbell Row',
    },
    aliases: ['single-arm-dumbbell-row', 'one-arm-db-row'],
    classification: {
      modality: 'strength',
      exerciseFamily: 'row',
      movementPatterns: ['horizontal-pull'],
      difficulty: 'beginner',
      equipment: ['dumbbell', 'bench'],
      bodyPosition: 'standing',
      laterality: 'unilateral',
    },
    mechanics: {
      executionMode: 'reps',
      tempo: {
        eccentric: 2,
        pauseBottom: 0,
        concentric: 1,
        pauseTop: 1,
      },
      rangeOfMotion: 'full-controlled',
      loadType: 'external-load',
    },
    muscles: {
      primary: ['back'],
      secondary: ['biceps', 'shoulders', 'core'],
      stabilizers: ['lower-back', 'upper-back', 'forearms'],
      jointActions: [
        'shoulder-extension',
        'elbow-flexion',
        'scapular-retraction',
        'spine-stabilization',
      ],
    },
    technique: {
      setup: {
        ru: 'Поставьте одно колено и одноименную руку на скамью, вторую стопу на пол. Возьмите гантель свободной рукой, спина нейтральная.',
        en: 'Place one knee and the same-side hand on a bench, with the other foot on the floor. Hold a dumbbell in the free hand and keep your spine neutral.',
      },
      steps: {
        ru: 'Потяните гантель к поясу или бедру, ведя локоть назад. Сведите лопатку в верхней точке, затем медленно опустите гантель вниз без разворота корпуса.',
        en: 'Pull the dumbbell toward your waist or hip, driving the elbow back. Squeeze the shoulder blade at the top, then lower the dumbbell slowly without rotating your torso.',
      },
      keyCues: {
        ru: 'Локоть к бедру; корпус неподвижен; плечо не поднимайте к уху.',
        en: 'Elbow toward the hip; torso stays still; avoid shrugging the shoulder.',
      },
      commonErrors: {
        ru: 'Рывок корпусом; разворот таза и плеч; округление спины; слишком короткая амплитуда.',
        en: 'Jerking with the torso; rotating hips and shoulders; rounding the back; cutting the range short.',
      },
      breathing: {
        ru: 'Выдыхайте при тяге вверх, вдыхайте при опускании.',
        en: 'Exhale as you row up, inhale as you lower.',
      },
    },
    dosage: {
      strength: {
        sets: '2-4',
        reps: '5-8',
        restSec: '90-150',
      },
      hypertrophy: {
        sets: '2-4',
        reps: '8-12',
        restSec: '60-120',
      },
      endurance: {
        sets: '2-3',
        reps: '12-20',
        restSec: '30-60',
      },
    },
    safety: {
      contraindications: ['region-lower-back-pain'],
      precautions: ['maintain-neutral-spine', 'avoid-torso-rotation', 'use-manageable-load'],
      impactLevel: 'low',
    },
    progression: {
      regressions: ['chest-supported-dumbbell-row', 'lighter-one-arm-dumbbell-row'],
      progressions: ['heavier-one-arm-dumbbell-row', 'unsupported-one-arm-dumbbell-row'],
      alternatives: ['single-arm-kettlebell-row', 'seated-cable-row'],
    },
    media: {
      images: [],
      videos: [],
      thumbnail: '',
    },
  },
  {
    id: 'dumbbell-pullover',
    slug: 'dumbbell-pullover',
    names: {
      ru: 'Пуловер с гантелью',
      en: 'Dumbbell Pullover',
    },
    aliases: ['db-pullover', 'lying-dumbbell-pullover'],
    classification: {
      modality: 'strength',
      exerciseFamily: 'pullover',
      movementPatterns: ['horizontal-pull'],
      difficulty: 'intermediate',
      equipment: ['dumbbell', 'bench'],
      bodyPosition: 'supine',
      laterality: 'bilateral',
    },
    mechanics: {
      executionMode: 'reps',
      tempo: {
        eccentric: 3,
        pauseBottom: 1,
        concentric: 1,
        pauseTop: 0,
      },
      rangeOfMotion: 'full-controlled',
      loadType: 'external-load',
    },
    muscles: {
      primary: ['back'],
      secondary: ['chest', 'shoulders', 'triceps'],
      stabilizers: ['core', 'upper-back', 'forearms'],
      jointActions: ['shoulder-extension', 'shoulder-flexion', 'scapular-stabilization'],
    },
    technique: {
      setup: {
        ru: 'Лягте на скамью, удерживая гантель обеими руками над грудью. Стопы устойчиво на полу, ребра опущены, корпус напряжен.',
        en: 'Lie on a bench holding one dumbbell with both hands over your chest. Keep feet planted, ribs down, and torso braced.',
      },
      steps: {
        ru: 'Слегка согните локти и медленно опустите гантель за голову до комфортного растяжения. Сохраняя контроль плеч, верните гантель по дуге обратно над грудью.',
        en: 'Keep a slight bend in the elbows and slowly lower the dumbbell behind your head to a comfortable stretch. Maintaining shoulder control, pull the dumbbell back in an arc over your chest.',
      },
      keyCues: {
        ru: 'Ребра вниз; локти слегка согнуты; движение медленное и по дуге.',
        en: 'Ribs down; elbows slightly bent; move slowly in an arc.',
      },
      commonErrors: {
        ru: 'Слишком глубокое опускание; прогиб в пояснице; сгибание и разгибание локтей вместо движения плеч; слишком тяжелая гантель.',
        en: 'Lowering too deep; arching the lower back; bending and extending the elbows instead of moving from the shoulders; using too much weight.',
      },
      breathing: {
        ru: 'Вдыхайте при опускании гантели, выдыхайте при возвращении вверх.',
        en: 'Inhale as you lower the dumbbell, exhale as you bring it back up.',
      },
    },
    dosage: {
      strength: {
        sets: '3-5',
        reps: '4-8',
        restSec: '90-180',
      },
      hypertrophy: {
        sets: '2-4',
        reps: '6-15',
        restSec: '60-120',
      },
      endurance: {
        sets: '2-4',
        reps: '12-20',
        restSec: '30-60',
      },
    },
    safety: {
      contraindications: ['joint-shoulder-impingement'],
      precautions: ['avoid-excessive-shoulder-range', 'keep-ribs-down', 'use-manageable-load'],
      impactLevel: 'low',
    },
    progression: {
      regressions: ['lighter-dumbbell-pullover', 'floor-dumbbell-pullover'],
      progressions: ['heavier-dumbbell-pullover', 'slow-tempo-dumbbell-pullover'],
      alternatives: ['lat-pulldown', 'straight-arm-pulldown'],
    },
    media: {
      images: [],
      videos: [],
      thumbnail: '',
    },
  },
  {
    id: 'elevated-push-up',
    slug: 'elevated-push-up',
    names: {
      ru: 'Отжимания с ногами на возвышении',
      en: 'Elevated Push-ups',
    },
    aliases: ['decline-push-up', 'feet-elevated-push-up'],
    classification: {
      modality: 'strength',
      exerciseFamily: 'push-up',
      movementPatterns: ['horizontal-push'],
      difficulty: 'intermediate',
      equipment: ['bodyweight'],
      bodyPosition: 'prone',
      laterality: 'bilateral',
    },
    mechanics: {
      executionMode: 'reps',
      tempo: {
        eccentric: 2,
        pauseBottom: 1,
        concentric: 1,
        pauseTop: 0,
      },
      rangeOfMotion: 'full-controlled',
      loadType: 'bodyweight',
    },
    muscles: {
      primary: ['chest', 'triceps'],
      secondary: ['shoulders', 'core'],
      stabilizers: ['glutes', 'upper-back'],
      jointActions: ['shoulder-horizontal-adduction', 'elbow-extension', 'scapular-stabilization'],
    },
    technique: {
      setup: {
        ru: 'Поставьте стопы на устойчивое возвышение, ладони расположите под плечами или чуть шире. Корпус держите в прямой линии.',
        en: 'Place your feet on a stable elevation and set your hands under or slightly wider than your shoulders. Keep your body in a straight line.',
      },
      steps: {
        ru: 'Напрягите пресс и ягодицы. Опустите грудь к полу, удерживая локти примерно под углом 45 градусов к корпусу. Сделайте короткую паузу и выжмите себя вверх.',
        en: 'Brace your abs and glutes. Lower your chest toward the floor with elbows about 45 degrees from your torso. Pause briefly and press back up.',
      },
      keyCues: {
        ru: 'Корпус как доска; локти под контролем; не проваливайтесь в пояснице.',
        en: 'Body like a plank; control the elbows; do not sag through the lower back.',
      },
      commonErrors: {
        ru: 'Провисание таза; слишком высокое возвышение; разведение локтей в стороны; неполная амплитуда.',
        en: 'Sagging hips; using an elevation that is too high; flaring elbows; incomplete range of motion.',
      },
      breathing: {
        ru: 'Вдох при опускании, выдох при подъеме.',
        en: 'Inhale as you lower, exhale as you press up.',
      },
    },
    dosage: {
      strength: {
        sets: '3-5',
        reps: '4-8',
        restSec: '90-180',
      },
      hypertrophy: {
        sets: '2-4',
        reps: '6-15',
        restSec: '60-120',
      },
      endurance: {
        sets: '2-4',
        reps: '12-20',
        restSec: '30-60',
      },
    },
    safety: {
      contraindications: ['joint-wrist-pain', 'joint-shoulder-impingement'],
      precautions: ['use-stable-elevation', 'control-shoulder-position', 'maintain-neutral-spine'],
      impactLevel: 'low',
    },
    progression: {
      regressions: ['push-up', 'incline-push-up'],
      progressions: ['higher-feet-elevated-push-up', 'weighted-elevated-push-up'],
      alternatives: ['wide-push-up', 'bench-press'],
    },
    media: {
      images: [],
      videos: [],
      thumbnail: '',
    },
  },
  {
    id: 'dips',
    slug: 'dips',
    names: {
      ru: 'Отжимания на брусьях',
      en: 'Parallel Bar Dips',
    },
    aliases: ['parallel-bar-dip', 'bodyweight-dips'],
    classification: {
      modality: 'strength',
      exerciseFamily: 'dip',
      movementPatterns: ['vertical-push'],
      difficulty: 'intermediate',
      equipment: ['dip-bars'],
      bodyPosition: 'hanging',
      laterality: 'bilateral',
    },
    mechanics: {
      executionMode: 'reps',
      tempo: {
        eccentric: 3,
        pauseBottom: 1,
        concentric: 1,
        pauseTop: 0,
      },
      rangeOfMotion: 'full-controlled',
      loadType: 'bodyweight',
    },
    muscles: {
      primary: ['chest', 'triceps'],
      secondary: ['shoulders'],
      stabilizers: ['core', 'upper-back', 'forearms'],
      jointActions: ['elbow-extension', 'shoulder-extension', 'scapular-depression'],
    },
    technique: {
      setup: {
        ru: 'Возьмитесь за брусья и выйдите в верхнее положение на прямых руках. Плечи опущены, корпус слегка наклонен вперед.',
        en: 'Grip the parallel bars and support yourself at the top with arms straight. Keep shoulders down and torso slightly leaned forward.',
      },
      steps: {
        ru: 'Медленно опуститесь до комфортной глубины, сгибая локти и сохраняя плечи стабильными. После короткой паузы выжмите себя вверх до полного контроля в верхней точке.',
        en: 'Lower slowly to a comfortable depth by bending the elbows while keeping shoulders stable. After a brief pause, press yourself back up to a controlled top position.',
      },
      keyCues: {
        ru: 'Плечи вниз; локти под контролем; глубина только комфортная.',
        en: 'Shoulders down; elbows controlled; use only a comfortable depth.',
      },
      commonErrors: {
        ru: 'Слишком глубокое опускание; подъем плеч к ушам; раскачивание ногами; резкая нижняя точка.',
        en: 'Lowering too deep; shrugging shoulders toward ears; swinging the legs; dropping into the bottom.',
      },
      breathing: {
        ru: 'Вдох при опускании, выдох при жиме вверх.',
        en: 'Inhale as you lower, exhale as you press up.',
      },
    },
    dosage: {
      strength: {
        sets: '3-5',
        reps: '4-8',
        restSec: '90-180',
      },
      hypertrophy: {
        sets: '2-4',
        reps: '6-15',
        restSec: '60-120',
      },
      endurance: {
        sets: '2-4',
        reps: '12-20',
        restSec: '30-60',
      },
    },
    safety: {
      contraindications: ['joint-shoulder-impingement', 'joint-elbow-pain'],
      precautions: ['avoid-excessive-depth', 'control-shoulder-position', 'avoid-swinging'],
      impactLevel: 'low',
    },
    progression: {
      regressions: ['assisted-dips', 'bench-dips'],
      progressions: ['weighted-dips', 'tempo-dips'],
      alternatives: ['tricep-dips', 'diamond-push-up'],
    },
    media: {
      images: [],
      videos: [],
      thumbnail: '',
    },
  },
  {
    id: 'bench-press',
    slug: 'bench-press',
    names: {
      ru: 'Жим штанги лёжа',
      en: 'Bench Press',
    },
    aliases: ['barbell-bench-press', 'flat-bench-press'],
    classification: {
      modality: 'strength',
      exerciseFamily: 'press',
      movementPatterns: ['horizontal-push'],
      difficulty: 'beginner',
      equipment: ['barbell', 'bench'],
      bodyPosition: 'supine',
      laterality: 'bilateral',
    },
    mechanics: {
      executionMode: 'reps',
      tempo: {
        eccentric: 2,
        pauseBottom: 1,
        concentric: 1,
        pauseTop: 0,
      },
      rangeOfMotion: 'full-controlled',
      loadType: 'external-load',
    },
    muscles: {
      primary: ['chest'],
      secondary: ['shoulders', 'triceps'],
      stabilizers: ['core', 'upper-back'],
      jointActions: ['shoulder-horizontal-adduction', 'elbow-extension', 'scapular-stabilization'],
    },
    technique: {
      setup: {
        ru: 'Лягте на скамью, поставьте стопы на пол, сведите и опустите лопатки. Возьмитесь за штангу симметричным хватом.',
        en: 'Lie on the bench, plant your feet on the floor, and set your shoulder blades back and down. Grip the bar evenly.',
      },
      steps: {
        ru: 'Снимите штангу со стоек и опустите ее к середине груди под контролем. Сделайте короткую паузу, затем выжмите штангу вверх, сохраняя стабильные лопатки и запястья.',
        en: 'Unrack the bar and lower it to the mid-chest with control. Pause briefly, then press the bar upward while keeping shoulder blades and wrists stable.',
      },
      keyCues: {
        ru: 'Лопатки стабильны; стопы давят в пол; запястья над локтями.',
        en: 'Shoulder blades stay stable; feet press into the floor; wrists over elbows.',
      },
      commonErrors: {
        ru: 'Отрыв таза от скамьи; развал запястий; слишком широкий хват; отбив штанги от груди.',
        en: 'Hips lifting off the bench; wrists collapsing; grip too wide; bouncing the bar off the chest.',
      },
      breathing: {
        ru: 'Вдох перед опусканием или при опускании, выдох при жиме вверх.',
        en: 'Inhale before or during the lowering phase, exhale as you press up.',
      },
    },
    dosage: {
      strength: {
        sets: '2-4',
        reps: '5-8',
        restSec: '90-150',
      },
      hypertrophy: {
        sets: '2-4',
        reps: '8-12',
        restSec: '60-120',
      },
      endurance: {
        sets: '2-3',
        reps: '12-20',
        restSec: '30-60',
      },
    },
    safety: {
      contraindications: ['joint-shoulder-impingement', 'joint-wrist-pain'],
      precautions: ['use-spotter-or-safety-racks', 'keep-wrists-neutral', 'avoid-bouncing-bar'],
      impactLevel: 'low',
    },
    progression: {
      regressions: ['dumbbell-bench-press', 'push-up'],
      progressions: ['heavier-bench-press', 'paused-bench-press'],
      alternatives: ['dumbbell-bench-press', 'incline-bench-press'],
    },
    media: {
      images: [],
      videos: [],
      thumbnail: '',
    },
  },
  {
    id: 'incline-bench-press',
    slug: 'incline-bench-press',
    names: {
      ru: 'Жим штанги на наклонной скамье',
      en: 'Incline Bench Press',
    },
    aliases: ['incline-barbell-bench-press', 'incline-press'],
    classification: {
      modality: 'strength',
      exerciseFamily: 'press',
      movementPatterns: ['horizontal-push'],
      difficulty: 'intermediate',
      equipment: ['barbell', 'incline-bench'],
      bodyPosition: 'supine',
      laterality: 'bilateral',
    },
    mechanics: {
      executionMode: 'reps',
      tempo: {
        eccentric: 2,
        pauseBottom: 1,
        concentric: 1,
        pauseTop: 0,
      },
      rangeOfMotion: 'full-controlled',
      loadType: 'external-load',
    },
    muscles: {
      primary: ['chest'],
      secondary: ['shoulders', 'triceps'],
      stabilizers: ['core', 'upper-back'],
      jointActions: ['shoulder-horizontal-adduction', 'shoulder-flexion', 'elbow-extension'],
    },
    technique: {
      setup: {
        ru: 'Установите скамью под углом 30–45 градусов. Лягте, поставьте стопы на пол, сведите лопатки и возьмитесь за штангу симметричным хватом.',
        en: 'Set the bench to a 30–45 degree incline. Lie back, plant your feet, set your shoulder blades, and grip the bar evenly.',
      },
      steps: {
        ru: 'Снимите штангу со стоек и опустите ее к верхней части груди под контролем. После короткой паузы выжмите штангу вверх, сохраняя стабильные плечи и запястья.',
        en: 'Unrack the bar and lower it toward the upper chest with control. After a brief pause, press the bar upward while keeping shoulders and wrists stable.',
      },
      keyCues: {
        ru: 'Лопатки стабильны; локти под контролем; штанга движется к верхней груди.',
        en: 'Keep shoulder blades stable; control the elbows; guide the bar toward the upper chest.',
      },
      commonErrors: {
        ru: 'Слишком большой угол скамьи; разведение локтей; отбив штанги от груди; потеря контроля запястий.',
        en: 'Bench angle too steep; elbows flaring; bouncing the bar off the chest; losing wrist control.',
      },
      breathing: {
        ru: 'Вдох при опускании, выдох при жиме вверх.',
        en: 'Inhale as you lower, exhale as you press up.',
      },
    },
    dosage: {
      strength: {
        sets: '3-5',
        reps: '4-8',
        restSec: '90-180',
      },
      hypertrophy: {
        sets: '2-4',
        reps: '6-15',
        restSec: '60-120',
      },
      endurance: {
        sets: '2-4',
        reps: '12-20',
        restSec: '30-60',
      },
    },
    safety: {
      contraindications: ['joint-shoulder-impingement'],
      precautions: [
        'avoid-too-steep-bench-angle',
        'use-spotter-or-safety-racks',
        'control-bottom-range',
      ],
      impactLevel: 'low',
    },
    progression: {
      regressions: ['incline-dumbbell-bench-press', 'lighter-incline-bench-press'],
      progressions: ['heavier-incline-bench-press', 'paused-incline-bench-press'],
      alternatives: ['bench-press', 'dumbbell-bench-press'],
    },
    media: {
      images: [],
      videos: [],
      thumbnail: '',
    },
  },
  {
    id: 'incline-dumbbell-press',
    slug: 'incline-dumbbell-press',
    names: {
      ru: 'Жим гантелей на наклонной скамье',
      en: 'Incline Dumbbell Press',
    },
    aliases: ['incline-db-press', 'incline-dumbbell-bench-press'],
    classification: {
      modality: 'strength',
      exerciseFamily: 'press',
      movementPatterns: ['horizontal-push'],
      difficulty: 'intermediate',
      equipment: ['dumbbells', 'incline-bench'],
      bodyPosition: 'supine',
      laterality: 'bilateral',
    },
    mechanics: {
      executionMode: 'reps',
      tempo: {
        eccentric: 3,
        pauseBottom: 1,
        concentric: 1,
        pauseTop: 0,
      },
      rangeOfMotion: 'full-controlled',
      loadType: 'external-load',
    },
    muscles: {
      primary: ['chest'],
      secondary: ['shoulders', 'triceps'],
      stabilizers: ['core', 'upper-back'],
      jointActions: ['shoulder-horizontal-adduction', 'shoulder-flexion', 'elbow-extension'],
    },
    technique: {
      setup: {
        ru: 'Установите скамью под умеренным наклоном и лягте на нее, удерживая гантели у груди. Стопы стоят на полу, лопатки стабильны.',
        en: 'Set the bench to a moderate incline and lie back holding the dumbbells at chest level. Keep feet on the floor and shoulder blades stable.',
      },
      steps: {
        ru: 'Опустите гантели к верхней части груди, удерживая локти примерно под углом 45 градусов. После короткой паузы выжмите гантели вверх по контролируемой траектории, не сталкивая их вверху.',
        en: 'Lower the dumbbells toward the upper chest with elbows about 45 degrees from the torso. After a brief pause, press the dumbbells upward on a controlled path without banging them together at the top.',
      },
      keyCues: {
        ru: 'Лопатки стабильны; локти под контролем; гантели движутся симметрично.',
        en: 'Keep shoulder blades stable; control the elbows; move the dumbbells symmetrically.',
      },
      commonErrors: {
        ru: 'Слишком глубокое опускание; разведение локтей в стороны; прогиб в пояснице; потеря контроля запястий.',
        en: 'Lowering too deep; flaring elbows; arching the lower back; losing wrist control.',
      },
      breathing: {
        ru: 'Вдыхайте при опускании, выдыхайте при жиме вверх.',
        en: 'Inhale as you lower, exhale as you press up.',
      },
    },
    dosage: {
      strength: {
        sets: '3-5',
        reps: '4-8',
        restSec: '90-180',
      },
      hypertrophy: {
        sets: '2-4',
        reps: '6-15',
        restSec: '60-120',
      },
      endurance: {
        sets: '2-4',
        reps: '12-20',
        restSec: '30-60',
      },
    },
    safety: {
      contraindications: ['joint-shoulder-impingement'],
      precautions: ['control-bottom-range', 'keep-wrists-neutral', 'avoid-too-steep-bench-angle'],
      impactLevel: 'low',
    },
    progression: {
      regressions: ['lighter-incline-dumbbell-press', 'incline-push-up'],
      progressions: ['heavier-incline-dumbbell-press', 'paused-incline-dumbbell-press'],
      alternatives: ['incline-bench-press', 'dumbbell-bench-press'],
    },
    media: {
      images: [],
      videos: [],
      thumbnail: '',
    },
  },
  {
    id: 'cable-flyes',
    slug: 'cable-flyes',
    names: {
      ru: 'Сведение рук в кроссовере',
      en: 'Cable Flyes',
    },
    aliases: ['cable-chest-fly', 'crossover-fly'],
    classification: {
      modality: 'isolation',
      exerciseFamily: 'fly',
      movementPatterns: ['horizontal-push'],
      difficulty: 'beginner',
      equipment: ['cable-machine'],
      bodyPosition: 'standing',
      laterality: 'bilateral',
    },
    mechanics: {
      executionMode: 'reps',
      tempo: {
        eccentric: 3,
        pauseBottom: 0,
        concentric: 1,
        pauseTop: 1,
      },
      rangeOfMotion: 'full-controlled',
      loadType: 'external-load',
    },
    muscles: {
      primary: ['chest'],
      secondary: ['shoulders'],
      stabilizers: ['core', 'upper-back'],
      jointActions: ['shoulder-horizontal-adduction', 'scapular-stabilization'],
    },
    technique: {
      setup: {
        ru: 'Встаньте между блоками, возьмите рукояти и сделайте небольшой шаг вперед. Руки слегка согнуты, корпус стабилен.',
        en: 'Stand between the cable stacks, hold the handles, and take a small step forward. Keep arms slightly bent and torso stable.',
      },
      steps: {
        ru: 'Сведите рукояти перед грудью по дуге, сохраняя одинаковый сгиб в локтях. Задержитесь на секунду в сокращении, затем медленно разведите руки до комфортного растяжения.',
        en: 'Bring the handles together in front of your chest in an arc while keeping the same elbow bend. Pause for one second at the contraction, then slowly open the arms to a comfortable stretch.',
      },
      keyCues: {
        ru: 'Движение по дуге; локти мягко согнуты; не тяните вес корпусом.',
        en: 'Move in an arc; keep elbows softly bent; do not pull the weight with your torso.',
      },
      commonErrors: {
        ru: 'Превращение движения в жим; слишком глубокое растяжение; поднятые плечи; слишком тяжелый вес.',
        en: 'Turning the movement into a press; stretching too deep; shrugging the shoulders; using too much weight.',
      },
      breathing: {
        ru: 'Выдыхайте при сведении рук, вдыхайте при разведении.',
        en: 'Exhale as you bring the hands together, inhale as you open the arms.',
      },
    },
    dosage: {
      strength: {
        sets: '2-4',
        reps: '5-8',
        restSec: '90-150',
      },
      hypertrophy: {
        sets: '2-4',
        reps: '8-12',
        restSec: '60-120',
      },
      endurance: {
        sets: '2-3',
        reps: '12-20',
        restSec: '30-60',
      },
    },
    safety: {
      contraindications: ['joint-shoulder-impingement'],
      precautions: [
        'avoid-excessive-stretch',
        'keep-shoulders-stable',
        'use-light-to-moderate-load',
      ],
      impactLevel: 'low',
    },
    progression: {
      regressions: ['lighter-cable-flyes', 'shorter-range-cable-flyes'],
      progressions: ['heavier-cable-flyes', 'paused-cable-flyes'],
      alternatives: ['dumbbell-chest-fly', 'push-up'],
    },
    media: {
      images: [],
      videos: [],
      thumbnail: '',
    },
  },
  {
    id: 'tricep-pushdown',
    slug: 'tricep-pushdown',
    names: {
      ru: 'Разгибание рук на блоке',
      en: 'Tricep Pushdown',
    },
    aliases: ['cable-tricep-pushdown', 'triceps-pushdown'],
    classification: {
      modality: 'isolation',
      exerciseFamily: 'triceps-extension',
      movementPatterns: ['arm-extension'],
      difficulty: 'beginner',
      equipment: ['cable-machine'],
      bodyPosition: 'standing',
      laterality: 'bilateral',
    },
    mechanics: {
      executionMode: 'reps',
      tempo: {
        eccentric: 2,
        pauseBottom: 1,
        concentric: 1,
        pauseTop: 0,
      },
      rangeOfMotion: 'full-controlled',
      loadType: 'external-load',
    },
    muscles: {
      primary: ['triceps'],
      secondary: ['forearms'],
      stabilizers: ['core', 'shoulders'],
      jointActions: ['elbow-extension'],
    },
    technique: {
      setup: {
        ru: 'Встаньте перед верхним блоком и возьмитесь за рукоять. Локти прижаты к корпусу, плечи опущены.',
        en: 'Stand in front of a high cable and hold the attachment. Keep elbows close to your body and shoulders down.',
      },
      steps: {
        ru: 'Разогните руки вниз до полного контролируемого выпрямления локтей. Задержитесь на секунду внизу, затем медленно верните рукоять вверх, не уводя локти вперед.',
        en: 'Extend your arms downward until the elbows are fully controlled and straight. Pause for one second at the bottom, then slowly let the handle return upward without letting the elbows drift forward.',
      },
      keyCues: {
        ru: 'Локти неподвижны; плечи не поднимаются; работайте только разгибанием локтя.',
        en: 'Keep elbows still; do not shrug; move only through elbow extension.',
      },
      commonErrors: {
        ru: 'Раскачивание корпусом; отведение локтей назад или в стороны; слишком тяжелый вес; неполная амплитуда.',
        en: 'Swinging the torso; elbows moving back or out; using too much weight; incomplete range of motion.',
      },
      breathing: {
        ru: 'Выдыхайте при разгибании вниз, вдыхайте при возврате.',
        en: 'Exhale as you press down, inhale as you return.',
      },
    },
    dosage: {
      strength: {
        sets: '2-4',
        reps: '5-8',
        restSec: '90-150',
      },
      hypertrophy: {
        sets: '2-4',
        reps: '8-12',
        restSec: '60-120',
      },
      endurance: {
        sets: '2-3',
        reps: '12-20',
        restSec: '30-60',
      },
    },
    safety: {
      contraindications: ['joint-elbow-pain'],
      precautions: ['keep-elbows-controlled', 'avoid-wrist-bending', 'use-manageable-load'],
      impactLevel: 'low',
    },
    progression: {
      regressions: ['lighter-tricep-pushdown', 'band-tricep-pushdown'],
      progressions: ['heavier-tricep-pushdown', 'single-arm-tricep-pushdown'],
      alternatives: ['overhead-dumbbell-extension', 'diamond-push-up'],
    },
    media: {
      images: [],
      videos: [],
      thumbnail: '',
    },
  },
  {
    id: 'french-press-dumbbell',
    slug: 'french-press-dumbbell',
    names: {
      ru: 'Французский жим с гантелью',
      en: 'Dumbbell French Press',
    },
    aliases: ['dumbbell-skull-crusher', 'lying-dumbbell-triceps-extension'],
    classification: {
      modality: 'isolation',
      exerciseFamily: 'press',
      movementPatterns: ['arm-extension'],
      difficulty: 'intermediate',
      equipment: ['dumbbell'],
      bodyPosition: 'supine',
      laterality: 'bilateral',
    },
    mechanics: {
      executionMode: 'reps',
      tempo: {
        eccentric: 3,
        pauseBottom: 1,
        concentric: 1,
        pauseTop: 0,
      },
      rangeOfMotion: 'full-controlled',
      loadType: 'external-load',
    },
    muscles: {
      primary: ['triceps'],
      secondary: ['forearms'],
      stabilizers: ['shoulders', 'core'],
      jointActions: ['elbow-extension', 'shoulder-stabilization'],
    },
    technique: {
      setup: {
        ru: 'Лягте на скамью или сядьте, удерживая гантель обеими руками. Локти направлены вперед и остаются относительно близко друг к другу.',
        en: 'Lie on a bench or sit holding one dumbbell with both hands. Keep elbows pointing forward and relatively close together.',
      },
      steps: {
        ru: 'Сгибая только локти, медленно опустите гантель за голову до комфортной глубины. После короткой паузы разогните руки и верните гантель вверх, не разводя локти.',
        en: 'Bending only the elbows, slowly lower the dumbbell behind your head to a comfortable depth. After a brief pause, extend the arms and return the dumbbell upward without flaring the elbows.',
      },
      keyCues: {
        ru: 'Локти близко; плечи стабильны; движение идет в локтевом суставе.',
        en: 'Keep elbows close; shoulders stable; move through the elbows.',
      },
      commonErrors: {
        ru: 'Разведение локтей; прогиб в пояснице; слишком глубокое опускание; тяжелая гантель без контроля.',
        en: 'Flaring the elbows; arching the lower back; lowering too deep; using a heavy dumbbell without control.',
      },
      breathing: {
        ru: 'Вдыхайте при опускании, выдыхайте при разгибании рук.',
        en: 'Inhale as you lower, exhale as you extend the arms.',
      },
    },
    dosage: {
      strength: {
        sets: '3-5',
        reps: '4-8',
        restSec: '90-180',
      },
      hypertrophy: {
        sets: '2-4',
        reps: '6-15',
        restSec: '60-120',
      },
      endurance: {
        sets: '2-4',
        reps: '12-20',
        restSec: '30-60',
      },
    },
    safety: {
      contraindications: ['joint-elbow-pain', 'joint-shoulder-impingement'],
      precautions: ['control-elbow-position', 'avoid-excessive-depth', 'use-manageable-load'],
      impactLevel: 'low',
    },
    progression: {
      regressions: ['lighter-dumbbell-french-press', 'cable-tricep-extension'],
      progressions: ['heavier-dumbbell-french-press', 'slow-tempo-dumbbell-french-press'],
      alternatives: ['tricep-pushdown', 'overhead-dumbbell-extension'],
    },
    media: {
      images: [],
      videos: [],
      thumbnail: '',
    },
  },
  {
    id: 'overhead-dumbbell-extension',
    slug: 'overhead-dumbbell-extension',
    names: {
      ru: 'Разгибание гантели из-за головы',
      en: 'Overhead Dumbbell Extension',
    },
    aliases: ['dumbbell-overhead-triceps-extension', 'overhead-tricep-extension'],
    classification: {
      modality: 'isolation',
      exerciseFamily: 'triceps-extension',
      movementPatterns: ['arm-extension'],
      difficulty: 'intermediate',
      equipment: ['dumbbell'],
      bodyPosition: 'standing',
      laterality: 'bilateral',
    },
    mechanics: {
      executionMode: 'reps',
      tempo: {
        eccentric: 3,
        pauseBottom: 1,
        concentric: 1,
        pauseTop: 0,
      },
      rangeOfMotion: 'full-controlled',
      loadType: 'external-load',
    },
    muscles: {
      primary: ['triceps'],
      secondary: ['forearms'],
      stabilizers: ['core', 'shoulders', 'upper-back'],
      jointActions: ['elbow-extension', 'shoulder-stabilization'],
    },
    technique: {
      setup: {
        ru: 'Встаньте или сядьте устойчиво, удерживая гантель обеими руками над головой. Корпус напряжен, ребра опущены.',
        en: 'Stand or sit firmly holding one dumbbell with both hands overhead. Brace your torso and keep ribs down.',
      },
      steps: {
        ru: 'Сгибая локти, медленно опустите гантель за голову до комфортной глубины. Затем разогните руки вверх, сохраняя локти направленными вперед и плечи стабильными.',
        en: 'Bend the elbows and slowly lower the dumbbell behind your head to a comfortable depth. Then extend the arms upward while keeping elbows pointed forward and shoulders stable.',
      },
      keyCues: {
        ru: 'Локти вперед; ребра вниз; разгибайте руки без раскачки.',
        en: 'Elbows forward; ribs down; extend the arms without swinging.',
      },
      commonErrors: {
        ru: 'Разведение локтей; прогиб в пояснице; слишком тяжелая гантель; опускание ниже комфортной амплитуды.',
        en: 'Flaring the elbows; arching the lower back; using too much weight; lowering beyond a comfortable range.',
      },
      breathing: {
        ru: 'Вдыхайте при опускании гантели, выдыхайте при разгибании вверх.',
        en: 'Inhale as you lower the dumbbell, exhale as you extend upward.',
      },
    },
    dosage: {
      strength: {
        sets: '3-5',
        reps: '4-8',
        restSec: '90-180',
      },
      hypertrophy: {
        sets: '2-4',
        reps: '6-15',
        restSec: '60-120',
      },
      endurance: {
        sets: '2-4',
        reps: '12-20',
        restSec: '30-60',
      },
    },
    safety: {
      contraindications: ['joint-elbow-pain', 'joint-shoulder-impingement'],
      precautions: [
        'avoid-elbow-flare',
        'avoid-lumbar-overextension',
        'use-comfortable-shoulder-range',
      ],
      impactLevel: 'low',
    },
    progression: {
      regressions: ['seated-overhead-dumbbell-extension', 'lighter-overhead-dumbbell-extension'],
      progressions: [
        'heavier-overhead-dumbbell-extension',
        'single-arm-overhead-dumbbell-extension',
      ],
      alternatives: ['tricep-pushdown', 'french-press-dumbbell'],
    },
    media: {
      images: [],
      videos: [],
      thumbnail: '',
    },
  },
  {
    id: 'hammer-curl',
    slug: 'hammer-curl',
    names: {
      ru: 'Молотковые сгибания',
      en: 'Hammer Curls',
    },
    aliases: ['dumbbell-hammer-curl', 'neutral-grip-curl'],
    classification: {
      modality: 'isolation',
      exerciseFamily: 'curl',
      movementPatterns: ['arm-curl'],
      difficulty: 'beginner',
      equipment: ['dumbbells'],
      bodyPosition: 'standing',
      laterality: 'bilateral',
    },
    mechanics: {
      executionMode: 'reps',
      tempo: {
        eccentric: 2,
        pauseBottom: 1,
        concentric: 1,
        pauseTop: 0,
      },
      rangeOfMotion: 'full-controlled',
      loadType: 'external-load',
    },
    muscles: {
      primary: ['biceps'],
      secondary: ['forearms'],
      stabilizers: ['core', 'shoulders'],
      jointActions: ['elbow-flexion', 'forearm-neutral-grip'],
    },
    technique: {
      setup: {
        ru: 'Встаньте прямо, удерживая гантели по бокам корпуса нейтральным хватом, ладони смотрят друг на друга.',
        en: 'Stand tall holding dumbbells at your sides with a neutral grip, palms facing each other.',
      },
      steps: {
        ru: 'Сохраняя локти близко к корпусу, согните руки и поднимите гантели к плечам без разворота кистей. Подконтрольно опустите гантели вниз и повторите.',
        en: 'Keeping your elbows close to your body, curl the dumbbells toward your shoulders without rotating the wrists. Lower the dumbbells with control and repeat.',
      },
      keyCues: {
        ru: 'Ладони смотрят друг на друга; локти неподвижны; не раскачивайте корпус.',
        en: 'Keep palms facing each other; elbows stay still; avoid swinging your torso.',
      },
      commonErrors: {
        ru: 'Раскачивание корпусом; выведение локтей вперед; сгибание запястий; слишком тяжелые гантели.',
        en: 'Swinging the torso; elbows drifting forward; bending the wrists; using dumbbells that are too heavy.',
      },
      breathing: {
        ru: 'Выдыхайте при подъеме гантелей, вдыхайте при опускании.',
        en: 'Exhale as you curl the dumbbells up, inhale as you lower them.',
      },
    },
    dosage: {
      strength: {
        sets: '2-4',
        reps: '5-8',
        restSec: '90-150',
      },
      hypertrophy: {
        sets: '2-4',
        reps: '8-12',
        restSec: '60-120',
      },
      endurance: {
        sets: '2-3',
        reps: '12-20',
        restSec: '30-60',
      },
    },
    safety: {
      contraindications: ['joint-elbow-pain'],
      precautions: ['keep-wrists-neutral', 'avoid-swinging', 'use-manageable-load'],
      impactLevel: 'low',
    },
    progression: {
      regressions: ['lighter-hammer-curl', 'seated-hammer-curl'],
      progressions: ['heavier-hammer-curl', 'alternating-hammer-curl'],
      alternatives: ['dumbbell-bicep-curl', 'barbell-bicep-curl'],
    },
    media: {
      images: [],
      videos: [],
      thumbnail: '',
    },
  },
  {
    id: 'concentration-curl',
    slug: 'concentration-curl',
    names: {
      ru: 'Концентрированные сгибания',
      en: 'Concentration Curls',
    },
    aliases: ['dumbbell-concentration-curl', 'single-arm-concentration-curl'],
    classification: {
      modality: 'isolation',
      exerciseFamily: 'curl',
      movementPatterns: ['arm-curl'],
      difficulty: 'beginner',
      equipment: ['dumbbell'],
      bodyPosition: 'seated',
      laterality: 'bilateral',
    },
    mechanics: {
      executionMode: 'reps',
      tempo: {
        eccentric: 3,
        pauseBottom: 0,
        concentric: 1,
        pauseTop: 1,
      },
      rangeOfMotion: 'full-controlled',
      loadType: 'external-load',
    },
    muscles: {
      primary: ['biceps'],
      secondary: ['forearms'],
      stabilizers: ['shoulders', 'core'],
      jointActions: ['elbow-flexion', 'forearm-supination'],
    },
    technique: {
      setup: {
        ru: 'Сядьте на скамью, разведите колени и уприте локоть рабочей руки во внутреннюю поверхность бедра. Гантель держите под контролем.',
        en: 'Sit on a bench, separate your knees, and brace the working elbow against the inner thigh. Hold the dumbbell under control.',
      },
      steps: {
        ru: 'Согните руку и поднимите гантель к плечу, не отрывая локоть от бедра. Задержитесь в верхней точке, затем медленно опустите гантель вниз.',
        en: 'Curl the dumbbell toward your shoulder without lifting the elbow from the thigh. Pause at the top, then slowly lower the dumbbell.',
      },
      keyCues: {
        ru: 'Локоть стабилен; движение медленное; вверху сожмите бицепс.',
        en: 'Keep the elbow stable; move slowly; squeeze the biceps at the top.',
      },
      commonErrors: {
        ru: 'Рывок корпусом; отрыв локтя от бедра; неполное опускание; слишком тяжелая гантель.',
        en: 'Jerking with the torso; lifting the elbow off the thigh; incomplete lowering; using a dumbbell that is too heavy.',
      },
      breathing: {
        ru: 'Выдыхайте при подъеме, вдыхайте при опускании.',
        en: 'Exhale as you curl up, inhale as you lower.',
      },
    },
    dosage: {
      strength: {
        sets: '2-4',
        reps: '5-8',
        restSec: '90-150',
      },
      hypertrophy: {
        sets: '2-4',
        reps: '8-12',
        restSec: '60-120',
      },
      endurance: {
        sets: '2-3',
        reps: '12-20',
        restSec: '30-60',
      },
    },
    safety: {
      contraindications: ['joint-elbow-pain'],
      precautions: ['avoid-jerking', 'keep-elbow-supported', 'use-manageable-load'],
      impactLevel: 'low',
    },
    progression: {
      regressions: ['lighter-concentration-curl', 'seated-dumbbell-curl'],
      progressions: ['heavier-concentration-curl', 'slow-tempo-concentration-curl'],
      alternatives: ['dumbbell-bicep-curl', 'hammer-curl'],
    },
    media: {
      images: [],
      videos: [],
      thumbnail: '',
    },
  },
  {
    id: 'barbell-bicep-curl',
    slug: 'barbell-bicep-curl',
    names: {
      ru: 'Сгибания рук со штангой',
      en: 'Barbell Bicep Curl',
    },
    aliases: ['barbell-curl', 'standing-barbell-curl'],
    classification: {
      modality: 'strength',
      exerciseFamily: 'curl',
      movementPatterns: ['elbow-flexion'],
      difficulty: 'beginner',
      equipment: ['barbell'],
      bodyPosition: 'standing',
      laterality: 'bilateral',
    },
    mechanics: {
      executionMode: 'reps',
      tempo: {
        eccentric: 3,
        pauseBottom: 0,
        concentric: 1,
        pauseTop: 1,
      },
      rangeOfMotion: 'full-controlled',
      loadType: 'external-load',
    },
    muscles: {
      primary: ['biceps'],
      secondary: ['forearms'],
      stabilizers: ['core', 'shoulders', 'upper-back'],
      jointActions: ['elbow-flexion', 'forearm-supination'],
    },
    technique: {
      setup: {
        ru: 'Встаньте прямо, возьмите штангу хватом снизу примерно на ширине плеч. Локти держите близко к корпусу.',
        en: 'Stand tall and hold the barbell with an underhand grip about shoulder-width apart. Keep elbows close to your body.',
      },
      steps: {
        ru: 'Согните руки и поднимите штангу к плечам без раскачивания корпуса. Задержитесь на секунду в верхней точке, затем медленно опустите штангу вниз.',
        en: 'Curl the barbell toward your shoulders without swinging your torso. Pause for one second at the top, then lower the bar slowly.',
      },
      keyCues: {
        ru: 'Локти неподвижны; корпус высокий; опускайте штангу подконтрольно.',
        en: 'Keep elbows still; torso tall; lower the bar with control.',
      },
      commonErrors: {
        ru: 'Раскачивание корпусом; отведение локтей назад; сгибание запястий; слишком тяжелая штанга.',
        en: 'Swinging the torso; elbows drifting backward; bending the wrists; using a barbell that is too heavy.',
      },
      breathing: {
        ru: 'Выдыхайте при подъеме штанги, вдыхайте при опускании.',
        en: 'Exhale as you curl the bar up, inhale as you lower.',
      },
    },
    dosage: {
      strength: {
        sets: '2-4',
        reps: '5-8',
        restSec: '90-150',
      },
      hypertrophy: {
        sets: '2-4',
        reps: '8-12',
        restSec: '60-120',
      },
      endurance: {
        sets: '2-3',
        reps: '12-20',
        restSec: '30-60',
      },
    },
    safety: {
      contraindications: ['joint-elbow-pain', 'joint-wrist-pain'],
      precautions: ['keep-wrists-neutral', 'avoid-swinging', 'use-manageable-load'],
      impactLevel: 'low',
    },
    progression: {
      regressions: ['lighter-barbell-bicep-curl', 'dumbbell-bicep-curl'],
      progressions: ['heavier-barbell-bicep-curl', 'paused-barbell-bicep-curl'],
      alternatives: ['dumbbell-bicep-curl', 'close-grip-barbell-curl'],
    },
    media: {
      images: [],
      videos: [],
      thumbnail: '',
    },
  },
  {
    id: 'reverse-bicep-curl',
    slug: 'reverse-bicep-curl',
    names: {
      ru: 'Обратные сгибания на бицепс',
      en: 'Reverse Bicep Curl',
    },
    aliases: ['reverse-barbell-curl', 'overhand-curl'],
    classification: {
      modality: 'strength',
      exerciseFamily: 'curl',
      movementPatterns: ['elbow-flexion'],
      difficulty: 'intermediate',
      equipment: ['barbell'],
      bodyPosition: 'standing',
      laterality: 'bilateral',
    },
    mechanics: {
      executionMode: 'reps',
      tempo: {
        eccentric: 3,
        pauseBottom: 0,
        concentric: 1,
        pauseTop: 1,
      },
      rangeOfMotion: 'full-controlled',
      loadType: 'external-load',
    },
    muscles: {
      primary: ['biceps'],
      secondary: ['forearms', 'brachialis'],
      stabilizers: ['core', 'shoulders'],
      jointActions: ['elbow-flexion', 'forearm-pronation'],
    },
    technique: {
      setup: {
        ru: 'Встаньте прямо и возьмите штангу хватом сверху примерно на ширине плеч. Локти держите близко к корпусу.',
        en: 'Stand tall and hold the barbell with an overhand grip about shoulder-width apart. Keep elbows close to your body.',
      },
      steps: {
        ru: 'Согните руки и поднимите штангу к верхней части корпуса, сохраняя запястья нейтральными. Задержитесь на секунду и медленно опустите штангу вниз, не теряя контроля.',
        en: 'Curl the bar toward your upper torso while keeping wrists neutral. Pause for one second and slowly lower the bar without losing control.',
      },
      keyCues: {
        ru: 'Хват сверху; запястья ровные; локти не уходят вперед.',
        en: 'Use an overhand grip; keep wrists straight; do not let elbows drift forward.',
      },
      commonErrors: {
        ru: 'Сгибание запястий; раскачивание корпусом; слишком тяжелая штанга; болезненное полное разгибание локтей.',
        en: 'Bending the wrists; swinging the torso; using too much weight; forcing painful full elbow extension.',
      },
      breathing: {
        ru: 'Выдыхайте при подъеме, вдыхайте при опускании.',
        en: 'Exhale as you curl up, inhale as you lower.',
      },
    },
    dosage: {
      strength: {
        sets: '3-5',
        reps: '4-8',
        restSec: '90-180',
      },
      hypertrophy: {
        sets: '2-4',
        reps: '6-15',
        restSec: '60-120',
      },
      endurance: {
        sets: '2-4',
        reps: '12-20',
        restSec: '30-60',
      },
    },
    safety: {
      contraindications: ['joint-wrist-pain', 'joint-elbow-pain'],
      precautions: [
        'keep-wrists-neutral',
        'use-lighter-load-than-standard-curl',
        'avoid-forcing-elbow-lockout',
      ],
      impactLevel: 'low',
    },
    progression: {
      regressions: ['lighter-reverse-bicep-curl', 'dumbbell-reverse-curl'],
      progressions: ['heavier-reverse-bicep-curl', 'slow-tempo-reverse-bicep-curl'],
      alternatives: ['hammer-curl', 'barbell-bicep-curl'],
    },
    media: {
      images: [],
      videos: [],
      thumbnail: '',
    },
  },
  {
    id: 'close-grip-barbell-curl',
    slug: 'close-grip-barbell-curl',
    names: {
      ru: 'Подъём штанги на бицепс узким хватом',
      en: 'Close Grip Barbell Curl',
    },
    aliases: ['narrow-grip-barbell-curl', 'close-grip-curl'],
    classification: {
      modality: 'strength',
      exerciseFamily: 'curl',
      movementPatterns: ['elbow-flexion'],
      difficulty: 'beginner',
      equipment: ['barbell'],
      bodyPosition: 'standing',
      laterality: 'bilateral',
    },
    mechanics: {
      executionMode: 'reps',
      tempo: {
        eccentric: 3,
        pauseBottom: 0,
        concentric: 1,
        pauseTop: 1,
      },
      rangeOfMotion: 'full-controlled',
      loadType: 'external-load',
    },
    muscles: {
      primary: ['biceps'],
      secondary: ['forearms'],
      stabilizers: ['core', 'shoulders'],
      jointActions: ['elbow-flexion', 'forearm-supination'],
    },
    technique: {
      setup: {
        ru: 'Встаньте прямо и возьмите штангу хватом снизу уже ширины плеч. Локти держите близко к корпусу.',
        en: 'Stand tall and hold the barbell with an underhand grip narrower than shoulder-width. Keep elbows close to your body.',
      },
      steps: {
        ru: 'Поднимите штангу к плечам, сгибая локти без раскачивания корпуса. В верхней точке сделайте короткую паузу, затем медленно опустите штангу вниз.',
        en: 'Curl the bar toward your shoulders by bending the elbows without swinging your torso. Pause briefly at the top, then lower the bar slowly.',
      },
      keyCues: {
        ru: 'Хват узкий, но комфортный; локти прижаты; запястья нейтральны.',
        en: 'Grip narrow but comfortable; elbows stay tucked; wrists remain neutral.',
      },
      commonErrors: {
        ru: 'Слишком узкий болезненный хват; раскачивание корпусом; заламывание запястий; отведение локтей вперед.',
        en: 'Using a grip so narrow it causes discomfort; swinging the torso; bending the wrists; elbows drifting forward.',
      },
      breathing: {
        ru: 'Выдыхайте при подъеме штанги, вдыхайте при опускании.',
        en: 'Exhale as you curl the bar up, inhale as you lower.',
      },
    },
    dosage: {
      strength: {
        sets: '2-4',
        reps: '5-8',
        restSec: '90-150',
      },
      hypertrophy: {
        sets: '2-4',
        reps: '8-12',
        restSec: '60-120',
      },
      endurance: {
        sets: '2-3',
        reps: '12-20',
        restSec: '30-60',
      },
    },
    safety: {
      contraindications: ['joint-wrist-pain', 'joint-elbow-pain'],
      precautions: ['choose-comfortable-grip-width', 'keep-wrists-neutral', 'avoid-swinging'],
      impactLevel: 'low',
    },
    progression: {
      regressions: ['lighter-close-grip-barbell-curl', 'dumbbell-bicep-curl'],
      progressions: ['heavier-close-grip-barbell-curl', 'paused-close-grip-barbell-curl'],
      alternatives: ['barbell-bicep-curl', 'hammer-curl'],
    },
    media: {
      images: [],
      videos: [],
      thumbnail: '',
    },
  },
  {
    id: 'romanian-deadlift',
    slug: 'romanian-deadlift',
    names: {
      ru: 'Румынская тяга со штангой',
      en: 'Romanian Deadlift',
    },
    aliases: ['barbell-romanian-deadlift', 'rdl'],
    classification: {
      modality: 'strength',
      exerciseFamily: 'deadlift',
      movementPatterns: ['hip-hinge'],
      difficulty: 'intermediate',
      equipment: ['barbell'],
      bodyPosition: 'standing',
      laterality: 'bilateral',
    },
    mechanics: {
      executionMode: 'reps',
      tempo: {
        eccentric: 3,
        pauseBottom: 0,
        concentric: 1,
        pauseTop: 1,
      },
      rangeOfMotion: 'full-controlled',
      loadType: 'external-load',
    },
    muscles: {
      primary: ['hamstrings', 'glutes'],
      secondary: ['lower-back', 'core'],
      stabilizers: ['upper-back', 'forearms', 'lats'],
      jointActions: ['hip-extension', 'hip-hinge', 'spine-stabilization'],
    },
    technique: {
      setup: {
        ru: 'Встаньте прямо со штангой в руках перед бедрами. Стопы на ширине таза, колени слегка согнуты, спина нейтральная.',
        en: 'Stand tall holding the barbell in front of your thighs. Feet hip-width apart, knees slightly bent, and spine neutral.',
      },
      steps: {
        ru: 'Отведите таз назад и опускайте штангу вдоль ног до ощущения растяжения задней поверхности бедра или примерно до середины голени. Сохраняйте штангу близко к телу, затем разогните таз и вернитесь в стойку.',
        en: 'Push your hips back and lower the bar along your legs until you feel a hamstring stretch or reach about mid-shin. Keep the bar close to the body, then extend the hips to return to standing.',
      },
      keyCues: {
        ru: 'Таз назад; штанга близко к ногам; спина нейтральная.',
        en: 'Hips back; bar close to the legs; neutral spine.',
      },
      commonErrors: {
        ru: 'Округление спины; приседание вместо наклона; штанга уходит вперед; слишком глубокое опускание без контроля.',
        en: 'Rounding the back; squatting instead of hinging; bar drifting forward; lowering too deep without control.',
      },
      breathing: {
        ru: 'Вдыхайте перед опусканием, выдыхайте при подъеме в стойку.',
        en: 'Inhale before lowering, exhale as you stand back up.',
      },
    },
    dosage: {
      strength: {
        sets: '3-5',
        reps: '4-8',
        restSec: '90-180',
      },
      hypertrophy: {
        sets: '2-4',
        reps: '6-15',
        restSec: '60-120',
      },
      endurance: {
        sets: '2-4',
        reps: '12-20',
        restSec: '30-60',
      },
    },
    safety: {
      contraindications: ['region-lower-back-pain', 'soft-tissue-hamstring-injury'],
      precautions: ['maintain-neutral-spine', 'keep-bar-close-to-body', 'avoid-forcing-range'],
      impactLevel: 'low',
    },
    progression: {
      regressions: ['dumbbell-romanian-deadlift', 'lighter-romanian-deadlift'],
      progressions: ['heavier-romanian-deadlift', 'paused-romanian-deadlift'],
      alternatives: ['good-morning', 'dumbbell-romanian-deadlift'],
    },
    media: {
      images: [],
      videos: [],
      thumbnail: '',
    },
  },
  {
    id: 'conventional-deadlift',
    slug: 'conventional-deadlift',
    names: {
      ru: 'Классическая становая тяга',
      en: 'Conventional Deadlift',
    },
    aliases: ['barbell-deadlift', 'deadlift'],
    classification: {
      modality: 'strength',
      exerciseFamily: 'deadlift',
      movementPatterns: ['hip-hinge'],
      difficulty: 'advanced',
      equipment: ['barbell'],
      bodyPosition: 'standing',
      laterality: 'bilateral',
    },
    mechanics: {
      executionMode: 'reps',
      tempo: {
        eccentric: 3,
        pauseBottom: 0,
        concentric: 1,
        pauseTop: 1,
      },
      rangeOfMotion: 'full-controlled',
      loadType: 'external-load',
    },
    muscles: {
      primary: ['hamstrings', 'glutes', 'lower-back'],
      secondary: ['traps', 'core', 'quads'],
      stabilizers: ['lats', 'forearms', 'upper-back'],
      jointActions: ['hip-extension', 'knee-extension', 'spine-stabilization'],
    },
    technique: {
      setup: {
        ru: 'Поставьте стопы примерно на ширине таза, штанга над серединой стопы. Возьмитесь за гриф снаружи ног, напрягите корпус и зафиксируйте нейтральную спину.',
        en: 'Set your feet about hip-width apart with the bar over mid-foot. Grip the bar outside your legs, brace your core, and set a neutral spine.',
      },
      steps: {
        ru: 'Натяните корпус и потяните штангу вверх, одновременно разгибая колени и таз. Держите гриф близко к ногам. Вверху стойте прямо без переразгибания, затем опустите штангу вниз с контролем.',
        en: 'Create full-body tension and pull the bar up by extending knees and hips together. Keep the bar close to your legs. Stand tall at the top without overextending, then lower the bar with control.',
      },
      keyCues: {
        ru: 'Гриф близко; пол толкайте ногами; спина нейтральная.',
        en: 'Keep the bar close; push the floor away; maintain a neutral spine.',
      },
      commonErrors: {
        ru: 'Округление поясницы; рывок с расслабленного старта; штанга уходит вперед; чрезмерный прогиб вверху.',
        en: 'Rounding the lower back; jerking from a loose setup; bar drifting forward; overextending at the top.',
      },
      breathing: {
        ru: 'Сделайте вдох и напрягите корпус перед подъемом, выдыхайте после прохождения основной фазы усилия.',
        en: 'Inhale and brace before the lift, then exhale after passing the main effort phase.',
      },
    },
    dosage: {
      strength: {
        sets: '3-5',
        reps: '4-8',
        restSec: '90-180',
      },
      hypertrophy: {
        sets: '2-4',
        reps: '6-15',
        restSec: '60-120',
      },
      endurance: {
        sets: '2-4',
        reps: '12-20',
        restSec: '30-60',
      },
    },
    safety: {
      contraindications: ['region-lower-back-pain', 'core-hernia'],
      precautions: ['brace-core-before-lift', 'maintain-neutral-spine', 'avoid-jerking-bar'],
      impactLevel: 'medium',
    },
    progression: {
      regressions: ['trap-bar-deadlift', 'rack-pull'],
      progressions: ['heavier-conventional-deadlift', 'paused-conventional-deadlift'],
      alternatives: ['sumo-deadlift', 'romanian-deadlift'],
    },
    media: {
      images: [],
      videos: [],
      thumbnail: '',
    },
  },
  {
    id: 'sumo-deadlift',
    slug: 'sumo-deadlift',
    names: {
      ru: 'Становая тяга сумо',
      en: 'Sumo Deadlift',
    },
    aliases: ['barbell-sumo-deadlift', 'wide-stance-deadlift'],
    classification: {
      modality: 'strength',
      exerciseFamily: 'deadlift',
      movementPatterns: ['hip-hinge'],
      difficulty: 'intermediate',
      equipment: ['barbell'],
      bodyPosition: 'standing',
      laterality: 'bilateral',
    },
    mechanics: {
      executionMode: 'reps',
      tempo: {
        eccentric: 3,
        pauseBottom: 0,
        concentric: 1,
        pauseTop: 1,
      },
      rangeOfMotion: 'full-controlled',
      loadType: 'external-load',
    },
    muscles: {
      primary: ['glutes', 'quads'],
      secondary: ['hamstrings', 'adductors', 'lower-back'],
      stabilizers: ['core', 'lats', 'forearms', 'upper-back'],
      jointActions: ['hip-extension', 'knee-extension', 'hip-abduction', 'spine-stabilization'],
    },
    technique: {
      setup: {
        ru: 'Поставьте стопы широко, носки слегка развернуты наружу. Штанга над серединой стопы, руки берутся за гриф внутри ног.',
        en: 'Set a wide stance with toes slightly turned out. Keep the bar over mid-foot and grip it inside your legs.',
      },
      steps: {
        ru: 'Напрягите корпус, разведите колени по линии стоп и потяните штангу вверх близко к телу. Разгибайте колени и таз вместе, вверху стойте прямо, затем опустите штангу с контролем.',
        en: 'Brace your core, press knees in line with toes, and pull the bar upward close to your body. Extend knees and hips together, stand tall at the top, then lower the bar with control.',
      },
      keyCues: {
        ru: 'Колени по линии стоп; грудь высокая; гриф близко к телу.',
        en: 'Knees track with feet; chest tall; bar stays close to the body.',
      },
      commonErrors: {
        ru: 'Завал коленей внутрь; округление спины; слишком широкая болезненная стойка; ранний подъем таза.',
        en: 'Knees collapsing inward; rounding the back; stance too wide and uncomfortable; hips rising too early.',
      },
      breathing: {
        ru: 'Вдохните и напрягите корпус перед подъемом, выдыхайте после основной фазы усилия.',
        en: 'Inhale and brace before lifting, then exhale after the main effort phase.',
      },
    },
    dosage: {
      strength: {
        sets: '3-5',
        reps: '4-8',
        restSec: '90-180',
      },
      hypertrophy: {
        sets: '2-4',
        reps: '6-15',
        restSec: '60-120',
      },
      endurance: {
        sets: '2-4',
        reps: '12-20',
        restSec: '30-60',
      },
    },
    safety: {
      contraindications: ['joint-hip-impingement', 'region-lower-back-pain'],
      precautions: [
        'choose-comfortable-stance-width',
        'control-knee-alignment',
        'maintain-neutral-spine',
      ],
      impactLevel: 'medium',
    },
    progression: {
      regressions: ['kettlebell-sumo-deadlift', 'block-sumo-deadlift'],
      progressions: ['heavier-sumo-deadlift', 'paused-sumo-deadlift'],
      alternatives: ['conventional-deadlift', 'goblet-sumo-squat'],
    },
    media: {
      images: [],
      videos: [],
      thumbnail: '',
    },
  },
  {
    id: 'good-morning',
    slug: 'good-morning',
    names: {
      ru: 'Гудморнинг',
      en: 'Good Morning',
    },
    aliases: ['barbell-good-morning', 'good-morning-exercise'],
    classification: {
      modality: 'strength',
      exerciseFamily: 'hinge',
      movementPatterns: ['hip-hinge'],
      difficulty: 'intermediate',
      equipment: ['barbell'],
      bodyPosition: 'standing',
      laterality: 'bilateral',
    },
    mechanics: {
      executionMode: 'reps',
      tempo: {
        eccentric: 4,
        pauseBottom: 0,
        concentric: 1,
        pauseTop: 1,
      },
      rangeOfMotion: 'full-controlled',
      loadType: 'external-load',
    },
    muscles: {
      primary: ['hamstrings', 'lower-back'],
      secondary: ['glutes', 'core'],
      stabilizers: ['upper-back', 'lats', 'hips'],
      jointActions: ['hip-hinge', 'hip-extension', 'spine-stabilization'],
    },
    technique: {
      setup: {
        ru: 'Положите штангу на верх спины, как для приседа. Встаньте устойчиво, стопы на ширине таза, колени слегка согнуты.',
        en: 'Place the barbell on your upper back as in a squat. Stand firmly with feet hip-width apart and knees slightly bent.',
      },
      steps: {
        ru: 'Отведите таз назад и наклонитесь вперед через тазобедренные суставы, сохраняя спину нейтральной. Опускайтесь до комфортного растяжения задней поверхности бедра, затем разогните таз и вернитесь в стойку.',
        en: 'Push your hips back and hinge forward at the hips while keeping a neutral spine. Lower to a comfortable hamstring stretch, then extend the hips to return to standing.',
      },
      keyCues: {
        ru: 'Таз назад; ребра вниз; штанга стабильно на спине.',
        en: 'Hips back; ribs down; keep the bar stable on your back.',
      },
      commonErrors: {
        ru: 'Округление спины; чрезмерный наклон без контроля; сгибание коленей как в приседе; слишком большой вес.',
        en: 'Rounding the back; leaning too far without control; bending the knees like a squat; using too much weight.',
      },
      breathing: {
        ru: 'Вдыхайте и напрягайте корпус перед наклоном, выдыхайте при возвращении вверх.',
        en: 'Inhale and brace before hinging, exhale as you return upward.',
      },
    },
    dosage: {
      strength: {
        sets: '3-5',
        reps: '4-8',
        restSec: '90-180',
      },
      hypertrophy: {
        sets: '2-4',
        reps: '6-15',
        restSec: '60-120',
      },
      endurance: {
        sets: '2-4',
        reps: '12-20',
        restSec: '30-60',
      },
    },
    safety: {
      contraindications: ['region-lower-back-pain', 'soft-tissue-hamstring-injury'],
      precautions: ['start-with-light-load', 'maintain-neutral-spine', 'avoid-forcing-depth'],
      impactLevel: 'low',
    },
    progression: {
      regressions: ['bodyweight-good-morning', 'banded-good-morning'],
      progressions: ['heavier-good-morning', 'paused-good-morning'],
      alternatives: ['romanian-deadlift', 'hip-hinge-drill'],
    },
    media: {
      images: [],
      videos: [],
      thumbnail: '',
    },
  },
  {
    id: 'lying-leg-curl',
    slug: 'lying-leg-curl',
    names: {
      ru: 'Сгибание ног лёжа',
      en: 'Lying Leg Curl',
    },
    aliases: ['lying-hamstring-curl', 'prone-leg-curl'],
    classification: {
      modality: 'strength',
      exerciseFamily: 'curl',
      movementPatterns: ['knee-flexion'],
      difficulty: 'beginner',
      equipment: ['machine'],
      bodyPosition: 'prone',
      laterality: 'bilateral',
    },
    mechanics: {
      executionMode: 'reps',
      tempo: {
        eccentric: 3,
        pauseBottom: 0,
        concentric: 1,
        pauseTop: 1,
      },
      rangeOfMotion: 'full-controlled',
      loadType: 'machine',
    },
    muscles: {
      primary: ['hamstrings'],
      secondary: ['calves'],
      stabilizers: ['glutes', 'core'],
      jointActions: ['knee-flexion'],
    },
    technique: {
      setup: {
        ru: 'Лягте на тренажер лицом вниз, валик расположите чуть выше пяток. Колени совмещены с осью тренажера, таз прижат к опоре.',
        en: 'Lie face down on the machine with the pad just above your heels. Align knees with the machine axis and keep hips pressed into the pad.',
      },
      steps: {
        ru: 'Согните ноги, подтягивая валик к ягодицам. Задержитесь на секунду в верхней точке, затем медленно опустите вес, сохраняя контроль.',
        en: 'Curl your legs by bringing the pad toward your glutes. Pause for one second at the top, then slowly lower the weight with control.',
      },
      keyCues: {
        ru: 'Таз прижат; движение только в коленях; опускайте вес медленно.',
        en: 'Keep hips down; move only at the knees; lower the weight slowly.',
      },
      commonErrors: {
        ru: 'Отрыв таза от тренажера; рывок весом; неполная амплитуда; слишком тяжелая нагрузка.',
        en: 'Hips lifting off the machine; jerking the weight; incomplete range of motion; using too much load.',
      },
      breathing: {
        ru: 'Выдыхайте при сгибании ног, вдыхайте при опускании.',
        en: 'Exhale as you curl the legs, inhale as you lower.',
      },
    },
    dosage: {
      strength: {
        sets: '2-4',
        reps: '5-8',
        restSec: '90-150',
      },
      hypertrophy: {
        sets: '2-4',
        reps: '8-12',
        restSec: '60-120',
      },
      endurance: {
        sets: '2-3',
        reps: '12-20',
        restSec: '30-60',
      },
    },
    safety: {
      contraindications: ['joint-knee-pain'],
      precautions: [
        'align-knees-with-machine-axis',
        'avoid-hip-lifting',
        'control-eccentric-phase',
      ],
      impactLevel: 'low',
    },
    progression: {
      regressions: ['lighter-lying-leg-curl', 'shorter-range-lying-leg-curl'],
      progressions: ['heavier-lying-leg-curl', 'single-leg-lying-leg-curl'],
      alternatives: ['romanian-deadlift', 'seated-leg-curl'],
    },
    media: {
      images: [],
      videos: [],
      thumbnail: '',
    },
  },
  {
    id: 'seated-leg-curl',
    slug: 'seated-leg-curl',
    names: {
      ru: 'Сгибание ног сидя',
      en: 'Seated Leg Curl',
    },
    aliases: ['seated-hamstring-curl'],
    classification: {
      modality: 'strength',
      exerciseFamily: 'curl',
      movementPatterns: ['knee-flexion'],
      difficulty: 'beginner',
      equipment: ['machine'],
      bodyPosition: 'seated',
      laterality: 'bilateral',
    },
    mechanics: {
      executionMode: 'reps',
      tempo: {
        eccentric: 3,
        pauseBottom: 0,
        concentric: 1,
        pauseTop: 1,
      },
      rangeOfMotion: 'full-controlled',
      loadType: 'machine',
    },
    muscles: {
      primary: ['hamstrings'],
      secondary: ['calves'],
      stabilizers: ['glutes', 'core'],
      jointActions: ['knee-flexion'],
    },
    technique: {
      setup: {
        ru: 'Сядьте в тренажёр, спина прижата к спинке, валик расположен над лодыжками. Зафиксируйте бёдра под упором.',
        en: 'Sit in the machine with your back against the pad. Place the roller above your ankles and secure your thighs under the support pad.',
      },
      steps: {
        ru: 'Сгибайте ноги, подтягивая валик назад. В верхней точке задержитесь, затем медленно разогните ноги.',
        en: 'Curl your legs by pulling the pad backward. Pause briefly at the top, then slowly extend your legs.',
      },
      keyCues: {
        ru: 'Таз стабилен; движение только в коленях; контролируйте опускание.',
        en: 'Keep hips stable; move only at the knees; control the descent.',
      },
      commonErrors: {
        ru: 'Отрыв таза; резкое разгибание; слишком большой вес.',
        en: 'Lifting hips off the seat; dropping the weight; using excessive load.',
      },
      breathing: {
        ru: 'Выдыхайте при сгибании, вдыхайте при разгибании.',
        en: 'Exhale while curling, inhale while extending.',
      },
    },
    dosage: {
      strength: {
        sets: '2-4',
        reps: '5-8',
        restSec: '90-150',
      },
      hypertrophy: {
        sets: '2-4',
        reps: '8-12',
        restSec: '60-120',
      },
      endurance: {
        sets: '2-3',
        reps: '12-20',
        restSec: '30-60',
      },
    },
    safety: {
      contraindications: ['joint-knee-pain'],
      precautions: ['align-knee-with-machine-axis', 'avoid-jerking-weight'],
      impactLevel: 'low',
    },
    progression: {
      regressions: ['lighter-seated-leg-curl'],
      progressions: ['single-leg-seated-curl'],
      alternatives: ['lying-leg-curl'],
    },
    media: {
      images: [],
      videos: [],
      thumbnail: '',
    },
  },
  {
    id: 'nordic-hamstring-curl',
    slug: 'nordic-hamstring-curl',
    names: {
      ru: 'Скандинавские сгибания',
      en: 'Nordic Hamstring Curl',
    },
    aliases: ['nordic-curl'],
    classification: {
      modality: 'strength',
      exerciseFamily: 'curl',
      movementPatterns: ['knee-flexion'],
      difficulty: 'advanced',
      equipment: ['bodyweight'],
      bodyPosition: 'kneeling',
      laterality: 'bilateral',
    },
    mechanics: {
      executionMode: 'reps',
      tempo: {
        eccentric: 5,
        pauseBottom: 1,
        concentric: 0,
        pauseTop: 0,
      },
      rangeOfMotion: 'full-controlled',
      loadType: 'bodyweight',
    },
    muscles: {
      primary: ['hamstrings'],
      secondary: ['glutes', 'core'],
      stabilizers: ['lower-back'],
      jointActions: ['knee-flexion', 'hip-stabilization'],
    },
    technique: {
      setup: {
        ru: 'Встаньте на колени, зафиксируйте стопы под опорой или партнёром.',
        en: 'Kneel on the floor with your ankles secured under a pad or by a partner.',
      },
      steps: {
        ru: 'Медленно наклоняйтесь вперёд, удерживая тело прямым. Контролируйте опускание максимально долго.',
        en: 'Slowly lean forward while keeping your body straight. Control the descent as long as possible.',
      },
      keyCues: {
        ru: 'Тело как единая линия; медленный контроль вниз.',
        en: 'Keep body in one line; control the descent slowly.',
      },
      commonErrors: {
        ru: 'Сгибание в тазу; падение без контроля.',
        en: 'Bending at hips; dropping without control.',
      },
      breathing: {
        ru: 'Вдыхайте перед опусканием, выдыхайте при усилии.',
        en: 'Inhale before lowering, exhale during effort.',
      },
    },
    dosage: {
      strength: {
        sets: '3-5',
        reps: '4-8',
        restSec: '90-180',
      },
      hypertrophy: {
        sets: '2-4',
        reps: '6-15',
        restSec: '60-120',
      },
      endurance: {
        sets: '2-4',
        reps: '12-20',
        restSec: '30-60',
      },
    },
    safety: {
      contraindications: ['joint-knee-pain', 'soft-tissue-hamstring-injury'],
      precautions: ['progress-gradually', 'use-assistance-if-needed'],
      impactLevel: 'low',
    },
    progression: {
      regressions: ['assisted-nordic-curl'],
      progressions: ['weighted-nordic-curl'],
      alternatives: ['lying-leg-curl'],
    },
    media: {
      images: [],
      videos: [],
      thumbnail: '',
    },
  },
  {
    id: 'barbell-glute-bridge',
    slug: 'barbell-glute-bridge',
    names: {
      ru: 'Ягодичный мост со штангой',
      en: 'Barbell Glute Bridge',
    },
    aliases: ['weighted-glute-bridge'],
    classification: {
      modality: 'strength',
      exerciseFamily: 'bridge',
      movementPatterns: ['hip-extension'],
      difficulty: 'intermediate',
      equipment: ['barbell', 'bench'],
      bodyPosition: 'supine',
      laterality: 'bilateral',
    },
    mechanics: {
      executionMode: 'reps',
      tempo: {
        eccentric: 2,
        pauseBottom: 0,
        concentric: 1,
        pauseTop: 1,
      },
      rangeOfMotion: 'full-controlled',
      loadType: 'external-load',
    },
    muscles: {
      primary: ['glutes'],
      secondary: ['hamstrings', 'core'],
      stabilizers: ['lower-back'],
      jointActions: ['hip-extension'],
    },
    technique: {
      setup: {
        ru: 'Лягте на спину, штанга на тазе, стопы на полу.',
        en: 'Lie on your back with the barbell over your hips and feet planted.',
      },
      steps: {
        ru: 'Поднимайте таз вверх до прямой линии тела, затем опускайте.',
        en: 'Drive hips upward until body forms a straight line, then lower.',
      },
      keyCues: {
        ru: 'Сжимайте ягодицы; не переразгибайте поясницу.',
        en: 'Squeeze glutes; avoid overextending lower back.',
      },
      commonErrors: {
        ru: 'Работа поясницей; неполная амплитуда.',
        en: 'Using lower back instead of glutes; partial range.',
      },
      breathing: {
        ru: 'Выдох вверх, вдох вниз.',
        en: 'Exhale up, inhale down.',
      },
    },
    dosage: {
      strength: {
        sets: '3-5',
        reps: '4-8',
        restSec: '90-180',
      },
      hypertrophy: {
        sets: '2-4',
        reps: '6-15',
        restSec: '60-120',
      },
      endurance: {
        sets: '2-4',
        reps: '12-20',
        restSec: '30-60',
      },
    },
    safety: {
      contraindications: ['region-lower-back-pain'],
      precautions: ['keep-core-braced'],
      impactLevel: 'low',
    },
    progression: {
      regressions: ['bodyweight-glute-bridge'],
      progressions: ['barbell-hip-thrust'],
      alternatives: ['hip-thrust'],
    },
    media: {
      images: [],
      videos: [],
      thumbnail: '',
    },
  },
  {
    id: 'leg-press',
    slug: 'leg-press',
    names: {
      ru: 'Жим ногами',
      en: 'Leg Press',
    },
    aliases: ['machine-leg-press', 'sled-leg-press'],
    classification: {
      modality: 'strength',
      exerciseFamily: 'press',
      movementPatterns: ['squat'],
      difficulty: 'beginner',
      equipment: ['leg-press-machine'],
      bodyPosition: 'seated',
      laterality: 'bilateral',
    },
    mechanics: {
      executionMode: 'reps',
      tempo: {
        eccentric: 3,
        pauseBottom: 1,
        concentric: 1,
        pauseTop: 0,
      },
      rangeOfMotion: 'full-controlled',
      loadType: 'machine',
    },
    muscles: {
      primary: ['quads', 'glutes'],
      secondary: ['hamstrings', 'calves'],
      stabilizers: ['core', 'hips'],
      jointActions: ['knee-extension', 'hip-extension', 'ankle-plantar-flexion'],
    },
    technique: {
      setup: {
        ru: 'Сядьте в тренажер, плотно прижмите спину и таз к спинке. Поставьте стопы на платформу примерно на ширине плеч.',
        en: 'Sit in the machine with your back and hips firmly against the pad. Place your feet on the platform about shoulder-width apart.',
      },
      steps: {
        ru: 'Снимите платформу с фиксаторов и медленно опускайте ее, сгибая колени до комфортной глубины. Выжмите платформу вверх ногами, не блокируя колени резко в верхней точке.',
        en: 'Release the platform and lower it slowly by bending your knees to a comfortable depth. Press the platform back up with your legs without forcefully locking the knees at the top.',
      },
      keyCues: {
        ru: 'Колени по линии стоп; поясница прижата; контролируйте нижнюю точку.',
        en: 'Knees track with feet; lower back stays against the pad; control the bottom position.',
      },
      commonErrors: {
        ru: 'Отрыв таза от спинки; завал коленей внутрь; слишком глубокое опускание; резкое выпрямление коленей.',
        en: 'Hips lifting off the pad; knees collapsing inward; lowering too deep; snapping the knees straight.',
      },
      breathing: {
        ru: 'Вдыхайте при опускании платформы, выдыхайте при жиме вверх.',
        en: 'Inhale as you lower the platform, exhale as you press up.',
      },
    },
    dosage: {
      strength: {
        sets: '2-4',
        reps: '5-8',
        restSec: '90-150',
      },
      hypertrophy: {
        sets: '2-4',
        reps: '8-12',
        restSec: '60-120',
      },
      endurance: {
        sets: '2-3',
        reps: '12-20',
        restSec: '30-60',
      },
    },
    safety: {
      contraindications: ['joint-knee-pain', 'region-lower-back-pain'],
      precautions: ['keep-lower-back-supported', 'control-knee-alignment', 'avoid-locking-knees'],
      impactLevel: 'low',
    },
    progression: {
      regressions: ['lighter-leg-press', 'shorter-range-leg-press'],
      progressions: ['heavier-leg-press', 'single-leg-press'],
      alternatives: ['goblet-squat', 'back-squat'],
    },
    media: {
      images: [],
      videos: [],
      thumbnail: '',
    },
  },
  {
    id: 'front-squat',
    slug: 'front-squat',
    names: {
      ru: 'Фронтальные приседания',
      en: 'Front Squats',
    },
    aliases: ['barbell-front-squat', 'front-rack-squat'],
    classification: {
      modality: 'strength',
      exerciseFamily: 'squat',
      movementPatterns: ['squat'],
      difficulty: 'intermediate',
      equipment: ['barbell'],
      bodyPosition: 'standing',
      laterality: 'bilateral',
    },
    mechanics: {
      executionMode: 'reps',
      tempo: {
        eccentric: 3,
        pauseBottom: 1,
        concentric: 1,
        pauseTop: 0,
      },
      rangeOfMotion: 'full-controlled',
      loadType: 'external-load',
    },
    muscles: {
      primary: ['quads'],
      secondary: ['glutes', 'core', 'upper-back'],
      stabilizers: ['calves', 'hips', 'upper-back'],
      jointActions: ['knee-extension', 'hip-extension', 'spine-stabilization'],
    },
    technique: {
      setup: {
        ru: 'Положите штангу на передние дельты в фронтальную стойку. Локти направьте вперед и вверх, стопы поставьте примерно на ширине плеч.',
        en: 'Place the barbell on your front deltoids in a front-rack position. Point elbows forward and up, with feet about shoulder-width apart.',
      },
      steps: {
        ru: 'Напрягите корпус и опуститесь в присед, сохраняя корпус максимально вертикальным. Колени направляйте по линии стоп, затем выжмите пол ногами и вернитесь в стойку.',
        en: 'Brace your core and lower into a squat while keeping your torso as upright as possible. Track knees in line with your feet, then drive through the floor to stand back up.',
      },
      keyCues: {
        ru: 'Локти высоко; корпус вертикальный; колени по линии носков.',
        en: 'Elbows high; torso upright; knees track over toes.',
      },
      commonErrors: {
        ru: 'Опускание локтей; завал корпуса вперед; округление спины; потеря положения штанги.',
        en: 'Dropping the elbows; torso collapsing forward; rounding the back; losing the bar position.',
      },
      breathing: {
        ru: 'Вдохните и напрягите корпус перед опусканием, выдыхайте при подъеме.',
        en: 'Inhale and brace before lowering, exhale as you stand.',
      },
    },
    dosage: {
      strength: {
        sets: '3-5',
        reps: '4-8',
        restSec: '90-180',
      },
      hypertrophy: {
        sets: '2-4',
        reps: '6-15',
        restSec: '60-120',
      },
      endurance: {
        sets: '2-4',
        reps: '12-20',
        restSec: '30-60',
      },
    },
    safety: {
      contraindications: ['joint-wrist-pain', 'joint-shoulder-impingement'],
      precautions: ['use-comfortable-front-rack', 'keep-elbows-high', 'maintain-neutral-spine'],
      impactLevel: 'medium',
    },
    progression: {
      regressions: ['goblet-squat', 'lighter-front-squat'],
      progressions: ['heavier-front-squat', 'paused-front-squat'],
      alternatives: ['back-squat', 'kettlebell-goblet-squat'],
    },
    media: {
      images: [],
      videos: [],
      thumbnail: '',
    },
  },
  {
    id: 'back-squat',
    slug: 'back-squat',
    names: {
      ru: 'Приседания со штангой на спине',
      en: 'Back Squats',
    },
    aliases: ['barbell-back-squat', 'squat'],
    classification: {
      modality: 'strength',
      exerciseFamily: 'squat',
      movementPatterns: ['squat'],
      difficulty: 'intermediate',
      equipment: ['barbell'],
      bodyPosition: 'standing',
      laterality: 'bilateral',
    },
    mechanics: {
      executionMode: 'reps',
      tempo: {
        eccentric: 3,
        pauseBottom: 1,
        concentric: 1,
        pauseTop: 0,
      },
      rangeOfMotion: 'full-controlled',
      loadType: 'external-load',
    },
    muscles: {
      primary: ['quads', 'glutes'],
      secondary: ['hamstrings', 'core', 'lower-back'],
      stabilizers: ['upper-back', 'calves', 'hips'],
      jointActions: ['knee-extension', 'hip-extension', 'spine-stabilization'],
    },
    technique: {
      setup: {
        ru: 'Разместите штангу на верхней части спины, сведите лопатки и возьмитесь за гриф устойчивым хватом. Стопы поставьте примерно на ширине плеч.',
        en: 'Place the barbell across your upper back, squeeze your shoulder blades, and grip the bar firmly. Set your feet about shoulder-width apart.',
      },
      steps: {
        ru: 'Напрягите корпус и опуститесь в присед до комфортной глубины, направляя колени по линии носков. Затем выжмите пол ногами и вернитесь в исходное положение.',
        en: 'Brace your core and lower into a squat to a comfortable depth, tracking knees over toes. Then push through the floor and return to the starting position.',
      },
      keyCues: {
        ru: 'Корпус напряжен; колени по линии стоп; штанга движется над серединой стопы.',
        en: 'Brace the torso; knees track with feet; bar stays over mid-foot.',
      },
      commonErrors: {
        ru: 'Завал коленей внутрь; округление поясницы; отрыв пяток; потеря контроля в нижней точке.',
        en: 'Knees collapsing inward; rounding the lower back; heels lifting; losing control at the bottom.',
      },
      breathing: {
        ru: 'Вдохните и напрягите корпус перед опусканием, выдыхайте при подъеме.',
        en: 'Inhale and brace before lowering, exhale as you rise.',
      },
    },
    dosage: {
      strength: {
        sets: '3-5',
        reps: '4-8',
        restSec: '90-180',
      },
      hypertrophy: {
        sets: '2-4',
        reps: '6-15',
        restSec: '60-120',
      },
      endurance: {
        sets: '2-4',
        reps: '12-20',
        restSec: '30-60',
      },
    },
    safety: {
      contraindications: ['joint-knee-pain', 'region-lower-back-pain'],
      precautions: ['use-safety-racks', 'maintain-neutral-spine', 'control-knee-alignment'],
      impactLevel: 'medium',
    },
    progression: {
      regressions: ['goblet-squat', 'box-squat'],
      progressions: ['heavier-back-squat', 'paused-back-squat'],
      alternatives: ['front-squat', 'leg-press'],
    },
    media: {
      images: [],
      videos: [],
      thumbnail: '',
    },
  },
  {
    id: 'reverse-lunge',
    slug: 'reverse-lunge',
    names: {
      ru: 'Выпады назад',
      en: 'Reverse Lunges',
    },
    aliases: ['backward-lunge', 'reverse-step-lunge'],
    classification: {
      modality: 'strength',
      exerciseFamily: 'lunge',
      movementPatterns: ['lunge'],
      difficulty: 'intermediate',
      equipment: ['bodyweight', 'dumbbells'],
      bodyPosition: 'standing',
      laterality: 'bilateral',
    },
    mechanics: {
      executionMode: 'reps',
      tempo: {
        eccentric: 2,
        pauseBottom: 1,
        concentric: 1,
        pauseTop: 0,
      },
      rangeOfMotion: 'full-controlled',
      loadType: 'bodyweight',
    },
    muscles: {
      primary: ['quads', 'glutes'],
      secondary: ['hamstrings', 'core'],
      stabilizers: ['calves', 'hips'],
      jointActions: ['hip-extension', 'knee-extension', 'hip-stabilization'],
    },
    technique: {
      setup: {
        ru: 'Встаньте прямо, стопы на ширине таза. Руки держите перед собой или возьмите гантели по бокам, если выполняете вариант с нагрузкой.',
        en: 'Stand tall with feet hip-width apart. Keep hands in front of you or hold dumbbells at your sides if using load.',
      },
      steps: {
        ru: 'Сделайте шаг назад и опуститесь в выпад до комфортной глубины, удерживая переднее колено по линии стопы. Оттолкнитесь передней ногой и вернитесь в стойку.',
        en: 'Step backward and lower into a lunge to a comfortable depth, keeping the front knee aligned with the foot. Push through the front leg to return to standing.',
      },
      keyCues: {
        ru: 'Вес на передней ноге; корпус устойчив; колено следует за носком.',
        en: 'Weight on the front leg; torso stable; knee tracks over toes.',
      },
      commonErrors: {
        ru: 'Завал переднего колена внутрь; слишком короткий шаг; падение на заднее колено; потеря баланса.',
        en: 'Front knee collapsing inward; step too short; dropping onto the back knee; losing balance.',
      },
      breathing: {
        ru: 'Вдыхайте при шаге и опускании, выдыхайте при возвращении вверх.',
        en: 'Inhale as you step and lower, exhale as you return up.',
      },
    },
    dosage: {
      strength: {
        sets: '3-5',
        reps: '4-8',
        restSec: '90-180',
      },
      hypertrophy: {
        sets: '2-4',
        reps: '6-15',
        restSec: '60-120',
      },
      endurance: {
        sets: '2-4',
        reps: '12-20',
        restSec: '30-60',
      },
    },
    safety: {
      contraindications: ['joint-knee-pain'],
      precautions: ['control-knee-alignment', 'use-comfortable-step-length', 'maintain-balance'],
      impactLevel: 'low',
    },
    progression: {
      regressions: ['assisted-reverse-lunge', 'bodyweight-reverse-lunge'],
      progressions: ['dumbbell-reverse-lunge', 'reverse-lunge-to-knee-drive'],
      alternatives: ['dumbbell-lunge', 'lateral-lunge'],
    },
    media: {
      images: [],
      videos: [],
      thumbnail: '',
    },
  },
  {
    id: 'step-ups',
    slug: 'step-ups',
    names: {
      ru: 'Шаги на платформу',
      en: 'Step-ups',
    },
    aliases: ['box-step-up', 'dumbbell-step-up'],
    classification: {
      modality: 'strength',
      exerciseFamily: 'step-up',
      movementPatterns: ['step-up'],
      difficulty: 'intermediate',
      equipment: ['box', 'dumbbells'],
      bodyPosition: 'standing',
      laterality: 'bilateral',
    },
    mechanics: {
      executionMode: 'reps',
      tempo: {
        eccentric: 2,
        pauseBottom: 0,
        concentric: 1,
        pauseTop: 0,
      },
      rangeOfMotion: 'full-controlled',
      loadType: 'external-load',
    },
    muscles: {
      primary: ['quads', 'glutes'],
      secondary: ['hamstrings', 'core'],
      stabilizers: ['calves', 'hips'],
      jointActions: ['knee-extension', 'hip-extension', 'balance'],
    },
    technique: {
      setup: {
        ru: 'Встаньте перед устойчивой платформой. Поставьте одну стопу полностью на платформу, при необходимости возьмите гантели по бокам.',
        en: 'Stand in front of a stable box or platform. Place one full foot on the platform and hold dumbbells at your sides if needed.',
      },
      steps: {
        ru: 'Оттолкнитесь верхней ногой и поднимитесь на платформу, полностью контролируя колено и таз. Медленно опуститесь обратно той же ногой и повторите.',
        en: 'Drive through the top foot and step onto the platform while controlling the knee and hips. Lower back down slowly with the same leg and repeat.',
      },
      keyCues: {
        ru: 'Работает верхняя нога; колено по линии стопы; опускайтесь медленно.',
        en: 'Use the top leg; knee tracks with the foot; lower slowly.',
      },
      commonErrors: {
        ru: 'Отталкивание нижней ногой; завал колена внутрь; слишком высокая платформа; падение вниз без контроля.',
        en: 'Pushing off with the bottom leg; knee collapsing inward; platform too high; dropping down without control.',
      },
      breathing: {
        ru: 'Выдыхайте при подъеме на платформу, вдыхайте при опускании.',
        en: 'Exhale as you step up, inhale as you lower.',
      },
    },
    dosage: {
      strength: {
        sets: '3-5',
        reps: '4-8',
        restSec: '90-180',
      },
      hypertrophy: {
        sets: '2-4',
        reps: '6-15',
        restSec: '60-120',
      },
      endurance: {
        sets: '2-4',
        reps: '12-20',
        restSec: '30-60',
      },
    },
    safety: {
      contraindications: ['joint-knee-pain'],
      precautions: [
        'use-stable-platform',
        'control-knee-alignment',
        'choose-appropriate-box-height',
      ],
      impactLevel: 'low',
    },
    progression: {
      regressions: ['lower-box-step-ups', 'bodyweight-step-ups'],
      progressions: ['dumbbell-step-ups', 'higher-box-step-ups'],
      alternatives: ['reverse-lunge', 'dumbbell-lunge'],
    },
    media: {
      images: [],
      videos: [],
      thumbnail: '',
    },
  },
  {
    id: 'leg-extensions',
    slug: 'leg-extensions',
    names: {
      ru: 'Разгибание ног в тренажёре',
      en: 'Leg Extensions',
    },
    aliases: ['machine-leg-extension', 'knee-extension-machine'],
    classification: {
      modality: 'strength',
      exerciseFamily: 'knee-extension',
      movementPatterns: ['knee-extension'],
      difficulty: 'beginner',
      equipment: ['leg-extension-machine'],
      bodyPosition: 'seated',
      laterality: 'bilateral',
    },
    mechanics: {
      executionMode: 'reps',
      tempo: {
        eccentric: 2,
        pauseBottom: 0,
        concentric: 1,
        pauseTop: 1,
      },
      rangeOfMotion: 'full-controlled',
      loadType: 'machine',
    },
    muscles: {
      primary: ['quads'],
      secondary: [],
      stabilizers: ['core', 'hip-flexors'],
      jointActions: ['knee-extension'],
    },
    technique: {
      setup: {
        ru: 'Сядьте в тренажёр, прижмите спину к спинке и расположите валик чуть выше подъёма стопы. Совместите колени с осью тренажёра.',
        en: 'Sit in the machine with your back against the pad and place the roller just above the top of your feet. Align your knees with the machine axis.',
      },
      steps: {
        ru: 'Разогните ноги вверх до контролируемого выпрямления коленей. Задержитесь на секунду в верхней точке, затем медленно опустите вес вниз без рывка.',
        en: 'Extend your legs upward until the knees are straight under control. Pause for one second at the top, then slowly lower the weight without jerking.',
      },
      keyCues: {
        ru: 'Таз прижат; движение только в коленях; верхняя точка подконтрольная.',
        en: 'Keep hips down; move only at the knees; control the top position.',
      },
      commonErrors: {
        ru: 'Рывок весом; отрыв таза от сиденья; слишком тяжелая нагрузка; резкое опускание.',
        en: 'Jerking the weight; hips lifting off the seat; using too much load; dropping the weight quickly.',
      },
      breathing: {
        ru: 'Выдыхайте при разгибании ног, вдыхайте при опускании.',
        en: 'Exhale as you extend the legs, inhale as you lower.',
      },
    },
    dosage: {
      strength: {
        sets: '2-4',
        reps: '5-8',
        restSec: '90-150',
      },
      hypertrophy: {
        sets: '2-4',
        reps: '8-12',
        restSec: '60-120',
      },
      endurance: {
        sets: '2-3',
        reps: '12-20',
        restSec: '30-60',
      },
    },
    safety: {
      contraindications: ['joint-knee-pain'],
      precautions: ['align-knees-with-machine-axis', 'avoid-jerking-weight', 'use-manageable-load'],
      impactLevel: 'low',
    },
    progression: {
      regressions: ['lighter-leg-extensions', 'shorter-range-leg-extensions'],
      progressions: ['heavier-leg-extensions', 'single-leg-extensions'],
      alternatives: ['leg-press', 'front-squat'],
    },
    media: {
      images: [],
      videos: [],
      thumbnail: '',
    },
  },
  {
    id: 'leg-adductions',
    slug: 'leg-adductions',
    names: {
      ru: 'Сведение ног в тренажёре',
      en: 'Leg Adductions',
    },
    aliases: ['seated-hip-adduction', 'adductor-machine'],
    classification: {
      modality: 'strength',
      exerciseFamily: 'hip-adduction',
      movementPatterns: ['hip-adduction'],
      difficulty: 'beginner',
      equipment: ['adductor-machine'],
      bodyPosition: 'seated',
      laterality: 'bilateral',
    },
    mechanics: {
      executionMode: 'reps',
      tempo: {
        eccentric: 2,
        pauseBottom: 0,
        concentric: 1,
        pauseTop: 1,
      },
      rangeOfMotion: 'full-controlled',
      loadType: 'machine',
    },
    muscles: {
      primary: ['adductors'],
      secondary: ['glutes'],
      stabilizers: ['core', 'hips'],
      jointActions: ['hip-adduction'],
    },
    technique: {
      setup: {
        ru: 'Сядьте в тренажёр, прижмите спину к спинке и расположите внутреннюю поверхность бедер на подушках. Выберите комфортную начальную ширину.',
        en: 'Sit in the machine with your back against the pad and place your inner thighs against the pads. Choose a comfortable starting width.',
      },
      steps: {
        ru: 'Сведите ноги вместе, напрягая приводящие мышцы. Задержитесь на секунду в конечной точке, затем медленно разведите ноги обратно без рывка.',
        en: 'Bring your legs together by squeezing the inner thighs. Pause for one second at the end, then slowly let the legs open back without jerking.',
      },
      keyCues: {
        ru: 'Корпус неподвижен; движение плавное; не форсируйте растяжение.',
        en: 'Keep torso still; move smoothly; do not force the stretch.',
      },
      commonErrors: {
        ru: 'Слишком широкая стартовая позиция; рывок ногами; отрыв таза; слишком большой вес.',
        en: 'Starting too wide; jerking the legs; hips lifting off the seat; using too much weight.',
      },
      breathing: {
        ru: 'Выдыхайте при сведении ног, вдыхайте при разведении.',
        en: 'Exhale as you bring the legs together, inhale as they open.',
      },
    },
    dosage: {
      strength: {
        sets: '2-4',
        reps: '5-8',
        restSec: '90-150',
      },
      hypertrophy: {
        sets: '2-4',
        reps: '8-12',
        restSec: '60-120',
      },
      endurance: {
        sets: '2-3',
        reps: '12-20',
        restSec: '30-60',
      },
    },
    safety: {
      contraindications: ['joint-hip-pain'],
      precautions: [
        'avoid-forcing-range',
        'control-eccentric-phase',
        'use-comfortable-start-position',
      ],
      impactLevel: 'low',
    },
    progression: {
      regressions: ['lighter-leg-adductions', 'shorter-range-leg-adductions'],
      progressions: ['heavier-leg-adductions', 'paused-leg-adductions'],
      alternatives: ['goblet-sumo-squat', 'copenhagen-plank'],
    },
    media: {
      images: [],
      videos: [],
      thumbnail: '',
    },
  },
  {
    id: 'seated-leg-abduction-machine',
    slug: 'seated-leg-abduction-machine',
    names: {
      ru: 'Разведение ног в тренажёре',
      en: 'Seated Leg Abduction Machine',
    },
    aliases: ['hip-abduction-machine', 'seated-hip-abduction'],
    classification: {
      modality: 'strength',
      exerciseFamily: 'hip-abduction',
      movementPatterns: ['hip-abduction'],
      difficulty: 'beginner',
      equipment: ['machine'],
      bodyPosition: 'seated',
      laterality: 'bilateral',
    },
    mechanics: {
      executionMode: 'reps',
      tempo: {
        eccentric: 2,
        pauseBottom: 0,
        concentric: 1,
        pauseTop: 1,
      },
      rangeOfMotion: 'full-controlled',
      loadType: 'machine',
    },
    muscles: {
      primary: ['adductors'],
      secondary: ['glutes', 'core'],
      stabilizers: ['hips'],
      jointActions: ['hip-abduction'],
    },
    technique: {
      setup: {
        ru: 'Сядьте в тренажёр, прижмите спину к спинке и разместите внешнюю поверхность бедер на подушках. Выберите комфортную начальную позицию.',
        en: 'Sit in the machine with your back against the pad and place the outside of your thighs against the pads. Choose a comfortable starting position.',
      },
      steps: {
        ru: 'Разведите ноги в стороны с контролем и задержитесь на секунду в конечной точке. Затем медленно верните ноги к центру, не отпуская вес резко.',
        en: 'Push your legs outward with control and pause for one second at the end range. Then slowly bring the legs back toward center without letting the weight drop.',
      },
      keyCues: {
        ru: 'Корпус стабилен; движение от бедра; возвращайте вес медленно.',
        en: 'Keep torso stable; move from the hips; return the weight slowly.',
      },
      commonErrors: {
        ru: 'Раскачивание корпусом; слишком большой вес; рывок в конечной точке; чрезмерная амплитуда через дискомфорт.',
        en: 'Rocking the torso; using too much weight; jerking at the end range; forcing range through discomfort.',
      },
      breathing: {
        ru: 'Выдыхайте при разведении ног, вдыхайте при возвращении.',
        en: 'Exhale as you push the legs outward, inhale as they return.',
      },
    },
    dosage: {
      strength: {
        sets: '2-4',
        reps: '5-8',
        restSec: '90-150',
      },
      hypertrophy: {
        sets: '2-4',
        reps: '8-12',
        restSec: '60-120',
      },
      endurance: {
        sets: '2-3',
        reps: '12-20',
        restSec: '30-60',
      },
    },
    safety: {
      contraindications: ['joint-hip-pain', 'joint-knee-pain'],
      precautions: ['avoid-forcing-range', 'keep-pelvis-stable', 'use-manageable-load'],
      impactLevel: 'low',
    },
    progression: {
      regressions: [
        'lighter-seated-leg-abduction-machine',
        'shorter-range-seated-leg-abduction-machine',
      ],
      progressions: ['heavier-seated-leg-abduction-machine', 'paused-seated-leg-abduction-machine'],
      alternatives: ['banded-lateral-walks', 'banded-clamshells'],
    },
    media: {
      images: [],
      videos: [],
      thumbnail: '',
    },
  },
  {
    id: 'seated-calf-raise',
    slug: 'seated-calf-raise',
    names: {
      ru: 'Подъёмы на носки сидя',
      en: 'Seated Calf Raise',
    },
    aliases: ['seated-machine-calf-raise', 'soleus-calf-raise'],
    classification: {
      modality: 'strength',
      exerciseFamily: 'raise',
      movementPatterns: ['plantar-flexion'],
      difficulty: 'beginner',
      equipment: ['machine'],
      bodyPosition: 'seated',
      laterality: 'bilateral',
    },
    mechanics: {
      executionMode: 'reps',
      tempo: {
        eccentric: 3,
        pauseBottom: 0,
        concentric: 1,
        pauseTop: 1,
      },
      rangeOfMotion: 'full-controlled',
      loadType: 'machine',
    },
    muscles: {
      primary: ['soleus'],
      secondary: ['gastrocnemius'],
      stabilizers: ['feet'],
      jointActions: ['ankle-plantar-flexion'],
    },
    technique: {
      setup: {
        ru: 'Сядьте в тренажёр, поставьте носки стоп на платформу, пятки свободны. Подушки должны лежать на бедрах выше коленей.',
        en: 'Sit in the machine with the balls of your feet on the platform and heels free. The pads should rest on your thighs above the knees.',
      },
      steps: {
        ru: 'Поднимите пятки максимально высоко, сокращая икры. Задержитесь на секунду вверху, затем медленно опустите пятки вниз до комфортного растяжения.',
        en: 'Raise your heels as high as possible by contracting the calves. Pause for one second at the top, then slowly lower the heels to a comfortable stretch.',
      },
      keyCues: {
        ru: 'Полная амплитуда; пауза вверху; опускайтесь медленно.',
        en: 'Use full range; pause at the top; lower slowly.',
      },
      commonErrors: {
        ru: 'Пружинящие повторения; неполный подъем; слишком тяжелый вес; завал стоп внутрь или наружу.',
        en: 'Bouncy reps; incomplete raise; using too much weight; feet rolling inward or outward.',
      },
      breathing: {
        ru: 'Выдыхайте при подъеме на носки, вдыхайте при опускании.',
        en: 'Exhale as you rise onto the toes, inhale as you lower.',
      },
    },
    dosage: {
      strength: {
        sets: '2-4',
        reps: '5-8',
        restSec: '90-150',
      },
      hypertrophy: {
        sets: '2-4',
        reps: '8-12',
        restSec: '60-120',
      },
      endurance: {
        sets: '2-3',
        reps: '12-20',
        restSec: '30-60',
      },
    },
    safety: {
      contraindications: ['joint-ankle-pain', 'tendon-achilles-tendinopathy'],
      precautions: ['avoid-bouncing', 'control-bottom-stretch', 'keep-feet-aligned'],
      impactLevel: 'low',
    },
    progression: {
      regressions: ['lighter-seated-calf-raise', 'bodyweight-seated-calf-raise'],
      progressions: ['heavier-seated-calf-raise', 'single-leg-seated-calf-raise'],
      alternatives: ['standing-calf-raise-machine', 'bodyweight-calf-raise'],
    },
    media: {
      images: [],
      videos: [],
      thumbnail: '',
    },
  },
  {
    id: 'standing-calf-raise-machine',
    slug: 'standing-calf-raise-machine',
    names: {
      ru: 'Подъёмы на носки в тренажёре стоя',
      en: 'Standing Calf Raise Machine',
    },
    aliases: ['standing-machine-calf-raise', 'machine-standing-calf-raise'],
    classification: {
      modality: 'strength',
      exerciseFamily: 'raise',
      movementPatterns: ['plantar-flexion'],
      difficulty: 'beginner',
      equipment: ['machine'],
      bodyPosition: 'standing',
      laterality: 'bilateral',
    },
    mechanics: {
      executionMode: 'reps',
      tempo: {
        eccentric: 3,
        pauseBottom: 1,
        concentric: 1,
        pauseTop: 1,
      },
      rangeOfMotion: 'full-controlled',
      loadType: 'machine',
    },
    muscles: {
      primary: ['gastrocnemius'],
      secondary: ['soleus'],
      stabilizers: ['feet', 'core'],
      jointActions: ['ankle-plantar-flexion'],
    },
    technique: {
      setup: {
        ru: 'Встаньте в тренажёр, расположите плечи под подушками, носки стоп поставьте на платформу, пятки оставьте свободными.',
        en: 'Stand in the machine with your shoulders under the pads, balls of the feet on the platform, and heels free.',
      },
      steps: {
        ru: 'Поднимитесь на носки как можно выше и задержитесь на секунду. Затем медленно опустите пятки ниже уровня платформы до комфортного растяжения и повторите.',
        en: 'Rise onto your toes as high as possible and pause for one second. Then slowly lower your heels below platform level to a comfortable stretch and repeat.',
      },
      keyCues: {
        ru: 'Колени мягко выпрямлены; пятки движутся вертикально; не пружиньте.',
        en: 'Keep knees softly straight; heels move vertically; do not bounce.',
      },
      commonErrors: {
        ru: 'Рывки внизу; неполная амплитуда; сгибание коленей для помощи; завал стоп.',
        en: 'Bouncing at the bottom; partial range of motion; bending knees to assist; feet rolling in or out.',
      },
      breathing: {
        ru: 'Выдыхайте при подъеме, вдыхайте при медленном опускании.',
        en: 'Exhale as you rise, inhale as you lower slowly.',
      },
    },
    dosage: {
      strength: {
        sets: '2-4',
        reps: '5-8',
        restSec: '90-150',
      },
      hypertrophy: {
        sets: '2-4',
        reps: '8-12',
        restSec: '60-120',
      },
      endurance: {
        sets: '2-3',
        reps: '12-20',
        restSec: '30-60',
      },
    },
    safety: {
      contraindications: ['joint-ankle-pain', 'tendon-achilles-tendinopathy'],
      precautions: ['avoid-bouncing', 'control-bottom-stretch', 'keep-feet-aligned'],
      impactLevel: 'low',
    },
    progression: {
      regressions: ['lighter-standing-calf-raise-machine', 'bodyweight-calf-raise'],
      progressions: ['heavier-standing-calf-raise-machine', 'single-leg-standing-calf-raise'],
      alternatives: ['seated-calf-raise', 'standing-dumbbell-calf-raise'],
    },
    media: {
      images: [],
      videos: [],
      thumbnail: '',
    },
  },
  {
    id: 'standing-barbell-press',
    slug: 'standing-barbell-press',
    names: {
      ru: 'Жим штанги стоя',
      en: 'Standing Barbell Press (Military Press)',
    },
    aliases: ['military-press', 'overhead-barbell-press'],
    classification: {
      modality: 'strength',
      exerciseFamily: 'press',
      movementPatterns: ['vertical-push'],
      difficulty: 'intermediate',
      equipment: ['barbell'],
      bodyPosition: 'standing',
      laterality: 'bilateral',
    },
    mechanics: {
      executionMode: 'reps',
      tempo: {
        eccentric: 2,
        pauseBottom: 0,
        concentric: 1,
        pauseTop: 0,
      },
      rangeOfMotion: 'full-controlled',
      loadType: 'external-load',
    },
    muscles: {
      primary: ['shoulders'],
      secondary: ['triceps', 'core'],
      stabilizers: ['glutes', 'upper-back'],
      jointActions: ['shoulder-flexion', 'elbow-extension', 'spine-stabilization'],
    },
    technique: {
      setup: {
        ru: 'Встаньте прямо, стопы примерно на ширине таза. Возьмите штангу хватом чуть шире плеч и удерживайте ее на верхней части груди.',
        en: 'Stand tall with feet about hip-width apart. Grip the barbell slightly wider than shoulder-width and hold it at the upper chest.',
      },
      steps: {
        ru: 'Напрягите корпус и ягодицы, затем выжмите штангу вверх над головой. В верхней точке зафиксируйте штангу над серединой стопы, затем опустите ее к груди под контролем.',
        en: 'Brace your core and glutes, then press the barbell overhead. At the top, lock the bar over mid-foot, then lower it back to the chest with control.',
      },
      keyCues: {
        ru: 'Корпус жесткий; штанга идет близко к лицу; не прогибайтесь в пояснице.',
        en: 'Keep the torso rigid; move the bar close to the face; avoid arching the lower back.',
      },
      commonErrors: {
        ru: 'Чрезмерный прогиб в пояснице; выведение штанги вперед; расслабленный корпус; неполная амплитуда.',
        en: 'Excessive lower-back arch; bar drifting forward; loose torso; incomplete range of motion.',
      },
      breathing: {
        ru: 'Вдохните и напрягите корпус перед жимом, выдыхайте после прохождения сложной части подъема.',
        en: 'Inhale and brace before pressing, then exhale after passing the hardest part of the lift.',
      },
    },
    dosage: {
      strength: {
        sets: '3-5',
        reps: '4-8',
        restSec: '90-180',
      },
      hypertrophy: {
        sets: '2-4',
        reps: '6-15',
        restSec: '60-120',
      },
      endurance: {
        sets: '2-4',
        reps: '12-20',
        restSec: '30-60',
      },
    },
    safety: {
      contraindications: ['joint-shoulder-impingement', 'region-lower-back-pain'],
      precautions: ['avoid-lumbar-overextension', 'keep-bar-path-close', 'use-manageable-load'],
      impactLevel: 'low',
    },
    progression: {
      regressions: ['seated-dumbbell-press', 'lighter-standing-barbell-press'],
      progressions: ['heavier-standing-barbell-press', 'paused-standing-barbell-press'],
      alternatives: ['dumbbell-overhead-press', 'seated-dumbbell-press'],
    },
    media: {
      images: [],
      videos: [],
      thumbnail: '',
    },
  },
  {
    id: 'seated-dumbbell-press',
    slug: 'seated-dumbbell-press',
    names: {
      ru: 'Жим гантелей сидя',
      en: 'Seated Dumbbell Press',
    },
    aliases: ['seated-db-press', 'seated-dumbbell-shoulder-press'],
    classification: {
      modality: 'strength',
      exerciseFamily: 'press',
      movementPatterns: ['vertical-push'],
      difficulty: 'beginner',
      equipment: ['dumbbell'],
      bodyPosition: 'seated',
      laterality: 'bilateral',
    },
    mechanics: {
      executionMode: 'reps',
      tempo: {
        eccentric: 2,
        pauseBottom: 0,
        concentric: 1,
        pauseTop: 0,
      },
      rangeOfMotion: 'full-controlled',
      loadType: 'external-load',
    },
    muscles: {
      primary: ['shoulders'],
      secondary: ['triceps'],
      stabilizers: ['core', 'upper-back'],
      jointActions: ['shoulder-flexion', 'shoulder-abduction', 'elbow-extension'],
    },
    technique: {
      setup: {
        ru: 'Сядьте на скамью с опорой для спины, стопы поставьте на пол. Поднимите гантели к уровню плеч, ладони направлены вперед или слегка внутрь.',
        en: 'Sit on a bench with back support and place your feet on the floor. Bring the dumbbells to shoulder level with palms facing forward or slightly inward.',
      },
      steps: {
        ru: 'Выжмите гантели вверх до контролируемого выпрямления рук. Не сталкивайте гантели вверху, затем медленно опустите их обратно к уровню плеч.',
        en: 'Press the dumbbells upward until the arms are straight under control. Do not bang the dumbbells together at the top, then slowly lower them back to shoulder level.',
      },
      keyCues: {
        ru: 'Плечи вниз; запястья над локтями; движение симметричное.',
        en: 'Keep shoulders down; wrists over elbows; move symmetrically.',
      },
      commonErrors: {
        ru: 'Прогиб в пояснице; слишком глубокое опускание; разведение локтей без контроля; столкновение гантелей вверху.',
        en: 'Arching the lower back; lowering too deep; uncontrolled elbow flare; banging dumbbells together at the top.',
      },
      breathing: {
        ru: 'Выдыхайте при жиме вверх, вдыхайте при опускании.',
        en: 'Exhale as you press up, inhale as you lower.',
      },
    },
    dosage: {
      strength: {
        sets: '2-4',
        reps: '5-8',
        restSec: '90-150',
      },
      hypertrophy: {
        sets: '2-4',
        reps: '8-12',
        restSec: '60-120',
      },
      endurance: {
        sets: '2-3',
        reps: '12-20',
        restSec: '30-60',
      },
    },
    safety: {
      contraindications: ['joint-shoulder-impingement'],
      precautions: ['use-back-support', 'control-bottom-range', 'keep-wrists-neutral'],
      impactLevel: 'low',
    },
    progression: {
      regressions: ['lighter-seated-dumbbell-press', 'single-arm-seated-dumbbell-press'],
      progressions: ['heavier-seated-dumbbell-press', 'standing-dumbbell-overhead-press'],
      alternatives: ['dumbbell-overhead-press', 'standing-barbell-press'],
    },
    media: {
      images: [],
      videos: [],
      thumbnail: '',
    },
  },
  {
    id: 'barbell-upright-row',
    slug: 'barbell-upright-row',
    names: {
      ru: 'Тяга штанги к подбородку',
      en: 'Barbell Upright Row',
    },
    aliases: ['upright-row', 'barbell-high-pull-row'],
    classification: {
      modality: 'strength',
      exerciseFamily: 'row',
      movementPatterns: ['vertical-pull'],
      difficulty: 'intermediate',
      equipment: ['barbell'],
      bodyPosition: 'standing',
      laterality: 'bilateral',
    },
    mechanics: {
      executionMode: 'reps',
      tempo: {
        eccentric: 2,
        pauseBottom: 0,
        concentric: 1,
        pauseTop: 0,
      },
      rangeOfMotion: 'full-controlled',
      loadType: 'external-load',
    },
    muscles: {
      primary: ['traps'],
      secondary: ['shoulders', 'biceps'],
      stabilizers: ['core', 'forearms', 'upper-back'],
      jointActions: ['shoulder-abduction', 'elbow-flexion', 'scapular-elevation'],
    },
    technique: {
      setup: {
        ru: 'Встаньте прямо и возьмите штангу хватом примерно на ширине плеч или чуть шире. Штанга находится перед бедрами.',
        en: 'Stand tall and grip the barbell about shoulder-width or slightly wider. Hold the bar in front of your thighs.',
      },
      steps: {
        ru: 'Потяните штангу вверх вдоль корпуса, ведя локтями. Поднимайте только до комфортной высоты, обычно до уровня нижней части груди или плеч, затем медленно опустите.',
        en: 'Pull the bar upward along the body, leading with the elbows. Raise only to a comfortable height, usually lower chest or shoulder level, then lower slowly.',
      },
      keyCues: {
        ru: 'Локти ведут движение; штанга близко к телу; не тяните выше комфортной амплитуды.',
        en: 'Elbows lead the movement; bar stays close to the body; do not pull above a comfortable range.',
      },
      commonErrors: {
        ru: 'Подъем слишком высоко; узкий болезненный хват; поднятие плеч к ушам с болью; рывки корпусом.',
        en: 'Pulling too high; painfully narrow grip; shrugging into discomfort; jerking with the torso.',
      },
      breathing: {
        ru: 'Выдыхайте при подъеме штанги, вдыхайте при опускании.',
        en: 'Exhale as you lift the bar, inhale as you lower.',
      },
    },
    dosage: {
      strength: {
        sets: '3-5',
        reps: '4-8',
        restSec: '90-180',
      },
      hypertrophy: {
        sets: '2-4',
        reps: '6-15',
        restSec: '60-120',
      },
      endurance: {
        sets: '2-4',
        reps: '12-20',
        restSec: '30-60',
      },
    },
    safety: {
      contraindications: ['joint-shoulder-impingement', 'joint-wrist-pain'],
      precautions: [
        'avoid-excessive-height',
        'use-comfortable-grip-width',
        'control-shoulder-position',
      ],
      impactLevel: 'low',
    },
    progression: {
      regressions: ['dumbbell-upright-row', 'lighter-barbell-upright-row'],
      progressions: ['heavier-barbell-upright-row', 'paused-barbell-upright-row'],
      alternatives: ['dumbbell-lateral-raise', 'face-pull'],
    },
    media: {
      images: [],
      videos: [],
      thumbnail: '',
    },
  },
  {
    id: 'bent-over-dumbbell-rear-delt-raise',
    slug: 'bent-over-dumbbell-rear-delt-raise',
    names: {
      ru: 'Махи гантелями в наклоне',
      en: 'Bent-Over Dumbbell Rear Delt Raise',
    },
    aliases: ['bent-over-rear-delt-fly', 'dumbbell-rear-delt-raise'],
    classification: {
      modality: 'strength',
      exerciseFamily: 'raise',
      movementPatterns: ['horizontal-pull'],
      difficulty: 'intermediate',
      equipment: ['dumbbell'],
      bodyPosition: 'standing',
      laterality: 'bilateral',
    },
    mechanics: {
      executionMode: 'reps',
      tempo: {
        eccentric: 2,
        pauseBottom: 0,
        concentric: 1,
        pauseTop: 1,
      },
      rangeOfMotion: 'full-controlled',
      loadType: 'external-load',
    },
    muscles: {
      primary: ['rear-delts'],
      secondary: ['traps', 'rhomboids'],
      stabilizers: ['core', 'lower-back', 'upper-back'],
      jointActions: ['shoulder-horizontal-abduction', 'scapular-retraction'],
    },
    technique: {
      setup: {
        ru: 'Возьмите гантели и наклонитесь вперед через таз, сохраняя нейтральную спину. Руки опущены вниз, локти слегка согнуты.',
        en: 'Hold dumbbells and hinge forward at the hips while keeping a neutral spine. Let the arms hang down with elbows slightly bent.',
      },
      steps: {
        ru: 'Разведите гантели в стороны до уровня плеч или комфортной высоты, ощущая работу задних дельт. Задержитесь на секунду и медленно опустите гантели вниз.',
        en: 'Raise the dumbbells out to the sides to shoulder level or a comfortable height, focusing on the rear delts. Pause for one second and lower slowly.',
      },
      keyCues: {
        ru: 'Локти мягко согнуты; шея нейтральна; движение без рывка.',
        en: 'Keep elbows softly bent; neck neutral; move without jerking.',
      },
      commonErrors: {
        ru: 'Раскачивание корпусом; слишком тяжелые гантели; подъем плеч к ушам; округление поясницы.',
        en: 'Swinging the torso; using dumbbells that are too heavy; shrugging shoulders toward ears; rounding the lower back.',
      },
      breathing: {
        ru: 'Выдыхайте при разведении гантелей, вдыхайте при опускании.',
        en: 'Exhale as you raise the dumbbells, inhale as you lower.',
      },
    },
    dosage: {
      strength: {
        sets: '3-5',
        reps: '4-8',
        restSec: '90-180',
      },
      hypertrophy: {
        sets: '2-4',
        reps: '6-15',
        restSec: '60-120',
      },
      endurance: {
        sets: '2-4',
        reps: '12-20',
        restSec: '30-60',
      },
    },
    safety: {
      contraindications: ['region-lower-back-pain', 'joint-shoulder-impingement'],
      precautions: ['maintain-neutral-spine', 'use-light-to-moderate-load', 'avoid-shrugging'],
      impactLevel: 'low',
    },
    progression: {
      regressions: [
        'chest-supported-rear-delt-raise',
        'lighter-bent-over-dumbbell-rear-delt-raise',
      ],
      progressions: [
        'heavier-bent-over-dumbbell-rear-delt-raise',
        'paused-bent-over-dumbbell-rear-delt-raise',
      ],
      alternatives: ['reverse-pec-deck', 'face-pull'],
    },
    media: {
      images: [],
      videos: [],
      thumbnail: '',
    },
  },
  {
    id: 'reverse-pec-deck',
    slug: 'reverse-pec-deck',
    names: {
      ru: 'Разведения в тренажёре обратная бабочка',
      en: 'Reverse Pec Deck (Rear Delt Fly)',
    },
    aliases: ['rear-delt-fly-machine', 'reverse-fly-machine'],
    classification: {
      modality: 'strength',
      exerciseFamily: 'rear-delt-fly',
      movementPatterns: ['horizontal-pull'],
      difficulty: 'beginner',
      equipment: ['machine'],
      bodyPosition: 'seated',
      laterality: 'bilateral',
    },
    mechanics: {
      executionMode: 'reps',
      tempo: {
        eccentric: 2,
        pauseBottom: 0,
        concentric: 1,
        pauseTop: 1,
      },
      rangeOfMotion: 'full-controlled',
      loadType: 'machine',
    },
    muscles: {
      primary: ['rear-delts'],
      secondary: ['traps', 'rhomboids'],
      stabilizers: ['core', 'upper-back'],
      jointActions: ['shoulder-horizontal-abduction', 'scapular-retraction'],
    },
    technique: {
      setup: {
        ru: 'Сядьте лицом к спинке тренажёра и возьмитесь за рукояти. Отрегулируйте сиденье так, чтобы руки двигались примерно на уровне плеч.',
        en: 'Sit facing the machine pad and hold the handles. Adjust the seat so your arms move roughly at shoulder height.',
      },
      steps: {
        ru: 'Разведите рукояти назад и в стороны, удерживая локти слегка согнутыми. Задержитесь на секунду в конечной точке, затем медленно верните рукояти вперед.',
        en: 'Pull the handles back and out while keeping elbows slightly bent. Pause for one second at the end range, then slowly return the handles forward.',
      },
      keyCues: {
        ru: 'Руки на уровне плеч; локти мягкие; не поднимайте плечи к ушам.',
        en: 'Arms at shoulder height; elbows soft; keep shoulders away from ears.',
      },
      commonErrors: {
        ru: 'Слишком тяжелый вес; рывок корпусом; чрезмерное сведение лопаток вместо работы задних дельт; поднятые плечи.',
        en: 'Using too much weight; jerking with the torso; over-squeezing the shoulder blades instead of using rear delts; shrugging.',
      },
      breathing: {
        ru: 'Выдыхайте при разведении рукоятей, вдыхайте при возвращении.',
        en: 'Exhale as you pull the handles back, inhale as you return.',
      },
    },
    dosage: {
      strength: {
        sets: '2-4',
        reps: '5-8',
        restSec: '90-150',
      },
      hypertrophy: {
        sets: '2-4',
        reps: '8-12',
        restSec: '60-120',
      },
      endurance: {
        sets: '2-3',
        reps: '12-20',
        restSec: '30-60',
      },
    },
    safety: {
      contraindications: ['joint-shoulder-impingement'],
      precautions: ['use-manageable-load', 'avoid-shrugging', 'control-return-phase'],
      impactLevel: 'low',
    },
    progression: {
      regressions: ['lighter-reverse-pec-deck', 'shorter-range-reverse-pec-deck'],
      progressions: ['heavier-reverse-pec-deck', 'paused-reverse-pec-deck'],
      alternatives: ['bent-over-dumbbell-rear-delt-raise', 'face-pull'],
    },
    media: {
      images: [],
      videos: [],
      thumbnail: '',
    },
  },
  {
    id: 'dumbbell-shrugs',
    slug: 'dumbbell-shrugs',
    names: {
      ru: 'Шраги с гантелями',
      en: 'Dumbbell Shrugs',
    },
    aliases: ['db-shrugs', 'dumbbell-trap-shrugs'],
    classification: {
      modality: 'strength',
      exerciseFamily: 'shrug',
      movementPatterns: ['scapular-elevation'],
      difficulty: 'beginner',
      equipment: ['dumbbell'],
      bodyPosition: 'standing',
      laterality: 'bilateral',
    },
    mechanics: {
      executionMode: 'reps',
      tempo: {
        eccentric: 2,
        pauseBottom: 0,
        concentric: 1,
        pauseTop: 1,
      },
      rangeOfMotion: 'full-controlled',
      loadType: 'external-load',
    },
    muscles: {
      primary: ['traps'],
      secondary: ['forearms'],
      stabilizers: ['core', 'shoulders', 'upper-back'],
      jointActions: ['scapular-elevation'],
    },
    technique: {
      setup: {
        ru: 'Встаньте прямо, удерживая гантели по бокам корпуса. Стопы на ширине таза, руки прямые, шея нейтральна.',
        en: 'Stand tall holding dumbbells at your sides. Keep feet hip-width apart, arms straight, and neck neutral.',
      },
      steps: {
        ru: 'Поднимите плечи строго вверх к ушам без вращения. Задержитесь на секунду в верхней точке, затем медленно опустите плечи вниз под контролем.',
        en: 'Shrug your shoulders straight up toward your ears without rolling them. Pause for one second at the top, then slowly lower the shoulders with control.',
      },
      keyCues: {
        ru: 'Плечи вверх и вниз; шея длинная; не вращайте плечами.',
        en: 'Shoulders up and down; keep the neck long; do not roll the shoulders.',
      },
      commonErrors: {
        ru: 'Вращение плечами; запрокидывание головы; рывки корпусом; слишком тяжелые гантели.',
        en: 'Rolling the shoulders; throwing the head back; jerking the torso; using dumbbells that are too heavy.',
      },
      breathing: {
        ru: 'Выдыхайте при подъеме плеч, вдыхайте при опускании.',
        en: 'Exhale as you shrug up, inhale as you lower.',
      },
    },
    dosage: {
      strength: {
        sets: '2-4',
        reps: '5-8',
        restSec: '90-150',
      },
      hypertrophy: {
        sets: '2-4',
        reps: '8-12',
        restSec: '60-120',
      },
      endurance: {
        sets: '2-3',
        reps: '12-20',
        restSec: '30-60',
      },
    },
    safety: {
      contraindications: ['region-neck-pain', 'joint-shoulder-impingement'],
      precautions: ['avoid-shoulder-rolling', 'keep-neck-neutral', 'use-manageable-load'],
      impactLevel: 'low',
    },
    progression: {
      regressions: ['lighter-dumbbell-shrugs', 'bodyweight-scapular-shrug'],
      progressions: ['heavier-dumbbell-shrugs', 'paused-dumbbell-shrugs'],
      alternatives: ['barbell-shrugs', 'farmer-carry'],
    },
    media: {
      images: [],
      videos: [],
      thumbnail: '',
    },
  },
  {
    id: 'barbell-shrugs',
    slug: 'barbell-shrugs',
    names: {
      ru: 'Шраги со штангой',
      en: 'Barbell Shrugs',
    },
    aliases: ['barbell-trap-shrugs', 'standing-barbell-shrug'],
    classification: {
      modality: 'strength',
      exerciseFamily: 'shrug',
      movementPatterns: ['scapular-elevation'],
      difficulty: 'beginner',
      equipment: ['barbell'],
      bodyPosition: 'standing',
      laterality: 'bilateral',
    },
    mechanics: {
      executionMode: 'reps',
      tempo: {
        eccentric: 2,
        pauseBottom: 0,
        concentric: 1,
        pauseTop: 1,
      },
      rangeOfMotion: 'full-controlled',
      loadType: 'external-load',
    },
    muscles: {
      primary: ['traps'],
      secondary: ['forearms'],
      stabilizers: ['core', 'shoulders', 'upper-back'],
      jointActions: ['scapular-elevation'],
    },
    technique: {
      setup: {
        ru: 'Встаньте прямо, удерживая штангу перед бедрами хватом сверху. Стопы на ширине таза, руки прямые, корпус устойчив.',
        en: 'Stand tall holding the barbell in front of your thighs with an overhand grip. Keep feet hip-width apart, arms straight, and torso stable.',
      },
      steps: {
        ru: 'Поднимите плечи строго вверх, не сгибая локти и не вращая плечами. Задержитесь в верхней точке, затем медленно опустите плечи вниз.',
        en: 'Shrug your shoulders straight up without bending the elbows or rolling the shoulders. Pause at the top, then slowly lower the shoulders.',
      },
      keyCues: {
        ru: 'Штанга близко к телу; плечи движутся вертикально; шея нейтральна.',
        en: 'Keep the bar close to the body; shoulders move vertically; neck stays neutral.',
      },
      commonErrors: {
        ru: 'Вращение плеч; сгибание локтей; рывок корпусом; запрокидывание головы.',
        en: 'Rolling the shoulders; bending the elbows; jerking with the torso; throwing the head back.',
      },
      breathing: {
        ru: 'Выдыхайте при подъеме плеч, вдыхайте при опускании.',
        en: 'Exhale as you shrug up, inhale as you lower.',
      },
    },
    dosage: {
      strength: {
        sets: '2-4',
        reps: '5-8',
        restSec: '90-150',
      },
      hypertrophy: {
        sets: '2-4',
        reps: '8-12',
        restSec: '60-120',
      },
      endurance: {
        sets: '2-3',
        reps: '12-20',
        restSec: '30-60',
      },
    },
    safety: {
      contraindications: ['region-neck-pain', 'joint-shoulder-impingement'],
      precautions: ['avoid-shoulder-rolling', 'keep-neck-neutral', 'use-manageable-load'],
      impactLevel: 'low',
    },
    progression: {
      regressions: ['lighter-barbell-shrugs', 'dumbbell-shrugs'],
      progressions: ['heavier-barbell-shrugs', 'paused-barbell-shrugs'],
      alternatives: ['dumbbell-shrugs', 'farmer-carry'],
    },
    media: {
      images: [],
      videos: [],
      thumbnail: '',
    },
  },
  {
    id: 'face-pull-band',
    slug: 'face-pull-band',
    names: {
      ru: 'Face Pull с резинкой',
      en: 'Face Pull with Band',
    },
    aliases: ['band-face-pull', 'resistance-band-face-pull'],
    classification: {
      modality: 'strength',
      exerciseFamily: 'face-pull',
      movementPatterns: ['horizontal-pull'],
      difficulty: 'beginner',
      equipment: ['resistance-band'],
      bodyPosition: 'standing',
      laterality: 'bilateral',
    },
    mechanics: {
      executionMode: 'reps',
      tempo: {
        eccentric: 2,
        pauseBottom: 0,
        concentric: 1,
        pauseTop: 1,
      },
      rangeOfMotion: 'full-controlled',
      loadType: 'elastic-resistance',
    },
    muscles: {
      primary: ['rear-delts', 'upper-back'],
      secondary: ['rotator-cuff', 'traps'],
      stabilizers: ['core', 'upper-back'],
      jointActions: [
        'shoulder-horizontal-abduction',
        'shoulder-external-rotation',
        'scapular-retraction',
      ],
    },
    technique: {
      setup: {
        ru: 'Закрепите резинку примерно на уровне лица и возьмитесь за ее концы. Встаньте устойчиво, руки вытянуты перед собой.',
        en: 'Anchor the band around face height and hold its ends. Stand firmly with arms extended in front of you.',
      },
      steps: {
        ru: 'Тяните резинку к лицу, разводя локти в стороны и слегка поворачивая плечи наружу. Задержитесь на секунду, затем медленно верните руки вперед.',
        en: 'Pull the band toward your face, spreading elbows out and slightly rotating the shoulders outward. Pause for one second, then slowly return the arms forward.',
      },
      keyCues: {
        ru: 'Локти высоко; кисти к лицу; лопатки мягко назад.',
        en: 'Elbows high; hands toward the face; shoulder blades gently back.',
      },
      commonErrors: {
        ru: 'Прогиб в пояснице; тяга вниз к груди; поднятие плеч к ушам; слишком сильное натяжение резинки.',
        en: 'Arching the lower back; pulling down toward the chest; shrugging shoulders to ears; using too much band tension.',
      },
      breathing: {
        ru: 'Выдыхайте при тяге к лицу, вдыхайте при возвращении.',
        en: 'Exhale as you pull toward the face, inhale as you return.',
      },
    },
    dosage: {
      strength: {
        sets: '2-4',
        reps: '5-8',
        restSec: '90-150',
      },
      hypertrophy: {
        sets: '2-4',
        reps: '8-12',
        restSec: '60-120',
      },
      endurance: {
        sets: '2-3',
        reps: '12-20',
        restSec: '30-60',
      },
    },
    safety: {
      contraindications: ['joint-shoulder-impingement'],
      precautions: ['use-light-band-tension', 'avoid-shrugging', 'control-return-phase'],
      impactLevel: 'low',
    },
    progression: {
      regressions: ['lighter-band-face-pull', 'shorter-range-face-pull-band'],
      progressions: ['stronger-band-face-pull', 'paused-face-pull-band'],
      alternatives: ['face-pull-cable', 'reverse-pec-deck'],
    },
    media: {
      images: [],
      videos: [],
      thumbnail: '',
    },
  },
  {
    id: 'face-pull-cable',
    slug: 'face-pull-cable',
    names: {
      ru: 'Face Pull в кроссовере',
      en: 'Face Pull in Crossover',
    },
    aliases: ['cable-face-pull', 'rope-face-pull'],
    classification: {
      modality: 'strength',
      exerciseFamily: 'face-pull',
      movementPatterns: ['horizontal-pull'],
      difficulty: 'intermediate',
      equipment: ['cable-machine'],
      bodyPosition: 'standing',
      laterality: 'bilateral',
    },
    mechanics: {
      executionMode: 'reps',
      tempo: {
        eccentric: 2,
        pauseBottom: 0,
        concentric: 1,
        pauseTop: 1,
      },
      rangeOfMotion: 'full-controlled',
      loadType: 'external-load',
    },
    muscles: {
      primary: ['rear-delts', 'upper-back'],
      secondary: ['rotator-cuff', 'traps'],
      stabilizers: ['core', 'upper-back'],
      jointActions: [
        'shoulder-horizontal-abduction',
        'shoulder-external-rotation',
        'scapular-retraction',
      ],
    },
    technique: {
      setup: {
        ru: 'Установите блок примерно на уровень лица и возьмитесь за канатную рукоять. Сделайте шаг назад, чтобы трос был натянут, корпус устойчив.',
        en: 'Set the pulley around face height and hold the rope attachment. Step back until the cable is taut and your torso is stable.',
      },
      steps: {
        ru: 'Тяните рукояти к лицу, разводя концы каната в стороны и удерживая локти высоко. Задержитесь на секунду, затем медленно верните руки вперед.',
        en: 'Pull the handles toward your face, spreading the rope ends apart and keeping elbows high. Pause for one second, then slowly return the arms forward.',
      },
      keyCues: {
        ru: 'Тяните к глазам или носу; локти выше кистей; плечи не поднимайте.',
        en: 'Pull toward eyes or nose; elbows above hands; avoid shrugging.',
      },
      commonErrors: {
        ru: 'Слишком большой вес; отклонение корпусом назад; тяга к груди вместо лица; резкое возвращение троса.',
        en: 'Using too much weight; leaning back; pulling to the chest instead of the face; letting the cable snap back.',
      },
      breathing: {
        ru: 'Выдыхайте при тяге рукоятей к лицу, вдыхайте при возвращении.',
        en: 'Exhale as you pull the handles toward the face, inhale as you return.',
      },
    },
    dosage: {
      strength: {
        sets: '3-5',
        reps: '4-8',
        restSec: '90-180',
      },
      hypertrophy: {
        sets: '2-4',
        reps: '6-15',
        restSec: '60-120',
      },
      endurance: {
        sets: '2-4',
        reps: '12-20',
        restSec: '30-60',
      },
    },
    safety: {
      contraindications: ['joint-shoulder-impingement'],
      precautions: ['use-manageable-load', 'avoid-shrugging', 'control-cable-return'],
      impactLevel: 'low',
    },
    progression: {
      regressions: ['face-pull-band', 'lighter-face-pull-cable'],
      progressions: ['heavier-face-pull-cable', 'paused-face-pull-cable'],
      alternatives: ['reverse-pec-deck', 'bent-over-dumbbell-rear-delt-raise'],
    },
    media: {
      images: [],
      videos: [],
      thumbnail: '',
    },
  },
  {
    id: 'external-shoulder-rotation-band',
    slug: 'external-shoulder-rotation-band',
    names: {
      ru: 'Внешняя ротация плеча с резинкой',
      en: 'External Shoulder Rotation with Band',
    },
    aliases: ['band-external-rotation', 'resistance-band-shoulder-external-rotation'],
    classification: {
      modality: 'strength',
      exerciseFamily: 'shoulder-rotation',
      movementPatterns: ['external-rotation'],
      difficulty: 'beginner',
      equipment: ['resistance-band'],
      bodyPosition: 'standing',
      laterality: 'bilateral',
    },
    mechanics: {
      executionMode: 'reps',
      tempo: {
        eccentric: 3,
        pauseBottom: 0,
        concentric: 1,
        pauseTop: 1,
      },
      rangeOfMotion: 'full-controlled',
      loadType: 'elastic-resistance',
    },
    muscles: {
      primary: ['rotator-cuff'],
      secondary: ['rear-delts'],
      stabilizers: ['upper-back', 'core'],
      jointActions: ['shoulder-external-rotation', 'scapular-stabilization'],
    },
    technique: {
      setup: {
        ru: 'Закрепите резинку сбоку на уровне локтя. Встаньте боком к креплению, локоть рабочей руки согнут под 90 градусов и прижат к корпусу.',
        en: 'Anchor the band to the side at elbow height. Stand sideways to the anchor with the working elbow bent to 90 degrees and tucked against your body.',
      },
      steps: {
        ru: 'Поверните предплечье наружу против сопротивления резинки, не отрывая локоть от корпуса. Задержитесь на секунду, затем медленно вернитесь в исходное положение.',
        en: 'Rotate your forearm outward against the band without letting the elbow leave your side. Pause for one second, then slowly return to the starting position.',
      },
      keyCues: {
        ru: 'Локоть прижат; движение небольшое и точное; плечо не поднимается.',
        en: 'Keep elbow tucked; use a small precise motion; do not shrug the shoulder.',
      },
      commonErrors: {
        ru: 'Отведение локтя от корпуса; разворот всего тела; слишком сильная резинка; рывки в конечной точке.',
        en: 'Elbow drifting away from the body; rotating the whole torso; using a band that is too strong; jerking at the end range.',
      },
      breathing: {
        ru: 'Выдыхайте при повороте наружу, вдыхайте при возвращении.',
        en: 'Exhale as you rotate outward, inhale as you return.',
      },
    },
    dosage: {
      strength: {
        sets: '2-4',
        reps: '5-8',
        restSec: '90-150',
      },
      hypertrophy: {
        sets: '2-4',
        reps: '8-12',
        restSec: '60-120',
      },
      endurance: {
        sets: '2-3',
        reps: '12-20',
        restSec: '30-60',
      },
    },
    safety: {
      contraindications: [],
      precautions: ['use-light-band-tension', 'keep-elbow-tucked', 'avoid-painful-range'],
      impactLevel: 'low',
    },
    progression: {
      regressions: [
        'isometric-external-shoulder-rotation-band',
        'lighter-external-shoulder-rotation-band',
      ],
      progressions: [
        'stronger-external-shoulder-rotation-band',
        'side-lying-dumbbell-external-rotation',
      ],
      alternatives: ['face-pull-band', 'cable-external-rotation'],
    },
    media: {
      images: [],
      videos: [],
      thumbnail: '',
    },
  },
  {
    id: 'internal-shoulder-rotation-band',
    slug: 'internal-shoulder-rotation-band',
    names: {
      ru: 'Внутренняя ротация плеча с резинкой',
      en: 'Internal Shoulder Rotation with Band',
    },
    aliases: ['band-internal-rotation', 'resistance-band-shoulder-internal-rotation'],
    classification: {
      modality: 'strength',
      exerciseFamily: 'shoulder-rotation',
      movementPatterns: ['internal-rotation'],
      difficulty: 'beginner',
      equipment: ['resistance-band'],
      bodyPosition: 'standing',
      laterality: 'bilateral',
    },
    mechanics: {
      executionMode: 'reps',
      tempo: {
        eccentric: 3,
        pauseBottom: 0,
        concentric: 1,
        pauseTop: 1,
      },
      rangeOfMotion: 'full-controlled',
      loadType: 'elastic-resistance',
    },
    muscles: {
      primary: ['rotator-cuff'],
      secondary: ['chest', 'lats'],
      stabilizers: ['upper-back', 'core'],
      jointActions: ['shoulder-internal-rotation', 'scapular-stabilization'],
    },
    technique: {
      setup: {
        ru: 'Закрепите резинку сбоку на уровне локтя. Встаньте боком к креплению, локоть рабочей руки согнут под 90 градусов и прижат к корпусу.',
        en: 'Anchor the band to the side at elbow height. Stand sideways to the anchor with the working elbow bent to 90 degrees and tucked against your body.',
      },
      steps: {
        ru: 'Поверните предплечье внутрь против сопротивления резинки, не отрывая локоть от корпуса. Задержитесь на секунду, затем медленно вернитесь в исходное положение.',
        en: 'Rotate your forearm inward against the band without letting the elbow leave your side. Pause for one second, then slowly return to the starting position.',
      },
      keyCues: {
        ru: 'Локоть прижат; движение небольшое и точное; плечо не поднимается.',
        en: 'Keep elbow tucked; use a small precise motion; do not shrug the shoulder.',
      },
      commonErrors: {
        ru: 'Отведение локтя от корпуса; разворот всего тела; слишком сильная резинка; рывки в конечной точке.',
        en: 'Elbow drifting away from the body; rotating the whole torso; using a band that is too strong; jerking at the end range.',
      },
      breathing: {
        ru: 'Выдыхайте при повороте внутрь, вдыхайте при возвращении.',
        en: 'Exhale as you rotate inward, inhale as you return.',
      },
    },
    dosage: {
      strength: {
        sets: '2-4',
        reps: '5-8',
        restSec: '90-150',
      },
      hypertrophy: {
        sets: '2-4',
        reps: '8-12',
        restSec: '60-120',
      },
      endurance: {
        sets: '2-3',
        reps: '12-20',
        restSec: '30-60',
      },
    },
    safety: {
      contraindications: [],
      precautions: ['use-light-band-tension', 'keep-elbow-tucked', 'avoid-painful-range'],
      impactLevel: 'low',
    },
    progression: {
      regressions: [
        'isometric-internal-shoulder-rotation-band',
        'lighter-internal-shoulder-rotation-band',
      ],
      progressions: ['stronger-internal-shoulder-rotation-band', 'cable-internal-rotation'],
      alternatives: ['external-shoulder-rotation-band', 'face-pull-band'],
    },
    media: {
      images: [],
      videos: [],
      thumbnail: '',
    },
  },
  {
    id: 'ab-wheel-rollout',
    slug: 'ab-wheel-rollout',
    names: {
      ru: 'Выкаты с роликом для пресса',
      en: 'Ab Wheel Rollout',
    },
    aliases: ['ab-roller-rollout', 'kneeling-ab-wheel-rollout'],
    classification: {
      modality: 'strength',
      exerciseFamily: 'rollout',
      movementPatterns: ['anti-extension'],
      difficulty: 'advanced',
      equipment: ['ab-wheel'],
      bodyPosition: 'kneeling',
      laterality: 'bilateral',
    },
    mechanics: {
      executionMode: 'reps',
      tempo: {
        eccentric: 3,
        pauseBottom: 1,
        concentric: 1,
        pauseTop: 0,
      },
      rangeOfMotion: 'full-controlled',
      loadType: 'bodyweight',
    },
    muscles: {
      primary: ['abs'],
      secondary: ['core', 'shoulders', 'lats'],
      stabilizers: ['glutes', 'upper-back', 'hip-flexors'],
      jointActions: ['core-anti-extension', 'shoulder-flexion', 'spine-stabilization'],
    },
    technique: {
      setup: {
        ru: 'Встаньте на колени на коврик и возьмитесь за ролик обеими руками. Напрягите пресс и ягодицы, держите ребра опущенными.',
        en: 'Kneel on a mat and hold the ab wheel with both hands. Brace your abs and glutes, keeping ribs down.',
      },
      steps: {
        ru: 'Медленно выкатывайте ролик вперед до комфортной дистанции, сохраняя корпус жестким и не прогибаясь в пояснице. Сделайте короткую паузу и вернитесь назад силой пресса.',
        en: 'Slowly roll the wheel forward to a comfortable distance while keeping your torso rigid and avoiding lower-back arching. Pause briefly and return using your abs.',
      },
      keyCues: {
        ru: 'Ребра вниз; ягодицы напряжены; выкатывайтесь только до контролируемой амплитуды.',
        en: 'Ribs down; glutes tight; roll only as far as you can control.',
      },
      commonErrors: {
        ru: 'Прогиб в пояснице; слишком дальний выкат; расслабленный пресс; возвращение за счет рук вместо корпуса.',
        en: 'Arching the lower back; rolling too far; relaxed abs; returning with the arms instead of the core.',
      },
      breathing: {
        ru: 'Вдыхайте при выкате вперед, выдыхайте при возвращении назад.',
        en: 'Inhale as you roll forward, exhale as you return.',
      },
    },
    dosage: {
      strength: {
        sets: '3-5',
        reps: '4-8',
        restSec: '90-180',
      },
      hypertrophy: {
        sets: '2-4',
        reps: '6-15',
        restSec: '60-120',
      },
      endurance: {
        sets: '2-4',
        reps: '12-20',
        restSec: '30-60',
      },
    },
    safety: {
      contraindications: ['region-lower-back-pain'],
      precautions: [
        'avoid-lumbar-overextension',
        'limit-range-to-control',
        'brace-core-throughout',
      ],
      impactLevel: 'low',
    },
    progression: {
      regressions: ['short-range-ab-wheel-rollout', 'stability-ball-rollout'],
      progressions: ['standing-ab-wheel-rollout', 'paused-ab-wheel-rollout'],
      alternatives: ['dead-bug', 'hollow-hold'],
    },
    media: {
      images: [],
      videos: [],
      thumbnail: '',
    },
  },
  {
    id: 'cable-crunch',
    slug: 'cable-crunch',
    names: {
      ru: 'Скручивания на блоке',
      en: 'Cable Crunch',
    },
    aliases: ['kneeling-cable-crunch', 'rope-cable-crunch'],
    classification: {
      modality: 'strength',
      exerciseFamily: 'crunch',
      movementPatterns: ['flexion'],
      difficulty: 'intermediate',
      equipment: ['cable-machine'],
      bodyPosition: 'supine',
      laterality: 'bilateral',
    },
    mechanics: {
      executionMode: 'reps',
      tempo: {
        eccentric: 2,
        pauseBottom: 1,
        concentric: 1,
        pauseTop: 0,
      },
      rangeOfMotion: 'full-controlled',
      loadType: 'external-load',
    },
    muscles: {
      primary: ['abs'],
      secondary: ['core'],
      stabilizers: ['hip-flexors', 'lats'],
      jointActions: ['spinal-flexion', 'core-flexion'],
    },
    technique: {
      setup: {
        ru: 'Установите верхний блок с канатной рукоятью и встаньте на колени перед тренажером. Держите рукоять возле головы, таз стабилен.',
        en: 'Set a high pulley with a rope attachment and kneel in front of the machine. Hold the rope near your head and keep hips stable.',
      },
      steps: {
        ru: 'Скручивайтесь вниз, округляя верхнюю часть спины и сокращая пресс. Задержитесь внизу на секунду, затем медленно вернитесь вверх без рывка тазом.',
        en: 'Crunch downward by rounding the upper back and contracting the abs. Pause at the bottom for one second, then slowly return upward without jerking the hips.',
      },
      keyCues: {
        ru: 'Скручивайтесь ребрами к тазу; таз неподвижен; не тяните руками.',
        en: 'Curl ribs toward pelvis; keep hips still; do not pull with the arms.',
      },
      commonErrors: {
        ru: 'Сгибание в тазу вместо скручивания; тяга руками; слишком большой вес; резкое возвращение.',
        en: 'Hinging at the hips instead of crunching; pulling with the arms; using too much weight; returning too quickly.',
      },
      breathing: {
        ru: 'Выдыхайте при скручивании вниз, вдыхайте при возвращении.',
        en: 'Exhale as you crunch down, inhale as you return.',
      },
    },
    dosage: {
      strength: {
        sets: '3-5',
        reps: '4-8',
        restSec: '90-180',
      },
      hypertrophy: {
        sets: '2-4',
        reps: '6-15',
        restSec: '60-120',
      },
      endurance: {
        sets: '2-4',
        reps: '12-20',
        restSec: '30-60',
      },
    },
    safety: {
      contraindications: [],
      precautions: ['use-manageable-load', 'avoid-pulling-with-arms', 'control-spinal-flexion'],
      impactLevel: 'low',
    },
    progression: {
      regressions: ['lighter-cable-crunch', 'floor-crunch'],
      progressions: ['heavier-cable-crunch', 'paused-cable-crunch'],
      alternatives: ['reverse-crunch', 'ab-wheel-rollout'],
    },
    media: {
      images: [],
      videos: [],
      thumbnail: '',
    },
  },
  {
    id: 'pallof-press-band',
    slug: 'pallof-press-band',
    names: {
      ru: 'Pallof Press с резинкой',
      en: 'Pallof Press with Band',
    },
    aliases: ['band-pallof-press', 'anti-rotation-band-press'],
    classification: {
      modality: 'strength',
      exerciseFamily: 'press',
      movementPatterns: ['anti-rotation'],
      difficulty: 'intermediate',
      equipment: ['resistance-band'],
      bodyPosition: 'standing',
      laterality: 'bilateral',
    },
    mechanics: {
      executionMode: 'reps',
      tempo: {
        eccentric: 0,
        pauseBottom: 0,
        concentric: 1,
        pauseTop: 3,
      },
      rangeOfMotion: 'full-controlled',
      loadType: 'elastic-resistance',
    },
    muscles: {
      primary: ['core', 'obliques'],
      secondary: ['shoulders', 'chest'],
      stabilizers: ['glutes', 'hips', 'upper-back'],
      jointActions: ['core-anti-rotation', 'shoulder-stabilization', 'spine-stabilization'],
    },
    technique: {
      setup: {
        ru: 'Закрепите резинку сбоку на уровне груди. Встаньте боком к креплению, возьмите резинку двумя руками у груди и создайте умеренное натяжение.',
        en: 'Anchor the band to the side at chest height. Stand sideways to the anchor, hold the band with both hands at your chest, and create moderate tension.',
      },
      steps: {
        ru: 'Выжмите руки вперед перед грудью и удерживайте корпус неподвижным, сопротивляясь тяге резинки. Задержитесь на 3 секунды, затем верните руки к груди.',
        en: 'Press your hands forward in front of your chest and keep the torso still while resisting the band pull. Hold for 3 seconds, then return your hands to the chest.',
      },
      keyCues: {
        ru: 'Таз ровно; ребра вниз; не разворачивайтесь к резинке.',
        en: 'Keep hips square; ribs down; do not rotate toward the band.',
      },
      commonErrors: {
        ru: 'Поворот корпуса; прогиб в пояснице; слишком сильная резинка; поднятие плеч к ушам.',
        en: 'Torso rotating; lower-back arching; using too much band tension; shrugging shoulders toward ears.',
      },
      breathing: {
        ru: 'Дышите спокойно во время удержания, не задерживайте дыхание без необходимости.',
        en: 'Breathe calmly during the hold and avoid unnecessary breath-holding.',
      },
    },
    dosage: {
      strength: {
        sets: '3-5',
        reps: '4-8',
        restSec: '90-180',
      },
      hypertrophy: {
        sets: '2-4',
        reps: '6-15',
        restSec: '60-120',
      },
      endurance: {
        sets: '2-4',
        reps: '12-20',
        restSec: '30-60',
      },
    },
    safety: {
      contraindications: [],
      precautions: ['use-manageable-band-tension', 'avoid-torso-rotation', 'keep-ribs-down'],
      impactLevel: 'low',
    },
    progression: {
      regressions: ['lighter-pallof-press-band', 'shorter-hold-pallof-press-band'],
      progressions: ['stronger-pallof-press-band', 'pallof-press-band-with-step-out'],
      alternatives: ['pallof-press-cable', 'side-plank'],
    },
    media: {
      images: [],
      videos: [],
      thumbnail: '',
    },
  },
  {
    id: 'pallof-press-cable',
    slug: 'pallof-press-cable',
    names: {
      ru: 'Pallof Press в кроссовере',
      en: 'Pallof Press in Crossover',
    },
    aliases: ['cable-pallof-press', 'anti-rotation-cable-press'],
    classification: {
      modality: 'strength',
      exerciseFamily: 'press',
      movementPatterns: ['anti-rotation'],
      difficulty: 'intermediate',
      equipment: ['cable-machine'],
      bodyPosition: 'standing',
      laterality: 'bilateral',
    },
    mechanics: {
      executionMode: 'reps',
      tempo: {
        eccentric: 0,
        pauseBottom: 0,
        concentric: 1,
        pauseTop: 3,
      },
      rangeOfMotion: 'full-controlled',
      loadType: 'external-load',
    },
    muscles: {
      primary: ['core', 'obliques'],
      secondary: ['shoulders', 'chest'],
      stabilizers: ['glutes', 'hips', 'upper-back'],
      jointActions: ['core-anti-rotation', 'shoulder-stabilization', 'spine-stabilization'],
    },
    technique: {
      setup: {
        ru: 'Установите блок на уровне груди и встаньте боком к тренажеру. Возьмите рукоять двумя руками у груди и сделайте шаг в сторону, чтобы создать натяжение.',
        en: 'Set the pulley at chest height and stand sideways to the machine. Hold the handle with both hands at your chest and step away to create tension.',
      },
      steps: {
        ru: 'Выжмите руки вперед и удерживайте корпус ровным, сопротивляясь развороту к блоку. Задержитесь на 3 секунды, затем подконтрольно верните руки к груди.',
        en: 'Press your hands forward and keep the torso square while resisting rotation toward the pulley. Hold for 3 seconds, then return the hands to the chest with control.',
      },
      keyCues: {
        ru: 'Плечи ровно; таз не разворачивается; руки движутся по центру груди.',
        en: 'Shoulders square; hips do not rotate; hands move from the center of the chest.',
      },
      commonErrors: {
        ru: 'Разворот корпуса; слишком большой вес; прогиб в пояснице; задержка дыхания на всем повторении.',
        en: 'Torso rotating; using too much weight; arching the lower back; holding the breath through the whole rep.',
      },
      breathing: {
        ru: 'Выдыхайте при выжиме рук вперед, затем дышите спокойно во время удержания.',
        en: 'Exhale as you press the hands forward, then breathe calmly during the hold.',
      },
    },
    dosage: {
      strength: {
        sets: '3-5',
        reps: '4-8',
        restSec: '90-180',
      },
      hypertrophy: {
        sets: '2-4',
        reps: '6-15',
        restSec: '60-120',
      },
      endurance: {
        sets: '2-4',
        reps: '12-20',
        restSec: '30-60',
      },
    },
    safety: {
      contraindications: [],
      precautions: ['use-manageable-load', 'avoid-torso-rotation', 'maintain-neutral-spine'],
      impactLevel: 'low',
    },
    progression: {
      regressions: ['lighter-pallof-press-cable', 'pallof-press-band'],
      progressions: ['heavier-pallof-press-cable', 'pallof-press-cable-with-step-out'],
      alternatives: ['pallof-press-band', 'side-plank'],
    },
    media: {
      images: [],
      videos: [],
      thumbnail: '',
    },
  },
  {
    id: 'hanging-knee-raise',
    slug: 'hanging-knee-raise',
    names: {
      ru: 'Подъём коленей в висе',
      en: 'Hanging Knee Raises',
    },
    aliases: ['hanging-knee-raises', 'hanging-knee-tuck'],
    classification: {
      modality: 'strength',
      exerciseFamily: 'raise',
      movementPatterns: ['hip-flexion'],
      difficulty: 'intermediate',
      equipment: ['pull-up-bar'],
      bodyPosition: 'hanging',
      laterality: 'bilateral',
    },
    mechanics: {
      executionMode: 'reps',
      tempo: {
        eccentric: 2,
        pauseBottom: 1,
        concentric: 1,
        pauseTop: 0,
      },
      rangeOfMotion: 'full-controlled',
      loadType: 'bodyweight',
    },
    muscles: {
      primary: ['abs'],
      secondary: ['core', 'hip-flexors'],
      stabilizers: ['shoulders', 'lats', 'forearms'],
      jointActions: ['hip-flexion', 'spinal-flexion', 'shoulder-stabilization'],
    },
    technique: {
      setup: {
        ru: 'Повисните на турнике хватом сверху, плечи держите активными и не расслабляйте корпус. Ноги вместе, таз под контролем.',
        en: 'Hang from the pull-up bar with an overhand grip, keeping shoulders active and the torso engaged. Keep legs together and pelvis controlled.',
      },
      steps: {
        ru: 'Подтяните колени к груди, слегка подкручивая таз и сокращая пресс. Задержитесь коротко в верхней точке, затем медленно опустите ноги без раскачки.',
        en: 'Raise your knees toward your chest, slightly tucking the pelvis and contracting the abs. Pause briefly at the top, then slowly lower the legs without swinging.',
      },
      keyCues: {
        ru: 'Не раскачивайтесь; таз подкручен; плечи активны.',
        en: 'Avoid swinging; tuck the pelvis; keep shoulders active.',
      },
      commonErrors: {
        ru: 'Раскачивание корпусом; подъем только за счет бедер; расслабленные плечи; резкое опускание ног.',
        en: 'Swinging the body; lifting only with hip flexors; passive shoulders; dropping the legs quickly.',
      },
      breathing: {
        ru: 'Выдыхайте при подъеме коленей, вдыхайте при опускании.',
        en: 'Exhale as you raise the knees, inhale as you lower.',
      },
    },
    dosage: {
      strength: {
        sets: '3-5',
        reps: '4-8',
        restSec: '90-180',
      },
      hypertrophy: {
        sets: '2-4',
        reps: '6-15',
        restSec: '60-120',
      },
      endurance: {
        sets: '2-4',
        reps: '12-20',
        restSec: '30-60',
      },
    },
    safety: {
      contraindications: ['joint-shoulder-pain', 'region-lower-back-pain'],
      precautions: ['avoid-swinging', 'keep-shoulders-active', 'control-lowering-phase'],
      impactLevel: 'low',
    },
    progression: {
      regressions: ['captain-chair-knee-raise', 'lying-knee-raise'],
      progressions: ['hanging-leg-raise', 'toes-to-bar'],
      alternatives: ['reverse-crunch', 'dead-bug'],
    },
    media: {
      images: [],
      videos: [],
      thumbnail: '',
    },
  },
  {
    id: 'hanging-leg-raise',
    slug: 'hanging-leg-raise',
    names: {
      ru: 'Подъём ног в висе',
      en: 'Hanging Leg Raises',
    },
    aliases: ['hanging-straight-leg-raise', 'hanging-leg-raises'],
    classification: {
      modality: 'strength',
      exerciseFamily: 'raise',
      movementPatterns: ['hip-flexion'],
      difficulty: 'advanced',
      equipment: ['pull-up-bar'],
      bodyPosition: 'hanging',
      laterality: 'bilateral',
    },
    mechanics: {
      executionMode: 'reps',
      tempo: {
        eccentric: 3,
        pauseBottom: 1,
        concentric: 1,
        pauseTop: 0,
      },
      rangeOfMotion: 'full-controlled',
      loadType: 'bodyweight',
    },
    muscles: {
      primary: ['abs'],
      secondary: ['core', 'hip-flexors'],
      stabilizers: ['shoulders', 'lats', 'forearms'],
      jointActions: ['hip-flexion', 'spinal-flexion', 'shoulder-stabilization'],
    },
    technique: {
      setup: {
        ru: 'Повисните на турнике хватом сверху, плечи держите активными. Ноги прямые или слегка согнутые, корпус напряжен.',
        en: 'Hang from the pull-up bar with an overhand grip and active shoulders. Keep legs straight or slightly bent and the torso braced.',
      },
      steps: {
        ru: 'Поднимите ноги вперед до параллели с полом или выше, сохраняя контроль и не раскачиваясь. Медленно опустите ноги вниз, удерживая пресс напряженным.',
        en: 'Raise your legs forward to parallel or higher while staying controlled and avoiding swing. Slowly lower the legs while keeping the abs engaged.',
      },
      keyCues: {
        ru: 'Движение без маха; ребра вниз; опускайте ноги медленно.',
        en: 'Move without momentum; keep ribs down; lower the legs slowly.',
      },
      commonErrors: {
        ru: 'Раскачка ногами; прогиб в пояснице; расслабленные плечи; слишком быстрый спуск.',
        en: 'Swinging the legs; arching the lower back; passive shoulders; lowering too quickly.',
      },
      breathing: {
        ru: 'Выдыхайте при подъеме ног, вдыхайте при опускании.',
        en: 'Exhale as you raise the legs, inhale as you lower.',
      },
    },
    dosage: {
      strength: {
        sets: '3-5',
        reps: '4-8',
        restSec: '90-180',
      },
      hypertrophy: {
        sets: '2-4',
        reps: '6-15',
        restSec: '60-120',
      },
      endurance: {
        sets: '2-4',
        reps: '12-20',
        restSec: '30-60',
      },
    },
    safety: {
      contraindications: ['joint-shoulder-pain', 'region-lower-back-pain'],
      precautions: ['avoid-swinging', 'limit-range-to-control', 'keep-shoulders-active'],
      impactLevel: 'low',
    },
    progression: {
      regressions: ['hanging-knee-raise', 'captain-chair-leg-raise'],
      progressions: ['toes-to-bar', 'weighted-hanging-leg-raise'],
      alternatives: ['v-ups', 'reverse-crunch'],
    },
    media: {
      images: [],
      videos: [],
      thumbnail: '',
    },
  },
  {
    id: 'cable-woodchopper',
    slug: 'cable-woodchopper',
    names: {
      ru: 'Дровосек в кроссовере',
      en: 'Cable Woodchopper',
    },
    aliases: ['cable-woodchop', 'cable-rotational-chop'],
    classification: {
      modality: 'strength',
      exerciseFamily: 'woodchopper',
      movementPatterns: ['rotational'],
      difficulty: 'intermediate',
      equipment: ['cable'],
      bodyPosition: 'standing',
      laterality: 'bilateral',
    },
    mechanics: {
      executionMode: 'reps',
      tempo: {
        eccentric: 2,
        pauseBottom: 1,
        concentric: 1,
        pauseTop: 0,
      },
      rangeOfMotion: 'full-controlled',
      loadType: 'external-load',
    },
    muscles: {
      primary: ['obliques'],
      secondary: ['core', 'shoulders', 'lats'],
      stabilizers: ['glutes', 'hips', 'upper-back'],
      jointActions: ['trunk-rotation', 'core-rotation', 'hip-rotation'],
    },
    technique: {
      setup: {
        ru: 'Установите блок выше уровня плеч и встаньте боком к тренажеру. Возьмите рукоять двумя руками, стопы поставьте устойчиво.',
        en: 'Set the pulley above shoulder height and stand sideways to the machine. Hold the handle with both hands and set your feet firmly.',
      },
      steps: {
        ru: 'Потяните рукоять по диагонали вниз через корпус, поворачивая грудную клетку и таз под контролем. Медленно верните рукоять обратно по той же траектории.',
        en: 'Pull the handle diagonally down across your body while rotating the rib cage and hips with control. Slowly return the handle along the same path.',
      },
      keyCues: {
        ru: 'Движение по диагонали; корпус контролирует вес; не тяните только руками.',
        en: 'Move diagonally; control the weight with the torso; do not pull only with the arms.',
      },
      commonErrors: {
        ru: 'Рывок руками; чрезмерный поворот поясницей; слишком большой вес; потеря устойчивости стоп.',
        en: 'Jerking with the arms; excessive twisting through the lower back; using too much weight; losing foot stability.',
      },
      breathing: {
        ru: 'Выдыхайте при тяге вниз по диагонали, вдыхайте при возврате.',
        en: 'Exhale as you pull diagonally down, inhale as you return.',
      },
    },
    dosage: {
      strength: {
        sets: '3-5',
        reps: '4-8',
        restSec: '90-180',
      },
      hypertrophy: {
        sets: '2-4',
        reps: '6-15',
        restSec: '60-120',
      },
      endurance: {
        sets: '2-4',
        reps: '12-20',
        restSec: '30-60',
      },
    },
    safety: {
      contraindications: ['region-lower-back-pain'],
      precautions: [
        'rotate-through-hips-and-thoracic-spine',
        'use-manageable-load',
        'control-return-phase',
      ],
      impactLevel: 'low',
    },
    progression: {
      regressions: ['band-woodchopper', 'lighter-cable-woodchopper'],
      progressions: ['heavier-cable-woodchopper', 'high-to-low-cable-woodchopper'],
      alternatives: ['pallof-press-cable', 'russian-twist'],
    },
    media: {
      images: [],
      videos: [],
      thumbnail: '',
    },
  },
  {
    id: 'dumbbell-side-bend',
    slug: 'dumbbell-side-bend',
    names: {
      ru: 'Боковые наклоны с гантелью',
      en: 'Dumbbell Side Bend',
    },
    aliases: ['db-side-bend', 'weighted-side-bend'],
    classification: {
      modality: 'strength',
      exerciseFamily: 'side-bend',
      movementPatterns: ['lateral-flexion'],
      difficulty: 'beginner',
      equipment: ['dumbbell'],
      bodyPosition: 'standing',
      laterality: 'unilateral',
    },
    mechanics: {
      executionMode: 'reps',
      tempo: {
        eccentric: 2,
        pauseBottom: 0,
        concentric: 1,
        pauseTop: 1,
      },
      rangeOfMotion: 'full-controlled',
      loadType: 'external-load',
    },
    muscles: {
      primary: ['obliques'],
      secondary: ['core'],
      stabilizers: ['glutes', 'hips', 'shoulders'],
      jointActions: ['lateral-flexion', 'core-lateral-flexion', 'spine-stabilization'],
    },
    technique: {
      setup: {
        ru: 'Встаньте прямо, возьмите гантель в одну руку, вторую руку держите на поясе или за головой. Стопы устойчиво на полу.',
        en: 'Stand tall holding a dumbbell in one hand, with the other hand on your hip or behind your head. Keep feet stable on the floor.',
      },
      steps: {
        ru: 'Наклонитесь в сторону гантели в комфортной амплитуде, не сгибаясь вперед и не разворачивая корпус. Затем вернитесь в вертикальное положение за счет косых мышц.',
        en: 'Bend toward the dumbbell side through a comfortable range without leaning forward or rotating the torso. Then return to upright using the obliques.',
      },
      keyCues: {
        ru: 'Наклон строго в сторону; корпус высокий; движение без разворота.',
        en: 'Bend straight to the side; keep torso tall; move without rotation.',
      },
      commonErrors: {
        ru: 'Наклон вперед; рывки корпусом; слишком большая амплитуда; гантель в обеих руках одновременно.',
        en: 'Leaning forward; jerking the torso; using excessive range; holding dumbbells in both hands at once.',
      },
      breathing: {
        ru: 'Вдыхайте при наклоне, выдыхайте при возвращении вверх.',
        en: 'Inhale as you bend, exhale as you return upright.',
      },
    },
    dosage: {
      strength: {
        sets: '2-4',
        reps: '5-8',
        restSec: '90-150',
      },
      hypertrophy: {
        sets: '2-4',
        reps: '8-12',
        restSec: '60-120',
      },
      endurance: {
        sets: '2-3',
        reps: '12-20',
        restSec: '30-60',
      },
    },
    safety: {
      contraindications: ['region-lower-back-pain'],
      precautions: ['avoid-excessive-range', 'avoid-torso-rotation', 'use-manageable-load'],
      impactLevel: 'low',
    },
    progression: {
      regressions: ['bodyweight-side-bend', 'lighter-dumbbell-side-bend'],
      progressions: ['heavier-dumbbell-side-bend', 'cable-side-bend'],
      alternatives: ['side-plank', 'suitcase-carry'],
    },
    media: {
      images: [],
      videos: [],
      thumbnail: '',
    },
  },
  {
    id: 'suitcase-carry',
    slug: 'suitcase-carry',
    names: {
      ru: 'Переноска чемодана',
      en: 'Suitcase Carry',
    },
    aliases: ['single-arm-farmer-carry', 'one-arm-carry'],
    classification: {
      modality: 'strength',
      exerciseFamily: 'carry',
      movementPatterns: ['gait', 'anti-lateral'],
      difficulty: 'intermediate',
      equipment: ['dumbbell', 'kettlebell'],
      bodyPosition: 'standing',
      laterality: 'bilateral',
    },
    mechanics: {
      executionMode: 'time',
      tempo: {
        eccentric: 0,
        pauseBottom: 0,
        concentric: 0,
        pauseTop: 0,
      },
      rangeOfMotion: 'full-controlled',
      loadType: 'external-load',
    },
    muscles: {
      primary: ['core', 'forearms'],
      secondary: ['traps', 'shoulders', 'legs'],
      stabilizers: ['obliques', 'glutes', 'hips', 'upper-back'],
      jointActions: ['core-anti-lateral-flexion', 'grip', 'gait'],
    },
    technique: {
      setup: {
        ru: 'Возьмите гантель или гирю в одну руку и встаньте прямо. Плечи ровные, корпус напряжен, свободная рука не помогает наклоном.',
        en: 'Hold a dumbbell or kettlebell in one hand and stand tall. Keep shoulders level, torso braced, and avoid using the free arm to lean.',
      },
      steps: {
        ru: 'Идите ровными шагами, удерживая корпус вертикальным и сопротивляясь наклону в сторону веса. После заданного времени или дистанции смените сторону.',
        en: 'Walk with even steps while keeping the torso upright and resisting a lean toward the weight. Switch sides after the target time or distance.',
      },
      keyCues: {
        ru: 'Плечи ровные; шаги спокойные; не наклоняйтесь к весу.',
        en: 'Shoulders level; steps steady; do not lean toward the weight.',
      },
      commonErrors: {
        ru: 'Наклон корпуса; перекос плеч; слишком тяжелый вес; быстрые неустойчивые шаги.',
        en: 'Leaning the torso; uneven shoulders; using too much weight; fast unstable steps.',
      },
      breathing: {
        ru: 'Дышите ровно и сохраняйте умеренное напряжение корпуса во время ходьбы.',
        en: 'Breathe steadily and keep moderate core tension while walking.',
      },
    },
    dosage: {
      strength: {
        sets: '3-5',
        reps: '20-40 sec',
        restSec: '90-180',
      },
      hypertrophy: {
        sets: '2-4',
        reps: '30-60 sec',
        restSec: '60-120',
      },
      endurance: {
        sets: '2-4',
        reps: '45-90 sec',
        restSec: '30-60',
      },
    },
    safety: {
      contraindications: [],
      precautions: ['keep-torso-upright', 'use-clear-walking-path', 'switch-sides-evenly'],
      impactLevel: 'low',
    },
    progression: {
      regressions: ['lighter-suitcase-carry', 'static-suitcase-hold'],
      progressions: ['heavier-suitcase-carry', 'longer-distance-suitcase-carry'],
      alternatives: ['farmer-carry', 'side-plank'],
    },
    media: {
      images: [],
      videos: [],
      thumbnail: '',
    },
  },
  {
    id: 'overhead-carry',
    slug: 'overhead-carry',
    names: {
      ru: 'Переноска над головой',
      en: 'Overhead Carry',
    },
    aliases: ['overhead-farmers-walk', 'double-overhead-carry'],
    classification: {
      modality: 'strength',
      exerciseFamily: 'loaded-carry',
      movementPatterns: ['gait', 'anti-extension'],
      difficulty: 'advanced',
      equipment: ['dumbbell', 'kettlebell'],
      bodyPosition: 'standing',
      laterality: 'bilateral',
    },
    mechanics: {
      executionMode: 'time',
      tempo: {
        eccentric: 0,
        pauseBottom: 0,
        concentric: 0,
        pauseTop: 0,
      },
      rangeOfMotion: 'full-controlled',
      loadType: 'external-load',
    },
    muscles: {
      primary: ['shoulders', 'core'],
      secondary: ['traps', 'forearms', 'legs'],
      stabilizers: ['rotator-cuff', 'upper-back', 'glutes'],
      jointActions: [
        'shoulder-flexion',
        'shoulder-stabilization',
        'scapular-upward-rotation',
        'anti-extension',
        'gait',
      ],
    },
    technique: {
      setup: {
        ru: 'Возьмите две гантели или гири, поднимите их над головой и выпрямите локти без переразгибания. Встаньте прямо, стопы на ширине таза, рёбра опущены, корпус напряжён.',
        en: 'Pick up two dumbbells or kettlebells, press them overhead, and lock the elbows without hyperextending. Stand tall with feet hip-width apart, ribs down, and core braced.',
      },
      steps: {
        ru: 'Удерживайте вес над головой, плечи активны, а корпус стабилен. Идите ровными контролируемыми шагами, не прогибаясь в пояснице и не позволяя весу уходить назад или в стороны. В конце дистанции безопасно опустите снаряды.',
        en: 'Hold the weights overhead with active shoulders and a stable trunk. Walk with smooth, controlled steps without arching the lower back or letting the weights drift backward or sideways. At the end of the carry, lower the weights safely.',
      },
      keyCues: {
        ru: 'Рёбра вниз; макушка тянется вверх; локти под весом; шаги тихие и ровные; корпус как колонна.',
        en: 'Ribs down; reach tall through the crown of the head; elbows under the load; quiet, even steps; keep the torso like a pillar.',
      },
      commonErrors: {
        ru: 'Прогиб в пояснице, поднятые к ушам плечи, согнутые локти, слишком быстрые шаги, потеря контроля над положением снарядов.',
        en: 'Arching the lower back, shrugging excessively, bending the elbows, walking too fast, or losing control of the overhead position.',
      },
      breathing: {
        ru: 'Дышите коротко и ритмично, сохраняя напряжение корпуса. Не задерживайте дыхание на всю дистанцию.',
        en: 'Use short, rhythmic breaths while keeping the core braced. Do not hold your breath for the entire carry.',
      },
    },
    dosage: {
      strength: {
        sets: '3-5',
        reps: '20-40 sec',
        restSec: '90-180',
      },
      hypertrophy: {
        sets: '2-4',
        reps: '30-60 sec',
        restSec: '60-120',
      },
      endurance: {
        sets: '2-4',
        reps: '45-90 sec',
        restSec: '30-60',
      },
    },
    safety: {
      contraindications: ['joint-shoulder-impingement'],
      precautions: [
        'use-clear-walking-path',
        'avoid-overhead-drift',
        'keep-ribs-down',
        'lower-load-with-control',
      ],
      impactLevel: 'low',
    },
    progression: {
      regressions: ['single-arm-overhead-hold', 'half-kneeling-overhead-hold', 'farmers-carry'],
      progressions: [
        'heavier-overhead-carry',
        'longer-distance-overhead-carry',
        'bottoms-up-overhead-carry',
      ],
      alternatives: ['waiters-walk', 'front-rack-carry', 'suitcase-carry'],
    },
    media: {
      images: [],
      videos: [],
      thumbnail: '',
    },
  },
  {
    id: 'waiters-walk',
    slug: 'waiters-walk',
    names: {
      ru: 'Прогулка официанта',
      en: "Waiter's Walk",
    },
    aliases: ['single-arm-overhead-carry', 'waiter-carry'],
    classification: {
      modality: 'strength',
      exerciseFamily: 'loaded-carry',
      movementPatterns: ['gait', 'anti-lateral'],
      difficulty: 'intermediate',
      equipment: ['dumbbell', 'kettlebell'],
      bodyPosition: 'standing',
      laterality: 'bilateral',
    },
    mechanics: {
      executionMode: 'time',
      tempo: {
        eccentric: 0,
        pauseBottom: 0,
        concentric: 0,
        pauseTop: 0,
      },
      rangeOfMotion: 'full-controlled',
      loadType: 'external-load',
    },
    muscles: {
      primary: ['shoulders', 'core'],
      secondary: ['traps', 'forearms'],
      stabilizers: ['rotator-cuff', 'upper-back', 'obliques', 'glutes'],
      jointActions: [
        'shoulder-flexion',
        'shoulder-stabilization',
        'scapular-upward-rotation',
        'anti-lateral-flexion',
        'gait',
      ],
    },
    technique: {
      setup: {
        ru: 'Возьмите гантель или гирю одной рукой и поднимите её над головой. Локоть держите выпрямленным без переразгибания, запястье нейтральным, корпус ровным.',
        en: 'Hold a dumbbell or kettlebell in one hand and press it overhead. Keep the elbow straight without hyperextending, wrist neutral, and torso level.',
      },
      steps: {
        ru: 'Держите вес одной рукой над головой и идите контролируемыми шагами. Не наклоняйтесь в сторону, не разворачивайте корпус и сохраняйте плечо активным. После заданного времени или дистанции безопасно опустите вес и повторите на другую сторону.',
        en: 'Hold the weight overhead with one arm and walk with controlled steps. Do not lean to the side, rotate the torso, or lose shoulder engagement. After the target time or distance, lower the weight safely and repeat on the other side.',
      },
      keyCues: {
        ru: 'Корпус ровный; вес над плечом; рёбра вниз; шаги спокойные; свободная рука помогает балансу, но не компенсирует наклон.',
        en: 'Keep the torso level; stack the weight over the shoulder; ribs down; calm steps; let the free arm balance without compensating for a lean.',
      },
      commonErrors: {
        ru: 'Наклон корпуса в сторону, уход веса вперёд или назад, чрезмерный прогиб в пояснице, расслабленное плечо, слишком тяжёлый вес.',
        en: 'Leaning to one side, letting the weight drift forward or backward, over-arching the lower back, losing shoulder tension, or using a load that is too heavy.',
      },
      breathing: {
        ru: 'Дышите ровно короткими вдохами и выдохами, сохраняя упругий корпус и стабильное положение рёбер.',
        en: 'Breathe evenly with short inhales and exhales while keeping the trunk braced and the ribs stable.',
      },
    },
    dosage: {
      strength: {
        sets: '3-5',
        reps: '20-40 sec',
        restSec: '90-180',
      },
      hypertrophy: {
        sets: '2-4',
        reps: '30-60 sec',
        restSec: '60-120',
      },
      endurance: {
        sets: '2-4',
        reps: '45-90 sec',
        restSec: '30-60',
      },
    },
    safety: {
      contraindications: ['joint-shoulder-impingement'],
      precautions: [
        'use-clear-walking-path',
        'avoid-side-lean',
        'keep-wrist-neutral',
        'switch-sides-evenly',
      ],
      impactLevel: 'low',
    },
    progression: {
      regressions: ['single-arm-overhead-hold', 'half-kneeling-overhead-hold', 'suitcase-carry'],
      progressions: [
        'heavier-waiters-walk',
        'longer-distance-waiters-walk',
        'bottoms-up-waiters-walk',
      ],
      alternatives: ['overhead-carry', 'suitcase-carry', 'front-rack-carry'],
    },
    media: {
      images: [],
      videos: [],
      thumbnail: '',
    },
  },
  {
    id: 'plate-finger-hold',
    slug: 'plate-finger-hold',
    names: {
      ru: 'Удержание блинов пальцами',
      en: 'Plate Finger Hold',
    },
    aliases: ['plate-pinch-hold', 'pinch-grip-hold'],
    classification: {
      modality: 'strength',
      exerciseFamily: 'grip-hold',
      movementPatterns: ['grip-hold', 'isometric'],
      difficulty: 'intermediate',
      equipment: ['plate'],
      bodyPosition: 'standing',
      laterality: 'bilateral',
    },
    mechanics: {
      executionMode: 'time',
      tempo: {
        eccentric: 0,
        pauseBottom: 0,
        concentric: 0,
        pauseTop: 0,
      },
      rangeOfMotion: 'isometric',
      loadType: 'external-load',
    },
    muscles: {
      primary: ['forearms'],
      secondary: ['forearms'],
      stabilizers: ['shoulders', 'upper-back', 'core'],
      jointActions: ['finger-flexion', 'thumb-opposition', 'wrist-stabilization', 'isometric-grip'],
    },
    technique: {
      setup: {
        ru: 'Поставьте один или два блина рядом и возьмите их пальцами за гладкие стороны или край. Встаньте прямо, плечи опущены, запястья нейтральны.',
        en: 'Place one or two plates together and grip them by the smooth sides or edge with your fingers. Stand tall with shoulders down and wrists neutral.',
      },
      steps: {
        ru: 'Удерживайте блин или блины кончиками пальцев на вытянутых руках или рядом с телом. Сохраняйте нейтральные запястья и ровную стойку, не прижимая вес к бедру. Когда хват начинает терять контроль, аккуратно поставьте блины на пол.',
        en: "Hold the plate or plates with your fingertips at arm's length or by your sides. Keep the wrists neutral and posture tall without bracing the weight against your thigh. When grip control starts to fail, set the plates down carefully.",
      },
      keyCues: {
        ru: 'Сжимайте пальцами, а не ладонью; запястья ровные; плечи расслаблены; корпус высокий; опускайте вес до полного срыва хвата.',
        en: 'Pinch with the fingers, not the palm; keep wrists straight; shoulders relaxed; stand tall; lower the weight before the grip fully fails.',
      },
      commonErrors: {
        ru: 'Сгибание запястий, прижимание блина к телу, рывковый подъём с пола, использование скользких блинов, удержание до внезапного падения.',
        en: 'Bending the wrists, pressing the plate against the body, jerking it off the floor, using slippery plates, or holding until the weight suddenly drops.',
      },
      breathing: {
        ru: 'Дышите спокойно и равномерно, не задерживая дыхание на всё удержание.',
        en: 'Breathe calmly and evenly without holding your breath for the entire hold.',
      },
    },
    dosage: {
      strength: {
        sets: '3-5',
        reps: '20-40 sec',
        restSec: '90-180',
      },
      hypertrophy: {
        sets: '2-4',
        reps: '30-60 sec',
        restSec: '60-120',
      },
      endurance: {
        sets: '2-4',
        reps: '45-90 sec',
        restSec: '30-60',
      },
    },
    safety: {
      contraindications: [],
      precautions: [
        'keep-feet-clear-of-plates',
        'avoid-slippery-plates',
        'lower-load-before-grip-failure',
        'keep-wrists-neutral',
      ],
      impactLevel: 'low',
    },
    progression: {
      regressions: [
        'lighter-plate-finger-hold',
        'two-hand-single-plate-pinch',
        'shorter-duration-hold',
      ],
      progressions: ['heavier-plate-finger-hold', 'multiple-plate-pinch-hold', 'plate-pinch-carry'],
      alternatives: ['farmers-carry', 'dead-hang', 'towel-grip-hold'],
    },
    media: {
      images: [],
      videos: [],
      thumbnail: '',
    },
  },
  {
    id: 'wrist-curl',
    slug: 'wrist-curl',
    names: {
      ru: 'Сгибания кистей',
      en: 'Wrist Curl',
    },
    aliases: ['forearm-curl', 'seated-wrist-curl'],
    classification: {
      modality: 'strength',
      exerciseFamily: 'curl',
      movementPatterns: ['wrist-flexion'],
      difficulty: 'beginner',
      equipment: ['dumbbell', 'barbell'],
      bodyPosition: 'seated',
      laterality: 'bilateral',
    },
    mechanics: {
      executionMode: 'reps',
      tempo: {
        eccentric: 2,
        pauseBottom: 0,
        concentric: 1,
        pauseTop: 1,
      },
      rangeOfMotion: 'full-controlled',
      loadType: 'external-load',
    },
    muscles: {
      primary: ['forearms'],
      secondary: ['forearms'],
      stabilizers: ['arms', 'shoulders', 'core'],
      jointActions: ['wrist-flexion', 'wrist-extension-eccentric', 'grip'],
    },
    technique: {
      setup: {
        ru: 'Сядьте на скамью, положите предплечья на бёдра или край скамьи ладонями вверх. Возьмите гантели или штангу, запястья выведите за край опоры, локти и предплечья зафиксированы.',
        en: 'Sit on a bench and rest your forearms on your thighs or the edge of a bench with palms facing up. Hold dumbbells or a barbell with wrists just beyond the support, keeping elbows and forearms fixed.',
      },
      steps: {
        ru: 'Сидя, предплечья на бёдрах или скамье, медленно опустите кисти вниз в комфортной амплитуде. Затем согните кисти вверх, не отрывая предплечья от опоры. Сделайте короткую паузу вверху и опустите вес под контролем.',
        en: 'With forearms resting on thighs or a bench, slowly lower the wrists through a comfortable range. Curl the wrists upward without lifting the forearms from the support. Pause briefly at the top, then lower the weight under control.',
      },
      keyCues: {
        ru: 'Движутся только кисти; предплечья прижаты к опоре; амплитуда комфортная; хват спокойный; не ускоряйте опускание.',
        en: 'Move only the wrists; keep forearms pinned to the support; use a comfortable range; keep the grip controlled; do not rush the lowering phase.',
      },
      commonErrors: {
        ru: 'Отрыв предплечий от опоры, раскачивание корпуса, слишком большой вес, резкое опускание, болезненная амплитуда в запястьях.',
        en: 'Lifting the forearms from the support, rocking the body, using too much weight, dropping the load quickly, or forcing a painful wrist range.',
      },
      breathing: {
        ru: 'Выдыхайте при сгибании кистей вверх, вдыхайте при контролируемом опускании.',
        en: 'Exhale as you curl the wrists up and inhale as you lower under control.',
      },
    },
    dosage: {
      strength: {
        sets: '2-4',
        reps: '5-8',
        restSec: '90-150',
      },
      hypertrophy: {
        sets: '2-4',
        reps: '8-12',
        restSec: '60-120',
      },
      endurance: {
        sets: '2-3',
        reps: '12-20',
        restSec: '30-60',
      },
    },
    safety: {
      contraindications: ['joint-wrist-pain'],
      precautions: [
        'use-light-load-first',
        'avoid-painful-range',
        'keep-forearms-supported',
        'control-eccentric-phase',
      ],
      impactLevel: 'low',
    },
    progression: {
      regressions: ['lighter-wrist-curl', 'single-dumbbell-wrist-curl', 'shorter-range-wrist-curl'],
      progressions: ['heavier-wrist-curl', 'barbell-wrist-curl', 'slow-eccentric-wrist-curl'],
      alternatives: ['wrist-extension', 'plate-finger-hold', 'farmers-carry'],
    },
    media: {
      images: [],
      videos: [],
      thumbnail: '',
    },
  },
  {
    id: 'wrist-extension',
    slug: 'wrist-extension',
    names: {
      ru: 'Разгибания кистей',
      en: 'Wrist Extension',
    },
    aliases: ['reverse-wrist-curl', 'wrist-extension-curl'],
    classification: {
      modality: 'strength',
      exerciseFamily: 'curl',
      movementPatterns: ['wrist-extension'],
      difficulty: 'beginner',
      equipment: ['dumbbell'],
      bodyPosition: 'seated',
      laterality: 'bilateral',
    },
    mechanics: {
      executionMode: 'reps',
      tempo: {
        eccentric: 2,
        pauseBottom: 0,
        concentric: 1,
        pauseTop: 1,
      },
      rangeOfMotion: 'full-controlled',
      loadType: 'external-load',
    },
    muscles: {
      primary: ['forearms'],
      secondary: ['forearms'],
      stabilizers: ['arms', 'shoulders', 'core'],
      jointActions: ['wrist-extension', 'wrist-flexion-eccentric', 'grip'],
    },
    technique: {
      setup: {
        ru: 'Сядьте и положите предплечья на бёдра или скамью ладонями вниз. Возьмите гантели, выведите кисти за край опоры и зафиксируйте предплечья.',
        en: 'Sit down and rest your forearms on your thighs or a bench with palms facing down. Hold dumbbells with the wrists just beyond the support and keep the forearms fixed.',
      },
      steps: {
        ru: 'Предплечья на опоре, медленно опустите кисти вниз в комфортной амплитуде. Разогните кисти вверх, не отрывая предплечья от опоры. Сделайте короткую паузу вверху и плавно вернитесь вниз.',
        en: 'With forearms supported, slowly lower the wrists through a comfortable range. Extend the wrists upward without lifting the forearms from the support. Pause briefly at the top, then return smoothly.',
      },
      keyCues: {
        ru: 'Предплечья неподвижны; движение только в запястьях; вес лёгкий и контролируемый; кисти поднимаются без рывка.',
        en: 'Keep the forearms still; move only at the wrists; use a light, controlled load; lift the hands without jerking.',
      },
      commonErrors: {
        ru: 'Подъём локтей, раскачивание гантелей, чрезмерная амплитуда через боль, слишком тяжёлый вес, быстрое опускание.',
        en: 'Lifting the elbows, swinging the dumbbells, forcing range through pain, using too much weight, or lowering too quickly.',
      },
      breathing: {
        ru: 'Выдыхайте при разгибании кистей вверх, вдыхайте при медленном опускании.',
        en: 'Exhale as you extend the wrists upward and inhale as you lower slowly.',
      },
    },
    dosage: {
      strength: {
        sets: '2-4',
        reps: '5-8',
        restSec: '90-150',
      },
      hypertrophy: {
        sets: '2-4',
        reps: '8-12',
        restSec: '60-120',
      },
      endurance: {
        sets: '2-3',
        reps: '12-20',
        restSec: '30-60',
      },
    },
    safety: {
      contraindications: ['joint-wrist-pain'],
      precautions: [
        'use-light-load-first',
        'avoid-painful-range',
        'keep-forearms-supported',
        'control-eccentric-phase',
      ],
      impactLevel: 'low',
    },
    progression: {
      regressions: [
        'lighter-wrist-extension',
        'single-dumbbell-wrist-extension',
        'shorter-range-wrist-extension',
      ],
      progressions: [
        'heavier-wrist-extension',
        'slow-eccentric-wrist-extension',
        'pause-top-wrist-extension',
      ],
      alternatives: ['wrist-curl', 'plate-finger-hold', 'reverse-curl'],
    },
    media: {
      images: [],
      videos: [],
      thumbnail: '',
    },
  },
  {
    id: 'jump-rope',
    slug: 'jump-rope',
    names: {
      ru: 'Прыжки на скакалке',
      en: 'Jump Rope',
    },
    aliases: ['skipping-rope', 'rope-skipping'],
    classification: {
      modality: 'cardio',
      exerciseFamily: 'jumping',
      movementPatterns: ['locomotion'],
      difficulty: 'beginner',
      equipment: ['jump-rope'],
      bodyPosition: 'standing',
      laterality: 'bilateral',
    },
    mechanics: {
      executionMode: 'time',
      tempo: {
        eccentric: 0,
        pauseBottom: 0,
        concentric: 0,
        pauseTop: 0,
      },
      rangeOfMotion: 'full-controlled',
      loadType: 'bodyweight',
    },
    muscles: {
      primary: ['calves'],
      secondary: ['core', 'shoulders', 'forearms'],
      stabilizers: ['glutes', 'quads', 'hamstrings', 'feet'],
      jointActions: [
        'ankle-plantar-flexion',
        'knee-extension',
        'hip-extension',
        'wrist-circumduction',
        'shoulder-stabilization',
      ],
    },
    technique: {
      setup: {
        ru: 'Подберите длину скакалки так, чтобы ручки доходили примерно до уровня подмышек при наступании на середину шнура. Встаньте прямо, локти держите близко к корпусу, ручки на уровне бёдер.',
        en: 'Adjust the rope so the handles reach about armpit height when you stand on the middle of it. Stand tall with elbows close to the body and handles near hip level.',
      },
      steps: {
        ru: 'Прыгайте на носках небольшими мягкими прыжками, вращая скакалку в основном кистями. Держите корпус ровно, локти близко к телу и приземляйтесь тихо под себя.',
        en: 'Jump on the balls of your feet with small, soft hops while rotating the rope mostly with your wrists. Keep the torso upright, elbows close to the body, and land quietly under your hips.',
      },
      keyCues: {
        ru: 'Прыжки низкие; вращение кистями; локти близко; мягкое приземление; взгляд вперёд.',
        en: 'Keep jumps low; turn with the wrists; elbows close; land softly; look forward.',
      },
      commonErrors: {
        ru: 'Слишком высокие прыжки, вращение всей рукой, жёсткое приземление на пятки, наклон корпуса вперёд, слишком длинная или короткая скакалка.',
        en: 'Jumping too high, swinging from the whole arm, landing hard on the heels, leaning forward, or using a rope that is too long or too short.',
      },
      breathing: {
        ru: 'Дышите ритмично и спокойно, подстраивая дыхание под темп прыжков.',
        en: 'Breathe rhythmically and calmly, matching your breath to the jumping pace.',
      },
    },
    dosage: {
      strength: {
        sets: '3-5',
        reps: '20-40 sec',
        restSec: '90-180',
      },
      hypertrophy: {
        sets: '2-4',
        reps: '30-60 sec',
        restSec: '60-120',
      },
      endurance: {
        sets: '2-4',
        reps: '45-90 sec',
        restSec: '30-60',
      },
    },
    safety: {
      contraindications: ['joint-knee-pain', 'joint-ankle-pain'],
      precautions: [
        'use-flat-non-slip-surface',
        'land-softly',
        'keep-jumps-low',
        'start-with-short-intervals',
      ],
      impactLevel: 'medium',
    },
    progression: {
      regressions: ['march-in-place', 'no-rope-jump-rope', 'low-impact-step-rope'],
      progressions: ['faster-jump-rope', 'alternate-foot-jump-rope', 'double-under'],
      alternatives: ['jog-in-place', 'jumping-jacks', 'low-impact-marching'],
    },
    media: {
      images: [],
      videos: [],
      thumbnail: '',
    },
  },
  {
    id: 'jog-in-place',
    slug: 'jog-in-place',
    names: {
      ru: 'Бег на месте',
      en: 'Jog in Place',
    },
    aliases: ['running-in-place', 'stationary-jog'],
    classification: {
      modality: 'cardio',
      exerciseFamily: 'running',
      movementPatterns: ['locomotion'],
      difficulty: 'beginner',
      equipment: ['bodyweight'],
      bodyPosition: 'standing',
      laterality: 'bilateral',
    },
    mechanics: {
      executionMode: 'time',
      tempo: {
        eccentric: 0,
        pauseBottom: 0,
        concentric: 0,
        pauseTop: 0,
      },
      rangeOfMotion: 'full-controlled',
      loadType: 'bodyweight',
    },
    muscles: {
      primary: ['legs'],
      secondary: ['core'],
      stabilizers: ['glutes', 'calves', 'hip-flexors', 'feet'],
      jointActions: [
        'hip-flexion',
        'hip-extension',
        'knee-flexion',
        'knee-extension',
        'ankle-plantar-flexion',
      ],
    },
    technique: {
      setup: {
        ru: 'Встаньте прямо на свободном месте, стопы на ширине таза. Слегка согните колени, напрягите корпус и держите руки согнутыми как при обычном беге.',
        en: 'Stand tall in a clear space with feet hip-width apart. Slightly bend the knees, brace the core, and keep the arms bent as in normal running.',
      },
      steps: {
        ru: 'Бегите на месте в лёгком темпе или с умеренным подъёмом коленей. Руки работают естественно в противофазе с ногами, корпус остаётся ровным, приземление мягкое на переднюю часть стопы.',
        en: 'Jog in place at an easy pace or with a moderate knee lift. Swing the arms naturally opposite the legs, keep the torso upright, and land softly on the balls of the feet.',
      },
      keyCues: {
        ru: 'Мягкие шаги; корпус высокий; руки помогают ритму; колени двигаются прямо; не подпрыгивайте чрезмерно.',
        en: 'Soft steps; tall torso; arms set the rhythm; knees track straight; avoid excessive bouncing.',
      },
      commonErrors: {
        ru: 'Жёсткое приземление, завал корпуса назад или вперёд, хаотичная работа рук, чрезмерно высокий подъём коленей без контроля, напряжённые плечи.',
        en: 'Landing hard, leaning backward or forward, swinging the arms chaotically, lifting the knees too high without control, or tensing the shoulders.',
      },
      breathing: {
        ru: 'Дышите ровно через нос и рот, поддерживая разговорный или заданный тренировкой темп.',
        en: 'Breathe steadily through the nose and mouth, maintaining a conversational or workout-specific pace.',
      },
    },
    dosage: {
      strength: {
        sets: '3-5',
        reps: '20-40 sec',
        restSec: '90-180',
      },
      hypertrophy: {
        sets: '2-4',
        reps: '30-60 sec',
        restSec: '60-120',
      },
      endurance: {
        sets: '2-4',
        reps: '45-90 sec',
        restSec: '30-60',
      },
    },
    safety: {
      contraindications: ['joint-knee-pain'],
      precautions: [
        'use-flat-non-slip-surface',
        'land-softly',
        'keep-knees-tracking-forward',
        'adjust-impact-as-needed',
      ],
      impactLevel: 'medium',
    },
    progression: {
      regressions: ['march-in-place', 'low-impact-jog-in-place', 'step-touch'],
      progressions: ['high-knees', 'in-place-sprint', 'longer-duration-jog-in-place'],
      alternatives: ['jump-rope', 'march-in-place', 'stationary-bike'],
    },
    media: {
      images: [],
      videos: [],
      thumbnail: '',
    },
  },
  {
    id: 'shuttle-run',
    slug: 'shuttle-run',
    names: {
      ru: 'Челночный бег',
      en: 'Shuttle Run',
    },
    aliases: ['suicide-run', 'line-shuttle-run'],
    classification: {
      modality: 'cardio',
      exerciseFamily: 'running',
      movementPatterns: ['locomotion', 'multi-directional'],
      difficulty: 'beginner',
      equipment: ['bodyweight', 'cones'],
      bodyPosition: 'standing',
      laterality: 'bilateral',
    },
    mechanics: {
      executionMode: 'time',
      tempo: {
        eccentric: 0,
        pauseBottom: 0,
        concentric: 0,
        pauseTop: 0,
      },
      rangeOfMotion: 'full-controlled',
      loadType: 'bodyweight',
    },
    muscles: {
      primary: ['quads', 'hamstrings', 'calves'],
      secondary: ['core', 'glutes'],
      stabilizers: ['adductors', 'abductors', 'feet', 'lower-back'],
      jointActions: [
        'hip-flexion',
        'hip-extension',
        'knee-flexion',
        'knee-extension',
        'ankle-plantar-flexion',
        'deceleration',
        'change-of-direction',
      ],
    },
    technique: {
      setup: {
        ru: 'Поставьте две линии или конуса на безопасном расстоянии друг от друга. Проверьте, что покрытие ровное и не скользит, а зона разворота свободна.',
        en: 'Set two lines or cones at a safe distance from each other. Make sure the surface is even and non-slip, and the turning area is clear.',
      },
      steps: {
        ru: 'Бегите от точки А к точке Б, коснитесь линии или конуса, снизьте центр тяжести, развернитесь и вернитесь назад. Тормозите под контролем, ставьте стопу под корпус и меняйте направление без завала коленей внутрь.',
        en: 'Run from point A to point B, touch the line or cone, lower your center of gravity, turn, and sprint back. Decelerate under control, place the foot under the body, and change direction without letting the knees collapse inward.',
      },
      keyCues: {
        ru: 'Тормози заранее; корпус ниже на развороте; колено по линии стопы; короткие быстрые шаги; взгляд в сторону движения.',
        en: 'Brake early; stay lower on the turn; knee tracks with the foot; use short quick steps; look toward the direction of travel.',
      },
      commonErrors: {
        ru: 'Слишком резкое торможение, разворот на прямых ногах, завал коленей внутрь, скольжение стопы, потеря контроля ради скорости.',
        en: 'Braking too abruptly, turning with straight legs, knees collapsing inward, the foot slipping, or sacrificing control for speed.',
      },
      breathing: {
        ru: 'Дышите активно и ритмично; на коротких ускорениях не задерживайте дыхание перед разворотом.',
        en: 'Breathe actively and rhythmically; on short bursts, avoid holding your breath before the turn.',
      },
    },
    dosage: {
      strength: {
        sets: '3-5',
        reps: '20-40 sec',
        restSec: '90-180',
      },
      hypertrophy: {
        sets: '2-4',
        reps: '30-60 sec',
        restSec: '60-120',
      },
      endurance: {
        sets: '2-4',
        reps: '45-90 sec',
        restSec: '30-60',
      },
    },
    safety: {
      contraindications: ['joint-knee-pain', 'joint-ankle-instability'],
      precautions: [
        'use-non-slip-surface',
        'warm-up-before-sprints',
        'decelerate-under-control',
        'keep-knees-tracking-forward',
      ],
      impactLevel: 'medium',
    },
    progression: {
      regressions: ['walk-shuttle', 'jog-shuttle', 'shorter-distance-shuttle-run'],
      progressions: ['longer-distance-shuttle-run', 'faster-shuttle-run', 'multi-cone-shuttle-run'],
      alternatives: ['jog-in-place', 'in-place-sprint', 'lateral-shuffle'],
    },
    media: {
      images: [],
      videos: [],
      thumbnail: '',
    },
  },
  {
    id: 'in-place-sprint',
    slug: 'in-place-sprint',
    names: {
      ru: 'Спринт на месте',
      en: 'Sprint in Place',
    },
    aliases: ['stationary-sprint', 'high-knee-sprint'],
    classification: {
      modality: 'cardio',
      exerciseFamily: 'running',
      movementPatterns: ['locomotion'],
      difficulty: 'beginner',
      equipment: ['bodyweight'],
      bodyPosition: 'standing',
      laterality: 'bilateral',
    },
    mechanics: {
      executionMode: 'time',
      tempo: {
        eccentric: 0,
        pauseBottom: 0,
        concentric: 0,
        pauseTop: 0,
      },
      rangeOfMotion: 'full-controlled',
      loadType: 'bodyweight',
    },
    muscles: {
      primary: ['quads', 'calves'],
      secondary: ['core', 'shoulders'],
      stabilizers: ['glutes', 'hamstrings', 'hip-flexors', 'feet'],
      jointActions: [
        'hip-flexion',
        'hip-extension',
        'knee-flexion',
        'knee-extension',
        'ankle-plantar-flexion',
        'shoulder-flexion-extension',
      ],
    },
    technique: {
      setup: {
        ru: 'Встаньте на ровную нескользкую поверхность, стопы на ширине таза. Слегка наклонитесь вперёд от голеностопов, напрягите корпус и согните руки под углом около 90 градусов.',
        en: 'Stand on an even, non-slip surface with feet hip-width apart. Lean slightly forward from the ankles, brace the core, and bend the arms to about 90 degrees.',
      },
      steps: {
        ru: 'Быстро поднимайте колени вверх и активно работайте руками, как при спринте. Держите корпус ровным, приземляйтесь мягко на переднюю часть стопы и сохраняйте высокий темп без потери контроля.',
        en: 'Drive the knees up quickly and pump the arms actively as in sprinting. Keep the torso upright, land softly on the balls of the feet, and maintain high speed without losing control.',
      },
      keyCues: {
        ru: 'Быстрые стопы; активные руки; корпус стабилен; колени вверх; мягкое приземление.',
        en: 'Fast feet; active arms; stable torso; knees up; soft landings.',
      },
      commonErrors: {
        ru: 'Жёсткое приземление, наклон назад, слишком широкий шаг на месте, напряжённые плечи, потеря ритма из-за чрезмерной скорости.',
        en: 'Landing hard, leaning backward, overstriding in place, tensing the shoulders, or losing rhythm from going too fast.',
      },
      breathing: {
        ru: 'Дышите быстро и ритмично, не задерживая дыхание во время интенсивного отрезка.',
        en: 'Breathe quickly and rhythmically without holding your breath during the high-intensity effort.',
      },
    },
    dosage: {
      strength: {
        sets: '3-5',
        reps: '20-40 sec',
        restSec: '90-180',
      },
      hypertrophy: {
        sets: '2-4',
        reps: '30-60 sec',
        restSec: '60-120',
      },
      endurance: {
        sets: '2-4',
        reps: '45-90 sec',
        restSec: '30-60',
      },
    },
    safety: {
      contraindications: ['joint-knee-pain', 'joint-high-impact-issues'],
      precautions: [
        'warm-up-before-high-intensity',
        'use-non-slip-surface',
        'land-softly',
        'reduce-knee-height-if-needed',
      ],
      impactLevel: 'medium',
    },
    progression: {
      regressions: ['jog-in-place', 'march-in-place', 'low-impact-high-knees'],
      progressions: [
        'faster-in-place-sprint',
        'longer-interval-in-place-sprint',
        'resisted-in-place-sprint',
      ],
      alternatives: ['shuttle-run', 'jump-rope', 'high-knees'],
    },
    media: {
      images: [],
      videos: [],
      thumbnail: '',
    },
  },
  {
    id: 'shadow-boxing',
    slug: 'shadow-boxing',
    names: {
      ru: 'Боксирование с тенью',
      en: 'Shadow Boxing',
    },
    aliases: ['shadowboxing', 'air-boxing'],
    classification: {
      modality: 'cardio',
      exerciseFamily: 'boxing',
      movementPatterns: ['upper-body-push', 'rotational'],
      difficulty: 'beginner',
      equipment: ['bodyweight'],
      bodyPosition: 'standing',
      laterality: 'bilateral',
    },
    mechanics: {
      executionMode: 'time',
      tempo: {
        eccentric: 0,
        pauseBottom: 0,
        concentric: 0,
        pauseTop: 0,
      },
      rangeOfMotion: 'full-controlled',
      loadType: 'bodyweight',
    },
    muscles: {
      primary: ['shoulders', 'core'],
      secondary: ['arms', 'legs'],
      stabilizers: ['glutes', 'upper-back', 'obliques', 'calves'],
      jointActions: [
        'shoulder-flexion',
        'elbow-extension',
        'trunk-rotation',
        'hip-rotation',
        'scapular-protraction',
        'gait',
      ],
    },
    technique: {
      setup: {
        ru: 'Встаньте в боксёрскую стойку: одна нога немного впереди, колени слегка согнуты, руки у подбородка. Оставьте вокруг себя достаточно свободного пространства.',
        en: 'Stand in a boxing stance with one foot slightly forward, knees softly bent, and hands near the chin. Leave enough clear space around you.',
      },
      steps: {
        ru: 'Двигайтесь легко на ногах, выполняйте комбинации ударов, например джеб, кросс и хук, и возвращайте руки к защите после каждого удара. Поворачивайте корпус и стопы вместе с ударами, сохраняя контроль амплитуды.',
        en: 'Stay light on your feet, throw punch combinations such as jabs, crosses, and hooks, and return the hands to guard after each punch. Rotate the torso and feet with the punches while keeping the range controlled.',
      },
      keyCues: {
        ru: 'Руки возвращаются к подбородку; плечи расслаблены; удар идёт от корпуса; стопы двигаются легко; не выпрямляйте локоть до жёсткого замка.',
        en: 'Hands return to the chin; shoulders stay relaxed; punches come from the torso; feet move lightly; do not snap the elbow into a hard lockout.',
      },
      commonErrors: {
        ru: 'Опущенная защита, чрезмерное выпрямление локтей, удары только рукой без поворота корпуса, задержка дыхания, скованная стойка.',
        en: 'Dropping the guard, overextending the elbows, punching only with the arm without torso rotation, holding the breath, or staying too stiff.',
      },
      breathing: {
        ru: 'Коротко выдыхайте на каждый удар и спокойно восстанавливайте дыхание между комбинациями.',
        en: 'Exhale briefly on each punch and recover your breathing calmly between combinations.',
      },
    },
    dosage: {
      strength: {
        sets: '3-5',
        reps: '20-40 sec',
        restSec: '90-180',
      },
      hypertrophy: {
        sets: '2-4',
        reps: '30-60 sec',
        restSec: '60-120',
      },
      endurance: {
        sets: '2-4',
        reps: '45-90 sec',
        restSec: '30-60',
      },
    },
    safety: {
      contraindications: ['joint-shoulder-impingement', 'joint-wrist-pain'],
      precautions: [
        'avoid-elbow-hyperextension',
        'keep-punches-controlled',
        'use-clear-space',
        'keep-wrists-neutral',
      ],
      impactLevel: 'low',
    },
    progression: {
      regressions: [
        'slow-shadow-boxing',
        'upper-body-only-shadow-boxing',
        'low-intensity-shadow-boxing',
      ],
      progressions: [
        'faster-shadow-boxing',
        'shadow-boxing-with-footwork',
        'shadow-boxing-intervals',
      ],
      alternatives: ['march-in-place', 'jog-in-place', 'battle-rope-waves'],
    },
    media: {
      images: [],
      videos: [],
      thumbnail: '',
    },
  },
];

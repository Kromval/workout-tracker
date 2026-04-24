import { normalizeFormString } from './form-utils.js';

export function applyExerciseCatalogFilters() {
  const searchInput = document.querySelector('[data-exercises-search]');
  const typeSelect = document.querySelector('[data-exercises-type-filter]');
  const muscleSelect = document.querySelector('[data-exercises-muscle-filter]');
  const equipmentSelect = document.querySelector('[data-exercises-equipment-filter]');
  const profileLevelSelect = document.querySelector('[data-exercises-profile-level-filter]');
  const list = document.querySelector('[data-exercise-list]');
  const noResults = document.querySelector('[data-exercise-no-results]');

  if (!list) return;

  const query = normalizeFormString(searchInput?.value).toLowerCase().trim();
  const type = normalizeFormString(typeSelect?.value).toLowerCase();
  const muscle = normalizeFormString(muscleSelect?.value).toLowerCase();
  const equipmentFilter = normalizeFormString(equipmentSelect?.value).toLowerCase();
  const profileLevelFilter = normalizeFormString(profileLevelSelect?.value).toLowerCase();
  const currentProfileLevel = normalizeFormString(list.dataset.profileTrainingLevel).toLowerCase();

  const cards = Array.from(list.querySelectorAll('.exercise-card'));
  let visibleCount = 0;

  cards.forEach((card) => {
    const searchText = (card.dataset.exerciseSearch || '').toLowerCase();
    const cardType = (card.dataset.exerciseType || '').toLowerCase();
    const muscles = card.dataset.exerciseMuscles ? card.dataset.exerciseMuscles.split('|') : [];
    const equipmentIds = card.dataset.exerciseEquipment
      ? card.dataset.exerciseEquipment.split('|')
      : [];
    const profileLevel = (card.dataset.exerciseProfileLevel || '').toLowerCase();
    const equipmentAvailable = card.dataset.exerciseEquipmentAvailable === 'true';
    const profileCompatible = card.dataset.exerciseProfileCompatible === 'true';

    const matchesQuery = !query || searchText.includes(query);
    const matchesType = !type || cardType === type;
    const matchesMuscle = !muscle || muscles.includes(muscle);
    const matchesEquipment =
      !equipmentFilter ||
      (equipmentFilter === 'available'
        ? equipmentAvailable
        : equipmentIds.includes(equipmentFilter));
    const matchesProfileLevel =
      !profileLevelFilter ||
      (profileLevelFilter === 'profile'
        ? !currentProfileLevel || profileCompatible
        : profileLevel === profileLevelFilter);

    const visible =
      matchesQuery && matchesType && matchesMuscle && matchesEquipment && matchesProfileLevel;
    card.style.display = visible ? 'block' : 'none';

    if (visible) visibleCount++;
  });

  if (noResults) noResults.hidden = visibleCount > 0;
}

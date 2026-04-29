/**
 * @module js/storage/profileRepository
 */
import { uniqueStrings } from './helpers.js';
import { createEquipment, createEquipmentItem, createProfile } from './records.js';
import { generateUniqueId, loadStore, saveStore } from './store.js';

/**
 * Gets profile.
 * @returns {*} result
 */
export function getProfile() {
  return loadStore().profile;
}

/**
 * Saves profile.
 * @param {object} profilePatch profile patch input
 * @returns {*} result
 */
export function saveProfile(profilePatch) {
  const store = loadStore();
  store.profile = createProfile({
    ...store.profile,
    ...profilePatch,
  });
  return saveStore(store).profile;
}

/**
 * Gets equipment.
 * @returns {*} result
 */
export function getEquipment() {
  return loadStore().equipment;
}

/**
 * Saves equipment.
 * @param {object} equipment equipment input
 * @returns {*} result
 */
export function saveEquipment(equipment) {
  const store = loadStore();
  store.equipment = createEquipment(equipment);
  return saveStore(store).equipment;
}

/**
 * Creates custom equipment record.
 * @param {string} name name input
 * @returns {*} result
 */
export function createCustomEquipmentRecord(name) {
  const store = loadStore();
  const item = createEquipmentItem({
    name,
    id: generateUniqueId(
      'equipment',
      store.equipment.customItems.map((entry) => entry.id),
    ),
  });
  const customItems = [...store.equipment.customItems, item];
  const selectedIds = uniqueStrings([...store.equipment.selectedIds, item.id]);

  store.equipment = createEquipment({
    ...store.equipment,
    customItems,
    selectedIds,
  });

  return {
    equipment: saveStore(store).equipment,
    item,
  };
}

/**
 * Deletes custom equipment record.
 * @param {string} id id input
 * @returns {*} result
 */
export function deleteCustomEquipmentRecord(id) {
  const store = loadStore();
  const nextCustomItems = store.equipment.customItems.filter((item) => item.id !== id);

  if (nextCustomItems.length === store.equipment.customItems.length) {
    return false;
  }

  store.equipment = createEquipment({
    ...store.equipment,
    customItems: nextCustomItems,
    selectedIds: store.equipment.selectedIds.filter((itemId) => itemId !== id),
  });
  saveStore(store);
  return true;
}

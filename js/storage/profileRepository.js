import { uniqueStrings } from './helpers.js';
import { createEquipment, createEquipmentItem, createProfile } from './records.js';
import { generateUniqueId, loadStore, saveStore } from './store.js';

export function getProfile() {
  return loadStore().profile;
}

export function saveProfile(profilePatch) {
  const store = loadStore();
  store.profile = createProfile({
    ...store.profile,
    ...profilePatch,
  });
  return saveStore(store).profile;
}

export function getEquipment() {
  return loadStore().equipment;
}

export function saveEquipment(equipment) {
  const store = loadStore();
  store.equipment = createEquipment(equipment);
  return saveStore(store).equipment;
}

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

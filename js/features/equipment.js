import { asArray, isPlainObject, normalizeString } from '../core/utils.js';

const builtInEquipmentRecords = Object.freeze([
  { id: 'bodyweight', name: { ru: 'Собственный вес', en: 'Bodyweight' } },
  { id: 'dumbbells', name: { ru: 'Гантели', en: 'Dumbbells' } },
  { id: 'kettlebell', name: { ru: 'Гиря', en: 'Kettlebell' } },
  { id: 'barbell', name: { ru: 'Штанга', en: 'Barbell' } },
  { id: 'bench', name: { ru: 'Скамья', en: 'Bench' } },
  { id: 'pull-up-bar', name: { ru: 'Турник', en: 'Pull-up bar' } },
  { id: 'bands', name: { ru: 'Резинки', en: 'Resistance bands' } },
  { id: 'machines', name: { ru: 'Тренажеры', en: 'Machines' } },
  { id: 'cable-station', name: { ru: 'Блочная рама', en: 'Cable station' } },
  { id: 'gymnastic-rings', name: { ru: 'Кольца', en: 'Gymnastic rings' } },
  { id: 'jump-rope', name: { ru: 'Скакалка', en: 'Jump rope' } },
  { id: 'medicine-ball', name: { ru: 'Медбол', en: 'Medicine ball' } },
]);

const builtInEquipment = builtInEquipmentRecords.map((item) => normalizeBuiltInEquipment(item));

export function getBuiltInEquipmentCatalog() {
  return [...builtInEquipment];
}

export function getEquipmentCatalog(state) {
  const builtIns = getBuiltInEquipmentCatalog();
  const builtInIds = new Set(builtIns.map((item) => item.id));
  const customItems = asArray(state?.store?.equipment?.customItems)
    .map((item) => normalizeCustomEquipment(item))
    .filter((item) => item.name.ru && !builtInIds.has(item.id));

  return [...builtIns, ...customItems];
}

export function isBuiltInEquipmentId(id) {
  const normalizedId = normalizeString(id);
  return builtInEquipment.some((item) => item.id === normalizedId);
}

function normalizeBuiltInEquipment(item) {
  return {
    id: normalizeString(item?.id),
    name: normalizeLocalizedText(item?.name),
    isCustom: false,
  };
}

function normalizeCustomEquipment(item) {
  const source = isPlainObject(item) ? item : {};
  const name = normalizeString(source.name);

  return {
    id: normalizeString(source.id),
    name: {
      ru: name,
      en: name,
    },
    isCustom: true,
  };
}

function normalizeLocalizedText(value) {
  if (isPlainObject(value)) {
    return {
      ru: normalizeString(value.ru),
      en: normalizeString(value.en),
    };
  }

  const text = normalizeString(value);
  return {
    ru: text,
    en: text,
  };
}

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
  { id: 'ab-wheel', name: { ru: 'Ролик для пресса', en: 'Ab wheel' } },
  { id: 'battle-ropes', name: { ru: 'Канаты', en: 'Battle ropes' } },
  { id: 'box', name: { ru: 'Тумба', en: 'Box' } },
  { id: 'cones', name: { ru: 'Конусы', en: 'Cones' } },
  { id: 'dip-bars', name: { ru: 'Брусья', en: 'Dip bars' } },
  { id: 'elliptical', name: { ru: 'Эллиптический тренажер', en: 'Elliptical trainer' } },
  {
    id: 'hyperextension-bench',
    name: { ru: 'Скамья для гиперэкстензии', en: 'Hyperextension bench' },
  },
  { id: 'incline-bench', name: { ru: 'Наклонная скамья', en: 'Incline bench' } },
  {
    id: 'leg-extension-machine',
    name: { ru: 'Тренажер для разгибания ног', en: 'Leg extension machine' },
  },
  { id: 'leg-press-machine', name: { ru: 'Жим ногами', en: 'Leg press machine' } },
  { id: 'adductor-machine', name: { ru: 'Тренажер для приведения бедра', en: 'Adductor machine' } },
  { id: 'plate', name: { ru: 'Блин', en: 'Weight plate' } },
  {
    id: 'reverse-hyperextension-machine',
    name: { ru: 'Обратная гиперэкстензия', en: 'Reverse hyperextension machine' },
  },
  { id: 'rowing-machine', name: { ru: 'Гребной тренажер', en: 'Rowing machine' } },
  { id: 'stationary-bike', name: { ru: 'Велотренажер', en: 'Stationary bike' } },
  { id: 't-bar', name: { ru: 'T-гриф', en: 'T-bar' } },
  { id: 'treadmill', name: { ru: 'Беговая дорожка', en: 'Treadmill' } },
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

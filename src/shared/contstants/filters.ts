import { LocaleType } from '@/shared/locales'

export const filters = (t: LocaleType) => {
  return [
    {
      name: t.create.filters.noFilter,
      filter: 'none',
    },
    {
      name: t.create.filters.kyoto,
      filter: 'saturate(2)',
    },
    {
      name: t.create.filters.lark,
      filter: 'grayscale(100%)',
    },
    {
      name: t.create.filters.gingham,
      filter: 'contrast(160%)',
    },
    {
      name: t.create.filters.happy,
      filter: 'contrast(110%) brightness(110%) saturate(130%)',
    },
    {
      name: t.create.filters.clarendon,
      filter: 'invert(80%)',
    },
    {
      name: t.create.filters.shabby,
      filter: 'sepia(80%)',
    },
    {
      name: t.create.filters.oldSchool,
      filter: 'opacity(70%)',
    },
    {
      name: t.create.filters.silentHill,
      filter: 'hue-rotate(150deg)',
    },
  ]
}

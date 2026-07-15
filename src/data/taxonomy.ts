export interface TaxonomyItem {
  key: string
  label: string
}

export const PROTEIN_TYPES: TaxonomyItem[] = [
  { key: 'soy', label: 'סויה (טופו/אדממה)' },
  { key: 'seitan', label: 'סייטן' },
  { key: 'lentils', label: 'עדשים' },
  { key: 'chickpeas', label: 'חומוס' },
  { key: 'beans', label: 'שעועית' },
  { key: 'tempeh', label: 'טמפה' },
  { key: 'mushrooms', label: 'פטריות' },
  { key: 'plant_meat', label: 'תחליף בשר מהצומח' },
  { key: 'nuts_seeds', label: 'אגוזים וזרעים' },
  { key: 'other', label: 'אחר' },
]

export const CATEGORIES: TaxonomyItem[] = [
  { key: 'pasta', label: 'פסטה' },
  { key: 'italian', label: 'איטלקי' },
  { key: 'salad', label: 'סלט' },
  { key: 'soup', label: 'מרק' },
  { key: 'asian', label: 'אסייתי' },
  { key: 'indian', label: 'הודי' },
  { key: 'african', label: 'אפריקאי' },
  { key: 'mexican', label: 'מקסיקני' },
  { key: 'breakfast', label: 'ארוחת בוקר' },
  { key: 'baking', label: 'אפייה' },
  { key: 'main', label: 'מנה עיקרית' },
  { key: 'side', label: 'תוספת' },
  { key: 'snack', label: 'נשנוש' },
]

export function labelFor(items: TaxonomyItem[], key: string): string {
  return items.find((item) => item.key === key)?.label ?? key
}

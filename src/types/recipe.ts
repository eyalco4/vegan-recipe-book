export type Unit = 'g' | 'ml' | 'unit' | 'tbsp' | 'tsp' | 'cup'

export interface RecipeIngredient {
  ingredientKey: string
  amount: number
  unit: Unit
  /** Free-text note shown alongside the ingredient, e.g. "קצוץ דק" */
  note?: string
}

/** For ingredients with no nutrition value worth tracking (spices, water, salt) */
export interface FreeTextIngredient {
  text: string
}

export type IngredientLine = RecipeIngredient | FreeTextIngredient

export function isFreeTextIngredient(line: IngredientLine): line is FreeTextIngredient {
  return 'text' in line
}

export interface Recipe {
  id: string
  title: string
  category: string[]
  proteinType: string[]
  servings: number
  prepTimeMinutes?: number
  ingredients: IngredientLine[]
  instructions: string[]
  sourceUrl?: string
  sourceName?: string
}

export interface NutritionPer100g {
  name: string
  protein: number
  carbs: number
  calories: number
}

export interface NutritionTotals {
  protein: number
  carbs: number
  calories: number
}

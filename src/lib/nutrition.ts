import { ingredients } from '../data/ingredients'
import { isFreeTextIngredient, type Recipe, type NutritionTotals, type Unit } from '../types/recipe'

/** Rough gram-equivalents for non-weight units, used only when nutrition data is per 100g */
const GRAMS_PER_UNIT: Record<Unit, number | null> = {
  g: 1,
  ml: 1,
  tbsp: 15,
  tsp: 5,
  cup: 240,
  unit: null, // no sensible generic conversion; treated as 0-weight for nutrition purposes
}

export function calculateNutrition(recipe: Recipe): NutritionTotals {
  return recipe.ingredients.reduce<NutritionTotals>(
    (totals, line) => {
      if (isFreeTextIngredient(line)) return totals

      const info = ingredients[line.ingredientKey]
      if (!info) return totals

      const grams = (GRAMS_PER_UNIT[line.unit] ?? 0) * line.amount
      const factor = grams / 100

      return {
        protein: totals.protein + info.protein * factor,
        carbs: totals.carbs + info.carbs * factor,
        calories: totals.calories + info.calories * factor,
      }
    },
    { protein: 0, carbs: 0, calories: 0 },
  )
}

export function roundNutrition(totals: NutritionTotals): NutritionTotals {
  return {
    protein: Math.round(totals.protein),
    carbs: Math.round(totals.carbs),
    calories: Math.round(totals.calories),
  }
}

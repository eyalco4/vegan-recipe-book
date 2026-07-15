import { describe, it, expect } from 'vitest'
import { calculateNutrition, roundNutrition } from './nutrition'
import type { Recipe } from '../types/recipe'

describe('calculateNutrition', () => {
  it('sums nutrition across structured ingredients and ignores free text', () => {
    const recipe: Recipe = {
      id: 'test',
      title: 'test recipe',
      category: [],
      proteinType: [],
      servings: 1,
      ingredients: [
        { ingredientKey: 'lentils_cooked', amount: 200, unit: 'g' }, // x2 of per-100g
        { text: 'salt to taste' },
      ],
      instructions: [],
    }

    const totals = roundNutrition(calculateNutrition(recipe))
    expect(totals).toEqual({ protein: 18, carbs: 40, calories: 232 })
  })

  it('ignores unknown ingredient keys instead of throwing', () => {
    const recipe: Recipe = {
      id: 'test2',
      title: 'test recipe 2',
      category: [],
      proteinType: [],
      servings: 1,
      ingredients: [{ ingredientKey: 'does_not_exist', amount: 100, unit: 'g' }],
      instructions: [],
    }

    expect(calculateNutrition(recipe)).toEqual({ protein: 0, carbs: 0, calories: 0 })
  })
})

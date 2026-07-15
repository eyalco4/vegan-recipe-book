import type { Recipe } from '../types/recipe'
import { CATEGORIES, PROTEIN_TYPES, labelFor } from '../data/taxonomy'
import { calculateNutrition, roundNutrition } from '../lib/nutrition'
import './RecipeCard.css'

interface RecipeCardProps {
  recipe: Recipe
  onClick: () => void
}

export function RecipeCard({ recipe, onClick }: RecipeCardProps) {
  const nutrition = roundNutrition(calculateNutrition(recipe))

  return (
    <button type="button" className="recipe-card" onClick={onClick}>
      <h3 className="recipe-card__title">{recipe.title}</h3>

      <div className="recipe-card__tags">
        {recipe.proteinType.map((key) => (
          <span key={key} className="tag tag--protein">
            {labelFor(PROTEIN_TYPES, key)}
          </span>
        ))}
        {recipe.category.map((key) => (
          <span key={key} className="tag tag--category">
            {labelFor(CATEGORIES, key)}
          </span>
        ))}
      </div>

      <div className="recipe-card__nutrition">
        <span>{nutrition.calories} קל׳</span>
        <span>{nutrition.protein}g חלבון</span>
        <span>{nutrition.carbs}g פחמימה</span>
      </div>
    </button>
  )
}

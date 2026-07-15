import type { Recipe } from '../types/recipe'
import { isFreeTextIngredient } from '../types/recipe'
import { CATEGORIES, PROTEIN_TYPES, labelFor } from '../data/taxonomy'
import { ingredients } from '../data/ingredients'
import { calculateNutrition, roundNutrition } from '../lib/nutrition'
import './RecipeDetail.css'

const UNIT_LABELS: Record<string, string> = {
  g: 'גרם',
  ml: 'מ״ל',
  unit: 'יחידות',
  tbsp: 'כפות',
  tsp: 'כפיות',
  cup: 'כוסות',
}

interface RecipeDetailProps {
  recipe: Recipe
  onBack: () => void
}

export function RecipeDetail({ recipe, onBack }: RecipeDetailProps) {
  const nutrition = roundNutrition(calculateNutrition(recipe))

  return (
    <div className="recipe-detail">
      <button type="button" className="back-link" onClick={onBack}>
        ← חזרה לכל המתכונים
      </button>

      <h2 className="recipe-detail__title">{recipe.title}</h2>

      <div className="recipe-detail__tags">
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

      <div className="recipe-detail__meta">
        <span>{recipe.servings} מנות</span>
        {recipe.prepTimeMinutes && <span>{recipe.prepTimeMinutes} דקות</span>}
      </div>

      <div className="nutrition-box">
        <div className="nutrition-box__item">
          <strong>{nutrition.calories}</strong>
          <span>קלוריות</span>
        </div>
        <div className="nutrition-box__item">
          <strong>{nutrition.protein}g</strong>
          <span>חלבון</span>
        </div>
        <div className="nutrition-box__item">
          <strong>{nutrition.carbs}g</strong>
          <span>פחמימות</span>
        </div>
      </div>

      <div className="recipe-detail__body">
        <section>
          <h3>מרכיבים</h3>
          <ul className="ingredient-list">
            {recipe.ingredients.map((line, i) =>
              isFreeTextIngredient(line) ? (
                <li key={i}>{line.text}</li>
              ) : (
                <li key={i}>
                  {line.amount} {UNIT_LABELS[line.unit] ?? line.unit} {ingredients[line.ingredientKey]?.name ?? line.ingredientKey}
                  {line.note ? ` (${line.note})` : ''}
                </li>
              ),
            )}
          </ul>
        </section>

        <section>
          <h3>הוראות הכנה</h3>
          <ol className="instruction-list">
            {recipe.instructions.map((step, i) => (
              <li key={i}>{step}</li>
            ))}
          </ol>
        </section>
      </div>

      {recipe.sourceUrl && (
        <a
          className="source-link"
          href={recipe.sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          מקור המתכון{recipe.sourceName ? `: ${recipe.sourceName}` : ''} ↗
        </a>
      )}
    </div>
  )
}

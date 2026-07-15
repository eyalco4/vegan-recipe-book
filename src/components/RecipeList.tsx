import type { Recipe } from '../types/recipe'
import { RecipeCard } from './RecipeCard'
import './RecipeList.css'

interface RecipeListProps {
  recipes: Recipe[]
  onSelect: (id: string) => void
}

export function RecipeList({ recipes, onSelect }: RecipeListProps) {
  if (recipes.length === 0) {
    return <p className="recipe-list__empty">לא נמצאו מתכונים התואמים לסינון.</p>
  }

  return (
    <div className="recipe-list">
      {recipes.map((recipe) => (
        <RecipeCard key={recipe.id} recipe={recipe} onClick={() => onSelect(recipe.id)} />
      ))}
    </div>
  )
}

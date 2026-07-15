import type { Recipe } from '../../types/recipe'

const modules = import.meta.glob<{ default: Recipe }>('./*.json', { eager: true })

export const recipes: Recipe[] = Object.values(modules)
  .map((mod) => mod.default)
  .sort((a, b) => a.title.localeCompare(b.title, 'he'))

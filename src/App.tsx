import { useEffect, useMemo, useState } from 'react'
import { recipes } from './data/recipes'
import { FilterBar } from './components/FilterBar'
import { RecipeList } from './components/RecipeList'
import { RecipeDetail } from './components/RecipeDetail'
import './App.css'

function getIdFromHash(): string | null {
  const hash = window.location.hash
  const match = hash.match(/^#\/recipe\/(.+)$/)
  return match ? decodeURIComponent(match[1]) : null
}

function App() {
  const [selectedId, setSelectedId] = useState<string | null>(getIdFromHash)
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedProteinTypes, setSelectedProteinTypes] = useState<string[]>([])

  useEffect(() => {
    const onHashChange = () => setSelectedId(getIdFromHash())
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  const selectedRecipe = useMemo(
    () => recipes.find((r) => r.id === selectedId) ?? null,
    [selectedId],
  )

  const filteredRecipes = useMemo(() => {
    return recipes.filter((recipe) => {
      const categoryMatch =
        selectedCategories.length === 0 ||
        selectedCategories.some((c) => recipe.category.includes(c))
      const proteinMatch =
        selectedProteinTypes.length === 0 ||
        selectedProteinTypes.some((p) => recipe.proteinType.includes(p))
      return categoryMatch && proteinMatch
    })
  }, [selectedCategories, selectedProteinTypes])

  function toggle(list: string[], setList: (v: string[]) => void, key: string) {
    setList(list.includes(key) ? list.filter((k) => k !== key) : [...list, key])
  }

  function goToRecipe(id: string) {
    window.location.hash = `/recipe/${encodeURIComponent(id)}`
  }

  function goHome() {
    window.location.hash = ''
  }

  return (
    <div className="app">
      <header className="app__header">
        <h1 onClick={goHome} className="app__logo">
          🌱 המטבח שלנו
        </h1>
      </header>

      <main className="app__main">
        {selectedRecipe ? (
          <RecipeDetail recipe={selectedRecipe} onBack={goHome} />
        ) : (
          <>
            <FilterBar
              selectedCategories={selectedCategories}
              selectedProteinTypes={selectedProteinTypes}
              onToggleCategory={(key) => toggle(selectedCategories, setSelectedCategories, key)}
              onToggleProteinType={(key) =>
                toggle(selectedProteinTypes, setSelectedProteinTypes, key)
              }
              onClear={() => {
                setSelectedCategories([])
                setSelectedProteinTypes([])
              }}
            />
            <RecipeList recipes={filteredRecipes} onSelect={goToRecipe} />
          </>
        )}
      </main>
    </div>
  )
}

export default App

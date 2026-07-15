import { CATEGORIES, PROTEIN_TYPES } from '../data/taxonomy'
import './FilterBar.css'

interface FilterBarProps {
  selectedCategories: string[]
  selectedProteinTypes: string[]
  onToggleCategory: (key: string) => void
  onToggleProteinType: (key: string) => void
  onClear: () => void
}

export function FilterBar({
  selectedCategories,
  selectedProteinTypes,
  onToggleCategory,
  onToggleProteinType,
  onClear,
}: FilterBarProps) {
  const hasFilters = selectedCategories.length > 0 || selectedProteinTypes.length > 0

  return (
    <div className="filter-bar">
      <div className="filter-group">
        <span className="filter-group__label">סוג חלבון</span>
        <div className="filter-chips">
          {PROTEIN_TYPES.map((item) => (
            <button
              key={item.key}
              type="button"
              className={`chip${selectedProteinTypes.includes(item.key) ? ' chip--active' : ''}`}
              onClick={() => onToggleProteinType(item.key)}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      <div className="filter-group">
        <span className="filter-group__label">קטגוריה</span>
        <div className="filter-chips">
          {CATEGORIES.map((item) => (
            <button
              key={item.key}
              type="button"
              className={`chip${selectedCategories.includes(item.key) ? ' chip--active' : ''}`}
              onClick={() => onToggleCategory(item.key)}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {hasFilters && (
        <button type="button" className="filter-clear" onClick={onClear}>
          נקה סינון
        </button>
      )}
    </div>
  )
}

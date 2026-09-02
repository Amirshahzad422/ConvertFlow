"use client";

interface CategoryNavProps<T extends string> {
  categories: { id: T; label: string }[];
  active: T;
  onChange: (id: T) => void;
}

export function CategoryNav<T extends string>({ categories, active, onChange }: CategoryNavProps<T>) {
  return (
    <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter by category">
      {categories.map((category) => {
        const isActive = category.id === active;
        return (
          <button
            key={category.id}
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(category.id)}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
              isActive
                ? "bg-indigo-600 text-white shadow-sm"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            {category.label}
          </button>
        );
      })}
    </div>
  );
}

"use client";

import { Category, CATEGORY_META } from "@/lib/types";
import { CategoryIcon } from "./CategoryIcon";

interface SidebarProps {
  activeCategory: Category | null;
  onCategoryChange: (category: Category | null) => void;
  categories: { category: Category; count: number }[];
}

export function Sidebar({
  activeCategory,
  onCategoryChange,
  categories,
}: SidebarProps) {
  return (
    <nav className="sticky top-0 h-screen flex flex-col justify-between py-3 px-2">
      <div className="space-y-0.5">
        {/* Logo */}
        <div className="px-3 py-3 mb-2">
          <h1 className="text-xl font-bold text-[var(--foreground)]">
            infomaxxxing
          </h1>
        </div>

        {/* All feed */}
        <button
          onClick={() => onCategoryChange(null)}
          className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-full transition-colors text-left ${
            activeCategory === null
              ? "font-bold text-[var(--foreground)] bg-[var(--card)]"
              : "text-[var(--foreground)] hover:bg-[var(--card)]"
          }`}
        >
          <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-[26px] h-[26px]"
          >
            <path d="M12 9c-2.209 0-4 1.791-4 4s1.791 4 4 4 4-1.791 4-4-1.791-4-4-4zm0 6c-1.105 0-2-.895-2-2s.895-2 2-2 2 .895 2 2-.895 2-2 2zm0-13.304L.622 8.807l1.06 1.696L12 3.696l10.318 6.807 1.06-1.696L12 1.696zM12 16.984l-7.26-4.793-1.06 1.696L12 20.696l8.318-6.807-1.06-1.696L12 16.984z" />
          </svg>
          <span className="text-[20px]">All</span>
        </button>

        {/* Category nav items */}
        {categories.map(({ category, count }) => {
          const meta = CATEGORY_META[category];
          const isActive = activeCategory === category;
          return (
            <button
              key={category}
              onClick={() => onCategoryChange(isActive ? null : category)}
              className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-full transition-colors text-left ${
                isActive
                  ? "font-bold text-[var(--foreground)] bg-[var(--card)]"
                  : "text-[var(--foreground)] hover:bg-[var(--card)]"
              }`}
            >
              <div
                className="w-[26px] h-[26px] flex items-center justify-center"
                style={{ color: isActive ? meta.color : "currentColor" }}
              >
                <CategoryIcon category={category} />
              </div>
              <span className="text-[20px]">{meta.label}</span>
              <span className="text-[var(--muted)] text-sm ml-auto">
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Bottom info */}
      <div className="px-3 py-2 text-[13px] text-[var(--muted)]">
        Scroll to learn. Tap to expand.
      </div>
    </nav>
  );
}

"use client";

import { useState, useCallback } from "react";
import { CATEGORY_META } from "@/lib/types";
import { ConceptSummary } from "@/lib/concepts";

interface RightSidebarProps {
  totalCount: number;
  suggestionPool: ConceptSummary[];
  initialSuggestions: ConceptSummary[];
  searchQuery: string;
  onSearch: (query: string) => void;
  seenCount?: number;
  milestones?: number[];
  celebratedMilestones?: number[];
}

function shufflePick(pool: ConceptSummary[]): ConceptSummary[] {
  const seen = new Set<string>();
  const picks: ConceptSummary[] = [];
  const shuffled = [...pool].sort(() => Math.random() - 0.5);
  for (const c of shuffled) {
    if (!seen.has(c.category)) {
      seen.add(c.category);
      picks.push(c);
    }
    if (picks.length >= 5) break;
  }
  return picks;
}

export function RightSidebar({
  totalCount,
  suggestionPool,
  initialSuggestions,
  searchQuery,
  onSearch,
  seenCount = 0,
  milestones = [],
  celebratedMilestones = [],
}: RightSidebarProps) {
  const [suggestions, setSuggestions] = useState(initialSuggestions);

  const reshuffle = useCallback(() => {
    setSuggestions(shufflePick(suggestionPool));
  }, [suggestionPool]);

  return (
    <div className="sticky top-0 h-screen py-3 space-y-4">
      {/* Search */}
      <div className="relative">
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[var(--muted)]"
        >
          <path d="M10.25 3.75c-3.59 0-6.5 2.91-6.5 6.5s2.91 6.5 6.5 6.5c1.795 0 3.419-.726 4.596-1.904 1.178-1.177 1.904-2.801 1.904-4.596 0-3.59-2.91-6.5-6.5-6.5zm-8.5 6.5c0-4.694 3.806-8.5 8.5-8.5s8.5 3.806 8.5 8.5c0 1.986-.682 3.815-1.824 5.262l4.781 4.781-1.414 1.414-4.781-4.781c-1.447 1.142-3.276 1.824-5.262 1.824-4.694 0-8.5-3.806-8.5-8.5z" />
        </svg>
        <input
          type="text"
          placeholder="Search concepts"
          value={searchQuery}
          onChange={(e) => onSearch(e.target.value)}
          className="w-full bg-[var(--background)] text-[var(--foreground)] placeholder-[var(--muted)] rounded-full py-2.5 pl-10 pr-8 text-[15px] border border-[var(--border)] focus:border-[var(--accent)] outline-none transition-colors"
        />
        {searchQuery && (
          <button
            onClick={() => onSearch("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
              <path d="M18.3 5.71a1 1 0 00-1.42 0L12 10.59 7.12 5.71a1 1 0 00-1.42 1.42L10.59 12l-4.89 4.88a1 1 0 001.42 1.42L12 13.41l4.88 4.89a1 1 0 001.42-1.42L13.41 12l4.89-4.88a1 1 0 000-1.41z" />
            </svg>
          </button>
        )}
      </div>

      {/* What to learn - suggestions */}
      <div className="bg-[var(--background)] border border-[var(--border)] rounded-2xl overflow-hidden">
        <h3 className="px-4 py-3 text-[20px] font-bold text-[var(--foreground)]">
          What to learn
        </h3>
        {suggestions.map((concept) => {
          const meta = CATEGORY_META[concept.category];
          return (
            <div
              key={concept.id}
              onClick={() => onSearch(concept.term)}
              className="px-4 py-3 hover:bg-[var(--hover)] transition-colors cursor-pointer border-t border-[var(--border)]"
            >
              <p className="text-[13px] text-[var(--muted)]">
                {meta.label}
              </p>
              <p className="text-[15px] font-bold text-[var(--foreground)] leading-5">
                {concept.term}
              </p>
              <p className="text-[13px] text-[var(--muted)] mt-0.5 line-clamp-1">
                {concept.oneLiner}
              </p>
            </div>
          );
        })}
        <div
          onClick={reshuffle}
          className="px-4 py-3 text-[var(--accent)] text-[15px] hover:bg-[var(--hover)] transition-colors cursor-pointer border-t border-[var(--border)]"
        >
          Show more
        </div>
      </div>

      {/* Your Progress */}
      <div className="bg-[var(--background)] border border-[var(--border)] rounded-2xl overflow-hidden">
        <div className="px-4 py-3 flex items-center justify-between">
          <h3 className="text-[20px] font-bold text-[var(--foreground)]">
            Your Progress
          </h3>
          <span className="text-[13px] text-[var(--muted)]">{seenCount} / {totalCount}</span>
        </div>
        <div className="px-4 pb-2">
          <div className="h-[3px] bg-[var(--border)] rounded-full overflow-hidden">
            <div
              className="h-full bg-[var(--accent)] rounded-full transition-all duration-500"
              style={{ width: `${Math.min((seenCount / totalCount) * 100, 100)}%` }}
            />
          </div>
        </div>
        {milestones.length > 0 && (
          <div className="px-4 py-2 flex flex-wrap gap-1.5 border-t border-[var(--border)]">
            {milestones.map((m) => {
              const achieved = celebratedMilestones.includes(m);
              return (
                <span
                  key={m}
                  className={`text-[12px] px-2 py-0.5 rounded font-mono ${
                    achieved
                      ? "text-[var(--accent)]"
                      : "text-[var(--muted)]"
                  }`}
                >
                  {achieved && "\u2713 "}{m}
                </span>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

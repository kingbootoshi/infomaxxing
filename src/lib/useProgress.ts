"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { Category } from "./types";

const STORAGE_KEY = "infomaxxxing_progress";
const MILESTONES = [10, 25, 50, 100, 250, 560];

interface SeenConcept {
  timestamp: number;
  category: Category;
  term: string;
}

interface ProgressData {
  seen: Record<string, SeenConcept>;
  celebratedMilestones: number[];
}

function loadProgress(): ProgressData {
  if (typeof window === "undefined")
    return { seen: {}, celebratedMilestones: [] };
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { seen: {}, celebratedMilestones: [] };
    return JSON.parse(raw);
  } catch {
    return { seen: {}, celebratedMilestones: [] };
  }
}

function saveProgress(data: ProgressData) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // localStorage full or unavailable
  }
}

export function useProgress() {
  const [data, setData] = useState<ProgressData>({
    seen: {},
    celebratedMilestones: [],
  });
  const [pendingMilestone, setPendingMilestone] = useState<number | null>(null);
  const initialized = useRef(false);

  useEffect(() => {
    if (!initialized.current) {
      setData(loadProgress());
      initialized.current = true;
    }
  }, []);

  const markSeen = useCallback(
    (id: string, term: string, category: Category) => {
      setData((prev) => {
        if (prev.seen[id]) return prev;

        const next: ProgressData = {
          ...prev,
          seen: {
            ...prev.seen,
            [id]: { timestamp: Date.now(), category, term },
          },
        };

        const count = Object.keys(next.seen).length;

        for (const m of MILESTONES) {
          if (count >= m && !next.celebratedMilestones.includes(m)) {
            next.celebratedMilestones = [...next.celebratedMilestones, m];
            setPendingMilestone(m);
            break;
          }
        }

        saveProgress(next);
        return next;
      });
    },
    []
  );

  const dismissMilestone = useCallback(() => {
    setPendingMilestone(null);
  }, []);

  const seenCount = Object.keys(data.seen).length;
  const seenIds = new Set(Object.keys(data.seen));

  const categoryCounts: Partial<Record<Category, number>> = {};
  for (const entry of Object.values(data.seen)) {
    categoryCounts[entry.category] =
      (categoryCounts[entry.category] || 0) + 1;
  }

  const recentConcepts = Object.entries(data.seen)
    .sort((a, b) => b[1].timestamp - a[1].timestamp)
    .slice(0, 5)
    .map(([id, info]) => ({ id, ...info }));

  return {
    seenCount,
    seenIds,
    categoryCounts,
    recentConcepts,
    pendingMilestone,
    markSeen,
    dismissMilestone,
    celebratedMilestones: data.celebratedMilestones,
    milestones: MILESTONES,
  };
}

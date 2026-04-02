export interface Concept {
  id: string;
  term: string;
  category: Category;
  tags: string[];
  oneLiner: string;
  body: string;
  example?: string;
  whyItMatters: string;
  relatedTerms: string[];
}

export type Category =
  | "ai"
  | "security"
  | "networking"
  | "algorithms"
  | "data-structures"
  | "design-patterns"
  | "systems"
  | "web"
  | "databases"
  | "devops"
  | "cryptography"
  | "architecture"
  | "programming"
  | "performance"
  | "concurrency";

export const CATEGORY_META: Record<Category, { label: string; icon: string; color: string }> = {
  ai: { label: "AI", icon: "brain", color: "#e040fb" },
  security: { label: "Security", icon: "shield", color: "#f43f5e" },
  networking: { label: "Networking", icon: "globe", color: "#3b82f6" },
  algorithms: { label: "Algorithms", icon: "cpu", color: "#8b5cf6" },
  "data-structures": { label: "Data Structures", icon: "layers", color: "#f59e0b" },
  "design-patterns": { label: "Design Patterns", icon: "grid", color: "#10b981" },
  systems: { label: "Systems", icon: "server", color: "#6366f1" },
  web: { label: "Web", icon: "code", color: "#06b6d4" },
  databases: { label: "Databases", icon: "database", color: "#ec4899" },
  devops: { label: "DevOps", icon: "terminal", color: "#84cc16" },
  cryptography: { label: "Cryptography", icon: "lock", color: "#f97316" },
  architecture: { label: "Architecture", icon: "building", color: "#14b8a6" },
  programming: { label: "Programming", icon: "braces", color: "#a855f7" },
  performance: { label: "Performance", icon: "zap", color: "#eab308" },
  concurrency: { label: "Concurrency", icon: "shuffle", color: "#0ea5e9" },
};

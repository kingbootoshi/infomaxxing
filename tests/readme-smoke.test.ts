import { describe, expect, it } from "bun:test";
import { readFileSync } from "node:fs";
import { join } from "node:path";

const README_PATH = join(import.meta.dir, "..", "README.md");
const REQUIRED_LINE = "Hello from Dispatch smoke test.";

describe("README smoke test", () => {
  const content = readFileSync(README_PATH, "utf-8");
  const lines = content.split("\n");
  // Strip trailing empty lines to find the last meaningful line
  const nonEmptyLines = lines.filter((l) => l.trim() !== "");

  it("README.md ends with the required smoke test line", () => {
    const lastMeaningfulLine = nonEmptyLines[nonEmptyLines.length - 1];
    expect(lastMeaningfulLine).toBe(REQUIRED_LINE);
  });

  it("README.md contains exactly one occurrence of the required line", () => {
    const occurrences = lines.filter((l) => l === REQUIRED_LINE).length;
    expect(occurrences).toBe(1);
  });

  it("README.md retains all pre-existing content (at least 65 lines before the appended line)", () => {
    // The original file had 65 lines; after appending, total must be greater
    expect(lines.length).toBeGreaterThan(65);
  });

  it("README.md still contains core original content", () => {
    expect(content).toContain("Doomscroll your way to knowledge.");
    expect(content).toContain("MIT");
  });
});

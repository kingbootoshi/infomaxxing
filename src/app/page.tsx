import { getCategories, getTotalCount, getSuggestionPool, getInitialSuggestions } from "@/lib/concepts";
import { HomeClient } from "@/components/HomeClient";

export default function Home() {
  const categories = getCategories();
  const totalCount = getTotalCount();
  const suggestionPool = getSuggestionPool(30);
  const initialSuggestions = getInitialSuggestions(suggestionPool);

  return (
    <HomeClient
      categories={categories}
      totalCount={totalCount}
      suggestionPool={suggestionPool}
      initialSuggestions={initialSuggestions}
    />
  );
}

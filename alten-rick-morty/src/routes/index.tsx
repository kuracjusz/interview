import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { Characters } from "../Components/Characters";

const queryClient = new QueryClient();

type CharacterSearch = {
  page: number;
};

export const Route = createFileRoute("/")({
  component: Index,
  validateSearch: (search: Record<string, unknown>): CharacterSearch => {
    return {
      page: Number(search.page ?? 1),
    };
  },
});

function Index() {
  return (
    <QueryClientProvider client={queryClient}>
      <Characters />
    </QueryClientProvider>
  );
}

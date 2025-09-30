import { createFileRoute } from "@tanstack/react-router";
import { Characters } from "../Components/Characters";

type CharacterSearch = {
  page: number;
  name: string;
  status: string;
};

export const Route = createFileRoute("/")({
  component: Index,
  validateSearch: (search: Record<string, unknown>): CharacterSearch => {
    return {
      page: Number(search.page ?? 1),
      name: String(search.name ?? ""),
      status: String(search.status ?? ""),
    };
  },
});

function Index() {
  return <Characters />;
}

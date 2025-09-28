import { useQuery } from "@tanstack/react-query";
import { getCharacters } from "../api/getCharacters";

export function useCharactersData({ page }: { page: number }) {
  const { data, isPending, isError } = useQuery({
    queryKey: ["characters", page],
    queryFn: () => getCharacters({ page }),
  });

  return { data, isPending, isError };
}

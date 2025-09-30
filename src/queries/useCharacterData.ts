import { useQuery } from "@tanstack/react-query";
import { getCharacter } from "../api/getCharacter";

export function useCharacterData(id: string) {
  const { data, isPending, isError } = useQuery({
    queryKey: ["character", id],
    queryFn: () => getCharacter(id),
  });

  return { data, isPending, isError };
}

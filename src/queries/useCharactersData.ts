import { useQuery } from "@tanstack/react-query";
import { getCharacters } from "../api/getCharacters";

export function useCharactersData({
  page,
  name,
  status,
}: {
  page: number;
  name: string;
  status: string;
}) {
  const { data, isPending, isError } = useQuery({
    queryKey: ["characters", page, name, status],
    queryFn: () => getCharacters({ page, name, status }),
  });

  return { data, isPending, isError };
}

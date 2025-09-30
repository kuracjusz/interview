import type { Character } from "../types/types";

type CharactersResponse = {
  info: {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
  };
  results: Character[];
};

export async function getCharacters({
  page = 1,
  name = "",
  status = "",
}: {
  page?: number;
  name?: string;
  status?: string;
}): Promise<CharactersResponse> {
  try {
    const response = await fetch(
      `https://rickandmortyapi.com/api/character?page=${page}&name=${name}&status=${status}`
    );
    const data = await response.json();
    if (response.status === 404) {
      return {
        info: {
          count: 0,
          pages: 0,
          next: null,
          prev: null,
        },
        results: [],
      };
    }
    return data;
  } catch (error) {
    console.error("Error fetching characters:", error);
    throw error;
  }
}

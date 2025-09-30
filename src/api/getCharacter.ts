import type { Character } from "../types/types";

type CharacterResponse = Character | undefined;

export async function getCharacter(id: string): Promise<CharacterResponse> {
  try {
    const response = await fetch(
      `https://rickandmortyapi.com/api/character/${id}`
    );
    const data = await response.json();
    if (response.status === 404) {
      return undefined;
    }
    return data;
  } catch (error) {
    console.error("Error fetching characters:", error);
    throw error;
  }
}

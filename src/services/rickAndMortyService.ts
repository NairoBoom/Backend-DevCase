import axios from 'axios';

const RICK_AND_MORTY_API = 'https://rickandmortyapi.com/graphql';

interface CharacterData {
  id: number;
  name: string;
  status: string;
  species: string;
  gender: string;
  origin: {
    name: string;
  };
  image: string;
}

export const fetchCharactersFromAPI = async (filters: any = {}) => {
  const { status, species, gender, name } = filters;

  const query = `
    query {
      characters(filter: {
        ${status ? `status: "${status}"` : ''}
        ${species ? `species: "${species}"` : ''}
        ${gender ? `gender: "${gender}"` : ''}
        ${name ? `name: "${name}"` : ''}
      }) {
        results {
          id
          name
          status
          species
          gender
          origin {
            name
          }
          image
        }
      }
    }
  `;

  try {
    const response = await axios.post(RICK_AND_MORTY_API, { query });
    const characters = response.data.data.characters.results;

    return characters.map((char: CharacterData) => ({
      id: char.id,
      name: char.name,
      status: char.status,
      species: char.species,
      gender: char.gender,
      origin: char.origin.name,
      image: char.image
    }));
  } catch (error) {
    console.error('Error fetching from Rick and Morty API:', error);
    throw error;
  }
};

export const fetchCharacterById = async (id: number) => {
  const query = `
    query {
      character(id: ${id}) {
        id
        name
        status
        species
        gender
        origin {
          name
        }
        image
      }
    }
  `;

  try {
    const response = await axios.post(RICK_AND_MORTY_API, { query });
    const char = response.data.data.character;

    return {
      id: char.id,
      name: char.name,
      status: char.status,
      species: char.species,
      gender: char.gender,
      origin: char.origin.name,
      image: char.image
    };
  } catch (error) {
    console.error('Error fetching character by ID:', error);
    throw error;
  }
};

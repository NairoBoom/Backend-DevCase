import Character from '../models/Character';
import redisClient from '../config/redis';
import { Op } from 'sequelize';
import { measureTime } from '../decorators/measureTime';

interface CharacterFilters {
  status?: string;
  species?: string;
  gender?: string;
  name?: string;
  origin?: string;
}

class CharacterResolver {
  @measureTime
  async characters(filters: CharacterFilters) {
    // Generate unique cache key based on filters
    const cacheKey = `characters:${JSON.stringify(filters)}`;

    try {
      // Check if data exists in cache
      const cachedData = await redisClient.get(cacheKey);

      if (cachedData) {
        console.log('Returning cached data');
        return JSON.parse(cachedData);
      }

      // Build query for database
      const whereClause: any = {};

      // Exact match filters
      if (filters.status) whereClause.status = filters.status;
      if (filters.species) whereClause.species = filters.species;
      if (filters.gender) whereClause.gender = filters.gender;

      // Partial match filters (name and origin allow text search)
      if (filters.name) whereClause.name = { [Op.like]: `%${filters.name}%` };
      if (filters.origin) whereClause.origin = { [Op.like]: `%${filters.origin}%` };

      const characters = await Character.findAll({ where: whereClause });

      // Save to cache for 1 hour
      await redisClient.setEx(cacheKey, 3600, JSON.stringify(characters));

      console.log('Returning database data and caching it');
      return characters;
    } catch (error) {
      console.error('Error in characters resolver:', error);
      throw error;
    }
  }
}

const resolverInstance = new CharacterResolver();

const resolvers = {
  characters: (filters: CharacterFilters) => resolverInstance.characters(filters)
};

export default resolvers;

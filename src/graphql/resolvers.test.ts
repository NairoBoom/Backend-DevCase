import Character from '../models/Character';
import redisClient from '../config/redis';
import { Op } from 'sequelize';

jest.mock('../models/Character');
jest.mock('../config/redis');

describe('Character Resolver', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('characters query', () => {
    // Test that we return cached data instead of hitting the DB
    it('should return cached data when available', async () => {
      const mockCharacters = [
        { id: 1, name: 'Rick Sanchez', status: 'Alive', species: 'Human', gender: 'Male', origin: 'Earth' }
      ];
      const cachedData = JSON.stringify(mockCharacters);

      // Mock Redis to return cached data
      (redisClient.get as jest.Mock).mockResolvedValue(cachedData);

      const { default: resolvers } = await import('./resolvers');
      const result = await resolvers.characters({ status: 'Alive' });

      expect(result).toEqual(mockCharacters);
      expect(redisClient.get).toHaveBeenCalledWith('characters:{"status":"Alive"}');
      expect(Character.findAll).not.toHaveBeenCalled();
    });

    // Make sure we hit the DB when there's no cache
    it('should query database when cache is empty', async () => {
      const mockCharacters = [
        { id: 1, name: 'Rick Sanchez', status: 'Alive', species: 'Human', gender: 'Male', origin: 'Earth' }
      ];

      (redisClient.get as jest.Mock).mockResolvedValue(null);
      (Character.findAll as jest.Mock).mockResolvedValue(mockCharacters);
      (redisClient.setEx as jest.Mock).mockResolvedValue('OK');

      const { default: resolvers } = await import('./resolvers');
      const result = await resolvers.characters({ status: 'Alive' });

      expect(result).toEqual(mockCharacters);
      expect(Character.findAll).toHaveBeenCalledWith({
        where: { status: 'Alive' }
      });
      expect(redisClient.setEx).toHaveBeenCalledWith(
        'characters:{"status":"Alive"}',
        3600,
        JSON.stringify(mockCharacters)
      );
    });

    // Exact filters should match completely (status, species, gender)
    it('should handle exact match filters correctly', async () => {
      (redisClient.get as jest.Mock).mockResolvedValue(null);
      (Character.findAll as jest.Mock).mockResolvedValue([]);
      (redisClient.setEx as jest.Mock).mockResolvedValue('OK');

      const { default: resolvers } = await import('./resolvers');
      await resolvers.characters({
        status: 'Alive',
        species: 'Human',
        gender: 'Male'
      });

      expect(Character.findAll).toHaveBeenCalledWith({
        where: {
          status: 'Alive',
          species: 'Human',
          gender: 'Male'
        }
      });
    });

    // Name search should be partial match with LIKE
    it('should handle partial match filters (name) correctly', async () => {
      (redisClient.get as jest.Mock).mockResolvedValue(null);
      (Character.findAll as jest.Mock).mockResolvedValue([]);
      (redisClient.setEx as jest.Mock).mockResolvedValue('OK');

      const { default: resolvers } = await import('./resolvers');
      await resolvers.characters({ name: 'Rick' });

      expect(Character.findAll).toHaveBeenCalledWith({
        where: {
          name: { [Op.like]: '%Rick%' }
        }
      });
    });

    // Origin search should also use LIKE
    it('should handle partial match filters (origin) correctly', async () => {
      (redisClient.get as jest.Mock).mockResolvedValue(null);
      (Character.findAll as jest.Mock).mockResolvedValue([]);
      (redisClient.setEx as jest.Mock).mockResolvedValue('OK');

      const { default: resolvers } = await import('./resolvers');
      await resolvers.characters({ origin: 'Earth' });

      expect(Character.findAll).toHaveBeenCalledWith({
        where: {
          origin: { [Op.like]: '%Earth%' }
        }
      });
    });

    // Check that multiple filters work together
    it('should handle combined filters correctly', async () => {
      (redisClient.get as jest.Mock).mockResolvedValue(null);
      (Character.findAll as jest.Mock).mockResolvedValue([]);
      (redisClient.setEx as jest.Mock).mockResolvedValue('OK');

      const { default: resolvers } = await import('./resolvers');
      await resolvers.characters({
        status: 'Alive',
        name: 'Rick',
        origin: 'Earth'
      });

      expect(Character.findAll).toHaveBeenCalledWith({
        where: {
          status: 'Alive',
          name: { [Op.like]: '%Rick%' },
          origin: { [Op.like]: '%Earth%' }
        }
      });
    });

    // Should work fine with no filters at all
    it('should handle empty filters', async () => {
      (redisClient.get as jest.Mock).mockResolvedValue(null);
      (Character.findAll as jest.Mock).mockResolvedValue([]);
      (redisClient.setEx as jest.Mock).mockResolvedValue('OK');

      const { default: resolvers } = await import('./resolvers');
      await resolvers.characters({});

      expect(Character.findAll).toHaveBeenCalledWith({
        where: {}
      });
    });

    // Make sure errors are propagated correctly
    it('should handle database errors properly', async () => {
      const error = new Error('Database connection failed');
      (redisClient.get as jest.Mock).mockResolvedValue(null);
      (Character.findAll as jest.Mock).mockRejectedValue(error);

      const { default: resolvers } = await import('./resolvers');

      await expect(resolvers.characters({ status: 'Alive' })).rejects.toThrow('Database connection failed');
    });
  });
});

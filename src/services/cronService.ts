import cron from 'node-cron';
import axios from 'axios';
import Character from '../models/Character';
import redisClient from '../config/redis';

// Syncs character data from the Rick & Morty API
async function updateCharacters() {
  try {
    console.log('[CRON] Starting character update...');
    const startTime = Date.now();

    // Grab the first 15 characters from the API
    const response = await axios.get('https://rickandmortyapi.com/api/character');
    const apiCharacters = response.data.results.slice(0, 15);

    let updatedCount = 0;
    let createdCount = 0;

    // Upsert each character (create if new, update if exists)
    for (const char of apiCharacters) {
      const [character, created] = await Character.upsert({
        id: char.id,
        name: char.name,
        status: char.status,
        species: char.species,
        gender: char.gender,
        origin: char.origin.name,
        image: char.image
      });

      if (created) {
        createdCount++;
      } else {
        updatedCount++;
      }
    }

    // Invalidate all character cache entries since we just updated the data
    const keys = await redisClient.keys('characters:*');
    if (keys.length > 0) {
      await redisClient.del(keys);
      console.log(`[CRON] Cleared ${keys.length} cache entries`);
    }

    const duration = Date.now() - startTime;
    console.log(`[CRON] Update completed in ${duration}ms - Created: ${createdCount}, Updated: ${updatedCount}`);
  } catch (error) {
    console.error('[CRON] Error updating characters:', error);
  }
}

// Kicks off the cron job to run every 12 hours
export function startCronJobs() {
  // Runs at 00:00 and 12:00 daily
  cron.schedule('0 */12 * * *', updateCharacters);
  console.log('[CRON] Job scheduled to run every 12 hours');
}

export { updateCharacters };

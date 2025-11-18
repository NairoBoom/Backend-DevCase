'use strict';

const axios = require('axios');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const query = `
      query {
        characters(page: 1) {
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
      const existingCharacters = await queryInterface.sequelize.query(
        'SELECT COUNT(*) as count FROM characters',
        { type: queryInterface.sequelize.QueryTypes.SELECT }
      );

      if (existingCharacters[0].count > 0) {
        console.log('Characters already seeded, skipping...');
        return;
      }

      const response = await axios.post('https://rickandmortyapi.com/graphql', { query });
      const characters = response.data.data.characters.results.slice(0, 15);

      const characterData = characters.map(char => ({
        id: char.id,
        name: char.name,
        status: char.status,
        species: char.species,
        gender: char.gender,
        origin: char.origin.name,
        image: char.image,
        created_at: new Date(),
        updated_at: new Date()
      }));

      await queryInterface.bulkInsert('characters', characterData, {});
      console.log('Successfully seeded 15 characters');
    } catch (error) {
      console.error('Error seeding characters:', error);
      throw error;
    }
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('characters', null, {});
  }
};

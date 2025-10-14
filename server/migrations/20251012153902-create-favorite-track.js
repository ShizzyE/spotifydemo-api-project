'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('FavoriteTracks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id: {
        type: Sequelize.STRING
      },
      name: {
        type: Sequelize.STRING
      },
      artist_name: {
        type: Sequelize.STRING
      },
      artist_id: {
        type: Sequelize.STRING
      },
      album_name: {
        type: Sequelize.STRING
      },
      album_id: {
        type: Sequelize.STRING
      },
      release_date: {
        type: Sequelize.DATE
      },
      image_url: {
        type: Sequelize.STRING
      },
      spotify_url: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('FavoriteTracks');
  }
};
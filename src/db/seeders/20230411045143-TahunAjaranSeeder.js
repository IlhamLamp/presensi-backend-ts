'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('TahunAjaran', [
      {
        TA: '2019',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        TA: '2020',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        TA: '2021',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        TA: '2022',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        TA: '2023',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('TahunAjaran', null, {});
  }
};

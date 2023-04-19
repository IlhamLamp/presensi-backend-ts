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
    await queryInterface.bulkInsert('Kelas', [
      {
        kodeKelas: 'XA1',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        kodeKelas: 'XA2',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        kodeKelas: 'XS1',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        kodeKelas: 'XS2',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        kodeKelas: 'XIA1',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        kodeKelas: 'XIA2',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        kodeKelas: 'XIS1',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        kodeKelas: 'XIS2',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        kodeKelas: 'XIIA1',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        kodeKelas: 'XIIA2',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        kodeKelas: 'XIIS1',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        kodeKelas: 'XIIS2',
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
    await queryInterface.bulkDelete('Kelas', null, {});
  }
};

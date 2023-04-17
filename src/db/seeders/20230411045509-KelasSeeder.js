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
        kodeKelas: 'XA1'
      },
      {
        kodeKelas: 'XA2'
      },
      {
        kodeKelas: 'XS1'
      },
      {
        kodeKelas: 'XS2'
      },
      {
        kodeKelas: 'XIA1'
      },
      {
        kodeKelas: 'XIA2'
      },
      {
        kodeKelas: 'XIS1'
      },
      {
        kodeKelas: 'XIS2'
      },
      {
        kodeKelas: 'XIIA1'
      },
      {
        kodeKelas: 'XIIA2'
      },
      {
        kodeKelas: 'XIIS1'
      },
      {
        kodeKelas: 'XIIS2'
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

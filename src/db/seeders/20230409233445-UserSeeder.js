'use strict';

const { v4: uuidv4 } = require('uuid')

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
    await queryInterface.bulkInsert('User', [
      {
        uuid: uuidv4(),
        name: 'admin',
        email: 'admin@mail.co',
        password: 'admin',
        role: 'admin',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        uuid: uuidv4(),
        name: 'aca',
        email: 'aca@mail.co',
        password: 'aca',
        role: 'user',
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
    await queryInterface.bulkDelete('User', null, {});
  }
};

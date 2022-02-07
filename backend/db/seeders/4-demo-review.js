'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Reviews', [
      {
        userId: 1,
        businessId: 1,
        fieldId: 1,
        position: "server",
        context: "I really like to work here! Gustavo is a great and attentive manager",
        rating: 9
      },
      {
        userId: 2,
        businessId: 1,
        fieldId: 2,
        position: "fryer",
        context: "The job is good, but I fel there's something weird",
        rating: 6
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Reviews', null, {});
  }
};

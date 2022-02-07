'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Businesses', [
      {
        userId: 1,
        title: "Pollos Hermanos",
        description: "Best & Fastest fried chicken in town",
        address: "500 Canal St",
        city: "New Orleans",
        state: "LA",
        zipcode: 70116
      },
      {
        userId: 1,
        title: "Pizza Planet",
        description: "A pizza out of this world",
        address: "1200 Esplanade Ave",
        city: "New Orleans",
        state: "LA",
        zipcode: 70116
      },
      {
        userId: 3,
        title: "Stray Cat Tavern",
        description: "Just a cat's tavern",
        address: "80 New York Ave",
        city: "New York",
        state: "NY",
        zipcode: 10001
      },
      {
        userId: 3,
        title: "Dog Rest",
        description: "Better than a cat's tavern",
        address: "81 New York Ave",
        city: "New York",
        state: "NY",
        zipcode: 10001
      },
      {
        userId: 2,
        title: "Krusty Krab",
        description: "Come Spend Your Money Here",
        address: "80 New York Ave",
        city: "Bikini Bottom",
        state: "FL",
        zipcode: 33142
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Businesses', null, {});
  }
};

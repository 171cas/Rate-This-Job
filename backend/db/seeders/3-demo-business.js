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
        zipcode: 70116,
        imageUrl: "https://media-cdn.grubhub.com/image/upload/d_search:browse-images:default.jpg/w_1200,h_800,f_auto,fl_lossy,q_80,c_fit/fjeheqltxhlj333m3yjl"
      },
      {
        userId: 1,
        title: "Pizza Planet",
        description: "A pizza out of this world",
        address: "1200 Esplanade Ave",
        city: "New Orleans",
        state: "LA",
        zipcode: 70116,
        imageUrl: "https://i.etsystatic.com/8939702/r/il/1429aa/3621444609/il_794xN.3621444609_lh5d.jpg"
      },
      {
        userId: 3,
        title: "Black Cat Tavern",
        description: "Just a cat's tavern",
        address: "80 New York Ave",
        city: "New York",
        state: "NY",
        zipcode: 10001,
        imageUrl: "https://pbs.twimg.com/profile_images/1259602815976001541/Kj_RlZda_400x400.jpg"
      },
      {
        userId: 3,
        title: "Dog Rest",
        description: "Better than a cat's tavern",
        address: "81 New York Ave",
        city: "New York",
        state: "NY",
        zipcode: 10001,
        imageUrl: "https://cdn.dribbble.com/users/3390157/screenshots/6315498/1_4x.png?compress=1&resize=400x300"
      },
      {
        userId: 2,
        title: "Krusty Krab",
        description: "Come Spend Your Money Here",
        address: "80 New York Ave",
        city: "Bikini Bottom",
        state: "FL",
        zipcode: 33142,
        imageUrl: "https://img.buzzfeed.com/buzzfeed-static/static/2018-06/7/14/enhanced/buzzfeed-prod-web-03/enhanced-3865-1528396614-7.png?output-format=jpg&output-quality=auto"
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Businesses', null, {});
  }
};

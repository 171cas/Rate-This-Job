'use strict';

module.exports = (sequelize, DataTypes) => {
  const Business = sequelize.define('Business', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [4, 30]
      }
    },
    description: DataTypes.STRING,
    address: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [10, 30]
      }
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [3, 30]
      }
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [2, 2]
      }
    },
    zipcode: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        len: [5, 5], // something similar that might work?
        min: 0,
        max: 99999
      },
    },
    imageUrl: {
      allowNull: false,
      type: DataTypes.STRING,
    },
  }, {});
  Business.associate = function (models) {
    // associations can be defined here
    Business.belongsTo(models.User, { foreignKey: 'userId' })
    Business.hasMany(models.Review, { onDelete: 'cascade', hooks: true, foreignKey: 'businessId' })
  };
  return Business;
};

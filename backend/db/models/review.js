'use strict';
module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define('Review', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    businessId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    fieldId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    position: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [4, 30]
      }
    },
    context: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [4, 1000]
      }
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 0,
        max: 10
      }
    },
  }, {});
  Review.associate = function (models) {
    // associations can be defined here
    Review.belongsTo(models.User, { foreignKey: 'userId' })
    Review.belongsTo(models.Business, { foreignKey: 'businessId' })
    Review.belongsTo(models.Field, { foreignKey: 'fieldId' })
  };
  return Review;
};

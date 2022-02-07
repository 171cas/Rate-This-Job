'use strict';

module.exports = (sequelize, DataTypes) => {
  const Field = sequelize.define('Field', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [3, 15]
      }
    }
  }, {});
  Field.associate = function (models) {
    Field.hasMany(models.Review, { foreignKey: 'fieldId' });
  };
  return Field;
};

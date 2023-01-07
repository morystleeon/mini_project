'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Merchant extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Products,{
        as: 'products',
        foreignKey: 'merchant_id'
      })
    }
  }
  Merchant.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    address: DataTypes.STRING,
    phone_number: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Merchants',
    tableName: 'merchants'
  });
  return Merchant;
};
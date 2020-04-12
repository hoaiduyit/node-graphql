var Sequelize = require('sequelize');

class PersonModel {
  constructor() {
    this.id = {
      type: Sequelize.STRING,
      allowNull: false,
      primaryKey: true
    };
    this.firstName = {
      type: Sequelize.STRING,
      allowNull: false
    };
    this.lastName = {
      type: Sequelize.STRING,
      allowNull: false
    };
    this.email = {
      type: Sequelize.STRING,
      allowNull: false
    };
    this.phoneNumber = {
      type: Sequelize.STRING,
      allowNull: true
    };
  }
}

module.exports = PersonModel;

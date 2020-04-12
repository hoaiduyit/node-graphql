var Sequelize = require('sequelize');

class NoteModel {
  constructor() {
    this.id = {
      type: Sequelize.STRING,
      allowNull: false,
      primaryKey: true
    };
    this.title = {
      type: Sequelize.STRING,
      allowNull: false
    };
    this.description = {
      type: Sequelize.STRING,
      allowNull: false
    };
    this.isCompleted = {
      type: Sequelize.BOOLEAN,
      allowNull: false
    };
  }
}

module.exports = NoteModel;

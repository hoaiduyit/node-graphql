var Sequelize = require('sequelize');
var PersonModel = require('./models/PersonModel');
var NoteModel = require('./models/NoteModel');

const Connection = new Sequelize('relay', 'root', 'sharingan2503', {
  dialect: 'mysql',
  host: 'localhost',
  port: '3306'
});

const Person = Connection.define('person', new PersonModel());

const Post = Connection.define('post', new NoteModel());

Person.hasMany(Post);
Post.belongsTo(Person);

Connection.sync({ force: true });

module.exports = Connection;

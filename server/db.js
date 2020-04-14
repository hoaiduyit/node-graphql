var Sequelize = require('sequelize');
var PersonEntity = require('./entities/PersonEntity');
var NoteEntity = require('./entities/NoteEntity');

// db name, username, password
const Connection = new Sequelize('relay', 'root', 'sharingan2503', {
  dialect: 'mysql',
  host: 'localhost',
  port: '3306'
});

const Person = Connection.define('person', new PersonEntity());

const Post = Connection.define('post', new NoteEntity());

Person.hasMany(Post);
Post.belongsTo(Person);

Connection.sync({ force: false });

module.exports = Connection;

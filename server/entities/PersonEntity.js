var { GraphQLString, GraphQLList } = require('graphql');
var NoteEntity = require('./NoteEntity');

class PersonEntity {
  constructor() {
    this.id = {
      type: GraphQLString,
      resolve(person) {
        return person.id;
      }
    };
    this.firstName = {
      type: GraphQLString,
      resolve(person) {
        return person.firstName;
      }
    };
    this.lastName = {
      type: GraphQLString,
      resolve(person) {
        return person.lastName;
      }
    };
    this.email = {
      type: GraphQLString,
      resolve(person) {
        return person.email;
      }
    };
    this.phoneNumber = {
      type: GraphQLString,
      resolve(person) {
        return person.phoneNumber;
      }
    };
    this.posts = {
      type: NoteEntity,
      resolve(person) {
        return person.getPosts();
      }
    };
  }
}

module.exports = PersonEntity;

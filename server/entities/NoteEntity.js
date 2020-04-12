var { GraphQLString } = require('graphql');
var PersonEntity = require('./PersonEntity');

const NoteEntity = {
  id: {
    type: GraphQLString,
    resolve(post) {
      return post.id;
    }
  },
  title: {
    type: GraphQLString,
    resolve(post) {
      return post.title;
    }
  },
  description: {
    type: GraphQLString,
    resolve(post) {
      return post.description;
    }
  },
  isCompleted: {
    type: GraphQLString,
    resolve(post) {
      return post.isCompleted;
    }
  },
  person: {
    type: PersonEntity,
    resolve(post) {
      return post.getPerson();
    }
  }
};

module.exports = NoteEntity;

var {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLSchema,
  GraphQLNonNull,
  GraphQLInputObjectType
} = require('graphql');
var uuidv4 = require('uuid/v4');
var Db = require('./db');

const Person = new GraphQLObjectType({
  name: 'Person',
  description: 'This represents a Person',
  fields: () => {
    return {
      id: {
        type: GraphQLString,
        resolve(person) {
          return person.id;
        }
      },
      firstName: {
        type: GraphQLString,
        resolve(person) {
          return person.firstName;
        }
      },
      lastName: {
        type: GraphQLString,
        resolve(person) {
          return person.lastName;
        }
      },
      email: {
        type: GraphQLString,
        resolve(person) {
          return person.email;
        }
      },
      phoneNumber: {
        type: GraphQLString,
        resolve(person) {
          return person.phoneNumber;
        }
      },
      posts: {
        type: new GraphQLList(Post),
        resolve(person) {
          return person.getPosts();
        }
      }
    };
  }
});

const Post = new GraphQLObjectType({
  name: 'Note',
  description: 'This is a note',
  fields: () => {
    return {
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
        type: Person,
        resolve(post) {
          return post.getPerson();
        }
      }
    };
  }
});

const Query = new GraphQLObjectType({
  name: 'Query',
  description: 'This is a root query',
  fields: () => {
    return {
      getPeople: {
        type: new GraphQLList(Person),
        args: {
          id: {
            type: GraphQLString
          }
        },
        resolve(root, args) {
          return Db.models.person.findAll({ where: args });
        }
      },
      getPosts: {
        type: new GraphQLList(Post),
        args: {
          id: {
            type: GraphQLString
          },
          personId: {
            type: GraphQLString
          }
        },
        resolve(root, args) {
          return Db.models.post.findAll({ where: args });
        }
      }
    };
  }
});

const inputPersonArgs = {
  firstName: {
    type: new GraphQLNonNull(GraphQLString)
  },
  lastName: {
    type: new GraphQLNonNull(GraphQLString)
  },
  email: {
    type: new GraphQLNonNull(GraphQLString)
  },
  phoneNumber: {
    type: GraphQLString
  }
};

const inputPersonData = (args) => ({
  firstName: args.firstName,
  lastName: args.lastName,
  email: args.email.toLowerCase(),
  phoneNumber: args.phoneNumber
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  description: 'This is root mutation',
  fields: () => {
    return {
      addPerson: {
        type: Person,
        args: inputPersonArgs,
        resolve(root, args) {
          return Db.models.person.create({
            id: uuidv4(),
            ...inputPersonData(args)
          });
        }
      },
      updatePerson: {
        type: Person,
        args: {
          id: { type: new GraphQLNonNull(GraphQLString) },
          input: {
            type: new GraphQLNonNull(
              new GraphQLInputObjectType({
                name: 'input',
                fields: inputPersonArgs
              })
            )
          }
        },
        resolve: async (root, args) => {
          if (!args.id) {
            throw new Error('ID is not exited.');
          }
          return await Db.models.person
            .findByPk(args.id)
            .then((person) => {
              const p = person;
              p.set('firstName', inputPersonData(args.input).firstName);
              p.set('lastName', inputPersonData(args.input).lastName);
              p.set('email', inputPersonData(args.input).email);
              p.set('phoneNumber', inputPersonData(args.input).phoneNumber);
              return p.save();
            })
            .catch((err) => {
              throw new Error(err);
            });
        }
      }
    };
  }
});

const Schema = new GraphQLSchema({
  query: Query,
  mutation: Mutation
});

module.exports = Schema;

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
var PersonModel = require('./models/PersonModel');
var NoteModel = require('./models/NoteModel');

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
        type: new GraphQLList(Note),
        resolve(person) {
          return person.getPosts();
        }
      }
    };
  }
});

const Note = new GraphQLObjectType({
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
      getPerson: {
        type: Person,
        args: {
          id: {
            type: GraphQLNonNull(GraphQLString)
          }
        },
        resolve(root, args) {
          if (!args.id) {
            throw new Error('ID is not exited.');
          }
          return Db.models.person.findByPk(args.id);
        }
      },
      getPosts: {
        type: new GraphQLList(Note),
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

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  description: 'This is root mutation',
  fields: () => {
    return {
      addUser: {
        type: Person,
        args: {
          firstName: {
            type: GraphQLNonNull(GraphQLString)
          },
          lastName: {
            type: GraphQLNonNull(GraphQLString)
          },
          email: {
            type: GraphQLNonNull(GraphQLString)
          },
          phoneNumber: {
            type: GraphQLString
          }
        },
        resolve(root, args) {
          const person = new PersonModel();
          person.id = uuidv4();
          person.firstName = args.firstName;
          person.lastName = args.lastName;
          person.email = args.email.toLowerCase();
          person.phoneNumber = args.phoneNumber;
          return Db.models.person.create(person);
        }
      },
      updateUser: {
        type: Person,
        args: {
          id: { type: GraphQLNonNull(GraphQLString) },
          input: {
            type: new GraphQLNonNull(
              new GraphQLInputObjectType({
                name: 'input',
                fields: {
                  firstName: {
                    type: GraphQLNonNull(GraphQLString)
                  },
                  lastName: {
                    type: GraphQLNonNull(GraphQLString)
                  },
                  email: {
                    type: GraphQLNonNull(GraphQLString)
                  },
                  phoneNumber: {
                    type: GraphQLString
                  }
                }
              })
            )
          }
        },
        resolve: async (root, args) => {
          if (!args.id) {
            throw new Error('ID is not exited.');
          }
          if (Db.models.person.findByPk(args.id)) {
            return await Db.models.person
              .findByPk(args.id)
              .then((person) => {
                const p = person;
                p.set('firstName', args.input.firstName);
                p.set('lastName', args.input.lastName);
                p.set('email', args.input.email);
                p.set('phoneNumber', args.input.phoneNumber);
                return p.save();
              })
              .catch((err) => {
                throw new Error(err);
              });
          }
          throw new Error('User is not exited.');
        }
      },
      deleteUser: {
        type: Person,
        args: {
          id: {
            type: GraphQLNonNull(GraphQLString)
          }
        },
        resolve: async (root, args) => {
          if (!args.id) {
            throw new Error('ID is not exited.');
          }
          if (Db.models.person.findByPk(args.id)) {
            return await Db.models.person.findByPk(args.id).then((person) => {
              const p = person;
              return p.destroy();
            });
          }
        }
      },
      addNote: {
        type: Note,
        args: {
          personId: {
            type: GraphQLNonNull(GraphQLString)
          },
          title: {
            type: GraphQLNonNull(GraphQLString)
          },
          description: {
            type: GraphQLNonNull(GraphQLString)
          }
        },
        resolve: async (root, args) => {
          const { personId, title, description } = args;
          if (!personId) {
            throw new Error('UserId is not exited.');
          }
          if (Db.models.person.findByPk(personId)) {
            return await Db.models.person.findByPk(personId).then((person) => {
              const note = new NoteModel();
              note.id = uuidv4();
              note.title = title;
              note.description = description;
              note.isCompleted = false;

              return person.createPost(note);
            });
          }
          throw new Error('User is not exited.');
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

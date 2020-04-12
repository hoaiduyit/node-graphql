class NoteModel {
  constructor(id, title, description, isCompleted, person) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.isCompleted = isCompleted;
    this.person = person;
  }
}

module.exports = NoteModel;

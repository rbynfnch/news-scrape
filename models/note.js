var mongoose = require("mongoose");

//Save a reference to a Schema constructor
var Schema = mongoose.Schema;

var NoteSchema = new Schema({
    noteTitle: String,
    noteBody: String,
    createDate: {
        type: Date,
        default: Date.now
    }
});

var Note = mongoose.model("Note", NoteSchema);

module.exports = Note;
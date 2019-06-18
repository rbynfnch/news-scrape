var mongoose = require("mongoose");

// saving a reference to the schema constructor
var Schema = mongoose.Schema;

var ArticleSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    },
    teaser: {
        type: String,
        required: true
    },
    saved: {
        type: Boolean,
        default: false,
    },
    createDate: {
        type: Date,
        default: Date.now
    },
    note: [
        {
        type: Schema.Types.ObjectId,
        ref: "Note"
        }
    ]
});

var Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;
//Dependencies
//================================================
var express = require("express");
var router = express.Router();
var db = require("../models");

//Route to Update Articles saved status
//================================================
router.post("/save-article/:id", function(req, res) {
    db.Article.findOneAndUpdate(
        {
            _id: req.params._id
        },
        {
            $set: {saved: true}
        }).then(function(dbArticle){
            res.json(dbArticle); //refetch after save
        }).catch(function(err) {
            res.writeContinue(err);
        });
    });

//Delete route to remove a single article from savedArticles
//===========================================================
router.post("/delete-from-saved/:id", function(req, res) {
    db.Article.findOneAndUpdate(
        {
            _id: req.params._id
        },
        {
            $set: {saved: false}
        }).then(function(response) {
            res.redirect("/articles/saved/");
        }).catch(function(err) {
            res.writeContinue(err);
        });
    });


//Route to grab a specific Article by id, populate it with its notes
//===================================================================
router.get("/articles/:id", function (req, res) {
    db.Article.findOne({
        _id: req.params.id
    })
    .populate("note")
    .then(function (dbArticle) {
        res.json(dbArticle);
    })
    .catch(function (err) {
        res.writeContinue(err);
    });
});

//Route for saving/updating an Article's assiciated Note
//=======================================================
router.post("/save-note/:id", function(req, res) {
	console.log("saving / updating note route - req.params.id: " + req.params.id);
	console.log("saving / updating note route - req.body: " + JSON.stringify(req.body));
	
	db.Note.create(req.body)
		.then(function(dbNote) {

			return db.Article.findOneAndUpdate({
				_id: req.params.id
			}, {
				$push: {
					note: dbNote._id
				}}, {
				new: true
			}).populate("note");
		})
		.then(function(dbArticle){
			console.log("dbArticle with notes" + dbArticle);
			res.json({success: true});
		})
		.catch(function(err) {
			res.writeContinue(err);
		});
});


//Delete One from the DB
//========================================================
router.post("/delete/:id", function(req, res) {

	console.log("Delete route on server side");
	
	console.log("req.params.id: " + req.params.id);
	db.Note.findByIdAndRemove({ _id: req.params.id })
		.then(function(dbNote) {
			return db.Article.findOneAndUpdate({
				"note": req.params.id 
			}, { 
				"$pull": { "note": req.params.id } 
			});
		})
		.then(function(dbArticle) {
			console.log("dbArticle with notes " + dbArticle);
			res.redirect("back");
		})
		.catch(function(err) {
			res.writeContinue(err);
		});

});


//Export router
//=========================================================
module.exports = router;



var models = require('../models');

exports.projectInfo = function(req, res) {
  var projectID = req.params.id;


models.Project
     .find({"_id": projectID})
     .exec(afterQuery);
  // query for the specific project and
  // call the following callback

  function afterQuery(err, projects) {
    if(err) console.log(err);
    res.json(projects[0]);
  }
}

exports.addProject = function(req, res) {
  var form_data = req.body;
  console.log(form_data);
  var newProject = new models.Project({
     "title": form_data["title"],
     "date": form_data["date"],
     "summary": form_data["summary"],
     "image": form_data["image"]
   });
   newProject.save(afterSaving);

   function afterSaving(err) {
     if(err) {
       console.log(err);
       res.send(500);
     }
     res.redirect('/');
   }
}

exports.deleteProject = function(req, res) {
  var projectID = req.params.id;
  models.Project
     .find({"_id": projectID})
     .remove()
     .exec(afterDeleteQuery);

  function afterDeleteQuery(err, projects) {
     if(err) {
       console.log(err);
       res.send(500);
     }
   }
}
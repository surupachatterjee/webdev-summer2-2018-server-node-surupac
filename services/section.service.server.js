module.exports = function (app) {

    app.post('/api/course/:courseId/section',createSection);
    app.get('/api/course/:courseId/section',findAllSectionsForCourse);
    app.delete('/api/section/:sectionId', deleteSection);
    app.put('/api/section/:sectionId', updateSection);

    var sectionModel = require('../models/sections/section.model.server');

    function createSection(req,res) {
        var section = req.body;
        sectionModel.createSection(section)
            .then(function (section) {
                res.json(section);
            })
    }
    
    function findAllSectionsForCourse(req,res) {
        var courseId = req.params['courseId'];
        console.log(courseId);
        sectionModel.findAllSectionsForCourse(courseId)
            .then(function (sections) {
                console.log(sections);
                res.json(sections);
            })
    }

    function deleteSection(req,res) {
        var sectionId = req.params['sectionId'];
        sectionModel.deleteSection(sectionId)
            .then(function (section) {
                res.send(section);
            })
    }

    function updateSection(req,res) {
        var sectionId = req.params['sectionId'];
        var section = req.body;
        sectionModel.updateSection(section,sectionId)
            .then(function (section) {
                res.send(section);
            })
    }
};
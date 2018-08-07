module.exports = function (app) {

    app.post('/api/course/:courseId/section',createSection);
    app.get('/api/course/:courseId/section',findAllSectionsForCourse);
    app.delete('/api/section/:sectionId', deleteSection);
    app.put('/api/section/:sectionId', updateSection);
    app.post('/api/section/:sectionId/enrollment', enrollStudentInSection);
    app.get('/api/student/:studentId/section/:sectionId', findEnrollmentByCredentials);
    app.get('/api/student/section', findEnrolledSectionsForStudent);
    app.delete('/api/section/:sectionId/enrollment/:enrollmentId', unEnrollStudentFromSection);

    var sectionModel = require('../models/sections/section.model.server');
    var enrollmentModel = require('../models/enrollment/enrollment.model.server');

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

    
    function enrollStudentInSection(req,res) {
        var sectionId = req.params.sectionId;
        var currentUser = req.session.currentUser;
        var studentId = currentUser._id;
        var enrollment = {
            student: studentId,
            section: sectionId
        };
        sectionModel.decrementSeatsInSection(sectionId)
            .then(function () {
                return enrollmentModel.enrollStudentInSection(enrollment)
            })
            .then(function (enrollment) {
                res.json(enrollment);
            })

    }
    
    function  findEnrollmentByCredentials(req,res) {
        var section = req.params['sectionId'];
        var student = req.params['studentId'];
        const credentials = {
            student: student,
            section: section
        };
        enrollmentModel.findEnrollmentByCredentials(credentials)
            .then(function (user) {
                res.json(user);
            })
    }


    function findEnrolledSectionsForStudent(req,res) {
        var currentUser = req.session.currentUser;
        var studentId = currentUser._id;
        enrollmentModel.findEnrolledSectionsForStudent(studentId)
            .then(function (enrollmentsforstudent) {
                res.json(enrollmentsforstudent)
            })
    }

    function unEnrollStudentFromSection(req,res) {
        var enrollmentId = req.params.enrollmentId;
        var sectionId = req.params.sectionId;
        sectionModel
            .incrementSeatsInSection(sectionId)
            .then(function () {
               return  enrollmentModel
                   .unEnrollStudentInSection(enrollmentId)
            })
            .then(function (enrollments) {
            res.json(enrollments);
        })

        /*enrollmentModel.unEnrollStudentInSection(enrollmentId)
            .then(function () {
                sectionModel.incrementSeatsInSection(sectionId)
            }).then(function (sections) {
            res.send(sections);
        })*/
    }





};
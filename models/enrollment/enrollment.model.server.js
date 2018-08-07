var mongoose = require('mongoose');
var enrollmentSchema = require('./enrollment.schema.server');
var enrollmentModel = mongoose.model(
    'EnrollmentModel',
    enrollmentSchema
);

function enrollStudentInSection(enrollment) {
    return enrollmentModel.create(enrollment);
}

function unEnrollStudentInSection(enrollmentId) {
    return enrollmentModel.remove({_id: enrollmentId});
}


function findEnrollmentByCredentials(credentials) {
    return enrollmentModel.findOne(credentials, {student: 1, section: 1});
}

function findEnrolledSectionsForStudent(studentId) {
    return enrollmentModel.find({student: studentId})
        .populate('section')
        .exec();
}




module.exports = {
    enrollStudentInSection: enrollStudentInSection,
    findEnrolledSectionsForStudent:findEnrolledSectionsForStudent,
    unEnrollStudentInSection:unEnrollStudentInSection,
    findEnrollmentByCredentials: findEnrollmentByCredentials
};
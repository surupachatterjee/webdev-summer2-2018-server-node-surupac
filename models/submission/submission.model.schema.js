const mongoose = require('mongoose');
const submissionSchema = require('./submission.schema.server');
const submissionModel = mongoose.model('SubmissionModel',submissionSchema);


createSubmission = submission =>
   submissionModel.create(submission)

findAllSubmissions =() =>
    submissionModel.find()

findAllSubmissionsForStudent = studentId =>{
    submissionModel.find({student:studentId})
}

function findSubmissionById(submissionId) {
    return submissionModel.findOne({_id:submissionId})
        .populate({
            path:'quiz',
            model:'QuizModel',
            populate:{
                path:'questions',
                model:'QuestionModel'
            }
        })
        .populate({
            path:'answers.question',
            model:'QuestionModel'
        })
        .populate('student')
        .exec()
}


function findStudentQuizSubmission(studentId,quizId,submissionId) {
    return submissionModel.findOne({$and: [{student:studentId},{quiz:quizId},{_id:submissionId}]})
        .populate({
            path:'quiz',
            model:'QuizModel',
            populate:{
                path:'questions',
                model:'QuestionModel'
            }
        })
        .populate({
            path:'answers.question',
            model:'QuestionModel'
        })
        .exec()
}


function findAllQuizSubmissionForStudent(studentId,quizId) {
    return submissionModel.find({$and: [{student:studentId},{quiz:quizId}]})
        .populate({
            path:'quiz',
            model:'QuizModel',
            populate:{
                path:'questions',
                model:'QuestionModel'
            }
        })
        .populate({
            path:'answers.question',
            model:'QuestionModel'
        })
        .exec()
}


function findAllSubmissionsForQuiz(quizId){
    return submissionModel.find({quiz:quizId})
        .populate({
            path:'quiz',
            model:'QuizModel',
            populate:{
                path:'questions',
                model:'QuestionModel'
            }
        })
        .populate({
            path:'answers.question',
            model:'QuestionModel'
        })
        .populate('student')
        .exec()
}


module.exports ={
    createSubmission,
    findAllSubmissions,
    findAllSubmissionsForStudent,
    findAllSubmissionsForQuiz,
    findAllQuizSubmissionForStudent,
    findStudentQuizSubmission,
    findSubmissionById
}
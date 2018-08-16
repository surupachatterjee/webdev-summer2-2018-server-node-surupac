module.exports = function (app) {

    const submissionModel = require('../models/submission/submission.model.schema');
    const assert = require('assert');
    app.post('/api/quiz/:qid/submission',submitQuiz);
    app.get('/api/quiz/:qid/submission',getQuizSubmissionsForStudent);
    app.get('/api/quiz/:qid/submission/:sid',getStudentQuizSubmission);
    app.get('/api/quiz/:qid/submissions',getAllSubmissionsForQuiz);
    app.get('/api/submission/:sid',getSubmissionById)

    function getSubmissionById(req,res) {
        var subId = req.params['sid'];
        console.log(" subId : "+ subId);
        submissionModel.findSubmissionById(subId)
            .then(function(submission){
                res.json(submission);
                }
            )
    }

    function getAllSubmissionsForQuiz(req,res) {
        var quizId = req.params['qid'];
        submissionModel.findAllSubmissionsForQuiz(quizId)
            .then(function (submissions) {
                res.json(submissions);
            })
    }

    function getStudentQuizSubmission(req,res) {
        var studentId = req.session['currentUser'];
        var quizId = req.params['qid'];
        var subId = req.params['sid'];
        console.log("studentId : " + studentId + " quizId : " + " subId : "+ subId);
        submissionModel.findStudentQuizSubmission(studentId,quizId,subId)
            .then(function (submission){
                console.log("Questions IN submission: " + submission._id);
                res.json(submission);
            })
    }

    function getQuizSubmissionsForStudent(req,res) {
        var studentId = req.session['currentUser'];
        submissionModel.findAllQuizSubmissionForStudent(studentId,req.params['qid'])
            .then(function (submissions) {
                console.log(submissions.length + " : " + submissions);
                res.json(submissions);
            })
    }

    function submitQuiz(req,res) {
        //res.json(req.body);
        var student = req.session['currentUser'];
        var pointsObtained = 0;
        var grade = 0;
        var max = 0;
        var answers = req.body.questions.map(question =>{
            max = max + question.points;
            if(question.questionType === 'ESSAY'){
                if (question.essayAnswer === question.correctEssayAnswer)
                    pointsObtained = question.points;
                else
                    pointsObtained = 0;
                grade = grade + pointsObtained;
                return {
                    question:question._id,
                    essayAnswer : question.essayAnswer,
                    pointsObtained: pointsObtained
                }
            }
            if(question.questionType === 'FILL_BLANKS'){
                try {
                    if (assert.deepEqual(question.fillBlanksAnswer, question.fillBlanksAnswers, 'N') !== 'N')
                        pointsObtained = question.points;
                }
                catch(err){
                    pointsObtained = 0;
                }
                grade = grade + pointsObtained;
                return {
                    question:question._id,
                    fillBlanksAnswers :question.fillBlanksAnswers,
                    pointsObtained: pointsObtained
                }
            }
            if(question.questionType === 'TRUE_FALSE'){
                if (question.correctTrueFalseAnswer === question.trueFalseAnswer)
                    pointsObtained = question.points;
                else
                    pointsObtained = 0;
                grade = grade + pointsObtained;
                return {
                    question:question._id,
                    trueFalseAnswer: question.trueFalseAnswer,
                    pointsObtained: pointsObtained
                }
            }
            if(question.questionType === 'CHOICE'){
                if (question.choices[question.multipleChoiceAnswer].correct )
                    pointsObtained = question.points;
                else
                    pointsObtained = 0;
                grade = grade + pointsObtained;
                return {
                    question:question._id,
                    multipleChoiceAnswer:question.multipleChoiceAnswer,
                    pointsObtained: pointsObtained
                }
            }
        })
        console.log(new Date());

        var submission ={
            student:student,
            quiz:req.params['qid'],
            submissionDate:(new Date()),
            answers:answers,
            grade:grade,
            maximum:max
        }

        submissionModel.createSubmission(submission)
            .then(function (submission) {
                res.json(submission);
            });

    }
}
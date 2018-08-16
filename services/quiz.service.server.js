module.exports = function (app) {

    const quizModel = require('../models/quizzes/quiz.model.server');
    app.post('/api/quiz', createQuiz);
    app.get('/api/quiz', findAllQuizzes);
    app.get('/api/quiz/:qid', findQuizById);
    app.put('/api/quiz/:qid', updateQuiz);
    app.delete('/api/quiz/:qid', deleteQuiz);
    app.put('/api/quiz/:qid/question/:questionId',addQuestion);


    function createQuiz(req,res) {
        quizModel.createQuiz(req.body)
            .then(function (quiz) {
                res.json(quiz);
            })
    }



    function addQuestion(req,res) {
        console.log("Inside addquestion" +req.params['qid']+
        ": " + req.params['questionId']);
        quizModel
            .addQuestion(req.params['qid'],
                req.params['questionId'])
            .then(status => res.send(status),
                    error => res.send(error))
    }


    function findAllQuizzes(req,res) {
        //console.log("inside find all quizzes");
        quizModel.findAllQuizzes()
            .then(function (quizzes) {
                res.send(quizzes);
            })
    }

    function findQuizById(req,res) {
        console.log("onside find quiz by id");
        quizModel.findQuizById(req.params['qid'])
            .then(function (quiz) {
                res.json(quiz);
            })
    }
    
    function updateQuiz(req,res) {
        quizModel.updateQuiz(
            req.params['qid'],
            req.body
        )
            .then(status => res.send(status))
    }

    function deleteQuiz(req,res) {
        quizModel.deleteQuiz(req.params['qid'])
            .then(status => res.send(status))

    }

}

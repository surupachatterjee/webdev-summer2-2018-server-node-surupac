module.exports = function (app) {

    const quizModel = require('../models/quizzes/quiz.model.server');
    app.post('/api/quiz', createQuiz);
    app.get('/api/quiz', findAllQuizzes);
    app.get('/api/quiz/:qid', findQuizById);
    app.put('/api/quiz/:qid', updateQuiz);
    app.delete('/api/quiz/:qid', deleteQuiz);

    function createQuiz(req,res) {
        quizModel.createQuiz(req.body)
            .then(function (quiz) {
                res.json(quiz);
            })
    }


    function findAllQuizzes(req,res) {
        quizModel.findAllQuizzes()
            .then(function (quizzes) {
                res.send(quizzes);
            })
    }

    function findQuizById(req,res) {
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

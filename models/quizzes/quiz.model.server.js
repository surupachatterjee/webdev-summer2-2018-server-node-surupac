const mongoose = require('mongoose')
const quizSchema = require('./quiz.schema.server');
const quizModel = mongoose.model('QuizModel', quizSchema);

function createQuiz (quiz) {
    return quizModel.create(quiz);
}

function findAllQuizzes () {
    return quizModel.find();
}

function findQuizById (quizId) {
    return quizModel.findById(quizId)
}

function updateQuiz (quizId,newQuiz) {
    return quizModel.update({_id : quizId},{
        $set : newQuiz
    })
}

function deleteQuiz (quizId) {
    return quizModel.remove({_id:quizId})
}

var api ={
    createQuiz:createQuiz,
    findAllQuizzes:findAllQuizzes,
    findQuizById:findQuizById,
    updateQuiz:updateQuiz,
    deleteQuiz:deleteQuiz
};

module.exports = api;
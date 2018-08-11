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
        .populate('questions')
        .exec()
}

function updateQuiz (quizId,newQuiz) {
    return quizModel.update({_id : quizId},{
        $set : newQuiz
    })
}

function addQuestion(quizId,questionId) {
   return quizModel.update({_id:quizId},{
        $push :{questions:questionId}
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
    deleteQuiz:deleteQuiz,
    addQuestion:addQuestion
};

module.exports = api;
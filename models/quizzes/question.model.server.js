const mongoose = require('mongoose');
const schema = require('./question.schema.server');
const questionModel = mongoose.model('QuestionModel', schema);

createQuestion = question =>
    questionModel.create(question)

findAllQuestions = () =>
    questionModel.find()

findQuestionById = qId =>
    questionModel.findById(qId)

deleteQuestion = qId =>
    questionModel.remove({_id : qId})

updateQuestion = (qId,newQuestion) =>
    questionModel.updateQuiz({_id:qId},{
        $set:newQuestion
    })

module.exports = {
    createQuestion,
    findAllQuestions,
    deleteQuestion,
    updateQuestion,
    findQuestionById
}
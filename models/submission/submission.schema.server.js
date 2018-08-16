const mongoose = require('mongoose')
module.exports = mongoose.Schema({
    student:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'UserModel'
    },
    grade: Number,
    maximum:Number,
    quiz:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'QuizModel'
    },
    submissionDate:Date,
    answers:[{
        fillBlanksAnswers:Object,
        multipleChoiceAnswer:Number,
        trueFalseAnswer:Boolean,
        correctTrueFalseAnswer:Boolean,
        essayAnswer:String,
        correctEssayAnswer:String,
        pointsObtained: Number,
        question:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'QuestionModel'
        }
    }]
},{'collection':'submission'});
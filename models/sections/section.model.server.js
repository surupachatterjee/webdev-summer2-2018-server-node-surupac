var mongoose = require('mongoose');
var sectionSchema = require('./section.schema.server');
var sectionModel = mongoose.model('SectionModel',sectionSchema);

function createSection(section) {
    return sectionModel.create(section);
}

function findAllSectionsForCourse(courseId) {
    return sectionModel.find({courseId:courseId});
}

function deleteSection(sectionId) {
    return sectionModel.remove({_id:sectionId});
}

function updateSection(section,sectionId) {
    return sectionModel.update({_id: sectionId},
        {$set: section})
}

function decrementSeatsInSection(sectionId) {
    return sectionModel.update({
        _id: sectionId
    }, {
        $inc: {seats: -1}
    });
}


function incrementSeatsInSection(sectionId) {
    return sectionModel.update({
        _id: sectionId
    }, {
        $inc: {seats: +1}
    });
}


var api = {
    createSection:createSection,
    findAllSectionsForCourse:findAllSectionsForCourse,
    deleteSection:deleteSection,
    updateSection:updateSection,
    incrementSeatsInSection:incrementSeatsInSection,
    decrementSeatsInSection:decrementSeatsInSection

}

module.exports= api;
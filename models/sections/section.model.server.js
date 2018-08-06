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

var api = {
    createSection:createSection,
    findAllSectionsForCourse:findAllSectionsForCourse,
    deleteSection:deleteSection,
    updateSection:updateSection

}

module.exports= api;
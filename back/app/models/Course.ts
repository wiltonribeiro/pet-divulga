import mongoose = require('mongoose');

export interface ICourse extends mongoose.Document {
    name: string,
    about: string,
    link: string
}

export const CourseSchema = new mongoose.Schema({
    name: {type: mongoose.Schema.Types.String},
    about: {type: mongoose.Schema.Types.String},
    link: {type: mongoose.Schema.Types.String},
});

const Course = mongoose.model<ICourse>('Course', CourseSchema);
export default Course;
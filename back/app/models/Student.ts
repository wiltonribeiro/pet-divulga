import mongoose = require('mongoose');

export interface IStudent extends mongoose.Document {
    course_id: mongoose.Schema.Types.ObjectId
}

export const StudentSchema = new mongoose.Schema({
    course_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Course'}
});

const Student = mongoose.model<IStudent>('Student', StudentSchema);
export default Student;
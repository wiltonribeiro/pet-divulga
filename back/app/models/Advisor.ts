import mongoose = require('mongoose');

export interface IAdvisor extends mongoose.Document {
    advisor_type: string
}

export const AdvisorSchema = new mongoose.Schema({
    advisor_type : { type: mongoose.Schema.Types.String, required: true}
});

const Advisor = mongoose.model<IAdvisor>('Advisor', AdvisorSchema);
export default Advisor;
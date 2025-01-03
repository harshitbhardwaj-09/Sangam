import mongoose from 'mongoose';

const taskReportSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Task',
        required: true
    },
    name:{
        type:String
    },
    desc:{
        type:String
    },
    reportUrls: [{
        type: String,
        required: true
    }]
});

const TaskReport = mongoose.model('TaskReport', taskReportSchema);

export default TaskReport;
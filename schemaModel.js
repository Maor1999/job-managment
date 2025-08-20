import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
    JobTitle:{
        type:String,
        trim:true,
        required: "JobTitle is required",
        minlength: 5,
        maxlength: 40
        },
    JobDescription:{
        type:String,
        trim:true,
        required: "JobDescription is required",
        minlength: 10
    },
    JobRequirements:{
        type:String,
        trim:true,
        required: "JobRequirements is required",
        minlength: 20
    },
    Location:{
        type:String,
        trim: true,
        required: "Location is required",
        minlength: 2,
        maxlength: 50
    }
},{timestamps:true});

const jobModel = mongoose.model("job", jobSchema);

export default jobModel
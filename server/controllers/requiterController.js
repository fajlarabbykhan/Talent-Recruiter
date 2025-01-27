const Job = require('../schemas/jobSchema')
const asyncHandler = require('express-async-handler');
const AppliedJob = require('../schemas/appliedJobSchema');


// @desc Get Job All Via Applicant Id
const getJobByRequiter = asyncHandler(async (req, res, next) => {
    try{
        const getJobByRequiter = await Job.find({requiter:req.user.id}).populate('requiter','_id name')
        if(getJobByRequiter){
            res.status(200).json({
                JobByRequiter:getJobByRequiter
            })
        }else{
            res.status(400).json({
                message: "Something went wrong. Please try Again",
            })
        }
    }catch(err){
        console.log(err);
        next(err)
    }
})
// @desc Get Job All Via Applicant Id
const getApplicantByJob = asyncHandler(async (req, res, next) => {
    console.log(req.params.id);
    try{
        const getApplicantByJob = await AppliedJob.find({job:{_id:req.params.id}})
        if(getApplicantByJob){
            res.status(200).json({
                ApplicantByJob:getApplicantByJob
            })
        }else{
            res.status(400).json({
                message: "Something went wrong. Please try Again",
            })
        }
    }catch(err){
        console.log(err);
        next(err)
    }
})

// @desc Post New Job Controller
const postJob = asyncHandler(async (req, res, next) => {
    const newJob = await Job.create({...req.body,requiter:req.user.id});
    try{

        if(newJob){
            res.status(200).json({
                success: true,
                message: "Successfully Create The Job",
                newJob
            })
        }else{
            res.status(400).json({
                success: false,
                message: "Something went wrong. Please try again",
            })
        }
    }catch(err){
        next(err)
    }

})

// @desc  Delete Job Controller
const deleteJob = asyncHandler(async(req,res,next)=>{

    try{
        const isDelete = await Job.findOneAndDelete({_id:req.params.id, user:req.user.id})
        if(isDelete){
            res.status(200).json({
                success: true,
                message: `Job deleted successfully`
            })
        }
        else{
            res.status(404).json({
                success: false,
                message: `Job not found by the id: ${req.params.id}`
            })
    }
    }catch(err){
        next(err)
    }

})
module.exports ={
    postJob, getJobByRequiter,getApplicantByJob, deleteJob
}

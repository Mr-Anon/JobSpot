const router = require('express').Router();
let Application = require('../../models/Applications');


router.route('/getall').post((req, res) => {
    Application.find()
        .then(application => res.json(application))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route("/getone").post((req, res) => {
    id = req.body.appId;
    Application.find({ appId: id })
        .then(application => res.json(application))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route("/getjobapp").post((req, res) => {
    id = req.body.jobId;
    Application.find({ jobId: id })
        .then(application => res.json(application))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route("/getappapp").post((req, res) => {
    id = req.body.appId;
    Application.find({ appId: id })
        .then(application => res.json(application))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route("/getjobappnonrejected").post((req, res) => {
    id = req.body.jobId;
    Application.find({ jobId: id, status: { "$ne": 'Rejected' } })
        .then(application => res.json(application))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route("/getrecappaccepted").post((req, res) => {
    id = req.body.recId;
    Application.find({ recId: id, status: { "$eq": 'Accepted' } })
        .then(application => res.json(application))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {

    
    const newApplication = new Application({
        
         jobId : req.body.jobId,
         recId : req.body.recId,
         appId : req.body.appId,
         sop : req.body.sop,
         status : req.body.status,
         dateOfApplication : req.body.dateOfApplication,
         joinDate : req.body.joinDate,
         name : req.body.name,
         skills : req.body.skills,
         instituteName : req.body.instituteName,
         startYear : req.body.startYear,
         endYear : req.body.endYear,
         rating : req.body.rating,
         nextStatus : req.body.nextStatus,
         jobName : req.body.jobName,
         type : req.body.type,
         recRate : req.body.recRate,
         appRate : req.body.appRate,
         appemail: req.body.appemail


    });
    console.log(newApplication)
    newApplication.save()
        .then(() => res.json('Application added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route("/getapp").post((req, res) => {
    appid = req.body.appId;
    jobid = req.body.jobId;
    Application.find({ appId: appid, jobId: jobid })
        .then(application => res.json(application))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.post("/updateapplication", (req, res) => {

    const id = req.body.applicationId;
    Application.find({ _id: id }).then(
        application => {
            console.log(application)

            Application.updateOne({ _id: id }, { $set: { status: req.body.status, joinDate: req.body.joinDate } })
                .then(() => res.json('Status updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

router.post("/updateapplicationrating", (req, res) => {

    const id = req.body.applicationId;
    Application.find({ _id: id }).then(
        application => {
            console.log(application)

            Application.updateOne({ _id: id }, { $set: { rating: req.body.rating} })
                .then(() => res.json('Status updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});
router.post("/updateapplicationappratestatus", (req, res) => {

    const id = req.body.applicationId;
    Application.find({ _id: id }).then(
        application => {
            console.log(application)

            Application.updateOne({ _id: id }, { $set: { appRate: req.body.appRate} })
                .then(() => res.json('Status updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

router.post("/updateapplicationrecratestatus", (req, res) => {

    const id = req.body.applicationId;
    Application.find({ _id: id }).then(
        application => {
            console.log(application)

            Application.updateOne({ _id: id }, { $set: { recRate: req.body.recRate} })
                .then(() => res.json('Status updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
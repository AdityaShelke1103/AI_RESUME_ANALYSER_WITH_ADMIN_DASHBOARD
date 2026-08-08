const express = require('express');
const router = express.Router();
const ResumeController = require('../Controllers/resume');
const { upload } = require('../utils/multer');
router.post('/addResume', upload.single("resume"), ResumeController.addResume);
router.get('/getResumeByUser/:user', ResumeController.getResumeByUser);
router.get('/get/admin', ResumeController.getResumeForAdmin);
router.get("/getJobs", ResumeController.getJobs);
module.exports = router;
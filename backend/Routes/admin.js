const express = require('express');
const router = express.Router();
const AdminController = require('../Controllers/admin');


router.post("/create", AdminController.createJob);
router.get("/get", AdminController.getAllJobs);
router.delete("/delete/:id", AdminController.deleteJob);
router.put("/update/:id", AdminController.updateJob);
module.exports = router;
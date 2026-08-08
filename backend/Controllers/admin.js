const AdminJobModel = require("../Models/admin");
exports.createJob = async (req, res) => {
    try {
        const { name, job_desc, employerEmail } = req.body;
        console.log(name);
        console.log(job_desc);
        console.log(employerEmail);
        const job = await AdminJobModel.create({
            name,
            job_desc,
            createdBy: employerEmail,
        });

        return res.status(201).json({
            success: true,
            message: "Job created successfully",
            data: job,
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};



exports.getAllJobs = async (req, res) => {
    try {
        const jobs = await AdminJob.find().sort({
            createdAt: -1,
        });

        return res.status(200).json({
            success: true,
            data: jobs,
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};

exports.deleteJob = async (req, res) => {
    try {
        await AdminJob.findByIdAndDelete(req.params.id);

        return res.status(200).json({
            success: true,
            message: "Job deleted successfully",
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};

exports.updateJob = async (req, res) => {
    try {
        const { name, job_desc } = req.body;

        const job = await AdminJob.findByIdAndUpdate(
            req.params.id,
            {
                name,
                job_desc,
            },
            { new: true }
        );

        return res.status(200).json({
            success: true,
            data: job,
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};

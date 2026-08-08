const mongoose = require("mongoose");

const AdminJobSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        job_desc: {
            type: String,
            required: true,
        },
        createdBy: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
        collection: "jobdesc",
    }
);

const AdminJobModel = mongoose.model("AdminJob", AdminJobSchema);
module.exports = AdminJobModel;
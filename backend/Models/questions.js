const mongoose = require("mongoose");

const DSAQuestionSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },

        description: {
            type: String,
            required: true,
        },

        difficulty: {
            type: String,
            enum: ["Easy", "Medium", "Hard"],
            required: true,
        },

        topic: {
            type: String,
            required: true,
        },

        constraints: {
            type: String,
        },

        examples: [
            {
                input: String,
                output: String,
                explanation: String,
            },
        ],

        starterCode: {
            python: String,
            cpp: String,
            java: String,
        },

        visibleTests: [
            {
                input: String,
                output: String,
            },
        ],

        hiddenTests: [
            {
                input: String,
                output: String,
            },
        ],

        referenceSolution: {
            python: String,
            cpp: String,
            java: String,
        },

        company: {
            type: String,
            default: "General",
        },

        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        isAIGenerated: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
        collection: "questions",
    }
);

module.exports = mongoose.model("DSAQuestion", DSAQuestionSchema);
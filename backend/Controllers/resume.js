const ResumeModel = require('../Models/resume');
const pdfParse = require('pdf-parse');
const fs = require('fs');
const path = require('path');
const Tesseract = require('tesseract.js');
const pdf = require('pdf-poppler');
const { CohereClient } = require('cohere-ai');

const cohere = new CohereClient({
    token: process.env.COHERE_API_KEY,
});
const AdminJobModel = require("../Models/admin");

exports.getJobs = async (req, res) => {
    try {
        const jobs = await AdminJobModel.find().select("name job_desc");

        return res.status(200).json({
            success: true,
            message: "Jobs fetched successfully",
            data: jobs,
        });
    } catch (err) {
        console.log(err);

        return res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};
async function extractTextFromScannedPdf(pdfPath) {
    const outputDir = path.join(__dirname, '../uploads');

    const opts = {
        format: 'png',
        out_dir: outputDir,
        out_prefix: 'resume',
        page: null,
    };

    await pdf.convert(pdfPath, opts);

    const imagePaths = fs
        .readdirSync(outputDir)
        .filter(
            file =>
                file.startsWith('resume') &&
                file.endsWith('.png')
        )
        .map(file => path.join(outputDir, file));

    if (imagePaths.length === 0) {
        throw new Error('No PNG files generated from PDF');
    }

    const texts = await Promise.all(
        imagePaths.map(async imagePath => {
            const result = await Tesseract.recognize(
                imagePath,
                'eng'
            );

            return result.data.text;
        })
    );

    return texts.join('\n');
}

exports.addResume = async (req, res) => {
    try {
        const { job_desc, user } = req.body;

        if (!req.file) {
            return res.status(400).json({
                message: 'Resume file is required',
            });
        }

        const pdfPath = req.file.path;

        const dataBuffer = fs.readFileSync(pdfPath);
        const pdfData = await pdfParse(dataBuffer);

        let resumeText = pdfData.text;

        if (!resumeText || resumeText.trim().length < 50) {
            console.log('No text found. Running OCR...');
            resumeText = await extractTextFromScannedPdf(pdfPath);
            console.log(resumeText);
        }

        if (!resumeText || resumeText.trim().length < 20) {
            return res.status(400).json({
                message:
                    'Unable to extract text from the uploaded resume.',
            });
        }

        const prompt = `
You are an expert ATS Resume Analyzer.

Resume:
${resumeText}

Job Description:
${job_desc}

Return ONLY RAW JSON:
Do NOT wrap the response in markdown.
Do NOT use the three backtick template literal json. 
Do NOT provide any explanation outside the JSON.

{
  "score": number,
  "feedback": string,
  "strengths": [string],
  "weaknesses": [string],
  "suggestions": [string]
}
`;

        const response = await cohere.chat({
            model: 'command-a-03-2025',
            message: prompt,
            temperature: 0.2,
            maxTokens: 1000,
        });
        console.log("Cohere Response:", response.text);

        let analysis;

        try {
            analysis = JSON.parse(response.text);
        } catch (err) {
            return res.status(500).json({
                message: 'AI returned invalid JSON',
                rawResponse: response.text,
            });
        }
        const newResume = new ResumeModel({
            userId: user,
            resume_name: req.file.originalname,
            job_desc,
            score: analysis.score,
            feedback: analysis.feedback,
        });

        await newResume.save();

        if (req.file?.path && fs.existsSync(req.file.path)) {
            fs.unlinkSync(pdfPath);
        }
        res.status(200).json({
            success: true,
            message: "Resume added successfully",
            data: newResume,
            analysis: analysis,
        });
    } catch (err) {
        console.log(err);

        return res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};

exports.getResumeByUser = async (req, res) => {
    try {
        const { user } = req.params;
        console.log("User:", req.params.user);

        const resumes = await ResumeModel.find({ userId: user }).sort({ createdAt: -1 });
        console.log("Resumes:", resumes);

        return res.status(200).json({
            success: true,
            message: "Resumes fetched successfully",
            data: resumes,
        });
    } catch (err) {
        console.log(err);

        return res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};
exports.getResumeForAdmin = async (req, res) => {
    try {
        const resumes = await ResumeModel.find().sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            message: "Resumes fetched successfully",
            data: resumes,
        });
    } catch (err) {
        console.log(err);

        return res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};
//2YkrbZnDoyfkS4iPJROoEhrOir14G8NEMgT6zhSP
// const ResumeModel = require('../Models/resume');
// console.log("A: ResumeModel loaded");

// const upload = require('../utils/multer');
// console.log("B: Multer loaded");

// const pdfParse = require('pdf-parse');
// console.log("C: pdf-parse loaded");

// const cohere = require('cohere-ai');
// console.log("D: cohere loaded");

// console.log("E: All imports loaded successfully");

// exports.addResume = async (req, res) => {
//     try {
//         const { job_desc, user } = req.body;

//         console.log("Controller hit");

//         const fs = require("fs");

//         const pdfPath = req.file?.path;

//         console.log("PDF Path:", pdfPath);

//         const dataBuffer = fs.readFileSync(pdfPath);

//         console.log("PDF read successfully");

//         const pdfData = await pdfParse(dataBuffer);

//         console.log("PDF parsed successfully");

//         console.log(pdfData.text);

//         res.status(200).json({
//             message: "Resume processed successfully",
//         });

//     } catch (err) {
//         console.error("ERROR:", err);

//         res.status(500).json({
//             message: "Internal server error",
//             error: err.message,
//         });
//     }
// };

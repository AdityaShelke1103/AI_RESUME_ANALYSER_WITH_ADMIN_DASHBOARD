const DSAQuestionModel = require('../Models/questions');

const { CohereClient } = require("cohere-ai");

const cohere = new CohereClient({
  token: process.env.COHERE_API_KEY,
});

exports.generateQuestion = async (req, res) => {
  try {
    const {
      topic,
      difficulty,
      company,
      createdBy
    } = req.body;

    const prompt = `
You are an expert DSA Interview Question Generator.

Generate ONE coding interview question.

Topic: ${topic}
Difficulty: ${difficulty}
Company: ${company}

Return ONLY RAW JSON.
Do NOT wrap the response in markdown.
Do NOT use \`\`\`json.
Do NOT provide any explanation outside the JSON.

{
  "title": "",
  "description": "",
  "difficulty": "",
  "topic": "",
  "constraints": "",
  "examples": [
    {
      "input": "",
      "output": "",
      "explanation": ""
    }
  ],
  "starterCode": {
    "python": "",
    "cpp": "",
    "java": ""
  },
  "visibleTests": [
    {
      "input": "",
      "output": ""
    }
  ],
  "hiddenTests": [
    {
      "input": "",
      "output": ""
    }
  ],
  "referenceSolution": {
    "python": "",
    "cpp": "",
    "java": ""
  }
}
`;

    const response = await cohere.chat({
      model: "command-a-03-2025",
      message: prompt,
      temperature: 0.3,
      maxTokens: 2500,
    });

    console.log("Cohere Response:", response.text);

    let question;

    try {
      question = JSON.parse(response.text);
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: "AI returned invalid JSON",
        rawResponse: response.text,
      });
    }

    const newQuestion = new DSAQuestionModel({
      title: question.title,
      description: question.description,
      difficulty: question.difficulty,
      topic: question.topic,
      constraints: question.constraints,
      examples: question.examples,
      starterCode: question.starterCode,
      visibleTests: question.visibleTests,
      hiddenTests: question.hiddenTests,
      referenceSolution: question.referenceSolution,
      company,
      createdBy,
      isAIGenerated: true,
    });

    await newQuestion.save();

    return res.status(201).json({
      success: true,
      message: "Question generated successfully",
      data: newQuestion,
    });

  } catch (err) {
    console.log(err);

    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
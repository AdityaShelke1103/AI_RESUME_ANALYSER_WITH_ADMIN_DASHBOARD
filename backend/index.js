require("dotenv").config();
const express = require('express');
const cors = require('cors');
require('./db');
const app = express();
const PORT = 5000;
const UserRoutes = require('./Routes/user');
const ResumeRoutes = require('./Routes/resume')
const AdminRoutes = require('./Routes/admin');
const QuestionRoutes = require('./Routes/questions');
app.use(express.json());
app.use(cors());
app.use('/api/user', UserRoutes);
app.use('/api/resume', ResumeRoutes);
app.use('/api/admin', AdminRoutes);
app.use('/api/questions', QuestionRoutes);


app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
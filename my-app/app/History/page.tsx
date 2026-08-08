'use client';

import React, { useContext, useEffect, useState } from 'react';
import withAuthHoc from '@/utils/HOC/withAuthHOC';
import instance from '@/utils/axios';
import { AuthContext } from '@/utils/AuthContext';

const Page = () => {
    const { userInfo } = useContext(AuthContext);

    const [resumes, setResumes] = useState<any[]>([]);
    const [resume_name, setResumeName] = useState<string>('');
    const [job_desc, setJobDesc] = useState<string>('');
    const [feedback, setFeedback] = useState<string>('');
    const [score, setScore] = useState<string>('');

    const getHistoryforuser = async () => {
        try {
            const result = await instance.get(
                `/api/resume/getResumeByUser/${userInfo._id}`

            );
            console.log(userInfo)
            setResumeName(result.data.data[0].resume_name);
            setJobDesc(result.data.data[0].job_desc);
            setFeedback(result.data.data[0].feedback);
            setScore(result.data.data[0].score);
            console.log(result.data);

            setResumes(result.data.data);
        } catch (err: any) {
            console.log("STATUS:", err.response?.status);
            console.log("DATA:", err.response?.data);
            console.log("FULL:", err.response);
        }
    };

    useEffect(() => {
        getHistoryforuser();
    }, [userInfo]);

    return (
        <div className="m-3 bg-amber-200 min-h-screen">
            <div className="m-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-2 pb-2">
                {resumes.map((resume: any, index: number) => (
                    <div
                        key={index}
                        className="bg-green-300 p-4 rounded-lg shadow-md"
                    >
                        <p>
                            <strong>Resume:</strong> {resume.resume_name}
                        </p>

                        <p>
                            <strong>Job Description:</strong> {resume.job_desc}
                        </p>

                        <p>
                            <strong>Feedback:</strong> {resume.feedback}
                        </p>

                        <p>
                            <strong>Score:</strong> {resume.score}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default withAuthHoc(Page);
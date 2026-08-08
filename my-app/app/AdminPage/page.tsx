'use client';

import React, { useEffect, useState } from 'react';
import withAuthHoc from '@/utils/HOC/withAuthHOC';
import instance from '@/utils/axios';
import { AuthContext } from '@/utils/AuthContext';
import { useContext } from 'react';

const Page = () => {
    const [resumes, setResumes] = useState<any[]>([]);
    const { userInfo } = useContext(AuthContext);
    const fetchForAdmin = async () => {
        try {
            const response = await instance.get('/api/resume/get/admin');

            const result = response.data;

            console.log(result);

            setResumes(result.data);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchForAdmin();
    }, []);

    return (
        <div className="m-3 bg-amber-200 min-h-screen p-4">
            {userInfo?.role === "admin" ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {resumes.map((resume) => (
                        <div
                            key={resume._id}
                            className="bg-green-300 rounded-lg shadow-md p-4"
                        >
                            <h2 className="text-xl font-bold mb-2">
                                {resume.resume_name}
                            </h2>

                            <p>
                                <strong>Job Description:</strong>
                                <br />
                                {resume.job_desc}
                            </p>

                            <p className="mt-2">
                                <strong>Feedback:</strong>
                                <br />
                                {resume.feedback}
                            </p>

                            <p className="mt-2 text-lg font-bold">
                                Score: {resume.score}
                            </p>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="flex justify-center items-center min-h-[70vh]">
                    <div className="bg-red-100 border border-red-400 text-red-700 px-8 py-6 rounded-lg shadow-md text-center">
                        <h2 className="text-2xl font-bold mb-2">
                            Access Denied
                        </h2>

                        <p>
                            You are not an admin. Only administrators can access this page.
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default withAuthHoc(Page);
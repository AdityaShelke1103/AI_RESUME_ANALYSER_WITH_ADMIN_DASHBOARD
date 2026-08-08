'use client';

import React from 'react';
import Image from 'next/image';
import Skeleton from '@mui/material/Skeleton';
import withAuthHoc from '@/utils/HOC/withAuthHOC'
import { useState, useContext } from 'react';
import instance from '@/utils/axios';
import { AuthContext } from '@/utils/AuthContext';
import { useEffect } from 'react';
import Link from 'next/link';
const Page = () => {
    const { userInfo } = useContext(AuthContext);
    const [uploadFileText, setUploadFileText] = useState("Upload Your Resume");
    const [loading, setLoading] = useState(false);
    const [resume, setResumeFile] = useState<File | null>(null);
    const [job_desc, setJobDesc] = useState("");
    const [result, setResult] = useState(null);
    const [name, setName] = useState("");
    const [score, setScore] = useState<any>(null);
    const [strengths, setStrengths] = useState<any>(null);
    const [weaknesses, setWeaknesses] = useState<any>(null);
    const [jobs, setJobs] = useState([]);
    const [selectedJob, setSelectedJob] = useState(null);
    const [createdBy, setCreatedBy] = useState(null);
    const getJobs = async () => {
        try {
            const response = await instance.get('/admin/get');
            setJobs(response.data.data);
        } catch (err) {
            console.log(err);
        }
    }
    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const response = await instance.get("/api/resume/getJobs");

                console.log(response.data);

                setJobs(response.data.data);
            } catch (err) {
                console.log(err);
            }
        };

        fetchJobs();
    }, []);
    useEffect(() => {
        getJobs();
    }, []);
    const handleFileChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        console.log("FILE CHANGE FIRED");

        const file = e.target.files?.[0];
        console.log(file);

        if (file) {
            setUploadFileText(file.name);
            setResumeFile(file);
        }
    };

    const handleUpload = async () => {
        setResult(null);
        if (!job_desc) {
            alert("Please fill jobdesc");
            return;
        }
        if (!resume) {
            alert("Please upload resume");
            return;
        }
        const formData = new FormData();
        formData.append('resume', resume);
        formData.append('job_desc', job_desc);
        formData.append('user', userInfo._id);
        try {
            console.log(userInfo);
            console.log(userInfo.id);
            const result = await instance.post('/api/resume/addResume', formData);
            console.log(result);
            console.log(result.data.analysis);
            setScore(result.data.analysis.score);
            setStrengths(result.data.analysis.strengths);
            setWeaknesses(result.data.analysis.weaknesses);
        } catch (err: any) {
            console.log("STATUS:", err.response?.status);
            console.log("DATA:", err.response?.data);
            console.log("FULL:", err.response);
        }
    }

    return (
        <div className="mt-4 flex flex-col gap-5">
            <div className="bg-amber-50 w-auto pl-2 pr-2 rounded-sm pb-6">
                <div className="text-black font-extrabold text-2xl ml-1">
                    Smart Resume Screen Matching
                </div>

                <div className="text-black text-4xl">
                    Resume Match Score
                </div>

                <div className="bg-green-100 mt-16 p-1 text-black">
                    Important Instructions

                    <div className="text-black text-xl">
                        <p>✓ Only PDF files are allowed.</p>
                        <p>✓ Maximum file size is 5MB.</p>
                        <p>
                            ✓ Resume should be in English and should contain at least
                            3 years of experience.
                        </p>
                    </div>
                </div>

                <div className="flex gap-60 mt-4">
                    <div className="border border-black bg-red-400 w-64 text-center">
                        {uploadFileText}
                    </div>

                    <label className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded">
                        Upload Resume

                        <input
                            type="file"
                            accept=".pdf"
                            className="hidden"
                            onChange={handleFileChange}
                        />
                    </label>
                </div>
                <div className='flex mt-6 gap-40'>
                    <select
                        onChange={(e) => {
                            const job = jobs.find(j => j._id === e.target.value);

                            setSelectedJob(job);
                            setJobDesc(job.job_desc);
                        }}
                    >
                        <option value="">Select a Job</option>

                        {jobs.map((job) => (
                            <option key={job._id} value={job._id}>
                                {job.name}
                            </option>

                        ))}
                    </select>
                    {selectedJob && (
                        <>
                            <div className="flex gap-5">
                                <p>Job Desc: {selectedJob.createdBy}</p>
                                <p>{selectedJob.job_desc}</p>
                            </div>
                        </>
                    )}
                </div>
                <div>
                    <button onClick={handleUpload}>Analyze</button>
                </div>
                <div className='flex flex-col gap-5'>
                    <div className="bg-green-300 w-48  flex flex-col items-center rounded-sm text-center">
                        <div className='text-xl font-bold'>
                            Analyze With AI
                            <Image
                                src="vercel.svg"
                                alt="Logo"
                                width={200}
                                height={200}
                                className='rounded-full'
                            />
                            {userInfo.name}
                        </div>
                    </div>
                    {/* <div className="bg-green-300 w-48 flex flex-col rounded-sm">
                    <div className="text-xl font-bold text-center">
                        Analyze With AI
                    </div>

                    <div className="flex justify-center">
                        <Image
                            src="/vercel.svg"
                            alt="Logo"
                            width={200}
                            height={200}
                            className="rounded-full"
                        />
                    </div>

                    <h1 className="ml-2">Feedback</h1>
                </div> */}
                    {score ? (
                        <div className='w-80 h-fit border-black border'>
                            Score : {score}<br />
                            {<br />}
                            Strengths : {strengths}<br />
                            {<br />}
                            Weaknesses : {weaknesses}
                        </div>
                    ) : (
                        <div>
                            <Skeleton variant='rectangular' width={200} height={200} className='rounded-sm' />
                        </div>
                    )}

                </div>
                <Link href="/CodeHere">Code Here</Link>
            </div>
        </div>
    );
};

export default withAuthHoc(Page);
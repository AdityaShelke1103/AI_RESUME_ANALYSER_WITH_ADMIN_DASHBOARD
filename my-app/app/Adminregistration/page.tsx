'use client';

import { useState } from 'react';
import instance from '@/utils/axios';
import Link from 'next/link';

const Page = () => {
    const [name, setName] = useState('');
    const [jobDesc, setJobDesc] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const user = JSON.parse(localStorage.getItem("userInfo"));

            console.log({
                name,
                job_desc: jobDesc,
                employerEmail: user?.name,
            });
            const response = await instance.post("/api/admin/create", {
                name,
                job_desc: jobDesc,
                employerEmail: user.email,
            });
            console.log(response.data);

            alert('Job created successfully!');

            setName('');
            setJobDesc('');

            console.log(response.data);
        } catch (err) {
            console.log(err);
            alert('Failed to create job.');
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-8 rounded-xl shadow-lg w-[600px]"
            >
                <h1 className="text-3xl font-bold mb-6 text-center">
                    Create Job
                </h1>

                <div className="mb-5">
                    <label className="block mb-2 font-semibold">
                        Job Name
                    </label>

                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full border rounded-md p-3 outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Frontend Developer"
                        required
                    />
                </div>

                <div className="mb-5">
                    <label className="block mb-2 font-semibold">
                        Job Description
                    </label>

                    <textarea
                        value={jobDesc}
                        onChange={(e) => setJobDesc(e.target.value)}
                        rows={10}
                        className="w-full border rounded-md p-3 outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                        placeholder="Enter the complete job description..."
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition"
                >
                    Create Job
                </button>
            </form>
            <Link href="/Dsa">Create Dsa Questions</Link>
        </div>
    );
};

export default Page;
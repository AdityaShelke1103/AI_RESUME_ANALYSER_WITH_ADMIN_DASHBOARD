"use client";
import { useState } from "react";
import instance from "@/utils/axios";

export default function GenerateQuestion() {
    const [topic, setTopic] = useState("");
    const [difficulty, setDifficulty] = useState("Easy");
    const [company, setCompany] = useState("");

    const handleGenerate = async () => {
        try {
            const user = JSON.parse(localStorage.getItem("userInfo"));

            const response = await instance.post("/api/questions/generate", {
                topic,
                difficulty,
                company,
                createdBy: user.email,
            });

            alert("Question generated successfully!");

            console.log(response.data);

        } catch (err) {
            console.log(err);
            alert("Something went wrong.");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-xl shadow-lg w-[500px]">

                <h1 className="text-2xl font-bold mb-6">
                    Generate DSA Question
                </h1>

                <div className="mb-4">
                    <label className="block mb-2 font-medium">
                        Topic
                    </label>

                    <select
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                        className="w-full border rounded-lg p-2"
                    >
                        <option value="">Select Topic</option>
                        <option>Arrays</option>
                        <option>Strings</option>
                        <option>Two Pointers</option>
                        <option>Sliding Window</option>
                        <option>Binary Search</option>
                        <option>Stack</option>
                        <option>Queue</option>
                        <option>Linked List</option>
                        <option>Trees</option>
                        <option>BST</option>
                        <option>Heap</option>
                        <option>Graph</option>
                        <option>Greedy</option>
                        <option>Dynamic Programming</option>
                        <option>Backtracking</option>
                        <option>Bit Manipulation</option>
                    </select>
                </div>

                <div className="mb-4">
                    <label className="block mb-2 font-medium">
                        Difficulty
                    </label>

                    <select
                        value={difficulty}
                        onChange={(e) => setDifficulty(e.target.value)}
                        className="w-full border rounded-lg p-2"
                    >
                        <option>Easy</option>
                        <option>Medium</option>
                        <option>Hard</option>
                    </select>
                </div>

                <div className="mb-6">
                    <label className="block mb-2 font-medium">
                        Company
                    </label>

                    <input
                        type="text"
                        placeholder="Amazon"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        className="w-full border rounded-lg p-2"
                    />
                </div>

                <button
                    onClick={handleGenerate}
                    className="w-full bg-black text-white p-3 rounded-lg hover:bg-gray-800"
                >
                    Generate Question
                </button>

            </div>
        </div>
    );
}
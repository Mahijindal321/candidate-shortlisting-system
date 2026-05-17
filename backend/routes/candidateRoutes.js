const express = require("express");
const router = express.Router();

const Candidate = require("../models/Candidate");

const axios = require("axios");


// ADD CANDIDATE
router.post("/candidates", async (req, res) => {

    try {

        const candidate = new Candidate(req.body);

        await candidate.save();

        res.json(candidate);

    }

    catch (error) {

        res.status(500).json({
            error: error.message
        });

    }

});


// GET ALL CANDIDATES
router.get("/candidates", async (req, res) => {

    try {

        const candidates = await Candidate.find();

        res.json(candidates);

    }

    catch (error) {

        res.status(500).json({
            error: error.message
        });

    }

});


// MATCH CANDIDATES
router.post("/match", async (req, res) => {

    try {

        const { requiredSkills, minExperience } = req.body;

        const candidates = await Candidate.find();

        const matchedCandidates = candidates.map(candidate => {

            const matchedSkills = candidate.skills.filter(skill =>
                requiredSkills.includes(skill)
            );

            const score =
                (matchedSkills.length / requiredSkills.length) * 100;

            return {

                name: candidate.name,

                email: candidate.email,

                experience: candidate.experience,

                matchedSkills,

                matchScore: score

            };

        })

        .filter(candidate =>
            candidate.experience >= minExperience
        )

        .sort((a, b) =>
            b.matchScore - a.matchScore
        );

        res.json(matchedCandidates);

    }

    catch (error) {

        res.status(500).json({
            error: error.message
        });

    }

});


// AI SHORTLIST ROUTE
router.post("/ai/shortlist", async (req, res) => {

    try {

        const candidates = await Candidate.find();

        const prompt = `

        Job requires React and Node.js
        with 2 years experience.

        Candidates:

        ${candidates.map(c =>
            `${c.name} -
            ${c.skills.join(", ")} -
            ${c.experience} years`
        ).join("\n")}

        Rank candidates and explain why.

        `;

        const response = await axios.post(

            "https://openrouter.ai/api/v1/chat/completions",

            {

                model: "openai/gpt-3.5-turbo",

                messages: [
                    {
                        role: "user",
                        content: prompt
                    }
                ]

            },

            {

                headers: {

                    "Authorization":
                    `Bearer ${process.env.OPENROUTER_API_KEY}`,

                    "HTTP-Referer":
                    "http://localhost:3000",

                    "X-Title":
                    "Candidate Shortlisting System",

                    "Content-Type":
                    "application/json"

                }

            }

        );

        res.json(response.data);

    }

    catch (error) {

        console.log(
            error.response?.data || error.message
        );

        res.status(500).json({

            error:
            error.response?.data || error.message

        });

    }

});


module.exports = router;
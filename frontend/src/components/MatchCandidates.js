import React, { useState } from "react";
import axios from "axios";

function MatchCandidates() {

    const [results, setResults] = useState([]);

    const matchCandidates = async () => {

        try {

            const response = await axios.post(

                "https://candidate-backend-nzo6.onrender.com/api/match",

                {
                    requiredSkills: ["React", "Node.js"],
                    minExperience: 1
                }

            );

            setResults(response.data);

        }

        catch (error) {

            console.log(error);

        }

    };

    return (

    <div>

        <h2>Matched Candidates</h2>

        <button onClick={matchCandidates}>
            Match Candidates
        </button>

        {

            results.map((candidate, index) => (

                <div
                    className="result-card"
                    key={index}
                >

                    <h3>{candidate.name}</h3>

                    <p>
                        Match Score:
                        {candidate.matchScore}%
                    </p>

                    <p>
                        Skills:
                        {candidate.matchedSkills.join(", ")}
                    </p>

                </div>

            ))
        }

    </div>

);

}

export default MatchCandidates;
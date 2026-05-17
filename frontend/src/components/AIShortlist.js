import React, { useState } from "react";

import axios from "axios";

function AIShortlist() {

    const [aiResult, setAiResult] = useState("");

    const getAIShortlist = async () => {

        try {

            const response = await axios.post(
                "http://localhost:5000/api/ai/shortlist"
            );

            setAiResult(
                response.data.choices[0].message.content
            );

        }

        catch (error) {

            console.log(error);

            alert("Error fetching AI response");

        }

    };

    return (

    <div>

        <h2>
            AI Candidate Recommendation
        </h2>

        <button onClick={getAIShortlist}>
            Get AI Recommendation
        </button>

        <div className="ai-box">

            {aiResult}

        </div>

    </div>

);

}

export default AIShortlist;
import React, { useState } from "react";
import axios from "axios";

function CandidateForm() {

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        skills: "",
        experience: "",
        bio: ""
    });

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            await axios.post(
                "http://localhost:5000/api/candidates",
                {
                    ...formData,
                    skills: formData.skills.split(",")
                }
            );

            alert("Candidate Added");

        }

        catch (error) {

            console.log(error);

        }

    };

    return (

        <div>

            <h2>Add Candidate</h2>

            <form onSubmit={handleSubmit}>

                <input
                    placeholder="Name"
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            name: e.target.value
                        })
                    }
                />

                <br /><br />

                <input
                    placeholder="Email"
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            email: e.target.value
                        })
                    }
                />

                <br /><br />

                <input
                    placeholder="Skills"
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            skills: e.target.value
                        })
                    }
                />

                <br /><br />

                <input
                    placeholder="Experience"
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            experience: e.target.value
                        })
                    }
                />

                <br /><br />

                <textarea
                    placeholder="Bio"
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            bio: e.target.value
                        })
                    }
                />

                <br /><br />

                <button type="submit">
                    Add Candidate
                </button>

            </form>

        </div>

    );

}

export default CandidateForm;
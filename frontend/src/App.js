import "./App.css";

import CandidateForm from "./components/CandidateForm";
import MatchCandidates from "./components/MatchCandidates";
import AIShortlist from "./components/AIShortlist";

function App() {

  return (

    <div className="app">

      <h1 className="heading">
        AI Candidate Shortlisting System
      </h1>

      <div className="card">
        <CandidateForm />
      </div>

      <div className="card">
        <MatchCandidates />
      </div>

      <div className="card">
        <AIShortlist />
      </div>

    </div>

  );

}

export default App;
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

const Identification = () => {
  const router = useRouter();
  const [participantId, setParticipantId] = useState("");
  const [error, setError] = useState("");

  const handleNavigation = (group) => {
    if (!participantId.trim()) {
      setError("Please enter your participant ID.");
      return;
    }
    setError("");
    router.push(
      `/${group}-instructions?participantId=${participantId}&group=${group}`
    );
  };

  return (
    <div className="h-screen flex items-center justify-center text-center">
      <div className="max-w-[600px] flex flex-col">
        <p>
          Please enter your student ID below and select the group that you have
          been assigned to. If you are unsure, please approach one of us!
        </p>

        <div className="mt-4">
          <input
            type="text"
            placeholder="Enter your student ID"
            value={participantId}
            onChange={(e) => setParticipantId(e.target.value)}
            className="input input-bordered w-full max-w-xs"
          />
        </div>

        {/* error */}
        {error && <p className="text-red-500 mt-2">{error}</p>}

        <div className="mt-5 space-x-5">
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => handleNavigation("group-1")}
          >
            Group 1
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => handleNavigation("group-2")}
          >
            Group 2
          </button>
        </div>
      </div>
    </div>
  );
};

export default Identification;

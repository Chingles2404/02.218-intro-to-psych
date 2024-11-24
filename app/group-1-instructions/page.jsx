"use client";
import { useRouter, useSearchParams } from "next/navigation";

const GroupOneInstructions = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleNavigation = () => {
    const currentParams = new URLSearchParams(searchParams.toString());
    const newUrl = `/experiment?${currentParams.toString()}`;
    router.push(newUrl);
  };

  return (
    <div className="p-10 flex flex-col items-center justify-center">
      <div className="max-w-[600px] flex flex-col mb-8">
        <h1 className="text-xl font-bold mb-2 text-center">
          02.218 Introduction to Psychology Study Instructions (Group 1)
        </h1>
        <p className="mb-4">
          Welcome to the Textual Information Assessment Study! The purpose of
          this study is to gauge individuals’ ability to assess text
          information. <br />
          <br />
          Before beginning the test, please carefully read the instructions
          below.
        </p>
        <p className="font-bold">Test Instructions</p>
        <ol className="list-decimal list-outside ml-4">
          <li>
            You will be completing this test on a laptop. 13 passages will be
            presented to you one at a time.
          </li>
          <li>
            For each passage, you will be given{" "}
            <span className="font-bold text-red-500 underline">45 seconds</span>{" "}
            to read it. You will then be given another{" "}
            <span className="font-bold text-red-500 underline">45 seconds</span>{" "}
            to answer a set of 5 questions that follow, related to the passage
            you have just read.
          </li>
          <li>
            You{" "}
            <span className="font-bold text-red-500 underline">will not</span>{" "}
            be allowed to return to the previous screen to either re-read parts
            of the passage or change your responses to any of the 5 questions,
            so please{" "}
            <span className="font-bold text-red-500 underline">
              be mindful of the on-screen timer
            </span>{" "}
            and{" "}
            <span className="font-bold text-red-500 underline">
              answer all 5 questions within the stipulated time
            </span>
            .
          </li>
          <li>
            A sample question will be given at the start of the study to ensure
            that you understand how to complete the task. Please raise your hand
            if you have any questions or concerns, and one of our invigilators
            will come to assist you.
          </li>
        </ol>
        <p className="font-bold mt-4">Participant Conduct Guidelines</p>
        <ol className="list-decimal list-outside ml-4">
          <li>
            Please{" "}
            <span className="font-bold text-red-500 underline">do not</span>{" "}
            talk to other participants while completing the test.
          </li>
          <li>
            Please{" "}
            <span className="font-bold text-red-500 underline">do not</span>{" "}
            discuss your answers with other participants after completing the
            test. This helps minimize distractions for other participants who
            have not finished yet.
          </li>
          <li>
            Please remain seated and{" "}
            <span className="font-bold text-red-500 underline">do not</span>{" "}
            leave the study venue until the invigilator has informed you that
            you may do so.
          </li>
          <li>
            After the study, please{" "}
            <span className="font-bold text-red-500 underline">do not</span>{" "}
            disclose any details about your involvement in the study or its
            procedures to others.
          </li>
        </ol>
        <br />
        Thank you for your participation!
      </div>
      <button
        type="button"
        className="btn btn-primary"
        onClick={handleNavigation}
      >
        Begin
      </button>
    </div>
  );
};

export default GroupOneInstructions;

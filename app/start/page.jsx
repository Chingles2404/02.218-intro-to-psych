"use client";
import { useRouter } from "next/navigation";

const Start = () => {
  const router = useRouter();

  const handleNavigation = () => {
    router.push("/identification");
  };

  return (
    <div className="h-screen flex items-center justify-center text-center">
      <div className="max-w-[600px] flex flex-col">
        <h1 className="text-xl font-bold mb-2">
          Welcome to our experiment for 02.218 Intro to Psychology project
        </h1>
        <p>Thank you for participating in our experiment!</p>
        <p>
          Before we begin the experiment, please submit the content form{" "}
          <a
            className="underline text-[#0EA5E9]"
            href="https://forms.gle/XYc1nh3o94MxSmY66"
            target="_blank"
          >
            here
          </a>
          .
        </p>
        <div>
          <button
            type="button"
            className="btn btn-primary mt-4"
            onClick={handleNavigation}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Start;

"use client";

const InstructionComponent = ({ text, onStart }) => {
  return (
    <div className="h-screen flex items-center justify-center">
      <div className="max-w-[500px] p-6 flex flex-col text-center">
        <h1 className="text-xl font-bold mb-4">Instructions</h1>
        <p className="text-center text-gray-700 mb-6">{text}</p>
        <div>
          <button className="btn btn-primary" onClick={onStart}>
            Start
          </button>
        </div>
      </div>
    </div>
  );
};

export default InstructionComponent;

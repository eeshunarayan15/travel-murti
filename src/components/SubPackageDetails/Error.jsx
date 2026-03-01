import React from "react";

const Error = ({ message }) => {
  return (
    <div className="text-center text-red-500 font-semibold py-16">
      {message || "Something went wrong"}
    </div>
  );
};

export default Error;
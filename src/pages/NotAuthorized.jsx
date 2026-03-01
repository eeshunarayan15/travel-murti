import React from "react";
import { Link } from "react-router-dom";

const NotAuthorized = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <h1 className="text-4xl font-bold text-red-600 mb-4">
        403 – Not Authorized
      </h1>

      <p className="text-gray-700 text-center max-w-md mb-6">
        You do not have permission to access this page.
        If you think this is a mistake, please contact the administrator.
      </p>

      <div className="flex gap-4">
        <Link
          to="/"
          className="px-6 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
        >
          Go Home
        </Link>

        <Link
          to="/admin/login"
          className="px-6 py-2 rounded bg-gray-200 text-gray-800 hover:bg-gray-300"
        >
          Login Again
        </Link>
      </div>
    </div>
  );
};

export default NotAuthorized;
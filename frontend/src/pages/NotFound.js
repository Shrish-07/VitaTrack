import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="text-center p-12">
      <h1 className="text-5xl font-bold mb-4">404 - Page Not Found</h1>
      <p className="mb-4 text-gray-600 dark:text-gray-300">
        Sorry, the page you are looking for does not exist.
      </p>
      <Link
        to="/"
        className="text-indigo-600 dark:text-indigo-400 hover:underline font-semibold"
      >
        Go back to Home
      </Link>
    </div>
  );
}

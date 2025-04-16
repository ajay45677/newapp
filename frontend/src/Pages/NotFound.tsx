import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 dark:bg-gray-900 text-center p-6 mt-5 mb-5">
      <img
        src="https://cdnl.iconscout.com/lottie/premium/thumb/404-error-page-animation-download-in-lottie-json-gif-static-svg-file-formats--not-found-web-the-ultimate-pack-design-development-animations-3299960.gif"
        alt="404 Not Found"
        className="w-96 mb-6"
      />
      <h1 className="text-4xl font-bold text-gray-800 dark:text-white mt-5 mb-4">Oops! Page Not Found</h1>
      <p className="text-gray-600 dark:text-gray-300 mt-4 mb-4">
        The page you're looking for doesn't exist.
      </p>
      <Link
        to="/"
        className="mt-6 px-6 py-3 bg-blue-500 text-dark font-semibold rounded-lg shadow-md hover:bg-blue-700 transition"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFound;

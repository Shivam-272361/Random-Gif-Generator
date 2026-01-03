import React, { useState } from "react";

const Random = () => {
  const [gif, setGif] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function clickHandler() {
    setLoading(true);
    setError("");
    
    try {
      const API_KEY = import.meta.env.VITE_GIPHY_KEY;
      const res = await fetch(
        `https://api.giphy.com/v1/gifs/random?api_key=${API_KEY}&tag=funny&rating=g`
      );
      
      if (!res.ok) {
        throw new Error("Failed to fetch GIF");
      }
      
      const data = await res.json();
      setGif(data.data.images.original.url);
    } catch (err) {
      setError("Failed to load GIF. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-500 to-pink-500 p-6">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Random GIF Generator
        </h2>

        <div className="mb-6 bg-gray-100 rounded-lg min-h-[300px] flex items-center justify-center overflow-hidden">
          {loading ? (
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-purple-500"></div>
          ) : gif ? (
            <img 
              src={gif} 
              alt="Random GIF" 
              className="max-w-full max-h-[400px] rounded-lg"
            />
          ) : (
            <p className="text-gray-400 text-center px-4">
              Click the button to generate a funny GIF!
            </p>
          )}
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
            {error}
          </div>
        )}

        <button 
          onClick={clickHandler}
          disabled={loading}
          className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        >
          {loading ? "Loading..." : "Generate Random GIF"}
        </button>
      </div>
    </div>
  );
};

export default Random;
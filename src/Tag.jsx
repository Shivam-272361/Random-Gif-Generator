import React, { useState } from "react";

const Tag = () => {
  const [tag, setTag] = useState("");
  const [gif, setGif] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchedTag, setSearchedTag] = useState("");

  async function clickHandler() {
    if (!tag.trim()) {
      setError("Please enter a tag");
      return;
    }

    setLoading(true);
    setError("");
    
     
    try {
      const API_KEY = import.meta.env.VITE_GIPHY_KEY;
      const res = await fetch(
        `https://api.giphy.com/v1/gifs/random?api_key=${API_KEY}&tag=${encodeURIComponent(tag)}&rating=g`
      );
      
      if (!res.ok) {
        throw new Error("Failed to fetch GIF");
      }
      
      
      const data = await res.json();
      
      if (data.data.images) {
        setGif(data.data.images.original.url);
        setSearchedTag(tag);
      } else {
        setError("No GIF found for this tag. Try another one!");
      }
    } catch (err) {
      setError("Failed to load GIF. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  function handleKeyPress(e) {
    if (e.key === "Enter") {
      clickHandler();
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-500 to-teal-500 p-6">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full">
        <h2 className="text-3xl font-bold text-center mb-2 text-gray-800">
          Custom GIF Generator
        </h2>
        <p className="text-center text-gray-600 mb-6 text-sm">
          Search for GIFs by tag (e.g., WWE, cats, funny)
        </p>

        <div className="mb-6">
          <input
            type="text"
            value={tag}
            onChange={(e) => setTag(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Enter a tag (e.g., WWE)"
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition-colors duration-300 text-gray-800"
          />
        </div>

        <div className="mb-6 bg-gray-100 rounded-lg min-h-[300px] flex items-center justify-center overflow-hidden">
          {loading ? (
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
          ) : gif ? (
            <div className="w-full">
              {searchedTag && (
                <p className="text-center text-sm text-gray-600 mb-2 font-semibold">
                  Tag: {searchedTag}
                </p>
              )}
              <img 
                src={gif} 
                alt={`${searchedTag} GIF`}
                className="max-w-full max-h-[400px] rounded-lg mx-auto"
              />
            </div>
          ) : (
            <p className="text-gray-400 text-center px-4">
              Enter a tag and click generate to see a GIF!
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
          disabled={loading || !tag.trim()}
          className="w-full bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        >
          {loading ? "Loading..." : "Generate GIF"}
        </button>

        {gif && (
          <button 
            onClick={() => {
              setTag("");
              setGif("");
              setSearchedTag("");
              setError("");
            }}
            className="w-full mt-3 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-2 px-6 rounded-lg transition-colors duration-300"
          >
            Clear
          </button>
        )}
      </div>
    </div>
  );
};

export default Tag;
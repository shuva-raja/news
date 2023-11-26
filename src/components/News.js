import React, { useEffect, useState } from "react";
import axios from "axios";
import { TailSpin } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";

const News = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();

  const fetchData = async () => {
    setIsLoading(true);
    const totalTime = 210; // Total time in seconds (3 min 30 sec)
    let currentTime = 0;

    const interval = setInterval(() => {
      currentTime += 1;
      const newProgress = Math.floor((currentTime / totalTime) * 100);
      setProgress(newProgress);

      if (currentTime >= totalTime) {
        clearInterval(interval);
        setIsLoading(false);
        navigate("/"); // Redirect to the home page
      }
    }, 1000); // Update progress every second

    try {
      const response = await axios.get(
        "http://localhost:4000/fetch-and-save-datas"
      );
      // Do something with the data if needed
    } catch (error) {
      console.error("Error fetching news data:", error);
      clearInterval(interval);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isLoading) {
      fetchData();
    }
  }, [isLoading]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "70vh",
        
      }}
    >
      {!isLoading && (
        <button style={{borderRadius: "10px"}}onClick={() => setIsLoading(true)}>Load More News</button>
      )}
      {isLoading && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 9999,
          }}
        >
          <TailSpin // Use the specific spinner type
            color="#4fa94d" // Customize spinner color
            height={100} // Adjust spinner size
            width={100}
          />
          <div>Loading... {progress}%</div>
        </div>
      )}
    </div>
  );
};

export default News;

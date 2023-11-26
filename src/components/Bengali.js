import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Bengali.css";

import { Link, useParams } from "react-router-dom";

const Bengali = () => {
  const [bengali, setBengali] = useState([]);
  const [DATA, setDATA] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 8;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:4000/get-bengali");
        const data = response.data;
        setDATA(data);
        const startIndex = (currentPage - 1) * articlesPerPage;
        const endIndex = startIndex + articlesPerPage;
        const currentPageArticles = data.slice(startIndex, endIndex);
        setBengali(currentPageArticles);
      } catch (error) {
        console.error("Error fetching news data:", error);
      }
    };
    fetchData();
  }, [currentPage]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const totalPages = Math.ceil(DATA.length / articlesPerPage);

  const renderPageButtons = () => {
    const pageButtons = [];
    const totalPages = Math.ceil(DATA.length / articlesPerPage);
    const maxPagesToShow = 4;

    let startPage = Math.max(currentPage - Math.floor(maxPagesToShow / 2), 1);
    let endPage = Math.min(startPage + maxPagesToShow - 1, totalPages);

    if (endPage - startPage + 1 < maxPagesToShow) {
      startPage = Math.max(endPage - maxPagesToShow + 1, 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageButtons.push(
        <button
          style={{ marginLeft: "2.5px" }}
          key={i}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </button>
      );
    }
    return pageButtons;
  };

  const renderNextButton = () => {
    const totalPages = Math.ceil(DATA.length / articlesPerPage);
    if (currentPage < totalPages) {
      return (
        <button
          style={{ marginLeft: "2.5px" }}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          Next
        </button>
      );
    }
    return null;
  };

  const renderPrevButton = () => {
    if (currentPage > 1) {
      return (
        <button
          style={{ marginLeft: "2.5px" }}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          Prev
        </button>
      );
    }
    return null;
  };

  return (
    <>
      <div className="bengali">
        {bengali.map((p) => (
          <div className="bengalisection" key={p.article_id}>
            <img src={p.image_url} alt={p.title} />
            <div style={{ padding: "12px" }}>
              <p style={{ color: "green", fontSize: "12px" }}>{p.title}</p>
              <span>
                <Link
                  style={{
                    position:'absolute',
                    right:'10px',
                    bottom:'2px',
                    
                    textDecoration: "None",
                  }}
                  to={`/article/${p.article_id}`}
                >
                  Read More
                </Link>
                
              </span>
            </div>
          </div>
        ))}
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "20px",
          cursor: "pointer",
        }}
      >
        {renderPrevButton()}
        {renderPageButtons()}
        {renderNextButton()}
      </div>
    </>
  );
};

export default Bengali;

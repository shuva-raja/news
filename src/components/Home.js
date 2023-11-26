import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Home.css"; // Import the CSS file for styling

const Home = () => {
  const [data, setData] = useState([]);
  const [displayedCount, setDisplayedCount] = useState(6); // Number of articles initially displayed

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:4000/get-headlines");
        const fetchedData = response.data;
        setData(fetchedData);
      } catch (error) {
        console.error("Error fetching news data:", error);
      }
    };
    fetchData();
  }, []);

  const loadMore = () => {
    setDisplayedCount(prevCount => prevCount + 6); // Increase displayed count by 6
  };

  return (
    <div className="home">
      {data.slice(0, displayedCount).map((p, index) => {
        // Check if it is the first news article
        if (index === 0) {
          // Render the top news differently
          return (
            <React.Fragment key={p.article_id}>
              <div
                className="top-news"
                style={{
                  marginTop: "1px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <img
                  style={{
                    filter: "grayscale(100%)",
                    maxWidth: "60%",
                    width: "100%",
                  }}
                  src={p.image_url}
                  alt={p.title}
                />
                <p style={{ fontWeight: "bolder", color: "green" }}>
                  {p.title}
                </p>
                <br />
                <Link to={`/article/${p.article_id}`}>Read More</Link>
                <br />
              </div>
              <p className="top-story">Top Stories</p>
            </React.Fragment>
          );
        } else {
          // For the remaining articles
          return (
            <div className="wholesec" key={p.article_id}>
              {index % 2 === 0 ? (
                <>
                  <div className="homesection">
                    <img
                      src={p.image_url}
                      alt={p.title}
                      className="side-image"
                    />
                  </div>
                  <div className="side-description">
                    <p
                      style={{
                        fontWeight: "bolder",
                        color: "green",
                        marginLeft: "25px",
                        marginBottom: "10px",
                        fontSize: "15px",
                        fontFamily: "Algerian",
                      }}
                    >
                      {p.title}
                    </p>
                    <span style={{ maxWidth: "20ch", marginLeft: "25px" }}>
                      {p.description && p.description.slice(0, 80)}
                    </span>
                    <br />
                    <Link
                      style={{ marginLeft: "25px" }}
                      to={`/article/${p.article_id}`}
                    >
                      Read More
                    </Link>
                  </div>
                </>
              ) : (
                <>
                  <div className="side-description">
                    <p
                      style={{
                        fontWeight: "bolder",
                        color: "green",
                        marginLeft: "25px",
                        marginBottom: "10px",
                        fontSize: "15px",
                        fontFamily: "Algerian",
                      }}
                    >
                      {p.title}
                    </p>
                    <span style={{ maxWidth: "20ch", marginLeft: "25px" }}>
                      {p.description && p.description.slice(0, 80)}
                    </span>
                    <br />
                    <Link
                      style={{ marginLeft: "25px" }}
                      to={`/article/${p.article_id}`}
                    >
                      Read More
                    </Link>
                  </div>
                  <div className="homesection">
                    <img
                      src={p.image_url}
                      alt={p.title}
                      className="side-image"
                    />
                  </div>
                  
                </>
              )}
              
            </div>
          );
        }
      })}
      {/* "Load More" button */}
      {displayedCount < data.length && (
        <button style={{textAlign: "center", marginTop: "47px" ,marginLeft:'50%',borderRadius:'5px',color:'white',backgroundColor:'black'}} onClick={loadMore}>Load More</button>
      )}
    </div>
  );
};

export default Home;








































































































































// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { Link } from "react-router-dom";
// import "./Home.css"; // Import the CSS file for styling

// const Home = () => {
//   const [DATA, setDATA] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get("http://localhost:4000/get-headlines");
//         const data = response.data;
//         setDATA(data);
//       } catch (error) {
//         console.error("Error fetching news data:", error);
//       }
//     };
//     fetchData();
//   }, []);

//   return (
//     <div className="home">
//       {DATA.map((p, index) => {
//         // Check if it is the first news article
//         if (index === 0) {
//           return (
//             <>
//               <div
//                 className="top-news"
//                 style={{
//                   marginTop: "1px",
//                   display: "flex",
//                   flexDirection: "column",
//                   alignItems: "center",
//                 }}
//                 key={p.article_id}
//               >
//                 <img
//                   style={{
//                     filter: "grayscale(100%)",
//                     maxWidth: "60%",
//                     width: "100%",
//                     height: "60%",
//                     // borderRadius: "10px",
//                   }}
//                   src={p.image_url}
//                   alt={p.title}
//                 />
//                 <p style={{ fontWeight: "bolder", color: "green" }}>
//                   {p.title}
//                 </p>
//                 <br />
//                 <Link to={`/article/${p.article_id}`}>Read More</Link>
//                 <br />

//                 {/* <p className="home">{p.description}</p> */}
//               </div>
//               <p className="top-story">Top Stories</p>
//             </>
//           );
//         } else {
//           // For the next five articles, arrange in two columns
//           return (
//             <>
//               <div className="wholesec" key={p.article_id}>
//                 <div className="homesection">
//                   <img src={p.image_url} alt={p.title} className="side-image" />
//                 </div>
//                 <div className="side-description">
//                   <p
//                     style={{
//                       fontWeight: "bolder",
//                       color: "green",
//                       marginLeft: "25px",
//                       marginBottom: "10px",
//                       fontSize: "15px",
//                       fontFamily: "Algerian",
//                     }}
//                   >
//                     {p.title}
//                   </p>
//                   <span style={{ maxWidth: "20ch", marginLeft: "25px" }}>
//                     {p.description && p.description.slice(0, 80)}
//                   </span>
//                   <br />
//                   <Link
//                     style={{ marginLeft: "25px" }}
//                     to={`/article/${p.article_id}`}
//                   >
//                     Read More
//                   </Link>
//                 </div>
//               </div>
//               <hr
//                 style={{ width: "60%", margin: "0 auto", marginBottom: "15px" }}
//               />
//             </>
//           );
//         }
//       })}
//     </div>
//   );
// };

// export default Home;

// // import React, { useEffect, useState } from "react";
// // import axios from "axios";
// // import "./Home.css";
// // import { Link } from "react-router-dom";
// // const Home = () => {
// //   const [Data, setNewsData] = useState([]);

// //   useEffect(() => {
// //     const fetchData = async () => {
// //       try {
// //         const response = await axios.get("http://localhost:4000/get-top"); // Make a GET request to your Express.js backend
// //         const data = response.data;
// //         setNewsData(data);
// //       } catch (error) {
// //         console.error("Error fetching news data:", error);
// //       }
// //     };

// //     fetchData();
// //   }, []);

// //   return (
// //     <div className="news">
// //       {Data.map((p) => (
// //         // Conditionally render the div only if p.image_url exists

// //         <div key={p.article_id} className="newscard">
// //           <p style={{ fontWeight: "bolder", color: "green" }}>{p.title}</p>
// //           <img src={p.image_url} alt={p.title} /><br/>
// //           <Link to={`/article/${p.article_id}`}>Read More</Link><br/>
// //           <p>{p.description}</p>
// //         </div>
// //       ))}
// //     </div>
// // //   );
// // // };
// // import React from 'react';
// // import image from "../images/newspaper.jpg";
// // import sports from "../images/sports.jpg";

// // const Home = () => {
// //   const imageStyle = {
// //     objectFit: 'cover',
// //     height:"800px",
// //     width:"100%" // Use 'cover' or other sizing options based on your design
// //   };

// //   return (
// //     <>
// //       <div>
// //         <img style={imageStyle} src={image} alt="newspaper" />
// //       </div>
// //       <div>
// //         <img style={imageStyle}src={sports} alt="sports" />
// //       </div>
// //     </>
// //   );
// // };

// // export default Home;

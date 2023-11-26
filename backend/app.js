const express = require("express");
const axios = require("axios");
const app = express();
const cookieParser = require("cookie-parser");
app.use(cookieParser());

app.use(express.urlencoded({ extended: true }));
const cors = require("cors");
const corsOptions = {
  origin: "http://localhost:3000", // Replace with your frontend's origin
  credentials: true, // Allow credentials (cookies)
};
app.use(cors(corsOptions));
app.use(express.json());

const secretKey = "shuvajitda";
const nodemailer = require("nodemailer");
const mongoose = require("mongoose");
app.use(express.urlencoded({ extended: false }));
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const mongoconnect = require("./connection/News");
const Article = require("./model/Data");

const fetchAndSaveData = require("./mainfunction/Fetch");
const generateUniqueArticleId = require("../backend/mainfunction/uniuearticle");

const verify = require("./middleware/Verify");

// const async = require("hbs/lib/async");
const User = require("./model/User");
// const isAuthenticated = require("./middleware/Isauthenticated");

mongoconnect(); // Connect to MongoDB

const transporter = nodemailer.createTransport({
  service: "Gmail", // e.g., 'Gmail', 'Yahoo', etc.
  auth: {
    user: "shuvajit.motog@gmail.com", // Your email address
    pass: "edoc ozir zfjm sbvg", // Your email password
  },
});
app.post("/registration", async (req, res) => {
  try {
    const existingUser = await User.findOne({ email: req.body.email });

    if (existingUser) {
      // If the email already exists, send a message indicating it
      return res.status(400).json({ message: "Account with this email already exists" });
    }

    // If the email doesn't exist, proceed to create a new user
    const password = req.body.password;
    const saltRounds = 10;
    const gensalt = await bcrypt.genSalt(saltRounds);
    const hashedpass = await bcrypt.hash(password, gensalt);

    const newuser = await User.create({
      email: req.body.email,
      password: hashedpass,
      name: req.body.name,
      favouritemovie: req.body.favouritemovie,
    });

    const mailOptions = {
      from: "shuvajit.motog@gmail.com",
      to: req.body.email,
      subject: "Account Created",
      text: `Hello ${req.body.name},\n\nYour account has been successfully created.`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error.message);
        // Handle email sending error here
      } else {
        console.log(`Email sent: ${info.response}`);
        // Handle email sent successfully here
      }
    });

    res.json(`${newuser.name}'s account successfully created`);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: error.message });
  }
});

// app.post("/registration", async (req, res) => {
//   console.log("hi");
//   const password = req.body.password;
//   console.log(password);
//   const saltRounds = 10;
//   const gensalt = await bcrypt.genSalt(saltRounds);

//   const hashedpass = await bcrypt.hash(password, gensalt);

//   try {
//     const newuser = await User.create({
//       email: req.body.email,
//       password: hashedpass,
//       name: req.body.name,
//       favouritemovie: req.body.favouritemovie,
//     });

//     const mailOptions = {
//       from: "shuvajit.motog@gmail.com",
//       to: req.body.email,
//       subject: "Account Created",
//       text: `Hello ${req.body.name},\n\nYour account has been successfully created.`,
//     };

//     transporter.sendMail(mailOptions, (error, info) => {
//       if (error) {
//         console.error(error.message);
//         // Handle email sending error here
//       } else {
//         console.log(`Email sent: ${info.response}`);
//         // Handle email sent successfully here
//       }
//     });

//     res.json(`${newuser.name}'s Successfully Created`);
//   } catch (error) {
//     console.error(error.message);
//     res.status(500).json({ error: error.message });
//   }
// });
app.post("/login", async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const userExists = await User.findOne({ email: email });
  //
  if (!userExists) {
    return res.status(404).send("INVALID,USER DOES NOT EXIST");
  }
  const hash = userExists.password;
  // console.log(hash);
  try {
    const comparePassword = await bcrypt.compare(password, hash);

    if (!comparePassword) {
      return res.status(404).send("INVALID, PASSWORD DOES NOT MATCH");
    }

    const token = jwt.sign({ userId: userExists.id }, secretKey, {
      expiresIn: "1h",
    });

    // Set the token as a cookie with httpOnly flag
    // Set the token as a cookie with httpOnly, sameSite, and secure flags
    res.cookie("authToken", token, {
      path: "/user/info",
      httpOnly: true,
      SameSite: "None",
      secure: true,
      // Allow cross-origin requests
      // Set to true in a production environment with HTTPS
      // Other cookie options like 'maxAge' can be added here
    });

    res.json({ user: userExists });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});
app.get("/user/info", verify, async (req, res, next) => {
  // You can access the user ID from req.userId (set in the verify middleware)
  const userId = req.userId;

  // Now, you can fetch the user's information from your database using the userId
  try {
    const user = await User.findById(userId); // Replace with your actual database query
    if (!user) {
      return res.status(404).send("User not found");
    }

    // Return the user information
    res.json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});
app.put("/user/password", async (req, res) => {
  const { newPassword } = req.body;
  const userId = req.user._id; // Assuming you have authenticated the user and their ID is available in req.user

  try {
    // Find the user by ID
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update the password
    user.password = newPassword;
    await user.save();

    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    console.error("Error updating password:", error);
    res.status(500).json({ message: "Failed to update password" });
  }
});
app.post("/user/logout", (req, res) => {
  console.log("Logging out user...");
  res.clearCookie(
    "authToken",
    {
      path: "/user/info",
    },
    (err) => {
      if (err) {
        console.error("Clearing cookie error:", err);
      } else {
        console.log("Cookie cleared successfully.");
      }
    }
  );
  res.send("Logged out successfully");
});

const apiurls = [
  {
    url: "https://newsdata.io/api/1/news?apikey=pub_2888738f7dd4d2075e51b97d48f880656eaf5&language=en&q=cricket&image=1&full_content=1",
    category: "cricket",
  },
  {
    url: "https://newsdata.io/api/1/news?apikey=pub_28956187bcb87f197310813c217ba8cea889c&language=bn&image=1&full_content=1",
    category: null,
  },
  {
    url: "https://newsdata.io/api/1/news?apikey=pub_2893453d4a99e585ee8038e6244c855a1cf04&qInMeta=ISRO OR NASA OR SpaceX OR ASTEROID OR ARTEMIS OR SUN OR MOON OR space mission&language=en&image=1&full_content=1",
    category: "Astronomy",
  },
  {
    url: "https://newsdata.io/api/1/news?apikey=pub_296443053d14ec591bf03fd7cc84d28a41432&language=en&country=in&category=entertainment&image=1&full_content=1",
    category: "Entertainment",
  },
  {
    url: "https://newsdata.io/api/1/news?apikey=pub_296468d716b81249527b819e54dafb4efc848&country=in&language=en&image=1&full_content=1&q=sports",
    category: "sports",
  },
  {
    url: "https://newsdata.io/api/1/news?apikey=pub_29645a91e9a5f733b67b5ce588c1047a3f959&category=politics&country=in&image=1&full_content=1",
    category: "politics",
  },
  {
    url: "https://newsdata.io/api/1/news?apikey=pub_2964742df1788531de64fb7a41a884f2a54c0&language=en&q=football OR Messi OR ronaldo OR Neymar&image=1&full_content=1",
    category: "football",
  },
  {
    url: "https://newsdata.io/api/1/news?apikey=pub_2981819a639f3b99ffaa71fd3b98b3989d637&language=en&category=technology&image=1&full_content=1",
    category: "technology", //riya
  },
  {
    url: "https://newsdata.io/api/1/news?apikey=pub_2991137a88d27edcdecc02ba8e9d6b87930fc&language=en&category=health&image=1&full_content=1",
    category: "health", //gorai
  },
  {
    url: "https://newsdata.io/api/1/news?apikey=pub_30003a546b18ae4efb010de568a3fadd1139d&language=en&category=politics&image=1&full_content=1",
    category: "politics", //visionthenews
  },
  {
    url: "https://newsdata.io/api/1/news?apikey=pub_3272619875044a7f5e323daa5954b270848a5&category=world&language=en&image=1&full_content=1",
    category: "headlines", //karmakarshuvajit1502
  },
];

app.get("/fetch-and-save-datas", async (req, res) => {
  try {
    for (const apiurl of apiurls) {
      try {
        console.log(
          `Fetching and saving data for category: ${apiurl.category}`
        );
        await fetchAndSaveData(0, apiurl.url, apiurl.category);
        console.log(`Data saved for category: ${apiurl.category}`);
      } catch (error) {
        console.error(
          `Error fetching and saving data for category ${apiurl.category}:`,
          error
        );
        if (error.response && error.response.status === 429) {
          console.log(
            `Rate Limit Exceeded for category: ${apiurl.category}. Skipping...`
          );
        }
      }
    }

    res.json({ message: "All pages fetched and saved successfully" });
  } catch (error) {
    console.error("Error fetching and saving data:", error);
    res.status(500).json({ error: "An error occurred" });
  }
});

//chatgpt///

// Add this route to your Express.js app
app.get("/get-news-datas", async (req, res) => {
  try {
    // Retrieve news data from the MongoDB database
    const newsData = await Article.find(); // Assuming your Mongoose model is named 'Article'

    res.json(newsData);
  } catch (error) {
    console.error("Error fetching news data:", error);
    res.status(500).json({ error: "An error occurred" });
  }
});

app.get("/get-bengali", async (req, res) => {
  try {
    // Start fetching and saving data from page 1
    // await fetchAndSaveData(0, "https://newsdata.io/api/1/news?apikey=pub_2893453d4a99e585ee8038e6244c855a1cf04&language=bn&image=1&full_content=1");

    // Retrieve news data from the MongoDB database
    const newsData = await Article.find({ language: "bengali" }).sort({
      pubDate: -1,
    }); // Filter by both category and language

    // Send the news data as a JSON response
    res.json(newsData);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "An error occurred" });
  }
});

app.get("/get-health", async (req, res) => {
  try {
    // Retrieve news data from the MongoDB database
    const newsData = await Article.find({ category: "health" }).sort({
      pubDate: -1,
    }); // Filter by both category and language

    res.json(newsData);
  } catch (error) {
    console.error("Error fetching news data:", error);
    res.status(500).json({ error: "An error occurred" });
  }
});

app.get("/get-headlines", async (req, res) => {
  try {
    // Retrieve news data from the MongoDB database, limiting to 6 articles
    const newsData = await Article.find({ category: "headlines" })
      .sort({ pubDate: -1 }); // Sort by publication date in descending order
       // Limit the number of articles to 6

    res.json(newsData);
  } catch (error) {
    console.error("Error fetching news data:", error);
    res.status(500).json({ error: "An error occurred" });
  }
});

app.get("/get-entertainemnt", async (req, res) => {
  try {
    // Retrieve news data from the MongoDB database
    const newsData = await Article.find({
      category: "Entertainment",
      language: "english",
    }).sort({
      pubDate: -1,
    }); // Filter by both category and language

    res.json(newsData);
  } catch (error) {
    console.error("Error fetching news data:", error);
    res.status(500).json({ error: "An error occurred" });
  }
});
app.get("/get-sports", async (req, res) => {
  try {
    // Retrieve news data from the MongoDB database
    const newsData = await Article.find({
      category: "sports",
      language: "english",
    }).sort({
      pubDate: -1,
    }); // Filter by both category and language

    res.json(newsData);
  } catch (error) {
    console.error("Error fetching news data:", error);
    res.status(500).json({ error: "An error occurred" });
  }
});
app.get("/get-cricket", async (req, res) => {
  try {
    // Retrieve news data from the MongoDB database
    const newsData = await Article.find({
      category: "cricket",
      language: "english",
    }).sort({
      pubDate: -1,
    }); // Filter by both category and language

    res.json(newsData);
  } catch (error) {
    console.error("Error fetching news data:", error);
    res.status(500).json({ error: "An error occurred" });
  }
});
app.get("/get-politics", async (req, res) => {
  try {
    // Define an array of languages to filter by
    // const languages = ["english", "hindi", "bengali"];

    // Retrieve news data from the MongoDB database
    const newsData = await Article.find({
      category: "politics",
      // Use $in to match multiple values
    }).sort({
      pubDate: -1,
    });

    res.json(newsData);
  } catch (error) {
    console.error("Error fetching news data:", error);
    res.status(500).json({ error: "An error occurred" });
  }
});

app.get("/get-football", async (req, res) => {
  try {
    // Retrieve news data from the MongoDB database
    const newsData = await Article.find({
      category: "football",
      language: "english",
    }).sort({
      pubDate: -1,
    }); // Filter by both category and language

    res.json(newsData);
  } catch (error) {
    console.error("Error fetching news data:", error);
    res.status(500).json({ error: "An error occurred" });
  }
});
app.get("/get-tech", async (req, res) => {
  try {
    // Retrieve news data from the MongoDB database
    const newsData = await Article.find({
      category: "technology",
      language: "english",
    }).sort({ pubDate: -1 }); // Filter by both category and language

    res.json(newsData);
  } catch (error) {
    console.error("Error fetching news data:", error);
    res.status(500).json({ error: "An error occurred" });
  }
});
app.get("/get-top", async (req, res) => {
  try {
    // Retrieve news data from the MongoDB database
    const newsData = await Article.find({ category: "top" }).sort({
      pubDate: -1,
    }); // Filter by both category and language

    res.json(newsData);
  } catch (error) {
    console.error("Error fetching news data:", error);
    res.status(500).json({ error: "An error occurred" });
  }
});
// const generateUniqueArticleId = async () => {
//   let articleId;
//   let existingArticle; // Declare existingArticle outside the loop
//   do {
//     articleId = Math.random().toString(36).substring(7);
//     existingArticle = await Article.findOne({ article_id: articleId }); // Use article_id for querying
//   } while (existingArticle);
//   return articleId;
// };

app.get("/fetch-astronomy", async (req, res) => {
  try {
    // Retrieve news data from the MongoDB database
    const url =
      "https://api.nasa.gov/planetary/apod?api_key=DCzrOBm5L1XwULLQQCt4A318hnN8QI1ZnVsrCtza";
    const response = await axios.get(url);
    const data = await response.data;
    const articleId = await generateUniqueArticleId();
    const astro = await Article.create({
      article_id: articleId,
      category: "Picoftheday",
      content: data.explanation,
      title: data.title,
      image_url: data.hdurl,
      pubDate: data.date,
    });
    res.json(astro);
  } catch (error) {
    console.error("Error fetching news data:", error);
    res.status(500).json({ error: "An error occurred" });
  }
});
// app.get("/get-astro", async (req, res) => {
//   try {
//     // Retrieve news data from the MongoDB database
//     const newsData = await Article.find({ category: "Astronomy",language:'english' }).sort({
//       pubDate: -1,
//     }); // Filter by both category and language

//     res.json(newsData);
//   } catch (error) {
//     console.error("Error fetching news data:", error);
//     res.status(500).json({ error: "An error occurred" });
//   }
// });
app.get("/get-astro", async (req, res) => {
  try {
    // Define an array of keywords to search for
    const keywords = [
      "nasa",
      "spacex",
      "space mission",
      "artemis",
      "isro",
      "jaxa",
      "roscosmos"
    ];

    // Construct a regular expression pattern to match any of the keywords
    const regexPattern = new RegExp(keywords.join("|"), "i");

    // Retrieve news data from the MongoDB database
    const newsData = await Article.find({
      $and: [
        { category: "Astronomy" },
        { language: 'english' },
        { $or: [{ title: regexPattern }, { description: regexPattern }] }
      ]
    }).sort({ pubDate: -1 });

    res.json(newsData);
  } catch (error) {
    console.error("Error fetching news data:", error);
    res.status(500).json({ error: "An error occurred" });
  }
});

// Assuming you have already set up your Express app and MongoDB connection

// Add a new route to fetch an individual article by article_id
app.get("/article/:articleId", async (req, res) => {
  try {
    const articleId = req.params.articleId;

    // Use Mongoose to find the article by article_id
    const article = await Article.findOne({ article_id: articleId });

    if (!article) {
      // If no article is found, send a 404 response
      return res.status(404).json({ error: "Article not found" });
    }

    // Send the found article as a JSON response
    res.json(article);
  } catch (error) {
    console.error("Error fetching article:", error);
    res.status(500).json({ error: "An error occurred" });
  }
});

// Other routes and middleware...

app.listen(4000, () => {
  console.log("Connected to port 4000 successfully");
});

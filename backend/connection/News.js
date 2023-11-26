const mongoose = require("mongoose");
const url = "mongodb://127.0.0.1:27017/vision";
const Article = require("../model/Data");

const mongoconnect = async () => {
  try {
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
    await assignUniqueIdsToDuplicates();
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};
//unique article id::
const assignUniqueIdsToDuplicates = async () => {
  try {
    // Find and group duplicate articles by article_id
    const duplicateArticles = await Article.aggregate([
      {
        $group: {
          _id: { article_id: "$article_id" },
          uniqueIds: { $addToSet: "$_id" },
          count: { $sum: 1 },
        },
      },
      {
        $match: {
          count: { $gt: 1 },
        },
      },
    ]);

    for (const group of duplicateArticles) {
      const { uniqueIds } = group;

      // Assign a unique identifier to each duplicate within the group
      for (let i = 0; i < uniqueIds.length; i++) {
        const uniqueId = `${group._id.article_id}_${i}`;
        const articleIdToUpdate = uniqueIds[i];

        // Update the article with the new unique identifier
        await Article.findByIdAndUpdate(
          articleIdToUpdate,
          { article_id: uniqueId },
          { new: true }
        );

        console.log(`Updated article_id: ${uniqueId}`);
      }
    }

    console.log("Unique identifiers assigned to duplicates successfully");
  } catch (error) {
    console.error("Error assigning unique identifiers to duplicates:", error);
  }
};
module.exports = mongoconnect;

// Add your code to remove duplicates here
// await removeDuplicates();

// Close the MongoDB connection when done
// mongoose.connection.close();

// const removeDuplicates = async () => {
//   try {
//     const cursor = Article.aggregate([
//       {
//         $group: {
//           _id: { title: "$title" },
//           uniqueIds: { $addToSet: "$_id" },
//           count: { $sum: 1 },
//         },
//       },
//       {
//         $match: {
//           count: { $gt: 1 },
//         },
//       },
//     ]);

//     // Execute the cursor and retrieve the results using .exec()
//     const result = await cursor.exec();

//     for (const group of result) {
//       const { uniqueIds } = group;
//       // Keep one of the uniqueIds and remove the rest
//       const idsToKeep = uniqueIds.slice(0, 1); // Keep the first one, change as needed
//       const idsToRemove = uniqueIds.slice(1);

//       await Article.deleteMany({ _id: { $in: idsToRemove } });
//       console.log(
//         `Removed ${idsToRemove.length} duplicates for title: ${group._id.title}`
//       );
//     }

//     console.log("Duplicates removed successfully");
//   } catch (error) {
//     console.error("Error removing duplicates:", error);
//   }
// };

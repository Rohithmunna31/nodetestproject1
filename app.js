// app.js
const express = require("express");
const app = express();
const port = 3000;
const { sequelize } = require("./database");
const Post = require("./models/Post");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.get("/addpost", async (req, res) => {
  try {
    const allPosts = await Post.findAll();

    let postsHTML = "<h1>All Posts</h1>";
    allPosts.forEach((post) => {
      postsHTML += `<div>
        <h3>Post Link:</h3>
        <p>${post.postLink}</p>
        <h3>Post Description:</h3>
        <p>${post.postDescription}</p>
      </div>`;
    });

    res.send(`
      ${postsHTML}
      <h1>Create Post</h1>
      <form id="addPostForm" action="/addpost" method="post">
        <label for="postLink">Post Link:</label>
        <input type="text" id="postLink" name="postLink" required>

        <label for="postDescription">Post Description:</label>
        <textarea id="postDescription" name="postDescription" required></textarea>

        <button type="submit">Submit</button>
      </form>
    `);
  } catch (error) {
    console.error("Error retrieving posts:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/addpost", async (req, res) => {
  const { postLink, postDescription } = req.body;

  try {
    const newPost = await Post.create({
      postLink,
      postDescription,
    });

    res.redirect("/addpost");
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/getposts", async (req, res) => {
  try {
    const allPosts = await Post.findAll();
    res.json(allPosts);
  } catch (error) {
    console.error("Error retrieving posts:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

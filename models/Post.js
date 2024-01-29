// models/Post.js
const { DataTypes } = require("sequelize");
const { sequelize } = require("../database");

const Post = sequelize.define("Post", {
  postLink: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  postDescription: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

module.exports = Post;

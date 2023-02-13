//const { modelNames } = require('mongoose')
const _ = require("lodash");

const dummy = (blogs) => {
  // XD
  if (blogs) {
    return 1;
  }
  return 1;
};

const totalLikes = (blogs) => {
  const summer = (sum, likes) => {
    return sum + likes;
  };

  return blogs.map((blog) => blog.likes).reduce(summer, 0);
};

const favoriteBlog = (blogs) => {
  let fav = null;
  let favLikes = -1;
  blogs.forEach((blog) => {
    if (blog.likes > favLikes) {
      fav = blog;
      favLikes = blog.likes;
    }
  });

  return fav;
};

const mostBlogs = (blogs) => {
  const counts = new Map();
  let candidate;
  let candidateBlogs = 0;

  blogs.forEach((blog) => {
    const author = blog.author;
    if (counts.has(author)) {
      const newCount = counts.get(author) + 1;
      counts.set(author, newCount);
    } else {
      counts.set(author, 1);
    }

    if (counts.get(author) > candidateBlogs) {
      candidate = author;
      candidateBlogs = counts.get(author);
    }
  });

  return { author: candidate, blogs: candidateBlogs };
};

const mostLikes = (blogs) => {
  const likesMap = new Map();
  let candidate;
  let candidateLikes = 0;

  blogs.forEach((blog) => {
    const author = blog.author;
    const currentLikes = blog.likes;

    if (likesMap.has(author)) {
      const newLikes = likesMap.get(author) + currentLikes;
      likesMap.set(author, newLikes);
    } else {
      likesMap.set(author, currentLikes);
    }

    if (likesMap.get(author) > candidateLikes) {
      candidate = author;
      candidateLikes = likesMap.get(author);
    }
  });

  return { author: candidate, likes: candidateLikes };
};

const ldMostLikes = (blogs) => {
  // Group blogs by author
  const grouped = _.groupBy(blogs, "author");
  const authors = Object.keys(grouped); // <- uh? Maybe a nicer way?
  // Compute total likes per author
  const authorLikes = authors.map((author) => {
    const authorBlogs = grouped[author];
    const totalLikes = authorBlogs
      .map((blog) => blog.likes)
      .reduce((sum, n) => sum + n, 0);
    return { author: author, likes: totalLikes };
  });
  return _.maxBy(authorLikes, "likes");
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
  ldMostLikes,
};

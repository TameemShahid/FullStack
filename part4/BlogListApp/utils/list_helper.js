const lodash = require("lodash");

const dummy = (blogsArray) => {
  return 1;
};

const totalLikes = (blogArray) => {
  const reducer = (sum, item) => {
    return sum + item.likes;
  };

  return blogArray.reduce(reducer, 0);
};

const favoriteBlog = (blogsArray) => {
  if (blogsArray.length === 0) {
    return {};
  } else {
    let mostLiked = blogsArray[0];

    blogsArray.forEach((blog) => {
      mostLiked = mostLiked.likes < blog.likes ? blog : mostLiked;
    });

    return mostLiked;
  }
};

const mostBlogs = (blogsArray) => {
  if (blogsArray.length === 0) {
    return {};
  } else {
    // Using the Lodash library to count the number of authors
    // Using the "countBy" function, the first parameter takes an array
    // in second parameter we provide property of an object in array to countBy
    // The result is recieved in the from of key value in an object like so:
    // {"Johnny" : 1, "Anderson":2 , "Hathem":1}
    const authors = lodash.countBy(blogsArray, lodash.iteratee("author"));

    // Since the output of countBy is an object we need to store in a more
    // structured object such as : {author: "Anderson", blogs: 2}
    // For that purpose we use the Lodash forEach function that iterates over
    // each key of on object.
    const result = [];
    lodash.forEach(authors, (value, key) => {
      result.push({ author: key, blogs: value });
    });

    // Now result array contains all the structured objects, we just need to
    // find the one with most blogs. We use the Lodash "maxBy" function that takes
    // in an array and iteratee paramter which will be the property by which
    // we need to find the maximum
    return lodash.maxBy(result, "blogs");
  }
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
};

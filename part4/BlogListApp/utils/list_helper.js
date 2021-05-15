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

const mostLikes = (blogsArray) => {
  if (blogsArray.length === 0) {
    return {};
  } else {
    // We use lodash library "groupBy" to group all the blog entries under
    // single author array. We will get a result in the form of
    // {'Author Name' : [...blogObjs]}
    const authors = lodash.groupBy(blogsArray, "author");

    // To get the authors and their blogs object in a more structured manner
    // we use "forEach" method of lodash lib. We get the resultant array in the
    // form : [ {author : "Tameem", blogs : [ {blogObj1}, {blogObj2} ] } ]
    const authorsArray = [];
    lodash.forEach(authors, (value, key) => {
      authorsArray.push({ author: key, blogs: value });
    });

    const reducer = (sum, item) => {
      return sum + item.likes;
    };

    // To find the author with the most number of likes over all of his blogs,
    // we need to iterate through each of his/her blog and the number of likes.
    // We again use lodash "forEach" to iterate over each author object, now
    // each author object has "blogs" property that contains all of his/her
    // written blogs, we use reduce function to get total likes and make an obj
    // {author: "Tameem", likes : 137} , and save it in result array.
    // Now we simply use "maxBy" function of lodash on result to get highest liked
    // author
    const result = [];
    lodash.forEach(authorsArray, (value) => {
      const sum = value.blogs.reduce(reducer, 0);
      result.push({ author: value.author, likes: sum });
    });
    const x = lodash.maxBy(result, (value) => {
      return value.likes;
    });
    return x;
  }
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};

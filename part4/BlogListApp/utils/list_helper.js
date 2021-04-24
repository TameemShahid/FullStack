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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
};

const dummy = (blogsArray) => {
  return 1;
};

const totalLikes = (blogArray) => {
  const reducer = (sum, item) => {
    return sum + item.likes;
  };

  return blogArray.reduce(reducer, 0);
};

module.exports = {
  dummy,
  totalLikes,
};

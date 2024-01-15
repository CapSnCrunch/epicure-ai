const kebabCaseToLowerCaseWithSpaces = (str) => {
    return str
      .trim()
      .replace(/-/g, ' ') // Replace hyphens with spaces
      .toLowerCase(); // Convert to lowercase
};

module.exports = {
  kebabCaseToLowerCaseWithSpaces
};
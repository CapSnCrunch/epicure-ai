export const stringToKebabCase = (str) => {
    return str
        .trim()
        .replace(/\s+/g, '-') // Replace spaces with '-'
        .replace(/[^\w\s\\-]/g, '') // Remove special characters
        .replace(/([a-z])([A-Z])/g, '$1-$2') // Insert '-' between lower & upper case letters
        .toLowerCase(); // Convert to lowercase
};

export const kebabCaseToLowerCaseWithSpaces = (str) => {
    return str
      .trim()
      .replace(/-/g, ' ') // Replace hyphens with spaces
      .toLowerCase(); // Convert to lowercase
  };
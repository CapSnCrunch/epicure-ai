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

export const extractSentences = (str, sentenceCount) => {
    const sentences = str.split('.').map(sentence => sentence.trim()).filter(sentence => sentence.length > 0);
    const firstNSentences = sentences.slice(0, sentenceCount);
    return firstNSentences.join('. ') + '.';
};

export const splitSentences = (str) => {
    const sentences = str.split('.').map(sentence => sentence.trim()).filter(sentence => sentence.length > 0);
  
    // Calculate the midpoint to split the sentences into two parts
    const midpoint = Math.ceil(sentences.length / 2);
  
    // Split the sentences into two parts
    const part1 = sentences.slice(0, midpoint);
    const part2 = sentences.slice(midpoint);
  
    // Join the parts and add a period to the end of each part
    const result = [part1.join('. ') + '.', part2.join('. ') + '.'];
  
    return result;
};

export const splitAroundFirstPeriodOrComma = (str) => {
    const indexOfFirstPeriod = str.indexOf('.');
    const indexOfFirstComma = str.indexOf(',');
  
    if (indexOfFirstPeriod !== -1 && indexOfFirstComma !== -1) {
      // If both period and comma exist, choose the earlier one
      const splitIndex = Math.min(indexOfFirstPeriod, indexOfFirstComma);
      const beforeSplit = str.substring(0, splitIndex);
      const afterSplit = str.substring(splitIndex + 1);
      return [beforeSplit, afterSplit];

    } else if (indexOfFirstPeriod !== -1) {
      // If only period exists
      const beforePeriod = str.substring(0, indexOfFirstPeriod);
      const afterPeriod = str.substring(indexOfFirstPeriod + 1);
      return [beforePeriod, afterPeriod];
      
    } else if (indexOfFirstComma !== -1) {
      // If only comma exists
      const beforeComma = str.substring(0, indexOfFirstComma);
      const afterComma = str.substring(indexOfFirstComma + 1);
      return [beforeComma, afterComma];
    }
  
    // If neither period nor comma exists
    return [str];
  };
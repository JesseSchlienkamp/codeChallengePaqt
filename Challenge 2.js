function splitArrayIntoChunks(array, chunkSize) {
    const result = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      result.push(array.slice(i, i + chunkSize));
    }
    return result;
  }
  
  // Example usage
  const exampleArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const chunkSize = 3;
  const chunkedArray = splitArrayIntoChunks(exampleArray, chunkSize);
  
  console.log(chunkedArray);
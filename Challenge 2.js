function splitArrayIntoChunks(array, chunkSize) {

    // Array of array voor de chunks 
    const result = [];

    // Loop door de array en voeg chunks toe aan de result array.
    // Een chunk wordt automatisch gemaakt door de slice functie. 
    // Dus output is een [[]]
    for (let i = 0; i < array.length; i += chunkSize) {
      result.push(array.slice(i, i + chunkSize));
    }
    return result;
  }
  
  const exampleArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const chunkSize = 3;
  const chunkedArray = splitArrayIntoChunks(exampleArray, chunkSize);
  
  console.log(chunkedArray);
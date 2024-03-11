function fizzBuzz(limit) {
    for (let i = 1; i <= limit; i++) {
      let output = '';

      if (i % 3 === 0 || i % 5 === 0) output += i + ' ';
      
      if (i % 3 === 0) output += 'Fizz';
      if (i % 5 === 0) output += 'Buzz';
      console.log(output || i);
    }
  }

  let n = fizzBuzz(100);
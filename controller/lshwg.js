// function generateNumericId() {
//   const min = 1000000; // Minimum 7-digit value
//   const max = 9999999; // Maximum 7-digit value

//   const randomId = Math.floor(Math.random() * (max - min + 1) + min);
//   return randomId.toString();
// }
const min = 1000000; // Minimum 7-digit value
const max = 9999999; // Maximum 7-digit value

const randomId = Math.floor(Math.random() * (max - min + 1) + min);

// const numericId = generateNumericId();
console.log(randomId.toString());

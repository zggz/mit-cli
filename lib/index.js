console.log(process.argv.slice(2));
console.log(process.cwd());

const arg = process.argv.slice(2)
const numbers = arg.map(num => {
  return Number.isNaN(Number(num)) ? 0 : Number(num)
})
const sum = (a, b) => a + b

console.log(sum(...numbers));
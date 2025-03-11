
//user code here 

const input = require('fs').readFileSync('/dev/stdin', 'utf-8').trim().split('\n').join(' ').split(' ');
const arr_size = parseInt(input.shift());
const arr = input.splice(0, arr_size).map(Number);
const result = sum(arr);
console.log(result);
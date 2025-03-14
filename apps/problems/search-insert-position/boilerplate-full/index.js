
//user code here 

const input = require('fs').readFileSync('/dev/stdin', 'utf-8').trim().split('\n').join(' ').split(' ');
const nums_size = parseInt(input.shift());
const nums = input.splice(0, nums_size).map(Number);
const target = parseInt(input.shift());
const result = SearchInsertPosition(nums, target);
console.log(result);
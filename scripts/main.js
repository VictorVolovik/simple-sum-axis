// prerequisite arrays
var firstTermArray = [6, 7, 8, 9];
var secondTermArray = [];
var sumArray = [11, 12, 13, 14];

for (
  var i = sumArray[0] - firstTermArray[firstTermArray.length - 1]; i < (sumArray[sumArray.length - 1] - firstTermArray[0]); i++
) {
  secondTermArray.push(i);
}

var firstTerm;
var secondTerm;
var sumOfTerms = firstTerm + secondTerm;

var firstTermPre = $('#first-term-pre');
var secondTermPre = $('#second-term-pre');
var sum = $('#sum');

var randomTerm = function (array) {
  return array[Math.floor(Math.random() * array.length)];
};

//
var generateTerms = function () {
  do {
    firstTerm = randomTerm(firstTermArray);
    secondTerm = randomTerm(secondTermArray);
    console.log(firstTerm);
    console.log(secondTerm);
  } while ((firstTerm + secondTerm) < sumArray[0] || (firstTerm + secondTerm) > sumArray[sumArray.length - 1]);
};

var renderTerms = function (a, b) {
  firstTermPre.text(a);
  secondTermPre.text(b);
};

$(document).ready(function () {
  generateTerms();
  renderTerms(firstTerm, secondTerm);
});

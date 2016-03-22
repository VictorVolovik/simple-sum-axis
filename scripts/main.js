// prerequisite arrays
var firstTermArray = [6, 7, 8, 9];
var secondTermArray = [];
var sumArray = [11, 12, 13, 14];

// filling second term array accordingly
for (
  var i = sumArray[0] - firstTermArray[firstTermArray.length - 1]; i < (sumArray[sumArray.length - 1] - firstTermArray[0]); i++
) {
  secondTermArray.push(i);
}

// creating variables for terms and sum
var firstTerm;
var secondTerm;
var sumOfTerms;

// saving selectors to variables
var firstTermPre = $('#first-term-pre');
var secondTermPre = $('#second-term-pre');
var firstTermVisual = $('.first-term-visual');
var secondTermVisual = $('.second-term-visual');
var firstTermInput = $('#first-term');
var secondTermInput = $('#second-term');
var sumInput = $('#sum');

// random term helper function
var randomTerm = function (array) {
  return array[Math.floor(Math.random() * array.length)];
};

// generating random terms and saving their sum
var generateTerms = function () {
  do {
    firstTerm = randomTerm(firstTermArray);
    secondTerm = randomTerm(secondTermArray);
    console.log(firstTerm);
    console.log(secondTerm);
  } while ((firstTerm + secondTerm) < sumArray[0] || (firstTerm + secondTerm) > sumArray[sumArray.length - 1]);
  return sumOfTerms = firstTerm + secondTerm;
};

// render generated terms to prerequisite spans
var renderTerms = function (a, b) {
  firstTermPre.text(a);
  secondTermPre.text(b);
};

// evaluate visual rulers according to values of terms
var calculateVisual = function () {
  var firstCurrentWidth = 20 * firstTerm;
  var firstCurrentHeight = firstCurrentWidth / 2;
  firstTermVisual.css({'width': firstCurrentWidth + 'px'});
  firstTermVisual.find('.ruler').css({
    'width': firstCurrentWidth + 'px',
    'height': firstCurrentHeight + 'px',
    'border-radius': firstCurrentWidth + 'px ' + firstCurrentWidth + 'px 0 0'
  });

  var secondCurrentWidth = 20 * secondTerm;
  var secondCurrentHeight = secondCurrentWidth / 2;
  secondTermVisual.css({'width': secondCurrentWidth + 'px'});
  secondTermVisual.find('.ruler').css({
    'width': secondCurrentWidth + 'px',
    'height': secondCurrentHeight + 'px',
    'border-radius': secondCurrentWidth + 'px ' + secondCurrentWidth + 'px 0 0'
  });
};

$(document).ready(function () {
  generateTerms();
  renderTerms(firstTerm, secondTerm);
  calculateVisual();

  // checking for mousemove to focus on 1st input
  $(document).on('mousemove', function () {
    firstTermVisual.addClass('shown');
    if(!$(firstTermInput).prop('disabled')) {
      firstTermVisual.find('input').focus();
    }
  });

  // validation of 1st input and moving to 2nd
  $(firstTermInput).on('keyup', function () {
    if(+$(this).val() !== firstTerm) {
      firstTermPre.addClass('highlight');
      $(this).addClass('invalid');
    } else {
      firstTermPre.removeClass('highlight');
      $(this).removeClass('invalid');
      $(this).addClass('noborder');
      $(this).prop('disabled', true);
      secondTermVisual.addClass('shown').find('input').focus();
    }
  });

  // validation of 2st input and moving to sum
  $(secondTermInput).on('keyup', function () {
    if(+$(this).val() !== secondTerm) {
      secondTermPre.addClass('highlight');
      $(this).addClass('invalid');
    } else {
      secondTermPre.removeClass('highlight');
      $(this).removeClass('invalid');
      $(this).addClass('noborder');
      $(this).prop('disabled', true);
      $('#sum').prop('disabled', false).removeClass('noborder').val('').focus();
    }
  });

  // validation of sum input
  $(sumInput).on('keyup', function () {
    if(+$(this).val() !== sumOfTerms) {
      $(this).addClass('invalid');
    } else {
      $(this).removeClass('invalid');
      $(this).addClass('noborder');
      $(this).prop('disabled', true);
    }
  });
});

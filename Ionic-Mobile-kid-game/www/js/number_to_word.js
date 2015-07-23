var th = ['', 'thousand', 'million', 'billion', 'trillion', 'quadrillion'];
// 0~9
var singleNumber = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
// 10~19
var tenPlus = ['ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
// 20~90
var tens = ['twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];

function num2word(str) {
  str = str.toString()
       .replace(/[\, ]/g, '');

  if (str != parseFloat(str)) {
        return 'not a number';
  }

  var strLength = str.indexOf('.');
  if (strLength == -1) {
        strLength = str.length;
  }

  var n = str.split('');
  var result = '';
  var skip = 0;
  for (var i = 0; i < strLength; i++) {

    if ((strLength - i) % 3 == 2) {
      if (n[i] == '1') {
        result += tenPlus[Number(n[i + 1])] + ' ';
        i++;
        skip = 1;
            } else if (n[i] != 0) {
                result += tens[n[i] - 2] + ' ';
        skip = 1;
      }
        } else if (n[i] != 0) {
      result += singleNumber[n[i]] + ' ';
            if ((strLength - i) % 3 == 0)
                result += 'hundred ';
      skip = 1;
    }

    if ((strLength - i) % 3 == 1) {
      if (skip) {
        result += th[(strLength - i - 1) / 3] + ' ';
        skip = 0;
      }
    }
  }

  // For decimal
  if (strLength != str.length) {
    var y = str.length;
    result += 'point ';
    for (var i = strLength + 1; i < y; i++)
      result += singleNumber[n[i]] + ' ';
  }

  return capitalize(result.replace(/\s+/g, ' '));
}
function capitalize(s)
{
    return s && s[0].toUpperCase() + s.slice(1);
}

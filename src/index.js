module.exports = function solveSudoku(matrix) {
  preparing(matrix);
//if only one option - add to matrix
  function preparing(matrix) {
    var numberOptions = [];
    for (var i = 0; i < 9; i++) {
      for (var j = 0; j < 9; j++) {
        if (matrix[i][j] == 0) {
          numberOptions.push([i, j, []]);
        }
      }
    }
//try every number to add in matrix
    for (var item of numberOptions) {
      for (var i = 1; i <= 9; i++) {
        if (allNumbers(matrix, item[0], item[1], i))
          item[2].push(i);
      }
    }
    var optionCounter = 0;
    for (var item of numberOptions) {
      var currentCell = item[2];
      if (currentCell.length > 1) {
        optionCounter++;
      } else if (currentCell.length == 1) {
        matrix[item[0]][item[1]] = currentCell[0];
      } //if only one number - it's ok
    }
    if (numberOptions.length == optionCounter) {
      solving(matrix);
      return;
    }
  return preparing(matrix);
}
//check availible combination of numbers; curNumber - current number
function allNumbers(matrix, line, column, curNumber) {
  for (var i = 0; i < 9; i++) {
    if (matrix[line][i] == curNumber || matrix[i][column] == curNumber) {
      return false;
    } //if contains in line or column
  }
var width = 3 * (Math.floor(line / 3));
var height = 3 * (Math.floor(column / 3));
for (var i = 0; i < 3; i++){
  for (var j = 0 ; j < 3; j++){
    if (matrix[i + width][j + height] == curNumber) {
      return false;
    } //if contains in box 3*3
  }
}
return true;
}
//choose one of options for each cell
  function solving(matrix) {
    var numberOptions = [];
    for (var i = 0; i < 9; i++){
      for (var j = 0; j < 9; j++){
        if (matrix[i][j] == 0) {
          numberOptions.push([i, j, []]);
        }
      }
    }
    if (numberOptions.length == 0) {
      return true;
    }
    for (var item of numberOptions) {
      for (var i = 1; i <= 9; i++){
        if (allNumbers(matrix, item[0], item[1], i)) {
          item[2].push(i);
        }
      }
    }
    var first = numberOptions[0];
    for (var i = 1; i < numberOptions.length; i++){
      if (numberOptions[i][2].length < first[2].length) {
        first = numberOptions[i];
      }
    }
    for (var item of first[2]) {
      matrix[first[0]][first[1]] = item;
      var status = solving(matrix);
      if (status) {
        return true;
      }
        else matrix[first[0]][first[1]] = 0;
    }
  return false;
}
      return matrix;
}

module.exports = function solveSudoku(matrix) {
    // your solution
    var fl;
    var k = 0;
    var stack = [];
    var matrixStack = [];
    var flag;

    do {
        fl = false;
        for (var i = 0; i < matrix.length; i++) {
            for (var j = 0; j < matrix[i].length; j++) {
                if (matrix[i][j] === 0 || Array.isArray(matrix[i][j])) {
                    matrix[i][j] = check(matrix, i, j);
                }
            }
        }
        for (var i = 0; i < matrix.length; i++) {
            for (var j = 0; j < matrix[i].length; j++) {
                if (Array.isArray(matrix[i][j]))
                    if (matrix[i][j].length === 1) {
                        matrix[i][j] = matrix[i][j][0];
                        fl = true;
                    }
            }
        }
        if (fl)
            continue;

        for (var i = 0; i < matrix.length; i++) {
            for (var j = 0; j < matrix[i].length; j++)
                if (Array.isArray(matrix[i][j])) {
                    var array;
                    array = matrix[i][j].slice(0, matrix[i][j].length);
                    matrix[i][j] = sub(matrix, array, i, j) || matrix[i][j];
                    if (!Array.isArray(matrix[i][j]))
                        fl = true;
                }
        }

        if(fl)
            continue;

        first:
            for (var i = 0; i < 9; i++) {
                for (var j = 0; j < 9; j++) {
                    if (Array.isArray(matrix[i][j]) || sameCheck(matrix)) {
                        flag = true;
                        if (emptyCheck(matrix) || sameCheck(matrix)) {
                            do {
                                matrix = matrixStack.pop();
                                k = stack.pop();
                                j = stack.pop();
                                i = stack.pop();
                            } while (k === matrix[i][j].length - 1);
                            k++;
                            flag = false;
                        }
                        if(flag)
                            k = 0;
                        var tempMatrix = [];
                        tempMatrix = copy(tempMatrix,matrix);
                        matrix[i][j] = matrix[i][j][k];
                        matrixStack.push(tempMatrix);
                        stack.push(i);
                        stack.push(j);
                        stack.push(k);
                        fl = true;
                        break first;
                    }
                }
            }

    } while (fl);

    return matrix;
}

function sameCheck(matrix) {
    for (let k = 0; k < 9; k++) {
        for (let p = 0; p < 9;p++) {
            if(!Array.isArray(matrix[k][p]))
                for(let kp = p+1; kp < 9; kp++) {
                    if(!Array.isArray(matrix[k][kp])) {
                        if (matrix[k][p] === matrix[k][kp])
                            return true;
                    }
                }
        }
    }

    for (let k = 0; k < 9; k++) {
        for (let p = 0; p < 9;p++) {
            if(!Array.isArray(matrix[p][k]))
                for(let kp = p+1; kp < 9; kp++) {
                    if(!Array.isArray(matrix[kp][k])) {
                        if (matrix[p][k] === matrix[kp][k])
                            return true;
                    }
                }
        }
    }

    return false;
}

function copy(tempMatrix, matrix) {
    for(var q = 0; q < 9; q++) {
        tempMatrix[q] = [];
        for(var t = 0; t < 9; t++) {
            if(Array.isArray(matrix[q][t]))
                tempMatrix[q][t] = matrix[q][t].slice(0, matrix[q][t].length);
            else
                tempMatrix[q][t] = matrix[q][t];
        }
    }

    return tempMatrix;
}

function emptyCheck(matrix) {
    for(var a = 0; a < 9; a++) {
        for (var b = 0; b < 9; b++) {
            if (Array.isArray(matrix[a][b]))
                if (matrix[a][b].length === 0)
                    return true;
        }
    }

    return false;
}

function check(matrix, i, j) {
    var arr = [];
    for (var k = 0; k < 9;k++)
        arr[k] = k+1;

    for(k = 0; k < 9; k++) {
        if(!Array.isArray(matrix[i][k])) {
            if (arr.indexOf(matrix[i][k]) !== -1)
                arr.splice(arr.indexOf(matrix[i][k]), 1);
        }
        if(!Array.isArray(matrix[k][j])) {
            if (arr.indexOf(matrix[k][j]) !== -1)
                arr.splice(arr.indexOf(matrix[k][j]), 1);
        }
    }


    var a,b;

    if(i >= 0 && i <= 2)
        a = 0;
    if(i >= 3 && i <= 5)
        a = 3;
    if(i >= 6 && i <= 8)
        a = 6;

    if(j >= 0 && j <= 2)
        b = 0;
    if(j >= 3 && j <= 5)
        b = 3;
    if(j >= 6 && j <= 8)
        b = 6;

    var k1,p1;

    k1 = a+2;
    p1 = b+2;


    for(var k = a; k <= k1; k++) {
        for(var p = b; p <= p1; p++)
            if(!Array.isArray(matrix[k][p])) {
                if (arr.indexOf(matrix[k][[p]]) !== -1) {
                    arr.splice(arr.indexOf(matrix[k][p]), 1);
                }
            }
    }

    return arr;
}

function contains(arr1, arr2) {
    for(var n in arr2) {
        if(arr1.indexOf(arr2[n]) !== -1) {
            arr1.splice(arr1.indexOf(arr2[n]),1);
            if(arr1.length === 0)
                break;
        }
    }

    return arr1;
}

function sub(matrix, arr, i, j) {
    var firstLength = arr.length;
    var k,p;

    var a,b;

    if(i >= 0 && i <= 2)
        a = 0;
    if(i >= 3 && i <= 5)
        a = 3;
    if(i >= 6 && i <= 8)
        a = 6;

    if(j >= 0 && j <= 2)
        b = 0;
    if(j >= 3 && j <= 5)
        b = 3;
    if(j >= 6 && j <= 8)
        b = 6;

    var k1,p1;

    k1 = a+2;
    p1 = b+2;

    first:
        for(k = a; k <= k1; k++) {
            for(p = b; p <= p1; p++)
                if(Array.isArray(matrix[k][p])) {
                    if(i === k && j === p)
                        continue;
                    if(arr.length === 0)
                        break first;
                    arr = contains(arr, matrix[k][p]);
                }
        }

    if(arr.length === 1)
        return arr[0];
    else if(arr.length === firstLength) {
        return arr;
    }
    else
        return 0;
}
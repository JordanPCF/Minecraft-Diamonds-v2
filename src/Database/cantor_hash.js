// have tested with -4, 11 --> 457 and back
function cantor_pairing(num1, num2) {
    let num1_positive, num2_positive;

    // num1 and num2 may be negative so create variables that 
    // are always positive (needed for cantor function)
    if (num1 < 0) {
        num1_positive = (-2 * num1) - 1;
    } else {
        num1_positive = 2 * num1;
    }

    if (num2 < 0) {
        num2_positive = (-2 * num2) - 1;
    } else {
        num2_positive = 2 * num2;
    }

    var invertible_pair = ((num1_positive + num2_positive) * (num1_positive + num2_positive + 1)) / 2 + num2_positive;

    return invertible_pair;
}

function inverse_cantor(pair) {
    let num1, num2;

    var temp1 = Math.floor((Math.sqrt(8*pair + 1) - 1) / 2);
    var temp2 = (Math.pow(temp1, 2) + temp1) / 2;

    var num2_positive = pair - temp2;
    var num1_positive = temp1 - num2_positive;

    if (num1_positive % 2 === 0) {
        num1 = num1_positive / 2;
    } else {
        num1 = - (num1_positive + 1) / 2
    }

    if (num2_positive % 2 === 0) {
        num2 = num2_positive / 2;
    } else {
        num2 = - (num2_positive + 1) / 2
    }

    return [num1, num2]
}

export { cantor_pairing, inverse_cantor };
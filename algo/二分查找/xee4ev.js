/*
 * Guess the result of a number guessing game.
 * @param {number} num : the given number
 * @param {number} pick : the user's guess
 * @return {number} 0 if the guess is correct, -1 if the guess is too low, and 1 if the guess is too high
 */
function guess(num, pick = 1) {
  if (num === pick) {
    return 0;
  } else if (num < pick) {
    return 1;
  } else {
    return -1;
  }
}

/*
 * 猜数字大小
 * Guess a number between 1 and n.
 * @param {number} n : upper bound
 * @return {number} The guess number
 */

function guessNumber(n) {
  let left = 0;
  let right = n;
  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2);
    if (guess(mid) === 0) {
      return mid;
    } else if (guess(mid) < 0) {
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }
}

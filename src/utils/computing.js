const findLineByLeastSquares = (valuesX, valuesY) => {
  let sumX = 0;
  let sumY = 0;
  let sumXY = 0;
  let summXX = 0;
  let count = 0;

  /*
   * We'll use those letiables for faster read/write access.
   */
  let x = 0;
  let y = 0;
  const valuesLength = valuesX.length;

  if (valuesLength !== valuesY.length) {
    throw new Error('The parameters valuesX and valuesY need to have same size!');
  }

  /*
   * Nothing to do.
   */
  if (valuesLength === 0) {
    return [];
  }

  /*
   * Calculate the sum for each of the parts necessary.
   */
  for (let v = 0; v < valuesLength; v += 1) {
    x = parseInt(valuesX[v], 10);
    y = valuesY[v];
    sumX += x;
    sumY += y;
    summXX += x * x;
    sumXY += x * y;
    count += 1;
  }

  /*
   * Calculate m and b for the formular:
   * y = x * m + b
   */
  const m = (count * sumXY - sumX * sumY) / (count * summXX - sumX * sumX);
  const b = sumY / count - (m * sumX) / count;

  /*
   * We will make the x and y result line now
   */
  const resultValuesX = [];
  const resultValuesY = [];

  for (let v = 0; v < valuesLength; v += 1) {
    x = valuesX[v];
    y = x * m + b;
    resultValuesX.push(x);
    resultValuesY.push(y);
  }

  return resultValuesY;
};

module.exports = { findLineByLeastSquares };

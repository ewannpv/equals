// compute best fit line parameters using the least squares method
const bestFitLine = (valuesX, valuesY) => {
  let sumX = 0;
  let sumY = 0;
  let sumXY = 0;
  let summXX = 0;
  let count = 0;

  if (valuesX.length !== valuesY.length) {
    throw new Error('The parameters valuesX and valuesY need to have same size!');
  }

  /*
   * Nothing to do.
   */
  if (valuesX.length === 0) {
    return {
      a: 0,
      b: 0,
    };
  }

  /*
   * Calculate the sum for each of the parts necessary.
   */
  for (let v = 0; v < valuesX.length; v += 1) {
    const x = valuesX[v];
    const y = valuesY[v];
    sumX += x;
    sumY += y;
    summXX += x * x;
    sumXY += x * y;
    count += 1;
  }

  /*
   * Calculate a and b for the formula:
   * y = ax + b
   */
  console.log(`sumX=${sumX} sumY=${sumY} sumXX=${summXX} sumXY=${sumXY}`);
  const a = (count * sumXY - sumX * sumY) / (count * summXX - sumX * sumX);
  const b = sumY / count - (a * sumX) / count;

  return {
    a,
    b,
  };
};

const getBestFitLineValues = (valuesX, valuesY) => {
  const { a, b } = bestFitLine(valuesX, valuesY);
  const resultValuesY = [];

  for (let v = 0; v < valuesY.length; v += 1) {
    const x = valuesX[v];
    const y = x * a + b;
    resultValuesY.push(y);
  }

  return resultValuesY;
};

const bestFitLineExp = (valuesX, valuesY) => {
  // map values to ln then use standard linear regression
  const valuesYlog = valuesY.map((val) => Math.log(val));
  return bestFitLine(valuesX, valuesYlog);
};

const getBestFitLineExpValues = (valuesX, valuesY) => {
  const { a, b } = bestFitLineExp(valuesX, valuesY);
  const resultValuesY = [];
  for (let v = 0; v < valuesY.length; v += 1) {
    const x = valuesX[v];
    const y = Math.exp(a * x) * Math.exp(b);
    resultValuesY.push(y);
  }

  return resultValuesY;
};

const bestFitLineLog = (valuesX, valuesY) => {
  // map valuesX to ln then use standard linear regression
  const valuesXLog = valuesX.map((val) => Math.log(val));
  console.log(valuesXLog);
  console.log(bestFitLine(valuesXLog, valuesY));
  return bestFitLine(valuesXLog, valuesY);
};

const getBestFitLineLogValues = (valuesX, valuesY) => {
  const { a, b } = bestFitLineLog(valuesX, valuesY);
  const resultValuesY = [];
  for (let v = 0; v < valuesY.length; v += 1) {
    const x = valuesX[v];
    const y = a * Math.log(x) + b;
    resultValuesY.push(y);
  }

  return resultValuesY;
};

module.exports = { getBestFitLineValues, getBestFitLineExpValues, getBestFitLineLogValues };

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
  const a = (count * sumXY - sumX * sumY) / (count * summXX - sumX * sumX);
  const b = sumY / count - (a * sumX) / count;

  return {
    a,
    b,
  };
};

const bestFitLineExp = (valuesX, valuesY) => {
  // map values to ln then use standard linear regression
  const valuesYlog = valuesY.map((val) => Math.log(val));
  return bestFitLine(valuesX, valuesYlog);
};

const bestFitLineLog = (valuesX, valuesY) => {
  // map valuesX to ln then use standard linear regression
  const valuesXLog = valuesX.map((val) => Math.log(val));
  return bestFitLine(valuesXLog, valuesY);
};

const getEstimatedValuesFromCoefficients = (valuesX, a, b, type) => {
  let mapFunction;
  switch (type) {
    case 'linear':
      mapFunction = (x) => x * a + b;
      break;
    case 'exponential':
      mapFunction = (x) => Math.exp(a * x) * Math.exp(b);
      break;
    case 'logarithmic':
      mapFunction = (x) => a * Math.log(x) + b;
      break;
    default:
      throw new Error('unsupported parameter type');
  }

  const resultValuesY = new Array(valuesX.length);
  for (let i = 0; i < valuesX.length; i += 1) {
    resultValuesY[i] = mapFunction(valuesX[i]);
  }

  return resultValuesY;
};

const getBestFitLineValues = (valuesX, valuesY) => {
  const { a, b } = bestFitLine(valuesX, valuesY);
  const resultValuesY = getEstimatedValuesFromCoefficients(valuesX, a, b, 'linear');

  return {
    a, b, resultValuesY,
  };
};

const getBestFitLineExpValues = (valuesX, valuesY) => {
  const { a, b } = bestFitLineExp(valuesX, valuesY);
  const resultValuesY = getEstimatedValuesFromCoefficients(valuesX, a, b, 'exponential');

  return {
    a, b, resultValuesY,
  };
};

const getBestFitLineLogValues = (valuesX, valuesY) => {
  const { a, b } = bestFitLineLog(valuesX, valuesY);
  const resultValuesY = getEstimatedValuesFromCoefficients(valuesX, a, b, 'logarithmic');

  return {
    a, b, resultValuesY,
  };
};

const getMeanSquaredDeviation = (values, estimatimations) => {
  if (values.length !== estimatimations.length) {
    throw new Error('The observed values and the estimations need to have same size!');
  }

  let sumSquare = 0;
  for (let i = 0; i < values.length; i += 1) {
    sumSquare += (values[i] - estimatimations[i]) ** 2;
  }

  return sumSquare / values.length;
};

module.exports = {
  getBestFitLineValues,
  getBestFitLineExpValues,
  getBestFitLineLogValues,
  getMeanSquaredDeviation,
  getEstimatedValuesFromCoefficients,
};

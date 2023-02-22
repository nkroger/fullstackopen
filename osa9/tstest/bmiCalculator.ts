interface InputValues {
  height: number,
  weight: number
}

interface BmiResult {
  weight: number,
  height: number,
  bmi: string,
  bmiNumeric: number
}

const parseHeightWeight = (h: string, w: string): InputValues => {
  const height = Number(h);
  const weight = Number(w);
  
  if (!isNaN(height) && !isNaN(weight)) {
    return {
      height,
      weight
    }
  } else {
    throw new Error("Please provide numbers!")
  }
}

const parseArgs = (args: string[]): InputValues => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  return parseHeightWeight(args[2], args[3]);
}

const numericBmi = (height: number, weight: number): number => {
  const metres = height / 100;
  return weight / (metres*metres);
}

const calculateBmi = (height: number, weight: number) => {
  const bmi = numericBmi(height, weight);
  if (bmi < 16) {
    return "Underweight (Severe thinness)";
  }
  if (bmi < 17) {
    return "Underweight (Moderate thinness)";
  }
  if (bmi < 18.5) {
    return "Underweight (Mild thinness)";
  } 
  if (bmi < 25) {
    return "Normal (Healthy weight)";
  }
  if (bmi < 30) {
    return "Overweight (Pre-obese";
  }
  if (bmi < 35) {
    return "Obese (Class I)";
  }
  if (bmi < 40) {
    return "Obese (Class II)";
  }
  return "Obese (Class III)";
}

try {
  const { height, weight } = parseArgs(process.argv);
  console.log(calculateBmi(height, weight));
} catch (error: unknown) {
  let errorMessage = "Something went wrong.";
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}

export const bmi = (heightInput: any, weightInput: any): BmiResult => {
  const {height, weight} = parseHeightWeight(heightInput, weightInput);
  const bmiNumeric = numericBmi(height, weight);
  const bmi = calculateBmi(height, weight);
  return {
    weight,
    height,
    bmi,
    bmiNumeric
  }
}
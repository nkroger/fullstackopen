interface InputValues {
  height: number,
  weight: number
}

const parseArgs = (args: string[]): InputValues => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  const height = Number(args[2]);
  const weight = Number(args[3]);
  if (!isNaN(height) && !isNaN(weight)) {
    return {
      height,
      weight
    }
  } else {
    throw new Error("Please provide numbers!")
  }
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

//console.log(calculateBmi(180, 74))
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

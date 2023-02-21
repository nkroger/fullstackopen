interface trainingResults {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
}

interface ExerciseInputs {
  target: number,
  log: number[]
}

const parseNumber = (input: string): number => {
  const n = Number(input);
  if (isNaN(n)) throw new Error(`Argument ${input} is not a number!`);
  return n;
}

const parseArguments = (args: string[]): ExerciseInputs => {
  if (args.length < 4) throw new Error("Not enough arguments");

  const target = Number(args[2]);
  if (isNaN(target)) throw new Error("Training target was not numberic");

  const log = args.slice(3).map(n => parseNumber(n));
  return {
    target,
    log
  }
}

const describeRating = (rating: number): string => {
  if (rating < 1) {
    return "poor effort"
  }
  if (rating < 1.5) {
    return "not great"
  }
  if (rating < 2) {
    return "not too bad, but could be better"
  }
  if (rating < 2.5) {
    return "good job"
  }
  return "awesome!"
}

const calculateExercises = (log: number[], target: number): trainingResults => {
  const sum = log.reduce( (a, b) => a+b, 0);
  const avg = sum / log.length;
  const trainingDays = log.filter(d => d > 0).length;
  const rating = Math.max(Math.min(avg - target, 1.5) + 1.5, 0);
  return {
    periodLength: log.length,
    trainingDays,
    success: avg >= target,
    rating,
    ratingDescription: describeRating(rating),
    target,
    average: avg
  }
}

//console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2))
try {
  const { target, log } = parseArguments(process.argv);
  console.log(calculateExercises(log, target));
} catch (error: unknown) {
  let errorMessage = "Something went wrong.";
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}
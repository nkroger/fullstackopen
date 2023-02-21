interface trainingResults {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
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

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2))
import { Answer, QandA } from '../types';

export const getRamdomNumber = (min: number, max: number): number => {
  return Math.floor(Math.random() * max - 1) + min;
}

export const getTotalVotes = (questions: QandA): number => {
  if (!questions) return 9999;
  return questions.answers[0].votes + questions.answers[1].votes + questions.answers[2].votes + questions.answers[3].votes;
}


export function getMostPopularAnswer(answers: Answer[]): string {
  let tempMax: number = -9999;
  let tmpId: number = -99;
  answers.forEach((ans, id) => {
    if (ans.votes > tempMax) {
      tempMax = ans.votes;
      tmpId = id;
    }
  });
  return answers[tmpId].text;
};

export const getIconFromText = (text: string): string[] => {
  return text.split(' ', 1);
}

export const getVotesAsPercent = (votes: number, totalVotes: number): string => {
  return (votes / totalVotes * 100).toFixed(0);
}


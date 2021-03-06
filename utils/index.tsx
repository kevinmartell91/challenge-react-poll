import _ from 'lodash';
import { Answer, QandA } from '../types';

export const getTotalVotes = (questions: QandA): number => {
  if (!questions) return -9999;
  return _.sumBy(questions.answers, 'votes');
}

export const getMostPopularAnswer = (answers: Answer[]): string => {
  const popularAnswer = _.maxBy(answers, 'votes');
  if (!popularAnswer) 
    return '-';
  return popularAnswer.text;
}

export const getIconFromText = (text: string): string[] => {
  return text.split(' ', 1);
}

export const getVotesAsPercent = (votes: number, totalVotes: number): string => {
  return _.floor(_.divide(votes, totalVotes) * 100).toString();
}


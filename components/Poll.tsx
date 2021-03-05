import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { QandAsDocument, QandA } from '../types';
import AskQuestion from './AskQuestion';
import ChoiceList from './ChoiceList'

type Props = {
  qandas: QandAsDocument /* q and a's -- questions and answers document */;
};

const PollWrapper = styled.div`
  width: 100%;
  border: 1px solid #e6e6e6;
  border-radius: 5px;
  margin: 80px 0px 80px 0px;
  padding: 30px;
`;

const TotalVotesWrapper = styled.div`
  color: #969696;
`;

function getRamdomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * max - 1) + min;
}

function getTotalVotes(questions: QandA): number {
  if (!questions) return 9999;
  return questions.answers[0].votes + questions.answers[1].votes + questions.answers[2].votes + questions.answers[3].votes;
}

export default function Poll({ qandas }: Props) {

  const [votes, setVotes] = useState(-999);
  const [answerSelected, setAnswerSelected] = useState('');
  const [randPoll, setRandPoll] = useState<QandA>();
  const [randId, setRandId] = useState(getRamdomNumber(0, qandas.questions.length));

  useEffect(() => {
    setRandId(randId);
    setRandPoll(qandas.questions[randId]);
  }, [])

  const onAnswerSelected = (text: string) => {
    setAnswerSelected(text);
    let tempRandPoll: QandA = { ...randPoll } as QandA;
    tempRandPoll.answers.map(ans => {
      if (ans.text === text) {
        ans.votes++;
        return;
      }
    });
    setRandPoll(tempRandPoll);
    setVotes(votes + 1);
  };

  useEffect(() => {
    if (randPoll) {
      setVotes(getTotalVotes(qandas.questions[randId]));
    }
  }, [answerSelected])

  if (!randPoll) {
    return <div>Loading...</div>
  }

  return (
    <PollWrapper>
      <AskQuestion
        question={randPoll.question}></AskQuestion>
      <ChoiceList
        answers={randPoll.answers}
        totalVotes={votes}
        answerSelected={answerSelected}
        onAnswerSelected={onAnswerSelected}></ChoiceList>
      <br />
      <TotalVotesWrapper>
          {getTotalVotes(qandas.questions[randId])} votes</TotalVotesWrapper>
    </PollWrapper >
  );
}

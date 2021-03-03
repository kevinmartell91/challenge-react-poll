import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { QandAsDocument, QandA } from '../types';
import AskQuestion from './AskQuestion';
import ChoiceList from './ChoiceList'

type Props = {
  qandas: QandAsDocument /* q and a's -- questions and answers document */;
};

const PollWrapper = styled.div``;

function getRamdomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * max - 1) + min;
}

export default function Poll({ qandas }: Props) {

  const [votes, setVotes] = useState(0);
  const [answerSelected, setAnswerSelected] = useState('');
  const [randPoll, setRandPoll] = useState<QandA>();

  useEffect(() => {
    const randId = getRamdomNumber(0, qandas.questions.length);
    setRandPoll(qandas.questions[randId]);
  }, [])

  const onSelectedChange = (e: any) => {
    setAnswerSelected(e.target.title);
    setVotes(votes + 1);
  }

  if (!randPoll) {
    return <div>Loading...</div>
  }

  return (
    <PollWrapper>
      <AskQuestion question={randPoll.question}></AskQuestion>
      <ChoiceList
        answers={randPoll.answers} 
        answerSelected={answerSelected} 
        onSelectedChange={onSelectedChange}></ChoiceList>
      <br />
      {votes}
    </PollWrapper >
  );
}

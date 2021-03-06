import _ from 'lodash';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { QandAsDocument, QandA } from '../types';
import AskQuestion from './AskQuestion';
import ChoiceList from './ChoiceList';
import { getTotalVotes } from '../utils';

type Props = {
  qandas: QandAsDocument;
};

const PollWrapper = styled.div`
  width: 100%;
  min-width: 180px;
  border: 1px solid #e6e6e6;
  border-radius: 5px;
  margin: 80px 0px 80px 0px;
  padding: 30px;
`;

const TotalVotesWrapper = styled.div`
  color: #969696;
`;

export default function Poll({ qandas }: Props) {

  const [totalVotes, setTotalVotes] = useState(-999);
  const [answerSelected, setAnswerSelected] = useState('');
  const [randPoll, setRandPoll] = useState<QandA>();

  useEffect(() => {
    setRandPoll(_.sample(qandas.questions));
  }, []);

  const onAnswerSelected = (text: string) => {
    if (randPoll) {
      setAnswerSelected(text);
      // increasing by one vote from a copy of randPoll
      let tempRandPoll: QandA = { ...randPoll } as QandA;
      tempRandPoll.answers.map(ans => {
        if (ans.text === text) {
          ans.votes++;
          return;
        }
      });
      setRandPoll(tempRandPoll);
      setTotalVotes(totalVotes + 1);
    }
  };

  useEffect(() => {
    if (randPoll) {
      setTotalVotes(getTotalVotes(randPoll));
    }
  }, [answerSelected])

  if (!randPoll) {
    return <div>Loading...</div>
  }

  const renderTotalVotes = `${getTotalVotes(randPoll)} votes`;
  
  return (
    <PollWrapper>
      <AskQuestion
        question={randPoll.question}></AskQuestion>
      <ChoiceList
        answers={randPoll.answers}
        totalVotes={totalVotes}
        answerSelected={answerSelected}
        onAnswerSelected={onAnswerSelected}></ChoiceList>
      <br />
      <TotalVotesWrapper>
        {renderTotalVotes}
      </TotalVotesWrapper>
    </PollWrapper >
  );
}

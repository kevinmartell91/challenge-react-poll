import React from 'react';
import styled from 'styled-components'
import useWindowDimension
  from '../hooks/useWindowDimension';
import { Answer } from "../types";
import { Dimension } from '../types';
import {
  getMostPopularAnswer,
  getVotesAsPercent,
  getIconFromText,
} from '../utils';
import {
  NOT_EMPTY_POLL_DIMENSION_WIDTH,
  EMPTY_POLL_DIMENSION_WIDTH
} from '../CONST';

type Props = {
  answers: Answer[],
  totalVotes: number;
  answerSelected: string,
  onAnswerSelected: (text: string) => void;
};

const ChoiceListWrapper = styled.div`
  padding-top: 20px;
`;

const ContainerChoiceWrapper: any = styled.div`
  position: relative;
  cursor: pointer;
  width: 100%;
  border: 1px solid #c8c8c8;
  margin: 10px 0px 10px 0px;
  border-radius: 6px;
`;

const BackgroundChoiceWrapper = (props: any): any => {

  const emptyPoll =
    props.backgroundPercentVotes < 0;
  const background =
    props.popularAnswer === props.choice ? 'cyan' : '#e8e8e8';
  const weight =
    props.popularAnswer === props.choice ? 600 : 0;
  const width = emptyPoll
    ? '100%'
    : `${props.backgroundPercentVotes}%`;
  const textAlign = props.centerIcon ? 'center' : '';

  return emptyPoll
    ? {
      width: '100%',
      textAlign: textAlign
    }
    : {
      background: background,
      fontWeight: weight,
      width: width,
      transition: 'all 600ms ease 0s'
    };
}

const ChoiceWrapper: any = styled.div`
  ${BackgroundChoiceWrapper};
  border-radius: 5px 0 0 5px;
  height: 37px;
  left: 0px;
  top: 0px;
`;

const TextWrapper = styled.span.attrs((props: any) => {
  padding: !props.centerIcon ? '6px 0px 0px 8px' : '6px 0px 0px 0px';
})`
  position: absolute;
  transition: ${props => props.centerIcon
    ? 'all 1s ease-out'
    : 'all 600ms ease-out'};
  margin-left: ${props => props.centerIcon
    ? '-11px'
    : ''};
  padding: ${ props => props.centerIcon
    ? '6px 0px 0px 0px'
    : '6px 0px 0px 8px'};
`;

const CheckCircleWrapper = styled.img.attrs({
  src: require('../static/check-circle.svg')
})`
  position: absolute;
  width: 35px;
  padding-left: 9px;
`;

const PercentageWrapper = styled.span`
  position: absolute;
  top: 8px;
  right: 10px;
`;

export default function ChoiceList({
  answers,
  totalVotes,
  answerSelected,
  onAnswerSelected
}: Props) {

  const windowDimension: Dimension = useWindowDimension();
  const emptyPoll: boolean = totalVotes < 0;

  const renderChoices = answers.map((answer: Answer) => {

    const { text, votes } = answer;
    const icon = getIconFromText(text);
    const percent = getVotesAsPercent(votes, totalVotes);
    const minWidth = emptyPoll
      ? EMPTY_POLL_DIMENSION_WIDTH
      : NOT_EMPTY_POLL_DIMENSION_WIDTH;
    const centerIcon =
      emptyPoll && windowDimension.width < minWidth
        ? true : false;

    const renderPercent = emptyPoll ? '' : `${percent}%`;
    const renderText = windowDimension.width > minWidth ? text : icon;
    const renderCheckCircle = answerSelected === text
      ? <CheckCircleWrapper></CheckCircleWrapper>
      : null;

    return (
      <ContainerChoiceWrapper
        key={text}
        onClick={() => onAnswerSelected(text)}>
        <ChoiceWrapper
          choice={text}
          popularAnswer={getMostPopularAnswer(answers)}
          backgroundPercentVotes={percent}
          centerIcon={centerIcon}>
          <TextWrapper
            windowWidth={windowDimension.width}
            centerIcon={centerIcon} >
            {renderText}
            {renderCheckCircle}
          </TextWrapper>
          <PercentageWrapper>
            {renderPercent}
          </PercentageWrapper>
        </ChoiceWrapper>
      </ContainerChoiceWrapper>
    )
  })
  return (
    <ChoiceListWrapper>{renderChoices}</ChoiceListWrapper>
  )
}


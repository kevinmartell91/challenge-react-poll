import React from 'react';
import styled from 'styled-components'
import { Answer } from "../types";

const ChoiceListWrapper = styled.div``;
const CheckCircleWrapper = styled.img.attrs({
  src: require('../static/check-circle.svg')
})`
  width: 12px
`;

type Props = {
  answers: Answer[],
  answerSelected: string,
  onSelectedChange: (event: React.MouseEvent<HTMLElement>) => void;
};

export default function ChoiceList({ answers, answerSelected, onSelectedChange }: Props) {

  const renderChoices = answers.map((ans: Answer) => {
    const { text } = ans;

    const renderCheckCircle = answerSelected === text
      ? <CheckCircleWrapper></CheckCircleWrapper>
      : null;

    return (
      <div key={text} >
        <label
          title={text}
          onClick={onSelectedChange}>
          {`${text}`}
        </label>
        {renderCheckCircle}
      </div>
    )
  })

  return (
    <ChoiceListWrapper>{renderChoices}</ChoiceListWrapper>
  )
}


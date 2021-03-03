import React from 'react';
import styled from 'styled-components';
import { Question } from "../types";

type Props = {
  question: Question
}

const QuestionWrapper = styled.h2``;

export default function AskQuestion({ question }: Props) {

  return <QuestionWrapper>{question.text}</QuestionWrapper>;
}
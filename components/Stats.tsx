/* eslint-disable tailwindcss/classnames-order */

import React from "react";
import StatsBox from "./StatsBox";

interface props {
  answerCount: number;
  questionCount: number;
}

const Stats = ({ answerCount, questionCount }: props) => {
  return (
    <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4  gap-2">
      {/* box 1 */}
      <div className="flex items-center  justify-between p-3   gap-1 rounded-lg dark:bg-dark-200 bg-light-800 ">
        <div className="flex flex-col items-center justify-center gap-3">
          <p className="paragraph-semibold">{questionCount}</p>
          <p className="body-medium">Questions</p>
        </div>
        <div className="flex flex-col items-center justify-center gap-3">
          <p className="paragraph-semibold">{answerCount}</p>
          <p className="body-medium">Answers</p>
        </div>
      </div>
      {/* other box */}
      <StatsBox image='/assets/images/gold medal.svg' title='Gold badges' value={1} />
      <StatsBox image='/assets/images/silver medal.svg' title='Silver badges' value={1}/>
      <StatsBox image='/assets/images/bronze medal.svg' title='Bronze badges' value={1}/>
    </div>
  );
};

export default Stats;

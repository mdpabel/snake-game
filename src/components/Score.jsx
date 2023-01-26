import React, { useEffect, useState } from 'react';
import { useTopScore } from './../hooks/useTopScore';

const Score = ({ score }) => {
  const { topScore } = useTopScore();

  return (
    <div className='flex justify-between p-4 text-2xl'>
      <div>Current Score : {score}</div>
      <div>Top Score : {topScore}</div>
    </div>
  );
};

export default Score;

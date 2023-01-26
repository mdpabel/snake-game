import { useEffect, useState } from 'react';

export const useTopScore = () => {
  const [topScore, setTopScore] = useState(0);

  const setLocalStorageScore = (score) => {
    window.localStorage.setItem('score', Math.max(score, topScore));
  };

  useEffect(() => {
    const currentTopScore = window.localStorage.getItem('score');

    setTopScore(Math.max(currentTopScore, topScore));
  }, [window.localStorage.getItem('score')]);

  return { topScore, setLocalStorageScore };
};

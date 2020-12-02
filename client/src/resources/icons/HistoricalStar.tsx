import * as React from 'react';
import theme from '../theme';

const pathD = 'M19.5246 0.477393C19.6735 0.0151371 20.3275 0.0151373 20.4764 0.477393L24.8282 13.9868C24.8948 14.1934' +
  ' 25.0871 14.3335 25.3042 14.3335H39.3961C39.8794 14.3335 40.0814 14.9511 39.6916 15.2368L28.2836 23.5969C28.1099 2' +
  '3.7242 28.0372 23.9485 28.1033 24.1535L32.459 37.675C32.6076 38.1364 32.0785 38.5181 31.6875 38.2316L20.2961 29.88' +
  '36C20.1201 29.7546 19.8809 29.7546 19.705 29.8836L8.3135 38.2316C7.92249 38.5181 7.3934 38.1364 7.54204 37.6749L11' +
  '.8977 24.1535C11.9638 23.9485 11.8911 23.7242 11.7174 23.5969L0.309401 15.2368C-0.0804425 14.9511 0.121633 14.3335' +
  ' 0.60495 14.3335H14.6968C14.9139 14.3335 15.1062 14.1934 15.1728 13.9868L19.5246 0.477393Z';

interface MyProps {
  filled: boolean
}

export const HistoricalStar: React.FC<MyProps> = (props) => {
  return (
    <svg className={props.filled ? 'star-filled' : 'star-empty'} width='40' height='39' viewBox='0 0 40 39' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path
        d={pathD}
        fill={props.filled ? theme.color.starActive : theme.color.starInactive}/>
    </svg>
  );
};

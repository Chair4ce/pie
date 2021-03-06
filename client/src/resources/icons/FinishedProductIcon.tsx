import * as React from 'react';
import theme from '../theme';

export const FinishedProductIcon: React.FC = () => {
  const pathD1 = 'M15.1679 3.5547L15.4648 4H16H29V22H1L1 4L4 4H4.53518L4.83205 3.5547L6.53518 1L13.4648 1L15.1679 3.5' +
    '547ZM8.44917 11.1147L7.76578 10.475L7.0824 11.1147L5.31661 12.7677L4.5367 13.4977L5.31661 14.2278L11.1946 19.730' +
    '1L11.878 20.3698L12.5614 19.7301L24.6834 8.38296L25.4633 7.65291L24.6834 6.92285L22.9176 5.26994L22.2342 4.63024' +
    'L21.5508 5.26994L11.878 14.3244L8.44917 11.1147Z';
  const pathD2 = 'M11.878 15.6942L7.76578 11.8448L6 13.4977L11.878 19L24 7.65291L22.2342 6L11.878 15.6942Z';

  return (
    <svg width='30' height='23' viewBox='0 0 30 23' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path fillRule={'evenodd'} d={pathD1} fill={theme.color.primaryButton}  stroke={theme.color.primaryButton}  strokeWidth={'2'}/>
      <path d={pathD2} fill={'#041319'}/>
    </svg>
  )
}

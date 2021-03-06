import * as React from 'react';
import theme from '../theme';
import styled from 'styled-components';

export const ScoiPageButton: React.FC = () => {
  let pathD = 'M20.9082 9.6875C21.1458 10.0521 21.2646 10.5876 21.2646 11.2939V11.6211C21.2614 12.3112 21.1426 12.840' +
    '2 20.9082 13.208C20.6738 13.5758 20.3402 13.7598 19.9072 13.7598C19.4515 13.7598 19.1081 13.5726 18.877 13.1982C' +
    '18.6458 12.8239 18.5303 12.2884 18.5303 11.5918L18.5352 11.0693C18.584 9.78027 19.0381 9.13574 19.8975 9.13574C2' +
    '0.3369 9.13574 20.6738 9.31966 20.9082 9.6875Z';
  const pathd2 = 'M15 30C23.2843 30 30 23.2843 30 15C30 6.71573 23.2843 0 15 0C6.71573 0 0 6.71573 0 15C0 23.2843 6.7' +
    '1573 30 15 30ZM7.56348 12.5244C7.74251 12.6644 7.83203 12.8597 7.83203 13.1104C7.83203 13.3317 7.74902 13.5042 7' +
    '.58301 13.6279C7.42025 13.7484 7.19727 13.8086 6.91406 13.8086C6.47135 13.8086 6.15072 13.7191 5.95215 13.54C5.7' +
    '5684 13.3577 5.65918 13.0762 5.65918 12.6953H3.94043C3.94043 13.1641 4.05762 13.5791 4.29199 13.9404C4.52962 14.' +
    '2985 4.88119 14.5817 5.34668 14.79C5.81543 14.9951 6.33789 15.0977 6.91406 15.0977C7.73112 15.0977 8.37402 14.92' +
    '02 8.84277 14.5654C9.31152 14.2106 9.5459 13.7223 9.5459 13.1006C9.5459 12.3226 9.16178 11.7122 8.39355 11.2695C' +
    '8.0778 11.0872 7.67415 10.918 7.18262 10.7617C6.69108 10.6022 6.34766 10.4492 6.15234 10.3027C5.95703 10.153 5.8' +
    '5938 9.98698 5.85938 9.80469C5.85938 9.59635 5.94727 9.42546 6.12305 9.29199C6.30208 9.15527 6.5446 9.08691 6.85' +
    '059 9.08691C7.15332 9.08691 7.39258 9.16667 7.56836 9.32617C7.7474 9.48568 7.83691 9.71029 7.83691 10H9.5459C9.5' +
    '459 9.56706 9.43359 9.18294 9.20898 8.84766C8.98438 8.50911 8.66862 8.2487 8.26172 8.06641C7.85807 7.88411 7.400' +
    '72 7.79297 6.88965 7.79297C6.36556 7.79297 5.89355 7.8776 5.47363 8.04688C5.05371 8.21289 4.72819 8.44727 4.4970' +
    '7 8.75C4.26921 9.04948 4.15527 9.39616 4.15527 9.79004C4.15527 10.5811 4.61589 11.2028 5.53711 11.6553C5.82031 1' +
    '1.7952 6.1849 11.9401 6.63086 12.0898C7.07682 12.2396 7.3877 12.3844 7.56348 12.5244ZM15.7764 13.9062C16.0205 13' +
    '.5254 16.154 13.0876 16.1768 12.5928H14.4727C14.4596 12.9964 14.349 13.291 14.1406 13.4766C13.9323 13.6621 13.63' +
    '12 13.7549 13.2373 13.7549C12.7718 13.7549 12.443 13.5921 12.251 13.2666C12.0622 12.9411 11.9678 12.3991 11.9678' +
    ' 11.6406V11.1377C11.9775 10.4378 12.0817 9.92839 12.2803 9.60938C12.4788 9.29036 12.7913 9.13086 13.2178 9.13086' +
    'C13.6377 9.13086 13.9502 9.22526 14.1553 9.41406C14.3604 9.60286 14.4694 9.91374 14.4824 10.3467H16.1914C16.1198' +
    ' 9.54915 15.8219 8.92415 15.2979 8.47168C14.7738 8.01595 14.0804 7.78809 13.2178 7.78809C12.6188 7.78809 12.0915' +
    ' 7.93131 11.6357 8.21777C11.18 8.50098 10.8301 8.90462 10.5859 9.42871C10.3451 9.94954 10.2246 10.5583 10.2246 1' +
    '1.2549V11.6064C10.2246 12.7165 10.4932 13.5758 11.0303 14.1846C11.5674 14.7933 12.3031 15.0977 13.2373 15.0977C1' +
    '3.8037 15.0977 14.3066 14.9935 14.7461 14.7852C15.1888 14.5768 15.5322 14.2839 15.7764 13.9062ZM22.6221 13.4326C' +
    '22.8792 12.8988 23.0078 12.2852 23.0078 11.5918V11.2646C23.0046 10.5811 22.8711 9.97559 22.6074 9.44824C22.347 8' +
    '.91764 21.9808 8.50911 21.5088 8.22266C21.0368 7.9362 20.4997 7.79297 19.8975 7.79297C19.2887 7.79297 18.7451 7.' +
    '93783 18.2666 8.22754C17.7913 8.51725 17.4251 8.92904 17.168 9.46289C16.9141 9.99349 16.7871 10.6071 16.7871 11.' +
    '3037V11.7041C16.8001 12.3747 16.9368 12.9688 17.1973 13.4863C17.4609 14.0039 17.8271 14.4027 18.2959 14.6826C18.' +
    '7646 14.9593 19.3018 15.0977 19.9072 15.0977C20.5127 15.0977 21.0514 14.9544 21.5234 14.668C21.9987 14.3783 22.3' +
    '649 13.9665 22.6221 13.4326ZM24.0088 15H25.7178V7.89062H24.0088V15ZM16.3923 24.8588V27.2631L22.2852 22.5L16.3923' +
    ' 17.7369V20.1445H9V24.8588H16.3923Z';

  return (
    <Wrapper>
      <svg width='30' height='30' viewBox='0 0 30 30' fill='none' xmlns='http://www.w3.org/2000/svg'>
        <path d={pathD} fill={theme.color.primaryButton}/>
        <path d={pathd2} fillRule="evenodd" clipRule="evenodd" fill={theme.color.primaryButton}/>
      </svg>
    </Wrapper>
  );
};

const Wrapper = styled('div')`
  cursor: pointer;

  svg {
    border-radius: 15px;
    box-shadow: 0 2px 4px #000000;
  
    :hover {
      box-shadow: 0 0 6px #FFFFFF;
    }
  }
`;

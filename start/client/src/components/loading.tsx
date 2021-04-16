import styled, { keyframes } from 'react-emotion';
import { size } from 'polished';

import { ReactComponent as Logo } from '../assets/logo.svg';
import { colors } from '../styles';

const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

const Loading = styled(Logo)(size(64), {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
  width: '100%',
  // margin: 'auto',
  fill: colors.grey,
  path: {
    transformOrigin: 'center',
    animation: `${spin} 1s linear infinite`,
  },
});

export default Loading;

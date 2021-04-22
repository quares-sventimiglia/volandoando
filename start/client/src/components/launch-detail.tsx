import React from 'react';
import styled from 'react-emotion';

import { unit } from '../styles';
import { cardClassName, getBackgroundImage } from './launch-tile';

const LaunchDetail: React.FC<any> = ({ id, site, rocket }: any) => (
  <Card
    style={{
      backgroundImage: getBackgroundImage(id as string),
    }}
  >
    <h3 style={{
      fontSize: '7rem'
    }}>
      {rocket && rocket.name} ({rocket && rocket.type})
    </h3>
    <h5 style={{
      fontSize: '2rem'
    }}>{site}</h5>
  </Card>
);

/**
 * STYLED COMPONENTS USED IN THIS FILE ARE BELOW HERE
 */

const Card = styled('div')(cardClassName, {
  height: '80%',
  marginBottom: unit * 4,
});

export default LaunchDetail;

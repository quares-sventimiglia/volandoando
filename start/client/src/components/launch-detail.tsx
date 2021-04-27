import React from 'react';
import styled from 'react-emotion';
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
  position: "absolute",
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  marginBottom: "0",
  zIndex: -1
});

export default LaunchDetail;

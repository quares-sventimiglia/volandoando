import React, { Fragment } from 'react';
import styled from 'react-emotion';

export default function PageContainer(props: any) {
  return (
    <Fragment>
      <Container>{props.children}</Container>
    </Fragment>
  );
}

const Container = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  flexGrow: 1,
  width: '100%',
  margin: '0 auto',
});

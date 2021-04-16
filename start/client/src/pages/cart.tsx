import React, { Fragment } from 'react';
import { gql, useQuery } from '@apollo/client';

import { Footer, Header, Loading } from '../components';
import { CartItem, BookTrips } from '../containers';
import { RouteComponentProps } from '@reach/router';
import { GetCartItems } from './__generated__/GetCartItems';
import styled from 'react-emotion';

export const GET_CART_ITEMS = gql`
  query GetCartItems {
    cartItems @client
  }
`;

interface CartProps extends RouteComponentProps {}

const Cart: React.FC<CartProps> = () => {
  const { data, loading, error } = useQuery<GetCartItems>(
    GET_CART_ITEMS
  );

  if (loading) return <Loading />;
  if (error) return <p>ERROR: {error.message}</p>;
    console.log("DATAAAAAAAAAAAAAA", data)
  return (
    <Container>
      <Header/>
      {data?.cartItems.length === 0 ? (
        <p data-testid="empty-message">No items in your cart</p>
      ) : (
        <Container>
          {data?.cartItems.map((launchId: any) => (
            <CartItem key={launchId} launchId={launchId} />
          ))}
          <BookTrips cartItems={data?.cartItems || []} />
        </Container>
      )}
      <Footer />
    </Container>
  );
}

export default Cart;

const Container = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  flexGrow: 1,
  width: '50%',
  margin: '0 auto',
  height: '100vh'
});
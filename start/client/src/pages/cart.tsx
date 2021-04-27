import React from "react";
import { gql, useQuery } from "@apollo/client";

import { Footer, Header, Loading } from "../components";
import { CartItem, BookTrips } from "../containers";
import { RouteComponentProps } from "@reach/router";
import styled from "react-emotion";

export const GET_ALL_LAUNCHES = gql`
  query GetAllLaunches {
    getAllLaunches {
      id
      rocket {
        id
        name
        type
      }
      site
      mission {
        missionPatch
        name
      }
    }
  }
`;

interface cartProps extends RouteComponentProps {}

const Cart: React.FC<cartProps> = () => {
  const {data: launchInfo, loading, error} = useQuery(GET_ALL_LAUNCHES,{fetchPolicy: "network-only"});

  if (loading) return <Loading />;
  if (error) return <p>ERROR: {error.message}</p>;

  return (
    <Container>
      <Header />
      {launchInfo?.getAllLaunches.length === 0 ? (
        <h3 data-testid="empty-message">No items in your cart</h3>
      ) : (
        <Container>
          {launchInfo?.getAllLaunches.map((launchId: any) => (
            <CartItem key={launchId.id} launchId={launchId.id} fromCart/>
          ))}
          <BookTrips cartItems={launchInfo?.getAllLaunches || []} />
        </Container>
      )}
      <Footer />
    </Container>
  );
};

export default Cart;

const Container = styled("div")({
  display: "flex",
  flexDirection: "column",
  flexGrow: 1,
  width: "75%",
  margin: "0 auto",
});

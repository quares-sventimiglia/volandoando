import React from "react";
import { gql, useQuery } from "@apollo/client";

import { Footer, Header, Loading } from "../components";
import { CartItem, BookTrips } from "../containers";
import { RouteComponentProps } from "@reach/router";
import styled from "react-emotion";
import { GET_USER_INFO } from "./launches";
import NotLoggedIn from "../components/not-logged-in";

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
  const { data: userData } = useQuery(GET_USER_INFO);
  const { data: launchInfo, loading, error } = useQuery(GET_ALL_LAUNCHES, {
    fetchPolicy: "network-only",
  });

  console.log("DATA", userData);

  if (userData && !userData.me) return <NotLoggedIn />;

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
            <CartItem key={launchId.id} launchId={launchId.id} fromCart />
          ))}
          <BookTrips />
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
  height: "100vh",
});

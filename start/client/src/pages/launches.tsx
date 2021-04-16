import * as GetLaunchListTypes from "./__generated__/GetLaunchList";
import React, { useState } from "react";
import { RouteComponentProps, Link } from "@reach/router";
import { gql, useQuery } from "@apollo/client";
import { LaunchTile, Header, Loading, Footer } from "../components";
import { Button } from "semantic-ui-react";
import styled from 'react-emotion';

export const LAUNCH_TILE_DATA = gql`
  fragment LaunchTile on Launch {
    __typename
    id
    isBooked
    rocket {
      id
      name
    }
    mission {
      name
      missionPatch
    }
  }
`;

export const GET_LAUNCHES = gql`
  query GetLaunchList($after: String) {
    launches(after: $after) {
      cursor
      hasMore
      launches {
        ...LaunchTile
      }
    }
  }
  ${LAUNCH_TILE_DATA}
`;

export const GET_USER_INFO = gql`
  query GetUserInfo {
    me {
      email
      name
    }
  }
`;

interface LaunchesProps extends RouteComponentProps {}

const Launches: React.FC<LaunchesProps> = () => {
  const { data, loading, error, fetchMore } = useQuery<
    GetLaunchListTypes.GetLaunchList,
    GetLaunchListTypes.GetLaunchListVariables
  >(GET_LAUNCHES);

  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const fetchMoreLaunches = async () => {
    setIsLoadingMore(true);
    await fetchMore({
      variables: {
        after: data?.launches.cursor,
      },
    });
    setIsLoadingMore(false);
  };

  if (loading) return <Loading />;
  if (error)
    return (
      <Link to="/login">
        <Button fluid color="purple" size="big">
          You are not logged in, please click me and login.
        </Button>
      </Link>
    );
  if (!data) return <p>Not Fount</p>;

  return (
    <Container>
      <Header/>
      {data.launches &&
        data.launches.launches &&
        data.launches.launches.map((launch: any) => (
          <LaunchTile key={launch.id} launch={launch} />
        ))}
      {data.launches &&
        data.launches.hasMore &&
        (isLoadingMore ? (
          <Loading />
        ) : (
          <Button color="purple" size="big" onClick={fetchMoreLaunches}>
            Load More
          </Button>
        ))}
      <Footer />
    </Container>
  );
};

export default Launches;

const Container = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  flexGrow: 1,
  width: '50%',
  margin: '0 auto',
  height: '100vh'
});

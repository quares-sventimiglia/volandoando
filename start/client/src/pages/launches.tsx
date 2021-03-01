import * as GetLaunchListTypes from "./__generated__/GetLaunchList";
import React, { Fragment, useState } from "react";
import { RouteComponentProps } from "@reach/router";
import { gql, useQuery } from "@apollo/client";
import { LaunchTile, Header, Loading, Button } from "../components";

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
  if (error) return <p>ERROR</p>;
  if (!data) return <p>Not Fount</p>;

  return (
    <Fragment>
      <Header />
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
          <Button onClick={fetchMoreLaunches}>Load More</Button>
        ))}
    </Fragment>
  );
};

export default Launches;

import React, { useEffect, useState } from "react";
import { gql, useMutation, useQuery } from "@apollo/client";
import { Button } from "semantic-ui-react";

export const ADD_TO_CART = gql`
  mutation AddLaunch($launchId: ID!) {
    addToCart(launchId: $launchId) {
      success
      message
    }
  }
`;

export const GET_ALL_LAUNCHES = gql`
  query GetAllLaunches {
    getAllLaunches {
      id
    }
  }
`;
export const REMOVE_TO_CART = gql`
  mutation RemoveToCart($launchId: ID!) {
    removeToCart(launchId: $launchId) {
      success
    }
  }
`;

const addLaunchToCart = async (id: any, addLaunch: any) => {
  try {
    await addLaunch({
      variables: {
        launchId: id,
      },
      refetchQueries: [{ query: GET_ALL_LAUNCHES }],
    });
  } catch (e) {
    console.log("ERRRROOR", e);
  }
};

export const removeLaunchToCart = async (id: any, removeLaunch: any) => {
  try {
    await removeLaunch({
      variables: {
        launchId: id,
      },
      refetchQueries: [{ query: GET_ALL_LAUNCHES }],
    });
  } catch (e) {
    console.log("ERRRROOR", e);
  }
};

interface ActionButtonProps {
  id?: string;
}

const ToggleTripButton: React.FC<ActionButtonProps> = ({ id }) => {
  const [addLaunch] = useMutation(ADD_TO_CART);
  const [removeLaunch] = useMutation(
    REMOVE_TO_CART
  );
  const { data } = useQuery(GET_ALL_LAUNCHES);

  const [isBooked, setIsBooked] = useState(false);

  useEffect(() => {
    setIsBooked(
      Boolean(
        data &&
          data.getAllLaunches &&
          data.getAllLaunches.find((launch: { id: string }) => launch.id === id)
      )
    );
  }, [id, data]);

  return (
    <Button
      onClick={async (e) => isBooked ? await removeLaunchToCart(id, removeLaunch) : await addLaunchToCart(id, addLaunch)}
      data-testid={"action-button"}
      color="purple"
      size="big"
      style={{
        position: "absolute",
        top: "65%",
        left: "50%",
        transform: "translate(-50%, 50%)"
      }}
    >
      {isBooked ? "Remove from Cart" : "Add to Cart"}
    </Button>
  );
};

const ActionButton: React.FC<ActionButtonProps> = ({ id }) => (
  <ToggleTripButton id={id} />
);

export default ActionButton;

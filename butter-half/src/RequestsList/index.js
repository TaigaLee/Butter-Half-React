import React from "react";
import { Card, Button, Image } from "semantic-ui-react";

export default function RequestsList(props) {
  const propsRequests = props.requests;
  console.log(props.requests);
  const requests = propsRequests.map((request) => {
    return (
      <Card
        key={request.id}
        style={{ width: "250px", fontFamily: "Righteous" }}
      >
        <Card.Content textAlign={"center"}>
          <Card.Header>{request.restaurantName}</Card.Header>
          <Card.Meta style={{ marginBottom: "5px" }}>
            Posted by: {request.user.name}
          </Card.Meta>
          {request.typeOfDate === "date" ? (
            <Image
              style={{ height: "180px" }}
              src="https://sm.mashable.com/mashable_sea/photo/default/41920171-1895266567219497-2224927358660378624-o_se62.jpg"
            />
          ) : request.typeOfDate === "friends" ? (
            <Image
              style={{ height: "180px" }}
              src="https://sm.mashable.com/mashable_sea/photo/default/54518851-2145886505490834-5209910250487939072-n_52be.jpg"
            />
          ) : (
            <Image
              style={{ height: "180px" }}
              src="https://sm.mashable.com/mashable_sea/photo/default/43006808-1912527055493448-6568686277711888384-o_xymk.jpg"
            />
          )}

          <Button
            style={{
              marginTop: "10px",
              backgroundColor: "gold",
              color: "white",
            }}
          >
            View{" "}
          </Button>
        </Card.Content>
      </Card>
    );
  });

  return (
    <Card.Group centered={true} style={{ marginBottom: "20px" }}>
      {requests}
    </Card.Group>
  );
}

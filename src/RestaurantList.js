import React from "react";
import Spinner from "./Spinner";
import Icon from "./Icon";
import { unstable_createResource } from "react-cache";
import "./RestaurantList.css";

const restaurantResource = unstable_createResource(() => {
  return new Promise((resolve, reject) => {
    fetch("https://8kq2vljq58.sse.codesandbox.io/restaurants")
      .then(resp => resp.json())
      .then(resposne => {
        const { restaurants } = resposne;
        resolve(restaurants);
      });
  });
});

function Score({ score, icon }) {
  if (score === null || score < 0) return null;
  return (
    <>
      <Icon type={icon} size="tiny" /> {score} VND
    </>
  );
}

function Restaurant({
  id,
  name,
  address,
  state,
  area,
  price,
  loading,
  onClick
}) {
  return (
    <div
      className={`Restaurant box ${loading ? "loading" : ""}`}
      onClick={() => onClick(id)}
    >
      <div className="content">
        <div className="title">{name}</div>
        <div className="sub-text">
          <Score icon={"certified_fresh"} score={price} /> ·{" "}
          <Score icon={"rotten"} score={price} /> · {address}
        </div>
      </div>
      {loading && <Spinner size="small" />}
    </div>
  );
}

export default function RestaurantListContainer({ id, showDetailPage }) {
  const restaurants = restaurantResource.read();
  return (
    <div className="IndexPage">
      <h1>Top Restaurant List</h1>
      <div>
        {restaurants.map(restaurant => (
          <Restaurant
            key={restaurant.id}
            {...restaurant}
            loading={restaurant.id === id}
            onClick={showDetailPage}
          />
        ))}
      </div>
    </div>
  );
}

import React from "react";
import { unstable_createResource } from "react-cache";

const restaurantDetailResource = unstable_createResource(restaurantId => {
  return new Promise((resolve, reject) => {
    const url = `https://8kq2vljq58.sse.codesandbox.io/restaurants/${restaurantId}`;
    fetch(url)
      .then(resp => resp.json())
      .then(resposne => {
        setTimeout(() => {
          resolve(resposne);
        }, 0);
      });
  });
});

const RestaurantDetail = ({
  image_url,
  address,
  name,
  city,
  place,
  price,
  reserve_url,
  mobile_reserve_url,
  hideDetailPage
}) => {
  return (
    <div className="fl w-50 w-25-m w-20-l pa2 ba b--black-10 br2 br--top m10">
      <img
        src={image_url}
        className="w-100 db outline black-10"
        alt="restaurant"
      />
      <dl className="mt2 f6 lh-copy">
        <dt className="ml0 black truncate w-100">{name}</dt>
        <dd className="ml0 black truncate w-100">{address}</dd>
        <dt className="ml0 black truncate w-100">{city}</dt>
        <dd className="ml0 gray truncate w-100">{price}</dd>
        <dt className="ml0 black truncate w-100">{reserve_url}</dt>
        <dd className="ml0 gray truncate w-100">{mobile_reserve_url}</dd>
      </dl>
      <button
        onClick={e => {
          e.preventDefault();
          hideDetailPage();
        }}
      >
        {" "}
        Go back
      </button>
    </div>
  );
};

const RestaurantDetailContainer = props => {
  const restaurantId = props.id;
  const restaurantDetails = restaurantDetailResource.read(restaurantId);
  return (
    <RestaurantDetail
      {...restaurantDetails}
      hideDetailPage={props.hideDetailPage}
    />
  );
};

export default RestaurantDetailContainer;

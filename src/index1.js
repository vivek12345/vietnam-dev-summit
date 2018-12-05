import React, { lazy, Suspense, Loading } from "react";
import ReactDOM, { unstable_deferredUpdates } from "react-dom";
import "./styles.css";
import "./cards.css";

const RestaurantListComponent = lazy(() => import("./RestaurantList"));
const RestaurantDetailComponent = lazy(() => import("./RestaurantDetail"));

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      id: null,
      showDetail: false
    };
  }
  toggleDetailPage = id => {
    if (id) {
      this.setState({
        id: id
      });
      requestIdleCallback(() =>
        this.setState({
          showDetail: true
        })
      );
    } else {
      this.setState({
        id: id,
        showDetail: false
      });
    }
  };
  render() {
    const { id, showDetail } = this.state;
    return (
      <Suspense fallback={"Loading..."}>
        <Loading>
          {isLoading =>
            !showDetail ? (
              <RestaurantListComponent showDetailPage={this.toggleDetailPage} />
            ) : (
              <RestaurantDetailComponent
                id={id}
                loadingId={isLoading ? id : null}
                hideDetailPage={this.toggleDetailPage}
              />
            )
          }
        </Loading>
      </Suspense>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);

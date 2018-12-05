import React, { lazy, Suspense } from "react";
import { unstable_scheduleCallback as defer } from "scheduler";
import Spinner from "./Spinner";
import "./App.css";

const RestaurantListComponent = lazy(() => import("./RestaurantList"));
const RestaurantDetailComponent = lazy(() => import("./RestaurantDetail"));

function AppSpinner() {
  return (
    <div className="AppSpinner">
      <Spinner size="large" />
    </div>
  );
}

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
      defer(() => {
        this.setState({
          showDetail: true
        });
      });
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
      <div className="App">
        <Suspense maxDuration={1500} fallback={<AppSpinner />}>
          {!showDetail ? (
            <RestaurantListComponent
              showDetailPage={this.toggleDetailPage}
              id={id}
            />
          ) : (
            <RestaurantDetailComponent
              id={id}
              hideDetailPage={this.toggleDetailPage}
            />
          )}
        </Suspense>
      </div>
    );
  }
}

export default App;

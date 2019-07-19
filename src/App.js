import React, { Component } from "react";
import "./App.css";

import { ScrollIntoView, ScrollElement } from "./ScrollIntoView";

function generateFakeData() {
  return [...Array(10).keys()].map((_, i) => ({
    id: Math.floor(Math.random() * (i + 1) * 10000)
  }));
}

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: generateFakeData(),
      selectedIndex: 0
    };
  }

  // Simulate pagination by
  // creating new data and
  // returning to first entry
  newData = () => {
    this.setState({
      data: generateFakeData(),
      selectedIndex: 0
    });
  };

  // Move selectedIndex by a specific offset
  // staying within the bounds of our data
  changeSelectedIndex = offset => {
    const { selectedIndex, data } = this.state;
    if (selectedIndex + offset < 0 || selectedIndex + offset >= data.length) {
      return;
    }

    this.setState({ selectedIndex: selectedIndex + offset });
  };

  render() {
    const { data, selectedIndex } = this.state;

    // Derive the currently selected entry's ID from the selectedIndex
    const selectedId = data[selectedIndex] ? data[selectedIndex].id : null;

    return (
      <div className="container">
        <button onClick={this.newData}>New Data</button>
        <button onClick={() => this.changeSelectedIndex(-1)}>&uarr;</button>
        <button onClick={() => this.changeSelectedIndex(+1)}>&darr;</button>

        <div className="scroll-container">
          <ScrollIntoView scrollToUniqueId={selectedId}>
            {data.map(({ id }) => (
              <ScrollElement key={id} uniqueId={id}>
                <div
                  className={
                    selectedId === id ? "entry entry--active" : "entry"
                  }
                >
                  <p>{id}</p>
                </div>
              </ScrollElement>
            ))}
          </ScrollIntoView>
        </div>
      </div>
    );
  }
}

export default App;

import React, {Component} from 'react';

// Function for Topic
function Topic(props) {
  let url=`https://www.freecodecamp.org/forum/t/${props.id}`;
  let imgUrl = "https://www.freecodecamp.org";
  let profile = "https://www.freecodecamp.org/forum/u/";
  return(
    <div className="topic">
      <div className="first">
        <div>
          <span>{props.index}</span>
          <span><a href={url} target="_blank">{props.topic}</a></span>
        </div>
        <span>{props.images.map((index,key) => {})}</span>
      </div>
    </div>
  )
}
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;

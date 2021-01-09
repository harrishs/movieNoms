import React, {useState, useEffect, useContext} from "react";

import Card from "./Components/Card/Card";
import {NominationContext} from "./NominationContext";
import Nominations from "./Components/Nominations/Nominations";
import NominationContainer from "./Components/Nominations/NominationContainer"

function App() {
  const [keyWord, setKeyWord] = useState("");
  const [finalWord, setFinalWord] = useState("");
  const [results, setResults] = useState();
  const [load, setLoad] = useState(false);

  const [nominations] = useContext(NominationContext);

  let apiUrl = `http://www.omdbapi.com/?apikey=29fdc319&type=movie&s=${finalWord}`;

  const entryHandler = e => {
    setKeyWord(e.target.value);
  }

  const handleSearch = event => {
    event.preventDefault();
    setFinalWord(keyWord);
  }

  let reloader = (cb, title, year) => {
    cb(title, year);
    let updateResults = results;
    console.log(nominations);
    setLoad(!load);
  }

  useEffect(() => {
    const runFetch = apiUrl => {
      if (finalWord){
        fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
          console.log(data.Search);
          setResults(data.Search);
        })
      } else {
        setResults();
      }
    }
      console.log(apiUrl);
      runFetch(apiUrl);
  }, [apiUrl, finalWord]);

  let output = <h1>No Results</h1>;

  if (results) {
      output = results.map(result => {
        return (
          <Card title={result.Title} poster={result.Poster} year={result.Year} imdbID={result.imdbID} key={result.imdbID} nomination={result.nomination} reload={reloader} />
        )
      })
  }

  let renderNoms;
  if (nominations) {
    renderNoms = Object.entries(nominations).map(nomination => {
      if (nomination[0] !== "count"){
        return <Nominations key={nomination[0]} title={nomination[0]} year={nomination[1]} reload={reloader}/>
      } else {
          return null
      }
  })
  }

  return (
      <div className="App">
        <form onSubmit={handleSearch} >
          <input type="text" placeholder="Search Movie Name" onChange={entryHandler} />
        </form>
        <div>
        {output}
        </div>
        <NominationContainer count={nominations.count}>
        {renderNoms}
        </NominationContainer>
      </div>
  );
}

export default App;

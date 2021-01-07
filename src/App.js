import React, {useState, useEffect} from "react";

import Card from "./Components/Card/Card";
import {NominationProvider} from "./NominationContext";

function App() {
  const [keyWord, setKeyWord] = useState("");
  const [finalWord, setFinalWord] = useState("");
  const [results, setResults] = useState();
  const [nominations, setNominations] = useState([]);

  let apiUrl = `http://www.omdbapi.com/?apikey=29fdc319&type=movie&s=${finalWord}`;

  const entryHandler = e => {
    setKeyWord(e.target.value);
  }

  const handleSearch = event => {
    event.preventDefault();
    setFinalWord(keyWord);
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
  }, [apiUrl, finalWord])

  let output = (
    <div>
      <h1>No Results</h1>
    </div>
  );

  if (results) {
      output = results.map(result => {
        return (
          <Card title={result.Title} poster={result.Poster} year={result.Year} imdbID={result.imdbID} key={result.imdbID} addNomination={}/>
        )
      })
    }


  const nominationHandler = (title, id) => {

  }

  return (
    <NominationProvider value={[nominations, setNominations]}>
      <div className="App">
        <form onSubmit={handleSearch} >
          <input type="text" placeholder="Search Movie Name" onChange={entryHandler} />
        </form>
        {output}
      </div>
    </NominationProvider>
  );
}

export default App;

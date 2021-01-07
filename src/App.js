import React, {useState, useEffect} from "react";

import Card from "./Components/Card/Card";

function App() {
  const [keyWord, setKeyWord] = useState("");
  const [finalWord, setFinalWord] = useState("");
  const [results, setResults] = useState();

  let apiUrl = `http://www.omdbapi.com/?apikey=29fdc319&type=movie&s=${finalWord}`;

  const entryHandler = e => {
    setKeyWord(e.target.value);
  }

  const handleSearch = event => {
    event.preventDefault();
    setFinalWord(keyWord);
  }

  const runFetch = apiUrl => {
    if (finalWord){
      fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        console.log(data.Search);
        setResults(data.Search);
      })
    }
  }

  let output = null;
  if (results) {
      output = results.map(result => {
        return (
          <Card title={result.Title} poster={result.Poster} year={result.Year} imdbID={result.imdbID} />
        )
      })
    }

  useEffect(() => {
    console.log(apiUrl);
    runFetch(apiUrl);
  }, [apiUrl])

  return (
    <div className="App">
      <form onSubmit={handleSearch} >
        <input type="text" placeholder="Search Movie Name" onChange={entryHandler} />
      </form>
      {output}
    </div>
  );
}

export default App;

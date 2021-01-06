import React, {useState, useEffect} from "react";

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
    fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      setResults(data);
    })
  }

  useEffect(() => {
    console.log(apiUrl);
    runFetch(apiUrl);
  }, [finalWord])

  return (
    <div className="App">
      <form onSubmit={handleSearch} >
        <input type="text" placeholder="Search Movie Name" onChange={entryHandler} />
      </form>
    </div>
  );
}

export default App;

import React, {useState} from "react";

function App() {
  const [keyWord, setKeyWord] = useState("");
  const [finalWord, setFinalWord] = useState("");
  const [results, setResults] = useState();

  let apiUrl = `http://www.omdbapi.com/?apikey=29fdc319&type=movie&t=${finalWord}`;

  const entryHandler = e => {
    setKeyWord(e.target.value);
  }

  const handleSearch = event => {
    event.preventDefault();
    setFinalWord(keyWord);
    runFetch(apiUrl);
  }

  const runFetch = apiUrl => {
    fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      setResults(data);
    })
  }

  return (
    <div className="App">
      <form onSubmit={handleSearch} >
        <input type="text" placeholder="Search Movie Name" onChange={entryHandler} />
      </form>
    </div>
  );
}

export default App;

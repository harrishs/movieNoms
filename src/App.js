import React, {useState, useEffect} from "react";

import Card from "./Components/Card/Card";
import NominationContext from "./NominationContext";
import Nominations from "./Components/Nominations/Nominations";

function App() {
  const [keyWord, setKeyWord] = useState("");
  const [finalWord, setFinalWord] = useState("");
  const [results, setResults] = useState();
  const [nominations, setNominations] = useState({count: 0});

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

  let nominationHandler = (title, year, type) => {
    if (type === "add"){    
      if (nominations.count < 5){
        if (nominations.count === 4){
          alert("You have added your final nomination");
        }
      let addNominations = nominations;
      addNominations[title] = year;
      addNominations.count += 1;
      setNominations(addNominations);
      } else {
        alert("You have already added 5 nominations");
      }
    } else if (type === "remove") {
      if (nominations.count <= 5){
        if (nominations.count <= 0){
          alert("You have no nominations");
        }
        let removeNominations = nominations;
        delete removeNominations[title];
        removeNominations.count -= 1;
      } else {
        alert("You have no more nominations");
      }
    }
    console.log(nominations);
  }

  if (results) {
      output = results.map(result => {
        return (
          <Card title={result.Title} poster={result.Poster} year={result.Year} imdbID={result.imdbID} key={result.imdbID} Nomination={nominationHandler}/>
        )
      })
    }

  return (
    <NominationContext.Provider value={[nominations, setNominations]}>
      <div className="App">
        <form onSubmit={handleSearch} >
          <input type="text" placeholder="Search Movie Name" onChange={entryHandler} />
        </form>
        {output}
        <Nominations Nomination={nominationHandler}/>
      </div>
    </NominationContext.Provider>
  );
}

export default App;

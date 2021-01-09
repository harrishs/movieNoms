import React, {useState, useEffect, useContext} from "react";
import classes from "./App.module.css";

import Card from "./Components/Card/Card";
import {NominationContext} from "./NominationContext";
import Nominations from "./Components/Nominations/Nominations";
import NominationContainer from "./Components/Nominations/NominationContainer"
import SearchIcon from '@material-ui/icons/Search';

function App() {
  const [keyWord, setKeyWord] = useState("");
  const [finalWord, setFinalWord] = useState(null);
  const [results, setResults] = useState();
  const [load, setLoad] = useState(false);
  const [maxPage, setMaxPage] = useState(1);
  const [page, setPage] = useState(1);

  const [nominations, setNominations] = useContext(NominationContext);


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
    localStorage.setItem("nominations", JSON.stringify(nominations));
    console.log(nominations);
    setLoad(!load);
  }

  useEffect(() => {
    const runFetch = apiUrl => {
      if (finalWord){
        fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
          console.log(data);
          setMaxPage(Math.ceil(data.totalResults / 10));
          setResults(data.Search);
        })
      } else {
        setResults();
      }
    }
      console.log(apiUrl);
      let noms = JSON.parse(localStorage.getItem("nominations"));
      if (noms){
        if (noms.count >= 1){
          setNominations(noms);
        }
      }
      runFetch(apiUrl);
  }, [apiUrl, finalWord]);

  let output;
  let message;
  if (finalWord !== null){
    output = <h1>No Results</h1>;
    message = <h1 className={classes.Msg}>Results for "{keyWord}"</h1>
  }

  //Output result cards for each movie
  if (results) {
      output = results.map(result => {
        return (
          <Card title={result.Title} poster={result.Poster} year={result.Year} imdbID={result.imdbID} key={result.imdbID} nomination={result.nomination} reload={reloader} />
        )
      })
  }

  //Nomination entries for each nomination
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
      <div className={classes.App}>
        <form onSubmit={handleSearch}  className={classes.Search}>
          <SearchIcon className={classes.searchIcon} />
          <input type="text" placeholder="Search Movie Name" onChange={entryHandler} />
        </form>
        {message}
        <div className={classes.Results}>
        {output}
        </div>
        <NominationContainer count={nominations.count}>
        {renderNoms}
        </NominationContainer>
      </div>
  );
}

export default App;

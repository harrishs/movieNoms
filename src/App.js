import React, {useState, useEffect, useContext} from "react";
import classes from "./App.module.css";
import {Route, Link} from "react-router-dom";

import Card from "./Components/Card/Card";
import {NominationContext} from "./NominationContext";
import Nominations from "./Components/Nominations/Nominations";
import NominationContainer from "./Components/Nominations/NominationContainer"
import SearchIcon from '@material-ui/icons/Search';
import NominationPage from "./Components/Nominations/NominationPage";

function App() {
  const [keyWord, setKeyWord] = useState("");
  const [name, setName] = useState("");
  const [finalWord, setFinalWord] = useState(null);
  const [results, setResults] = useState();
  const [load, setLoad] = useState(false);
  const [maxPage, setMaxPage] = useState(1);
  const [page, setPage] = useState(1);
  const [params, setParams] = useState();

  const [nominations, setNominations] = useContext(NominationContext);

  let apiUrl = `http://www.omdbapi.com/?apikey=29fdc319&type=movie&s=${finalWord}`;

  const entryHandler = e => {
    setKeyWord(e.target.value);
  }

  const handleSearch = event => {
    event.preventDefault();
    setFinalWord(keyWord);
  }

  //Change state to rerender nominations and cards, add nominations to localstorage
  const reloader = (cb, data) => {
    cb(data);
    localStorage.setItem("nominations", JSON.stringify(nominations));
    setLoad(!load);
  }

  //Create url endpoint for personalized links with nominations
  const urlGen = (name) => {
    let paramGen = `/${name}`
    for (let nomination of Object.entries(nominations)){
      if (nomination[0] !== "count" ){
        paramGen += `/${nomination[0]} (${nomination[1]})`;
      }
    }
    setParams(paramGen);
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
      let noms = JSON.parse(localStorage.getItem("nominations"));
      if (noms){
        if (noms.count >= 1){
          setNominations(noms);
        }
      }
      runFetch(apiUrl);
      console.log(nominations);
  }, [apiUrl, finalWord, setNominations]);

  let output = <h1>Search & Nominate 5 Movies</h1>;
  let message = <div className={classes.Msg}>
  <h1>Nominated {nominations.count} of 5 Movies</h1>
</div>;

  if (finalWord !== null){
    output = <h1>No Results</h1>;
    message = (<div className={classes.Msg}>
      <h1>Nominated {nominations.count} of 5 Movies</h1>
      <h1>Results for "{finalWord}"</h1>
    </div>)
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
        return <Nominations key={nomination[0]} title={nomination[1][0]} year={nomination[1][1]} reload={reloader} imdbID={nomination[0]}/>
      } else {
          return null
      }
  })
  }
  
  let main = (
    <>
        <form onSubmit={handleSearch}  className={classes.Search}>
        <SearchIcon className={classes.searchIcon} />
        <input type="text" placeholder="Search Movie Name" onChange={entryHandler} />
        </form>
        {message}
        <div className={classes.Results}>
        {output}
        </div>
        <NominationContainer count={nominations.count} >
        {renderNoms}
        </NominationContainer>
    </>
  )

  //Handle messaging for when nominations are full
  let share = <div>
  <button  className={classes.Share} type="submit">Share Nominations With Friends</button>
</div>
  if (params) {
    share = <div>
      <button  className={classes.Share} type="submit">Share Nominations With Friends</button>
      <Link className={classes.Share} to={params}>Copy Link Address</Link>
    </div>
  }

  if (nominations.count === 5) {
      main = (<>
      <form onSubmit={handleSearch}  className={classes.Search}>
        <SearchIcon className={classes.searchIcon} />
        <input type="text" placeholder="Search Movie Name" onChange={entryHandler} />
      </form>
      <div className={classes.Five}>
      <h1>5 Movies Have Been Nominated</h1>
      <form onSubmit={(e) => {
        e.preventDefault();
        return urlGen(name)
      }}>
        <input type="text" name="name" required onChange={e => {
          setParams();
          setName(e.target.value)
        }} placeholder="Enter Your Name"/>
        {share}
      </form>
      <NominationContainer count={nominations.count} >
        {renderNoms}
      </NominationContainer>
    </div>
    </>)
  }

  return (
      <div className={classes.App}>
        <Route path="/"  exact render={() => main} />
        <Route path="/:name/:nom1/:nom2/:nom3/:nom4/:nom5" component={NominationPage} />
      </div>
  );
}

export default App;

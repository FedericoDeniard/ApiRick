import React, { useEffect } from "react";
import { useState } from "react";
import "./App.css";
import Character from "./components/character/character";
import FemaleSvg from "../public/images/Female.svg";
import MaleSvg from "../public/images/Male.svg";
import UnknownSvg from "../public/images/Unknown.svg";
import AliveSvg from "../public/images/alive.svg";
import DeadSvg from "../public/images/dead.svg";
import MortySvg from "../public/images/morty.svg";
import RickSvg from "../public/images/rick.svg";

function App() {
  const [characters, setCharacters] = useState([]);
  const [apiInfo, setApiInfo] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [genderFilter, setGenderFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const changePage = (amount) => {
    setPageNumber(pageNumber + amount);
  };

  const getCharacters = (pageNumber) => {
    fetch(
      `https://rickandmortyapi.com/api/character/?page=${pageNumber}${genderFilter}${statusFilter}`
    )
      .then((res) => res.json())
      .then((response) => {
        setCharacters(response.results);
        setApiInfo(response);
      });
  };

  const [disablePrevButton, setDisablePrevButton] = useState(
    pageNumber === 1 ? true : false
  );
  const [disableNextButton, setDisableNextButton] = useState(
    pageNumber === apiInfo?.info?.pages ? true : false
  );

  useEffect(() => {
    getCharacters(pageNumber);
    setDisablePrevButton(pageNumber === 1);
    setDisableNextButton(pageNumber === apiInfo?.info?.pages);
    console.log(apiInfo);
  }, [pageNumber, genderFilter, statusFilter]);

  const genderPicMap = {
    Female: FemaleSvg,
    Male: MaleSvg,
    Unknown: UnknownSvg,
  };

  const characterStatusPic = {
    Alive: AliveSvg,
    Dead: DeadSvg,
  };

  const getGenderLink = (genderLink) => {
    setPageNumber(1);
    setGenderFilter(genderLink);
    if (genderFilter === genderLink) {
      setGenderFilter("");
    }
  };

  const getStatusLink = (statusLink) => {
    setPageNumber(1);
    setStatusFilter(statusLink);
    if (statusFilter === statusLink) {
      setStatusFilter("");
    }
  };

  const resetFilters = () => {
    setPageNumber(1);
    setStatusFilter("");
    setGenderFilter("");
  };
  return (
    <>
      <div className="container">
        <header className="header">
          <span className="container-title">
            <h1>
              Rick & Morty API
              <p>By Fede Deniard</p>
              <img className="container-title__rick" src={RickSvg} />
              <img className="container-title__morty" src={MortySvg} />
            </h1>
          </span>
          <div className="nav">
            <p onClick={resetFilters}>Characters</p>
            <p className="gender-tooltip">
              Gender
              <span className="gender-tooltip__container">
                <span
                  onClick={() => getGenderLink("&gender=male")}
                  className={`gender-tooltip-male ${
                    genderFilter === "&gender=male"
                      ? "active-gender__filter"
                      : ""
                  }`}
                >
                  Male
                </span>
                <span
                  onClick={() => getGenderLink("&gender=female")}
                  className={`gender-tooltip-female ${
                    genderFilter === "&gender=female"
                      ? "active-gender__filter"
                      : ""
                  }`}
                >
                  Female
                </span>
                <span
                  onClick={() => getGenderLink("&gender=unknown")}
                  className={`gender-tooltip-unknown ${
                    genderFilter === "&gender=unknown"
                      ? "active-gender__filter"
                      : ""
                  }`}
                >
                  Unknown
                </span>
              </span>
            </p>
            <p className="status-tooltip">
              Status
              <span className="status-tooltip__container">
                <span
                  onClick={() => getStatusLink("&status=dead")}
                  className={`status-tooltip__dead ${
                    statusFilter === "&status=dead"
                      ? "active-status__filter"
                      : ""
                  }`}
                >
                  Dead
                </span>
                <span
                  onClick={() => getStatusLink("&status=alive")}
                  className={`status-tooltip__dead ${
                    statusFilter === "&status=alive"
                      ? "active-status__filter"
                      : ""
                  }`}
                >
                  Alive
                </span>
              </span>
            </p>
            <p>Specie</p>
            <p>Location</p>
          </div>
        </header>
        <div className="card-container">
          {characters && characters.length > 0 && (
            <>
              {characters.map((character, i) => (
                <Character
                  key={i}
                  characterName={character.name}
                  characterImg={character.image}
                  characterStatus={character.status}
                  characterStatusPic={characterStatusPic[character.status]}
                  characterSpecie={character.species}
                  characterLastKnown={character.location.name}
                  characterGender={genderPicMap[character.gender]}
                />
              ))}
            </>
          )}
        </div>
        <div className="container-buttons">
          <button disabled={disablePrevButton} onClick={() => changePage(-1)}>
            Prev Page
          </button>
          <span>{pageNumber}</span>
          <button disabled={disableNextButton} onClick={() => changePage(+1)}>
            Next Page
          </button>
        </div>
      </div>
    </>
  );
}
export default App;

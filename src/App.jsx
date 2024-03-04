import React, { useEffect, useRef } from "react";
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
import TriangeSvg from "../public/images/triangle.svg";
import ApiTitle from "../public/images/title.png";
import ErrorSvg from "../public/images/notfound.svg";

function App() {
  const [characters, setCharacters] = useState([]);
  const [apiInfo, setApiInfo] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);

  const [genderFilter, setGenderFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [specieFilter, setSpecieFilter] = useState(false);
  const [nameFilter, setNameFilter] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const charactersScroll = useRef(null);

  const changePage = (amount) => {
    setPageNumber(pageNumber + amount);
    charactersScroll.current.scrollLeft = 0;
  };

  const getCharacters = (pageNumber) => {
    setIsLoading(false);
    fetch(
      `https://rickandmortyapi.com/api/character/?page=${pageNumber}${genderFilter}${statusFilter}${nameFilter}`
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((response) => {
        setCharacters(response.results);
        setApiInfo(response);
        setIsError(false);
      })
      .catch((error) => {
        console.error("Error fetching characters:", error);
        setIsError(true);
      })
      .finally(() => setIsLoading(true));
  };

  const [disablePrevButton, setDisablePrevButton] = useState(
    pageNumber === 1 ? true : false
  );
  const [disableNextButton, setDisableNextButton] = useState(
    pageNumber === apiInfo?.info?.pages ? true : false
  );

  useEffect(() => {
    getCharacters(pageNumber);
  }, [pageNumber, genderFilter, statusFilter]);

  useEffect(() => {
    setDisablePrevButton(pageNumber === 1);
    setDisableNextButton(pageNumber === apiInfo?.info?.pages);
    if (isError) {
      setDisableNextButton(true);
      setDisablePrevButton(true);
      setPageNumber(1);
    }
  }, [characters, isError]);

  const genderPicMap = {
    Female: FemaleSvg,
    Male: MaleSvg,
    unknown: UnknownSvg,
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

  const filterSpecie = () => {
    setSpecieFilter(!specieFilter);
  };

  useEffect(() => {
    if (specieFilter === true) {
      const sortedCharacters = [...characters].sort((a, b) => {
        if (a.species > b.species) {
          return 1;
        }
        if (a.species < b.species) {
          return -1;
        }
        return 0;
      });
      setCharacters(sortedCharacters);
    } else {
      getCharacters(pageNumber);
    }
  }, [specieFilter]);

  const filterByName = (e) => {
    setNameFilter(`&name=${e}`);
  };

  useEffect(() => {
    getCharacters(1);
  }, [nameFilter]);

  const nameInputRef = useRef(null);

  const resetFilters = () => {
    setPageNumber(1);
    setStatusFilter("");
    setGenderFilter("");
    getCharacters();
    setSpecieFilter(false);
    setNameFilter("");
    nameInputRef.current.value = "";
  };

  return (
    <>
      <div className="container">
        <header className="header">
          <div className="header-title__container">
            <h1 className="main-title" onClick={resetFilters}>
              Rick & Morty
            </h1>
          </div>
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
            <p className="specie-filter" onClick={filterSpecie}>
              Specie
              {specieFilter ? (
                <img className="specie-filter__arrow" src={TriangeSvg} />
              ) : (
                ""
              )}
            </p>
          </div>
        </header>
        <input
          onChange={(e) => filterByName(e.target.value)}
          type="text"
          className="text-input__filter"
          placeholder="Search by name"
          ref={nameInputRef}
        ></input>
        <div
          className={`card-container ${isError ? "error" : ""}`}
          ref={charactersScroll}
        >
          {isLoading && !isError && (
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
          {isError && (
            <div className="card">
              <h4>No character found</h4>
              <img className="character-pic" src={ErrorSvg} />
            </div>
          )}
        </div>
        <div className="container-buttons">
          <button
            disabled={disablePrevButton}
            onClick={() => {
              changePage(-1);
              setSpecieFilter(false);
            }}
          >
            Prev Page
          </button>
          <span>{pageNumber}</span>
          <button
            disabled={disableNextButton}
            onClick={() => {
              changePage(+1);
              setSpecieFilter(false);
            }}
          >
            Next Page
          </button>{" "}
        </div>
      </div>
    </>
  );
}
export default App;

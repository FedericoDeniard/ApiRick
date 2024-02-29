import React, { useEffect } from "react";
import { useState } from "react";
import "./App.css";
import Character from "./components/character/character";
import FemaleSvg from "../public/images/Female.svg";
import MaleSvg from "../public/images/Male.svg";
import UnknownSvg from "../public/images/Unknown.svg";
import AliveSvg from "../public/images/alive.svg";
import DeadSvg from "../public/images/dead.svg";

function App() {
  const [characters, setCharacters] = useState([]);
  const [apiInfo, setApiInfo] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);

  const changePage = (amount) => {
    setPageNumber(pageNumber + amount);
  };

  const getCharacters = (pageNumber) => {
    fetch(`https://rickandmortyapi.com/api/character/?page=${pageNumber}`)
      .then((res) => res.json())
      .then((response) => {
        setCharacters(response.results);
        setApiInfo(response);
      });
  };

  const [disablePrevButton, setDisablePrevButton] = useState(false);
  const [disableNextButton, setDisableNextButton] = useState(false);

  useEffect(() => {
    getCharacters(pageNumber);
    setDisablePrevButton(pageNumber === 1);
    setDisableNextButton(pageNumber === apiInfo?.info?.pages);
  }, [pageNumber]);

  const genderPicMap = {
    Female: FemaleSvg,
    Male: MaleSvg,
    Unknown: UnknownSvg,
  };

  const characterStatusPic = {
    Alive: AliveSvg,
    Dead: DeadSvg,
  };

  return (
    <>
      <div className="container">
        <h1 className="container-title">
          Rick & Morty API<span>By Fede Deniard</span>
        </h1>
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

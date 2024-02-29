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

  useEffect(() => {
    getCharacters(pageNumber);
    console.log(pageNumber);
    if (pageNumber < 1) {
      setPageNumber(1);
    } else if (apiInfo && apiInfo.info && apiInfo.info.pages) {
      if (pageNumber > apiInfo.info.pages) {
        setPageNumber(apiInfo.info.pages);
      }
    }
  }, [pageNumber]);

  const getCharacterGenderPic = (gender) => {
    if (gender === "Female") {
      return FemaleSvg;
    } else if (gender === "Male") {
      return MaleSvg;
    } else {
      return UnknownSvg;
    }
  };

  const getCharacterStatusPic = (status) => {
    if (status === "Alive") {
      return AliveSvg;
    } else {
      return DeadSvg;
    }
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
                  characterStatusPic={getCharacterStatusPic(character.status)}
                  characterSpecie={character.species}
                  characterLastKnown={character.location.name}
                  characterGender={getCharacterGenderPic(character.gender)}
                />
              ))}
            </>
          )}
        </div>
        <div className="container-buttons">
          <button onClick={() => changePage(-1)}>Prev Page</button>
          <span>{pageNumber}</span>
          <button onClick={() => changePage(+1)}>Next Page</button>
        </div>
      </div>
    </>
  );
}
export default App;

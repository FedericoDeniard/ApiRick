import "./character.css";
import female from "/images/Female.svg";

const Character = ({
  characterName,
  characterImg,
  characterGender,
  characterStatus,
  characterStatusPic,
  characterSpecie,
  characterLastKnown,
}) => {
  return (
    <div className="card">
      <h4>
        {characterName}
        <img className="gender" src={characterGender} />
      </h4>
      <img className="character-pic" src={characterImg} />
      <div className="character-info">
        <p>
          Status:{" "}
          <span>
            {characterStatus}
            <img className="character-info__pic" src={characterStatusPic} />
          </span>
        </p>
        <p>
          Specie: <span>{characterSpecie}</span>
        </p>
        <p>
          Location: <span>{characterLastKnown}</span>
        </p>
      </div>
    </div>
  );
};
export default Character;

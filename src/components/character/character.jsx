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
        <p className="character-info__status">
          Status: {characterStatus}
          <img
            className="character-info__status-pic"
            src={characterStatusPic}
          />
        </p>
        <p>Specie: {characterSpecie}</p>
        <p>Location: {characterLastKnown}</p>
      </div>
    </div>
  );
};
export default Character;

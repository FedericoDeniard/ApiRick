import "./character.css";

const Character = ({
  characterName,
  characterImg,
  characterGender,
  characterStatus,
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
          <img className="character-info__status-pic" />
        </p>
        <p>Specie: {characterSpecie}</p>
        <p>Location: {characterLastKnown}</p>
      </div>
    </div>
  );
};
export default Character;

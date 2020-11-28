import { useState } from "react";
import PropTypes from "prop-types";
import { FaHeartbeat, FaSkullCrossbones } from "react-icons/fa";
import "./CharacterCard.scss";

const CharacterCard = (props) => {
  const [flipped, setFlipped] = useState(false);
  const { character } = props;
  return (
    <div
      className="characterCard-container"
      onClick={() => setFlipped(!flipped)}
    >
      <div className={`characterCard ${flipped ? "is-flipped" : ""}`}>
        <div className="characterCard__face characterCard__face--front">
          <img
            src={character.img}
            alt={character.name}
            className="characterCard-img"
          />
          <div className="characterCard-info">
            <p>
              {character.name}
              {character.status === "Alive" ? (
                <FaHeartbeat className="characterCard-icon" />
              ) : (
                <FaSkullCrossbones className="characterCard-icon" />
              )}
            </p>
          </div>
        </div>
        <div className="characterCard__face characterCard__face--back">
          <p>{character.name}</p>
          <div>
            <p>Nickname:</p>
            <p>{character.nickname}</p>
          </div>
          <div>
            <p>Birthday:</p>
            <p>{character.birthday}</p>
          </div>
          <div>
            <p>Status:</p>
            <p>{character.status}</p>
          </div>
          <div>
            <p>Occupation:</p>
            <p>{character.occupation.join(", ")}</p>
          </div>
          <div>
            <p>Portrayed by:</p>
            <p>{character.portrayed}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

CharacterCard.propTypes = {
  character: PropTypes.shape({
    char_id: PropTypes.number,
    name: PropTypes.string,
    birthday: PropTypes.string,
    occupation: PropTypes.arrayOf(PropTypes.string),
    img: PropTypes.string,
    status: PropTypes.string,
    nickname: PropTypes.string,
    appearance: PropTypes.arrayOf(PropTypes.number),
    portrayed: PropTypes.string,
    category: PropTypes.string,
    better_call_saul_appearance: PropTypes.arrayOf(PropTypes.number),
  }).isRequired,
};
export default CharacterCard;

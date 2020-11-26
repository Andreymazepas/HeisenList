import React from 'react';
import PropTypes from 'prop-types';

const CharacterCard = (props) => {
    
    const { character } = props;
    return (
        <div  style={{width: '350px', height: '200px', border: '1px solid black', display: 'flex'}}>
            <div>
                <img style={{width: '140px', height: '160px', objectFit: 'cover'}} src={character.img} alt="pfp" />
            </div>
            <div style={{overflow: 'auto'}}>
                { JSON.stringify(character)}
            </div>
        </div>
    )
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
        better_call_saul_appearance: PropTypes.arrayOf(PropTypes.number)
    }).isRequired
}
export default CharacterCard;
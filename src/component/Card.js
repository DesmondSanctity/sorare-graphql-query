import React from "react";
import "./Card.css";
function Card({ card, rarity }) {
  console.log(card,rarity)
  let color=""
  let text=""
  if(rarity === 'rare'){
    color = "#1E2791 "
  }
  if(rarity === 'limited'){
    color = "#FDF161"
    text = "black"
  }
  if(rarity === 'super_rare'){
    color = "#AD1010"
  }
  if(rarity === 'common'){
    color = "#C9D7DD"
    text = "black"
  }
  if(rarity === 'unique'){
    color = "#302E30"
  }
  return (
    <div className="card-container" style={{backgroundColor: `${color}`}}>
      <div className="card-player-img">
        <img src={card.player.pictureUrl} />
      </div>
      <div className="cover" style={{background: `linear-gradient(rgba(255, 255, 255, 0.001) 1%, ${color}, ${color}, ${color}, ${color} 80%)`}}></div>
      <div className="card-top">
        <div className="card-top-left">
          <p className="season" style={text ? {color: `${text}`} : {}}>{card.season.name}</p>
          <p className="rarity" style={text ? {color: `${text}`} : {}}>{card.rarity}</p>
        </div>
        <div className="card-top-right">
          <div className="club-logo">
            <img src={card.player.activeClub.pictureUrl} />
          </div>
          <p className="rarity" style={text ? {color: `${text}`} : {}}>{card.shirtNumber}</p>
        </div>
      </div>

      <div className="card-bottom">
        <div className="card-bottom-title">
          <h1 style={text ? {color: `${text}`} : {}}>{card.player.firstName} {card.player.lastName}</h1>
        </div>
        <div className="card-info">
          <div className="age">
            <p className="header" style={text ? {color: `${text}`} : {}}>Age</p>
            <p className="value" style={text ? {color: `${text}`} : {}}>{card.age}</p>
          </div>
          <div className="position">
            <p className="header" style={text ? {color: `${text}`} : {}}>position</p>
            <p className="value" style={text ? {color: `${text}`} : {}}>{card.position}</p>
          </div>
          <div className="country">
            <p className="header" style={text ? {color: `${text}`} : {}}>country</p>
            <div className="country-logo">
              <img src={card.player.country.flagUrl} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;

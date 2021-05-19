import React, {useState, useRef, useEffect} from 'react';
import Card from './card';
import './deck.css';
import axios from "axios";

const baseURL = "https://deckofcardsapi.com/api/deck";

function Deck() {
  const [deck, setDeck] = useState(null);
  const [draw, setDraw] = useState([]);
  const [newCard,setNewCard] = useState(false);
  const timer = useRef(null);

  useEffect(() => {
    // new deck
    async function Data() {
      let myDeck = await axios.get(`${baseURL}/new/shuffle/`)
      setDeck(myDeck.data);
    }
    Data();
  }, [setDeck]);

  useEffect(() => {
    // draw a card 
    async function getCard() {
      let {deck_id} = deck;
      try { 
          let dRes = await axios.get(`${baseURL}/${deck_id}/draw/`);
          console.log(dRes)
          if ( dRes.data.remaining === 0) {
              setNewCard(false);
              throw new Error("All cards used");
          }
          const card = dRes.data.cards[0];
          setDraw(dr => [ ...dr, {
                  id: card.code,
                  name: card.value + " " + card.suit,
                  image: card.image
              } ]);
      } catch(err) {
          alert(err);
      }
    }

    if (newCard && !timer.current) {
        timer.current = setInterval(async () => {
           await getCard();
          }, 1000);
    }
    return () => {
        clearInterval(timer.current);
        timer.current = null;
      }
    }, [newCard, setNewCard, deck]);
  
    const toggleDrawCard = () => {
      setNewCard(nC => !nC);
    };

    const cards = draw.map(c => (
        <Card key={c.id} name={c.name} image={c.image} />
        ));
//  To check if axios works and to test the objects
//    async function testing() {
//     let res = await axios.get(`${baseURL}/new/shuffle/`)
//         console.log(res.data)
//         console.log(res.data.deck_id)
//         let {deck_id} = res.data
//         let x = await axios.get(`${baseURL}/${deck_id}/draw`)
//         console.log(x)
//     };
//     testing();

    return (
        <div className="Deck">
            {/* once cards are finished hide button */}
          {deck ? (
            <button className="btn" onClick={toggleDrawCard}>
              {newCard ? 'stop' : 'start drawing cards' } 
            </button>
          ) : null}
          <div className="Card-Space">{cards}</div>
        </div>
    )
  }

export default Deck;
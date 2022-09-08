import { React, useEffect } from 'react';
import { useQuery, gql, useLazyQuery } from '@apollo/client';
import { Link, useLocation } from 'react-router-dom';
import {
    useSpring,
    animated,
} from 'react-spring';

export default function Cards(cardsData) {
    // console.log(cardsData)
    //access location object
    const location = useLocation();

    //access the slugs in the pathname
    const urlSlug = location.pathname.split('/')[2];

    // split the string into an array of strings
    const slugs = urlSlug.split(',');

    //create dynamic query which reads from pathname
    const CARDS_QUERY = gql`
  query cards ($slugs: [String!]) {
    cards(slugs: $slugs) {
        name
        age
        position
        rarity
        createdAt
        shirtNumber
        slug
        season {
            name
        }
        player {
            pictureUrl
            firstName
            lastName
            activeClub{
                pictureUrl
            }
        }
    }
}
  `;

    const [getCards, { loading, error, data }] = useLazyQuery(CARDS_QUERY, {
        variables: { slugs },
    });


    const propsFadeIn = useSpring({
        from: { opacity: 0 },
        to: { opacity: 1 },
        delay: 2000,
        config: { duration: 1000 },
    });
    const propsFadeOut = useSpring({
        from: { opacity: 1 },
        to: { opacity: 0 },
        delay: 2000,
        config: { duration: 1000 },
    });

    return (
        <>
            <main className="container">

                <p style={{ color: 'white', margin: '8px 0 32px 0', fontWeight: 400 }}>
                    Card details fetched from the URL slug in the address bar.
                </p>

                <section
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    {data?.cards ? (
                        <animated.div style={propsFadeIn}>
                            <div className="wrapper" style={{ display: 'flex' }}>
                                {data.cards.map((card, ind) => (
                                <>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', height: '150px', width: '220px', borderRadius: '4px', border: '1px solid white', margin: '8px' }} key={ind}>
                                        <div>
                                            <p className="small">First Name: {card.player.firstName}</p>
                                            <p className="small">Last Name: {card.player.lastName}</p>
                                            <p className="small">Age: {card.age}</p>
                                            <p className="small">Position: {card.position}</p>
                                            <p className="small">Rarity: {card.rarity}</p>
                                            <p className="small">Shirt Number: {card.shirtNumber}</p>
                                        </div>
                                        <img
                                            style={{ width: '50px', height: '50px', margin: '8px' }}
                                            src={card.player.activeClub.pictureUrl}
                                            alt="card"
                                        />
                                    </div>
                                </>
                                ))}
                            </div>
                        </animated.div>
                    ) : (
                        <animated.div style={data ? propsFadeOut : null}>
                            <div
                                className={'wrapper'}
                                style={{ display: 'flex' }}
                            >
                                {slugs.map((card, ind) => (
                                    <div style={{ height: '200px' }} key={ind}>
                                        <div
                                            style={{
                                                width: '220px',
                                                height: '150px',
                                                margin: '8px',
                                                background: '#ed95f5',
                                                borderRadius: '4px',
                                                display: 'grid',
                                                placeItems: 'center',
                                                color: '#fff',
                                            }}
                                            alt="card"
                                        >
                                            {/* run GQL query on click */}
                                            <p
                                                onClick={() => {
                                                    getCards();
                                                }}>Click Below to Reveal
                                            </p>
                                        </div>

                                    </div>
                                ))}
                            </div>
                        </animated.div>
                    )}
                </section>
            </main>
        </>
    );
}

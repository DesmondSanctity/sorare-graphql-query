import React from 'react';
import { useLazyQuery, gql } from '@apollo/client';
import { Link, useLocation } from 'react-router-dom';
import Card from './component/Card'
import {
    useSpring,
    animated,
} from 'react-spring';

export default function PictureCards() {
    //get the location/path/url
    const location = useLocation();

    //get the slugs from the url
    const urlSlug = location.pathname.split('/')[2];

    // split the slugs into an array of strings
    const slugs = urlSlug.split(',');

    //graphql query for Card
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
              country{
                flagUrl
                code
                id
              }
            }
        }
    }
  `;

    const [getPictureUrl, { loading, data }] = useLazyQuery(CARDS_QUERY, {
        variables: { slugs },
    });

    const propsFadeIn = useSpring({
        from: { opacity: 0 },
        to: { opacity: 1 },
        delay: 4000,
        config: { duration: 1000 },
    });
    const propsFadeOut = useSpring({
        from: { opacity: 1 },
        to: { opacity: 0 },
        delay: 4000,
        config: { duration: 1000 },
    });

    return (
        <>
            <main className="container">
                <h1>Card Page</h1>

                <p style={{ color: 'white', margin: '8px 0 32px 0', fontWeight: 400 }}>
                    Profile images according to the slugs in the address bar.
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
                                    <div style={{ height: '400px', margin: "10px" }} key={ind}>
                                        <Card card={card} rarity={card.rarity} />
                                        <p className="small">{card.name}</p>
                                    </div>
                                ))}
                            </div>
                        </animated.div>
                    ) : (
                        <animated.div style={loading && data ? propsFadeOut : null}>
                            <div
                                className={'wrapper'}
                                style={{ display: 'flex' }}
                            >
                                {slugs.map((card, ind) => (
                                    <div style={{ height: '400px' }} key={ind}>
                                        <div
                                            style={{
                                                width: '320px',
                                                height: '517px',
                                                margin: '10px',
                                                background: '#ed95f5',
                                                borderRadius: '8px',
                                                display: 'grid',
                                                placeItems: 'center',
                                                color: '#fff',
                                            }}
                                            alt="card"
                                        >
                                        </div>
                                        <p className="small">{card.name}</p>
                                    </div>
                                ))}
                            </div>
                        </animated.div>
                    )}
                </section>

                {/* <Cards /> */}

                <div className="buttonGroup">
                    <button
                        disabled={data ? true : false}
                        style={{
                            cursor: data ? 'not-allowed' : 'pointer',
                            color: data ? 'black' : 'white',
                            border: data ? '1px solid black' : '1px solid white',
                        }}
                        onClick={() => {
                            getPictureUrl();

                        }}
                    >
                        Reveal Cards
                    </button>

                    <Link style={{ margin: '32px' }} to="/">
                        <button>Home</button>
                    </Link>
                </div>
            </main>
        </>
    );
}

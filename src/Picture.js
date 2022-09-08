import React from 'react';
import { useLazyQuery, gql } from '@apollo/client';
import { Link, useLocation } from 'react-router-dom';
import Cards from './Cards'
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

    //graphql query for PictureUrl
    const PICTUREURL = gql`
    query getPictureUrl($slugs: [String!]) {
      cards(slugs: $slugs) {
        pictureUrl
        name
      }
    }
  `;

    const [getPictureUrl, { loading, data }] = useLazyQuery(PICTUREURL, {
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
                                    <div style={{ height: '400px' }} key={ind}>
                                        <img
                                            style={{ width: '220px', margin: '8px' }}
                                            src={card.pictureUrl}
                                            alt="card"
                                        />
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
                                                width: '220px',
                                                height: '356px',
                                                margin: '8px',
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

                <Cards />

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

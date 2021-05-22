import React, { useEffect, useState } from 'react';
import Header from "../../components/header"
import { GetAllListing } from "../../functions"
import Loader from "../../components/loader"
import ListingCard from "../../components/listingCard"
import "./styles.scss"

const Home = () => {

    const [ listing, setListing ] = useState([])

    useEffect(() => {
        GetAllListing()
        .then(res => setListing(res.items))
        .catch(err => console.log(err))
    }, [])

    return (
        <div className='home-container'>
            <Header page="all-listing"/>
            {listing.length === 0 ?
                <Loader/>
                :
                <section className="listing-container">
                    {listing.map((list) => (
                        <ListingCard key={list.id} list={list} page="all-listing"/>
                    ))}
                </section>
            }
        </div>
    );
}

export default Home;
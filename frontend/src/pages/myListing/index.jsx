import React, { useEffect, useState } from 'react';
import Header from "../../components/header"
import { GetMyListing } from '../../functions';
import ListingCard from "../../components/listingCard"
import Loader from "../../components/loader"
import "./styles.scss"

const MyListing = () => {

    const [ myListing, setMyListing ] = useState([])
    
    useEffect(() => {
        GetMyListing()
        .then(res => setMyListing(res.items))
        .catch(err => console.log(err))
    }, [])

    return (
        <div className='home-container'>
            <Header page="my-listing"/>
            {myListing.length === 0 ?
                <Loader/>
                :
                <section className="listing-container">
                    {myListing.map((list) => (
                        <ListingCard key={list.id} list={list} page="my-listing"/>
                    ))}
                </section>
            }
        </div>
    );
}

export default MyListing;
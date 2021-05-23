import React, { useEffect, useState } from 'react';
import Header from "../../components/header"
import { GetAllListing } from "../../functions"
import Loader from "../../components/loader"
import ListingCard from "../../components/listingCard"
import "./styles.scss"

const Home = () => {

    const [ listing, setListing ] = useState([])
    const [ isLoading, setIsLoading ] = useState(true)

    useEffect(() => getData(), [])

    const getData = () => {
        GetAllListing()
        .then(res => {
            setListing(res.items)
            setIsLoading(false)
        }).catch(err => console.log(err))
    }

    const handleCreate = reload => {
        if(reload) {
            setIsLoading(true)
            getData()
        }
    }

    return (
        <div className='home-container'>
            <Header page="all-listing" createListing={handleCreate}/>
            {isLoading ?
                <Loader/>
                :
                <>
                <h1>ALL LISTINGS</h1>
                <section className="listing-container">
                    {listing.map(list => <ListingCard key={list.id} list={list} page="all-listing"/>)}
                </section>
                </>
            }
        </div>
    );
}

export default Home;
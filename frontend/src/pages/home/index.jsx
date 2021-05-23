import React, { useEffect, useState, lazy, Suspense } from 'react';
import { GetAllListing } from "../../functions"
import ErrorBoundary from "../../errorBoundary"
import "./styles.scss"
const Loader =  lazy(() => import("../../components/loader"))
const Header =  lazy(() => import("../../components/header"))
const ListingCard =  lazy(() => import("../../components/listingCard")) 

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
            <Suspense fallback={() => <div>Loading...</div>}>
                <ErrorBoundary>
                    <Header page="all-listing" createListing={handleCreate}/>
                    {isLoading ?
                        <Loader/>
                        :
                        <>
                        <h1>ALL LISTINGS</h1>
                        <section className="listing-container">
                            {listing.map(list => <ListingCard  key={list.id} list={list} page="all-listing"/>)}
                        </section>
                        </>
                    }
                </ErrorBoundary>
            </Suspense>
        </div>
    );
}

export default Home;
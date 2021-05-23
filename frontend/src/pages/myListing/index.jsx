import React, { Suspense, useEffect, useState, lazy } from 'react';
import ErrorBoundary from "../../errorBoundary"
import { GetMyListing, Token } from '../../functions';
import Loader from "../../components/loader"
const Header =  lazy(() => import("../../components/header"))
const ListingCard =  lazy(() => import("../../components/listingCard")) 
const ConfirmationModal =  lazy(() => import("../../modals/confirmation"))
const EditListingModal =  lazy(() => import("../../modals/editListing"))

const MyListing = () => {

    const [ myListing, setMyListing ] = useState([])
    const [ isLoading, setIsLoading ] = useState(true)
    const [ deleteConfirmation, setDeleteConfirmation ] = useState(false)
    const [ edit, setEdit ] = useState(false)
    const [ activeItem, setActiveItem ] = useState(null)
    const token = localStorage.getItem("accessToken")

    useEffect(() => getData(token), [])

    const getData = (token) => {    
        GetMyListing(token)
        .then(res => {
            console.log(res, token)
            setIsLoading(false)
            setMyListing(res.items)
        }).catch(err => {
            if(err.status === 401){
                Token()
                .then(res => getData(res))
                .catch(err => console.log(err))
            }
        })
    }

    const handleDelete = item => {
        setActiveItem(item)
        setDeleteConfirmation(true)
    }

    const handleEdit = item => {
        setActiveItem(item)
        setEdit(true)
    }

    const handleEditModalClose = reload => {
        if(reload) {
            setIsLoading(true)
            setEdit(false)
            getData(token)
        } else setEdit(false)
    }

    const handleModalClose = reload => {
        if(reload) {
            setIsLoading(true)
            setDeleteConfirmation(false)
            getData(token)
        } else setDeleteConfirmation(false)
    }

    const handleCreate = reload => {
        if(reload) {
            setIsLoading(true)
            getData(token)
        }
    }

    return (
        <Suspense fallback={() => <Loader/>}>
            <ErrorBoundary>
                {deleteConfirmation && <ConfirmationModal closeModal={handleModalClose} id={activeItem.id}/>}
                {edit && <EditListingModal closeModal={handleEditModalClose} id={activeItem.id} quantity={activeItem.quantity} price={activeItem.price}/>}
                <div className='home-container'>
                    <Header page="my-listing" createListing={handleCreate}/>
                    {isLoading ?
                        <Loader/>
                        :
                        <>
                        <h1>MY LISTINGS</h1>
                        <section className="listing-container">
                            {myListing.map(list => <ListingCard key={list.id} list={list} page="my-listing" editListing={handleEdit} deleteListing={handleDelete}/>)}
                        </section>
                        </>
                    }
                </div>
            </ErrorBoundary>
        </Suspense>
    );
}

export default MyListing;
import React, { useEffect, useState } from 'react';
import Header from "../../components/header"
import { GetMyListing } from '../../functions';
import ListingCard from "../../components/listingCard"
import Loader from "../../components/loader"
import { ConfirmationModal, EditListingModal } from "../../modals"
import "./styles.scss"

const MyListing = () => {

    const [ myListing, setMyListing ] = useState([])
    const [ isLoading, setIsLoading ] = useState(true)
    const [ deleteConfirmation, setDeleteConfirmation ] = useState(false)
    const [ edit, setEdit ] = useState(false)
    const [ activeItem, setActiveItem ] = useState(null)
    
    useEffect(() => getData(), [])

    const getData = () => {
        GetMyListing()
        .then(res => {
            setIsLoading(false)
            setMyListing(res.items)
        }).catch(err => console.log(err))
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
            getData()
        } else setEdit(false)
    }

    const handleModalClose = reload => {
        if(reload) {
            setIsLoading(true)
            setDeleteConfirmation(false)
            getData()
        } else setDeleteConfirmation(false)
    }

    const handleCreate = reload => {
        if(reload) {
            setIsLoading(true)
            getData()
        }
    }

    return (
        <>
            {deleteConfirmation && <ConfirmationModal closeModal={handleModalClose} id={activeItem.id}/>}
            {edit && <EditListingModal closeModal={handleEditModalClose} id={activeItem.id} quantity={activeItem.quantity} price={activeItem.price}/>}
            <div className='home-container'>
                <Header page="my-listing" createListing={handleCreate}/>
                {isLoading ?
                    <Loader/>
                    :
                    <section className="listing-container">
                        {myListing.map(list => <ListingCard key={list.id} list={list} page="my-listing" editListing={handleEdit} deleteListing={handleDelete}/>)}
                    </section>
                }
            </div>
        </>
    );
}

export default MyListing;
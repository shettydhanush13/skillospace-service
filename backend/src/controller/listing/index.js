const { generateQuery } = require("./helper")
const { updateDB } = require("../../db/postgres")

module.exports = {
    addListing : async (req, res) => {
        const { username, product_title, product_description, quantity, price } = req.body
        await updateDB(generateQuery.createListingTable())
        await updateDB(generateQuery.addListing(username, product_title, product_description, quantity, price))
        res.status(200).send({ message : "listing created" })
    },
    getAllListing : async (req, res) => {
        let response = await updateDB(generateQuery.getAllListing())
        res.status(200).send({ items : response.rows })
    },
    getMyListing : async (req, res) => {
        const { username } = req.body
        let response = await updateDB(generateQuery.getMyListing(username))
        res.status(200).send({ items : response.rows })
    },
    updateListing : async (req, res) => {
        const { username, quantity, price } = req.body
        const { listingId } = req.params
        let response = await updateDB(generateQuery.updateListing(listingId, username, quantity, price))
        if(response.rows.length === 0 ){
            return res.status(401).send({ message : "not authorized to update this listing" })
        } 
        res.status(200).send({ items : "update successful" })
    },
    deleteListing : async (req, res) => {
        const { username } = req.body
        const { listingId } = req.params
        let response = await updateDB(generateQuery.deleteListing(listingId, username))
        if(response.rows.length === 0 ){
            return res.status(401).send({ message : "not authorized to delete this listing" })
        } 
        res.status(200).send({ items : "delete successful" })
    }
}
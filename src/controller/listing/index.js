const { generateQuery } = require("./helper")
const { updateDB } = require("../../db/postgres")

module.exports = {
    addListing : async (req, res, next) => {
        try {
            const { username, product_title, product_description, quantity, price } = req.body
            await updateDB(generateQuery.createListingTable())
            await updateDB(generateQuery.addListing(username, product_title, product_description, quantity, price))
            res.status(200).send({ message : "listing created" })
        } catch(err) {
            next({status : 500, message : err.stack })
        }
    },
    getAllListing : async (req, res, next) => {
        try {
            const response = await updateDB(generateQuery.getAllListing())
            res.status(200).send({ items : response.rows })
        } catch(err) {
            next({status : 500, message : err.stack })
        }
    },
    getMyListing : async (req, res, next) => {
        try {
            const { username } = req.body
            const response = await updateDB(generateQuery.getMyListing(username))
            res.status(200).send({ items : response.rows })
        } catch(err) {
            next({status : 500, message : err.stack })
        }
    },
    updateListing : async (req, res, next) => {
        try {
            const { username, quantity, price } = req.body
            const { listingId } = req.params
            const response = await updateDB(generateQuery.updateListing(listingId, username, quantity, price))
            if(response.rows.length === 0) return next({status : 401, message : "unable to update this listing" })
            res.status(200).send({ items : "update successful" })
        } catch(err) {
            next({status : 500, message : err.stack })
        }
    },
    deleteListing : async (req, res, next) => {
        try {
            const { username } = req.body
            const { listingId } = req.params
            const response = await updateDB(generateQuery.deleteListing(listingId, username))
            if(response.rows.length === 0) return next({status : 401, message : "unable to delete this listing" })
            res.status(200).send({ items : "delete successful" })
        } catch(err) {
            next({status : 500, message : err.stack })
        }
    }
}
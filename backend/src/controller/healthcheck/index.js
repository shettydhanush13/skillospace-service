module.exports = {
    healthcheck: (req, res) => {
        res.json({ message: "server is healthy" });
    },
}
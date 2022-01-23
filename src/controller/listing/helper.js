const generateQuery = {
    createListingTable : () => `CREATE TABLE IF NOT EXISTS listing (
        id serial primary key,
        user_name varchar(50) REFERENCES users (user_name) ON DELETE CASCADE,
        product_title varchar(500) NOT NULL,
        product_description varchar(5000) NOT NULL,
        quantity INT NOT NULL,
        price INT NOT NULL
      )`,
    addListing : (username, product_title, product_description, quantity, price) => `INSERT INTO listing (user_name, product_title, product_description, quantity, price) VALUES 
        ('${username}', '${product_title}', '${product_description}', ${quantity}, ${price})`,
    getAllListing : () => `SELECT * FROM listing`,
    getMyListing : username => `SELECT * FROM listing WHERE user_name = '${username}'`,
    updateListing : (id, username, quantity, price) => `UPDATE listing SET quantity = ${quantity}, price = ${price} WHERE (id = '${id}') AND (user_name = '${username}') returning id`,
    deleteListing : (id, username) => `DELETE FROM listing WHERE (id = '${id}') AND (user_name = '${username}') returning id`
}

module.exports = { generateQuery }
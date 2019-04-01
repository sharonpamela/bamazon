let mysql = require("mysql");
let inquirer = require("inquirer");

let connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "database/4u",
    database: "bamazon"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    displayProducts();
});


function displayProducts() {
    console.log("Retrieving current inventory...");
    connection.query("SELECT item_id AS ID,product_name AS Product, price AS Price, stock_quantity AS Available FROM products", function (err, res) {
        if (err) throw err;
        // format the data into a table
        console.log("---------------------------------------------------------");
        console.log("|  " + 'ID'.padEnd(5) + "| " + 'Product'.padEnd(20) + "|  " + 'Price'.padEnd(5) + "|  " + "Available QTY".padEnd(15) + "|  ");
        console.log("---------------------------------------------------------");
        for (let i = 0; i < res.length; i++) {
            let id = res[i].ID.toString().padEnd(5);
            let prod = res[i].Product.toString().padEnd(20);
            let p = res[i].Price.toString().padEnd(5);
            let avail = res[i].Available.toString().padEnd(15);
            console.log("|  " + id + "| " + prod + "|  " + p + "|  " + avail + "|  ");
        }
        console.log("--------------------------------------------------------- \n");
        mainFunc();
    });
}

function mainFunc() {
    inquirer
        .prompt([
            {
                type: "input",
                message: "Enter product ID: ",
                name: "item_id"
            },
            {
                type: "input",
                message: "How many units would you like to buy? ",
                name: "item_requested_qty"
            }
        ])
        .then(function (response) {

            let item_id = parseInt(response.item_id);
            let item_requested_qty = parseInt(response.item_requested_qty);
            let itemStockQty;
            let itemPrice;

            //object to validate input before proceeding.
            var validation = {
                isNotEmpty: function (str) {
                    var pattern = /\S+/; // match one or more spaces
                    return pattern.test(str);  // returns a boolean
                },
                isNumber: function (str) {
                    var pattern = /^\d+$/; // match an integer num of any length
                    return pattern.test(str);  // returns a boolean
                },
                isLetter: function (str) {
                    var pattern = /[a-z]+/; // match a single char lowercase
                    return pattern.test(str);
                }
            };

            if (validation.isNotEmpty(response.item_id) && validation.isNotEmpty(response.item_requested_qty) && validation.isNumber(response.item_id) && validation.isNumber(response.item_requested_qty)) {

                // check the amount vailable for product selected before processing trans
                let currStock;
                let currPrice;
                Database.execute(config,
                    database => database.query(`SELECT stock_quantity FROM products WHERE item_id = ${response.item_id}`)
                        .then(stock => {
                            currStock = stock;
                            return database.query(`SELECT price FROM products WHERE item_id = ${response.item_id}`)
                        })
                        .then(price => {
                            currPrice = price;
                        })
                ).then(() => {
                    // do all calculations here
                    if (currStock <= 0) {
                        console.log("Sorry, we are out of stock on this item. Please check back later.");
                    } else if (currStock < item_requested_qty) {
                        console.log(`We have ${currStock} of this item left in stock and you are trying to order ${item_requested_qty}. Please reduce your requested qty and try again. `)
                    } else if (currStock >= item_requested_qty) {

                        //fullfill the order by reducing DB stock
                      



                    } // end "if" for fullfill order

                }).catch(err => {
                    // handle the error
                });

            } else {
                console.log("Please enter a valid number for product ID and/or Product Qty");
                connection.end();
            }
        });
}//end main


let newStockQty = itemStockQty - item_requested_qty;
connection.query(`UPDATE products SET stock_quantity= ${newStockQty} WHERE item_id= ${response.item_id}`,
    function (err, res) {
        if (err) throw err;
        //show the customer the total cost of their purchase.
        let total = (item_requested_qty * itemPrice).toFixed(2); // 2 decimal places float
        console.log(`Your total is $${total}. Thank you for your purchase! `);
        // update the products column with the sale just processed
        let oldTotalSales = res;
        console.log("old sales: " + (oldTotalSales));
        let updatedTotalSales = oldTotalSales + newSale;

        connection.query(
            `UPDATE products SET product_sales = ${updatedTotalSales} WHERE item_id = ${response.item_id}`,
            function (err, res) {
                if (err) throw err;
            });
    });




let newStockQty = itemStockQty - item_requested_qty;
let updatedTotalSales;
Database.execute( config,
    database => database.query(`UPDATE products SET stock_quantity= ${newStockQty} WHERE item_id= ${response.item_id}`)
    .then( (rows) => {
        someRows = rows;
        return database.query( 'SELECT * FROM other_table' )
    } )
    .then( rows => {
        otherRows = rows;
    } )
).then( () => {
    // do something with someRows and otherRows
} ).catch( err => {
    // handle the error
} );


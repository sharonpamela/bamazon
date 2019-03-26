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
    connection.query("SELECT item_id AS ID,product_name AS Product, price AS Price FROM products", function (err, res) {
        if (err) throw err;
        //console.log(res);
        //   sample: [ 
        //   RowDataPacket { item_id: 1, product_name: 'nerdy tshirts', price: 14.5 },
        //   RowDataPacket { item_id: 2, product_name: 'nature tshirts', price: 12.5 },
        //   RowDataPacket { item_id: 3, product_name: 'adventure tshirts', price: 10.2 }
        //   ]

        // format the data into a table
        console.log("-------------------------------------------------");
        console.log("|  ID  |   Product         |   Price    |");
        console.log("-------------------------------------------------");
        for (let i = 0; i < res.length; i++) {
            console.log("|  " + res[i].ID + "  |  " + res[i].Product + "           |         " + res[i].Price + "     |");
        }
        mainFunc();
    });
}

function mainFunc() {
    inquirer
        .prompt([
            // {
            //     type: "list",
            //     choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"],
            //     message: "Select desired option: ",
            //     name: "mainMenu"
            // }
            {
                type: "input",
                message: "Enter the ID of the product you would like to purchase.",
                name: "item_id"
            },
            {
                type: "input",
                message: "How many units would you like to buy?",
                name: "item_requested_qty"
            }
        ])
        .then(function (response) {
            let item_id = parseInt(response.item_id);
            let item_requested_qty = parseInt(response.item_requested_qty);
            let itemStockQty;
            let itemPrice;

            // check the amount vailable for product selected
            // get the amount vailable for product selected
            connection.query("SELECT * FROM products WHERE ?",
                {
                    item_id: response.item_id
                },
                function (err, res) {
                    if (err) throw err;
                    itemStockQty = parseInt(res[0].stock_quantity);
                    itemPrice = parseFloat(res[0].price);
                    
                    if (itemStockQty <= 0) {
                        console.log("Sorry, we are out of stock on this item.");
                    } else if (itemStockQty < item_requested_qty) {
                        console.log(`We have ${itemStockQty} items left in stock for this and you are trying to order ${item_requested_qty}. Please reduce your requested qty and try again. `)
                    } else {
                        //fullfill the order by reducing DB stock
                        stockUpdate(item_id, item_requested_qty);
                        //show the customer the total cost of their purchase.
                        let total = item_requested_qty * itemPrice;
                        console.log(`Your total is $${total}. Thank you for your purchase! `);
                    }
                    connection.end();
                });
        });
}//end main

function stockUpdate(id, qty) {
    let updateQ = connection.query(
        "UPDATE products SET ? WHERE ?",
        [
            {
                stock_quantity: qty
            },
            {
                item_id: id
            }
        ],
        function (err, res) {
            if (err) throw err;
            //console.log(res);
        }
    );
    //console.log(updateQ);
}


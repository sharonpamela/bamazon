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
    mainFunc();
});



function mainFunc() {
    inquirer
        .prompt([
            {
                type: "list",
                choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"],
                message: "Select desired option: ",
                name: "mainMenu"
            }
        ])
        .then(function (response) {
            switch (response.mainMenu) {
                case "View Products for Sale":
                    // displays all products for sale regardless of current stock availability
                    displayProducts();
                    break;
                case "View Low Inventory":
                    // lists all items with an inventory count lower than five.
                    checkLowInventory();
                    break;
                case "Add to Inventory":
                    // "add more" of any item currently in the store.
                    addInventory();
                    break;

                case "Add New Product":
                    // allow the manager to add a completely new product to the store.
                    break;

                default:
                // code block
            }

        });
}//end main

function displayProducts() {
    console.log("Retrieving current products for sale...");
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
        connection.end();
    });
}

function checkLowInventory() {
    console.log("Retrieving products with inventory < 5 ...");
    let q  = connection.query("SELECT * FROM products WHERE stock_quantity < 5",
        function (err, res) {
            if (err) throw err;
            console.log("-------------------------------------------------");
            console.log("|  " + 'ID'.padEnd(5) + "| " + 'Product Name'.padEnd(20) + "|  " + "Available QTY".padEnd(15) + "|  ");
            console.log("-------------------------------------------------");
            for (let i = 0; i < res.length; i++) {
                let itemID = res[i].item_id.toString().padEnd(5);
                let itemName = res[i].product_name.toString().padEnd(20);
                let itemStockQty = res[i].stock_quantity.toString().padEnd(15);
                console.log("|  " + itemID + "| " + itemName + "|  " + itemStockQty + "|  ");
            }
            console.log("------------------------------------------------- \n");
          
            connection.end();
        });
}

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
    console.log(updateQ);
}


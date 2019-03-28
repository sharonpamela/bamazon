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
                choices: ["View Products for Sale", "View Low Inventory", "Update Current Inventory", "Add New Product"],
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

                case "Update Current Inventory":
                    // add more to (AKA update) any item currently in the store.
                    inventoryUpdate();
                    break;

                case "Add New Product":
                    // allow the manager to add a completely new product to the store.
                    break;

                default:
                // code block
            }
        });
}//end main

//constructor to validate input before proceeding.
let validation = {
    isNotEmpty: function (str) {
        var pattern = /\S+/;
        return pattern.test(str);  // returns a boolean true if not empty
    },
    isNumber: function (str) {
        var pattern = /^\d+$/;
        return pattern.test(str);  // returns a boolean
    }
};

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
    let q = connection.query("SELECT * FROM products WHERE stock_quantity < 5",
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

function inventoryUpdate() {
    inquirer
        .prompt([
            {
                type: "input",
                message: "Enter product ID to update: ",
                name: "item_id"
            },
            {
                type: "list",
                message: "What action would you like to take on this product? ",
                choices: ["Edit Product Name", "Edit Product Price", "Edit product Stock Qty", "Delete Item", "Quit with no Changes"],
                name: "choices"
            }
        ])
        .then(function (response) {

            let item_id;
            let action = response.choices;

            if (validation.isNotEmpty(response.item_id) && validation.isNotEmpty(response.item_id)) {

                item_id = parseInt(response.item_id);

                switch (action) {
                    case "Edit Product Name":
                        editProdName(item_id);
                        break;

                    case "Edit Product Price":
                        editProdPrice(item_id);
                        break;

                    case "Edit Product Stock Qty":
                        editProdStock(item_id);
                        break;

                    case "Delete Item":
                        deleteProd(item_id);
                        break;

                    case "Quit with no Changes":
                        console("No changes were made.")
                        break;
                }
            } else {
                console.log("Please enter a valid number for product ID.");
                connection.end();
            }
        });
}

function editProdName(item_id) {
    inquirer.prompt([
        {
            message: "Enter new Product name: ",
            type: "input",
            name: "name"
        }
    ]).then(function (res) {
        if (validation.isNotEmpty(res)) {
            let newName = res.name;
            connection.query(
                "UPDATE products SET ? WHERE ?",
                [
                    {
                        product_name: newName
                    },
                    {
                        item_id: item_id
                    }
                ],
                function (err, res) {
                    if (err) throw err;
                    console.log(`Product ${newName} has been updated.`);
                    connection.end();
                }
            );//end db connection query
        } else {
            console.log("Please enter a non-empty new name for the product.")
        }
    }
    );// end inquirer

}

function editProdStock(item_id) {
    inquirer.prompt([
        {
            message: "Enter new stock qty for this product: ",
            type: "input",
            name: "qty"
        }
    ]).then(function (res) {
        if (validation.isNotEmpty(res)) {
            let newQty = res.qty;
            connection.query(
                "UPDATE products SET ? WHERE ?",
                [
                    {
                        stock_quantity: newQty
                    },
                    {
                        item_id: item_id
                    }
                ],
                function (err, res) {
                    if (err) throw err;
                    console.log(`Product Qty has been updated to ${newQty} .`);
                    connection.end();
                }

            );//end db connection query
        } else {
            console.log("Please enter a valid new qty for the stock of this product.")
        }
    });// end inquirer
}

function editProdStock(item_id) {

}

function deleteProd(item_id) {

}


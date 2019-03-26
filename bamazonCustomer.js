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
        for (let i=0; i<res.length;i++){
            console.log("|  "+ res[i].ID + "  |  " +res[i].Product+ "           |         "+res[i].Price +"     |");
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
                name: "item_qty"
            }
        ])
        .then(function (response) {
            // console.log(response.item_id);
            // console.log(response.item_qty);

            // get the amount vailable for product selected
            connection.query("SELECT stock_quantity FROM products WHERE ?",
            {
                item_id: response.item_id;
            },
            function(err, res){

            });   
            7. Once the customer has placed the order, your application should check if your store has enough of the product to meet the customer's request.

   * If not, the app should log a phrase like `Insufficient quantity!`, and then prevent the order from going through.

8. However, if your store _does_ have enough of the product, you should fulfill the customer's order.
   * This means updating the SQL database to reflect the remaining quantity.
   * Once the update goes through, show the customer the total cost of their purchase.
            connection.end();
        });
}
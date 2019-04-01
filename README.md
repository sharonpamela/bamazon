# Bamazon

This application is a mySQL based storefront that takes in orders from customers and deplete stock from the store's inventory. 


If you haven't written a markdown file yet, [click here for a rundown](https://guides.github.com/features/mastering-markdown/), or just take a look at the raw file of these instructions.

### Phase #1: Customer View

1. The app reads the inventory from a MySQL Database called `bamazon` constaining the following columns:

   * item_id (unique id for each product)

   * product_name (Name of product)

   * department_name

   * price (cost to customer)

   * stock_quantity (how much of the product is available in stores)

2. Node application called `bamazonCustomer.js` displays all of the items available for sale. Include the ids, names, and prices of products for sale.

3. The app prompts users with two messages:

   * The ID of the product they would like to buy.
   * How many units of the product they would like to buy.

4. Once the customer has placed the order, the application checks if your store has enough of the product to meet the customer's request.

   * If not, the app informs the customer and prevents the order from going through.

   * If the store _does_ have enough of the product, the customer's order gets fullfilled, the SQL database is updated to reflect the remaining quantity and the customer's total cost of their purchase is displayed.


### Phase #2: Manager View

1. The Node application called `bamazonManager.js` lists a set of menu options:

    * View Products for Sale
    
    * View Low Inventory
    
    * Add to Inventory
    
    * Add New Product

2. If a manager selects `View Products for Sale`, the app lists every available item: the item IDs,names, prices, and quantities.

3. If a manager selects `View Low Inventory`, then it lists all items with an inventory count lowerthan five.

4. If a manager selects `Add to Inventory`, it displays a prompt that will let the manager "addmore" of any item currently in the store.

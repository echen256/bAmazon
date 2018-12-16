var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",

    port: 3306,

    user: "root",

    password: "q",
    database: "bAmazon_db"
});


connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    main();
});

function main() {
    connection.query("SELECT * FROM items", function (err, res) {
        prompt(res);
    });
}

function prompt(items){
    console.log(items);
    inquirer.prompt([
        {
            name: "item_id",
            message: "ID of the item?",
            validate: function (value) {
                console.log
                if (! isNaN(value) && value > 0 && value <= items.length) {
                    return true;
                }
                return false;
            }

        },

        {
            name: "quantity",
            message: "How many units?",
            validate: function (value) {
                if (isNaN(value) === false) {
                    return true;
                }
                return false;
            }
        }


    ]).then(function (order) {
        var item = items[order.item_id]; 
        updateInventory(item, order);
    });
}

function updateInventory (item, order){

    var quantity = parseInt(item.quantity);
    var amountReq = parseInt(order.quantity);
    var newQuantity = quantity - amountReq ;
    if (newQuantity < 0 ){
        console.log("************************************************************************************************************")
        console.log("Not enough to furfill order");
        console.log("************************************************************************************************************")
    } else {
        connection.query("UPDATE items SET quantity = " + newQuantity + " WHERE item_id = " + item.item_id,
        function(err) {
          if (err) throw err;
          console.log("************************************************************************************************************")
          console.log("Your order was executed successfully!");
          console.log("Total was " + amountReq + " units of " + item.product_name + " for a total of " + amountReq * item.price);
          console.log("************************************************************************************************************")
        });
    }
   main();
}
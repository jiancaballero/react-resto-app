const e = require("express");
const fs = require("fs");

const addItem = (req, res) => {
  //data from frontend
  const newItem = req.body;
  //get current contents of json files
  fs.readFile("./routes/data.json", (err, data) => {
    if (err) {
      res.send(err.message);
    } else {
      // to make the contents readable
      const parseData = JSON.parse(data);
      //data from JSON file
      parseData.items.unshift(newItem);
    
      //   writes back to json
      //    JSON.stringyfy converts JSON to string
      fs.writeFile(
        "./routes/data.json",
        JSON.stringify(parseData, null, 2),
        (err) => {
          // checks if successfuly inserted to json file
          if (err) {
            res.send(err.message);
          } else {
            //   tells if data was sent successfully to backend
            res.send("Item successfully added");
          }
        }
      );
    }
  });
};
const updateItem = (req, res) => {
  fs.readFile("./routes/data.json", (err, data) => {
    if (err) {
      res.send(err.message);
    } else {
      const parseData = JSON.parse(data);

      const itemData = parseData.items;
      const cartData = parseData.cart;

      // updates item with the data from the body
      itemData.forEach((item) => {
        if (item.id === req.params.id) {
          item.name = req.body.name;
          item.category = req.body.category;
          item.price = req.body.price;
          item.image = req.body.image;
          item.description = req.body.description;
        }
      });
      // updates cart with the data from the body
      cartData.forEach(item=>{
        if (item.id === req.params.id) {
          item.name = req.body.name;
          item.category = req.body.category;
          item.price = req.body.price;
          item.image = req.body.image;
          item.description = req.body.description;
        }
      })

      // update json file
      fs.writeFile(
        "./routes/data.json",
        JSON.stringify(parseData, null, 2),
        (err) => {
          if (err) {
            res.send(err.message);
          } else {
            res.send("Item succesfully edited");
          }
        }
      );
    }
  });
};

// updates quantity of the selected item
const updateQuantity = (req, res) => {
  fs.readFile("./routes/data.json", (err, data) => {
    if (err) {
      res.send(err.message);
    } else {
      const parseData = JSON.parse(data);
      const itemData = parseData.items;
     
      itemData.forEach((item) => {
        if (item.id === req.params.id) {
          item.quantity = req.body.quantity;
        }
      });
      // updates the item data from json with the updated quantity
      parseData.items=itemData;
      fs.writeFile(
        "./routes/data.json",
        JSON.stringify(parseData, null, 2),
        (err) => {
          if (err) {
            res.send(err.message);
          } else {
            res.send("Quantity succesfully edited");
          }
        }
      );
    }
  });
};
const deleteItem = (req, res) => {
  fs.readFile("./routes/data.json", (err, data) => {
    if (err) {
      res.send(err.message);
    } else {
      const parseData = JSON.parse(data);
      const newItemList = parseData.items.filter(
        (item) => item.id !== req.params.id
      );
      const updatedCart = parseData.cart.filter(item=>{
        item.id !== req.params.id
      })
      parseData.items = newItemList;
      parseData.cart = updatedCart;
      fs.writeFile(
        "./routes/data.json",
        JSON.stringify(parseData, null, 2),
        (err) => {
          if (err) {
            res.send(err.message);
          } else {
            res.send("Item Deleted");
          }
        }
      );
    }
  });
};
const getItems = (req, res) => {
  fs.readFile("./routes/data.json", (err, data) => {
    if (err) {
      res.send(err.message);
    } else {
      res.send(data);
    }
  });
};
module.exports = {
  addItem,
  updateItem,
  deleteItem,
  getItems,
  updateQuantity,
};

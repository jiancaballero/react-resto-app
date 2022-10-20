const e = require("express");
const fs = require("fs");

const getCart = (req, res) => {
  fs.readFile("./routes/data.json", (err, data) => {
    if (err) {
      res.send(err);
    } else {
      res.send(data);
    }
  });
};

// adding items to cart 
const addCart = (req, res) => {
  fs.readFile("./routes/data.json", (err, data) => {
    if (err) {
      res.send(err.message);
    } else {
      const parseData = JSON.parse(data);

      // gets the selected item to be added to the cart
      const addedItem = parseData.items.find(
        (item) => item.id === req.params.id
      );

      // array of all cart IDs
      const cartIDs = parseData.cart.map((item) => item.id);

      // checks if the selected item exists in the cart already
      if (cartIDs.every((item) => item !== addedItem.id)) {
        const addedItemCopy = {
          ...addedItem,
          
        };
        parseData.cart.push(addedItemCopy);
      } else {
        parseData.cart.forEach((item) => {
          if (item.id === addedItem.id) {
            item.quantity += addedItem.quantity;
          }
        });
      }

      // reset quantity  of the selected item to 0
      parseData.items.forEach((item) => {
        if (item.id === addedItem.id) {
          item.quantity = 0;
        }
      });

      fs.writeFile(
        "./routes/data.json",
        JSON.stringify(parseData, null, 2),
        (err) => {
          if (err) {
            res.send(err.message);
          } else {
            res.send("Item added to cart successfully");
          }
        }
      );

    }
  });
};

// updates quantity of selected item in the cart
const updateCartQuantity = (req, res) => {
  fs.readFile("./routes/data.json", (err, data) => {
    if (err) {
      res.send(err.message);
    } else {
      const parseData = JSON.parse(data);
      const cartData = parseData.cart;


      cartData.forEach((item) => {
        if (item.id === req.params.id) {
          item.quantity = req.body.quantity;
         
        }
      });

      fs.writeFile(
        "./routes/data.json",
        JSON.stringify(parseData, null, 2),
        (err) => {
          if (err) {
            res.send(err.message);
          } else {
            res.send("cart quantity updated");
          }
        }
      );
    }
  });
};
const deleteCart = (req, res) => {
  fs.readFile("./routes/data.json", (err, data) => {
    if (err) {
      res.send(err.message);
    } else {
      const parseData = JSON.parse(data);
      const cartData = parseData.cart.filter(
        (item) => item.id !== req.params.id
      );
      parseData.cart = cartData;
      console.log(parseData);
      fs.writeFile(
        "./routes/data.json",
        JSON.stringify(parseData, null, 2),
        (err) => {
          if (err) {
            res.send(err.message);
          } else {
            res.send("Item deleted from cart");
          }
        }
      );
    }
  });
};
module.exports = {
  addCart,
  getCart,
  updateCartQuantity,
  deleteCart,
};

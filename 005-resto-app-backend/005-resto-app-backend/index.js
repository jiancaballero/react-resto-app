const express = require("express");
const port = 8080;
const app = express();
const cors = require("cors");

// ROUTES
const itemRoute = require("./routes/items");
const cartRoute = require("./routes/cart");
app.use(cors());
app.use(express.json());
// ENDPOINTS
app.use("/api/items", itemRoute);
app.use("/api/cart", cartRoute);
app.listen(port, () => {
  console.log(`Express server running on port ${port}.`);
});

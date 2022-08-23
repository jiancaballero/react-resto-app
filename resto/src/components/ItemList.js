import { Tab, Box, Grid, Stack } from "@mui/material";
import React, { useState } from "react";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Link as RouterLink } from "react-router-dom";
import JoyLink from "@mui/joy/Link";
import Item from "./Item";
// import Items from "./Items";
const ItemList = ({ state, categories, dispatch,orderItems }) => {
  const [value, setValue] = useState("All");
  const handleChange = (e, newValue) => {
    setValue(newValue);
  };
  
  return (
    <div className="ItemList">
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList
            ariaLabel="Filter tabs"
            onChange={handleChange}
            // variant="scrollable"
            // scrollButtons="auto"
          >
            <Tab label="All" value="All" />
            {categories.map((category) => (
              <Tab label={category} value={category} />
            ))}
          </TabList>
        </Box>
        <TabPanel value="All">
          <Grid container spacing={2}>
            {state.items.map((item) => (
              <Grid item>
                <Item
                  state={state}
                  id={item.id}
                  name={item.name}
                  price={item.price}
                  quantity={item.quantity}
                  description={item.description}
                  image={item.image}
                  dispatch={dispatch}
                  orderItems={orderItems}
                />
              </Grid>
            ))}
          </Grid>
        </TabPanel>

        <Grid container>
          {state.items.map((item) => (
            <TabPanel value={item.category}>
              <Grid item>
                <Item
                  state={state}
                  id={item.id}
                  name={item.name}
                  price={item.price}
                  quantity={item.quantity}
                  description={item.description}
                  image={item.image}
                  dispatch={dispatch}
                  orderItems={orderItems}
                />
              </Grid>
            </TabPanel>
          ))}
        </Grid>
      </TabContext>
    </div>
  );
};

export default ItemList;

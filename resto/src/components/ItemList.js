import { Tab, Box, Grid, Stack } from "@mui/material";
import React, { useState } from "react";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Link as RouterLink } from "react-router-dom";
import JoyLink from "@mui/joy/Link";
import Item from "./Item";
// import Items from "./Items";
const ItemList = ({ state, categories, dispatch, orderItems, deleteItem }) => {
  const [value, setValue] = useState("All");
  const handleChange = (e, newValue) => {
    setValue(newValue);
  };
  console.log(state);
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
            {state.searchKey === "" ? (
              state.items.length > 0 ? (
                state.items.map((item) => (
                  <Grid item>
                    <Item
                      state={state}
                      id={item.id}
                      name={item.name}
                      price={item.price}
                      quantity={item.quantity}
                      description={item.description}
                      image={item.image}
                      category={item.category}
                      dispatch={dispatch}
                      orderItems={orderItems}
                      deleteItem={deleteItem}
                    />
                  </Grid>
                ))
              ) : (
                <h1>No Items </h1>
              )
            ) : state.searchResult.length ? (
              state.searchResult.map((item) => (
                <Grid item>
                  <Item
                    state={state}
                    id={item.id}
                    name={item.name}
                    price={item.price}
                    quantity={item.quantity}
                    description={item.description}
                    image={item.image}
                    category={item.category}
                    dispatch={dispatch}
                    orderItems={orderItems}
                    deleteItem={deleteItem}
                  />
                </Grid>
              ))
            ) : (
              <>
                <h1>No Result Found. </h1>
                <h2>Please type a name or category</h2>
              </>
            )}
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

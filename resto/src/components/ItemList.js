import { Tab, Box, Grid, Paper } from "@mui/material";
import React, { useState } from "react";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Link, useParams } from "react-router-dom";
import JoyLink from "@mui/joy/Link";
import Item from "./Item";
// import Items from "./Items";
const ItemList = ({ state, categories, dispatch }) => {
  const [value, setValue] = useState("All");
  const { category } = useParams();
  const handleChange = (e, newValue) => {
    setValue(newValue);
  };
  console.log(
    state.items
      .filter((item) => item.category === category)
      .map((item) => item.name)
  );
  return (
    <Paper elevation={8} sx={{margin:"2em 0"}}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList
            ariaLabel="Filter tabs"
            onChange={handleChange}
            variant="scrollable"
            scrollButtons="auto"
          >
            <Tab label="All" value="All" to={`/`} component={Link} />
            {categories.map((category) => (
              <Tab
                label={category}
                value={category}
                to={`/${category}`}
                component={Link}
              />
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
        <TabPanel value={category}>
          <Grid container spacing={2}>
            {state.searchKey === "" ? (
              state.items.length > 0 ? (
                state.items
                  .filter((item) => item.category === category)
                  .map((item) => (
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
                  />
                </Grid>
              ))
            ) : (
              <>
                <h1>No Result Found. </h1>
              </>
            )}
          </Grid>
        </TabPanel>
      </TabContext>
    </Paper>
  );
};

export default ItemList;

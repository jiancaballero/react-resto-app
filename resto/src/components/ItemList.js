import { Tab, Box, Grid, Paper } from "@mui/material";
import React, { useEffect, useState } from "react";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Link, useParams } from "react-router-dom";
import JoyLink from "@mui/joy/Link";
import Item from "./Item";
import Divider from "@mui/material/Divider";
// import Items from "./Items";
const ItemList = ({ state, categories, dispatch, category }) => {
  console.log(category)
  const [value, setValue] = useState(category);

  const handleChange = (e, newValue) => {
    setValue(newValue);
  };
  
  return (
    <Paper elevation={8} sx={{ margin: "2em 0" }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList
            ariaLabel="Filter tabs"
            onChange={handleChange}
            variant="scrollable"
            scrollButtons="auto"
          >
            {/* {category==="" ? <Tab label="All" value=""></Tab>:} */}
            {/* <Tab label={category} value={category}/> */}
            
            {categories.map((category) => (
              
              <Tab
                label={category}
                value={category}
                onClick={() =>
                  dispatch({
                    type: "FILTER_ITEMS",
                    payload: { name: category },
                  })
                }
                // to={`/${category}`}

                // component={Link}
              />
            ))}
          </TabList>
        </Box>
        
        <TabPanel value={category}>
         
          {state.searchResult.length ? (
              state.searchResult.map((item) => (
                <Grid item xs={2}>
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
                    ratings={item.ratings}
                  />
                </Grid>
              ))
            ) : (
              <>
                {state.searchKey&&<h1>No Result Found. </h1>}
              </>
            )}
            {!state.searchKey&&state.items.map((item) => (
            (item.category===category || category==="" ||category=="All")&&<Grid container spacing={2}>
               <Grid item xs={2}>
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
                ratings={item.ratings}
              />
            </Grid>
            </Grid>
           
          ))}
        </TabPanel>
        {/* <TabPanel value={category}>
          <Grid container spacing={2}>
            {state.searchKey === "" ? (
              state.items.length > 0 ? (
               
                  
              ) : (
                <h1>No Items </h1>
              )
            ) : state.searchResult.length ? (
              state.searchResult.map((item) => (
                <Grid item xs={2}>
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
                    ratings={item.ratings}
                  />
                </Grid>
              ))
            ) : (
              <>
                <h1>No Result Found. </h1>
              </>
            )}
          </Grid>
          <Divider />
        </TabPanel> */}
      </TabContext>
    </Paper>
  );
};

export default ItemList;

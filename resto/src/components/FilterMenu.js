import { Tab, Box } from "@mui/material";
import React, { useState } from "react";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Link as RouterLink } from "react-router-dom";

import JoyLink from "@mui/joy/Link";
// import Items from "./Items";
const FilterMenu = ({ categories, dispatch }) => {
  const [value, setValue] = useState("All");
  const handleChange = (e, newValue) => {
    setValue(newValue);
  };
  console.log(value);
  return (
    <div>
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
          {/* {state.items.map((item) => (
            // <Items
            //   id={item.id}
            //   name={item.name}
            //   price={item.price}
            //   description={item.description}
            //   image={item.image}
            //   dispatch={dispatch}
            // />
          ))} */}
        </TabPanel>

        {/* {state.items.map((item) => (
          <TabPanel value={item.category}>
            <Items
              id={item.id}
              name={item.name}
              price={item.price}
              description={item.description}
              image={item.image}
              dispatch={dispatch}
            />
          </TabPanel>
        ))} */}
      </TabContext>
    </div>
  );
};

export default FilterMenu;

import logo from "./logo.svg";
import React from "react";
import "./App.css";
import Cart from "./components/Cart";
import AddItem from "./components/AddItem";
import { useReducer, useState, useEffect, startTransition } from "react";
import { v4 as uuidv4 } from "uuid";
import { Stack, Paper } from "@mui/material";
import Box from "@mui/material/Box";
import ItemList from "./components/ItemList";
import { Route, Routes } from "react-router";
import CartNotif from "./components/CartNotif";
import EmptyCart from "./components/EmptyCart";
import SearchItem from "./components/SearchItem";
import CartList from "./components/CartList";
import Drawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import CssBaseline from "@mui/material/CssBaseline";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

import { styled, useTheme } from "@mui/material/styles";

function App() {
  const initialState = {
    items: [
      {
        id: uuidv4(),
        name: "Burger",
        category: "Food",
        price: 80,
        quantity: 0,
        description: "",
        image:
          "https://tmbidigitalassetsazure.blob.core.windows.net/rms3-prod/attachments/37/1200x1200/Smash-Burgers_EXPS_TOHcom20_246232_B10_06_10b.jpg",
      },
      {
        id: uuidv4(),
        name: "Cake",
        category: "Dessert",
        price: 90,
        quantity: 0,
        description: "",
        image:
          "https://static.toiimg.com/thumb/53096885.cms?width=1200&height=900",
      },
    ],
    cart: [],
    searchResult: [],
    total: 0,
    cartCount: 0,
    searchKey: "",
  };

  // const [cartCount, setCartCount] = useState(0);
  //set up reducer
  const reducer = (state, action) => {
    switch (action.type) {
      case "ADD_ITEM": {
        return { ...state, items: [...state.items, action.payload] };
      }

      case "DELETE_ITEM": {
        return {
          ...state,
          items: state.items.filter((item) => item.id !== action.payload.id),
          cart: state.cart.filter((item) => item.id !== action.payload.id),
        };
      }

      case "INCREASE_QUANTITY": {
        return {
          ...state,
          items: [
            ...state.items.map((item) => {
              if (item.id === action.payload.id) {
                item.quantity += 1;
              }
              return item;
            }),
          ],
        };
      }

      case "DECREASE_QUANTITY": {
        return {
          ...state,
          items: [
            ...state.items.map((item) => {
              if (item.id === action.payload.id) {
                if (item.quantity > 0) {
                  item.quantity -= 1;
                }
              }
              return item;
            }),
          ],
        };
      }

      case "ORDER_ITEM": {
        const orderedItem = action.payload.id;
        const itemObj = Object.assign(
          {},
          ...state.items.filter((item) => item.id === orderedItem)
        );
        if (itemObj.quantity > 0) {
          if (state.cart.length) {
            state.cart.forEach((item, index) => {
              if (item.id === itemObj.id) {
                itemObj.quantity += item.quantity;
                state.cart.splice(index, 1, itemObj);
              } else {
                if (state.cart.every((element) => element.id !== itemObj.id)) {
                  state.cart.push(itemObj);
                }
              }
            });
          } else {
            state.cart.push(itemObj);
          }
        } else {
          alert("Please add a quantity");
        }
        return { ...state };
      }
      case "EDIT_ITEM": {
        const itemID = action.payload.id;
        const itemName = action.payload.name;
        const itemCategory = action.payload.category;
        const itemImage = action.payload.image;
        const itemDescription = action.payload.description;
        const itemPrice = action.payload.price;
        state.items
          .filter((item) => item.id === itemID)
          .map((item) => {
            item.name = itemName;
            item.category = itemCategory;
            item.price = itemPrice;
            item.image = itemImage;
            item.description = itemDescription;
          });
        state.cart
          .filter((item) => item.id === itemID)
          .map((item) => {
            item.name = itemName;
            item.category = itemCategory;
            item.price = itemPrice;
            item.image = itemImage;
            item.description = itemDescription;
          });
        return { ...state };
      }
      // FIXME:DOES NOT REMOVE ITEM FROM ARRAY WHEN IT HAS NO QUANTIY
      case "DECREASE_CART_QUANTITY": {
        const itemID = action.payload.id;
        // let newCart = state.cart.map((item, index) => {
        //   if (item.id === itemID) {
        //     if (item.quantity > 0) {
        //       item.quantity -= 1;

        //     }
        //     if (item.quantity <= 0) {
        //       debugger
        //       return state.cart.splice(index, 1);
        //     }
        //   }
        //   return item;
        // });

        return {
          ...state,
          items: state.items,
          cart: [
            ...state.cart.map((item, index) => {
              if (item.id === itemID) {
                if (item.quantity > 0) {
                  item.quantity -= 1;
                }
                // if (item.quantity <= 0) {
                //   debugger
                //   return state.cart.splice(index, 1);
                // }
              }
              return item;
            }),
          ],
        };
      }
      case "INCREASE_CART_QUANTITY": {
        const itemID = action.payload.id;
        return {
          ...state,
          items: state.items,
          cart: [
            ...state.cart.map((item) => {
              if (item.id === itemID) {
                if (item.quantity > 0) {
                  item.quantity += 1;
                }
              }
              return item;
            }),
          ],
        };
      }
      case "DELETE_CART_ITEM": {
        const itemID = action.payload.id;
        return {
          ...state,
          items: state.items,
          cart: state.cart.filter((item) => item.id !== action.payload.id),
        };
      }
      case "TOTAL_AMOUNT": {
        let sum = 0;

        state.cart.forEach((item) => {
          sum += item.quantity * item.price;
        });
        return {
          ...state,

          total: sum,
        };
      }
      case "COUNT_CART": {
        let sum = 0;
        state.cart.forEach((item) => {
          sum += item.quantity;
        });

        return {
          ...state,

          cartCount: sum,
        };
      }
      case "RESET_QUANTITY": {
        state.items
          .filter((item) => item.id === action.payload.id)
          .map((item) => {
            item.quantity = 0;
          });
        return { ...state };
      }
      case "SEARCH_ITEM": {
        state.searchKey = action.payload.input;

        const searchName = state.items.filter((item) => {
          return Object.values(item)
            .join("")
            .toLowerCase()
            .includes(state.searchKey.toLowerCase());
        });

        return { ...state, searchResult: searchName };
      }
      case "SORT_ITEM": {
      }

      default: {
        return state;
      }
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  //TODO: PAEXPLAIN KAY MS KAYE LOGIC
  const categories = state.items
    .map((item) => item.category)
    .reduce((category, item) => {
      if (!category.includes(item)) {
        category.push(item);
      }
      return category;
    }, []);

  // REACT UI STYLED COMPONENT DRAWER
  const drawerWidth = 380;

  const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
    ({ theme, open }) => ({
      flexGrow: 1,
      padding: theme.spacing(3),
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      marginRight: -drawerWidth,
      ...(open && {
        transition: theme.transitions.create("margin", {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
        marginRight: 0,
      }),
    })
  );

  const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== "open",
  })(({ theme, open }) => ({
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginRight: drawerWidth,
    }),
  }));

  const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-start",
  }));
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      {/* HEADER */}
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <Typography variant="h6" noWrap sx={{ flexGrow: 1 }} component="div">
            Resto App
          </Typography>
          <IconButton
            aria-label="open drawer"
            // edge="end"
            onClick={handleDrawerOpen}
            sx={{ ...(open && { display: "none" }) }}
          >
            <CartNotif cartCount={state.cartCount} />
          </IconButton>
        </Toolbar>
      </AppBar>
      {/* MAIN CONTENT */}
      <Main open={open}>
        <DrawerHeader />
        {/* INSERT CONTENT HERE */}
        <SearchItem dispatch={dispatch} />
        
        <AddItem
          state={state}
          id={uuidv4()}
          dispatch={dispatch}
          categories={categories}
        />

        <Routes>
          <Route
            path=":category"
            element={
              <ItemList
                state={state}
                dispatch={dispatch}
                categories={categories}
              />
            }
          />
          <Route
            path="/"
            element={
              <ItemList
                state={state}
                dispatch={dispatch}
                categories={categories}
              />
            }
          />
        </Routes>
      </Main>

      {/* SIDEBAR */}
      <Drawer
        sx={{
          width: drawerWidth,

          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            padding: "1.25em",
          },
        }}
        variant="persistent"
        anchor="right"
        open={open}
      >
        <DrawerHeader>
          
          <h1>Cart ({state.cartCount})</h1>
          <IconButton onClick={handleDrawerClose} sx={{marginLeft:"auto"}}>
            {theme.direction === "rtl" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        
        <Divider />
        {state.cart.length > 0 && (
          <>
            <Paper elevation={1} sx={{ padding: "1em", marginBottom:"2em" }}>
              <CartList state={state} dispatch={dispatch} />
            </Paper>
            <Divider />
            <Paper elevation={0} sx={{ padding: "1em", marginBottom:"2em"  }}>
              <Stack direction="row" spacing={4}>
                <h3>PROMO CODE:</h3>
                <button>Add Coupon</button>
              </Stack>
            </Paper>
            <Divider />
            <Paper elevation={0}  sx={{ padding: "1em", marginTop:"auto"}}>
              <h1>Total Amount:{state.total}</h1>
            </Paper>
          </>
        )}
        {!state.cart.length > 0 && (
          <>
            <EmptyCart />
          </>
        )}
      </Drawer>
    </Box>
  );
}

export default App;

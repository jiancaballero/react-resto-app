import React from "react";
import "./App.css";
import Cart from "./components/Cart";
import AddItem from "./components/AddItem";
import { useReducer, useState, useEffect, startTransition } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  Stack,
  Paper,
  createTheme,
  ThemeProvider,
  Button,
} from "@mui/material";
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
import SortItem from "./components/SortItem";

import { StaticDatePicker } from "@mui/lab";
import SuccessAddItem from "./components/SuccessAddItem";
import SuccessEditItem from "./components/SuccessEditItem";
import SuccessOrderItem from "./components/SuccessOrderItem";
import ErrorRemoveItem from "./components/ErrorRemoveItem";
import ErrorRemoveCart from "./components/ErrorRemoveCart";
import { extendSxProp } from "@mui/system";
import restologo from "./assets/images/restologo.png";
import axios from "axios";
function App() {
  // INITIAL STATE
  const initialState = {
    items: [],
    cart: [],
    searchResult: [],
    total: null,
    cartCount: null,
    searchKey: "",
    category: "",
    successAdd: false,
    successEdit: false,
    successOrder: false,
    errorRemove: false,
    errorRemoveCart: false,
  };
  // CUSTOMED THEME
  const theme = createTheme({
    typography: { fontFamily: ["Aboreto", "cursive"].join(",") },
    palette: {
      secondary: {
        main: "#D3232B",
      },
      primary: {
        main: "#E5E5E5",
      },
      text: {
        main: "#242631",
      },
    },
  });
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

  const [open, setOpen] = React.useState(false);

  // SET UP REDUCER CASES
  const reducer = (state, action) => {
    switch (action.type) {
      case "DISPLAY_ITEMS": {
        return {
          ...state,
          items: action.payload.items,
        };
      }
      case "DISPLAY_CART": {
        if (action.payload.cart.length > 0) {
          return {
            ...state,
            cart: action.payload.cart,
            total: action.payload.cart.reduce((prev, curr) => {
              return prev + curr.price * curr.quantity;
            }, 0),
            cartCount: action.payload.cart.reduce((prev, curr) => {
              return prev + curr.quantity;
            }, 0),
          };
        } else {
          return {
            ...state,
            cart: action.payload.cart,
          };
        }
      }

      case "ADD_ITEM": {
        return {
          ...state,
          items: [action.payload, ...state.items],
          successAdd: true,
          successEdit: false,
          successOrder: false,
          errorRemove: false,
          errorRemoveCart: false,
        };
      }

      case "DELETE_ITEM": {
        return {
          ...state,
          items: state.items.filter((item) => item.id !== action.payload.id),
          cart: state.cart.filter((item) => item.id !== action.payload.id),
          errorRemove: true,
          successEdit: false,
          successOrder: false,
          successAdd: false,
          errorRemoveCart: false,
          searchResult: state.searchResult.filter(
            (item) => item.id !== action.payload.id
          ),
        };
      }

      case "INCREASE_QUANTITY": {
        const updateItems = state.items.map((item) => {
          if (item.id === action.payload.id) {
            item.quantity += 1;
          }
          return item;
        });

        return {
          ...state,
          items: updateItems,
          errorRemove: false,
          successEdit: false,
          successOrder: false,
          successAdd: false,
          errorRemoveCart: false,
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
          errorRemove: false,
          successEdit: false,
          successOrder: false,
          successAdd: false,
          errorRemoveCart: false,
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
          return {
            ...state,
            successOrder: false,
            errorRemove: false,
            successEdit: false,
            successAdd: false,
            errorRemoveCart: false,
          };
        }

        return {
          ...state,
          successOrder: true,
          errorRemove: false,
          successEdit: false,
          successAdd: false,
          errorRemoveCart: false,
        };
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
        return {
          ...state,
          successEdit: true,
          errorRemove: false,
          successOrder: false,
          successAdd: false,
          errorRemoveCart: false,
        };
      }
      // FIXME:DOES NOT REMOVE ITEM FROM ARRAY WHEN IT HAS NO QUANTIY
      case "DECREASE_CART_QUANTITY": {
        const itemID = action.payload.id;
        const itemPrice = state.items.find((item) => item.id === itemID);

        return {
          ...state,
          items: state.items,
          cart: [
            ...state.cart.map((item, index) => {
              if (item.id === itemID) {
                if (item.quantity > 0) {
                  item.quantity -= 1;
                }
              }
              return item;
            }),
          ],
          errorRemove: false,
          successEdit: false,
          successOrder: false,
          successAdd: false,
          errorRemoveCart: false,
        };
      }
      case "INCREASE_CART_QUANTITY": {
        const itemID = action.payload.id;
        const itemPrice = state.items.find((item) => item.id === itemID);

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
          errorRemove: false,
          successEdit: false,
          successOrder: false,
          successAdd: false,
          errorRemoveCart: false,
        };
      }
      case "DELETE_CART_ITEM": {
        const itemID = action.payload.id;
        return {
          ...state,
          items: state.items,
          cart: state.cart.filter((item) => item.id !== action.payload.id),
          errorRemoveCart: true,
          errorRemove: false,
          successEdit: false,
          successOrder: false,
          successAdd: false,
        };
      }
      case "TOTAL_AMOUNT": {
        let sum = 0;
        state.cart.forEach((item) => {
          sum += item.price * item.quantity;
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
        const result = state.items.filter((item) => {
          return Object.values(item)
            .join("")
            .toLowerCase()
            .includes(state.searchKey.toLowerCase());
        });

        return {
          ...state,
          searchResult: result,
          searchKey: action.payload.input,
          category: "All",
          errorRemove: false,
          successEdit: false,
          successOrder: false,
          successAdd: false,
          errorRemoveCart: false,
        };
      }

      case "SORT_ITEMS": {
        const sort = action.payload.sortBy;

        switch (sort) {
          case "name":
            return {
              ...state,
              items: state.items.sort((a, b) => {
                if (a.name.toLowerCase() < b.name.toLowerCase()) {
                  return -1;
                }
                if (a.name.toLowerCase() > b.name.toLowerCase()) {
                  return 1;
                }
                return 0;
              }),
              searchResult: state.searchResult.sort((a, b) => {
                if (a.name.toLowerCase() < b.name.toLowerCase()) {
                  return -1;
                }
                if (a.name.toLowerCase() > b.name.toLowerCase()) {
                  return 1;
                }
                return 0;
              }),
              errorRemove: false,
              successEdit: false,
              successOrder: false,
              successAdd: false,
              errorRemoveCart: false,
            };

          case "priceAsc":
            return {
              ...state,
              items: state.items.sort((a, b) => {
                return Math.round(a.price) - Math.round(b.price);
              }),
              searchResult: state.searchResult.sort((a, b) => {
                return Math.round(a.price) - Math.round(b.price);
              }),
              errorRemove: false,
              successEdit: false,
              successOrder: false,
              successAdd: false,
              errorRemoveCart: false,
            };

          case "priceDsc":
            return {
              ...state,
              items: state.items.sort((a, b) => {
                return b.price - a.price;
              }),
              searchResult: state.searchResult.sort((a, b) => {
                return b.price - a.price;
              }),
              errorRemove: false,
              successEdit: false,
              successOrder: false,
              successAdd: false,
              errorRemoveCart: false,
            };

          case "ratings":
            return {
              ...state,
              items: state.items.sort((a, b) => {
                return b.ratings - a.ratings;
              }),
              searchResult: state.searchResult.sort((a, b) => {
                return b.ratings - a.ratings;
              }),
              errorRemove: false,
              successEdit: false,
              successOrder: false,
              successAdd: false,
              errorRemoveCart: false,
            };
        }
      }
      case "FILTER_ITEMS": {
        return {
          ...state,
          category: action.payload.name,
          searchResult: [],
          searchKey: "",
          errorRemove: false,
          successEdit: false,
          successOrder: false,
          successAdd: false,
          errorRemoveCart: false,
        };
      }

      case "RESET_ALERTS": {
        return {
          ...state,
          errorRemove: false,
          successEdit: false,
          successOrder: false,
          successAdd: false,
          errorRemoveCart: false,
        };
      }

      default: {
        return state;
      }
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    axios.get("http://localhost:8080/api/items").then((res) => {
      dispatch({ type: "DISPLAY_ITEMS", payload: { items: res.data.items } });
    });
    axios.get("http://localhost:8080/api/cart").then((res) => {
      dispatch({ type: "DISPLAY_CART", payload: { cart: res.data.cart } });
    });
  }, []);

  const handleDrawerOpen = (e) => {
    e.preventDefault();
    dispatch({ type: "RESET_ALERTS" });
    setOpen(true);
  };

  const handleDrawerClose = (e) => {
    e.preventDefault();
    dispatch({ type: "RESET_ALERTS" });
    setOpen(false);
  };

  // FIXME: capitalization does not work in duplicates
  const categories = state.items
    .map((item) => item.category)
    .reduce(
      (category, item) => {
        if (!category.includes(item)) {
          category.push(item);
        }
        return category;
      },
      ["All"]
    );

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        {/* HEADER */}
        <AppBar
          position="fixed"
          open={open}
          elevation={0}
          sx={{ backgroundColor: "secondary.dark" }}
        >
          <Toolbar>
            <img src={restologo} className="RestoLogo"></img>
            <Typography
              variant="h6"
              noWrap
              sx={{ flexGrow: 1 }}
              component="div"
            >
              UCHIHA
            </Typography>
            <IconButton
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              sx={{ ...(open && { display: "none" }) }}
            >
              <CartNotif cartCount={state.cartCount} />
            </IconButton>

            <Typography variant="h6" sx={{ ...(open && { display: "none" }) }}>
              Cart
            </Typography>
          </Toolbar>
        </AppBar>
        {/* MAIN CONTENT */}
        <Main open={open} className="Main">
          <DrawerHeader />
          <SuccessAddItem success={state.successAdd} />
          <SuccessEditItem success={state.successEdit} />
          <SuccessOrderItem success={state.successOrder} />
          <ErrorRemoveItem error={state.errorRemove} />
          <ErrorRemoveCart error={state.errorRemoveCart} />

          <Box
            sx={{
              display: "flex",
              alignItems: "flex-end",
              gap: "10px",
            }}
          >
            <SearchItem dispatch={dispatch} searchKey={state.searchKey} />
            <SortItem dispatch={dispatch} />

            <AddItem
              state={state}
              id={uuidv4()}
              dispatch={dispatch}
              categories={categories}
            />
          </Box>
          <ItemList
            state={state}
            dispatch={dispatch}
            categories={categories}
            category={state.category}
          />
        </Main>

        {/* SIDEBAR */}
        <Drawer
          sx={{
            width: drawerWidth,

            flexShrink: 0,
            "& .MuiDrawer-paper": {
              backgroundImage: "url(./assets/images/swirl_pattern.png)",
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
            <IconButton onClick={handleDrawerClose} sx={{ marginLeft: "auto" }}>
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
              <Paper elevation={1} sx={{ padding: "1em", marginBottom: "2em" }}>
                <CartList state={state} dispatch={dispatch} />
              </Paper>
              <Divider />
              <Paper elevation={0} sx={{ padding: "1em", marginBottom: "2em" }}>
                <Stack direction="row" spacing={4} alignItems="flex-end">
                  <Typography variant="subTitle1">FIND PROMOTION</Typography>
                  <Button variant="outlined" color="secondary">
                    Add Coupon
                  </Button>
                </Stack>
              </Paper>
              <Divider />
              <Paper elevation={0} sx={{ padding: "1em", marginTop: "auto" }}>
                <Typography
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: "20px",
                    fontWeight: "900",
                  }}
                  variant="h5"
                  gutterBottom
                >
                  Total Amount: <Stack>{state.total}.00</Stack>
                </Typography>
                <Button
                  sx={{ width: "100%" }}
                  variant="contained"
                  disableElevation
                  color="secondary"
                  size="large"
                >
                  Checkout
                </Button>
              </Paper>
            </>
          )}
          {!state.cart.length > 0 && (
            <Box sx={{ margin: "auto" }}>
              <EmptyCart />
            </Box>
          )}
        </Drawer>
      </Box>
    </ThemeProvider>
  );
}

export default App;

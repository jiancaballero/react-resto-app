import logo from "./logo.svg";
import React from "react";
import "./App.css";
import Cart from "./components/Cart";
import AddItem from "./components/AddItem";
import { useReducer, useState, useEffect, startTransition } from "react";
import { v4 as uuidv4 } from "uuid";
import { Stack, Paper, createTheme, ThemeProvider } from "@mui/material";
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
import SuccessMessage from "./components/SuccessMessage";

function App() {
  // CUSTOMED THEME
  const theme = createTheme({
    typography: { fontFamily: ["Raleway", "Arial"].join(",") },
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

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  // INITIAL STATE
  const initialState = {
    items: [
      {
        id: uuidv4(),
        name: "Karaage Bento",
        category: "bento",
        price: 120,
        quantity: 0,
        description: "",
        image:
          "https://s3-ap-northeast-1.amazonaws.com/tdjcom/goods/main_pic122_1_1544852299.jpg",
        ratings: 4,
      },
      {
        id: uuidv4(),
        name: "Ebi Fry",
        category: "bento",
        price: 250,
        quantity: 0,
        description: "",
        image:
          "https://bentoya.ae/wp-content/uploads/2021/05/EBI-TEMPURA-BENTO_s.jpg",
        ratings: 3,
      },
      {
        id: uuidv4(),
        name: "Teriyaki Chicken",
        category: "bento",
        price: 250,
        quantity: 0,
        description: "",
        image:
          "https://moonsushi.co.nz/wp-content/uploads/2022/03/Teriyaki-Salmon-28-1.jpg",
        ratings: 3,
      },

      {
        id: uuidv4(),
        name: "Beef Teriyaki",
        category: "bento",
        price: 350,
        quantity: 0,
        description: "",
        image:
          "https://media-cdn.tripadvisor.com/media/photo-s/18/8a/ff/69/beef-teriyaki-bento-box.jpg",
        ratings: 3.5,
      },
      {
        id: uuidv4(),
        name: "Grilled Salmon",
        category: "bento",
        price: 350,
        quantity: 0,
        description: "",
        image: "https://image.entabe.jp/upload/20210714/images/sub3.jpg",
        ratings: 2.5,
      },
      {
        id: uuidv4(),
        name: "Saba no Miso",
        category: "bento",
        price: 380,
        quantity: 0,
        description: "",
        image: "https://image.entabe.jp/upload/20210115/images/sub2_3.jpg",
        ratings: 3,
      },

      {
        id: uuidv4(),
        name: "Katsu Curry",
        category: "katsu",
        price: 380,
        quantity: 0,
        description: "",
        image:
          "https://sudachirecipes.com/wp-content/uploads/2021/06/chicken-katsu-curry-7-1536x1024.jpg",
        ratings: 5,
      },
      {
        id: uuidv4(),
        name: "Pork Tonkatsu",
        category: "katsu",
        price: 380,
        quantity: 0,
        description: "",
        image:
          "https://salu-salo.com/wp-content/uploads/2016/02/Tonkatsu-Japanese-Pork-Cutlets-3.jpg",
        ratings: 5,
      },
      {
        id: uuidv4(),
        name: "Cheese Katsu",
        category: "katsu",
        price: 400,
        quantity: 0,
        description: "",
        image:
          "https://i1.wp.com/seonkyounglongest.com/wp-content/uploads/2020/10/Cheese-Tonkatsu-10-mini.jpg?fit=1000%2C667&ssl=1",
        ratings: 5,
      },
      {
        id: uuidv4(),
        name: "Gyu Katsu",
        category: "katsu",
        price: 450,
        quantity: 0,
        description: "",
        image:
          "https://gurunavi.com/en/japanfoodie/article/katsu/img/04_Katsu.jpg",
        ratings: 4.5,
      },

      {
        id: uuidv4(),
        name: "Spicy Shoyu",
        category: "ramen",
        price: 400,
        quantity: 0,
        description: "",
        image:
          "https://pickledplum.com/wp-content/uploads/2018/02/shoyu-ramen-1-1200.jpg",
        ratings: 3,
      },
      {
        id: uuidv4(),
        name: "Tonkatsu Ramen",
        category: "ramen",
        price: 450,
        quantity: 0,
        description: "",
        image:
          "http://cdn.shopify.com/s/files/1/0111/1729/7722/articles/shutterstock_697241275_tonkotsu_ramen-landscape.jpg?v=1562316760",
        ratings: 4.5,
      },
      {
        id: uuidv4(),
        name: "Miso Ramen",
        category: "ramen",
        price: 450,
        quantity: 0,
        description: "",
        image:
          "https://i.guim.co.uk/img/media/4f9c291b0a24383c031840ae85f4cddb393f99a6/0_323_3648_2189/master/3648.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=72c84cc785c64e75861ee2da1f3c4a7c",
        ratings: 4,
      },

      {
        id: uuidv4(),
        name: "Salad",
        category: "side",
        price: 140,
        quantity: 0,
        description: "",
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVxw1PRAujhKXs6r3Zd1vkSF7tGdCGM0b-PA&usqp=CAU",
        ratings: 3,
      },
      {
        id: uuidv4(),
        name: "Potato Korokke",
        category: "side",
        price: 160,
        quantity: 0,
        description: "",
        image:
          "https://www.thespruceeats.com/thmb/5l0NBRobJl8DPu5CisaX0fwymT4=/3000x2000/filters:fill(auto,1)/potato-korokke-2031283-hero-01-5edf6479ce8446a29f36769d2022728a.jpg",
        ratings: 4,
      },
      {
        id: uuidv4(),
        name: "Shrimp Tempura",
        category: "side",
        price: 160,
        quantity: 0,
        description: "",
        image:
          "https://i.pinimg.com/736x/59/73/d2/5973d2dab2c1199df04af66c18fadabb--shrimp-dishes-shrimp-pasta.jpg",
        ratings: 4,
      },

      {
        id: uuidv4(),
        name: "Gyoza",
        category: "side",
        price: 180,
        quantity: 0,
        description: "",
        image:
          "https://mychefrecipe.com/wp-content/uploads/2021/01/Gyozas-presentation-04-650.jpg",
        ratings: 4,
      },

      // DESSERT
      {
        id: uuidv4(),
        name: "Tiramisu",
        category: "dessert",
        price: 80,
        quantity: 0,
        description: "",
        image:
          "https://www.lifeloveandsugar.com/wp-content/uploads/2017/01/Mini-Tiramisu-Trifles2-2.jpg",
        ratings: 3.5,
      },
      {
        id: uuidv4(),
        name: "Matcha Ice Cream",
        category: "dessert",
        price: 100,
        quantity: 0,
        description: "",
        image:
          "https://www.wandercooks.com/wp-content/uploads/2022/03/matcha-green-tea-ice-cream-3-683x1024.jpg",
        ratings: 3,
      },

      // DRINKS
      {
        id: uuidv4(),
        name: "Ocha",
        category: "drinks",
        price: 40,
        quantity: 0,
        description: "",
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnb77OSy-beAJX70F-R9gWUZtDWfxo6vMfNDIgCA9fNgn1Q3G--RoWoJ3WeXb9XvKuadA&usqp=CAU",
      },
      {
        id: uuidv4(),
        name: "Lemon Tea",
        category: "drinks",
        price: 80,
        quantity: 0,
        description: "",
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGrMClBM2R8MEF0ecYSAo5OP1CYeq2scmWcQ&usqp=CAU",
      },

      {
        id: uuidv4(),
        name: "Sake",
        category: "drinks",
        price: 90,
        quantity: 0,
        description: "",
        image:
          "https://www.kyotoboutique.fr/13742/japanese-sake-yamato-shizuku-junmai-ginjo.jpg",
      },
    ],
    cart: [],
    searchResult: [],
    total: 0,
    cartCount: 0,
    searchKey: "",
    category: "",
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
        const updateItems = state.items.map((item) => {
          if (item.id === action.payload.id) {
            item.quantity += 1;
          }
          return item;
        });

        return {
          ...state,
          items: updateItems,
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
        const searchName = state.items.filter((item) => {
          return Object.values(item)
            .join("")
            .toLowerCase()
            .includes(state.searchKey.toLowerCase());
        });

        return {
          ...state,
          searchResult: searchName,
          searchKey: action.payload.input,
          category:"All"
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
            };

          case "priceAsc":
            return {
              ...state,
              items: state.items.sort((a, b) => {
                return Math.round(a.price) - Math.round(b.price);
              }),
            };

          case "priceDsc":
            return {
              ...state,
              items: state.items.sort((a, b) => {
                return b.price - a.price;
              }),
            };

          case "ratings":
            return {
              ...state,
              items: state.items.sort((a, b) => {
                return b.ratings - a.ratings;
              }),
            };
        }
      }
      case "FILTER_ITEMS": {
        return { ...state, category: action.payload.name, searchResult: [], searchKey:""};
      }

      default: {
        return state;
      }
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);


  // FIXME: capitalization does not work in duplicates
  const categories = state.items
    .map((item) => item.category)
    .reduce((category, item) => {
      if (!category.includes(item)) {
        category.push(item);
      }
      return category;
    }, ['All']);

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        {/* HEADER */}
        <AppBar position="fixed" open={open}>
          <Toolbar>
            <Typography
              variant="h6"
              noWrap
              sx={{ flexGrow: 1 }}
              component="div"
            >
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

        
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
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
                <Stack direction="row" spacing={4}>
                  <h3>PROMO CODE:</h3>
                  <button>Add Coupon</button>
                </Stack>
              </Paper>
              <Divider />
              <Paper elevation={0} sx={{ padding: "1em", marginTop: "auto" }}>
                <h1>Total Amount:{state.total}</h1>
                <button>Checkout</button>
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
    </ThemeProvider>
  );
}

export default App;

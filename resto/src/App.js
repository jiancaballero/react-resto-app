import logo from "./logo.svg";
import "./App.css";
import Cart from "./components/Cart";
import AddItem from "./components/AddItem";
import { useReducer, useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import ItemList from "./components/ItemList";
import { Route, Routes } from "react-router";
import FilterMenu from "./components/FilterMenu";
import CartNotif from "./components/CartNotif";
import Admin from "./components/Admin";
import SearchItem from "./components/SearchItem";
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
    cart: [
      {
        id: "",
        name: "",
        category: "",
        quantity: 0,
        price: 0,
        description: "",
        image: "",
      },
    ],
  };
  // search
  const [searchKey, setSearchKey] = useState("");
  const [cartCount, setCartCount] = useState(0);
  //set up reducer
  const reducer = (state, action) => {
    switch (action.type) {
      case "ADD_ITEM": {
        return { ...state, items: [...state.items, action.payload] };
      }

      case "DELETE_ITEM": {
        return {
          ...state,
          items: state.items.filter((item) => item.id !== action.payload),
        };
      }

      case "INCREASE_QUANTITY": {
        return {
          items: [
            ...state.items.map((item) => {
              if (item.id === action.payload.id) {
                item.quantity += 1;
              }
              return item;
            }),
          ],
          // cartCount: (state.cartCount += 1),
        };
      }

      case "DECREASE_QUANTITY": {
        return {
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
          // cartCount: (state.cartCount -= 1),
        };
      }

      case "ORDER_ITEM":{
        console.log("ORDERING")
      }

      // FIXME: not working searchfeature
      // case "SEARCH_ITEM": {
      //   const searchName = state.items.filter((item) => {
      //     return Object.values(item.name)
      //       .join("")
      //       .toLowerCase()
      //       .includes(action.payload.input.toLowerCase());
      //   });
      //   return { ...state, items: searchName };
      // }

      default: {
        return state;
      }
    }
  };

  // () => {
  //   const localData = localStorage.getItem("initialState");
  //   return localData ? JSON.parse(localData) : [];
  // }
  const [state, dispatch] = useReducer(reducer, initialState);
  const orderItems = () => {
    dispatch({ type:"ORDER_ITEM"})
    setCartCount(
      state.items
        .map((item) => item.quantity)
        .reduce((prev, curr) => {
          return prev + curr;
        })
    );
  };

  // useEffect(() => {
  //   localStorage.setItem("initialState", JSON.stringify(state));
  // }, [state.users]);

  const categories = state.items
    .map((item) => item.category)
    .reduce((category, item) => {
      if (!category.includes(item)) {
        category.push(item);
      }
      return category;
    }, []);

  return (
    <>
      <AddItem
        state={state}
        id={uuidv4()}
        dispatch={dispatch}
        categories={categories}
      />
      <ItemList
        state={state}
        dispatch={dispatch}
        categories={categories}
        orderItems={orderItems}
      />
      <CartNotif cartCount={cartCount} />
      <SearchItem dispatch={dispatch} />
      <Cart state={state} />
      <Routes></Routes>
    </>
  );
}

export default App;

import logo from "./logo.svg";
import "./App.css";
import Cart from "./components/Cart";
import AddItem from "./components/AddItem";
import { useReducer, useState, useEffect, startTransition } from "react";
import { v4 as uuidv4 } from "uuid";
import ItemList from "./components/ItemList";
import { Route, Routes } from "react-router";
import FilterMenu from "./components/FilterMenu";
import CartNotif from "./components/CartNotif";
import Admin from "./components/Admin";
import SearchItem from "./components/SearchItem";
import CartList from "./components/CartList";
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
  };
  // search
  const [searchKey, setSearchKey] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  // const[cart,setCart] = useState([{}])
  //set up reducer
  const reducer = (state, action) => {
    switch (action.type) {
      case "ADD_ITEM": {
        return { ...state, items: [...state.items, action.payload] };
      }

      case "DELETE_ITEM": {
        //  FIXME: Cart count does not update when item is removed

        return {
          ...state,
          items: state.items.filter((item) => item.id !== action.payload.id),
          cart: state.cart.filter((item) => item.id !== action.payload.id),
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
          cart: [...state.cart],
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
          cart: [...state.cart],
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
        } else if (itemObj.quantity <= 0 && cartCount <= 0) {
          alert("Please add a quantity");
        }

        return {...state}
      }
      default: {
        return state;
      }
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const orderItems = (id) => {
    dispatch({ type: "ORDER_ITEM", payload: { id: id } });
    setCartCount(
      state.items
        .map((item) => item.quantity)
        .reduce((prev, curr) => {
          return prev + curr;
        })
    );
  };
  const deleteItem = (id) => {
    console.log(state.items
      .map((item) => item.quantity)
      .reduce((prev, curr) => {
        return prev + curr;
      }))
    // setCartCount();
    dispatch({ type: "DELETE_ITEM", payload: { id: id } });
  };

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
        deleteItem={deleteItem}
      />
      <CartNotif cartCount={cartCount} />
      <SearchItem dispatch={dispatch} />
      <CartList state={state} />
    </>
  );
}

export default App;

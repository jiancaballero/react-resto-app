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

      // FIXME: doesnt add all ordered items
      case "ORDER_ITEM": {
        const orderedItem = action.payload.id;
        let cartCopy = [];
        const itemObj = Object.assign(
          {},
          ...state.items.filter((item) => item.id === orderedItem)
        );

        if (state.cart.length) {
          state.cart.forEach((item, index) => {
            if (item.id === itemObj.id) {
              state.cart.splice(index, 1, itemObj);
            } else {
              if (state.cart.every((element) => element.id === item.id)) {
                state.cart.push(itemObj);
              }
            }
          });
        } else {
          state.cart.push(itemObj);
        }

        // if (cartCopy.length) {
        //   cartCopy.forEach((copy, index) => {
        //     if (copy.id === itemObj.id) {
        //       console.log("same");
        //       cartCopy.splice(index, 1, itemObj);
        //     } else {
        //       cartCopy.push(itemObj);
        //     }
        //   });
        // } else {
        //   setCartCopy(...cart,itemObj);
        // }
        // console.log(cartCopy);
        // if (state.cart.length) {
        //   state.cart.forEach((item, index) => {
        //     if (item.id === itemObj.id) {
        //       // update that in the cart
        //       // state.cart.splice(index,1,itemObj);
        //       console.log("same");
        //     }
        //     else{
        //       cartCopy.push(itemObj)
        //     }
        //   });
        // } else {
        //   cartCopy.push(itemObj)
        //   state.cart.push(itemObj);
        // }

        // state.cart.push(item)
        // console.log(cartCopy);
      }

      // FIXME: not working searchfeature
      // case "SEARCH_ITEM": {
      //   if (action.payload.input != "") {
      //     const searchName = state.items.filter((item) => {
      //       return Object.values(item.name)
      //         .join("")
      //         .toLowerCase()
      //         .includes(action.payload.input.toLowerCase());
      //     });
      //     setSearchResult(searchName);
      //     console.log(searchResult);
      //     // return { ...state, items: searchName };
      //   }
      //   else{
      //     setSearchResult(state)
      //   }
      // }

      default: {
        return state;
      }
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);
  console.log(state);
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
     
    </>
  );
}

export default App;

import logo from "./logo.svg";
import "./App.css";
import Cart from "./components/Cart";
import AddItem from "./components/AddItem";
import { useReducer, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import ItemList from "./components/ItemList";
import { Route, Routes } from "react-router";
import FilterMenu from "./components/FilterMenu";
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
  };

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

      case "ORDER_ITEM": {
        console.log(`Order Item: ${action.payload}`);
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
        };
      }

      case "DECREASE_QUANTITY": {
        if (state.quantity > 0) {
          return { ...state, quantity: state.quantity - 1 };
        }
      }

      default: {
        return state;
      }
    }
  };

  // define reducer
  const [state, dispatch] = useReducer(reducer, initialState);
  console.log(state);
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
      <ItemList state={state} dispatch={dispatch} categories={categories} />
      <AddItem
        state={state}
        id={uuidv4()}
        dispatch={dispatch}
        categories={categories}
      />

      {/* <Routes>
        
           
          
        
      </Routes> */}
    </>
  );
}

export default App;

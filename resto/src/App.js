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
    total: 0,
    cartCount: 0,
  };
  // search
  const [searchKey, setSearchKey] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  // const [cartCount, setCartCount] = useState(0);
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
          cart: state.cart,
          total: state.total,
          cartCount: state.cartCount,
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
          cart: state.cart,
          total: state.total,
          cartCount: state.cartCount,
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
      case "DECREASE_CART_QUANTITY": {
        const itemID = action.payload.id;
        return {
          items: state.items,
          cart: [
            ...state.cart.map((item) => {
              if (item.id === itemID) {
                if (item.quantity > 0) {
                  item.quantity -= 1;
                }
              }
              return item;
            }),
          ],
          total: state.total,
          cartCount: state.cartCount,
        };
      }
      case "INCREASE_CART_QUANTITY": {
        const itemID = action.payload.id;
        return {
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
          total: state.total,
          cartCount: state.cartCount,
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
          items: state.items,
          cart: state.cart,
          total: sum,
          countCart: state.cartCount,
        };
      }
      case "COUNT_CART": {
        let sum = 0;
        state.cart.forEach((item) => {
          sum += item.quantity;
        });

        return {
          items: state.items,
          cart: state.cart,
          total: state.total,
          cartCount: sum
        };
      }

      default: {
        return state;
      }
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  // FIXME: cart count gets all quantity of items not the item ordered
  const orderItems = (id) => {
    dispatch({ type: "ORDER_ITEM", payload: { id: id } });
    dispatch({ type: "TOTAL_AMOUNT" });
    dispatch({ type: "COUNT_CART" });
  };
  const deleteItem = (id) => {
    dispatch({ type: "DELETE_ITEM", payload: { id: id } });
    dispatch({ type: "TOTAL_AMOUNT" });
    dispatch({ type: "COUNT_CART" });
  };

  //TODO: PAEXPLAIN KAY MS KAYE LOGIC
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
      <h1>Total:{state.total}</h1>
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
      <CartNotif cartCount={state.cartCount} />
      <SearchItem dispatch={dispatch} />
      <CartList state={state} dispatch={dispatch} />
    </>
  );
}

export default App;

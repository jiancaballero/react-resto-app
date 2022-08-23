import React from 'react'
 
const SearchItem = ({dispatch}) => {
const handleSearch = (e)=>{
    return dispatch({ type: "SEARCH_ITEM", payload: { input: e.target.value } })
  
}
  return (
    <div>
        <input type="search" onChange={handleSearch}>
        </input>
    </div>
  )
}

export default SearchItem
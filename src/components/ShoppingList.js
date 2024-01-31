import React, { useState } from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";

function ShoppingList({ items, setItems }) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [search, setSearch] = useState("")


  function handleCategoryChange(event) {
    setSelectedCategory(event.target.value);
  }

  function onSearchChange(event) {
    event.preventDefault()
    setSearch(event.target.value)
  }

  function onItemFormSubmit(newItem) {
    setItems([ ...items, newItem ])
  }

  const itemsToDisplay = items.filter((item) => {
    if (selectedCategory === "All") return true;
    return item.category === selectedCategory;
  }).filter(item => {
      if (search === "") {
        return item;
      } else {
        return item.name.toLowerCase().includes(search.toLowerCase())
      }
  });

  return (
    <div className="ShoppingList">
      <ItemForm 
      onItemFormSubmit={onItemFormSubmit}
      />
      <Filter 
      onCategoryChange={handleCategoryChange} 
      onSearchChange={onSearchChange}
      search={search}
      />
      <ul className="Items">
        {itemsToDisplay.map((item) => (
          <Item key={item.id} name={item.name} category={item.category} />
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;

import React, { useState } from "react";
import "./styles.css";
import "mvp.css";

// Creating a To-Do Application using React
export default function App() {
  const [newItem, setNewItem] = useState("");
  const [toDoItems, setToDoItems] = useState([]);

  // Adds new item by building a new array
  function addItem(e) {
    e.preventDefault();
    const newToDoItem = { text: newItem, done: false, timestamp: Date.now() };
    const newToDoItems = [...toDoItems, newToDoItem];
    setToDoItems(newToDoItems);
    setNewItem("");
  }

  function itemDone(toDoItem) {
    const changedTodoItems = toDoItems.map((item) => {
      if (item.timestamp === toDoItem.timestamp) {
        item.done = !item.done;
      }
      return item;
    });
    setToDoItems(changedTodoItems);
  }

  // Uses filter to clear completed entries
  function clearCompleted() {
    const completedItems = toDoItems.filter((item) => !item.done);
    setToDoItems(completedItems);
  }

  return (
    <div className="App">
      <h1>Getting Things Done</h1>
      <form onSubmit={addItem}>
        <input onChange={(e) => setNewItem(e.target.value)} value={newItem} />
        <button onClick={addItem}>Add</button>
      </form>

      <h4>Things To Do:</h4>
      <ol>
        {toDoItems.map((toDoItem) => {
          return (
            <li key={toDoItem.timestamp}>
              <label>
                <input
                  type="checkbox"
                  checked={toDoItem.done}
                  onChange={() => itemDone(toDoItem)}
                />
                {toDoItem.done ? <del> {toDoItem.text}</del> : toDoItem.text}
              </label>
            </li>
          );
        })}
      </ol>

      {toDoItems.length !== 0 && (
        <button onClick={clearCompleted}>Clear Completed</button>
      )}
    </div>
  );
}

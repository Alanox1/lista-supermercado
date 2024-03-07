import type {Item} from "./types";

import {useEffect, useState} from "react";

import styles from "./App.module.scss";
import api from "./api";

interface Form extends HTMLFormElement {
  text: HTMLInputElement;
}

function App() {
  const [ items, setItems ] = useState<Item[]>([]);
  const [ value, setValue ] = useState("")
  const [ isLoading, setIsLoading ] = useState(true)

  function handleToggle(id: Item["id"]) {
    setItems((items) =>
      items.map((item) => (item.id === id ? {...item, completed: !item.completed} : item)),
    );
  }

  console.log(items)

  function handleAdd(event: React.ChangeEvent<Form>) {
    // Should implement
    event.preventDefault()

    const newItem = {
      id : items.length + 1,
      text : value,
      completed : Math.random() < 0.5
    }

    setItems([...items,newItem])

    setValue("")
  }

  function handleRemove(id: Item["id"]) {
    setItems((items) => items.filter((item) => item.id !== id));
  }

  useEffect(() => {
    api.list().then((items : Item[]) => {
      setItems(items)
      setIsLoading(false)
    });
    
  }, []);

  return (
    <main className={styles.main}>
      {isLoading
      ? <p>Cargando...</p>
      : <>
      <h1>Supermarket list</h1>
       <form onSubmit={handleAdd}>
         <input name="text" type="text" onChange={(e) => setValue(e.target.value)} value={value} />
         <button>Add</button>
       </form>
       <ul>
         {items?.map((item) => (
           <li
             key={item.id}
             className={item.completed ? styles.completed : ""}
             onClick={() => handleToggle(item.id)}
           >
             {item.text} <button onClick={() => handleRemove(item.id)}>[X]</button>
           </li>
         ))}
       </ul>
        </>
      }
       
    </main>
  );
}

export default App;

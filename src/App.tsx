import { useState } from "react";
import { invoke } from "@tauri-apps/api/core";
import "./CSS/globals.css"
import Table from "./components/Table.tsx";

function App() {
  const [greetMsg, setGreetMsg] = useState("");
  const [name, setName] = useState("");

  async function greet() {
    // Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
    setGreetMsg(await invoke("greet", { name }));
  }

  return (
    <main style={{backgroundColor: "darkgray"}}>
        <h1>Welcome to Tauri</h1>
        <Table header={["lorum", "ipsum"]} items={[<p>item</p>]}/>

        <table>

        </table>

    </main>
  );
}

export default App;

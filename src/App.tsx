import { useState } from "react";
import { invoke } from "@tauri-apps/api/core";
import "./CSS/globals.css"
import HudBar from "./components/HudBar.tsx";

function App() {
  const [greetMsg, setGreetMsg] = useState("");
  const [name, setName] = useState("");

  async function greet() {
    // Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
    setGreetMsg(await invoke("greet", { name }));
  }

  return (
    <main style={{display: "flex", flexDirection: "column", height: "100vh", width: "100vw"}}>
        <HudBar/>
        <div style={{width:'100%', flex:1, backgroundColor:"var(--background-black)"}}>
        </div>
    </main>
  );
}

export default App;

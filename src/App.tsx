import { useState } from "react";
import { invoke } from "@tauri-apps/api/core";
import "./CSS/globals.css"
import HudBar from "./components/HudBar.tsx";
import Footer from "./components/Footer";
import Header from "./components/Header.tsx";

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
            <Header text="Way larger text"/>
        </div>
        <Footer/>
    </main>
  );
}

export default App;

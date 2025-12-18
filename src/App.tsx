import { useState } from "react";
import { invoke } from "@tauri-apps/api/core";
import "./CSS/globals.css"
import HudBar from "./components/HudBar.tsx";
import Footer from "./components/Footer";
import CharacterPage from "./pages/CharacterPage.tsx";
import DropDown, { DDItem } from "./components/DropDown.tsx";

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
            <CharacterPage/>
            <div style={{display: "flex", flexDirection: "row", width: "100vw", justifyContent: "space-evenly"}}>
                <DropDown className="foo">
                    <DDItem>Look</DDItem>
                    <DDItem value="content">Some Content!</DDItem>
                </DropDown>
                <DropDown>
                    <DDItem>Look Here!</DDItem>
                    <DDItem>More content!</DDItem>
                </DropDown>
            </div>
        <Footer/>
    </main>
  );
}

export default App;

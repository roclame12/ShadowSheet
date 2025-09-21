import { useState } from "react";
import { invoke } from "@tauri-apps/api/core";
import "./CSS/globals.css"
import Table, { Row } from "./components/Table.tsx";

function App() {
  const [greetMsg, setGreetMsg] = useState("");
  const [name, setName] = useState("");

  async function greet() {
    // Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
    setGreetMsg(await invoke("greet", { name }));
  }

  return (
    <main style={{backgroundColor: "darkgray"}}>
        <Table header={["lorum", "ipsum"]} colTemplate="1fr 2fr" columns={2}>
            <Row>
                <p>blah</p>
                <p>blah</p>
            </Row>
            <Row>
                <p>blah</p>
                <p>blah</p>
            </Row>
            <Row>
                <p>blah</p>
                <p>blah</p>
            </Row>
        </Table>

    </main>
  );
}

export default App;

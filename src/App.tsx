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
        <Table header={["lorum", "ipsum"]} colTemplate="1fr 2fr" columns={2} style={{width: "500px", height: "300px"}}>
            <Row>
                <p>blah1</p>
                <p>blah2</p>
            </Row>
            <Row>
                <p>blah3</p>
                <p>blah4</p>
            </Row>
            <Row>
                <p>blah5</p>
                <p>blah6</p>
            </Row>
            <Row>
                <p>blah7</p>
                <p>blah8</p>
            </Row>
            <Row>
                <p>blah9</p>
                <p>blah10</p>
            </Row>
            <Row>
                <p>blah1</p>
                <p>blah2</p>
            </Row>
            <Row>
                <p>blah3</p>
                <p>blah4</p>
            </Row>
            <Row>
                <p>blah5</p>
                <p>blah6</p>
            </Row>
            <Row>
                <p>blah7</p>
                <p>blah8</p>
            </Row>
            <Row>
                <p>blah9</p>
                <p>blah10</p>
            </Row>
            <Row>
                <p>blah 11</p>
                <p>blah 12</p>
            </Row>
            <Row>
                <p>blah 11</p>
                <p>blah 12</p>
            </Row>
            <Row>
                <p>blah 11</p>
                <p>blah 12</p>
            </Row>
        </Table>

    </main>
  );
}

export default App;

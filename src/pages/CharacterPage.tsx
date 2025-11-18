import "../CSS/pages/CharacterPage.css"
import Header from "../components/Header.tsx";
import { useState } from "react";


interface InputBoxProps {
    header: string,
    value: string,
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
    maxLen?: number,
    title?: string
}

function InputBox(props: InputBoxProps) {
    return (
        <div className="input-box-container">
            <h2 className="input-box-header">{ props.header }</h2>
            <input
                type="text"
                value={ props.value }
                onChange={ props.onChange }
                maxLength={props.maxLen}
                title={props.title}
                className="input-box-input"
            />
        </div>
    )
}


function PersonalData() {
    const [inputValue, setValue] = useState<string>("some value");

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: 15 }}>
            <Header>Personal Data</Header>
            <InputBox header="some header" value={inputValue} onChange={(event) => { setValue(event.target.value) }} />
        </div>
    )
}


export default function CharacterPage() {

    return (
        <div className="page-container">
            <PersonalData/>
        </div>
    )
}
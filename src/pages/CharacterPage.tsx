import "../CSS/pages/CharacterPage.css"
import Header from "../components/Header.tsx";
import { useState } from "react";


interface InputBoxProps {
    header: string,
    value: string,
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
    maxLen?: number,
    title?: string,
    id?: string
}

function InputBox(props: InputBoxProps) {
    return (
        <div className="input-box-container" id={props.id}>
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
    const [metaType, setMetaType] = useState<string>("human");
    const [ethnicity, setEthnicity] = useState<string>("Italian?");
    const [age, setAge] = useState<string>("21");
    const [height, setHeight] = useState<string>("6' 0\"");
    const [weight, setWeight] = useState<string>("123 lbs");
    const [cred, setCred] = useState<string>("123");
    const [notoriety, setNotoriety] = useState<string>("123");
    const [awareness, setAwareness] = useState<string>("123");

    return (
        <div className="personal-data-container" style={{ /*display: "flex", flexDirection: "column", gap: 15 */}}>
            <Header>Personal Data</Header>
            <div className="personal-data-grid">
                <InputBox
                    header="Metatype"
                    value={metaType}
                    id="meta-type"
                    onChange={(event) => setMetaType(event.target.value)}
                />

                <InputBox
                    header="Ethnicity"
                    value={ethnicity}
                    id="ethnicity"
                    onChange={(event) => setEthnicity(event.target.value)}
                />

                <InputBox
                    header="Age"
                    value={age}
                    id="age"
                    onChange={(event) => setAge(event.target.value)}
                />

                <InputBox
                    header="Height"
                    value={height}
                    id="height"
                    onChange={(event) => setHeight(event.target.value)}
                />

                <InputBox
                    header="Weight"
                    value={weight}
                    id="weight"
                    onChange={(event) => setWeight(event.target.value)}
                />

                <InputBox
                    header="S. Cred"
                    value={cred}
                    id="street-cred"
                    onChange={(event) => setCred(event.target.value)}
                />

                <InputBox
                    header="Notoriety"
                    value={notoriety}
                    id="notoriety"
                    onChange={(event) => setNotoriety(event.target.value)}
                />

                <InputBox
                    header="Awareness"
                    value={awareness}
                    id="awareness"
                    onChange={(event) => setAwareness(event.target.value)}
                />
            </div>
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
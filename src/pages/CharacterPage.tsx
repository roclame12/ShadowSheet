import "../CSS/pages/CharacterPage.css"
import Header from "../components/Header.tsx";
import { useState, useRef } from "react";


interface InputBoxProps {
    header: string,
    value: string,
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
    maxLen?: number,
    suffix?: string,
    title?: string,
    id?: string
}

function InputBox(props: InputBoxProps) {
    const focusRef = useRef<HTMLInputElement>(null);

    return (
        <div
            className="input-box-container"
            id={props.id}
            onClick={ () => { if (focusRef.current) focusRef.current.focus() } }
        >
            <h2 className="input-box-header">{ props.header }</h2>
            <div className="input-box-body">
                <input
                    type="text"
                    ref={ focusRef }
                    value={ props.value }
                    onChange={ props.onChange }
                    maxLength={ props.maxLen }
                    title={ props.title }
                    className="input-box-input"
                />
                { props.suffix ? <p className="input-box-suffix">{ props.suffix }</p> : null }
            </div>
        </div>
    )
}


function PersonalData() {
    const [metaType, setMetaType] = useState<string>("human guy");
    const [ethnicity, setEthnicity] = useState<string>("Italian?");
    const [age, setAge] = useState<string>("21");
    const [height, setHeight] = useState<string>("123");
    const [weight, setWeight] = useState<string>("123");
    const [cred, setCred] = useState<string>("123");
    const [notoriety, setNotoriety] = useState<string>("123");
    const [awareness, setAwareness] = useState<string>("123");

    /**
     * creates the function that change the update the state of the value associated with an <InputBox/>
     *
     * @param setter the React.Dispatch associated with value of the <InputBox/>
     */
    function handleInput(setter: React.Dispatch<string>) {
        return (e: React.ChangeEvent<HTMLInputElement>) => { setter(e.target.value) }
    }

    /**
     * Creates a function that will only update the state of the value associated with an <InputBox/> if that input matches
     * a RegEx pattern.
     *
     * @param setter the React.Dispatch associated with the value of the <InputBox/>
     * @param pattern the regular expression the input must match for the input to update
     */
    function handleInputConditional(setter: React.Dispatch<string>, pattern: RegExp) {
        return (e: React.ChangeEvent<HTMLInputElement>) => {
            if (e.target.value === "" || pattern.test(e.target.value)) { setter(e.target.value) }
        }
    }

    return (
        <div className="personal-data-container" style={{ /*display: "flex", flexDirection: "column", gap: 15 */}}>
            <Header>Personal Data</Header>
            <div className="personal-data-grid">
                <InputBox
                    header="Metatype:"
                    value={metaType}
                    id="meta-type"
                    onChange={ handleInput(setMetaType) }
                />

                <InputBox
                    header="Ethnicity:"
                    value={ethnicity}
                    id="ethnicity"
                    onChange={ handleInput(setEthnicity) }
                />

                <InputBox
                    header="Age:"
                    value={age}
                    maxLen={4}
                    id="age"
                    onChange={ handleInputConditional(setAge, /^\d*$/) }
                />

                <InputBox
                    header="Height:"
                    value={height}
                    maxLen={4}
                    suffix="in."
                    id="height"
                    onChange={ handleInputConditional(setHeight, /^\d*$/) }
                />

                <InputBox
                    header="Weight:"
                    value={weight}
                    maxLen={4}
                    suffix="lbs."
                    id="weight"
                    onChange={ handleInputConditional(setWeight, /^\d*$/) }
                />

                <InputBox
                    header="S. Cred:"
                    value={cred}
                    maxLen={4}
                    id="street-cred"
                    onChange={ handleInputConditional(setCred, /^\d*$/) }
                />

                <InputBox
                    header="Notoriety:"
                    value={notoriety}
                    maxLen={4}
                    id="notoriety"
                    onChange={ handleInputConditional(setNotoriety, /^\d*$/) }
                />

                <InputBox
                    header="Awareness:"
                    value={awareness}
                    maxLen={4}
                    id="awareness"
                    onChange={ handleInputConditional(setAwareness, /^\d*$/) }
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
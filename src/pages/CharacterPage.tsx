import styles from "../CSS/pages/CharacterPage.module.css"
import Header from "../components/Header.tsx";
import { useState, useRef } from "react";
import DropDown, { DDItem } from "../components/DropDown.tsx";


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
        <label className={styles.inputBox} title={props.title} id={props.id}>
            {props.header}
            <div className={`${styles.body} global-text-box-body`} onClick={ () => { if (focusRef.current) focusRef.current.focus() } }>
                <input
                    type="text"
                    ref={ focusRef }
                    value={ props.value }
                    onChange={ props.onChange }
                    maxLength={ props.maxLen }
                />
                { props.suffix ? <p className={styles.suffix}>{ props.suffix }</p> : null }
            </div>
        </label>
    )
}


function PersonalData() {
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
        <div className={styles.container}>
            <Header>Personal Data</Header>
            <div className={styles.grid}>
                <DropDown id={styles.metaType}>
                    <DDItem>Human</DDItem>
                    <DDItem>Elf</DDItem>
                    <DDItem>Ork</DDItem>
                    <DDItem>Troll</DDItem>
                </DropDown>

                <InputBox
                    header="Ethnicity:"
                    value={ethnicity}
                    id={styles.ethnicity}
                    title="The ethnic origin of your character"
                    onChange={ handleInput(setEthnicity) }
                />

                <InputBox
                    header="Age:"
                    value={age}
                    maxLen={4}
                    id={styles.age}
                    onChange={ handleInputConditional(setAge, /^\d*$/) }
                />

                <InputBox
                    header="Height:"
                    value={height}
                    maxLen={4}
                    suffix="in."
                    id={styles.height}
                    onChange={ handleInputConditional(setHeight, /^\d*$/) }
                />

                <InputBox
                    header="Weight:"
                    value={weight}
                    maxLen={4}
                    suffix="lbs."
                    id={styles.weight}
                    onChange={ handleInputConditional(setWeight, /^\d*$/) }
                />

                <InputBox
                    header="S. Cred:"
                    value={cred}
                    maxLen={4}
                    id={styles.streetCred}
                    onChange={ handleInputConditional(setCred, /^\d*$/) }
                />

                <InputBox
                    header="Notoriety:"
                    value={notoriety}
                    maxLen={4}
                    id={styles.notoriety}
                    onChange={ handleInputConditional(setNotoriety, /^\d*$/) }
                />

                <InputBox
                    header="Awareness:"
                    value={awareness}
                    maxLen={4}
                    id={styles.awareness}
                    onChange={ handleInputConditional(setAwareness, /^\d*$/) }
                />
            </div>
        </div>
    )
}


export default function CharacterPage() {

    return (
        <div className="global-page-container">
            <PersonalData/>
        </div>
    )
}
import styles from "../CSS/pages/CharacterPage.module.css"
import React, { useState, useRef, ReactNode } from "react";
import Header from "../components/Header.tsx";
import DropDown from "../components/DropDown.tsx";
import Table from "../components/Table.tsx";
import Popup from "../components/Popup.tsx";


interface InputBoxProps {
    header: string,
    children: ReactNode,
    title?: string,
    suffix?: string,
    id?: string
}

function InputBox(props: InputBoxProps) {
    const focusRef = useRef<HTMLInputElement>(null);
    return (
        <label className={styles.inputBox} title={props.title} id={props.id}>
            {props.header}
            <div className={`${styles.body} global-text-box-body`} onClick={ () => { if (focusRef.current) focusRef.current.focus() } }>
                { props.children }
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
        <div id={styles.personalData}>
            <Header>Personal Data</Header>
            <div className={styles.grid}>
                <div className={styles.inputBox} id={styles.metaType}>
                    <label htmlFor={styles.metaTypeDropdown}>Meta Type:</label>
                    <DropDown className={styles.dropDown} id={styles.metaTypeDropdown}>
                        <DropDown.Item>Human</DropDown.Item>
                        <DropDown.Item>Elf</DropDown.Item>
                        <DropDown.Item>Ork</DropDown.Item>
                        <DropDown.Item>Troll</DropDown.Item>
                    </DropDown>
                </div>

                <InputBox header="Ethnicity:" title="The ethnic origin of your character" id={styles.ethnicity}>
                    <input
                        value={ethnicity}
                        onChange={ handleInput(setEthnicity) }
                    />
                </InputBox>

                <InputBox header="Age:" id={styles.age}>
                    <input
                        value={age}
                        maxLength={4}
                        onChange={ handleInputConditional(setAge, /^\d*$/) }
                    />
                </InputBox>

                <InputBox header="Height:" suffix="in." id={styles.height}>
                    <input
                        value={height}
                        maxLength={4}
                        onChange={ handleInputConditional(setHeight, /^\d*$/) }
                    />
                </InputBox>

                <InputBox header="Weight:" suffix="lbs." id={styles.weight}>
                    <input
                        value={weight}
                        maxLength={4}
                        onChange={ handleInputConditional(setWeight, /^\d*$/) }
                    />
                </InputBox>

                <InputBox header="S. Cred:" id={styles.streetCred}>
                    <input
                        value={cred}
                        maxLength={4}
                        onChange={ handleInputConditional(setCred, /^\d*$/) }
                    />
                </InputBox>

                <InputBox header="Notoriety:" id={styles.notoriety}>
                    <input
                        value={notoriety}
                        maxLength={4}
                        onChange={ handleInputConditional(setNotoriety, /^\d*$/) }
                    />
                </InputBox>

                <InputBox header="Awareness:" id={styles.awareness}>
                    <input
                        value={awareness}
                        maxLength={4}
                        onChange={ handleInputConditional(setAwareness, /^\d*$/) }
                    />
                </InputBox>
            </div>
        </div>
    )
}


function Qualities() {
    return (
        <div id={ styles.qualities }>
            <Popup className={ styles.popup }>
                <p>blah</p>
                <p>blah2</p>
            </Popup>
        </div>
    )
}


function Attributes() {
    return (
        <div id={styles.attributes}>

        </div>
    )
}


function Skills() {
    return (
        <div id={styles.skills}>

        </div>
    )
}


export default function CharacterPage() {

    return (
        <div className={`global-page-container ${styles.page}`}>
            <PersonalData/>
            <Qualities/>
            <Attributes/>
            <Skills/>
        </div>
    )
}
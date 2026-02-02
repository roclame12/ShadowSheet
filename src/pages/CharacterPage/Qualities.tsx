import styles from "../../CSS/pages/CharacterPage/Qualities.module.css";
import Popup from "../../components/Popup.tsx";
import { useState, Dispatch, SetStateAction } from "react";

enum positivity {
    GOOD,
    BAD,
    NEUTRAL
}


interface QualitySelectorProps {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>
}

function QualitySelector(props: QualitySelectorProps) {
    return(
        <Popup open={props.open} setOpen={props.setOpen}>
            <p>test</p>
        </Popup>
    )
}


/**
 * stand-in for what the database would return when polled for qualities. Currently only contains what would be valuable
 * for this demo.
 *
 * @property name the name of the quality
 * @property positivity enum denoting how good the quality is to have
 *
 */
interface qualityType {
    name: string | null;
    positivity: positivity;
}


interface QualitySwitchProps {
    quality: qualityType;
    setQuality: Dispatch<SetStateAction<qualityType>>;
}

function QualitySwitch(props: QualitySwitchProps) {
    const [popupOpen, setPopupOpen] = useState(false);
    const textClass = props.quality.positivity === positivity.GOOD ? styles.positiveText :
        props.quality.positivity === positivity.BAD ? styles.negativeText : styles.defaultText;

    return (
        <>
            <button className={styles.qualitySwitch} onClick={() => setPopupOpen(true)}>
                <p className={ textClass }>{props.quality.name ? props.quality.name : "Select a quality..."}</p>
            </button>
            <QualitySelector open={popupOpen} setOpen={setPopupOpen}/>
        </>
    )
}


export default function Qualities(id: string) {
    const[demoQuality, setDemoQuality] = useState<qualityType>({name: null, positivity: positivity.NEUTRAL})

    return (
        <div id={ id }>
            <QualitySwitch quality={demoQuality} setQuality={setDemoQuality} />
        </div>
    )
}
import React from 'react';
import {TSectionText} from "../../types/types";
import { marked } from 'marked';
import styles from './TextSection.module.scss'

type TextSectionProps = {
    text: TSectionText,
}

const TextSection = (props: TextSectionProps) => {
    const html = marked(props.text.value);

    return (
        <>
            <div className={styles.text} dangerouslySetInnerHTML={{__html: html}}/>
        </>
    );
}

export default TextSection;
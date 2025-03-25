import React from 'react';
import styles from '../Loader/Loader.module.scss';
import {Spinner} from "@telegram-apps/telegram-ui";

const Loader = () => {
    return (
        <div className={styles.loaderContainer}>
            <Spinner size='l'/>
        </div>
    );
};

export default Loader;
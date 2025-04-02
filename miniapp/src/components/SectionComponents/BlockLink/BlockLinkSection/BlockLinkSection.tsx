import React from 'react';
import styles from "./BlockLinkSection.module.scss";
import { TSectionBlockLink } from "../../../../types/types";
import IconGoToLink from "../../../../icons/IconGoToLink/IconGoToLink";

type BlockLinkSectionProps = {
    blockLink: TSectionBlockLink;
    isViewMode: boolean;
};

const BlockLinkSection = (props: BlockLinkSectionProps) => {    
    const handleLinkClick = () => {
        if (props.blockLink.link && !props.isViewMode) {
            Telegram.WebApp.openLink(props.blockLink.link);
        } else {
            console.log('No URL provided for this link.');
        }
    };

    return (
        <div className={styles.sectionContainer}>
            <div className={styles.texts}>
                <p className={styles.sectionText}>{props.blockLink.name}</p>
            </div>
            <div className={styles.iconWrapper} onClick={handleLinkClick}>
                <IconGoToLink />
            </div>
        </div>
    );
};

export default BlockLinkSection;
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

    const getLinkType = () => {
        const url = new URL(props.blockLink.link);
        console.log(url)
        
        if (url.host.includes('t.me') && url.pathname.includes('tgcardi_bot')) {
          return 'internal';
        }
        
        if (url.host.includes('t.me') || 
            url.host.includes('telegram.me') || 
            url.protocol.startsWith('tg') || 
            (url.protocol.startsWith('https') && url.hostname === 'telegram.org')) {
          return 'telegram';
        }

        return 'external';
    }

    const colorBlockLink = {
        internal: { backgroundColor: '#3A77EE' },
        telegram: { background: 'linear-gradient(45deg, #3A77EE, #3FC1B0)' },
        external: { backgroundColor:  'var(--tgui--button_color)' }
    }

    return (
        <div className={styles.sectionContainer}>
            <div className={styles.texts}>
                <p className={styles.sectionText}>{props.blockLink.name}</p>
            </div>
            <div className={styles.iconWrapper} style={colorBlockLink[getLinkType()]} onClick={handleLinkClick}>
                <IconGoToLink />
            </div>
        </div>
    );
};

export default BlockLinkSection;
import React from 'react';
import styles from './Section.module.scss';
import {
    TImageSection,
    TSection,
    TSectionBlockLink,
    TSectionText,
    TVideoSection,
    TypeSectionEnum
} from "../../types/types";
import TextSection from "../TextSection/TextSection";
import BlockLinkSection from "../BlockLinkSection/BlockLinkSection";
import DividerSection from "../DividerSection/DividerSection";
import VideoSection from "../VideoSection/VideoSection";
import ImageSection from "../ImageSection/ImageSection";

type SectionProps = {
    section: TSection,
    isSelected: boolean,
}

const Section = (props: SectionProps) => {
    function renderSection(typeSectionEnum: TypeSectionEnum) {
        if (typeSectionEnum === TypeSectionEnum.text) {
            return <TextSection text={props.section.value as TSectionText} />
        }
        if (typeSectionEnum === TypeSectionEnum.blockLink) {
            return <BlockLinkSection blockLink={props.section.value as TSectionBlockLink} />
        }
        if (typeSectionEnum === TypeSectionEnum.divider) {
            return <DividerSection />
        }
        if (typeSectionEnum === TypeSectionEnum.video) {
            return <VideoSection video={props.section.value as TVideoSection} />
        }
        if (typeSectionEnum === TypeSectionEnum.image) {
            return <ImageSection img={props.section.value as TImageSection} />
        }
    }
    
    return (
        <div
            className={`${styles.section} ${props.isSelected ? styles.selected : ''}`}
        >
            {renderSection(props.section.typeSectionEnum)}
        </div>
    );
};

export default Section;
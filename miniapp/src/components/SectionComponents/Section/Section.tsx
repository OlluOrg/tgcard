import React from 'react';
import styles from './Section.module.scss';
import {
    TImageSection,
    TSection,
    TSectionBlockLink,
    TSectionText,
    TVideoSection,
    TypeSectionEnum
} from "../../../types/types";
import TextSection from "../Text/TextSection/TextSection";
import BlockLinkSection from "../BlockLink/BlockLinkSection/BlockLinkSection";
import DividerSection from "../Divider/DividerSection/DividerSection";
import VideoSection from "../Video/VideoSection/VideoSection";
import ImageSection from "../Image/ImageSection/ImageSection";
import useCardSections from "../../../hooks/CardPage/useCardSections";
import {useAppDispatch} from "../../../hooks/hooks";
import {selectSection} from "../../../store/slices/myCardsSlice";

type SectionProps = {
    section: TSection,
    isViewMode: boolean;
}

const sectionFactory = {
    [TypeSectionEnum.text]: (props: SectionProps) => 
        <TextSection text={props.section.value as TSectionText} />,
    [TypeSectionEnum.blockLink]: (props: SectionProps) => 
        <BlockLinkSection blockLink={props.section.value as TSectionBlockLink} isViewMode={props.isViewMode} />,
    [TypeSectionEnum.divider]: () => 
        <DividerSection />,
    [TypeSectionEnum.video]: (props: SectionProps) => 
        <VideoSection video={props.section.value as TVideoSection} />,
    [TypeSectionEnum.image]: (props: SectionProps) => 
        <ImageSection img={props.section.value as TImageSection} />,
};

const Section = (props: SectionProps) => {
    const {handleDeleteCommand} = useCardSections();
    const SectionComponent = sectionFactory[props.section.typeSectionEnum];
    
    return (
        <div
            onContextMenu={(e) => {
                if (!props.isViewMode) {
                    e.preventDefault();
                    handleDeleteCommand(props.section.id);
                }
            }}
            className={`${styles.section}`}
        >
            <SectionComponent {...props} />
        </div>
    );
};

export default Section;
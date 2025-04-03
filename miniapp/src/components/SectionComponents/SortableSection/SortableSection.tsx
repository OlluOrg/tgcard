import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import styles from './SortableSection.module.scss';
import cardStyles from '../../../pages/CardPage/CardPage.module.scss';
import Section from "../Section/Section";
import { TSection } from "../../../types/types";

const SortableSection = ({ section, onClick, isViewMode }: {
    section: TSection;
    onClick: () => void;
    isViewMode: boolean;
}) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ 
        id: section.id
     });

    const style = {
        transform: transform ? CSS.Transform.toString({
            ...transform,
            scaleX: 1,
            scaleY: 1,
        }) : undefined,
        transition: transition || undefined,
        marginLeft: '20px',
        paddingRight: '20px',
        opacity: isDragging ? 0.8 : 1,
        zIndex: isDragging ? 999 : 'auto',
        position: isDragging ? 'relative' as 'relative' : 'static' as 'static',
        willChange: 'transform',
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            className={`${cardStyles.sectionWrapper} ${!isViewMode ? styles.editModeStyle : ''}`}
            onClick={onClick}
        >
            <Section
                section={section}
                isViewMode={isViewMode}
            />
        </div>
    );
};

export default SortableSection;
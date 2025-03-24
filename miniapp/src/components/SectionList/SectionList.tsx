import React, { useMemo } from 'react';
import {
    closestCenter,
    DndContext,
    DragEndEvent, PointerSensor,
    TouchSensor,
    useSensor,
    useSensors
} from "@dnd-kit/core";
import {restrictToWindowEdges} from "@dnd-kit/modifiers";
import {SortableContext, verticalListSortingStrategy} from "@dnd-kit/sortable";
import styles from "../../pages/CardPage/CardPage.module.scss";
import SortableSection from "../SortableSection/SortableSection";
import {updateCardSections} from "../../store/slices/myCardsSlice";
import {useAppDispatch, useAppSelector} from "../../hooks/hooks";
import useCardSections from "../../hooks/CardPage/useCardSections";
import {updateBusinessCards} from "../../store/apiThunks/businessCardThunks";

interface SectionListProps {
    isGuest: boolean;
}

const SectionList = (props: SectionListProps) => {
    const dispatch = useAppDispatch();
    const {handleSectionClick} = useCardSections();
    const {cards, selectedCardId, selectedSectionId} = useAppSelector(state => state.myCards);
    let card = cards.find(card => card.businessCardId === selectedCardId)!;

    const isTouchDevice = 'ontouchstart' in window;

    const pointerSensor = useSensor(PointerSensor, {
        activationConstraint: {
            distance: 5,
        },
    });

    const touchSensor = useSensor(TouchSensor, {
        activationConstraint: {
            delay: 250,
            tolerance: 5,
        },
    });

    const sensors = useSensors(
        ...useMemo(() => {
            if (props.isGuest) {
                return [];
            }
            const sensorsArray = [];

            if (!isTouchDevice) {
                sensorsArray.push(pointerSensor);
            }

            if (isTouchDevice) {
                sensorsArray.push(touchSensor);
            }

            return sensorsArray;
        }, [isTouchDevice, pointerSensor, touchSensor])
    );

    const handleDragEnd = (event: DragEndEvent) => {
        if (props.isGuest) {
            return;
        }
        const { active, over } = event;
        if (!over || active.id === over.id) return;

        const oldIndex = card.sections.findIndex(s => s.id === active.id);
        const newIndex = card.sections.findIndex(s => s.id === over.id);

        const newSections = [...card.sections];
        const [movedSection] = newSections.splice(oldIndex, 1);
        newSections.splice(newIndex, 0, movedSection);

        const updatedSections = newSections.map((section, index) => ({
            ...section,
            order: index + 1,
        }));

        dispatch(updateCardSections({newSections: updatedSections}));
        dispatch(updateBusinessCards({}))
    };

    if (!card) {
        return <div>Loading...</div>;
    }

    return (
        <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
            modifiers={[restrictToWindowEdges]}
        >
            <SortableContext
                items={card.sections}
                strategy={verticalListSortingStrategy}
            >
                <div className={styles.card}>
                    {card.sections.map((section) => (
                        <SortableSection
                            key={section.id}
                            section={section}
                            onClick={() => handleSectionClick(section.id)}
                            isSelected={section.id === selectedSectionId}
                        />
                    ))}
                </div>
            </SortableContext>
        </DndContext>
    );
};

export default SectionList;
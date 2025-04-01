import React, { useMemo } from 'react';
import {
    DndContext,
    DragEndEvent, PointerSensor, rectIntersection,
    TouchSensor,
    useSensor,
    useSensors
} from "@dnd-kit/core";
import {restrictToVerticalAxis, restrictToWindowEdges, restrictToParentElement} from "@dnd-kit/modifiers";
import {SortableContext, verticalListSortingStrategy} from "@dnd-kit/sortable";
import styles from "../../pages/CardPage/CardPage.module.scss";
import SortableSection from "../SortableSection/SortableSection";
import {updateCardSections} from "../../store/slices/myCardsSlice";
import {useAppDispatch, useAppSelector} from "../../hooks/hooks";
import useCardSections from "../../hooks/CardPage/useCardSections";
import {updateBusinessCards} from "../../store/apiThunks/businessCardThunks";
import Loader from "../Loader/Loader";

interface SectionListProps {
    isViewMode: boolean;
}

const SectionList = (props: SectionListProps) => {
    const dispatch = useAppDispatch();
    const {handleSectionClick} = useCardSections();
    const {cards, selectedCardId, selectedSectionId, isLoading} = useAppSelector(state => state.myCards);
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
            if (props.isViewMode) {
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
        if (props.isViewMode) {
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

    if (isLoading || !card) {
        return <Loader />
    }

    return (
        <DndContext
            sensors={sensors}
            collisionDetection={rectIntersection}
            onDragEnd={handleDragEnd}
            modifiers={[restrictToVerticalAxis, restrictToWindowEdges, restrictToParentElement]}
        >
            <SortableContext
                items={card.sections}
                strategy={verticalListSortingStrategy}
            >
                <div className={styles.card}>
                    {card.sections.length === 0 ? (
                        <div className={styles.emptyState}>
                            <p className={styles.emptyStateTitle}>Тут пока пусто...</p>
                            <p className={styles.emptyStateSubtitle}>но вы можете добавить секцию</p>
                        </div>
                    ) : (card.sections.map((section) => (
                            <SortableSection
                                key={section.id}
                                section={section}
                                onClick={() => handleSectionClick(section.id)}
                                isSelected={section.id === selectedSectionId}
                            />
                        ))
                    )}
                </div>
            </SortableContext>
        </DndContext>
    );
};

export default SectionList;
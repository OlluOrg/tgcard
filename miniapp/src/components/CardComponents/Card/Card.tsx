import React from 'react';
import {Cell} from "@telegram-apps/telegram-ui";
import {TCard} from "../../../types/types";
import useCards from "../../../hooks/MyCards/useCard";
import {useAppSelector} from "../../../hooks/hooks";

interface CardProps {
    card: TCard
}

const Card = (props: CardProps) => {
    const {handleCardClick} = useCards();

    const {selectedCardId} = useAppSelector(state => state.myCards);

    return (
        <Cell
            key={props.card.businessCardId}
            description={props.card.createdAt ? new Date(props.card.createdAt).toLocaleDateString() : ''}
            onClick={() => handleCardClick(props.card.businessCardId!)}
            hovered={props.card.businessCardId === selectedCardId}
        >
            {props.card.title}
        </Cell>
    );
};

export default Card;
import React from 'react';
import styles from "../../pages/MyCardsPage/MyCardsPage.module.scss";
import {TCard} from "../../types/types";
import {Cell} from "@telegram-apps/telegram-ui";
import {useAppDispatch, useAppSelector} from "../../hooks/hooks";
import useCard from "../../hooks/MyCards/useCard";
import {ContextMenuItem, ContextMenuWrapperDiv} from "react-procedural-context-menu";
import {selectCard} from "../../store/slices/myCardsSlice";
import {ContextMenuPropsWithBindings} from "react-procedural-context-menu/dist/src/ContextMenu/ContextMenuWrapperDiv";

const CardList = () => {
    const {cards, selectedCardId} = useAppSelector(state => state.myCards);
    const {handleCardClick, handleEdit, handleCopyLink} = useCard();

    const sortCardsByDate = (cards: TCard[]) => {
        return [...cards].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    };
    const sortCards = sortCardsByDate(cards);

    const createContextMenu = (cardId: string): ContextMenuPropsWithBindings => {
        const menu: ContextMenuItem[] = [
            { text: "Открыть", onClick: () => handleCardClick(cardId)},
            { text: "Редактировать", onClick: () => handleEdit(cardId)},
            { text: "Настройки доступа", onClick: () => alert("Не готово") },
            { text: "Архивировать", onClick: () => alert("Не готово") },
            { text: "Поделиться", sub: [
                    {text: "Скопировать ссылку", onClick: () => handleCopyLink(cardId)},
                    {text: "Отправить ссылку", onClick: () => alert("Не готово")},
                    {text: "Показать QR код", onClick: () => alert("Не готово")}
                ]}
        ];

        return { contextMenu: menu }
    }

    return (
        <div className={styles.cardList}>
            {cards.length === 0 ? (
                <div className={styles.emptyState}>
                    <p className={styles.emptyStateTitle}>Тут пока пусто...</p>
                    <p className={styles.emptyStateSubtitle}>но вы можете добавить свою первую визитку</p>
                </div>
            ) : (sortCards.map((card: TCard, index: number) => {

                return (
                    <ContextMenuWrapperDiv menus={createContextMenu(card.businessCardId!)}>
                    <Cell
                        key={card.businessCardId}
                        subtitle={card.description}
                        description={new Date(card.date).toLocaleDateString()}
                        onClick={() => handleCardClick(card.businessCardId!)}
                        hovered={card.businessCardId === selectedCardId}
                    >
                        {card.title}
                    </Cell>
                </ContextMenuWrapperDiv>
                )
            })
        )}
        </div>
    );
};

export default CardList;
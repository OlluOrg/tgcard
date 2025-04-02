import React from 'react';
import styles from "../../../pages/MyCardsPage/MyCardsPage.module.scss";
import {TCard} from "../../../types/types";
import {Cell} from "@telegram-apps/telegram-ui";
import {useAppSelector} from "../../../hooks/hooks";
import useCard from "../../../hooks/MyCards/useCard";
import { ContextMenu } from "radix-ui";

const CardList = () => {
    const {cards, selectedCardId} = useAppSelector(state => state.myCards);
    const {handleCardClick, handleEdit, handleCopyLink, handleDelete} = useCard();

    return (
        <div className={styles.cardList}>
            {cards.length === 0 ? (
                <div className={styles.emptyState}>
                    <p className={styles.emptyStateTitle}>Тут пока пусто...</p>
                    <p className={styles.emptyStateSubtitle}>но вы можете добавить свою первую визитку</p>
                </div>
            ) : (cards.map((card: TCard, index: number) => {

                return (
                    <ContextMenu.Root>
                        <ContextMenu.Trigger>
                            <Cell
                                key={card.businessCardId}
                                description={card.createdAt ? new Date(card.createdAt).toLocaleDateString() : ''}
                                onClick={() => handleCardClick(card.businessCardId!)}
                                hovered={card.businessCardId === selectedCardId}
                            >
                                {card.title}
                            </Cell>
                        </ContextMenu.Trigger>
                        <ContextMenu.Portal>
                            <ContextMenu.Content>
                                <ContextMenu.Item onClick={() => handleCardClick(card.businessCardId!)}>Открыть</ContextMenu.Item>
                                <ContextMenu.Item onClick={() => handleEdit(card.businessCardId!)}>Редактировать</ContextMenu.Item>
                                <ContextMenu.Item onClick={() => handleDelete(card.businessCardId!)}>Удалить</ContextMenu.Item>
                                <ContextMenu.Item onClick={() => alert("Не готово")}>Настройки доступа</ContextMenu.Item>
                                <ContextMenu.Item onClick={() => alert("Не готово")}>Архивировать</ContextMenu.Item>
                                <ContextMenu.Sub>
                                    <ContextMenu.SubTrigger>
                                        Поделиться
                                    </ContextMenu.SubTrigger>
                                    <ContextMenu.Portal>
                                        <ContextMenu.SubContent>
                                            <ContextMenu.Item onClick={() => handleCopyLink(card.businessCardId!)}>Скопировать ссылку</ContextMenu.Item>
                                            <ContextMenu.Item onClick={() => alert("Не готово")}>Отправить ссылку</ContextMenu.Item>
                                            <ContextMenu.Item onClick={() => alert("Не готово")}>Показать QR код</ContextMenu.Item>
                                        </ContextMenu.SubContent>
                                    </ContextMenu.Portal>
                                </ContextMenu.Sub>
                            </ContextMenu.Content>
                        </ContextMenu.Portal>
                    </ContextMenu.Root>
                )
            })
        )}
        </div>
    );
};

export default CardList;
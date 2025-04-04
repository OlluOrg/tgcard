import React from 'react';
import {ContextMenu} from "radix-ui";
import {TCard} from "../../../types/types";
import useCard from "../../../hooks/MyCards/useCard";
import Card from "../../CardComponents/Card/Card";
import styles from './ConextMenuWithCard.module.scss'

interface ContextMenuWithCardProps{
    card: TCard
}

const ContextMenuWithCard = (props: ContextMenuWithCardProps) => {
    const {handleCardClick, handleEdit, handleDelete, handleCopyLink} = useCard();

    return (
        <ContextMenu.Root>
            <ContextMenu.Trigger>
                <Card card={props.card}/>
            </ContextMenu.Trigger>
            <ContextMenu.Portal>
                <ContextMenu.Content className={styles.content}>
                    <ContextMenu.Item className={styles.item}
                                      onClick={() => handleCardClick(props.card.businessCardId!)}>Открыть
                    </ContextMenu.Item>
                    <ContextMenu.Item className={styles.item}
                                      onClick={() => handleEdit(props.card.businessCardId!)}>Редактировать
                    </ContextMenu.Item>
                    <ContextMenu.Item className={styles.item}
                                      onClick={() => handleDelete(props.card.businessCardId!)}>Удалить
                    </ContextMenu.Item>
                    <ContextMenu.Item className={styles.item}
                                      onClick={() => alert("Не готово")}>Настройки доступа
                    </ContextMenu.Item>
                    <ContextMenu.Item className={styles.item}
                                      onClick={() => alert("Не готово")}>Архивировать
                    </ContextMenu.Item>
                    <ContextMenu.Item className={styles.item}
                                      onClick={() => handleCopyLink(props.card.businessCardId!)}>Скопировать ссылку
                    </ContextMenu.Item>
                    <ContextMenu.Item className={styles.item}
                                      onClick={() => alert("Не готово")}>Отправить ссылку
                    </ContextMenu.Item>
                    <ContextMenu.Item className={styles.item}
                                      onClick={() => alert("Не готово")}>Показать QR код
                    </ContextMenu.Item>
                </ContextMenu.Content>
            </ContextMenu.Portal>
        </ContextMenu.Root>
    );
};

export default ContextMenuWithCard;
import {TCardHistory} from "../../types/types";
import styles from "../../pages/MyCardsPage/MyCardsPage.module.scss";
import {Cell} from "@telegram-apps/telegram-ui";
import {useAppSelector} from "../../hooks/hooks";
import useCard from "../../hooks/MyCards/useCard";

const CardsHistoryList = () => {
    const { viewHistory } = useAppSelector(state => state.myCards);
    const { selectedCardId } = useAppSelector(state => state.myCards);

    const { handleCardClick } = useCard();

    return (
        <div className={styles.cardList}>
            {viewHistory.length === 0 ? (
            <div className={styles.emptyState}>
                <p className={styles.emptyStateTitle}>Тут пока пусто...</p>
                <p className={styles.emptyStateSubtitle}>но здесь отобразится ваша история визиток</p>
            </div>
            ) : (
                viewHistory.map((card: TCardHistory) => (
                    <Cell
                        key={card.id}
                        subtitle={card.description}
                        description={card.createdAt ? new Date(card.createdAt).toLocaleDateString() : ''}
                        onClick={() => handleCardClick(card.businessCardId!)}
                        hovered={card.businessCardId === selectedCardId}
                    >
                        {card.title}
                    </Cell>
                ))
            )}
        </div>
    );
};


export default CardsHistoryList;
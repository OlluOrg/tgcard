import React from 'react';
import {
    ModalHeader
} from "@telegram-apps/telegram-ui/dist/components/Overlays/Modal/components/ModalHeader/ModalHeader";
import {setIsModalDeleteOpen} from "../../store/slices/modalsMyCardsSlice";
import styles from "../../pages/MyCardsPage/MyCardsPage.module.scss";
import {Button, Modal} from "@telegram-apps/telegram-ui";
import {useAppDispatch, useAppSelector} from "../../hooks/hooks";
import useCard from "../../hooks/MyCards/useCard";
import {selectCard} from "../../store/slices/myCardsSlice";

const ModalDeleteCard = () => {
    const dispatch = useAppDispatch();

    const {isModalDeleteOpen} = useAppSelector(state => state.modalsMyCards);

    const {handleDeleteConfirm} = useCard();

    return (
        <Modal
            header={<ModalHeader>Удалить визитку?</ModalHeader>}
            style={{ zIndex: 1001}}
            open={isModalDeleteOpen}
            onOpenChange={open => {
                if (!open) dispatch(selectCard({selectedCardId: null}));
                dispatch(setIsModalDeleteOpen(open));
            }}
        >
            <div className={styles.modalDelete}>
                <p>Удалить визитку?</p>
                <div className={styles.modalDeleteBtns}>
                    <Button mode="outline" size="m" onClick={() => {
                        dispatch(selectCard({selectedCardId: null}));
                        dispatch(setIsModalDeleteOpen(false));
                    }}>
                        Нет
                    </Button>
                    <Button mode="filled" size="m" onClick={handleDeleteConfirm}>
                        Да
                    </Button>
                </div>
            </div>
        </Modal>
    );
};

export default ModalDeleteCard;
import { useAppDispatch, useAppSelector } from "../hooks";
import {
  setNameError,
  setNameNewCard,
} from "../../store/slices/cardSlice";
import {
  setIsModalAddOpen,
  setIsModalDeleteOpen,
  setIsModalSettingsOpen, setIsSnackbarCopyLinkOpen,
} from "../../store/slices/modalsMyCardsSlice";
import {
  deleteCard,
  selectCard,
  updateCard,
} from "../../store/slices/myCardsSlice";
import { useEffect } from "react";
import { generatePath, useNavigate } from "react-router-dom";
import { ROUTES } from "../../routes";
import {
  createBusinessCard,
  deleteBusinessCard, updateBusinessCards,
} from "../../store/apiThunks/businessCardThunks";
import { TCard } from "../../types/types";
import {addHistory} from "../../store/apiThunks/historyThunks";
import {getUserId} from "../../utils/getUserId";
import {CARD_MODE} from "../../constants/cardMode";
import {CARD_TITLE} from "../../constants/cardTitle";

const useCards = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const userId = getUserId();

  const { cards, selectedCardId } = useAppSelector((state) => state.myCards);
  const { nameNewCard } = useAppSelector(
    (state) => state.card
  );

  useEffect(() => {
    if (nameNewCard.length === 0) {
      dispatch(setNameError("Название обязательно"));
    } else if (nameNewCard.length > CARD_TITLE.MAX_NAME_LENGTH) {
      dispatch(setNameError(`Максимум ${CARD_TITLE.MAX_NAME_LENGTH} символов`));
    } else {
      dispatch(setNameError(""));
    }
  }, [nameNewCard]);

  const isFormValid = () => {
    return (
      nameNewCard.length > 0 &&
      nameNewCard.length <= CARD_TITLE.MAX_NAME_LENGTH
    );
  };

  const closeAddModal = () => {
    dispatch(setNameNewCard(""));
    dispatch(setIsModalAddOpen(false));
  };

  const handleAdd = () => {
    if (!isFormValid()) return;

    const newCard: TCard = {
      id: cards.length + 1,
      title: nameNewCard,
      sections: [],
    };

    closeAddModal();
    dispatch(createBusinessCard({card: newCard})).unwrap().then((result) => {
      navigate(generatePath(ROUTES.CARD, {cardId: result.businessCardId}));
      dispatch(addHistory({userId: userId, businessCardId: result.businessCardId}));
    });
  };

  const handleDeleteConfirm = () => {
    dispatch(deleteBusinessCard({}));
    dispatch(deleteCard());
    dispatch(selectCard({selectedCardId: null}))
    dispatch(setIsModalDeleteOpen(false));
  };

  const handleCopyLink = (cardId: string) => {
    const link = generatePath(ROUTES.CARD, { cardId: cardId });
    navigator.clipboard
      .writeText(`https://t.me/tgcardi_bot?startapp=cardId_${cardId}`)
      .then(() => {
        dispatch(setIsSnackbarCopyLinkOpen(true))
        console.log(
          "Link copied to clipboard:",
          `${window.location.origin}${link}`
        );
      })
      .catch((error) => {
        console.error("Failed to copy link:", error);
      });
  };

  const handleEdit = (businessCardId: string) => {
    dispatch(selectCard({selectedCardId: businessCardId}));
    navigate(generatePath(ROUTES.CARD, { cardId: businessCardId }));
    dispatch(addHistory({userId: userId, businessCardId: businessCardId}));
  };

  const handleDelete = (businessCardId: string) => {
    dispatch(selectCard({selectedCardId: businessCardId}));
    dispatch(setIsModalDeleteOpen(true));
  };

  const handleCardClick = (id: string) => {
    dispatch(selectCard({ selectedCardId: id === selectedCardId ? null : id }));
    navigate(generatePath(ROUTES.CARD, { cardId: id, mode: CARD_MODE.VIEW }));
    dispatch(addHistory({userId: userId, businessCardId: id}));
  };

  const closeSettingsModal = () => {
    dispatch(setIsModalSettingsOpen(false));
    dispatch(setNameNewCard(""));
  };

  const handleSave = () => {
    if (!isFormValid()) return;

    dispatch(
      updateCard({
        id: selectedCardId,
        title: nameNewCard,
      })
    );

    closeSettingsModal();

    dispatch(updateBusinessCards({}));
  };

  return {
    isFormValid,
    closeAddModal,
    handleAdd,
    handleDeleteConfirm,
    handleCopyLink,
    handleDelete,
    handleEdit,
    handleCardClick,
    closeSettingsModal,
    handleSave,
  };
};

export default useCards;

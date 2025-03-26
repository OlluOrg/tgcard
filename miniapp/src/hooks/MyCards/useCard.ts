import { useAppDispatch, useAppSelector } from "../hooks";
import {
  setDescriptionError,
  setDescriptionNewCard,
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

const useCards = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const userId = getUserId();

  const { cards, selectedCardId } = useAppSelector((state) => state.myCards);
  const { nameNewCard, descriptionNewCard } = useAppSelector(
    (state) => state.card
  );

  useEffect(() => {
    if (nameNewCard.length === 0) {
      dispatch(setNameError("Название обязательно"));
    } else if (nameNewCard.length > 100) {
      dispatch(setNameError("Максимум 100 символов"));
    } else {
      dispatch(setNameError(""));
    }
  }, [nameNewCard]);

  useEffect(() => {
    if (descriptionNewCard.length > 200) {
      dispatch(setDescriptionError("Максимум 200 символов"));
    } else {
      dispatch(setDescriptionError(""));
    }
  }, [descriptionNewCard]);

  const isFormValid = () => {
    return (
      nameNewCard.length > 0 &&
      nameNewCard.length <= 100 &&
      descriptionNewCard.length <= 200
    );
  };

  const closeAddModal = () => {
    dispatch(setNameNewCard(""));
    dispatch(setDescriptionNewCard(""));
    dispatch(setIsModalAddOpen(false));
  };

  const handleAdd = () => {
    if (!isFormValid()) return;

    const newCard: TCard = {
      id: cards.length + 1,
      date: new Date(),
      title: nameNewCard,
      description: descriptionNewCard,
      sections: [{
          id: "7101b6cb-5ec4-4d87-8346-4846dbfc1727",
          typeSectionEnum: 0,
          value: {
            value: `## ${nameNewCard}`
          },
          order: 1
        },
        {
          id: "38b3c668-8d8e-4065-931f-8ba582ed9a33",
          typeSectionEnum: 2,
          order: 2,
          value: ''
        }],
    };

    closeAddModal();
    dispatch(createBusinessCard({card: newCard})).unwrap().then((result) => {
      navigate(generatePath(ROUTES.CARD, {cardId: result.businessCardId}));
    });
  };

  const handleDeleteConfirm = () => {
    dispatch(deleteBusinessCard({}));
    dispatch(deleteCard());
    dispatch(setIsModalDeleteOpen(false));
  };

  const handleCopyLink = () => {
    if (selectedCardId) {
      const link = generatePath(ROUTES.CARD, { cardId: selectedCardId });
      navigator.clipboard
        .writeText(`https://t.me/tgcardi_bot?startapp=cardId_${selectedCardId}`)
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
    } else {
      console.warn("No card selected to copy link.");
    }
  };

  const handleEdit = () => {
    if (selectedCardId) {
      navigate(generatePath(ROUTES.CARD, { cardId: selectedCardId }));

      dispatch(addHistory({userId: userId, businessCardId: selectedCardId}));
    }
  };

  const handleDelete = () => {
    selectedCardId && dispatch(setIsModalDeleteOpen(true));
  };

  const handleCardClick = (id: string) => {
    dispatch(selectCard({ selectedCardId: id === selectedCardId ? null : id }));
  };

  const closeSettingsModal = () => {
    dispatch(setIsModalSettingsOpen(false));
    dispatch(setNameNewCard(""));
    dispatch(setDescriptionNewCard(""));
  };

  const handleSave = () => {
    if (!isFormValid()) return;

    dispatch(
      updateCard({
        id: selectedCardId,
        title: nameNewCard,
        description: descriptionNewCard,
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

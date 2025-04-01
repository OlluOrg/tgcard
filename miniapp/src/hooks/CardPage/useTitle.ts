import {useAppDispatch, useAppSelector} from "../hooks";
import {setIsTitleEditOpen} from "../../store/slices/modalsCardPageSlice";
import {editTitle} from "../../store/slices/myCardsSlice";
import useCard from "../MyCards/useCard";
import {updateBusinessCards} from "../../store/apiThunks/businessCardThunks";

export const useTitle = () => {
    const dispatch = useAppDispatch();
    const {nameNewCard} = useAppSelector(state => state.card);

    const {isFormValid} = useCard()

    const handleCancel = () => {
        dispatch(setIsTitleEditOpen(false))
    }

    const handleSave = () => {
        if (!isFormValid()) return;

        dispatch(setIsTitleEditOpen(false))
        dispatch(editTitle(nameNewCard))

        dispatch(updateBusinessCards({}));
    }

    return {
        handleCancel,
        handleSave
    }
}

export default useTitle;
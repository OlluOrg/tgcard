import {useAppDispatch} from "../hooks";
import {setIsModalChooseSectionOpen} from "../../store/slices/modalsCardPageSlice";
import {addDividerSection} from "../../store/slices/myCardsSlice";
import {updateBusinessCards} from "../../store/apiThunks/businessCardThunks";

const useDividerSection = () => {
    const dispatch = useAppDispatch();


    const handleChooseDividerSection = () => {
        dispatch(setIsModalChooseSectionOpen(false));
        dispatch(addDividerSection());

        dispatch(updateBusinessCards({}))
    };

    return {
        handleChooseDividerSection,
    };
}

export default useDividerSection
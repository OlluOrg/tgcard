import {useAppDispatch} from "../hooks";
import {setIsModalChooseSectionOpen} from "../../store/slices/modalsCardPageSlice";
import {addDividerSection} from "../../store/slices/myCardsSlice";
import {updateBusinessCards} from "../../store/apiThunks/businessCardThunks";
import {USER_ID} from "../../services/constants";

const useDividerSection = () => {
    const dispatch = useAppDispatch();


    const handleChooseDividerSection = () => {
        dispatch(setIsModalChooseSectionOpen(false));
        dispatch(addDividerSection());

        dispatch(updateBusinessCards({userId: USER_ID}))
    };

    return {
        handleChooseDividerSection,
    };
}

export default useDividerSection
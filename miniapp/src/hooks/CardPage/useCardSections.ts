import {useAppDispatch, useAppSelector} from "../hooks";
import {
    deleteSection, selectCard,
    selectSection,
} from "../../store/slices/myCardsSlice";
import {generatePath, useNavigate} from "react-router-dom";
import {ROUTES} from "../../routes";
import {
    setIsEditBlock,
    setIsModalEditBlockLinkOpen,
    setIsModalEditTextOpen,
    setIsModalEditVideoSectionOpen
} from "../../store/slices/modalsCardPageSlice";
import {TSection, TSectionBlockLink, TSectionText, TVideoSection, TypeSectionEnum} from "../../types/types";
import {setNameBlockLinkInput} from "../../store/slices/linkSlice";
import {setMarkdown} from "../../store/slices/textSlice";
import {setLinkVideoInput} from "../../store/slices/videoSlice";
import {updateBusinessCards} from "../../store/apiThunks/businessCardThunks";


export const useCardSections = () => {
    const dispatch = useAppDispatch();
    const {cards, selectedCardId, selectedSectionId} = useAppSelector(state => state.myCards)

    const {markdown} = useAppSelector(state => state.text);

    const navigate = useNavigate();

    const card = cards.find(card => card.businessCardId === selectedCardId)!;

    function getSelectedSection(): TSection {
        return card.sections.filter(a => a.id === selectedSectionId)[0];
    }

    const handleEdit = () => {
        if (selectedSectionId === 0) {
            alert(`Выберете секцию`);
        }
        dispatch(setIsEditBlock(true));

        let selectSection: TSection = getSelectedSection();
        if (selectSection.typeSectionEnum === TypeSectionEnum.text) {
            const text = selectSection.value as TSectionText;
            dispatch(setMarkdown(text.value));
            dispatch(setIsModalEditTextOpen(true));
        }
        if (selectSection.typeSectionEnum === TypeSectionEnum.blockLink) {
            const blockLink = selectSection.value as TSectionBlockLink;
            dispatch(setNameBlockLinkInput(blockLink.name));
            dispatch(setNameBlockLinkInput(blockLink.name));
            dispatch(setIsModalEditBlockLinkOpen(true));
        }
        if (selectSection.typeSectionEnum === TypeSectionEnum.video) {
            const video = selectSection.value as TVideoSection;
            dispatch(setLinkVideoInput(video.src));
            dispatch(setIsModalEditVideoSectionOpen(true));
        }
    };

    const handleSectionClick = (id: number) => {
        dispatch(selectSection({selectedSectionId: selectedSectionId === id ? null : id}));
    };

    const handleDelete = () => {
        dispatch(deleteSection());
        dispatch(updateBusinessCards({}))
    };

    const handleDone = () => {
        dispatch(selectSection({selectedSectionId: null}));
        dispatch(selectCard({selectedCardId: null}))
        const url = generatePath(ROUTES.MY_CARDS);
        navigate(url);
    };

    return {
        handleEdit,
        handleSectionClick,
        handleDelete,
        handleDone
    };
}

export default useCardSections;
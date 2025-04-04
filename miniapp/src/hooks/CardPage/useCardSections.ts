import {useAppDispatch, useAppSelector} from "../hooks";
import {
    addTextSection,
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
import {setLinkBlockLinkInput, setNameBlockLinkInput} from "../../store/slices/linkSlice";
import {setMarkdown} from "../../store/slices/textSlice";
import {setLinkVideoInput} from "../../store/slices/videoSlice";
import {updateBusinessCards} from "../../store/apiThunks/businessCardThunks";
import {setNameNewCard} from "../../store/slices/cardSlice";
import {text} from "node:stream/consumers";


export const useCardSections = () => {
    const dispatch = useAppDispatch();
    const {cards, selectedCardId, selectedSectionId} = useAppSelector(state => state.myCards)

    const navigate = useNavigate();

    const card = cards.find(card => card.businessCardId === selectedCardId)!;

    function getSection(id: string): TSection {
        return card.sections.filter(a => a.id === id)[0];
    }

    type EditHandler = (value: any) => void;

    const editHandlers = new Map<TypeSectionEnum, EditHandler>([
        [TypeSectionEnum.text, (value: TSectionText) => {
            dispatch(setMarkdown(value.value));
            dispatch(setIsModalEditTextOpen(true));
        }],
        [TypeSectionEnum.blockLink, (value: TSectionBlockLink) => {
            dispatch(setNameBlockLinkInput(value.name));
            dispatch(setLinkBlockLinkInput(value.link));
            dispatch(setIsModalEditBlockLinkOpen(true));
        }],
        [TypeSectionEnum.video, (value: TVideoSection) => {
            dispatch(setLinkVideoInput(value.src));
            dispatch(setIsModalEditVideoSectionOpen(true));
        }]
    ]);

    const handleEdit = (id: string, isViewMode: boolean) => {
        if (isViewMode) {
            return;
        }

        dispatch(selectSection({selectedSectionId: id}));
        dispatch(setIsEditBlock(true));
        const section = getSection(id);
        const handler = editHandlers.get(section.typeSectionEnum);
        
        if (handler) {
            handler(section.value);
        }
    };

    const addSection = (sectionType: TypeSectionEnum, value: any) => {
        switch (sectionType) {
            case TypeSectionEnum.text:
                dispatch(setIsModalEditTextOpen(false));
                dispatch(addTextSection({text: value}));
                dispatch(setMarkdown(''));
                break;
        }

        dispatch(updateBusinessCards({}))
    }

    const handleDelete = () => {
        dispatch(deleteSection());
        dispatch(updateBusinessCards({}))
    };

    const handleDone = () => {
        dispatch(selectSection({selectedSectionId: null}));
        dispatch(selectCard({selectedCardId: null}))
        dispatch(setNameNewCard(""));
        const url = generatePath(ROUTES.MY_CARDS);
        navigate(url);
    };

    return {
        handleEdit,
        handleDelete,
        handleDone,
        addSection
    };
}

export default useCardSections;
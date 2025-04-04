import {Command} from "../Command";
import {
    TDivider,
    TImageSection,
    TSection,
    TSectionBlockLink,
    TSectionText,
    TVideoSection,
    TypeSectionEnum
} from "../../types/types";
import {AppDispatch} from "../../store/store";
import {addSection, deleteSectionById} from "../../store/slices/myCardsSlice";
import {updateBusinessCards} from "../../store/apiThunks/businessCardThunks";

export class AddSectionCommand implements Command {
    private section: TSection;

    constructor(
        sectionType: TypeSectionEnum,
        value: TSectionText | TDivider | TImageSection | TVideoSection | TSectionBlockLink,
        ) {
        this.section = {
            id: crypto.randomUUID(),
            typeSectionEnum: sectionType,
            order: -1,
            value: value,
        }
    }

    execute(dispatch: AppDispatch) {
        dispatch(addSection({section: this.section}));
        dispatch(updateBusinessCards({}));
    }

    undo(dispatch: AppDispatch) {
        dispatch(deleteSectionById({sectionId: this.section.id}));
        dispatch(updateBusinessCards({}));
    }
}
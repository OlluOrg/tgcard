import {Command} from "../Command";
import {AppDispatch} from "../../store/store";
import {TSection} from "../../types/types";
import {addSection, deleteSectionById} from "../../store/slices/myCardsSlice";
import {updateBusinessCards} from "../../store/apiThunks/businessCardThunks";

export class DeleteSectionCommand implements Command {
    private readonly section: TSection;

    constructor(section: TSection) {
        this.section = section;
    }

    execute(dispatch: AppDispatch) {
        console.log(this.section);
        dispatch(deleteSectionById({sectionId: this.section.id}));
        dispatch(updateBusinessCards({}));
    }

    undo(dispatch: AppDispatch) {
        console.log(this.section);
        dispatch(addSection({section: this.section}));
        dispatch(updateBusinessCards({}));
    }
}
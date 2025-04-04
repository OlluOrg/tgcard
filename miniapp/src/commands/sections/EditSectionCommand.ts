import {Command} from "../Command";
import {AppDispatch} from "../../store/store";
import {TSection} from "../../types/types";
import {editSection} from "../../store/slices/myCardsSlice";
import {updateBusinessCards} from "../../store/apiThunks/businessCardThunks";

export class EditSectionCommand implements Command {
    private readonly oldSection: TSection;
    private readonly newSection: TSection;

    constructor(oldSection: TSection, newSection: TSection) {
        this.oldSection = oldSection;
        this.newSection = newSection;
    }

    execute(dispatch: AppDispatch) {
        dispatch(editSection({section: this.newSection}));
        dispatch(updateBusinessCards({}));
    }

    undo(dispatch: AppDispatch) {
        dispatch(editSection({section: this.oldSection}));
        dispatch(updateBusinessCards({}));
    }
}
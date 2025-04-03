import {Command} from "../Command";
import {TSection, TypeSectionEnum} from "../../types/types";
import {AppDispatch} from "../../store/store";
import {addTextSection, deleteSection} from "../../store/slices/myCardsSlice";

export class AddSectionCommand implements Command {
    private sectionType: TypeSectionEnum;
    private value: any;

    constructor(
        sectionType: TypeSectionEnum,
        value: any,
        ) {
        this.sectionType = sectionType;
        this.value = value;
    }

    execute(dispatch: AppDispatch) {
        switch (this.sectionType) {
            case TypeSectionEnum.image:
                break;
        }
    }

    undo(dispatch: AppDispatch) {
        dispatch(deleteSection());
    }
}
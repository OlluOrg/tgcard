import {AppDispatch} from "../store/store";

export interface Command {
    execute(dispatch: AppDispatch): void;
    undo(dispatch: AppDispatch): void;
}
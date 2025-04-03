import {Command} from "./Command";
import {AppDispatch} from "../store/store";

export class CommandManager {
    private history: Command[] = [];
    private undoStack: Command[] = [];
    private dispatch: AppDispatch;

    constructor(dispatch: AppDispatch) {
        this.dispatch = dispatch;
    }

    execute(command: Command) {
        command.execute(this.dispatch);
        this.history.push(command);
        this.undoStack = [];
    }

    undo() {
        const command = this.history.pop();
        if (command) {
            command.undo(this.dispatch);
            this.undoStack.push(command);
        }
    }

    redo() {
        const command = this.undoStack.pop();
        if (command) {
            command.execute(this.dispatch);
            this.undoStack.push(command);
        }
    }
}
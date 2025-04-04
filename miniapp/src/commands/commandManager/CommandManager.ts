import {Command} from "../Command";
import {AppDispatch} from "../../store/store";

export class CommandManager {
    private redoStack: Command[] = [];
    private undoStack: Command[] = [];
    private readonly dispatch: AppDispatch;

    constructor(dispatch: AppDispatch) {
        this.dispatch = dispatch;
    }

    execute(command: Command) {
        command.execute(this.dispatch);
        this.undoStack.push(command);
        this.redoStack = [];
    }

    undo() {
        const command = this.undoStack.pop();
        if (command) {
            command.undo(this.dispatch);
            this.redoStack.push(command);
        }
    }

    redo() {
        const command = this.redoStack.pop();
        if (command) {
            command.execute(this.dispatch);
            this.undoStack.push(command);
        }
    }
}
import {useAppDispatch} from "../hooks";
import {setIsModalChooseSectionOpen} from "../../store/slices/modalsCardPageSlice";
import {AddSectionCommand} from "../../commands/sections/AddSectionCommand";
import {TDivider, TypeSectionEnum} from "../../types/types";
import {useCommandManager} from "../../commands/commandManager/CommandManagerContext";

const useDividerSection = () => {
    const dispatch = useAppDispatch();
    const commandManager = useCommandManager();

    const handleChooseDividerSectionCommand = () => {
        const command = new AddSectionCommand(TypeSectionEnum.divider, {} as TDivider);
        commandManager.execute(command);

        dispatch(setIsModalChooseSectionOpen(false));
    };

    return {
        handleChooseDividerSectionCommand
    };
}

export default useDividerSection
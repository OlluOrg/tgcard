import React, {useEffect, useRef, useState} from 'react';
import {setIsModalEditTextOpen} from "../../../../store/slices/modalsCardPageSlice";
import {
    BoldItalicUnderlineToggles,
    MDXEditor, MDXEditorMethods,
    toolbarPlugin,
} from "@mdxeditor/editor";
import styles from "../../../../pages/CardPage/CardPage.module.scss";
import {Button, Modal} from "@telegram-apps/telegram-ui";
import {useAppDispatch, useAppSelector} from "../../../../hooks/hooks";
import useTextSection from "../../../../hooks/CardPage/useTextSection";
import {setMarkdown} from "../../../../store/slices/textSlice";
import {Command} from "../../../../commands/Command";
import {AddSectionCommand} from "../../../../commands/sections/AddSectionCommand";
import useCardSections from "../../../../hooks/CardPage/useCardSections";
import {CommandManager} from "../../../../commands/CommandManager";

const TextModal = () => {
    const dispatch = useAppDispatch();
    const {isModalEditTextOpen, isEditBlock} = useAppSelector(state => state.modalsCardPage);
    const {markdown, markdownError} = useAppSelector(state => state.text);

    const {closeModalEditText, isTextValid, handleAddText, handleEditText} = useTextSection();
    const {handleDelete} = useCardSections()

    const commandManager: CommandManager = new CommandManager();
    
    const [isFocused, setIsFocused] = useState(false);

    const editorRef = useRef<MDXEditorMethods>(null);

    useEffect(() => {
        if (isModalEditTextOpen) {
            setIsFocused(true); // Устанавливаем фокус при открытии
        }
    }, [isModalEditTextOpen]);

    const textAddHandler = () => {
        const command: Command = new AddSectionCommand(handleAddText, handleDelete)
        commandManager.execute(command);
    }

    return (
        <Modal
            open={isModalEditTextOpen}
            onOpenChange={(open) => {
                dispatch(setIsModalEditTextOpen(open));
                if (!open) {
                    dispatch(setMarkdown(''));
                }
            }}
            style={{ marginBottom: 25}}
        >
            <MDXEditor
                className="dark-theme"
                ref={editorRef}
                markdown={markdown}
                autoFocus={{defaultSelection: 'rootEnd'}}  
                onBlur={() => setIsFocused(false)}
                onChange={(newMarkdown: string) => dispatch(setMarkdown(newMarkdown))}
                contentEditableClassName={styles.mdx}
                plugins={[toolbarPlugin({
                    toolbarContents: () =>
                        <>
                            <BoldItalicUnderlineToggles/>
                        </>
                })]}
            />
            {!isFocused && markdownError && <div className={styles.errorMessage}>{markdownError}</div>}
            <div className={styles.modalAddBtns}>
                <Button
                    mode="outline"
                    size="m"
                    onClick={closeModalEditText}
                >
                    Отмена
                </Button>
                <Button
                    mode="filled"
                    size="m"
                    onClick={() => isEditBlock ? handleEditText() : textAddHandler()
                }
                    disabled={!isTextValid()}
                >
                    {isEditBlock ? 'Сохранить' : 'Добавить'}
                </Button>
            </div>
        </Modal>
    );
};

export default TextModal;

import React, {useEffect, useRef, useState} from 'react';
import {setIsModalEditTextOpen} from "../../store/slices/modalsCardPageSlice";
import {
    BlockTypeSelect,
    BoldItalicUnderlineToggles,
    headingsPlugin,
    listsPlugin,
    ListsToggle,
    MDXEditor, MDXEditorMethods,
    toolbarPlugin
} from "@mdxeditor/editor";
import styles from "../../pages/CardPage/CardPage.module.scss";
import {Button, Modal} from "@telegram-apps/telegram-ui";
import {useAppDispatch, useAppSelector} from "../../hooks/hooks";
import useTextSection from "../../hooks/CardPage/useTextSection";
import {setMarkdown} from "../../store/slices/textSlice";

const TextModal = () => {
    const dispatch = useAppDispatch();
    const {isModalEditTextOpen, isEditBlock} = useAppSelector(state => state.modalsCardPage);
    const {markdown, markdownError} = useAppSelector(state => state.text);

    const {closeModalEditText, isTextValid, handleAddText, handleEditText} = useTextSection();
    
    const [isFocused, setIsFocused] = useState(false);

    const editorRef = useRef<MDXEditorMethods>(null);

    useEffect(() => {
        if (isModalEditTextOpen) {
            setIsFocused(true); // Устанавливаем фокус при открытии
        }
    }, [isModalEditTextOpen]);

    return (
        <Modal
            open={isModalEditTextOpen}
            onOpenChange={(open) => {
                dispatch(setIsModalEditTextOpen(open));
                if (!open) {
                    dispatch(setMarkdown(''));
                }
            }}
            style={{ zIndex: 1001}}
        >
            <MDXEditor
                className="dark-theme"
                style={{zIndex:1001}}
                ref={editorRef}
                markdown={markdown}
                autoFocus={{defaultSelection: 'rootEnd'}}  
                onBlur={() => setIsFocused(false)}
                onChange={(newMarkdown: string) => dispatch(setMarkdown(newMarkdown))}
                contentEditableClassName={styles.mdx}
                plugins={[listsPlugin(), headingsPlugin() ,toolbarPlugin({
                    toolbarContents: () =>
                        <>
                            <BoldItalicUnderlineToggles/>
                            <ListsToggle/>
                            <BlockTypeSelect/>
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
                    onClick={() => isEditBlock ? handleEditText() : handleAddText()}
                    disabled={!isTextValid()}
                >
                    {isEditBlock ? 'Сохранить' : 'Добавить'}
                </Button>
            </div>
        </Modal>
    );
};

export default TextModal;

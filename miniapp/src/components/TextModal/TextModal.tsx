import React, {useRef} from 'react';
import {
    ModalHeader
} from "@telegram-apps/telegram-ui/dist/components/Overlays/Modal/components/ModalHeader/ModalHeader";
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

    const editorRef = useRef<MDXEditorMethods>(null);

    return (
        <Modal
            header={<ModalHeader>Only iOS header</ModalHeader>}
            open={isModalEditTextOpen}
            onOpenChange={(open) => dispatch(setIsModalEditTextOpen(open))}
        >
            <MDXEditor
                className="dark-theme"
                ref={editorRef}
                markdown={markdown}
                onChange={(newMarkdown: string) => dispatch(setMarkdown(newMarkdown))}
                contentEditableClassName={styles.mdx}
                plugins={[listsPlugin(), headingsPlugin(), toolbarPlugin({
                    toolbarContents: () =>
                        <>
                            <BoldItalicUnderlineToggles/>
                            <ListsToggle/>
                            <BlockTypeSelect/>
                        </>
                })]}
            />
            {markdownError && <div className={styles.errorMessage}>{markdownError}</div>}
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
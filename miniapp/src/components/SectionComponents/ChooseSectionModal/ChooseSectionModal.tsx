import React, {useRef} from 'react';
import {setIsModalChooseSectionOpen} from "../../../store/slices/modalsCardPageSlice";
import {Cell, Modal} from "@telegram-apps/telegram-ui";
import IconTextSection from "../../../icons/IconTextSection/IconTextSection";
import Icon24Link from "../../../icons/Icon24Link/Icon24Link";
import IconDivider from "../../../icons/IconDivider/IconDivider";
import {useAppDispatch, useAppSelector} from "../../../hooks/hooks";
import useTextSection from "../../../hooks/CardPage/useTextSection";
import useLinkSection from "../../../hooks/CardPage/useLinkSection";
import useDividerSection from "../../../hooks/CardPage/useDividerSection";
import useImageSection from "../../../hooks/CardPage/useImageSection";
import IconUpload from "../../../icons/IconUpload/IconUpload";
import styles from "./ChooseSectionModal.module.scss";

const ChooseSectionModal = () => {
    const dispatch = useAppDispatch();
    const fileInputRef = useRef<HTMLInputElement>(null);

    const {isModalChooseSectionOpen} = useAppSelector(state => state.modalsCardPage);

    const {handleChooseTextSection} = useTextSection();
    const {handleChooseBlockLinkSection} = useLinkSection();
    const {handleChooseDividerSectionCommand} = useDividerSection();
    const {handleChooseImageSectionCommand} = useImageSection();

    const clickOnImageSection = () => clickOnInputFile();
    const clickOnInputFile = () => fileInputRef.current?.click();

    return (
        <>
            <Modal
                open={isModalChooseSectionOpen}
                onOpenChange={(open) => dispatch(setIsModalChooseSectionOpen(open))}
                style={{ zIndex: 1001}}

            >
                <Cell
                    onClick={handleChooseTextSection}
                    before={<IconTextSection/>}
                >
                    Текст
                </Cell>
                <Cell
                    onClick={handleChooseBlockLinkSection}
                    before={<Icon24Link/>}
                >
                    Ссылка
                </Cell>
                <Cell
                    onClick={handleChooseDividerSectionCommand}
                    before={<IconDivider/>}
                >
                    Горизонтальная линия
                </Cell>
                <Cell
                    onClick={clickOnImageSection}
                    before={<IconUpload/>}
                >
                    Изображение
                </Cell>
                {/*<Cell*/}
                {/*    onClick={handleChooseVideoSection}*/}
                {/*>*/}
                {/*    Видео*/}
                {/*</Cell>*/}
            </Modal>
            <input
                type="file"
                ref={fileInputRef}
                accept="image/*"
                onChange={handleChooseImageSectionCommand}
                className={styles.inputImage}
            />
        </>
    );
};

export default ChooseSectionModal;
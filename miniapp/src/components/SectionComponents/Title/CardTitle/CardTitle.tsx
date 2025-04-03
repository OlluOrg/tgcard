import React from 'react';
import {marked} from "marked";
import {useAppDispatch} from "../../../../hooks/hooks";
import {setIsTitleEditOpen} from "../../../../store/slices/modalsCardPageSlice";
import styles from './CardTitle.module.scss'

interface CardTitleProps {
    isViewMode: boolean;
    title: string;
}

const CardTitle = (props: CardTitleProps) => {
    const dispatch = useAppDispatch();

    const markedTitle = marked('## '+props.title);

    return (
        <div className={styles.title}
            onClick={() => {
                if (!props.isViewMode) dispatch(setIsTitleEditOpen(true));
            }}
            dangerouslySetInnerHTML={{__html: markedTitle}}
        />
    );
};

export default CardTitle;
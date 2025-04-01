import React from 'react';
import {marked} from "marked";
import {useAppDispatch, useAppSelector} from "../../hooks/hooks";
import {setIsTitleEditOpen} from "../../store/slices/modalsCardPageSlice";

interface CardTitleProps {
    title: string;
}

const CardTitle = (props: CardTitleProps) => {
    const dispatch = useAppDispatch();

    const markedTitle = marked('## '+props.title);

    return (
        <div
            onClick={() => dispatch(setIsTitleEditOpen(true))}
            dangerouslySetInnerHTML={{__html: markedTitle}}
        />
    );
};

export default CardTitle;
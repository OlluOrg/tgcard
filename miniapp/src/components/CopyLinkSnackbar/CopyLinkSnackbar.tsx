import React from 'react';
import {Snackbar} from "@telegram-apps/telegram-ui";
import {useAppDispatch, useAppSelector} from "../../hooks/hooks";
import {setIsSnackbarCopyLinkOpen} from "../../store/slices/modalsMyCardsSlice";
import styles from "./CopyLinkSnackbar.module.scss";

const CopyLinkSnackbar = () => {
    const dispatch = useAppDispatch();
    const { isSnackbarCopyLinkOpen } = useAppSelector((state) => state.modalsMyCards);

    return (
        <>
            {isSnackbarCopyLinkOpen &&
                (<Snackbar
                    onClose={() => dispatch(setIsSnackbarCopyLinkOpen(false))}
                    duration={800}
                    className={styles.snackbarWrapper}
                >
                    Ссылка на визитку скопирована
                </Snackbar>)
            }
        </>
    )
}

export default CopyLinkSnackbar;
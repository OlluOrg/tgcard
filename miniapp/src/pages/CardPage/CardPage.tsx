import React from 'react';
import '@telegram-apps/telegram-ui/dist/styles.css';
import '@mdxeditor/editor/style.css'
import './mdxstyle.scss';
import LinkModal from "../../components/LinkModal/LinkModal";
import TextModal from "../../components/TextModal/TextModal";
import VideoModal from "../../components/VideoModal/VideoModal";
import ChooseSectionModal from "../../components/ChooseSectionModal/ChooseSectionModal";
import CardPageBottomMenu from "../../components/CardPageBottomMenu/CardPageBottomMenu";
import SectionList from "../../components/SectionList/SectionList";

const CardPage = () => {
    return (
        <div>
            <SectionList />
            <div>
                <CardPageBottomMenu />

                <LinkModal />

                <ChooseSectionModal />

                <TextModal />

                <VideoModal />
            </div>
        </div>
    );
};

export default CardPage;
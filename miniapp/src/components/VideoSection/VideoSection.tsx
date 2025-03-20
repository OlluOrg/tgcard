import React from 'react';
import {TVideoSection} from "../../types/types";

type VideoSectionProps = {
    video: TVideoSection,
}

const VideoSection = (props: VideoSectionProps) => {
    return (
        <>
            <video controls muted>
                <source src={props.video.src} type="video/mp4"/>
                <source src={props.video.src} type="video/webm"/>
                Ваш браузер не поддерживает видео тег.
            </video>
        </>
    );
}

export default VideoSection;
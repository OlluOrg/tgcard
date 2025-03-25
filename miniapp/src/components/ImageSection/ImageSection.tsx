import React, {useEffect, useState} from 'react';
import {TImageSection} from "../../types/types";
import {getFileLink} from "../../services/image.service";

type ImageSectionProps = {
    img: TImageSection,
}

const ImageSection = (props: ImageSectionProps) => {
    const [imageWidth, setImageWidth] = useState(window.innerWidth - 48);
    const [imageHeight, setImageHeight] = useState((window.innerWidth - 48) / props.img.aspectRatio);
    const [imageLink, setImageLink] = useState<string>('');

    useEffect(() => {
        getFileLink(props.img.src).then((link) => setImageLink(link))

        const handleResize = () => {
            setImageWidth(window.innerWidth - 48);
            setImageHeight((window.innerWidth - 48) / props.img.aspectRatio);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <>
            <img src={imageLink} alt={''} width={imageWidth} height={imageHeight} style={{pointerEvents: "fill",borderRadius:10}}/>
        </>
    );
}

export default ImageSection;
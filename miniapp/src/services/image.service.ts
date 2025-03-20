import React from "react";
import axios from "axios";
import {setAspectRatio, setImageData} from "../store/slices/imageSlice";

// const token = process.env.BOT_TOKEN;
const token = '7807600538:AAFn3lhc239Gq86RwH04gOjEumhWfIQt4aw';

export async function imageUpload(event: React.ChangeEvent<HTMLInputElement>) {
    let imageData: string = '';
    let aspectRatio: number = 1;

    const file = event.target.files?.[0];
    if (file) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            const img = new Image();
            img.src = window.URL.createObjectURL(file);
            img.onload = () => {
                aspectRatio = img.width / img.height;
            };
        };
        await uploadImageToChat(file).then((url) => {
            imageData = url ?? '';
        });
    }
    return {
        imageData: imageData,
        aspectRatio: aspectRatio,
    }
}

export async function getFileLink(fileId: string) {
    try {
        const response = await axios.get(
            `https://api.telegram.org/bot${token}/getFile?file_id=${fileId}`
        );

        const filePath = response.data.result.file_path;
        return `https://api.telegram.org/file/bot${token}/${filePath}`;
    } catch (error) {
        console.log('Error getting file link:', error);
        return '';
    }
}

const uploadImageToChat = async (file: File) => {
    const formData = new FormData();
    formData.append('chat_id', '775136810'); // Используем user_id как chat_id
    formData.append('photo', file);
    formData.append('disable_notification', 'true'); // Отключаем уведомления

    try {
        const response = await axios.post(
            `https://api.telegram.org/bot${token}/sendPhoto`,
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }
        );
        const fileId = response.data.result.photo.at(-1).file_id;
        return fileId;
    } catch (error) {
        console.error('Error uploading file:', error);
        return null;
    }
};
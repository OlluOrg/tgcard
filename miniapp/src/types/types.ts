type TSection = {
    id: number,
    typeSectionEnum: TypeSectionEnum,
    value: TSectionText | TSectionBlockLink | TDivider | TVideoSection | TImageSection,
    order: number,
}

type TCard = {
    id: number,
    businessCardId?: string
    title: string,
    description: string,
    date: string,
    sections: TSection[],
}

export enum TypeSectionEnum {
    text,
    blockLink,
    divider,
    video,
    image,
}

type TSectionText = {
    value: string;
}

type TSectionBlockLink = {
    name: string;
    link: string;
}

type TDivider = {

}

type TVideoSection = {
    src: string;
}

type TImageSection = {
    src: string;
    aspectRatio: number;
}

export {
    type TSection,
    type TCard,
    type TSectionText,
    type TSectionBlockLink,
    type TVideoSection,
    type TDivider,
    type TImageSection,
}
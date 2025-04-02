type TSection = {
    id: string,
    typeSectionEnum: TypeSectionEnum,
    value: TSectionText | TSectionBlockLink | TDivider | TVideoSection | TImageSection,
    order: number,
}

type TCard = {
    id: number,
    businessCardId?: string,
    userId?: string,
    title: string,
    description: string,
    createdAt?: Date,
    sections: TSection[],
}

type TCardWithUserId = {
    card: TCard,
    userId: string,
}

type TCardHistory  = TCard & {
    lastViewedAt: Date;
};

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
    type TCardHistory,
    type TCardWithUserId
}
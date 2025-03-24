export interface BusinessCard {
    _id: string;
    userId: string;
    data: {
        userId: string;
        data: Record<string, any>;
    };
    __v?: number;
}

export interface BusinessCardCreate {
    id: string;
}

export interface BusinessCardRead {
    _id: string;
    userId: string;
    data: Record<string, any>;
}

export interface BusinessCardUpdate {
    modifiedCount: number;
}

export interface BusinessCardDelete {
    deletedCount: number;
}

export interface ApiResponse {
    data: Record<string, any>;
    status: "success" | "error";
    message?: string;
}

export interface HistoryRead {
    _id: string;
    userId: string;
    lastViewedAt: Date;
    data: Record<string, any>;
}

export interface HistoryAdd {
    status: "success" | "error";
}
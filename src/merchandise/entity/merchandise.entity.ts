

export class MyMerchandise {

    id: number;
    designId: number;

    productId: number;

    profit: number;

    createdAt: Date;
    updatedAt: Date;
}

export class Merchandise {
    design: {
        user: {
            firstName: string;
            lastname: string;
            id: number;
        }
        title: string;
        description: string;
        id: number;
    }
    product: {
        title: string;
        description: string;
        id: number;
    }

    id: number;

    price: number;

    createdAt: Date;
    updatedAt: Date;
}
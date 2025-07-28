import { Status } from "../enums";
import type { OrderAttribute } from "./order";
import type { UserAttributes } from "./user";

export interface ProductAttribute {
    id?: string;
    seller_id: string;
    name: string;
    category: string;
    status: Status,
    description: string;
    image_url: string;
    total_quantity: number;
    quantity_unit: string;
    number_per_portion: string;
    portion_size: number;
    price_per_portion: number;
    available_portions: number;
    video_url: string;
    location: string;

    
    updatedAt?: Date;
    deletedAt?: Date,
    createdAt?: Date,
}


export type OrderWithUser = OrderAttribute & {
    user: UserAttributes;
};

export type ProductWithOrders = ProductAttribute & {
    orders: OrderWithUser[];
};



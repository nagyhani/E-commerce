export interface OrdersItems {
    taxPrice:          number;
    shippingPrice:     number;
    totalOrderPrice:   number;
    paymentMethodType: PaymentMethodType;
    isPaid:            boolean;
    isDelivered:       boolean;
    _id:               string;
    user:              User;
    cartItems:         OrderItem[];
    paidAt?:           Date;
    createdAt:         Date;
    updatedAt:         Date;
    id:                number;
    __v:               number;
    shippingAddress?:  ShippingAddress;
}

export interface OrderItem {
    count:   number;
    _id:     string;
    product: Product;
    price:   number;
}

export interface Product {
    subcategory:     Brand[];
    ratingsQuantity: number;
    _id:             string;
    title:           string;
    imageCover:      string;
    category:        Brand;
    brand:           Brand;
    ratingsAverage:  number;
    id:              string;
}

export interface Brand {
    _id:       string;
    name:      string;
    slug:      string;
    image?:    string;
    category?: Category;
}

export enum Category {
    The6439D2D167D9Aa4Ca970649F = "6439d2d167d9aa4ca970649f",
    The6439D58A0049Ad0B52B9003F = "6439d58a0049ad0b52b9003f",
    The6439D5B90049Ad0B52B90048 = "6439d5b90049ad0b52b90048",
}

export enum PaymentMethodType {
    Card = "card",
    Cash = "cash",
}

export interface ShippingAddress {
    details: string;
    phone:   string;
    city:    string;
}

export interface User {
    _id:   ID;
    name:  Name;
    email: Email;
    phone: string;
}

export enum ID {
    The68B637Afca45Ab9F919Ff1E0 = "68b637afca45ab9f919ff1e0",
}

export enum Email {
    Nagyhani337GmailCOM = "nagyhani337@gmail.com",
}

export enum Name {
    NagyHani = "Nagy Hani",
}

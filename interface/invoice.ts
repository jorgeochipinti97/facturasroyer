export interface _InterfaceInvoice {
    nOrder: number
    name: string
    price: number
    products: IProduct[]
    address: string
    paymentMethod: string
    isPesos:boolean
}


export interface IProduct {
    name: string
    price: number
    quantity:number
    parcialTotal:number
}
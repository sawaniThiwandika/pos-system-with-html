import {CustomerModel} from "./CustomerModel.js";
import {OrderItemDetailsModel} from "./OrderItemDetails.js";

export class OrderModel{
   customer=new CustomerModel();
   itemListOrder=[OrderItemDetailsModel];
    constructor(customer,itemListOrder,date,total) {
        this._customer = customer;

        this._date = date;
        this._total = total;
        this._itemListOrder = itemListOrder;
    }

    get customer() {
        return this._customer;
    }

    set customer(value) {
        this._customer = value;
    }


    get itemListOrder() {
        return this._itemListOrder;
    }

    set itemListOrder(value) {
        this._itemListOrder = value;
    }

    get date() {
        return this._date;
    }

    set date(value) {
        this._date = value;
    }

    get total() {
        return this._total;
    }

    set total(value) {
        this._total = value;
    }
}
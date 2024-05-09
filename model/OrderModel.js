import {CustomerModel} from "./CustomerModel.js";
export class OrderModel{
    constructor(customer,itemList,date,total) {
        this._customer = customer;
        this._itemList = itemList;
        this._date = date;
        this._total = total;
    }

    get customer() {
        return this._customer;
    }

    set customer(value) {
        this._customer = value;
    }

    get itemList() {
        return this._itemList;
    }

    set itemList(value) {
        this._itemList = value;
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
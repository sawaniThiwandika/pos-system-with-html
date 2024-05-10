import {OrderModel} from "./OrderModel.js";
import {itemList,orderList} from "../db/db.js";
import {ItemModel} from "./ItemModel.js";

export class OrderItemDetailsModel{
    get itemName() {
        return this._itemName;
    }

    set itemName(value) {
        this._itemName = value;
    }
    get orderId() {
        return this._orderId;
    }

    set orderId(value) {
        this._orderId = value;
    }

    get itemCode() {
        return this._itemCode;
    }

    set itemCode(value) {
        this._itemCode = value;
    }

    get qty() {
        return this._qty;
    }

    set qty(value) {
        this._qty = value;
    }

    get unitPrice() {
        return this._unitPrice;
    }

    set unitPrice(value) {
        this._unitPrice = value;
    }

    get total() {
        return this._total;
    }

    set total(value) {
        this._total = value;
    }
    constructor(orderId,itemCode,itemName,qty,unitPrice,total) {


        this._orderId = orderId;
        this._itemCode = itemCode;
        this._qty = qty;
        this._unitPrice = unitPrice;
        this._total = total;
        this._itemName = itemName;
    }
}
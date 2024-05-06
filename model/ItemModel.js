export class ItemModel{
    constructor(itemCode,unitPrice,category,itemName,itemQty) {
        this.itemCode = itemCode;
        this.unitPrice = unitPrice;
        this.category = category;
        this.itemName = itemName;
        this.itemQty = itemQty;
    }

    get itemCode() {
        return this.itemCode;
    }

    set itemCode(value) {
        this.itemCode = value;
    }

    get unitPrice() {
        return this._unitPrice;
    }

    set unitPrice(value) {
        this._unitPrice = value;
    }

    get category() {
        return this._category;
    }

    set category(value) {
        this._category = value;
    }

    get itemName() {
        return this._itemName;
    }

    set itemName(value) {
        this._itemName = value;
    }

    get itemQty() {
        return this._itemQty;
    }

    set itemQty(value) {
        this._itemQty = value;
    }
}
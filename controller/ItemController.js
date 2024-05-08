import {ItemModel} from "../model/ItemModel.js";
import {itemList} from "../db/db.js";
let item;
function loadId() {

}
function loadItemTable() {
    $('#itemTableBody').empty();
    itemList.map((item, index) => {
        var record = `<tr>
          <td class="colItemCode">${item.itemCode}</td>
          <td class="colItemName">${item.itemName}</td>
          <td class="colItemUnitPrice">${item.unitPrice}</td>
          <td class="colItemQty">${item.itemQty}</td>
          <td class="colItemCategory">${item.category}</td>
          <td class="colStatus">in stock</td>
         
        </tr>`;
        $('#itemTable').append(record);
    });
}


$('#submitItemBtn').on('click', (event) => {
    console.log("Before preventDefault()");
    event.preventDefault();
    console.log("After preventDefault()");
    let itemCode = $('#itemCodeField').val();
    let unitPrice = $('#itemUnitPriceField').val();
    let category = $('#itemCategoryField').val();
    let itemName = $('#itemNameField').val();
    let itemQty = $('#itemQtyField').val();

    item =new ItemModel(itemCode,unitPrice,category,itemName,itemQty);
    itemList.push(item);
    loadItemTable();
    console.log(item);
});



$('#resetItemBtn').on('click',(event)=>{
    event.preventDefault();
    loadId();
    $('#itemCodeField').val("");
    $('#itemNameField').val("");
    $('#itemQtyField').val("");
    $('#itemCategoryField').val("");
    $('#itemUnitPriceField').val("");
    console.log("reset customer details");

});
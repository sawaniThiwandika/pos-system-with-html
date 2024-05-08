import {ItemModel} from "../model/ItemModel.js";
import { itemList} from "../db/db.js";
let item;
loadId();
let selectedIndex;
function loadId() {
    let itemCode;
    if (itemList.length === 0) {
        itemCode = "I-" + 1;
    } else {
        let lastItemCodeNumericPart = parseInt(itemList[itemList.length - 1].itemCode.substring(2));
        let newNumericPart = lastItemCodeNumericPart + 1;
        itemCode = "I-" + newNumericPart;
    }
    $('#itemCodeField').val(itemCode);
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
    $('#resetItemBtn').click();
    loadItemTable();
    console.log(item);
});



$('#resetItemBtn').on('click',(event)=>{
    event.preventDefault();
    $('#itemCodeField').val("");
    $('#itemNameField').val("");
    $('#itemQtyField').val("");
    $('#itemCategoryField').val("");
    $('#itemUnitPriceField').val("");
    console.log("reset customer details");
    loadId();

});
$('#updateItemBtn').on('click', (event) => {
    console.log("Before preventDefault()");
    event.preventDefault();
    console.log("After preventDefault()");
    let itemCode = $('#itemCodeField').val();
    let unitPrice = $('#itemUnitPriceField').val();
    let category = $('#itemCategoryField').val();
    let itemName = $('#itemNameField').val();
    let itemQty = $('#itemQtyField').val();

    if (selectedIndex !== undefined && selectedIndex >= 0 && selectedIndex < itemList.length) {
        let selectItem = itemList[selectedIndex];
        selectItem.itemCode =itemCode;
        selectItem.itemName = itemName;
        selectItem.unitPrice = unitPrice;
        selectItem.category =category;
        selectItem.itemQty = itemQty;
        console.log(selectItem.itemCode);

        $('#resetItemBtn').click();
        loadItemTable();
    } else {
        console.log("No row selected or invalid index");
    }
});
$('#itemTableBody').on('click','tr',function () {
    let index = $(this).index();
    selectedIndex= index;
    let itemCode = $(this).find(".colItemCode").text();
    let itemName = $(this).find(".colItemName").text();
    let itemQty = $(this).find(".colItemQty").text();
    let unitPrice = $(this).find(".colItemUnitPrice").text();
    let category = $(this).find(".colItemCategory").text();
    console.log("clicked row " + index);
    $('#itemCodeField').val(itemCode);
    $('#itemNameField').val(itemName);
    $('#itemUnitPriceField').val(unitPrice);
    $('#itemQtyField').val(itemQty);
    $('#itemCategoryField').val(category);
    $('#resetCusBtn').click();
});

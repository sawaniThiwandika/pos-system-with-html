import {ItemModel} from "../model/ItemModel.js";
import { itemList} from "../db/db.js";
let item;
loadId();
let selectedIndex;
loadItemTable();
$('#nav-inventory').on('click', function(event) {
    event.preventDefault(); // Prevent default link behavior

    // Load the item table
    loadItemTable();
});
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
    let validateItem1 = validateItem();
    if (validateItem1){
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
    }

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
let validateItem2 = validateItem();
if(validateItem2){
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
/*
$('#itemNameField').*/

function validateItem() {
    let isValid = true;


    let itemId = $('#itemCodeField').val().trim();
    if (itemId === '') {
        isValid = false;
        alert('Please select a item');
        return isValid;
    }


    let itemName = $('#itemNameField').val().trim();
    if (itemName === '') {
        isValid = false;
        alert('Please enter ItemName');
        return isValid;
    }


    let itemQty = $('#itemQtyField').val().trim();
    if (itemQty === '') {
        isValid = false;
        alert('Please enter Quantity for the item');
        return isValid;
    }


    let itemUnitPrice = $('#itemUnitPriceField').val().trim();
    if (itemUnitPrice === '') {
        isValid = false;
        alert('Please enter Unit Price');
        return isValid;
    }


    let itemContact = $('#itemCategoryField').val().trim();
    if (itemContact === '') {
        isValid = false;
        alert('Please select or input category for item');
        return isValid;
    }
 return true;

}
$(document).ready(function() {
    $("#searchBarItems").on("keyup", function() {
        var value = $(this).val().toLowerCase();

        $("#itemTableBody tr").filter(function() {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
        });

        $("#itemTableBody tr:visible").each(function() {
            var row = $(this);
            row.find("td").each(function() {
                var cell = $(this);
                var cellText = cell.text();
                var regex = new RegExp('(' + value + ')', 'gi');
                var highlightedText = cellText.replace(regex, '<span class="highlight">$1</span>');
                cell.html(highlightedText);
            });
        });
    });
});
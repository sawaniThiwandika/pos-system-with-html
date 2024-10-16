import {ItemModel} from "../model/ItemModel.js";
import {customersList, itemList} from "../db/db.js";


let item;

let selectedIndex;
getItemList();
$('#nav-inventory').on('click', function (event) {
    event.preventDefault(); // Prevent default link behavior

    // Load the item table
    //loadItemTable();
    //getItemList();
});

function getItemList() {
    console.log("No w im in GetItem List Method");
    const http = new XMLHttpRequest();
    itemList.length = 0;
    http.onreadystatechange = () => {
        if (http.readyState === 4) {
            if (http.status === 200) {
                let contentType = http.getResponseHeader("Content-Type");
                console.log("Content type: " + contentType);

                if (contentType && contentType.includes("application/json")) {
                    try {
                        let response = JSON.parse(http.responseText);
                        console.log("response:", response);  // Log the retrieved customer list

                        response.forEach((itemData) => {
                            // Create CustomerModel instance with appropriate properties
                            let item = new ItemModel(
                                itemData.itemCode,
                                itemData.unitPrice,
                                itemData.category,
                                itemData.itemName,
                                itemData.itemQty,

                            );
                            itemList.push(item);
                        });
                        console.log(itemList);
                        loadId();
                        loadItemTable();

                    } catch (e) {
                        console.error("Failed to parse JSON response: ", http.responseText);
                    }
                } else {
                    console.error("Unexpected content type: ", contentType);
                    console.error("Response is not JSON: ", http.responseText);
                }
            } else {
                console.error("Request failed with status: ", http.status);
            }
        } else {
            console.log("Processing stage: ", http.readyState);
        }
    };

    // Change the method to GET since we're fetching data
    http.open("GET", "http://localhost:8080/pos_system_backend_with_spring/api/v1/item", true);
    http.send();
}

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
    if (validateItem1) {
        let itemCode = $('#itemCodeField').val();
        let unitPrice = $('#itemUnitPriceField').val();
        let category = $('#itemCategoryField').val();
        let itemName = $('#itemNameField').val();
        let itemQty = $('#itemQtyField').val();

        item = new ItemModel(itemCode, unitPrice, category, itemName, itemQty);
       // itemList.push(item);
        $('#resetItemBtn').click();

        //const itemJSON = JSON.stringify(item);

        // Create and configure XMLHttpRequest
        // Create JSON
        const formData = new FormData();
        formData.append("_itemCode", itemCode);
        formData.append("_unitPrice", unitPrice);
        formData.append("_category", category);
        formData.append("_itemName", itemName);
        formData.append("_itemQty", itemQty);

// Save the data with AJAX
        const http = new XMLHttpRequest();
        //const http=new XMLHttpRequest().setRequestHeader("Content-Type","application/json");
        http.onreadystatechange = () => {
            if (http.readyState === 4) {
                if (http.status === 200) {
                    let contentType = http.getResponseHeader("Content-Type");
                    console.log("content type " + http);
                    if (contentType && contentType.includes("application/json")) {
                        try {
                            let response = JSON.parse(http.responseText);
                            console.log(response);
                        } catch (e) {
                            console.error("Failed to parse JSON response: ", http.responseText);
                        }
                    } else {
                        console.error("Unexpected content type: ", contentType);
                        console.error("Response is not JSON: ", http.responseText);
                    }
                } else {
                    console.error("Failed with status: ", http.status);
                    console.error("Processing stage: ", http.readyState);
                }
            } else {
                console.log("Processing stage: ", http.readyState);
            }
        };
        http.open("POST", "http://localhost:8080/pos_system_backend_with_spring/api/v1/item", true);
        http.send(formData);

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


        //const itemJSON = JSON.stringify(selectItem);
        const formData = new FormData();
        formData.append("_itemCode", itemCode);
        formData.append("_unitPrice", unitPrice);
        formData.append("_category", category);
        formData.append("_itemName", itemName);
        formData.append("_itemQty", itemQty);

        const http = new XMLHttpRequest();
        //const http=new XMLHttpRequest().setRequestHeader("Content-Type","application/json");
        http.onreadystatechange = () => {
            if (http.readyState === 4) {
                if (http.status === 200) {
                    let contentType = http.getResponseHeader("Content-Type");
                    console.log("content type "+http);
                    if (contentType && contentType.includes("application/json")) {
                        try {
                            let response = JSON.parse(http.responseText);
                            console.log(response);
                        } catch (e) {
                            console.error("Failed to parse JSON response: ", http.responseText);
                        }
                    } else {
                        console.error("Unexpected content type: ", contentType);
                        console.error("Response is not JSON: ", http.responseText);
                    }
                } else {
                    console.error("Failed with status: ", http.status);
                    console.error("Processing stage: ", http.readyState);
                }
            } else {
                console.log("Processing stage: ", http.readyState);
            }
        };
        http.open("PUT", "http://localhost:8080/pos_system_backend_with_spring/api/v1/item", true);
      //  http.setRequestHeader("Content-Type", "application/json");
        http.send(formData);
        loadItemTable();



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

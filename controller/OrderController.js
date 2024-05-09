import {customersList, itemList} from "../db/db.js";
import {OrderModel} from "../model/OrderModel.js";
$(document).ready(function() {

    $("#itemNameFieldInOrder").on("input", function() {
        populateDatalist();
    });

    $("#itemNameFieldInOrder").on("change", function() {
        var selectedValue = $(this).val();
        updateOtherFields(selectedValue);
    });

    $("#itemNameFieldInOrder").on("input", function() {
        var selectedValue = $(this).val();
        if (!selectedValue) {
            clearOtherFields();
        }
    });

    $("#itemQtyFieldOrder").on("input", function() {
        updateTotalPrice();
    });
});

function populateDatalist() {
    var datalistForItems = $("#itemListForOrder");
    datalistForItems.empty();
    $.each(itemList, function(index, item) {
        datalistForItems.append($("<option>", { value: item.itemName }));
    });
}

function updateOtherFields(selectedValue) {
    var selectedItem = itemList.find(function(item) {
        return item.itemName === selectedValue;
    });

    if (selectedItem) {
        $("#itemUnitPriceFieldOrder").val(selectedItem.unitPrice);
        $("#itemCodeFieldOrder").val(selectedItem.itemCode);
    }
}

function clearOtherFields() {
    $("#itemUnitPriceFieldOrder").val("");
    $("#itemCodeFieldOrder").val("");
    $("#itemQtyFieldOrder").val("");
    $("#totalPriceFieldInOrder").val("");
}

function updateTotalPrice() {
    var unitPrice = parseFloat($("#itemUnitPriceFieldOrder").val());
    var quantity = parseInt($("#itemQtyFieldOrder").val());
    var totalPrice = unitPrice * quantity;
    if (!isNaN(totalPrice)) {
        $("#totalPriceFieldInOrder").val(totalPrice.toFixed(2));
    } else {
        $("#totalPriceFieldInOrder").val("");
    }
}
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

        $("#validationDefault08").val(selectedItem.unitPrice);


        $("#validationDefault05").val(selectedItem.itemCode);
    }
}

function clearOtherFields() {

    $("#validationDefault08").val("");
    $("#validationDefault05").val("");
}


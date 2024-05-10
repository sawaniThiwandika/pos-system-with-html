import {customersList, itemList, orderList} from "../db/db.js";
import {OrderModel} from "../model/OrderModel.js";
import {CustomerModel} from "../model/CustomerModel.js";
import {OrderItemDetailsModel} from "../model/OrderItemDetails.js";

let selectedCustomer = new CustomerModel();
let order = new OrderModel();
loadId();

function loadId() {
    let orderId;
    if (orderList.length === 0) {
        orderId = "O-1";
    } else {
        let lastOrderIdNumericPart = parseInt(orderList[orderList.length - 1].orderId.substring(2));
        let newNumericPart = lastOrderIdNumericPart + 1;
        orderId = "O-" + newNumericPart;
    }
    $('#orderIdField').val(orderId);
}

$(document).ready(function () {

    $("#customerContactFieldOrder").on("input", function () {
        populateDatalistCustomerOrder();
    });

    $("#customerContactFieldOrder").on("change", function () {
        var selectedValue = $(this).val();
        updateOtherFieldsCustomerOrder(selectedValue);
    });

    $("#customerContactFieldOrder").on("input", function () {
        var selectedValue = $(this).val();
        if (!selectedValue) {
            clearOtherFieldsCustomerOrder();
        }
    });
    $("#selectBtnCustomerBtnOrder").on("click", function () {
        var selectedValue = $("#customerContactFieldOrder").val();
        selectedCustomer = customersList.find(function (customer) {
            return customer.cusContact === selectedValue;
        });

        if (selectedCustomer) {
            order.customer = selectedCustomer;
            console.log("Selected customer: ", selectedCustomer);
        } else {
            console.log("Customer not found");
        }

    });


});
function populateDatalistCustomerOrder() {
    var datalistForCustomers = $("#customerListForOrder");
    datalistForCustomers.empty();
    $.each(customersList, function(index, item) {
        datalistForCustomers.append($("<option>", { value: item.cusContact }));
    });
}
function updateOtherFieldsCustomerOrder(selectedValue) {
    selectedCustomer = customersList.find(function (item) {
        return item.cusContact === selectedValue;
    });

    if (selectedCustomer) {
        $("#customerNameFieldOrder").val(selectedCustomer.cusName);
        $("#customerIdFieldOrder").val(selectedCustomer.cusId);
    }
}
function clearOtherFieldsCustomerOrder() {
    $("#customerIdFieldOrder").val("");
    $("#customerNameFieldOrder").val("");

}
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

function addToCart() {
    $('#cartTableBody').empty();
    order.itemListOrder.map((item, index) => {
        if (index > 0) {
            var record = `<tr>
         <td  class="colItemCodeCart" >${item.itemCode}</td>
            <td class="colItemNameCart">${item.itemName}</td>
            <td class="cilItemQtyCart">${item.qty}</td>
            <td class="colItemUnitPriceCart">${item.unitPrice}</td>
            <td class="colItemTotalCart">${item.total}</td>
            <td class="colItemRemoveButtonCart"><button>Remove</button></td>
        </tr>`;
            $('#cartTableBody').append(record);
        }

    });
}

$("#addToCartButtonOrder").on("click", function () {
    let id = $("#orderIdField").val();
    let itemName = $("#itemNameFieldInOrder").val();
    let itemCode = $("#itemCodeFieldOrder").val();
    let qty = $("#itemQtyFieldOrder").val();
    let unitPrice = $("#itemUnitPriceFieldOrder").val();
    let totalPriceOfItem = $("#totalPriceFieldInOrder").val();
    order.itemListOrder.push(new OrderItemDetailsModel(id, itemCode, itemName, qty, unitPrice, totalPriceOfItem));
    console.log(order.itemListOrder);
    addToCart();
    clearOtherFields();
});

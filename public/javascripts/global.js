/**
 * Created by SUCCESS\phungdinh on 5/15/15.
 */

// ProductList data array for filling in info box
var productListData = [];

// DOM Ready =============================================================
$(document).ready(function() {

    // Populate the product table on initial page load
    populateTable();

    // ProductName link click
    $('#productList table tbody').on('click', 'td a.link_show_product', showProductInfo);


    // Add Product button click
    $('#btnAddProduct').on('click', addProduct);


});

// Functions =============================================================

// Fill table with data
function populateTable() {

    // Empty content string
    var tableContent = '';

    // jQuery AJAX call for JSON
    $.getJSON( '/products/', function( data ) {
        productListData = data;
        // For each item in our JSON, add a table row and cells to the content string
        $.each(data, function(){
            tableContent += '<tr>';
            tableContent += '<td><a href="#" class="link_show_product" rel="' + this.name + '">' + this.name + '</a></td>';
            tableContent += '<td>' + this.price + '</td>';
            tableContent += '<td><a href="#" class="link_delete_product" rel="' + this._id + '">delete</a></td>';
            tableContent += '</tr>';
        });

        // Inject the whole content string into our existing HTML table
        $('#productList table tbody').html(tableContent);
    });
};


// Show Product Info
function showProductInfo(event) {
    console.log("click");

    // Prevent Link from Firing
    event.preventDefault();

    // Retrieve productName from link rel attribute
    var thisProductName = $(this).attr('rel');

    // Get Index of object based on id value
    var arrayPosition = productListData.map(function(arrayItem) { return arrayItem.name; }).indexOf(thisProductName);

    // Get our Product Object
    var thisProductObject = productListData[arrayPosition];

    //Populate Info Box
    $('#productInfoName').text(thisProductObject.name);
    $('#productInfoAge').text(thisProductObject.price);
    $('#productInfoGender').text(thisProductObject.description);
    $('#productInfoLocation').text(thisProductObject.location);
};


// Add Product
function addProduct(event) {
    event.preventDefault();

    // Super basic validation - increase errorCount variable if any fields are blank
    var errorCount = 0;
    $('#addProduct input').each(function(index, val) {
        if($(this).val() === '') { errorCount++; }
    });

    // Check and make sure errorCount's still at zero
    if(errorCount === 0) {

        // If it is, compile all product info into one object
        var newProduct = {
            'name': $('#addProduct fieldset input#inputName').val(),
            'description': $('#addProduct fieldset input#inputPrice').val(),
            'price': $('#addProduct fieldset input#inputDescription').val()
        }

        console.log(newProduct);

        // Use AJAX to post the object to our addProduct service
        $.ajax({
            type: 'POST',
            data: newProduct,
            url: '/products/',
            dataType: 'JSON'
        }).done(function( response ) {

            // Check for successful (blank) response
            if (response.msg === '') {

                // Clear the form inputs
                $('#addProduct fieldset input').val('');

                // Update the table
                populateTable();

            }
            else {

                // If something goes wrong, alert the error message that our service returned
                alert('Error: ' + response.msg);

            }
        });
    }
    else {
        // If errorCount is more than 0, error out
        alert('Please fill in all fields');
        return false;
    }
};


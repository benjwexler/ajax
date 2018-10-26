let symbolsObj = {}

$.ajax({
    dataType: 'jsonp',
    url: "https://api.iextrading.com/1.0/ref-data/symbols",
    success: function (data) {
        for (let i = 0; i < data.length; i++) {
            symbolsObj[(data[i].symbol)] = 1
        }
    }
});

$(function () {
    let confirmPurchase = document.getElementById("confirmPurchaseBtn")

    function clickHiddenForm() {
        document.getElementById("hiddenBuyButton").click();
    }

function firstIexCall() {
    $.ajax({
        url: `https://api.iextrading.com/1.0/stock/${stockSymbol}/price`,
        // dataType: 'jsonp',
        success: function (data) {
            console.log(data)
            console.log(data * quantity)
            fullPrice = data * quantity
            document.getElementById("currentPrice").innerText = `The total price is $${fullPrice}`
            document.getElementById("buyStock").style.display = "none";
            document.getElementById("priceQuoteContainer").style.display = "flex";
        }

    });
}
    function secondIexCall() {
        $.ajax({
            url: `https://api.iextrading.com/1.0/stock/${stockSymbol}/price`,
            dataType: 'jsonp',
            success: function (data) {
                console.log(data)
            }
        });

    }

    $("#confirmPurchaseBtn").click(function () {
        secondIexCall()
    });


    var stockSymbol
    var quantity

    $("#buyStock").submit(function (event) {
        event.preventDefault();
        var action = $(this).attr('action');
        var method = $(this).attr('method');
        stockSymbol = $(this).find('#realTickerSymbol').val();
        quantity = $(this).find('#realQuantity').val();
        //   var data = $(this).serializeArray();
        let fullPrice
        console.log(quantity);
        console.log(parseInt(quantity))

        if ((parseInt(quantity)) && (parseInt(quantity) > 0)) {

            if (symbolsObj[`${stockSymbol.toUpperCase()}`] === 1) {

                // fetches stock price from IEX api
                firstIexCall() 

            } else {
                alert("Fake Stock!")
            }
        } else {
            alert("Please enter a valid quantity")
        }

        function post2database() {
            $.ajax({
                method: method,
                url: action,
                data: { todo: { description: fullPrice, priority: quantity } },

                // data: fullPrice,
                dataType: 'script'

            });
        }



    });
});
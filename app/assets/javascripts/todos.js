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
    let cancelPurchase = document.getElementById("cancelPurchaseBtn")
    const cashBalance = parseInt(document.getElementById("cashBalance").innerText)
    function clickHiddenForm() {
        document.getElementById("hiddenBuyButton").click();
    }

    function post2database() {
        console.log("sdhjinid")
        $.ajax({
            method: "/todos",
            url: "post",
            data: { todo: { description: fullPrice, priority: fullPrice } },

            // data: fullPrice,
            dataType: 'script'

        });
    }

function firstIexCall() {
    $.ajax({
        url: `https://api.iextrading.com/1.0/stock/${stockSymbol}/price`,
        // dataType: 'jsonp',
        success: function (data) {
            console.log(data)
            console.log(data * quantity)
            fullPrice = data * quantity
            if(fullPrice < cashBalance) { 
            fullPrice = fullPrice.toFixed(2)
            document.getElementById("currentPrice").innerText = `The total price is $${fullPrice}`
            document.getElementById("buyStock").style.display = "none";
            document.getElementById("priceQuoteContainer").style.display = "flex";
            } else {
                alert("Sorry, insufficient funds")
            }
        }

    });

    
}
    function secondIexCall() {
        $.ajax({
            url: `https://api.iextrading.com/1.0/stock/${stockSymbol}/price`,
            dataType: 'jsonp',
            success: function (data) {
                console.log(data)
                fullPrice = data * quantity
                document.getElementById("todo_description").value = fullPrice
            document.getElementById("todo_priority").value = fullPrice
                clickHiddenForm()
            }
        });

    }

   

    $("#confirmPurchaseBtn").click(function () {
        secondIexCall()
    });

    $("#cancelPurchaseBtn").click(function () {
        document.getElementById("buyStock").style.display = "flex";
            document.getElementById("priceQuoteContainer").style.display = "none";
    });


    var stockSymbol
    var quantity

    $("#buyStock").submit(function (event) {
        event.preventDefault();
        var action = "/todos";
        var method = "post";
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

        



    });
});
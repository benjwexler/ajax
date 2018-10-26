let symbolsObj = {}


    

$.ajax({
    dataType: 'jsonp',
    // timeout: 5000, // sets timeout to 5 seconds
    url: "https://api.iextrading.com/1.0/ref-data/symbols",
    success: function(data){

        // console.log(data[0].symbol)

        for(let i=0; i<data.length; i++) {
            // console.log(data[i].symbol)

            symbolsObj[(data[i].symbol)] = 1
        }
     


    }

})


$(function(){
    $("#buyStock").submit(function(event){
      event.preventDefault();
      var action = $(this).attr('action');
      var method = $(this).attr('method');
          var stockSymbol = $(this).find('#realTickerSymbol').val();
      var quantity = $(this).find('#realQuantity').val();

     
     
    //   var data = $(this).serializeArray();
        let fullPrice 
        console.log(parseInt(quantity))


    if((parseInt(quantity)) && (parseInt(quantity) > 0)) {

        if(symbolsObj[`${stockSymbol.toUpperCase()}`] === 1) {

            // fetches stock price from IEX api
      $.ajax({

        url: `https://api.iextrading.com/1.0/stock/${stockSymbol}/price`,
        dataType: 'jsonp',

        
        success: function(data){

            
                    console.log(data)

                    console.log(data*quantity)


                    fullPrice = data*quantity 
              
                    document.getElementById("todo_description").value = stockSymbol
                    document.getElementById("todo_priority").value = quantity 
                    document.getElementById("currentPrice").innerText = `The total price is $${fullPrice}`
                    document.getElementById("buyStock").style.display = "none";
                    document.getElementById("priceQuoteContainer").style.display = "flex";
                    // post2database(fullPrice);
                    
            },
            error: function(xhr, status, error){
                var errorMessage = xhr.status + ': ' + xhr.statusText
                alert('Error - ' + errorMessage);
            }

            
          // this line makes the response format JavaScript and not html.
        // dataType: 'script'
      });

    } else {
        alert("Fake Stock!")
    }
} else {
    alert("Please enter a valid quantity")
}
function post2database(){
    $.ajax({
    method: method,
    url: action,
    data: { todo: {description: fullPrice, priority: quantity} },
   
    // data: fullPrice,
    dataType: 'script'
       
    });
}

    
  
    });
  });
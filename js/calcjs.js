$(document).ready(function(){
var inputTags =["#account-value","#account-risk-ratio", "#entry-price", "#initial-protective-stop"]

  function currencyFormat(amount) {
        var i = parseFloat(amount);
        if(isNaN(i)) { i = 0.00; }
        var minus = '';
        if(i < 0) { minus = '-'; }
        i = Math.abs(i);
        i = parseInt((i + .005) * 100);
        i = i / 100;
        s = new String(i);
        if(s.indexOf('.') < 0) { s += '.00'; }
        if(s.indexOf('.') == (s.length - 2)) { s += '0'; }
        s = minus + s;
        return s;
    };

  function commaFormat(amount) {
    var delimiter = ","; // replace comma if desired
    var a = amount.split('.',2)
    var d = a[1];
    var i = parseInt(a[0]);
    if(isNaN(i)) { return ''; }
    var minus = '';
    if(i < 0) { minus = '-'; }
    i = Math.abs(i);
    var n = new String(i);
    var a = [];
    while(n.length > 3) {
      var nn = n.substr(n.length-3);
      a.unshift(nn);
      n = n.substr(0,n.length-3);
    }
    if(n.length > 0) { a.unshift(n); }
    n = a.join(delimiter);
    if(d.length < 1) { amount = n; }
    else { amount = n + '.' + d; }
    amount = minus + amount;
    return amount;
  };

  function percentFormat (percent){
    return (percent * 100).toFixed(1);
  };

  function removeSymbol (inputString){
    var newString = ""
     if (inputString[0] == "$" || inputString[0] == "%"){
      for(var i= 1; i < inputString.length; i++)
      {
        newString +=inputString[i];
      }
    } else if (inputString[-1] == "%"){
      for(var i= 0; i < inputString.length-1; i++)
      {
        newString +=inputString[i];
      }
    }else{
      newString+=inputString;
    }
    return newString;
  };

  function convertPercent(num){
          if (num >= 1)
          {
            return num / 100;
          }else{
            return num;
          }
  };

 
  $("#account-summary").on('click','#compute',  function()
    {

      if()
        var accountValue = Number(removeSymbol($("#account-value").val()));
        var accountRiskRatio = Number(removeSymbol($("#account-risk-ratio").val()));
        var copyAccountRiskRatio = convertPercent(accountRiskRatio);
        var entryPrice = Number(removeSymbol($("#entry-price").val()));
        var initialProtectiveStop = Number(removeSymbol($("#initial-protective-stop").val()));

        var value = commaFormat(currencyFormat(accountValue)).toString();
        var per = (copyAccountRiskRatio*100).toString();

        $("#account-value").val('$'+value);
        $("#account-risk-ratio").val(per+"%");
        $("#entry-price").val('$'+commaFormat(currencyFormat(entryPrice)));
        $("#initial-protective-stop").val('$'+commaFormat(currencyFormat(initialProtectiveStop)));
         
        for(var i = 0; i < inputTags.length; i++){
          $(inputTags[i]).css("text-align", "right");
        }

        var riskedShare = entryPrice - initialProtectiveStop;
        var riskedPosition = riskedShare/entryPrice;
        var maxAcceptableRisk = (accountValue*copyAccountRiskRatio)/riskedShare;
        var riskedPositionDoll = maxAcceptableRisk * riskedShare;

        $("#risked-share").html("$"+commaFormat(currencyFormat(riskedShare)));
        $("#risked-position-per").html(commaFormat(percentFormat(riskedPosition))+"%");
        $("#max-risk").html("$"+commaFormat(currencyFormat(maxAcceptableRisk)));
        $("#risked-position-dol").html("$"+commaFormat(currencyFormat(riskedPositionDoll)));
    });
});
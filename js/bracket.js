var ds;
var totalEntries;
var allData = [];
var sheetCount = 1;

$(document).ready(function(){

  loadData(sheetCount);
  //POPULATE DATA FROM GOOGLE SPREADSHEET
  function loadData(which) {
   
      //LOAD DATA WITH MISO
      ds = new Miso.Dataset({
          importer : Miso.Dataset.Importers.GoogleSpreadsheet,
          parser : Miso.Dataset.Parsers.GoogleSpreadsheet,
          key : "0AurS2EUbrPERdHBkR3VuR3FRSC00QlpmWXJPcnBhUGc",
          worksheet : which 
      });

      ds.fetch({ 
        success : function() {
          //console.log(ds.column("thetalk").data);
          console.log("So say we all!");
          parseData();
        },
        error : function() {
          console.log("What the frak?");
        }
      });
    }

    function parseData() {

      var $len = ds.column("seed").data.length;
      totalEntries = $len;
      
      //LOOP THRU GOOGLE DATA AND PUT INTO OBJECT
      for (var j=0; j<$len; j++) {
        var counter = ds.column("id").data[j];
        allData[counter] = [ {
                    myid: ds.column("id").data[j],
                    seed: ds.column("seed").data[j],
                    name: ds.column("name").data[j]
                    }];
      }
      //console.log(allData);
      
      if (sheetCount < 6) {
        sheetCount ++;
        loadData(sheetCount);
      } else {
        showData();
      }
    }

    function showData() {
      for (var k=0; k<allData.length; k++) {
        if (k <= 31) {
           $("#c1" + "s" + (k + 1)).text("(" + allData[k][0].seed + ") " + allData[k][0].name);
        }
        if (k >= 32 && k <= 63) {
           $("#c11" + "s" + (k - 31)).text("(" + allData[k][0].seed + ") " + allData[k][0].name);
        } 
        if (k >= 63 && k <= 75) {
          $("#c12" + "s" + (k - 63)).text("(" + allData[k][0].seed + ") " + allData[k][0].name);
        }
        if (k == 76) {
          $("#r1").text(allData[k][0].name);
        }
        if (k == 77) {
          $("#r2").text(allData[k][0].name);
        }
        if (k == 78) {
          $("#r3").text(allData[k][0].name);
        }
        if (k == 79) {
          $("#r4").text(allData[k][0].name);
        }

        if (k == 80) {
          $("#fflabel1").text(allData[k][0].name);
        }
        if (k == 81) {
          $("#fflabel2").text(allData[k][0].name);
        }
        if (k == 82) {
          $("#fflabel3").text(allData[k][0].name);
        }
        if (k == 83) {
          $("#fflabel4").text(allData[k][0].name);
        }

      }
    }

    //END DATA LOADING


	  $(".slot").click(function() {
      
      if (parseInt($(this).attr('data-col')) <= 5) {
        
        var tmpTxtA = $("#c" + (parseInt($(this).attr('data-col')) + 1 ) + "s" + $(this).attr('data-game')).text();
        var tmpColA = $(this).attr('data-col');
  
        $("#c" + (parseInt($(this).attr('data-col')) + 1 ) + "s" + $(this).attr('data-game')).text($(this).text());

        $('.slot').each(function() {
            var text = $(this).text();
            if (text == tmpTxtA) {
              if ($(this).attr('data-col') > tmpColA && $(this).attr('data-col') <=6 ) {
                $(this).text('');
              }
            }
        });
      

      } else if (parseInt($(this).attr('data-col')) >= 7 && parseInt($(this).attr('data-col')) < 12) {
          
          var tmpTxtB = $("#c" + (parseInt($(this).attr('data-col')) - 1 ) + "s" + $(this).attr('data-game')).text();
          var tmpColB = $(this).attr('data-col');

          $("#c" + (parseInt($(this).attr('data-col')) - 1 ) + "s" + $(this).attr('data-game')).text($(this).text());

          $('.slot').each(function() {
              var text = $(this).text();
              if (text == tmpTxtB) {
                if (parseInt($(this).attr('data-col')) < tmpColB) {
                    $(this).text('');
                }
              }
          });
        
      }

      if (parseInt($(this).attr('data-col')) == 6) {
        $("#c6s0").text($(this).text());
      }

      if (parseInt($(this).attr('data-col')) > 11) {
        var tmpTxtC = $("#c" + (parseInt($(this).attr('data-col'))) + "s" + $(this).attr('data-game')).text();
        
        $("#c" + (parseInt($(this).attr('data-col'))) + "s" + $(this).attr('data-game')).text($(this).text());
        $("#ff" + $(this).attr('data-game')).text($(this).text());

        $('.slot').each(function() {
            var text = $(this).text();
            if (text == tmpTxtC) {
              if ($(this).attr('data-col') < 11) {
                $(this).text('');
              }
            }
        });
      }
    });
    
    $("#printbtn").click(function() {
      window.print();
    });

}); // end document.ready block
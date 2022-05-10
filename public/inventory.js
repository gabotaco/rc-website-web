function Start(value){
      if (value === null || value == "" || value <= 0) {
            value = 1;
      }
      console.log(value);
      var fetchUrl = 'http://api.tycoon.community:30169/status/inventory/' + value;
      fetch(fetchUrl)
      fetch(fetchUrl).then(function(res){ return res.text()}).then(function(html) {
            var parser = new DOMParser();
            var doc = parser.parseFromString(html, "text/html");
            var table = doc.getElementsByTagName('table')[0];
            var list = tableToJson(table);
            console.log(list);
            list.sort(function(a, b) {return a.item.localeCompare(b.item);});
            list.splice(0, 2);
            toHTML(list);
      })
      .catch(function(err) {  
            var fetchUrl = 'http://api.tycoon.community:30122/status/inventory/' + value;
            fetch(fetchUrl)
            fetch(fetchUrl).then(function(res){ return res.text()}).then(function(html) {
                  var parser = new DOMParser();
                  var doc = parser.parseFromString(html, "text/html");
                  var table = doc.getElementsByTagName('table')[0];
                  var list = tableToJson(table);
                  console.log(list);
                  list.sort(function(a, b) {return a.item.localeCompare(b.item);});
                  list.splice(0, 2);
                  toHTML(list);
            })
            .catch(function(err) {  
                  var fetchUrl = 'http://api.tycoon.community:30123/status/inventory/' + value;
                  fetch(fetchUrl)
                  fetch(fetchUrl).then(function(res){ return res.text()}).then(function(html) {
                        var parser = new DOMParser();
                        var doc = parser.parseFromString(html, "text/html");
                        var table = doc.getElementsByTagName('table')[0];
                        var list = tableToJson(table);
                        console.log(list);
                        list.sort(function(a, b) {return a.item.localeCompare(b.item);});
                        list.splice(0, 2);
                        toHTML(list);
                  })
                  .catch(function(err) {  
                        var fetchUrl = 'http://api.tycoon.community:30124/status/inventory/' + value;
                        fetch(fetchUrl)
                        fetch(fetchUrl).then(function(res){ return res.text()}).then(function(html) {
                              var parser = new DOMParser();
                              var doc = parser.parseFromString(html, "text/html");
                              var table = doc.getElementsByTagName('table')[0];
                              var list = tableToJson(table);
                              console.log(list);
                              list.sort(function(a, b) {return a.item.localeCompare(b.item);});
                              list.splice(0, 2);
                              toHTML(list);
                        })
                        .catch(function(err) {  
                              var fetchUrl = 'http://api.tycoon.community:30125/status/inventory/' + value;
                              fetch(fetchUrl)
                              fetch(fetchUrl).then(function(res){ return res.text()}).then(function(html) {
                                    var parser = new DOMParser();
                                    var doc = parser.parseFromString(html, "text/html");
                                    var table = doc.getElementsByTagName('table')[0];
                                    var list = tableToJson(table);
                                    console.log(list);
                                    list.sort(function(a, b) {return a.item.localeCompare(b.item);});
                                    list.splice(0, 2);
                                    toHTML(list);
                              })
                              .catch(function(err) {  
                                    console.log('Failed to fetch page: ', err);  
                              });
                        });
                  });
            });
      });
}

function tableToJson(table) {
    var data = [];

    // first row needs to be headers
    var headers = [];
    for (var i=0; i<table.rows[0].cells.length; i++) {
        headers[i] = table.rows[0].cells[i].innerHTML.toLowerCase().replace(/ /gi,'');
    }

    // go through cells
    for (var i=1; i<table.rows.length; i++) {

        var tableRow = table.rows[i];
        var rowData = {};

        for (var j=0; j<tableRow.cells.length; j++) {

            rowData[ headers[j] ] = tableRow.cells[j].innerHTML;

        }

        data.push(rowData);
    }       

    return data;
}

function toHTML(array){
      document.getElementById('data').innerHTML = '<div id="data"></div>';
      var save = document.getElementById('data').innerHTML;
      save += "Items: " + array.length;
      for (var i=1; i<array.length; i++) {
            save += '<div>'
            save += '<div class="box1" id="amount"; >'
            save += array[i].amount;
            save += '</div>';
            save += '<div class="box2" id="item">';
            save += array[i].item;
            save += '</br>';
            save += '</div>';
            save += '</div>';
      }
      document.getElementById('data').innerHTML = save;
}

Start(185932);
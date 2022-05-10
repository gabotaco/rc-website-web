var data = [];

function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    return vars;
}

function getUrlParam(parameter, defaultvalue){
    var urlparameter = defaultvalue;
    if(window.location.href.indexOf(parameter) > -1){
        urlparameter = getUrlVars()[parameter];
        }
    return urlparameter;
}

function Start() {
      var value = getUrlParam('id','2');
      data = [];
      for (i = 0 ;i<=500;i++) {
            if (i>0) {
                  data.push(data[i-1]+(i*5));
            } else {
                  data.push(0);
            }
      }
      setTimeout(function(){
            document.getElementById('data').innerHTML = '';
            setTimeout(function(){
                  Data(value);
            }, 500);
      }, 500);
}

function Data(value) {
      if (value === null || value == "" || value <= 0) {
            value = 1;
      }
      var fetchUrl = 'http://api.tycoon.community:30122/status/data/' + value;
      fetch(fetchUrl)
      fetch(fetchUrl).then(function(res){ return res.text()}).then(function(html) {
            var parser = new DOMParser();
            var doc = parser.parseFromString(html, "text/html");
            toHTML(JSON.parse(doc.body.innerHTML).data);
      })
      .catch(function(err) {  
            console.log('Failed to fetch page: ', err);  
      });
}

function toHTML(string){
      var save = document.getElementById('data').innerHTML;
      save += '{"strength":"' + levelFromExp(string.gaptitudes_v.physical.strength) + '","cooldown":"'+ hasCooldown(string.licenses.corp_cooldown) +'","inCompany":"' + inCompany(string.groups) + '"}';
      document.getElementById('data').innerHTML = save;
}

function levelFromExp(g_Exp) {
    for (var i = 0; i < data.length; i++) {
        if (parseInt(data[i])>g_Exp) {
            return i;
        } else if (parseInt(data[i])==g_Exp) {
            var save = document.getElementById('data').innerHTML;
            return i;
        } else if (i == data.length-1 && parseInt(data[i])<g_Exp) {
            return i;
        }
    }
}

function hasCooldown(val) {
      if (val >= 1) {
            return "true";
      } else {
            return "false";
      }
}

function inCompany(val) {
      companys = ["corp1", "corp2", "corp3", "corp4", "corp5", "corp6", "corp7", "corp8", "corp9", "corp10", "corp11", "corp12", "corp13", "corp14", "corp15", "corp16"];
      var s = JSON.stringify(val);
      var n = 0;
      for (i = 0; i <companys.length; i++){
            n += s.search(companys[i]);
      }
      if (n <= -1) {
            return "false";
      } else {
            return "true";
      }
}

Start(185932);

/************************************************
 ** Copyright (C) 2016-2020 XCMG Inc..
 ** 类    名：xgxx.js
 ** 作    者：machen
 ** 描    述：通用功能
 ** 生成日期：2016/12/22
 ** 修改日志：
 *************************************************/
(function() {
	window.xgit = window.xgit || {
//		server_Domain: "http://10.3.1.78:86/",//马佗
//		server_Domain: "http://10.3.1.190:90/",//李帅
//		server_Domain: "http://10.3.0.246:8095/",//内网-统一部署

        server_Domain: "http://10.100.2.11:8095/",//内网-统一部署
        server_ip:"http://10.100.2.11",
        server_port:"8095",    
        
      /*  server_Domain: "http://192.188.22.100:8095/",//富通
        server_ip:"http://192.188.22.100",
        server_port:"8095",*/
        
        
		isConnect: function() {
			if (plus.networkinfo.getCurrentType() != 1)
				return true;
			    return false;
		},

		ajax: function(url, settings) {
            android.print(1);
			if (true) {

				var ajaxSettings = {
					type: settings.type || 'post',
					data: settings.data || {},
					dataType: settings.dataType || 'jsonp',
					jsonp: "callbackparam",
					jsonpCallback:"callback",
					timeout: settings.timeout || 50000,
					success: function(response, status, xhr) {
						if (settings.success)
							settings.success(response);
					},
					error: function(xhr, type, errorThrown, XMLHttpRequest) {
						closeLoading();
						console.warn(xhr.responseText);
						console.log("ajax错误:" + type + ",\n异常对象：" + errorThrown + ",\nXMLHttpRequest：" + JSON.stringify(XMLHttpRequest));
						if (settings.error){
							settings.error(type, errorThrown);}
						else{
							mui.toast("请求失败");
						}
						if(xhr.responseText == ""){
							return;
						}
					}
				};                          //
				url = url.indexOf("http") >= 0 ? url : ("http://10.100.2.11:8095/"+ url);   //xgxx.server_Domain
                android.print(url);
				android.print(JSON.stringify(ajaxSettings));
				mui.ajax(url, ajaxSettings);
			} else {
				mui.toast("网络连接不可用！");
			}
		},
		resultLog: function(data) {
//			console.log(data)
//			console.log(data.indexOf("V_sys_users"))
			if ( data.indexOf('tb_MyUser')>0 ) {
				var str = data.substr(10,data.length-12);
				str = str.replace(/[\'\\\\/\b\f\n\r\t]/g, '');
//				console.log(str)
				var result = eval(str);
//				console.log(JSON.stringify(result))
				return result
			} else{
				var result = data.substring(data.indexOf('(')+2,data.length-2);
//				console.log(result)
				return result
			}
		},
		resultTag: function(data) {
//			console.log(data)
//			console.log(data.indexOf("V_sys_users"))
			if ( data.indexOf('[')>0 ) {
//				alert(1)
				var str = data.substr(10,data.length-12);
				str = str.replace(/[\'\\\\\b\f\n\r\t]/g, '');
//				console.log(str)
				var result = eval(str);
//				console.log(JSON.stringify(result))
				return result
			} else{
//				alert(2)
				var result = data.substring(data.indexOf('(')+2,data.length-2);
//				console.log(result)
				return result
			}
		},
		resultMC: function(data) {
			//console.log(data)
//			console.log(data.indexOf('('))
			if ( data.indexOf('{')>0 ) {
				var str1 = data.substr(10,data.length-12);
			
				str1 = str1.replace(/[\'\\\\/\b\f\n\r\t]/g, '');
	
				if(str1.substr(0,1)!="[")
			    str1="["+str1+"]";
			  //  console.log(str1) 
		
				var result = eval(str1);	
				
				
				return result
			} else{
				var result = data.substring(data.indexOf('(')+1,data.length-1);
//				mui.toast(result)
				return result
			}
		},
		openWin: function(name){			
			mui.openWindow({
				url: name+'.html',
				id: name,
				extras:{}
			});
		}
	};
})(window, mui);


function closeWin(){
	plus.webview.currentWebview().close();
}

function backToHome(){
	var all=plus.webview.all();		
      for(var i=0;i<all.length;i++){
		if(all[i].getURL()!=localStorage.getItem("indexUrl")
		&&all[i].getURL()!=localStorage.getItem("loginUrl")){						
		console.log(all[i].getURL());
		all[i].close();						
			}	
		} 
	
}





function setPxPerRem() {
	var cssEl = document.createElement('style');
	document.documentElement.firstElementChild.appendChild(cssEl);
	var dpr = 1;
	//把viewport分成10份的rem，html标签的font-size设置为1rem的大小;
     var pxPerRem = document.documentElement.clientWidth * dpr / 24;
	cssEl.innerHTML = 'html{font-size:' + pxPerRem + 'px!important;}';	
	//alert(pxPerRem);
//	console.log("1rem="+pxPerRem+"px");
}	


function checkBoxAll() {
	$('#checkAll').live('change',function (e) {
	    e.preventDefault();
	    if ($('#checkAll').is(":checked")){
			$('input[type=checkbox]').prop('checked',true);
	    } else {
			$('input[type=checkbox]').prop('checked',false);
	    }
	})
}

function Appendzero(obj) {
	if(obj<10) return "0" +""+ obj;
	else return obj;
}
function addDate(date, days) {
	var d = new Date(date);
	d.setDate(d.getDate() + days);
	var month = Appendzero(d.getMonth() + 1)
	var day = Appendzero(d.getDate());
	if (month < 10) {
		month = month;
	}
	if (day < 10) {
		day = day;
	}
	var val = d.getFullYear() + "-" + month + "-" + day;
	return val;
}
function formatDate(obj) {
	var obj = obj.substr(0,4)+"-"+obj.substr(4,2)+"-"+obj.substr(6,2)
	return obj;
}



// 把对象变成字符串
function getParams(obj) {
	var str = "";
	for (var key in obj) {
		str += key + "=" + obj[key] + "&";
	}
	return str;
}

//创建核心对象
function createXHR() {
	if (window.XMLHttpRequest) {
		return new XMLHttpRequest();
	}
	return new ActiveXObject("Msxml2.XMLHTTP");
}

//创建ajax
function ajax(sttings) {
	sttings.type = sttings.type == undefined ? "get" : sttings.type; //默认为 get 请求
	sttings.dataType = sttings.dataType == undefined ? "json" : sttings.dataType; //默认为 json 格式
	sttings.async = sttings.async == undefined ? true : sttings.async; //默认为 异步

	var xhr = createXHR(); // 得到核心对象

	if (sttings.type == "get") {
		// 准备发送参数
		xhr.open("get", sttings.url + "?" + getParams(sttings.data), sttings.async);
		//发送请求
		xhr.send(null);
	} else {
		xhr.open("post", sttings.url, sttings.async);
		xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xhr.responseType = "json";
		xhr.send(getParams(sttings.data));
	}

	//等待接收结果
	if (sttings.async) { //默认为  异步
		xhr.onreadystatechange = function() {
			if (xhr.readyState == 4) {
				getResult();
			}
		}
	} else { // 同步
		getResult();
	}

	function getResult() {
		if (xhr.status == 200) {
			if (sttings.success) {
				var data = typeof(xhr.response) == "string" ? JSON.parse(xhr.response) : xhr.response;
				sttings.success(data);
			}
		}
	}

}

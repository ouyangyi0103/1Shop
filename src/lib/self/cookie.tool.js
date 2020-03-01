;
const COOKIE = (function() {
	function setCookie(name, value, expires, path, domain, secure) {
		var str = "";
		if (name) {
			str += name + "=" + value + ";";
		}
		if (typeof(expires)) {
			var date = new Date();
			date.setDate(date.getDate() + expires);
			str += "expires=" + date + ";";
		}
		if (path) {
			str += "path=" + path + ";";
		}
		if (domain) {
			str += "domain=" + domain + ";";
		}
		if (secure) {
			str += "secure;";
		}
		document.cookie = str;
	}

	function getCookieAll() {
		var obj = {};
		var strCookie = document.cookie;
		var arr = strCookie.split("; ");
		
		arr.forEach((el, index) => {
			var arrList = el.split("=");
			obj[arrList[0]] = arrList[1];
		})
		return obj;
	}

	function getCookie(name) {
		var obj = getCookieAll();
		return obj[name];
	}

	function removeCookie(name) {
		setCookie(name, " ", -1);
	}

	return {
		setCookie,
		getCookie,
		removeCookie
	}
})();

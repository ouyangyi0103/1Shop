function getStyle(obj, attr) {
	if (window.getComputedStyle) {
		return window.getComputedStyle(obj, null)[attr]; //非ie
	}
	return obj.currentStyle[attr]; //兼容ie
}

function animate(oEle, json, fn) {
	//清除之前的定时器，保证只有一个定时器在运行
	clearInterval(oEle.timer);
	//开启一个新的定时器
	oEle.timer = setInterval(() => {
		//定义一个flag 假设元素都走到了指定的位置
		let flag = true;
		//遍历json
		for (var attr in json) {
			//定义目标值 和 当前值 为0
			let target = 0;
			let current = 0;
			//如果属性 attr == "opacity"  透明度opacity的范围为0~1 是小数
			if (attr == "opacity") {
				//获取目标值
				target = parseFloat(json[attr]) * 100;
				//获取当前值
				current = parseFloat(getStyle(oEle, attr)) * 100;
			} else {
				//获取目标值
				target = parseInt(json[attr]);
				//获取当前值
				current = parseInt(getStyle(oEle, attr));
			}
			//设置步长 步长 = (目标值 - 当前值) / 10
			let step = (target - current) / 10;
			//判断步长是否 > 0,如果是就 向上取整，否则 向下取整
			step = step > 0 ? Math.ceil(step) : Math.floor(step);
			//新位置 = 当前位置 + 步长
			if (attr == "opacity") {
				oEle.style[attr] = (current + step) / 100;
			} else if (attr == "zIndex") {
				oEle.style[attr] = target;
			} else {
				oEle.style[attr] = current + step + "px";
			}
			//只要有一个元素没有完成,就不能清空定时器
			if (target != current) {
				flag = false;
			}
		}
		//如果元素都到达目标位置了,就清空定时器
		if (flag) {
			clearInterval(oEle.timer);
			//如果 fn 的类型为 function  就调用 fn()
			if (typeof(fn) == "function") {
				fn();
			}
		}
	},30)
}

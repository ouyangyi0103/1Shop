$(function () {
	//大型下拉菜单开始
	$.ajax({
		url: '../lib/json/all_hide.json',
		dataType: 'json',
		success: function (res) {
			let str = '';
			res.forEach(el => {
				str += `
            <li>
            <p>${el.title}</p>
            <ol>`
				el.content.forEach(el1 => {
					str += `<li>${el1}</li>`
				})
				str += `</ol>
            </li>
            `
			});
			$('.all_hide ul').html(str);
			$('.all_class').on({
				mouseenter: () => $('.all_hide').stop().slideDown(),
				mouseleave: () => $('.all_hide').stop().slideUp()
			})
		}
	})
	//大型下拉菜单结束

	//轮播图开始
	var oUl = document.querySelector('.banner_box ul');
	oUl.appendChild(oUl.children[0].cloneNode(true));
	var oOl = document.querySelector(".banner_box ol");
	for (var i = 0; i < oUl.children.length - 1; i++) {
		oOl.children.tempIndex = i;
		if (i == 0) {
			oOl.children.className = 'current';
		}
	}

	var imgIndex = 0;
	var pointIndex = 0;

	function autoPlay() {
		imgIndex++;
		if (imgIndex > 3) {
			oUl.style.left = '0px';
			imgIndex = 1;
		}
		animate(oUl, {
			left: -imgIndex * 1519
		});

		pointIndex++;
		if (pointIndex >= 3) {
			pointIndex = 0;
		}
		for (var i = 0; i < oOl.children.length; i++) {
			oOl.children[i].className = '';
		}
		oOl.children[pointIndex].className = 'current';
	}

	var timer = setInterval(autoPlay, 3000);
	oUl.onmouseenter = function () {
		clearInterval(timer);
	}
	oUl.onmouseleave = function () {
		timer = setInterval(autoPlay, 3000);
	}

	var oLi = document.querySelectorAll(".banner_box ol li");
	for (var i = 0; i < oLi.length; i++) {
		oLi[i].tempIndex = i;
		oLi[i].onmouseenter = function () {
			imgIndex = pointIndex = this.tempIndex - 1;
			autoPlay();
			clearInterval(timer);
		}
		oLi[i].onmouseleave = function () {
			timer = setInterval(autoPlay, 3000);
		}
	}
	//轮播图结束

	//超级单品开始
	$.ajax({
		url: '../lib/json/super_list.json',
		dataType:'json',
		success: function (res) {
			console.log(res)
		}
	})
	//超级单品结束
})
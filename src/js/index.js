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

	//固定导航栏开始
	$(window).scroll(() => {
		if ($(window).scrollTop() >= 759) {
			$('.search_hide').slideDown()
			$('.search_hide').css({
				position: 'fixed',
				top: 0,
				zIndex: 9999
			})
		} else {
			$('.search_hide').hide()
		}
	})
	//固定导航栏结束

	//二维码跟随滚动开始
	$(window).scroll(() => {
		$(window).scrollTop() >= 629 ? $('.QR_code').addClass('active') : $('.QR_code').removeClass('active')
	})
	//二维码跟随滚动结束

	//倒计时开始
	let endTim = new Date(2020, 8, 8, 20, 8, 0, 0);
	let currentTim = Date.now();
	let resTim = parseInt(endTim - currentTim) / 1000;
	setInterval(function () {
		if (resTim > 1) {
			resTim = resTim - 1;
			var second = parseInt(resTim % 60);
			var minute = parseInt((resTim / 60) % 60);
			var hour = parseInt((resTim / 3600) % 24);

			second = second <= 9 ? "0" + second : second;
			minute = minute <= 9 ? "0" + minute : minute;
			hour = hour <= 9 ? "0" + hour : hour;

			$('.timer p').first().html(hour);
			$('.timer p').eq(1).html(minute);
			$('.timer p').eq(2).html(second);
		}
	}, 1000)
	//倒计时结束
})
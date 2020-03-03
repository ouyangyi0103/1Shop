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
// 关闭进度条
NProgress.configure({
    showSpinner:false
});
// 开始进度条
$(document).ajaxStart(function(){
    NProgress.start();
});
// 结束进度条
$(document).ajaxStart(function(){
    setTimeout(function(){
        NProgress.done();    
    },500);
});


// 二级菜单的显示与隐藏
$(".child").prev().on("click",function(){
    $(this).next().slideToggle();
});

// 侧边栏的显示与隐藏
$(".menu").on("click",function(){
    $(".aside").toggleClass("now");
    $(".main").toggleClass("now");
})

// 模态框退出功能
$(".logout").on("click",function(){
    $("#logoutModal").modal("show");
    $(".exit").off().on("click",function(){
        $.ajax({
            type:'get',
            url:'/employee/employeeLogout',
            success:function(data){
                if(data.success){
                    location.href="login.html";
                }
            }
        })
    })
});
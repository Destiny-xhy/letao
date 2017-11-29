$(function(){
    var $form=$("form");

    // 表单校验
    $form.bootstrapValidator({

        // 校验小图标
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },

        // 校验字段
        // 用户名不能为空
        // 密码不能为空，长度为6-12位
        fields:{
            username:{
                validators:{
                    notEmpty:{
                        message:'用户名不能为空'
                    },
                    callback:{
                        message:'用户名不存在'                        
                    }
                }
            },
            password:{
                validators:{
                    notEmpty:{
                        message:'密码不能为空'                        
                    },
                    stringLength:{
                        min:6,
                        max:12,
                        message:'密码长度为6-12位'
                    },
                    callback:{
                        message:'密码错误'                        
                    }
                }
            }
        }
    });

    // 给表单注册成功事件
    $form.on('success.form.bv', function (e) {
        e.preventDefault();
        //使用ajax提交逻辑
        $.ajax({
            type:'post',
            url:'/employee/employeeLogin',
            data:$form.serialize(),
            success:function(data){
                if(data.success){
                    location.href="index.html";
                }
                if(data.error==1000){
                    // 用户名校验失败的时候
                    //第一个参数：想要修改的字段
                    //第二个参数：改成什么状态  INVALID  VALID
                    //第三个参数： 指定显示的错误信息
                    $form.data("bootstrapValidator").updateStatus("username","INVALID","callback");
                }
                if(data.error==1001){
                    $form.data("bootstrapValidator").updateStatus("password","INVALID","callback");
                    
                }
            }
        })
    });

    // 重置样式
    $("[type='reset']").on("click",function(){
        $form.data("bootstrapValidator").resetForm();
    })
})
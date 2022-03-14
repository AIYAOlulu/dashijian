$(function() {
    // 111✿✿✿ 去注册，去登录互换功能
     // 点击“去注册账号”的链接
     $('#link_reg').on('click', function () {
        $('.login-box').hide()
        $('.reg-box').show()
    })

    // 点击“去登录”的链接
    $('#link_login').on('click', function () {
        $('.login-box').show()
        $('.reg-box').hide()
    })

    // 222✿✿✿ 表单验证
   // 从layui中获取form对象
   var form = layui.form;
   var layer=layui.layer;
   //通过form.verify()函数自定义校验规则
   form.verify({
       
       //自定义了一个叫做pwd的校验规则,添加到3个密码框
       pwd:[/^[\S]{6,12}$/,'密码密须是6到12位，且不能出现空格'],

        // 密码和确认密码一致验证校验
       repwd:function(value){ // 通过形参拿到确认密码框的内容
        // 还需要拿到密码框内容
       var pwd=$('.reg-box [name=password]').val();
        // 然后进行一次对等判断
        // 判断失败弹出提示框
        if(pwd !== value){
            return '两次密码输入不一致'
        }
       }
   })

 // 333✿✿✿ 注册功能  接口文档
 // 监听注册表单的提交事件  给注册表单添加id="form_reg"
$('#form_reg').on('submit',function(e){
    //1. 阻止默认行为
    e.preventDefault();
    //2. 发起ajax的post请求  
    $.post('/api/reguser',{username:$('#form_reg [name=username]').val(),password:$('#form_reg [name=password]').val()},function(res){
        if(res.status != 0){
            return layer.msg(res.message);
        }
        layer.msg('注册成功,请登录')
        //注册成功调用去登录的点击行为
        $('#link_login').click()
     })
});

// 444✿✿✿ 登录功能  接口文档
//监听登录表单的提交事件
$('#form_login').submit(function(e){
    e.preventDefault()
    $.ajax({
        method:'post',
        url:'/api/login',
        data:$(this).serialize(),//快速收集表单中的数据
        success:function(res){
            if(res.status != 0){
                return layer.msg('登录失败')
            }
            layer.msg('登录成功')
            //将登录成功得到的token字符串 保存到localStorage中
            localStorage.setItem('token',res.token)
            //跳转到后台主页
            location.href = '/index.html'
        }
    })
});
// 555✿✿✿  在ajaxPrefilter中统一拼接请求的根路径   公共样式
})
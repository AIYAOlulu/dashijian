$(function() {
    // ✿✿✿✿✿✿定义一个查询的参数对象 ，请求数据时，需要将请求参数对象提交到服务器
    var layer=layui.layer;

    // ✿✿✿✿✿✿定义梅花事件的过滤器
      template.defaults.imports.dataFormat=function(date){
        const dt = new Date(date)

        var y = dt.getFullYear()
        var m = padZero(dt.getMonth() + 1)
        var d = padZero(dt.getDate())
      
        var hh = padZero(dt.getHours())
        var mm = padZero(dt.getMinutes())
        var ss = padZero(dt.getSeconds())
      
        return y + '-' + m + '-' + d + ' ' + hh + ':' + mm + ':' + ss
      }
      
      // 定义补零的函数
      function padZero(n) {
        return n > 9 ? n : '0' + n
      }
      


    var q={
        pagenum: 1,//页码值
        pagesize: 2,//每页显示多少条数据
        cate_id: '',//文章分类id
        state:''//状态
    };
    initTable();
// 获取文章列表
    function initTable(){
        $.ajax({
            method: 'GET',
            url:'/my/article/list',
            data:q,
            success: function(res) {
                if(res.status !=0){
                    return layer.msg('获取文章列表失败')
                }
            // ✿✿✿✿✿✿使用模板引擎渲染页面数据
            var htmlStr=template('tpl-table',res)
            $('tbody').html(htmlStr);
            }
            
        })
    }
})
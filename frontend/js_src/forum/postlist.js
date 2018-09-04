var $ = require('jquery');
var axios = require('axios');
var Vue = require('vue');

window.onload = function(){
    var queryStr = window.location.href.split('?')[1];
    var forumId = queryStr.split('=')[1];
    axios.get('/api/forum/postList/', { params: {forumId: forumId, pageSize: 15, pageNum: 0} }).then(function(resp){
        if (resp.data.Code === 0) {
            var postList = resp.data.Data;
            new Vue({
                el: '#postList',
                data: {
                    postlist: postList
                }
            });
        }
    }).catch(function(err){
        console.error(err);
    });

    document.getElementById('submit').onclick = function(){
        var title = document.getElementById('title').value;
        var content = document.getElementById('content').value;
        $.post('/api/forum/sendpost/', {
            __RequestVerificationToken: $('#writePost').find('#token').find('input').val(),
            forumId: forumId, 
            title: title, 
            content: content}, function(resp){
            if (resp.code === 0){
                alert('帖子发表成功！');
                location.reload();
            }
            else{
                alert(resp.msg);
            }
        });
    };
}
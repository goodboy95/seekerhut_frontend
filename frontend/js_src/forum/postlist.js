var axios = require('axios');
var Vue = require('vue');

window.onload = function(){
    var queryStr = window.location.href.split('?')[1];
    var forumId = parseInt(queryStr.split('=')[1]);
    axios.get('/api/forum/postList/', { params: {forumId: forumId, pageSize: 15, pageNum: 1} }).then(function(resp){
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
        axios.post('/api/forum/post/', {
            title: title,
            forumId: forumId,
            authorId: 1,
            content: content
        }).then(function(resp){
            console.log(JSON.stringify(resp));
        }).catch(function(err){
            console.error(err);
        });
    };
}
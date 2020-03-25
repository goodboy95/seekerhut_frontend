var Vue = require('vue');
var axios = require('axios');

window.onload = function(){
    axios.get('/api/forum/forumList/', { params: {pageIndex: 1, pageSize: 15} }).then(function(resp){
        if (resp.data.Code === 0) {
            var forumList = resp.data.Data;
            new Vue({
                el: '#forumList',
                data: {
                    forumlist: forumList
                }
            });
        }
    }).catch(function(err){
        console.error(err);
    });
};
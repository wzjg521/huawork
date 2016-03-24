$(function() {

  var goodEle = $('.good_num');
  var commitNum = $('.commit_num');
  var commit_dialog = $('#comment_dialog');
  var hideCommit = commit_dialog.find('.comment_hide');
  var backCommit = commit_dialog.find('.comment_back');
  var myScroll, pullUpEl, pullUpOffset, generatedCount = 0;
  document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
  var bodyScroll = new iScroll('page_scroll');
  loaded();

  goodEle.click(function() {
    // $.ajax({
    //   type: 'post',
    //   url: 'http://send.good.num',
    //   data: {
    //     user: 'hua', //用户名称，或者uId
    //     videoId: 1234 //此用户点赞的视频Id
    //   }
    // })
    $(this).addClass('active');
    var goodCount = $(this).find('.video_count');
    goodCount.html(parseInt(goodCount.html()) + 1);
  })

  commitNum.click(function() {
    bodyScroll.destroy(); bodyScroll = null;
    commit_dialog.show();
  })
  hideCommit.click(function(){
    bodyScroll = new iScroll('page_scroll');
    commit_dialog.hide();
  })
  backCommit.click(function(){
    bodyScroll = new iScroll('page_scroll');
    commit_dialog.hide();
  })




    function pullUpAction() {
      generatedCount++;
      setTimeout(function() { 
        var el, li, i;
        el = $('#scrolist');
        // $.ajax({
        //    type: "GET",
        //    url: "LoadMore.ashx",
        //    data: { page: generatedCount },
        //    dataType: "json",
        //    success: function (data) {
        //     var json = data;
        //     $(json).each(function () {
        //      li = document.createElement('li');
        //      li.innerHTML = '<img src="' + this.src + '"/>';
        //      el.append(li);
        //     })
        //    }
        // });
      for (var i = 0; i <6; i++) {
          li = document.createElement('li');
          li.innerHTML = 'huahua' + i;
          el.append(li);
      };

        myScroll.refresh(); 
      }, 1000); 
    }

    function loaded() {;
      pullUpEl = document.getElementById('pullUp');
      pullUpOffset = pullUpEl.offsetHeight;
      myScroll = new iScroll('wraper', {
        onRefresh: function() {
          if (pullUpEl.className.match('loading')) {
            pullUpEl.className = '';
            pullUpEl.querySelector('.pullUpLabel').innerHTML = '上拉加载更多...';
          }
        },
        onScrollMove: function() {
          if (this.y < (this.maxScrollY - 5) && !pullUpEl.className.match('flip')) {
            pullUpEl.className = 'flip';
            pullUpEl.querySelector('.pullUpLabel').innerHTML = '松开加载...';
            this.maxScrollY = this.maxScrollY;
          } else if (this.y > (this.maxScrollY + 5) && pullUpEl.className.match('flip')) {
            pullUpEl.className = '';
            pullUpEl.querySelector('.pullUpLabel').innerHTML = '上拉加载更多...';
            this.maxScrollY = pullUpOffset;
          }
        },
        onScrollEnd: function() {
          if (pullUpEl.className.match('flip')) {
            pullUpEl.className = 'loading';
            pullUpEl.querySelector('.pullUpLabel').innerHTML = '加载中...';
            pullUpAction(); // Execute custom function (ajax call?)
          }
        }
      });

      setTimeout(function() {
        document.getElementById('wraper').style.left = '0';
      }, 800);
    }

})


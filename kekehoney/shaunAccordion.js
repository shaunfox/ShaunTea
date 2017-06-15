        function accordionBind(el, eventType, callback) {
            if (typeof el.addEventListener === 'function') {
                //标准事件绑定方法
                el.addEventListener(eventType, callback, false);
            } else if (typeof el.attachEvent === 'function') {
                //IE事件绑定方法
                el.attachEvent('on' + eventType, callback);
            }
        }

        //鼠标悬停的处理函数
        function acMoHandler(e) {
            var target = e.target || e.srcElement;
            //取得外部元素
            var outer = document.getElementById('imageMenu');
            //取得每个列表项
            var list = outer.getElementsByTagName('li');

            //清空所有LI元素的active
            for (var i = 0; i < list.length; i++) {
                list[i].className = list[i].className.replace(/ ?active/g, '');
            }

            //根据事件的冒泡原理，找到需要变更class 的LI元素

            while (target.tagName != "LI" && target.tagName != "BODY") {
                target = target.parentNode;
            }

            //给当前元素加上class active
            target.className += ' active';
        }

        function initList() {
            //取得外部元素
            var outer = document.getElementById('imageMenu');
            //取得每个列表项
            var list = outer.getElementsByTagName('li');
            for (var i = 0; i < list.length; i++) {
                //对每个列表绑定鼠标悬停事件的监听
                accordionBind(list[i], 'mouseover', acMoHandler);
            }
        }

        //执行初始化函数
        initList(); 
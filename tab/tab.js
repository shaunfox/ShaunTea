;
(function() {
    var Tab = function(tab) {
        var _this_ = this;

        // save tab module
        this.tab = tab;

        // default config
        this.config = {
            "triggerType": "mouseover",
            "effect": "default",
            "auto": false,
            "invoke": 1,
        };

        // 如果配置参数存在，就扩展掉默认的配置参数
        if (this.getConfig()) {
            $.extend(this.config, this.getConfig());
        };
        console.log(this.config);
        // 保存tab标签列表和内容列表
        this.tabItems = this.tab.find("ul.tab-nav li.tab-item");
        this.contentItems = this.tab.find("div.content-wrap div.content-item");

        // 保存配置参数（减少this.的链式查找资源消耗）
        var config = this.config;

        if (config.triggerType === 'click') {
            this.tabItems.on('click', function() {
                _this_.invoke($(this));
            })
        } else if (config.triggerType === 'mouseover'||config.triggerType!="click") {
            this.tabItems.on('mouseover', function() {
                _this_.invoke($(this));
            })
        };

        // 自动切换功能
        if(config.auto){
        	this.timer=null;
        	// 定义计数器，进行自动轮播
        	this.loop=0;

        	this.autoPlay();

        	this.tab.hover(function(){
        		window.clearInterval(_this_.timer);
        	}, function(){
        		_this_.autoPlay();
        	})
        };


        // 设置默认显示第几个tab
        if(config.invoke>1){
        	this.invoke(this.tabItems.eq(config.invoke-1));
        }
    };

    Tab.prototype = {
    	autoPlay:function(){
    		var _this_=this;
    		var tabItems=this.tabItems; // 临时保存tab列表
    		var tabLength=tabItems.length; // tab个数
    		var config=this.config;

    		this.timer=window.setInterval(function(){
    			_this_.loop++;
    			if (_this_.loop>=tabLength) {
    				_this_.loop=0;
    			};
    			tabItems.eq(_this_.loop).trigger(config.triggerType)
    		}, config.auto);
    	},



        // 事件驱动程序
        invoke: function(currentTab) {
            var _this_ = this;

            // 存储索引值，tab和content的对应
            var index = currentTab.index();

            // 执行当前tab选中状态,添加和删除active类，切换对应的content内容，根据effect参数
            currentTab.addClass('active').siblings().removeClass('active');
            // 保存effct的value
            var effect = this.config.effect;
            var conItems = this.contentItems;

            console.log(effect);

            if (effect === "default"||effect!="fade") {
                conItems.eq(index).addClass('current').siblings().removeClass('current');
            } else if (effect === "fade") {
                conItems.eq(index).fadeIn().siblings().fadeOut();
            };

            // index and loop 同步
            if(this.config.auto){
            	this.loop = index;
            }

        },



        // get config
        getConfig: function() {
            // get data-config
            var config = this.tab.attr('data-config');

            // make sure isConfig
            if (config && config != "") {
                // 如果想输出config，但config是object,所以需要先将config转成string
                return $.parseJSON(config);
            } else {
                return null;
            }
        },

    };
    // 原生JS的组件方法
    Tab.init = function(tabs){
    	var _this_ = this;
    	tabs.each(function(){
    		new _this_($(this));
    	})
    };

    // 注册为jquery的方法
    $.fn.extend({
    	tab:function(){
    		this.each(function(){
    			new Tab($(this));
    		});
    		return this; // 达到链式调用的效果
    	}
    });

    window.Tab = Tab;
})(jQuery);

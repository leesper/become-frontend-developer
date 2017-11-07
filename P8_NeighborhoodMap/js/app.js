const AppViewModel = function() {
  this.locations = ko.observableArray([
    '灵隐寺',
    '北高峰',
    '云溪竹径',
    '钱江一桥',
    '断桥残雪',
    '台塑牛排',
    '千串屋',
    '柳浪闻莺',
    '南宋御街',
    '五云山',
    '梅家坞',
    '外婆家',
    '六和塔',
    '曲院风荷',
    '玉皇山',
    '楼外楼'
  ]);
};

ko.applyBindings(new AppViewModel());

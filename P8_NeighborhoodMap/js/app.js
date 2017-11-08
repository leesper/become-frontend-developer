const AppViewModel = function() {
  this.locations = ko.observableArray([
    {
      name: '灵隐寺',
      visible: true,
    },
    {
      name: '北高峰',
      visible: true,
    },
    {
      name: '云溪竹径',
      visible: true,
    },
    {
      name: '钱江一桥',
      visible: true,
    },
    {
      name: '断桥残雪',
      visible: true,
    },
    {
      name: '台塑牛排',
      visible: true,
    },
    {
      name: '千串屋',
      visible: true,
    },
    {
      name: '柳浪闻莺',
      visible: true,
    },
    {
      name: '南宋御街',
      visible: true,
    },
    {
      name: '五云山',
      visible: true,
    },
    {
      name: '梅家坞',
      visible: true,
    },
    {
      name: '满觉陇',
      visible: true,
    },
    {
      name: '六和塔',
      visible: true,
    },
    {
      name: '曲院风荷',
      visible: true,
    },
    {
      name: '玉皇山',
      visible: true,
    },
    {
      name: '楼外楼',
      visible: true,
    }
  ]);
};

AppViewModel.prototype.filterLocations = function(data, evt) {
  locations = this.locations.removeAll();
  const self = this;
  locations.forEach(function(loc) {
    if (evt.target.value !== "") {
      if (loc.name.indexOf(evt.target.value) === -1) {
        loc.visible = false;
      } else {
        loc.visible = true;
      }
    } else {
      loc.visible = true;
    }
    self.locations.push(loc);
  });
};

const avm = new AppViewModel();

ko.applyBindings(avm);

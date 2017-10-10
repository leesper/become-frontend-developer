/*
This is empty on purpose! Your code to build the resume will go here.
 */

'use strict';
var bio = {
  name: '李科君',
  role: '全栈工程师',
  contacts: {
    mobile: '1234567890',
    email: '1234567890@qq.com',
    github: 'https://github.com/leesper',
    twitter: 'http://weibo.com/u/3164852485/home',
    location: 'Guiyang'
  },
  welcomeMessage: '一个很浪的全栈工程师',
  skills: ['Golang', 'Javascript', 'Python', 'R'],
  biopic: 'images/me.jpg',
  display: function() {
    var name = HTMLheaderName.replace('%data%', this.name);
    var role = HTMLheaderRole.replace('%data%', this.role);
    $('#header').prepend([
      name,
      role
    ]);
    var mobile = HTMLmobile.replace('%data%', this.contacts.mobile);
    var email = HTMLemail.replace('%data%', this.contacts.email);
    var github = HTMLgithub.replace('%data%', this.contacts.github);
    var twitter = HTMLtwitter.replace('%data%', this.contacts.twitter);
    var location = HTMLlocation.replace('%data%', this.contacts.location);
    $('#topContacts, #footerContacts').prepend([
      mobile,
      email,
      github,
      twitter,
      location
    ]);

    $('#footerContacts').find('.dark-text').attr('class', 'white-text');

    var bioPic = HTMLbioPic.replace('%data%', this.biopic);
    var welcome = HTMLwelcomeMsg.replace('%data%', this.welcomeMessage);
    $('#header').append([bioPic, welcome]);

    if (this.skills.length > 0) {
      $('#header').append([HTMLskillsStart]);
      this.skills.forEach(function(value) {
        $('#skills').append([HTMLskills.replace('%data%', value)])
      })
    }
  }
};

var education = {
  schools: [{
      name: '中国科学技术大学（USTC）',
      location: 'Su Zhou',
      degree: 'MA',
      dates: '2006-2010',
      majors: ['软件工程'],
      url: 'http://ustc.edu.cn/'
    },
    {
      name: '四川大学（SCU）',
      location: 'Chengdu',
      degree: 'BA',
      dates: '2010-2013',
      majors: ['信息安全工程'],
      url: 'http://www.scu.edu.cn/'
    }
  ],
  onlineCourses: [{
    title: '优达学城数据分析纳米学位（DAND）',
    school: 'Udacity',
    dates: '2017-2017',
    url: 'http://cn.udacity.com/dand/'
  }],
  display: function() {
    this.schools.forEach(function(school) {
      $('#education').append(HTMLschoolStart);
      var schoolName = HTMLschoolName.replace('%data%', school.name).replace('#', school.url);
      var schoolDegree = HTMLschoolDegree.replace('%data%', school.degree);
      var schoolDates = HTMLschoolDates.replace('%data%', school.dates);
      var schoolLocation = HTMLschoolLocation.replace('%data%', school.location);
      $('.education-entry:last').append([
        schoolName + schoolDegree,
        schoolDates,
        schoolLocation
      ]);
      school.majors.forEach(function(major) {
        var schoolMajor = HTMLschoolMajor.replace('%data%', major);
        $('.education-entry:last').append(schoolMajor);
      });
    });
    $('#education').append(HTMLonlineClasses);
    this.onlineCourses.forEach(function(course) {
      $('#education').append(HTMLschoolStart);
      var onlineTitle = HTMLonlineTitle.replace('%data%', course.title).replace('#', course.url);
      var onlineSchool = HTMLonlineSchool.replace('%data%', course.school);
      var onlineDates = HTMLonlineDates.replace('%data%', course.dates);
      var onlineURL = HTMLonlineURL.replace('%data%', course.url).replace('#', course.url);
      $('.education-entry:last').append([
        onlineTitle + onlineSchool,
        onlineDates,
        onlineURL
      ]);
    });
  }
};

var work = {
  jobs: [{
      employer: 'M2MKey',
      title: 'Go语言服务器开发工程师',
      location: 'Guiyang',
      dates: '2016-now',
      description: '负责业务开发和维护智能硬件设备服务器'
    },
    {
      employer: 'Electronic Soul',
      title: 'Java手游服务器开发工程师',
      location: 'Hang Zhou',
      dates: '2015',
      description: '负责梦三国MOBA手游的服务器开发，维护多个核心系统'
    },
    {
      employer: 'YY.com',
      title: 'C++ Server Development Engineer',
      location: 'Guang Zhou',
      dates: '2013-2014',
      description: 'YY娱乐事业部C++服务器开发工程师，数据统计小组'
    }
  ],
  display: function() {
    this.jobs.forEach(function(value) {
      $('#workExperience').append(HTMLworkStart);
      var employer = HTMLworkEmployer.replace('%data%', value.employer);
      var title = HTMLworkTitle.replace('%data%', value.title);
      var dates = HTMLworkDates.replace('%data%', value.dates);
      var location = HTMLworkLocation.replace('%data%', value.location);
      var description = HTMLworkDescription.replace('%data%', value.description);
      $('.work-entry:last').append([
        employer + title,
        dates,
        location,
        description
      ]);
    });
  }
};

var projects = {
  projects: [{
      title: 'Tao 框架',
      dates: 'Apr 17, 2016 – Oct 8, 2017',
      description: 'Go语言实现的轻量级TCP网络编程框架，可用于连接智能设备终端',
      images: ['images/tao.png'],
      url: 'https://github.com/leesper/tao'
    },
    {
      title: 'go_rng',
      dates: 'Mar 23, 2014 – Oct 8, 2017',
      description: 'Go语言实现的伪随机数生成器库，支持10多种概率分布',
      images: ['images/rng.png'],
      url: 'https://github.com/leesper/go_rng'
    },
    {
      title: 'CouchDB-Golang',
      dates: 'Dec 4, 2016 – Oct 8, 2017',
      description: '专为CouchDB 2.x量身打造的Go语言库，支持将Go条件表达式转换成JSON query string',
      images: ['images/couchdb.png'],
      url: 'https://github.com/leesper/couchdb-golang'
    },
    {
      title: 'Data Analyst Nanodegree',
      dates: 'Mar 26, 2017 – Oct 8, 2017',
      description: 'Udacity 数据分析纳米学位项目，包含入门和进阶两个部分',
      images: ['images/dand1.jpg', 'images/dand2.jpg'],
      url: 'https://github.com/leesper/become-data-analyst'
    },
    {
      title: 'holmes',
      dates: 'Jul 3, 2016 – Oct 8, 2017',
      description: 'Go语言日志库',
      images: ['images/holmes.png'],
      url: 'https://github.com/leesper/holmes'
    }
  ],
  display: function() {
    this.projects.forEach(function(val) {
      $('#projects').append(HTMLprojectStart);
      var title = HTMLprojectTitle.replace('%data%', val.title).replace('#', val.url);
      var dates = HTMLprojectDates.replace('%data%', val.dates);
      var description = HTMLprojectDescription.replace('%data%', val.description);
      $('.project-entry:last').append([
        title,
        dates,
        description
      ]);
      val.images.forEach(function(imgsrc) {
        $('.project-entry:last').append(HTMLprojectImage.replace('%data%', imgsrc));
      });
    });
  }
};

bio.display();
work.display();
projects.display();
education.display();

$('#mapDiv').append(googleMap);

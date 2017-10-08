/*
This is empty on purpose! Your code to build the resume will go here.
 */

var work = {
  jobs: [
    {
      employer: 'M2MKey',
      title: 'Golang Server Development Engineer',
      location: 'Guiyang',
      dates: '2016-now',
      description: 'Server engineer for intelligent embedded devices'
    },
    {
      employer: 'Electronic Soul',
      title: 'Java Server Development Engineer',
      location: 'Hang Zhou',
      dates: '2015',
      description: 'Server engineer for a MOBA mobile game'
    },
    {
      employer: 'YY.com',
      title: 'C++ Server Development Engineer',
      location: 'Guang Zhou',
      dates: '2013-2014',
      description: 'Server engineer in YY Music Live'
    }
  ]
};

var projects = {
  projects: [
    {
      title: 'TAO Framework',
      dates: 'Apr 17, 2016 – Oct 8, 2017',
      description: 'Light-weight TCP Asynchronous Golang Framework',
      images: []
    },
    {
      title: 'go_rng',
      dates: 'Mar 23, 2014 – Oct 8, 2017',
      description: 'A pseudo-random number generator wriiten in Golang',
      images: []
    },
    {
      title: 'CouchDB-Golang',
      dates: 'Dec 4, 2016 – Oct 8, 2017',
      description: 'A Golang library for working with CouchDB 2.x',
      images: []
    },
    {
      title: 'Data Analyst Nanodegree',
      dates: 'Mar 26, 2017 – Oct 8, 2017',
      description: 'Udacity 数据分析纳米学位项目',
      images: []
    },
    {
      title: 'holmes',
      dates: 'Jul 3, 2016 – Oct 8, 2017',
      description: 'Golang logging package',
      images: []
    }
  ]
};

var bio = {
  name: '李科君',
  role: '全栈工程师',
  contacts: {
    blog: 'http://www.jianshu.com/u/10d26e0194c7',
    mobile: '18685118912',
    email: '394683518@qq.com',
    github: 'https://github.com/leesper',
    twitter: 'http://weibo.com/u/3164852485/home',
    location: 'Guiyang'
  },
  welcomeMessage: '一个很浪的全栈工程师',
  skills: ['Golang', 'Javascript', 'Python', 'R'],
  biopic: 'images/fry.jpg'
};

var education = {
  schools: [
    {
      name: 'University of Science and Technology of China',
      location: 'Su Zhou',
      degree: 'MA',
      dates: '2006-2010',
      url: 'http://ustc.edu.cn/',
      majors: ['Software Engineering']
    },
    {
      name: 'Sichuan University',
      location: 'Chengdu',
      degree: 'BA',
      dates: '2010-2013',
      url: 'http://www.scu.edu.cn/',
      majors: ['Information Security Engineering']
    }
  ]
};

var formattedName = HTMLheaderName.replace('%data%', bio.name);
var formattedRole = HTMLheaderRole.replace('%data%', bio.role);
$('#header').prepend([formattedName, formattedRole]);

if (bio.skills.length > 0) {
  $('#header').append([HTMLskillsStart]);
  bio.skills.forEach(function(value) {
    $('#skills').append([HTMLskills.replace('%data%', value)])
  })
}

function displayWork() {
  work.jobs.forEach(function(value) {
    $('#workExperience').append(HTMLworkStart);
    var formattedEmployer = HTMLworkEmployer.replace('%data%', value.employer);
    var formattedTitle = HTMLworkTitle.replace('%data%', value.title);
    var formattedDates = HTMLworkDates.replace('%data%', value.dates);
    var formattedLocation = HTMLworkLocation.replace('%data%', value.location);
    var formatedDescription = HTMLworkDescription.replace('%data%', value.description);
    $('.work-entry:last').append([formattedEmployer + formattedTitle,
      formattedDates, formattedLocation, formatedDescription]);
  });
}

displayWork();

projects.display = function() {
  projects.projects.forEach(function(val) {
    $('#projects').append(HTMLprojectStart);
    var formattedTitle = HTMLprojectTitle.replace('%data%', val.title);
    var formattedDates = HTMLprojectDates.replace('%data%', val.dates);
    var formattedDescription = HTMLprojectDescription.replace('%data%', val.description);
    $('.project-entry:last').append([formattedTitle, formattedDates, formattedDescription]);
    val.images.forEach(function(imgsrc) {
      $('.project-entry:last').append(HTMLprojectImage.replace('%data%', imgsrc));
    });
  });
}

projects.display();

$('#mapDiv').append(googleMap);

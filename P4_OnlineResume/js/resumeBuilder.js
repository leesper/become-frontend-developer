/*
This is empty on purpose! Your code to build the resume will go here.
 */
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
    var name = HTMLheaderName.replace('%data%', bio.name);
    var role = HTMLheaderRole.replace('%data%', bio.role);
    $('#header').prepend([
      name,
      role
    ]);
    var mobile = HTMLmobile.replace('%data%', bio.contacts.mobile);
    var email = HTMLemail.replace('%data%', bio.contacts.email);
    var github = HTMLgithub.replace('%data%', bio.contacts.github);
    var twitter = HTMLtwitter.replace('%data%', bio.contacts.twitter);
    var location = HTMLlocation.replace('%data%', bio.contacts.location);
    $('#topContacts').prepend([
      mobile,
      email,
      github,
      twitter,
      location
    ]);

    $('#footerContacts').prepend([
      mobile,
      email,
      github,
      twitter,
      location
    ]);

    var bioPic = HTMLbioPic.replace('%data%', bio.biopic);
    var welcome = HTMLwelcomeMsg.replace('%data%', bio.welcomeMessage);
    $('#header').append([bioPic, welcome]);

    if (bio.skills.length > 0) {
      $('#header').append([HTMLskillsStart]);
      bio.skills.forEach(function(value) {
        $('#skills').append([HTMLskills.replace('%data%', value)])
      })
    }
  }
};

var education = {
  schools: [
    {
      name: 'University of Science and Technology of China',
      location: 'Su Zhou',
      degree: 'MA',
      dates: '2006-2010',
      majors: ['Software Engineering'],
      url: 'http://ustc.edu.cn/'
    },
    {
      name: 'Sichuan University',
      location: 'Chengdu',
      degree: 'BA',
      dates: '2010-2013',
      majors: ['Information Security Engineering'],
      url: 'http://www.scu.edu.cn/'
    }
  ],
  onlineCourses: [
    {
      title: 'Udacity Data Analyst Nanodegree',
      school: 'Udacity',
      dates: '2017-2017',
      url: 'http://cn.udacity.com/dand/'
    }
  ],
  display: function() {
    education.schools.forEach(function(school) {
      $('#education').append(HTMLschoolStart);
      var schoolName = HTMLschoolName.replace('%data%', school.name);
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
    education.onlineCourses.forEach(function(course) {
      $('#education').append(HTMLschoolStart);
      var onlineTitle = HTMLonlineTitle.replace('%data%', course.title);
      var onlineSchool = HTMLonlineSchool.replace('%data%', course.school);
      var onlineDates = HTMLonlineDates.replace('%data%', course.dates);
      var onlineURL = HTMLonlineURL.replace('%data%', course.url);
      $('.education-entry:last').append([
        onlineTitle + onlineSchool,
        onlineDates,
        onlineURL
      ]);
    });
  }
};

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
  ],
  display: function() {
    work.jobs.forEach(function(value) {
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
  projects: [
    {
      title: 'TAO Framework',
      dates: 'Apr 17, 2016 – Oct 8, 2017',
      description: 'Light-weight TCP Asynchronous Golang Framework',
      images: ['images/tao.png']
    },
    {
      title: 'go_rng',
      dates: 'Mar 23, 2014 – Oct 8, 2017',
      description: 'A pseudo-random number generator wriiten in Golang',
      images: ['images/rng.png']
    },
    {
      title: 'CouchDB-Golang',
      dates: 'Dec 4, 2016 – Oct 8, 2017',
      description: 'A Golang library for working with CouchDB 2.x',
      images: ['images/couchdb.png']
    },
    {
      title: 'Data Analyst Nanodegree',
      dates: 'Mar 26, 2017 – Oct 8, 2017',
      description: 'Udacity 数据分析纳米学位项目',
      images: ['images/dand1.jpg', 'images/dand2.jpg']
    },
    {
      title: 'holmes',
      dates: 'Jul 3, 2016 – Oct 8, 2017',
      description: 'Golang logging package',
      images: ['images/holmes.png']
    }
  ],
  display: function() {
    projects.projects.forEach(function(val) {
      $('#projects').append(HTMLprojectStart);
      var title = HTMLprojectTitle.replace('%data%', val.title);
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

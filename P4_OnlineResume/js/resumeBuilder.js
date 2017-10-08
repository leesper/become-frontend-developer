/*
This is empty on purpose! Your code to build the resume will go here.
 */

var bio = {
  name: '李科君',
  role: '全栈工程师',
  contacts: {
    mobile: '18685118912',
    email: '394683518@qq.com',
    twitter: 'http://weibo.com/u/3164852485/home',
    github: 'https://github.com/leesper',
    blog: 'http://www.jianshu.com/u/10d26e0194c7'
  },
  welcomeMessage: '一个很浪的全栈工程师',
  skills: ['Golang', 'Javascript', 'Python', 'R', 'Statistics'],
  bioPic: 'images/fry.jpg'
};

var work = {}
work.position = 'Server Development Engineer';
work.employer = 'M2MKey';
work.years = 2;
work.city = 'Guiyang, Gui Zhou Province, China';

var education = {}
education['name'] = 'University of Science and Technology of China';
education['years'] = "2010-2012";
education['city'] = 'Hefei, An Hui Province, China';

var formattedName = HTMLheaderName.replace('%data%', bio.name);
var formattedRole = HTMLheaderRole.replace('%data%', bio.role);
var formattedMobile = HTMLmobile.replace('%data%', bio.contacts.mobile);
var formattedEmail = HTMLemail.replace('%data%', bio.contacts.email);
var formattedTwitter = HTMLtwitter.replace('%data%', bio.contacts.twitter);
var formattedGithub = HTMLgithub.replace('%data%', bio.contacts.github);
var formattedBlog = HTMLblog.replace('%data%', bio.contacts.blog);
var formattedWelcome = HTMLwelcomeMsg.replace('%data%', bio.welcomeMessage);

$('#header').prepend([formattedName, formattedRole, formattedMobile,
  formattedEmail, formattedTwitter, formattedGithub, formattedBlog]);

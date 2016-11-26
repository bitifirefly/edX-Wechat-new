const request = require('request');

module.exports = (app, UserModel) => {
  app.get('/', (req, res) => {
    const page = ~~req.query.page || 1;
    const lastPage = page === 1 ? page : page - 1;
    const nextPage = page + 1;
    const url = 'http://x.edustack.org/api/courses/v1/courses/?page=' + page;

    request.get(url, (err, response, body) => {
      if(!err && response.statusCode == 200) {
        const courses = JSON.parse(body).results;
        
        res.render('find_courses', {
          title: '发现课程',
          courses: courses,
          lastPage: lastPage,
          nextPage: nextPage
        });
      }
    });

    

    /*var promise = UserModel.findOne({name: 'baihang'}).exec();
    promise.then(user => {
      if (user) {
        console.log('login success', user);
        res.redirect('/my_courses');
        return;
      } else {
        console.log('login null', user);
        var newUser = new UserModel({name: 'baihang', age: 33});
        return Promise.resolve(newUser.save());
      }
    }).then(user => {
      if (user) {
        console.log('create success', user);
        return res.redirect('/settings');
      }
    }).catch(err => {
      console.log('login error', err);
    });*/
  });
};

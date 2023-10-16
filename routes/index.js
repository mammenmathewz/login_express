var express = require('express');
var router = express.Router();
const session = require('express-session')
const cookieParser = require('cookie-parser')


router.use(cookieParser())
router.use(session({
  secret: 'key that will sign cookie',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 24 * 60 * 60 * 1000 
  }
}))

router.use((req, res, next) => {
  res.set('Cache-Control', 'no-store')
  next()
})

router.use(express.json())

router.use(express.urlencoded({extended: true }))

function checkAuthenticated(req, res, next) {
  if (req.session.user) {
    next();
  } else {
    res.redirect('/');
  }
}
//DataBase///////////////////////////
const emailDb="mammen999@gmail.com"//
const passwordDb="1234"            //
/////////////////////////////////////

/* GET home page. */
router.get('/', (req, res, next)=> {
  if (req.session.user) {
    res.redirect('/home');
  } else {
    res.render('index');
  }
});

router.post('/login',(req,res,next)=>{
  
  const {email,password}=req.body 
  if (email===emailDb && password===passwordDb) { 
     req.session.user=req.body.email
     res.redirect('home')
     
  }else{  
   res.render('index', { message: 'Invalid username or password' })
  }
})

router.get('/home', checkAuthenticated, (req, res, next)=> {
  res.render('home');
});


router.get('/logout',(req,res,next)=>{
  req.session.destroy((err)=>{
if (err) {
  console.log(err)
  next(err);
}else{
  res.redirect('/')   
}
  })
})

router.get('/log',(req,res)=>{
 res.render('newpage')
})


module.exports = router;
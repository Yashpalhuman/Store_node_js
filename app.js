const path=require('path');
const express =require('express');
const bodyParser=require('body-parser');
const mongoose=require('mongoose');
const session =require('express-session');
const MongoDBStore=require('connect-mongodb-session')(session);
// const {expresshbs}=require('express-handlebars');
const PageNotFoundController=require('./controller/error');
// const mongoConnect=require('./util/database').mongoConnect;
const User=require('./models/user');

const MONGODB_URI='mongodb+srv://yashpalchoudhary967:isek0sAaNjKHsYr9@cluster0.3c99yvy.mongodb.net/shop?retryWrites=true&w=majority';

const app=express();
const store=new MongoDBStore({
    uri:MONGODB_URI,
    collection:'sessions'
});

// app.engine('handlebars',expresshbs());
app.set('view engine','ejs');
app.set('views','./views');
 
const adminRoutes=require('./routes/admin');
const shopRoutes=require('./routes/shop');
const authRoutes=require('./routes/auth');





app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname,'public')));
app.use(
    session({secret:'my secret',resave:false,saveUninitialized:false,store:store})
);

app.use((req,res,next)=>{
    if(!req.session.user){
        return next();
    }
    User.findById(req.session.user._id)
    .then(user=>{
        req.user=user;
        next();
      })
      .catch(err=>console.log(err));
})

// app.use((req,res,next)=>{
//     User.findById('653d87d4e85026a28f65cc0c').then(user=>{
//         req.user=user;
//         next();
//     }).catch(err=>console.log(err));
// });

app.use('/admin',adminRoutes.routes);
app.use(shopRoutes);
app.use(authRoutes);


app.use(PageNotFoundController.pageNotFound);

mongoose.connect(
    MONGODB_URI
    )
    .then(result=>{
        User.findOne().then(user=>{
            if(!user){

                const user=new User({
                    name:'Max',
                    email:'max@test.com',
                    cart:{
                        items:[]
                    }
                });
                user.save();
            }
        })
        app.listen(3000);
    })
    .catch(err=>{console.log(err)});


const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const adminRoutes = require('./routes/admin');
const userRoutes = require('./routes/shop');
const path = require('path');
const errors = require('./controllers/errors');

const sequelize = require('./utility/database');

const Category = require('./models/category');
const Product = require('./models/product');
const User = require('./models/user');
const Cart = require('./models/cart');
const CartItem = require('./models/cartItem');
const Order = require('./models/order');
const OrderItem = require('./models/orderItem');



//middleware-----------------------------------

app.set('view engine','pug');
app.set('views',path.join(__dirname, 'views'));




//app.use('/css',express.static(path.join(__dirname,'node_modules','bootstrap','dist','css'))); 

app.use(bodyParser.urlencoded({extended:false})); //form ile gönderilen bilgiyi alırken parse ediyor 

//static dosya
app.use(express.static(path.join(__dirname,'public')));

app.use((req,res,next) =>{
    User.findByPk(1)
        .then((user) => {
            req.user = user;
            next();
            
        }).catch((err) => {
            console.log(err);
            
            
        });
})

//routes
app.use('/admin',adminRoutes.routes); //admin için yapılan bütün route işlemleri burda devereye giriyor   
app.use(userRoutes); // user için route işlemleri burda devreye giriyor !sıralama önemli




//404 sayfası --- hiç bir route içine girmeyince buraya girmiş olacak bu sebeple en altta olması gerekiyor
app.use(errors.get404);

Product.belongsTo(Category,{foreignKey:{allowNull:false}});
Category.hasMany(Product);

Product.belongsTo(User);
User.hasMany(Product);


User.hasOne(Cart);
Cart.belongsTo(User);


Cart.belongsToMany(Product,{through:CartItem});
Product.belongsToMany(Cart,{through:CartItem});


Order.belongsTo(User);
User.hasMany(Order);

Order.belongsToMany(Product,{through:OrderItem});
Product.belongsToMany(Order,{through:OrderItem});


let _user;
sequelize
    //.sync({force:true})
    .sync()
    .then(() => {
        User.findByPk(1)
            .then((user) => {
                if(!user){
                    return User.create({
                        name:'HuseyinOzdemir',
                        email:'email@gmail.com'
                    })
                }
                return user
             }).then(user => {
                _user = user;
                return user.getCart();
             }).then(cart =>{
                if(!cart){
                    return _user.createCart();
                }
                return cart

             }).then(() =>{
                Category.count()
                .then( count =>{ 
                    if(count ===0){ 
      
                        Category.bulkCreate([
                            {name:'Telefon', description:'Telefon kategorisi'},
                            {name:'Bilgisayar', description:'Bilgisayar kategorisi'},
                            {name:'Elektronik',description:'Elektronik kategorisi'}
                
                        ]);                    
                    }
                });  
             })

  

        
    }).catch((err) => {
       console.log(err);
        
    });

/* app.use('/',(req,res,next) =>{ //özelden genele doğru kod yazmalı / hepsi için geçerli aksi takdirde
    console.log('loglama yapıldı')
    next();
});
 */

/* app.use('/product-list',(req,res,next) =>{
    res.send('<h1>  product list  </h1>')
}); */







//get fonksiyonu
/* app.get('/',(req,res) =>{
    res.send('hello world');

});
app.get('/api/products',(req,res) =>{
    res.send('Ürün listesi');

});
 */



// dinleme portu
app.listen(3000,() =>{
    console.log('listening on port 3000')
});
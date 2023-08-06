const Product = require('../models/product');
const Category = require('../models/category');




exports.getProducts = (req, res, next) => { // burdaki / dinamik çalışır / ile başlayan bütün pathler bu fonksiyona girer eğer about gibi özel belirtilmediyse 
    Product.findAll()
        .then((products) => {
        res.render('admin/products', {
            title: 'Admin Products',
            products: products,
            path: '/admin/products',
            action: req.query.action

        });


    }).catch((err) => {
        console.log(err);

    });

}

exports.getAddProducts = (req, res, next) => { // app.get sadece get request alır
    //res.sendFile(path.join(__dirname,'../','views','add-product.html'))


    Category.findAll()
    .then((categories) => {
        res.render('admin/add-product',
        {
            title: 'New Product',
            path: '/admin/add-product',
            categories :categories

        });

    }).catch((err) => {
        console.log('category error')

    });
 
}

exports.postAddProducts = (req, res, next) => {   // sadece post requestte çalışması için app.post


    const name = req.body.name;
    const price = req.body.price;
    const image = req.body.image;
    const description = req.body.description;
    const categoryid = req.body.categoryid;
    const user= req.user;

    user.createProduct({
        name: name,
        price: price,
        image: image,
        description: description,
        categoryId:categoryid,


    })
        .then((result) => {
            res.redirect('/');

        }).catch((err) => {
            console.log(err);

        });

}

exports.getEditProducts = (req, res, next) => { // app.get sadece get request alır
    //res.sendFile(path.join(__dirname,'../','views','add-product.html'))
    Product.findByPk(req.params.productid)
        .then((product) => {
            if(!product){
                return res.redirect('/');
            }

            Category.findAll()
                .then((categories) => {
                    res.render('admin/edit-product',
                        {
                            title: 'Edit Product',
                            path: '/admin/products',
                            product: product,
                            categories: categories

                        });
                }).catch((err) => {
                    console.log('category error')

                });


        }).catch((err) => {
            console.log(err);

        });



}

exports.postEditProducts = (req, res, next) => {   // sadece post requestte çalışması için app.post
    
    const id = req.body.id;
    const name = req.body.name;
    const price = req.body.price;
    const image = req.body.image;
    const description = req.body.description;
    const categoryid = req.body.categoryid;

    Product.findByPk(id)
        .then((product) => {
            product.name = name;
            product.price = price;
            product.image = image;
            product.description = description;
            product.categoryId = categoryid;
            return product.save()


        })
        .then(result =>{
            console.log('updated');
            res.redirect('/admin/products?action=edit');
        })
        .catch((err) => {
            console.log('error when updated');

        });



}
exports.postDeleteProduct = (req, res, next) => {
    id = req.body.productid
    Product.destroy({where:{id:id}})
        .then((result) => {
            res.redirect('/admin/products?action=delete');
            
        }).catch((err) => {
            console.log("error when deleting");
            
        });

};
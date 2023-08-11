const express = require('express');
const { body, validationResult } = require('express-validator');
const bodyParser = require('body-parser')
const path = require('path');
const app = express();
const port = 3000;
const { getStores, getProducts, postProduct } = require('./api');
const token = '27171f60448a3bd7ebc8ccd346ea6f';

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())


const home = async (req, res) => {
    const stores = await getStores( token );
    const products = await getProducts( token );
    res.render('index', { title: 'Store', stores: stores.data, products: products.data });
}

const postProducts = async(req, res) => {

    //Validate parameters
    const errors = validationResult( req );
    if( !errors.isEmpty() ) {
        const errorMsg = `Wrong parameters: ${ JSON.stringify( errors ) }`
	    console.error( errorMsg );
		return res.status(400).json( { message:'Some parameters are missing!.', errors :errors.array() });
	}
    const { store : store, name : name, description: description, price : price } = req.body;
    
    // Add product validation
    if(  ! name.match(/[A-Z0-9]+\s[-]\s[a-zA-Z0-9\s]*\s[-]\s[0-9]+/)) {
        res.send({error: 'Product Name does not match the format'})
      }
    console.log(req.body);

    // Create new product
    product =  await postProduct(req.body, token);

    res.redirect('/');
}

// Home route
app.get('/', home);

// Post route (redirects to home)
app.post('/', 
[
    body( 'store',        'Store is missing!' ).not().isEmpty(),
    body( 'name' ,        'Name is missing!' ).not().isEmpty(),
    body( 'description' , 'Description is missing!' ).not().isEmpty(),
	body( 'price',        'Price is missing!' ).not().isEmpty(),
],
postProducts);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

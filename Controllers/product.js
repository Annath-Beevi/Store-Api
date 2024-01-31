const Product = require('../Models/product')

const getAllProductsStatic = async (req, res, next) => {
    // const product = await Product.find({featured: true});
    // res.status(200).json({product, nbHits: product.length})
    
    const products = await Product.find({price : {$gt : 40}}).sort("price")
    res.status(200).json({ products, nbHits: products.length})
  };
  
  const getAllProducts = async (req, res) => {
    const {featured, name, company, sort, select, numericFilters} = req.query;
    const queryObject = {};
   

    if(featured) {
        queryObject.featured = featured === "true" ? true : false;
    }
    if(name) {
      queryObject.name = { $regex: name, $options: "i"}  ;
    }
    if(company) {
      queryObject.company = { $regex: company, $options: "i"} ;
    }
    console.log(queryObject)

    if(numericFilters){
      const operatorMap = {
        ">" : "$gt",
        "<" : "$lt",
        "=" : "$eq",
        ">=" : "$gte",
        "<=" : "$lte"
      };
      const regEx = /\b(<|>|=|<=|>=)\b/g;
      let filters = numericFilters.replace(regEx, (match) => `-${operatorMap[match]}-`);
      console.log(filters)
      
      const options = ["price", "rating"];

      filters = filters.split(",").forEach((item) => {
        const [field, operator, value] = item.split("-");

        if(options.includes(field)){
          queryObject[field] = {[operator] : Number(value) }  //{price : {$gt : 40}}
        }
      });

    }

    let product = Product.find(queryObject)

    if(sort){
      const sortList = sort.split(",").join(" ")

      product = product.sort(sortList)
    }

    if(select){
      const selectedlist = select.split(",").join(" ")

      product = product.select(selectedlist)
    }

    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 10
    const skip = (page - 1) * 10
    product = product.limit(limit).skip(skip)

    const products = await product
    res.status(200).json({products, nbHits: products.length})
  };
  
  module.exports = {
    getAllProducts,
    getAllProductsStatic
  }

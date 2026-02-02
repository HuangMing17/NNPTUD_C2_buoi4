var express = require('express');
var router = express.Router();
let data = [{ "id": 3, "title": "Classic Heather Gray Hoodie", "slug": "classic-heather-gray-hoodie", "price": 69, "description": "Stay cozy and stylish with our Classic Heather Gray Hoodie. Crafted from soft, durable fabric, it features a kangaroo pocket, adjustable drawstring hood, and ribbed cuffs. Perfect for a casual day out or a relaxing evening in, this hoodie is a versatile addition to any wardrobe.", "category": { "id": 1, "name": "Clothes", "slug": "clothes", "image": "https://i.imgur.com/QkIa5tT.jpeg", "creationAt": "2026-02-01T19:28:25.000Z", "updatedAt": "2026-02-01T19:28:25.000Z" }, "images": ["https://i.imgur.com/cHddUCu.jpeg", "https://i.imgur.com/CFOjAgK.jpeg", "https://i.imgur.com/wbIMMme.jpeg"], "creationAt": "2026-02-01T19:28:25.000Z", "updatedAt": "2026-02-01T19:28:25.000Z" }, { "id": 6, "title": "Classic Comfort Fit Joggers", "slug": "classic-comfort-fit-joggers", "price": 25, "description": "Discover the perfect blend of style and comfort with our Classic Comfort Fit Joggers. These versatile black joggers feature a soft elastic waistband with an adjustable drawstring, two side pockets, and ribbed ankle cuffs for a secure fit. Made from a lightweight and durable fabric, they are ideal for both active days and relaxed lounging.", "category": { "id": 1, "name": "Clothes", "slug": "clothes", "image": "https://i.imgur.com/QkIa5tT.jpeg", "creationAt": "2026-02-01T19:28:25.000Z", "updatedAt": "2026-02-01T19:28:25.000Z" }, "images": ["https://i.imgur.com/ZKGofuB.jpeg", "https://i.imgur.com/GJi73H0.jpeg", "https://i.imgur.com/633Fqrz.jpeg"], "creationAt": "2026-02-01T19:28:25.000Z", "updatedAt": "2026-02-01T19:28:25.000Z" }, { "id": 7, "title": "Classic Comfort Drawstring Joggers", "slug": "classic-comfort-drawstring-joggers", "price": 79, "description": "Experience the perfect blend of comfort and style with our Classic Comfort Drawstring Joggers. Designed for a relaxed fit, these joggers feature a soft, stretchable fabric, convenient side pockets, and an adjustable drawstring waist with a casual tied look. Ideal for lounging or running errands, these joggers will quickly become your go-to for effortless, laid-back days.", "category": { "id": 1, "name": "Clothes", "slug": "clothes", "image": "https://i.imgur.com/QkIa5tT.jpeg", "creationAt": "2026-02-01T19:28:25.000Z", "updatedAt": "2026-02-01T19:28:25.000Z" }, "images": ["https://i.imgur.com/mp3rUty.jpeg", "https://i.imgur.com/JQRGIc2.jpeg"], "creationAt": "2026-02-01T19:28:25.000Z", "updatedAt": "2026-02-01T19:28:25.000Z" }];

/* GET /api/v1/products - Get all products with filtering */
router.get('/', function(req, res, next) {
  try {
    const { title, maxPrice, minPrice, slug } = req.query;
    
    let filteredData = [...data];
    
    // Filter by title (includes - case insensitive)
    if (title) {
      filteredData = filteredData.filter(product => 
        product.title.toLowerCase().includes(title.toLowerCase())
      );
    }
    
    // Filter by slug (exact match)
    if (slug) {
      filteredData = filteredData.filter(product => 
        product.slug === slug
      );
    }
    
    // Filter by minPrice
    if (minPrice) {
      const min = parseFloat(minPrice);
      if (!isNaN(min)) {
        filteredData = filteredData.filter(product => 
          product.price >= min
        );
      }
    }
    
    // Filter by maxPrice
    if (maxPrice) {
      const max = parseFloat(maxPrice);
      if (!isNaN(max)) {
        filteredData = filteredData.filter(product => 
          product.price <= max
        );
      }
    }
    
    res.json({
      success: true,
      count: filteredData.length,
      data: filteredData
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

/* GET /api/v1/products/:id - Get product by ID */
router.get('/:id', function(req, res, next) {
  try {
    const productId = parseInt(req.params.id);
    
    if (isNaN(productId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid product ID'
      });
    }
    
    const product = data.find(p => p.id === productId);
    
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }
    
    res.json({
      success: true,
      data: product
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

module.exports = router;

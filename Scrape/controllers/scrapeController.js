const { scrapeAmazonProduct } = require("../utils/scrapeAmazonProduct");

const getGift = async (req, res) => {
  let { color,gender } = req.query;
  const randomProducts = ["Shoes", "Shirt", "Purse", "Bottle", "WristWatch", "Dress", "Bags"];

  const productNumber = Math.floor(Math.random() * randomProducts.length);
  const product=randomProducts[productNumber]
  const translateGender = ''
  if (gender==='Male'){
    translateGender == 'men'
  }
  else{
    translateGender == 'women'
  }
  try {
    if (color !== undefined) {
    
      const searchQuery = product + " " + color + "for " + gender;

      const productsArray = await scrapeAmazonProduct(searchQuery);
      let urls = {
        url1: productsArray[productsArray.length-3].url,
        url2: productsArray[productsArray.length-2].url,
        url3: productsArray[productsArray.length-1].url,
      };
      
      return res.status(200).json(urls);
    }

    return res.status(200).json({ data: "No params selected yet" });
  } catch (error) {
    console.error("An error occurred:", error);
    return res.status(500).json({ error: "this is Internal server error" });
  }
};

module.exports = { getGift };

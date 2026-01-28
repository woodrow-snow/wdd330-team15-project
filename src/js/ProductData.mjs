const baseURl = import.meta.env.VITE_SERVER_URL;


function convertToJson(res) {
  // used to convert data to a json format
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

export default class ProductData {
  constructor() {
  }

  async getData(category) {
    try {
      const response = await fetch(`${baseURl}products/search/${category}`);
      const data = await convertToJson(response);
      return data.Result;
    } catch (error) {
      console.error(error);
    }
  }

  async findProductById(id) {
    const product = await fetch(`${baseURl}product/${id}`);
    const data = await convertToJson(product);
    console.log(data);
    return data.Result;
  }  
}

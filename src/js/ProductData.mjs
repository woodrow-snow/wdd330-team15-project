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
  constructor() {}
  async getData(category) {
    const response = await fetch(`${baseURl}products/search/${category}`);
    const data = await convertToJson(response);
    return data.Result;
  }

  async findProductById(id) {
    const products = await this.getData(`${baseURl}products/${id}`);
    return products.find((item) => item.Id === id);
  }
}

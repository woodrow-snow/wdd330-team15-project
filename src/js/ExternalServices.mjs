const baseURl = import.meta.env.VITE_SERVER_URL;

function convertToJson(res) {
  // used to convert data to a json format
  let resJson = res.json();

  if (res.ok) {
    return resJson;
  } else {
    throw { name: 'servicesError', message: resJson}
  }
}

export default class ExternalServices {
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

  async checkout(cartInfo) {
    console.log(cartInfo);

    // creating options for post
    const options = {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(cartInfo)
    }

    return await fetch(`${baseURl}checkout/`, options).then(convertToJson);
  }
}

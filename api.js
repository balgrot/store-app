const axios = require('axios');

const getStores = async ( token ) => {
    
    var endpointUrl = 'https://shop.interconnecta.dev/api/stores'

    const config = {
        method: 'GET',
        url: endpointUrl,
        headers: {
            'Authtoken': token,
        }
    }

    return axios( config )
        .then( resp => {
            dataRes = resp.data.data;
            return {
                data    : dataRes
            }
        })
        .catch(error => {
            console.log(error);
        });
}

const getProducts = async ( token ) => {
    var endpointUrl = "https://shop.interconnecta.dev/api/products";

    const config = {
        method: 'GET',
        url: endpointUrl,
        headers: {
            'Content-Type' : 'application/json',
            'Authtoken': token,
        }

    }

    return axios( config )
        .then( resp => {
            dataRes = resp.data.data;
            return {
                data    : dataRes
            }
        })
        .catch(error => {
            console.log(error);
        });
}

const postProduct = async ( recordData, token) => {
    
    var endpointUrl = 'https://shop.interconnecta.dev/api/products'

    const config = {
        method: 'POST',
        url: endpointUrl,
        data: recordData,
        headers: {
            'Content-Type' : 'application/json',
            'Authtoken': token,
        }
    }

    return axios( config )
        .then( resp => {
            dataRes = resp.data.data;
            return {
                data    : dataRes
            }
        })
        .catch(error => {
            console.log(error);
        });
}

module.exports = { getStores, getProducts, postProduct };
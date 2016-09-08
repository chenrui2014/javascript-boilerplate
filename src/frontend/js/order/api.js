/* globals API_URL */
import fetchFactory from '../../../common-client/fetch/fetch';

export const fetchOrders = fetchFactory('orders');
export const fetchOrder = fetchFactory('orders');

export const fetchNewOrder = (products, jwt) => fetch(`${API_URL}/orders`, {
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json; charset=utf-8',
        Authorization: jwt,
    },
    // Allows API to set http-only cookies with AJAX calls
    // @see http://www.redotheweb.com/2015/11/09/api-security.html
    credentials: 'include',
    method: 'POST',
    body: JSON.stringify({
        products,
    }),
})
.then(response => {
    if (!response.ok) {
        return response.text().then(result => Promise.reject(new Error(result)));
    }

    return response.json();
})
.then(json => ({ order: json }))
.catch(error => ({ error }));

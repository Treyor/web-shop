export const defaultState = {
    products: {
        items: [],
        categories: [],
        isFetching: true,
        currentCategory: '',
        currentProduct: '',
        searchQuery: ''
    },
    auth: {
        currentUser: {},
    },
    cart: {
        cart: []
    }
}
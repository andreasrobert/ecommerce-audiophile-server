## audiophile - server side
[![Netlify Status](https://api.netlify.com/api/v1/badges/b9f4cc97-5eca-4276-9ac3-49b412365ca7/deploy-status)](https://app.netlify.com/sites/ecommerce-audiophile/deploys)

[ecommerce-audiophile.netlify.app](https://ecommerce-audiophile.netlify.app/)

See also the [client side](https://github.com/andreasrobert/ecommerce-audiophile-client)

This website has an admin page which fetch to the backend for authentication, just go to /admin. Although the admin page isn't really polished yet.
The list of products and its detail are stored at mongoDB while the images are stored at claudinary. To fetch the data I used graphql.
When a user add a product to the cart it will be stored to the local storage which then is used by the react state so the user can see his/her cart.
When a user click payment button the user data will be stored to the database.(don't worry you don't have to pay anything or even fill the checkout form with valid data :) this is just a demo project)

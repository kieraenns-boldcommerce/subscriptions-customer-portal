# SUBSCRIPTIONS CUSTOMER PORTAL

## Local Set-Up

### Create a GitHub account if you do not have one already

- https://github.com/

### Fork and Clone the Repo

- Fork the repo into your workspace https://github.com/bold-commerce/subscriptions-customer-portal/tree/shopify
- Clone your copy of the repo:
- `$ git clone https://github.com/path/to/your/forked/version`

### Ensure you are on the correct NODE version

- `$ nvm install 16`
- `$ nvm use 16`

### Install, build, and run yarn

- `$ yarn`
- `$ yarn build`
- `$ yarn start`

### Navigate to window

- `http://localhost:3000`

### How to setup on a Shopify theme
- On your shopify theme add this line to the bottom of your `theme.liquid` before the closing `</body></html>` tags

```html 
<script src="http://localhost:3000/static/js/bundle.js" type="text/javascript"></script>
```

### Insert div into subscription management page
- Navigate to the page for managing subscriptions
- Within the editor menu, click the insert HTML button and insert: 
    
    <div id="subscriptions-customer-portal-root"></div>

### Setting up variables

- Copy the .env.example -> .env, and update the value if required.
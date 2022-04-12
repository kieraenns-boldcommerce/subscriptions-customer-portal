# SUBSCRIPTIONS CUSTOMER PORTAL

## Local Set-Up

### Create a GitHub account if you do not have one already

- https://github.com/

### Ensure you have an SSH key added to your GitHub account

1. List your ssh key files: 
`ls -al ~/.ssh`

2. You should see one called: 
`id_rsa.pub`

3. Copy the contents of the file to your clipboard: 
`pbcopy < ~/.ssh/id_rsa.pub`

4. Go to your GitHub account -> Settings -> SSH And GPG keys -> New SSH Key

5. Paste the contents of your clipboard. It should start with something like `ssh-rsa`

6. Click `Save SSH Key`

7. You should then be able to push/pull from the repo!

### Clone the Forked Repo

- `$ git clone https://github.com/kieraenns-boldcommerce/subscriptions-customer-portal`

### Checkout the Correct Branch

- `$ git checkout shopify` // Currently the "master" branch

### Ensure you are connected to the VPN

- check to make sure your VPN connection is on

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
- Have `yarn start` running
- Set up a [Cloudflare argo tunnel](https://developers.cloudflare.com/cloudflare-one/connections/connect-apps/install-and-setup/tunnel-guide/) to point to your local react build

```
cloudflared tunnel --hostname {your-argo-tunnel} --url http://localhost:3000/
```

- Navigate to your argo tunnel to verify it is running and accessible
- On your shopify theme add this line to the bottom of your `theme.liquid` before the closing `</body></html>` tags

```html 
<script src="https://{your-argo-tunnel}/static/js/bundle.js" type="text/javascript"></script>
```

### Insert div into subscription management page
- Navigate to the page for managing subscriptions
- Within the editor menu, click the insert HTML button and insert: 
    
    <div id="subscriptions-customer-portal-root"></div>

### Setting up variables

- Copy the .env.example -> .env, and update the value if required.
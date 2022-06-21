#!/bin/zsh

source ~/.zshrc

nvm use 16

yarn && yarn build && yarn start

# cloudflared tunnel --hostname kiera-bsub-cp-local.bold.ninja --url http://localhost:3001/
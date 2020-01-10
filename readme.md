
# SaltoKS Test task

## Start up:

1. run `npm install`
2. run `npm start` to start webpack-dev-server
3. open `localhost:9000` in browser

## Tests:

run `npm test` to start jest

***note:** tests provided for utility and auth actions only*

## i18n

Translations provided for English and Ukrainian languages

## Authentication

Authentication is implemented in accordance with [Web application flow](https://developer.github.com/apps/building-oauth-apps/authorizing-oauth-apps/#web-application-flow) provided by GitHub.
Due to [CORS policy](https://github.com/isaacs/github/issues/330) a server solution is required to obtain an authorization token.
[Gatekeeper](https://github.com/prose/gatekeeper) was used for this purpose.

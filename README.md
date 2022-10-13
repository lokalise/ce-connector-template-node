# Template connector for Lokalise content type app engines

Lokalise **content exchange apps** facilitate the exchange of translatable content between Lokalise and third party content platforms. Users interact with them to connect both systems, select the content they want to translate, transfer it to Lokalise, see the translation status, and send the translations back to the content platform.

You can build and publish **your own content exchange app** by building a connector for the Lokalise content engine. The **content engine** will take care of the UI and handle the standard install, config and content management flows, while the **connector** will act as a bridge between the content platform and Lokalise content engine.

```ascii
 ------------------     -------------------------     ----------------
| Your content app | = | Lokalise content engine | + | Your connector |
 ------------------     -------------------------     ----------------  
```

In this repository you will find **PHP code that you can use as a template** for your Lokalise content exchange connector.

- The technical requirements of a connector are detailed on [Lokalise Developer Hub](https://developers.lokalise.com/docs/technical-requirements-content-exchange-hosted-connector).
- The [OpenAPI schema](schema.yaml) describes the endpoints that must be served by a connector.

## Development

To start development of a new connector:

1. Copy this repository code to your repository
2. Replace all entries **template** with **yourConnectorName** and **Template** with **YourConnectorName**
3. Start implementing your connector specific logic replacing TODOs
4. Remove current section from README

## Installation

Add .env file to your project root directory based on .env.default.

For development, use the dockerized environment:

`docker compose up -d`

The app is available at: http://localhost:3000/

Run tests:

`docker compose exec -it app npm run test`

Run formatting:

`docker compose exec -it app npm run format`

Run linter:

`docker compose exec -it app npm run lint`

## Openapi

Openapi docs are available at [connector-openapi](https://github.com/lokalise/connector-openapi/blob/master/postman/schemas/schema.yaml)

## License

This library is licensed under the [Apache 2.0 license](LICENSE). 

Copyright (c) [Lokalise group](https://lokalise.com/).
# Template connector for Lokalise content type app engines

To start development of a new connector:

1.  Copy this repository code to your repository
2.  Replace all entries **template** with **yourConnectorName** and **Template** with **YourConnectorName**
3.  Start implementing your connector specific logic replacing TODOs
4.  Remove current section from README

# Template

## Installation

Add .env file to your project root directory based on .env.default.

For development, use the dockerized environment:

    docker compose up -d

The app is available at: http://localhost:3000/

Run tests:

    docker compose exec -it app npm run test

Run formatting:

    docker compose exec -it app npm run format

Run linter:

    docker compose exec -it app npm run lint

## Openapi

Openapi docs are available at https://github.com/lokalise/connector-openapi/blob/master/postman/schemas/schema.yaml

# Template connector for Lokalise content type app engines

Lokalise **content exchange apps** facilitate the exchange of translatable content between Lokalise and third party content platforms. Users interact with them to connect both systems, select the content they want to translate, transfer it to Lokalise, see the translation status, and send the translations back to the content platform.

You can build and publish **your own content exchange app** by building a connector for the Lokalise content engine. The **content engine** will take care of the UI and handle the standard install, config and content management flows, while the **connector** will act as a bridge between the content platform and Lokalise content engine.

```ascii
 ------------------     -------------------------     ----------------
| Your content app | = | Lokalise content engine | + | Your connector |
 ------------------     -------------------------     ----------------
```

In this repository you will find **TypeScript code that you can use as a template** for your Lokalise content exchange connector.

- The technical requirements of a connector are detailed on [Lokalise Developer Hub](https://developers.lokalise.com/docs/technical-requirements-content-exchange-hosted-connector).
- The [OpenAPI schema](https://github.com/lokalise/connector-openapi/blob/master/postman/schemas/schema.yaml) describes the endpoints that must be served by a connector.

## Development

To start development of a new connector:

1. Copy this repository code to your repository
2. Replace all entries **template** with **yourConnectorName** and **Template** with **YourConnectorName**
3. Start implementing your connector specific logic replacing TODOs. Note that field values in cacheItemStructure of [envResponseBody](src\routes\env\schema.ts) should be in the following format:

   - First letter of the first name word should be capitalized.
     - Wrong: "author"
     - Correct: "Author"
   - First letter of the second, etc word in name should be lower case.
     - Wrong: "Group Name"
     - Correct: "Group name"
   - Concatenated words should be split.
     - Wrong: "GroupName"
     - Correct: "Group name"
   - The field name should be meaningful to the user because it appears on the UI, and it helps users identify their content.

   In response all DateTime fields from [cacheItem](src\routes\cache\schema.ts) should be
   converted in format `yyyy-mm-dd`.

   - Wrong: `fields: {updatedAt: "15.06.2022"}`
   - Correct: `fields: {updatedAt: "2022-06-15"}`

4. Remove current section from README

## Installation

Add .env file to your project root directory based on .env.default.

For development, run the dev script:

`npm install` \
`npm run start:dev`

The app is available at: http://localhost:3000/ (If `HOST_APP_PORT` was not changed)

Run tests:

`npm run test`

Run formatting:

`npm run lint:fix`

Run linter:

`npm run lint`

## Openapi

Openapi docs are available at [connector-openapi](https://github.com/lokalise/connector-openapi/blob/master/postman/schemas/schema.yaml)

## License

This library is licensed under the [Apache 2.0 license](LICENSE).

Copyright (c) [Lokalise](https://lokalise.com/).

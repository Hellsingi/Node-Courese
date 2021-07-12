# RS School REST service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Downloading

```
git clone {repository URL}
```

## Installing NPM modules

```
npm install
```

## Running application

```
npm start
```

After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/doc/.
For more information about OpenAPI/Swagger please visit https://swagger.io/.

## Testing

After application running open new terminal and enter:

To run all tests without authorization

```
npm test
```

To run only one of all test suites (users, boards or tasks)

```
npm test <suite name>
```

To run all test with authorization

```
npm run test:auth
```

To run only specific test suite with authorization (users, boards or tasks)

```
npm run test:auth <suite name>
```

## Development

If you're using VSCode, you can get a better developer experience from integration with [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) and [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) extensions.

### Auto-fix and format

```
npm run lint
```

# How to use Docker:

## 1. Clone repository:

> git clone `link`
## 2. Use docker compose to create image and start/stop container:

### Start

> docker-compose up
### Stop

> docker-compose down
## 3. If you want to re-build an image and start container:

> docker-compose up --build

### Debugging in VSCode

Press <kbd>F5</kbd> to debug.

For more information, visit: https://code.visualstudio.com/docs/editor/debugging

# GUIDE to RUN application
- To run application
  - ``docker compose up``
- To test application
  - ``npm run test:auth``

# TESTS
Fastify
```
Summary report @ 19:23:52(+0500) 2021-06-29
  Scenarios launched:  100
  Scenarios completed: 100
  Requests completed:  100
  Mean response/sec: 1.01
  Response time (msec):
    min: 1
    max: 11
    median: 2
    p95: 7
    p99: 11
  Scenario counts:
    0: 100 (100%)
  Codes:
    200: 100
```
Express
```
Summary report @ 19:27:58(+0500) 2021-06-29
   Scenarios launched:  100
   Scenarios completed: 100
   Requests completed:  100
   Mean response/sec: 1.01
   Response time (msec):
     min: 1
     max: 33
     median: 2
     p95: 16.5
     p99: 32.5
   Scenario counts:
     0: 100 (100%)
   Codes:
     200: 100

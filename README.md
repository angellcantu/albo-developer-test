# albo-developer-test
Albo Developer Test by Jose Angel Cantu Alcocer

# Installation
* You first need stay into the root project.

# Environment file
* You first need to create an `.env` file into the root project with the next structure:
```.env
# ENVIRONMENTS

NODE_ENV=development
PORT=2811 or your custom port

# DATABASE
DATA_BASE=mongodb://{server name}/albo_test_developer

# KEYS
MARVEL_PRIVATE_KEY={your private key}
MARVEL_PUBLIC_KEY={ your public key }
```

* You can run the following files to install the necessary to run the project:

## Run this shell
```bash
sh assemble.sh
```

This shell will download the `node` and `npm` version and the necessary dependence's.

## Run this other shell
```bash
sh avengers.sh
```

This shell will execute the app.

## Other option
You can install manually the dependence's too running the following command:

```node
npm install
```

## Run project
You can start the application with this:
```node
npm start
```

## Test
To test the services you can run the following command:
```node
npm run test
```

## Happy code 😃✌️
# uForage
An awesome food app.

## Generator
https://github.com/mcfly-io/generator-mcfly

## Development
Install ``` npm install -g generator-mcfly ``` (along with Yeoman if you don't already have it)

Here are some of the Yo commands:
```
yo mcfly:module (module)
yo mcfly:controller (modulename) (controllername)
yo mcfly:directive (modulename) (directive)
yo mcfly:service (modulename) (servicename)
```

For more commands, see:
https://github.com/mcfly-io/generator-mcfly/blob/master/README.md

## Gulp Tasks
```
gulp help           # List the main gulp tasks
gulp lint           # Run lint
gulp test           # Run lint, unit tests, and e2e tests
gulp unit           # Run lint and unit tests (karma for client + mocha for server)
gulp karma          # Run karma client unit tests
gulp mocha          # Run mocha server unit tests
gulp e2e            # Run protractor for end to end tests
gulp browserify     # Generate a distribution folder using browserify
gulp webpack:run    # Generate a distribution folder using webpack
gulp style          # Generate a main.css file
gulp browsersync    # Creates a browser-sync server, it will display its url, it watches for js / css / scss / html file changes and inject automatically the change in the browser
gulp dist           # Distribute the application
gulp cordova:image  # Generate the cordova icons and splashs
gulp cordova:run    # Run cordova run (accepts a --platform option)
```

## Changelog

Recent changes can be viewed on Github on the [Releases Page](https://github.com//forage/releases)

## License


## Contribute
Anyone is more then welcome to contribute, we have provided a handful of issues / task to be able to be picked up from anyone at Code for Philly! Make sure to fork off DEV, and then create a Pull Request.

## Slack
We also communicate through Slack, if you would like to be invited to your channel: https://uforage.slack.com/
Please post an issue on repo with your gmail, and label it with, Add-Me-To-Slack.


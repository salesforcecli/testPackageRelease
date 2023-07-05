# testPlugin117

foo7

[![Version](https://img.shields.io/npm/v/testPlugin117.svg)](https://npmjs.org/package/testPlugin117)
[![CircleCI](https://circleci.com/gh/vmundra/testPlugin117/tree/master.svg?style=shield)](https://circleci.com/gh/vmundra/testPlugin117/tree/master)
[![Appveyor CI](https://ci.appveyor.com/api/projects/status/github/vmundra/testPlugin117?branch=master&svg=true)](https://ci.appveyor.com/project/heroku/testPlugin117/branch/master)
[![Greenkeeper](https://badges.greenkeeper.io/vmundra/testPlugin117.svg)](https://greenkeeper.io/)
[![Known Vulnerabilities](https://snyk.io/test/github/vmundra/testPlugin117/badge.svg)](https://snyk.io/test/github/vmundra/testPlugin117)
[![Downloads/week](https://img.shields.io/npm/dw/testPlugin117.svg)](https://npmjs.org/package/testPlugin117)
[![License](https://img.shields.io/npm/l/testPlugin117.svg)](https://github.com/vmundra/testPlugin117/blob/master/package.json)

<!-- toc -->

- [Debugging your plugin](#debugging-your-plugin)
  <!-- tocstop -->
  <!-- install -->
  <!-- usage -->

```sh-session
$ npm install -g @salesforce/test-plugin117
$ sfdx COMMAND
running command...
$ sfdx (--version)
@salesforce/test-plugin117/1.5.3 darwin-x64 node-v16.13.2
$ sfdx --help [COMMAND]
USAGE
  $ sfdx COMMAND
...
```

<!-- usagestop -->
<!-- commands -->

- [`sfdx hello:org [-n <string>] [-f] [-v <string>] [-u <string>] [--apiversion <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-helloorg--n-string--f--v-string--u-string---apiversion-string---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)

## `sfdx hello:org [-n <string>] [-f] [-v <string>] [-u <string>] [--apiversion <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

print a greeting and your org IDs

```
USAGE
  $ sfdx hello:org [-n <string>] [-f] [-v <string>] [-u <string>] [--apiversion <string>] [--json] [--loglevel
    trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

FLAGS
  -f, --force                                                                       example boolean flag
  -n, --name=<value>                                                                name to print
  -u, --targetusername=<value>                                                      username or alias for the target
                                                                                    org; overrides default target org
  -v, --targetdevhubusername=<value>                                                username or alias for the dev hub
                                                                                    org; overrides default dev hub org
  --apiversion=<value>                                                              override the api version used for
                                                                                    api requests made by this command
  --json                                                                            format output as json
  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)  [default: warn] logging level for
                                                                                    this command invocation

DESCRIPTION
  print a greeting and your org IDs

EXAMPLES
  $ sfdx hello:org --targetusername myOrg@example.com --targetdevhubusername devhub@org.com

  $ sfdx hello:org --name myname --targetusername myOrg@example.com
```

_See code: [src/commands/hello/org.ts](https://github.com/vmundra/testPlugin117/blob/v1.5.3/src/commands/hello/org.ts)_

<!-- commandsstop -->
<!-- debugging-your-plugin -->

# Debugging your plugin

We recommend using the Visual Studio Code (VS Code) IDE for your plugin development. Included in the `.vscode` directory of this plugin is a `launch.json` config file, which allows you to attach a debugger to the node process when running your commands.

To debug the `hello:org` command:

1. Start the inspector

If you linked your plugin to the sfdx cli, call your command with the `dev-suspend` switch:

```sh-session
$ sfdx hello:org -u myOrg@example.com --dev-suspend
```

Alternatively, to call your command using the `bin/run` script, set the `NODE_OPTIONS` environment variable to `--inspect-brk` when starting the debugger:

```sh-session
$ NODE_OPTIONS=--inspect-brk bin/run hello:org -u myOrg@example.com
```

2. Set some breakpoints in your command code
3. Click on the Debug icon in the Activity Bar on the side of VS Code to open up the Debug view.
4. In the upper left hand corner of VS Code, verify that the "Attach to Remote" launch configuration has been chosen.
5. Hit the green play button to the left of the "Attach to Remote" launch configuration window. The debugger should now be suspended on the first line of the program.
6. Hit the green play button at the top middle of VS Code (this play button will be to the right of the play button that you clicked in step #5).
   <br><img src=".images/vscodeScreenshot.png" width="480" height="278"><br>
   Congrats, you are debugging!

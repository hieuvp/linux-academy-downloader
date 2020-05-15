# Linux Academy Downloader

[![CI](https://github.com/hieuvp/linux-academy-downloader/workflows/CI/badge.svg?branch=master)](https://github.com/hieuvp/linux-academy-downloader/actions?query=workflow%3ACI+branch%3Amaster)
[![Release](https://github.com/hieuvp/linux-academy-downloader/workflows/release/badge.svg)](https://github.com/hieuvp/linux-academy-downloader/actions?query=workflow%3Arelease)
[![NPM](https://img.shields.io/npm/v/linux-academy-downloader.svg)](https://www.npmjs.com/package/linux-academy-downloader)
[![Downloads](https://img.shields.io/npm/dm/linux-academy-downloader.svg)](https://www.npmjs.com/package/linux-academy-downloader)

## Table of Contents

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [How It Works](#how-it-works)
- [Requirements](#requirements)
  - [Installation](#installation)
    - [NPM](#npm)
    - [Brew](#brew)
    - [Docker](#docker)
- [Usages](#usages)
  - [Getting Started](#getting-started)
    - [With NPM](#with-npm)
    - [With Brew](#with-brew)
    - [With Docker](#with-docker)
  - [Authentication Methods](#authentication-methods)
  - [Demo](#demo)
- [References](#references)
- [License](#license)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## How It Works

<div align="center"><img src="assets/linux-academy-downloader.png" width="800"></div>

## Requirements

These are mandatory dependencies that must be installed in your machine:

- [Node.js](https://nodejs.org/en/):
  a JavaScript runtime.
- [Chrome Driver](https://github.com/giggio/node-chromedriver):
  a WebDriver for automated testing of webapps on the Chrome browser.
- [youtube-dl](https://github.com/ytdl-org/youtube-dl):
  a command-line program to download videos from Linux Academy site.
- [gomplate](https://github.com/hairyhenderson/gomplate):
  a template renderer.

<!-- AUTO-GENERATED-CONTENT:START (CODE:src=run.dockerfile) -->
<!-- The below code snippet is automatically added from run.dockerfile -->

```dockerfile
FROM node:erbium

RUN npm install --global linux-academy-downloader
```

<!-- AUTO-GENERATED-CONTENT:END -->

### Installation

#### NPM

Using `npm` to install the cli:

```shell script
npm install --global linux-academy-downloader
```

#### Brew

#### Docker

## Usages

### Getting Started

```shell script
export LINUX_ACADEMY_SSO=facebook
linux-academy-downloader https://linuxacademy.com/course/mastering-systemd
```

```shell script
linux-academy-downloader https://linuxacademy.com/cp/modules/view/id/171
```

#### With NPM

#### With Brew

#### With Docker

### Authentication Methods

| Description                    |                                                            Setup                                                            |
| ------------------------------ | :-------------------------------------------------------------------------------------------------------------------------: |
| Sign in with Username/Password |                `export LINUX_ACADEMY_USERNAME=<your-user>`<br />`export LINUX_ACADEMY_PASSWORD=<your-pass>`                 |
| Sign in with Facebook          | `export LINUX_ACADEMY_SSO=facebook`<br />`export FACEBOOK_USERNAME=<your-user>`<br />`export FACEBOOK_PASSWORD=<your-pass>` |

<br />

- <https://linuxacademy.com/cp/ssologin>

- **Pro Tips**: Add `export` commands to `~/.bashrc` (or `~/.zshrc`)
  if you want to have these environment variables loaded automatically
  every time starting a new terminal.

### Demo

## References

- [LinuxAcademy-DL](https://github.com/RahulShaw/LinuxAcademy-DL)

## License

MIT

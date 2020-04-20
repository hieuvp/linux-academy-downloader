# Linux Academy Downloader

## Table of Contents

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [How It Works](#how-it-works)
- [Requirements](#requirements)
- [Usages](#usages)
  - [Authentication Methods](#authentication-methods)
- [Demo](#demo)

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

## Usages

```shell script
npm install --global linux-academy-downloader
```

```shell script
export LINUX_ACADEMY_SSO=facebook
linux-academy-downloader https://linuxacademy.com/course/mastering-systemd
linux-academy-downloader https://linuxacademy.com/cp/modules/view/id/171
```

### Authentication Methods

| Description                      |                                                Setup                                                 |
| -------------------------------- | :--------------------------------------------------------------------------------------------------: |
| Sign in with Username / Password | `export LINUX_ACADEMY_USERNAME=<your-username>`<br />`export LINUX_ACADEMY_PASSWORD=<your-password>` |
| Sign in with Facebook            |                                 `export LINUX_ACADEMY_SSO=facebook`                                  |

## Demo

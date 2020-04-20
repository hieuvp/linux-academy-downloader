# Linux Academy Downloader

## Table of Contents

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [How It Works](#how-it-works)
- [Requirements](#requirements)
  - [Installation](#installation)
- [Usages](#usages)
  - [Getting Started](#getting-started)
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

### Installation

Using `npm` to install the cli:

```shell script
npm install --global linux-academy-downloader
```

## Usages

### Getting Started

```shell script
export LINUX_ACADEMY_SSO=facebook
linux-academy-downloader https://linuxacademy.com/course/mastering-systemd
```

### Authentication Methods

| Description                    |                                                            Setup                                                            |
| ------------------------------ | :-------------------------------------------------------------------------------------------------------------------------: |
| Sign in with Username/Password |                `export LINUX_ACADEMY_USERNAME=<your-user>`<br />`export LINUX_ACADEMY_PASSWORD=<your-pass>`                 |
| Sign in with Facebook          | `export LINUX_ACADEMY_SSO=facebook`<br />`export FACEBOOK_USERNAME=<your-user>`<br />`export FACEBOOK_PASSWORD=<your-pass>` |

<br />

- **Pro Tips**: Add `export` commands to `~/.bashrc` (or `~/.zshrc`)
  if you want to have these environment variables loaded automatically
  every time opening up a new terminal.

### Demo

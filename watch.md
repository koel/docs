# Watch Your Media Folder

## Introduction

Starting from v2.1.0, Koel provides a mean to help watch your media directory and trigger _selective_ synchronization every time there's a change to it. With this you don't have to run a whole time-consuming `koel:sync` process for just one added song. The actual watching is done by [inotifywait](http://linux.die.net/man/1/inotifywait), a popular filesystem watcher for Linux – sorry Mac and Windows folks.

<p class="warning">Though, in theory, you can watch _any_ directory other than or outside of your media root, it's not recommended, as the next manual `php artisan koel:sync` call will simply remove all those "invalid" entries.</p>

## Installation

In order to start using the feature, follow these steps:

### 1. Install inotify Tools

On CentOS for example, you can run this shell command:

``` bash
sudo yum --enablerepo=epel -y install inotify-tools
```
### 2. Set Up a Watcher Script

Now you need to set up a watcher script to run `inotifywait` and send the output to `koel:sync` artisan command. For example, you can create a sample `watch` file in Koel's root directory with this content:

``` bash
#!/bin/bash

MEDIA_PATH=/var/www/media/
PHP_BIN=/usr/bin/php

inotifywait -rme move,close_write,delete --format "%e %w%f" $MEDIA_PATH | while read file; do
  $PHP_BIN artisan koel:sync "${file}"
done
```
### 3. Run the Watcher in the Background

Following the above example:

``` bash
$ chmod +x watch
$ ./watch
[Ctrl+z]
$ bg
$ disown -h
```
### 4. Verify

You can now verify that it works by `tail -f storage/logs/laravel.log` while doing changes to your media directory.

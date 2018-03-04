# Koel

![Showcase](https://koel.phanan.net/dist/img/showcase.png)

## Introduction

[**Koel**](https://koel.phanan.net) (also styled as **koel**, with a lowercase k) is a simple web-based personal audio streaming service written in [Vue](https://vuejs.org/) at the client side and [Laravel](https://laravel.com/) on the server side. Targeting web developers, Koel embraces some of the more modern web technologies – flexbox, audio and drag-and-drop API to name a few – to do its job.

## Requirements

Koel has two components, each with its own set of requirements:

### Server
* [All requirements by Laravel](https://laravel.com/docs/5.4/installation#server-requirements) – PHP, OpenSSL, [composer](https://getcomposer.org/) and such. Consider setting PHP's `memory_limit` to a good value (512M or better) if you have a big library.
* MySQL or MariaDB. Actually, any DBMS supported by Laravel should work.
* NodeJS latest stable with [`yarn`](https://yarnpkg.com)

### Client
* Any decent web browser will do – Koel has been tested on Chrome 47, Firefox 42, Safari 8, Opera 34, and Edge.

## Installation

### Manually

From your console, run the following commands:

```bash
cd PUBLIC_DIR
git clone https://github.com/phanan/koel.git .
git checkout v3.7.0 # Check out the latest version at https://github.com/phanan/koel/releases
composer install
php artisan koel:init # Populate credentials during the process

php artisan serve
```

You should now be able to visit [http://localhost:8000](http://localhost:8000) in your browser and start using Koel.

If you're on Debian, here's an [unofficial installation guide](https://gist.github.com/bplower/613a99156d603abac083). This may or may not be out of date, so use it with your own risk.

If you want more control, edit `.env` file. There's quite a few settings there to tweak Koel to your needs.

### With Docker

Koel doesn't maintain an official Docker image, but community-supported ones like [0xcaff/koel](https://hub.docker.com/r/0xcaff/koel/) and [binhex/arch-koel](https://hub.docker.com/r/binhex/arch-koel/) are available.

## Upgrade

Check out [Releases](https://github.com/phanan/koel/releases) for upgrade guides corresponding to your Koel version.

## Configuration and Usage

### Scanning for Music
Koel is simple. It doesn't handle uploading. It doesn't stream from Spotify. Instead, you upload your songs into a readable directory on your server – preferably outside of your web root dir – and configure Koel to scan and sync it. Such configuration can be found under Manage -> Settings.

![](https://koel.phanan.net/dist/img/settings.png)

You can also scan from the CLI – which is faster, without a time limit, and provides feedbacks – with the artisan `koel:sync` command:

```bash
$ php artisan koel:sync
Koel syncing started.

 953/953 [▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓] 100%

Completed! 944 new or updated song(s), 0 unchanged song(s), and 9 invalid file(s).
```

If you want the syncing details, suffix the command with a `-v` flag.

This command can also be added as a cron job, for example to run every midnight:
```
0 0 * * * cd /home/user/webapps/koel/ && /usr/local/bin/php70 artisan koel:sync >/dev/null 2>&1
```

As of current, Koel recognizes these audio extensions: `.mp3`, `.ogg`, `.m4a` (experimental), and `.flac` (experimental with some limitations). Others may be added in the future.

<p class="tip">Starting from v2.1.0, you can <a router-link="/watch">watch a directory</a> and sync on the fly with `inotifywait`.</p>

<p class="tip">Starting from v3.0.0, you can <a router-link="/aws-s3">use Koel with Amazon S3</a>.</p>

### Streaming Music

Koel supports three streaming methods which can be configured via a `STREAMING_METHOD` setting in `.env` file:

* `php`: Use native PHP `readfile()`. This is the default method, and the slowest and most unstable one. **Only use this method if you can't others.**
* `x-sendfile`: Use Apache's [mod_xsendfile](https://tn123.org/mod_xsendfile/) module. You'll need to install and configure the module manually. A sample configuration is as following:

    ``` apacheconf
    LoadModule xsendfile_module   libexec/apache2/mod_xsendfile.so

    # These configuration can be put in the VirtualHost directive as well
    <IfModule mod_xsendfile.c>
      XSendFile on
      XSendFilePath /mnt/media
    </IfModule>
    ```

* `x-accel-redirect`: Use nginx's [X-Accel](https://www.nginx.com/resources/wiki/start/topics/examples/x-accel/) module. Refer to [`nginx.conf.example`](https://github.com/phanan/koel/blob/master/nginx.conf.example) for a sample nginx configuration file.

<p class="warning">`STREAMING_METHOD` doesn't have effects if you're serving songs from Amazon S3.</p>

### Using the Web Interface

Using the client component of Koel should be straightforward enough. If you've ever used Spotify, you should feel right at home. As a matter of fact, Koel's client interface is a shameless rip-off of Spotify's. You can search, you can sort, you can view by artists or albums, you can create playlists, you can like/unlike songs, and you can create other users to share the vibes. There are a couple of shortcut keys, too, for the nerds:

* <kbd>F</kbd> sets the focus into global search box
* <kbd>Enter</kbd> plays a song. If multiple songs are being selected, <kbd>Enter</kbd> adds them to the bottom of the queue, <kbd>Shift</kbd>+<kbd>Enter</kbd> queues them to top. Adding a <kbd>Cmd</kbd> or <kbd>Ctrl</kbd> into the combo plays the first selected song right away.
* <kbd>Space</kbd> toggles playback
* <kbd>J</kbd> plays the next song in queue
* <kbd>K</kbd> plays the previous song in queue
* <kbd>Ctrl/Cmd</kbd>+<kbd>A</kbd> selects all songs in the current view
* <kbd>Delete</kbd> removes selected song(s) from the current queue/playlist

### Remote Controller

Starting from v3.7.0, Koel has a (mobile) remote controller that lets you control a desktop instance – play/pause, navigate, turn volume up/down,and add/remove from Favorites.

<img src="https://user-images.githubusercontent.com/8056274/33527904-c8ef579e-d858-11e7-84cf-1b85e18e9841.png" alt="Remote controller screenshot" width=320>

In order to use the feature:

1. [Register for a Pusher account](https://www.pusher.com) and create an app
1. Populate the app's credentials into `.env` (those starts with `PUSHER_`)
1. Reload the desktop Koel instance
1. Go to http://&lt;your-koel-host&gt;/remote on a mobile device to start controlling remotely. You may also want to add the URL to the home screen for faster access later.

## Mobile Support and Limitation

The client component of Koel has a responsive GUI that works fairly well on a mobile device. Certain functionalities are not available, however, some due to technology limitation, some my incompetence. For instance:

* Shortcut keys don't work (duh)
* Equalizer may *not* work
* Volume must be controlled from a system level
* ~~Next songs can't be played automatically if the browser is minimized, or if the device is locked~~ Update: On iOS, it appears that Google Chrome can still play next songs even if the device is locked, as long as the browser remains maximized.
* Next and previous songs can't be controlled from Control Center or lock screen

If you know how to fix these issues and enhance Koel's experience, read on.

## Contribution

I decided to write Koel out of my desperation of not being able to find a decent _and_ simple streaming service that fits my needs. This is my very first hands-on with Vue and ES6, and the code must smell so bad. So, **any** contribution is much appreciated. Bug reports? Bug fixes? Code optimization? Tests? Ideas? Documentation? Please [send them over](https://github.com/phanan/koel/issues/new).

## Credits

Koel is built on the shoulder of the giants. My sincere thanks go to the guys behind Vue, Laravel, as well as all JavaScript and PHP packages used in the project.

## Sponsors

The continuous development of Koel is made possible thanks to the support of these awesome sponsors:

<a href="https://www.exoscale.ch/"><img src="https://www.exoscale.ch/static/img/exoscale-logo-full-201711.svg" alt="Exoscale" height="64"></a>
<a href="https://www.keycdn.com/?a=11519"><img src="https://www.keycdn.com/img/logo.svg" alt="KeyCDN" height="64"></a>

Want to help as well? Please <a href="mailto:me@phanan.net">drop me an email</a>.

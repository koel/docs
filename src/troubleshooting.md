---
sidebar: auto
---

# Troubleshooting

So you're encountering an error. Don't panic. We're here to help.

## For Koel

#### You receive a `file_get_contents(public/build/rev-manifest.json): failed to open stream: No such file or directory` error

Solution: Run `yarn` or `npm install`. You can also try running `yarn build` directly.

#### You receive a `Class 'Pusher' not found` error

Solution: Add or set `BROADCAST_DRIVER=log` in your `.env` file. This will make `log` the default broadcast driver and not `Pusher`.

#### You receive an Unknown error when scanning using the web interface

Solution: Try scanning from the command line with `php artisan koel:sync`. Most of the time, you should receive a more detailed, easier to debug, message.

#### You receive an `Integrity constraint violation: 1062 Duplicate entry  for key 'artists_name_unique'` error when scanning

Solution: Set your database and table collation to `utf8_unicode_ci`.

#### You receive a `Syntax error or access violation: 1071 Specified key was too long; max key length is 767 bytes` error when trying install or upgrade Koel

Solution: This issue has been fixed in v3.6.2. Make sure your Koel version is v3.6.2 or newer.

#### You receive an &lt;input random strings here&gt; error when running `yarn`

Solution: 99% of the time this has little to do with Koel, but with your node/npm/yarn installation. Deleting `node_modules` and rerunning the command sometimes help. Otherwise, Google is your friend.

#### You receive an `SQLSTATE[HY000] [1044] Access denied for user ''@'localhost' to database 'forge'` error even though you'd swear to God you have filled the correct database credentials into `.env` file

Solution: Look for a space somewhere in other configuration entries in `.env`, for example:

```
ADMIN_NAME=Koel Admin
               ^___ Here you go
```
Wrap the string in quotes and you're set.

#### The song stops playing and you receive a `Failed to load resource: net::ERR_CONTENT_LENGTH_MISMATCH` error

Solution: This usually happens with the native `php` <router-link to="/home?id=streaming-music">streaming method</router-link>. Opt for a `x-sendfile` or `x-accel-redirect` if possible.

#### Song preloading doesn't work properly

Solution: Same as above.

#### Koel doesn't play the next song when you lock your phone.

Solution: Actually, no solution yet. This is a limitation for mobile browsers. A workaround can be using Google Chrome, which *seems* to be able to continue playback on an iOS device even when the device is locked, as long as it remains the active app.

:::tip Tip
Starting from v3.6.0, on Android and with Chrome 57 and newer, playback can now be controlled via the notification center and lock screen, [like this](https://twitter.com/notphanan/status/845849511134031872). This also appears to remove the limitation above.
:::

## For Koel-AWS

There's nothing here yet (and that's a good thing!)

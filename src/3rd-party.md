---
sidebar: auto
---

# 3rd-Party Integrations

Out of the box, Koel supports several (non-mandatory) 3rd-party integrations which should (helpfully) enhance your experience. They are…

## Last.fm

Connecting Koel to Last.fm will instruct Koel to retrieve possible artist and album information from Last.fm as well as support scrobbling. To enable the connection:

1. [Create a Last.fm API account](https://www.last.fm/api/account/create). In the **Callback URL** field, fill in `<your-koel-host>/api/lastfm/callback` (though this is not really important).
1. Populate the two variables `LASTFM_API_KEY` and `LASTFM_API_SECRET` with the credentials grabbed from step 1. This should enable Last.fm media information retrieving.
1. To enable scrobbling as well, go to `http://<your-koel-host>/#!/profile` and click the **Connect** button under Last.fm Integration.

## YouTube

With YouTube integration, whenever a song is played, Koel will search YouTube for related videos and display them in the sidebar, ready for you to watch from within Koel itself. The only thing you need to do is fill in `.env` with your `YOUTUBE_API_KEY`, which can be obtained by doing the following:

1. [Create a new Google Project](https://console.developers.google.com/)
2. From the project's Dashboard, click “ENABLE API” and make sure “YouTube Data API v3” is enabled
3. From the project's Credentials, click Create credentials → API Key → Server key

:::warning Limitations
YouTube integration is always disabled on mobile due to OS restrictions. Also, you interact with the videos via their own controls and not Koel's. Koel's equalizer, volume, seeker, play/pause buttons etc. will _not_ work in this context.
:::

## iTunes

If you have Last.fm integrated, available album information and tracklist will be displayed in the sidebar every time a song is played. Tracks missing from your library will have a link allowing you to purchase them directly on iTunes.

![Track listing changes](./assets/img/track-listing.png#track-listing)

These links are associated with my (Phan An's) iTunes affiliate account, which means I'd earn _several cents_ each time you buy a track from Apple. I don't know yet how it will work out (if at all), though, so this is very experimental and may be removed without notice in the future.


<style>
img[src*="#track-listing"] {
  width: 668px;
  height: auto;
}
</style>
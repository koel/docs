# 3rd-Party Integration

Out of the box, Koel supports several (non-mandatory) 3rd-party integrations which (helpfully) enhance your experience. They are…

## Last.fm

Connecting Koel to Last.fm will instruct Koel to retrieve possible artist and album information from Last.fm as well as support scrobbling. To enable the connection:

1. [Create a Last.fm API account](https://www.last.fm/api/account/create)
1. Populate the two variables `LASTFM_API_KEY` and `LASTFM_API_SECRET` with the credentials grabbed from step 1. This should enable Last.fm media information retrieving.
1. To enable scrobbling as well, go to `http://<your-koel-host>/#!/profile` and click the **Connect** button under Last.fm Integration.

## YouTube

With YouTube integration, whenever a song is played, Koel will search YouTube for related videos and display them in the sidebar, ready for you to watch from within Koel itself. The only thing you need to do is fill in `.env` with your `YOUTUBE_API_KEY`, which can be obtained by doing the following:

1. [Create a new Google Project](https://console.developers.google.com/)
2. From the project's Dashboard, click “ENABLE API” and make sure “YouTube Data API v3” is enabled
3. From the project's Credentials, click Create credentials → API Key → Server key

<p class="warning">
YouTube integration is always disabled on mobile naturally. Also, you interact with the videos via YouTube's own controls and not Koel's. Koel's equalizer, volume, seeker, play/pause etc. will simply not work for videos.
</p>

## iTunes

If you have Last.fm integrated, available album information and tracklist will be displayed in the sidebar every time a song is played. Tracks missing from your library will have a link allowing you to purchase them directly on iTunes.

<img src="https://cloud.githubusercontent.com/assets/8056274/21960297/b9184d66-db20-11e6-853b-a02b99b05a65.png" alt="Track Listing Before and After" width="668" style="max-width: 100%" />

<p class="warning">These links are associated with my (Phan An's) iTunes affiliate account, which means I'd earn _several cents_ each time you buy a track from Apple. I don't know yet how it will work out (if at all), though, so this is very experimental and may be removed without notice in the future.</p>

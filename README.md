# Snakie!
Snakie is a browser based, classic snake game.

## Gameplay
The objective of the game is to eat as many burgers as possible. There are a total of 5 levels, and players can select the difficulty level as they wish. 

- [Snakie!](#snakie)
  * [Gameplay](#gameplay)
  * [Snakie version 1 - Basic](#snakie-version-1---basic)
    + [How to play?](#how-to-play)
    + [How does the game work?](#how-does-the-game-work)
    + [Limitations](#limitations)
  * [Snakie version 2 - Record scores](#snakie-version-2---record-scores)
    + [How to play?](#how-to-play-1)
    + [How does the game work?](#how-does-the-game-work-1)
      - [Single player mode](#single-player-mode)
        * [Login using Github](#login-using-github)
        * [Standard username](#standard-username)
      - [Leaderboard mode](#leaderboard-mode)
        * [Login using Github](#login-using-github-1)
    + [Limitations](#limitations-1)
  * [Snakie version 3 - Real time multi-player (coming soon)](#snakie-version-3---real-time-multi-player-coming-soon)
  * [What can be done better?](#what-can-be-done-better)
  * [Many thanks!](#many-thanks)

## Snakie version 1 - Basic
* Night/day mode

Players can switch to their preferred mode by toggling the top right button

<img src="img/night_day_easy.gif"/>

<img src="img/night_day_hell.gif"/>

### How to play?
Players can visit [Snakie](https://metildachee.github.io/snakie/) to play the classic game. Usernames are recorded as cookies.

### How does the game work?
When the game first starts, players are prompted for a username

<img src="img/master/start_master.gif"/>
    
The site will welcome the player on subsequent visits

<img src="img/master/has_cookie.gif"/>

The game starts off easy, with the snake moving slowly and having more hamburgers.

<img src="img/master/easy.gif"/>

As the levels get more difficult, the speed of the snake increases and barriers are included..

<img src="img/master/difficult.gif"/>

... and more barriers... you get it..

<img src="img/master/hell.gif"/>

### Limitations
* Note, this is the only option if you choose to play the game online.
* Also note, this game is not supported on mobile.
* Scores are not recorded.

## Snakie version 2 - Record scores
Snakie now features a single player mode and a leaderboard mode with score recording ability.

### How to play?
Players can visit [Snakie version 2](https://snakie.herokuapp.com/) to play.

### How does the game work?

#### Single player mode
Players can choose to either:

1. Login with Github. This allows the user to record their scores on [Gist](https://gist.github.com/), [sample](https://gist.github.com/metildachee/d13d4c3c249223f30282c6d2942d3b74)

2. Or play with a standard username.

##### Login using Github

Players are prompted for their Github username and password.

<img src="img/version-4/single_github_login_gist_created.gif"/>

After which, a `snake_logs` Gist will be created; should the player not have played before, the file will be created. 

Should the file already exist, previous scores will be updated in the highscore board.

<img src="img/version-4/single_play_before.gif"/>

Logs are updated as the player plays.

<img src="img/version-4/single_player_log_update.gif"/>

... you get the gist.

##### Standard username

This is [Snakie version 1](#snakie-version-1)

#### Leaderboard mode

This mode allows anyone to make a highscore on the [leaderboard](https://gist.github.com/metildachee/4236c7cab8ae755ce2800703d6588d68).

##### Login using Github 
To play leaderboard mode, players must login to Github.

A new player will be given instructions on how to play.

<img src="img/version-4/welcome_page.gif"/>

A seasoned player will be shown a welcome page and their scores will be updated.

<img src="img/master/has_cookie.gif"/>

Only the top 3 and current player's scores are updated, this allows the player to see how far they have to the top score.

<img src="img/version-4/multi_ranking.gif"/>

If the player is already in the top rank... congrats!

<img src="img/version-4/multi_player_logs_updated.gif"/>

### Limitations 
1. Grossly insecure; iykyk
2. Blatantly inadequate approach
3. Slow performance and many deprecations
4. Single player must have at least 1 Gist on their account, otherwise application will have unpredictable behaviour
5. No mobile too 😅

## Snakie version 3 - Real time multi-player (coming soon)
This version would allow multiple players to play at the same time.

<img src="img/version-4/experimenting.gif"/>

## What can be done better?
Wayyy... too many, these are just the one top of my head.
* UX orientated
* Writing better code
* Staying calm
* Being adventurous
* .... ++ 

## Many thanks!
* [SweetAlert2](https://sweetalert2.github.io/)
* [Animate.css](https://animate.style/)
* [Gist API](https://developer.github.com/v3/gists/)
* [GitHub OAuth Webflow](https://developer.github.com/apps/building-oauth-apps/authorizing-oauth-apps/)
* [Cookies](https://www.w3schools.com/js/js_cookies.asp)
* [AJAX and Gist](http://techslides.com/github-gist-api-with-curl-and-ajax)
* [Node.js OAuth example](https://github.com/sohamkamani/node-oauth-example)
* [TOC Generator](https://ecotrust-canada.github.io/markdown-toc/)
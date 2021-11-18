import { TwitterApi } from 'twitter-api-v2';
import state from '../store'
import cfg from '../../opensocial.config'

let secret = ""

export async function StartVerification () {
  let client = new TwitterApi({ appKey: cfg.consumer_key, appSecret: cfg.consumer_secret })
  const authLink = await client.generateAuthLink('open-social://twitter-auth')
  window.open(authLink.url)
  secret = authLink.oauth_token_secret
}

export async function FinishVerification (url) {
  console.log(`received from ${url.searchParams}`)
  let token = url.searchParams.get('oauth_token')
  let verifier = url.searchParams.get('oauth_verifier')

  if (!verifier) {
    console.log("session expired")
  }

  // Obtain the persistent tokens
  // Create a client from temporary tokens
  let client = new TwitterApi({
    appKey: cfg.consumer_key,
    appSecret: cfg.consumer_secret,
    accessToken: token,
    accessSecret: secret,
  })

  client.login(verifier)
    .then(({ client: loggedClient, accessToken, accessSecret }) => {
      // loggedClient is an authentificated client in behalf of some user
      // Store accessToken & accessSecret somewhere
      console.log(loggedClient)
      console.log(accessToken)
      console.log(accessSecret)
      state.commit('setTwitterAuth', { accessToken, accessSecret })
      state.commit('setTwitterClient', loggedClient)
      loggedClient.currentUser()
        .then((u) => { console.log(u); state.commit('setTwitterUser', { name: u.screen_name, img: u.profile_image_url_https }) })
        .catch(e => console.log(e))
    })
    .catch(() => console.log('Invalid verifier or access tokens!'));
}
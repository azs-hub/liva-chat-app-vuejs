export function authHeader() {
  // return authorization header with jwt token
  let vuex = JSON.parse(localStorage.getItem('vuex'));
  console.log('authHeader', vuex, vuex.chat && vuex.chat.chat.token)
  if (vuex.chat && vuex.chat.chat.token) {
    return { 'Authorization': 'Bearer ' + vuex.chat.chat.token };
  } else {
    return {};
  }
}

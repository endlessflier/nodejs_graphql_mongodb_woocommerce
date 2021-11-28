const jwt = require("express-jwt");
const jwksRsa = require("jwks-rsa");
import axios from "axios";

export const auth0 = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`,
  }),

//   audience: process.env.AUTH0_AUDIENCE,
  issuer: [`https://${process.env.AUTH0_DOMAIN}/`],
  algorithms: ["RS256"],
});

export class Auth0 {
  accessToken = null
  lastFetched = null

  generateToken = async () => {
    try {
      const response = await axios.post(`https://${process.env.AUTH0_DOMAIN}/oauth/token`, {
        grant_type: 'client_credentials',
        client_id: process.env.AUTH0_MANAGEMENT_CLIENT_ID,
        client_secret: process.env.AUTH0_MANAGEMENT_CLIENT_SECRET,
        audience: process.env.AUTH0_MANAGEMENT_AUDIENCE,
      });

      if (response?.data?.access_token) {
        this.accessToken = response?.data?.access_token
      }
    } catch (err) {
      console.info(err)
      return null
    } 
  }

  getAuth0UserByEmail = async (email) => {
    try {
      if (!this.accessToken) {
        await this.generateToken()
      }

      const user = await axios.get(`https://${process.env.AUTH0_DOMAIN}/api/v2/users-by-email?email=${email}`, {
        headers: {
          'Authorization': `Bearer ${this.accessToken}`,
        }
      });


      let auth0User

      if (user?.data?.length > 0) {
        user.data.forEach(u => {
          u?.identities?.forEach((identity) => {
            if (identity?.connection === process.env.AUTH0_CONNECTION) {
              auth0User = u
            }
          })
        })
      }

      return auth0User
    } catch (err) {
      console.info(err)
      return null
    }
  }
}

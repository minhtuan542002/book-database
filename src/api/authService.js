import axios from 'axios';
const RESPONSE_TYPE="code";
const SCOPE="openid";
const COGNITO_USER_POOL_ID = process.env.REACT_APP_COGNITO_USER_POOL_ID;
const COGNITO_CLIENT_ID = process.env.REACT_APP_COGNITO_CLIENT_ID;
const COGNITO_REGION = process.env.REACT_APP_COGNITO_REGION;
const COGNITO_DOMAIN = process.env.REACT_APP_COGNITO_DOMAIN;

export const login = async (email, password) => {
  return axios.post(`${COGNITO_DOMAIN}/oauth2/token`, 
    {
      "AuthParameters" : {
        "USERNAME" : email,
        "PASSWORD" : password
      },
      "AuthFlow" : "USER_PASSWORD_AUTH",
      "ClientId" : `${COGNITO_CLIENT_ID}`
    }, {
    headers: {
      'X-Amz-Target': 'AWSCognitoIdentityProviderService.InitiateAuth',
      'Content-Type': 'application/x-amz-json-1.1'
    }
  });
};

export const logout = (accessToken) => {
  return axios.post(
    `${COGNITO_DOMAIN}/oauth2/revoke`,
    new URLSearchParams({
      token: accessToken,
      client_id: COGNITO_CLIENT_ID,
    }),
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    }
  );
};

export const refreshToken = async (refreshToken, clientId) => {
  const response = await axios.post(`${COGNITO_DOMAIN}/token`, {}, {
    params: {
      grant_type: "refresh_token",
      client_id: COGNITO_CLIENT_ID,
      refresh_token: refreshToken,
    },
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
  return response.data.access_token;
};
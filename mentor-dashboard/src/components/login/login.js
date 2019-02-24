import React from 'react';
import GitHubLogin from 'react-github-login';

const onFailure = response => response;

const Login = ({mentorLogin}) => {
	return (
    <GitHubLogin 
      clientId="6642582293ecc6d430df"
      redirectUri=""
      onSuccess={mentorLogin}
      onFailure={onFailure}
    />
  );
}

export default Login;
  

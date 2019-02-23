import React from 'react';
import GitHubLogin from 'react-github-login';

const onFailure = response => console.error(response);

const Login = (props) => {
	return (
    <GitHubLogin 
      clientId="6642582293ecc6d430df"
      redirectUri=""
      onSuccess={props.mentorLogin}
      onFailure={onFailure}
    />
  );
}

export default Login;
  

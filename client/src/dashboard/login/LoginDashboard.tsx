import * as React from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import theme from '../../resources/theme';
import { Input, TextField } from '@material-ui/core';
import classNames from 'classnames';
import UserIcon from '../../resources/icons/UserIcon';
import MagpieFullLogo from '../../resources/icons/MagpieFullLogo';
import { useCookies } from 'react-cookie';

interface MyProps {
  className?: string;
}

const cookieValidTimeInMS: number = 24 * 60 * 60 * 1000;

export const LoginDashboard: React.FC<MyProps> = (props) => {
  const [username, setUsername] = useState('');
  const [signUpUsername, setSignUpUsername] = useState('');
  const [signUpUsernameVerify, setSignUpUsernameVerify] = useState('');
  const [signUp, setSignUp] = useState(false);
  const [signUpError, setSignUpError] = useState('');
  const [verifyError, setVerifyError] = useState('');
  const [loginError, setLoginError] = useState('');

  const [, setUserCookie] = useCookies(['magpie']);

  const resetHooks = () => {
    setUsername('');
    setSignUpUsername('');
    setSignUpUsernameVerify('');
    setSignUpError('');
    setVerifyError('');
    setLoginError('');
  };

  const postLogin = (userName: string) => {
    return fetch('/api/login',
      {
        method: 'post',
        body: userName,
      },
    );
  };

  const postRegistration = (userName: string) => {
    return fetch('/api/login/register',
      {
        method: 'post',
        body: userName,
      },
    );
  };

  const login = () => {
    if (username === '') {
      setLoginError('Field cannot be empty');
    } else if (loginError === '') {
      postLogin(username)
        .then(response => handleResponse(response.status))
        .catch((reason) => {
          console.log(reason);
        });
    }
  };

  const handleResponse = (status: number) => {
    if (status === 201)
      setUserCookie('magpie', {userName: signUpUsername, segments: [], viewState: {rfiId: undefined, tgtId: undefined}},
                    {expires: new Date(new Date().getTime() + cookieValidTimeInMS)});
    else if (status === 200)
      setUserCookie('magpie', {userName: username, segments: [], viewState: {rfiId: undefined, tgtId: undefined}},
                    {expires: new Date(new Date().getTime() + cookieValidTimeInMS)});
    else if (status === 409)
      setVerifyError('Account already exists');
    else if (status === 401)
      setLoginError('Account does not exist');
  };

  const register = () => {

    let errors = signUpError !== '' && verifyError !== '';
    if (signUpUsername === '') {
      setSignUpError('Field cannot be empty');
      errors = true;
    }
    if (signUpUsernameVerify === '') {
      setVerifyError('Field cannot be empty');
      errors = true;
    } else if (signUpUsername !== signUpUsernameVerify) {
      setVerifyError('Does not match');
      errors = true;
    }

    if (!errors) {
      setSignUpError('');
      setVerifyError('');
      postRegistration(signUpUsername)
        .then(response => handleResponse(response.status))
        .catch((reason) => {
          console.log(reason);
        });
    }
  };

  const checkInvalid = (username: string): boolean => {
    let validChars = /^[0-9a-zA-Z.]+$/;
    return !validChars.test(username);
  };

  const inputUsername = (event: any) => {
    let newUsername: string = event.target.value;
    if (checkInvalid(newUsername) && newUsername !== '')
      setLoginError('Invalid input');
    else
      setLoginError('');
    setUsername(newUsername);
  };

  const inputSignUpUsername = (event: any) => {
    let newUsername: string = event.target.value;
    if (checkInvalid(newUsername) && newUsername !== '')
      setSignUpError('Invalid input');
    else
      setSignUpError('');
    setSignUpUsername(newUsername);
  };

  const inputVerifyUsername = (event: any) => {
    let newUsername: string = event.target.value;
    if (checkInvalid(newUsername) && newUsername !== '')
      setVerifyError('Invalid input');
    else
      setVerifyError('');
    setSignUpUsernameVerify(newUsername);
  };

  return (
    <div className={props.className}>
      <div className={'login-container'}>
        <MagpieFullLogo className={'logo'}/>
        {signUp ?
          <form className={'sign-up-form'}
                onKeyPress={(e) => {
                  if (e.which === 13) {
                    register();
                  }
                }}
          >
            <div className={'username-row'}>
              <UserIcon className={'username-icon'}/>
              <Input
                autoFocus
                required
                className={classNames('username-input', 'sign-up')}
                value={signUpUsername}
                placeholder={'Enter SIPR Email'}
                disableUnderline
                onChange={inputSignUpUsername}
              />
              <div className={'username-suffix'}><span>@mail.smil.mil</span></div>
            </div>
            <div className={'error-message'}><span>{signUpError}</span></div>
            <div className={'username-row'}>
              <UserIcon className={'username-icon'}/>
              <TextField
                required
                className={classNames('username-input', 'sign-up-verify')}
                value={signUpUsernameVerify}
                placeholder={'Confirm Email'}
                InputProps={{
                  disableUnderline: true,
                }}
                onChange={inputVerifyUsername}
              />
              <div className={'username-suffix'}><span>@mail.smil.mil</span></div>
            </div>
            <div className={'error-message'}><span>{verifyError}</span></div>
            <div
              className={classNames('no-select', 'submit-button')}
              onClick={register}
            >
              <span>Submit</span>
            </div>
            <div
              className={classNames('no-select', 'text-button', 'cancel-create-account-button')}
              onClick={() => {
                resetHooks();
                setSignUp(false);
              }}
            >
              Cancel
            </div>
          </form>
          :
          <form className={'login-form'}
                onKeyPress={(e) => {
                  if (e.which === 13) {
                    login();
                  }
                }}
                onSubmit={(e: any) => e.preventDefault()}
          >
            <div className={'username-row'}>
              <UserIcon className={'username-icon'}/>
              <TextField
                autoFocus
                className={classNames('username-input')}
                value={username}
                placeholder={'Enter SIPR Email'}
                InputProps={{
                  disableUnderline: true,
                }}
                onChange={inputUsername}

              />
              <div className={'username-suffix'}><span>@mail.smil.mil</span></div>
            </div>
            <div className={'error-message'}><span>{loginError}</span></div>
            <div
              className={classNames('no-select', 'submit-button')}
              onClick={login}
            >
              <span>Sign In</span>
            </div>
            <div
              className={classNames('no-select', 'text-button', 'create-account-button')}
              onClick={() => {
                resetHooks();
                setSignUp(true);
              }}
            >
              Don't have an account?
            </div>
          </form>
        }

      </div>
    </div>
  );
};

export const StyledLoginDashboard = styled(LoginDashboard)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
  background: ${theme.color.backgroundBase};
  font-weight: ${theme.font.weightMedium};
  font-size: ${theme.font.sizeRegion};
  
  .login-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  
  .logo {
    margin-bottom: 10px;
  }
  
  .username-row {
    background: ${theme.color.backgroundFocus};
    height: 48px;
    width: 384px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 2px 2px 2px 2px;
    border-radius: 8px;
    margin-bottom: 28px;
  }
  
  .username-icon {
    margin: 16px;
  }
  
  .username-input {
    width: 199px;
  }
  
  input {
    text-align: right;
    margin-top: 3px;
  }
  
  .username-suffix {
    background: ${theme.color.backgroundUsernameSuffix};
    height: 44px;
    width: 127px;
    border-bottom-right-radius: 7px;
    border-top-right-radius: 7px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    color: ${theme.color.fontUsernameSuffix};
  }
  
  .submit-button {
    background: ${theme.color.backgroundFocus};
    height: 48px;
    width: 384px;
    margin-bottom: 28px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
    cursor: pointer;
    
    :hover {
      background: ${theme.color.backgroundUsernameSuffix};
    }
  }
  
  .text-button {
    text-align: center;
    color: ${theme.color.loginIcon};
    cursor: pointer;
    
    :hover {
      text-shadow: 0 0 8px rgba(8, 114, 179, 0.75);
    }
  }
  
  .error-message {
    height: 28px;
    margin-top: -28px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    padding-left: 14px;
    font-size: ${theme.font.sizeRow};
    font-weight: ${theme.font.weightNormal};
    color: ${theme.color.fontError};
  }
`;

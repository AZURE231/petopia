import { GoogleOAuthProvider as Provider } from '@react-oauth/google';
import { useState } from 'react';
import { IApiResponse } from '../interfaces/common';
import { QUERY_KEYS } from '../utils/constants';
import { useQuery } from '../utils/hooks';
import { getGoogleAuthClientId } from '../services/authentication.api';
import { IGoogleLogin } from './GoogleLoginButton';

export function GoogleOAuthProvider(
  Children: (props: IGoogleLogin) => JSX.Element
) {
  const Result = (props: IGoogleLogin) => {

    const [clientId, setClientId] = useState<string>('');

    useQuery<IApiResponse<string>>(
      [QUERY_KEYS.GET_GOOGLE_AUTH_CLIENT_ID],
      getGoogleAuthClientId,
      {
        onSuccess: res => setClientId(res.data.data),
        refetchOnWindowFocus: false,
      }
    );

    return (
      <>
        {
          clientId && <Provider clientId={clientId} >
            <Children {...props} />
          </Provider>
        }
      </>
    );
  };
  return Result;
};
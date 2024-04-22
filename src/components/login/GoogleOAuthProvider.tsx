import { GoogleOAuthProvider as Provider } from '@react-oauth/google';
import { useState } from 'react';
import { IGoogleLogin } from './GoogleLoginButton';
import { IApiResponse } from '@/src/interfaces/common';
import { useQuery } from '@/src/utils/hooks';
import { QUERY_KEYS } from '@/src/utils/constants';
import { getGoogleAuthClientId } from '@/src/services/authentication.api';

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
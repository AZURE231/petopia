import Image from 'next/image';
import { GoogleOAuthProvider as Provider, useGoogleLogin } from '@react-oauth/google';
import { QUERY_KEYS, STATIC_URLS } from '../utils/constants';
import { useMutation, useQuery } from '../utils/hooks';
import { IApiResponse } from '../interfaces/common';
import { IGoogleLoginRequest } from '../interfaces/authentication';
import { getGoogleAuthClientId, googleLogin } from '../services/authentication.api';
import { useState } from 'react';

const GoogleOAuthProvider = (Children: () => JSX.Element) => {
  const Result = () => {

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
            <Children />
          </Provider>
        }
      </>
    );
  };
  return Result;
};

export const GoogleLoginButton = GoogleOAuthProvider(() => {
  const login = useGoogleLogin({
    onSuccess: res => {
      const tokenId = res.access_token;
      googleLoginMutation.mutate({ tokenId: tokenId });
    }
  });

  const googleLoginMutation = useMutation<IApiResponse<boolean>, IGoogleLoginRequest>(
    googleLogin,
    {
      onSuccess: () => window.location.replace('/home'),
    },
  );

  return (
    <div
      className="w-full cursor-pointer content-end py-2 border flex border-slate-200 rounded-lg text-slate-700 hover:border-slate-400 hover:text-slate-900 hover:shadow transition duration-150"
      onClick={() => login()}
    >
      <div className="flex gap-2 mx-auto">
        <Image
          width={24}
          height={24}
          src={STATIC_URLS.GOOGLE_LOGIN}
          loading="lazy"
          alt="google logo"
        />
        <span className="">Đăng nhập với Google</span>
      </div>
    </div>
  );
});

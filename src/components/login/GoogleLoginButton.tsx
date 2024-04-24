import Image from 'next/image';
import { useGoogleLogin } from '@react-oauth/google';
import { GoogleOAuthProvider } from './GoogleOAuthProvider';
import { STATIC_URLS } from '@/src/utils/constants';

export interface IGoogleLogin {
  onSuccess: (tokenId: string) => void,
}

export const GoogleLoginButton = GoogleOAuthProvider((props: IGoogleLogin) => {
  const login = useGoogleLogin({
    onSuccess: res => {
      const tokenId = res.access_token;
      props.onSuccess(tokenId);
    }
  });

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

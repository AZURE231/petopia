import { useRef, useState } from 'react';
import Recaptcha from 'react-google-recaptcha';
import { useQuery } from '../utils/hooks';
import { QUERY_KEYS } from '../utils/constants';
import { IApiResponse } from '../interfaces/common';
import { getGoogleRecaptchaSiteKey } from '../services/authentication.api';

interface IGoogleRecaptchaInput {
  setToken: (value: string) => void,
}

export const GoogleRecaptchaInput = (props: IGoogleRecaptchaInput) => {
  const { setToken } = props;
  const [siteKey, setSiteKey] = useState<string>('');
  const recaptchaRef = useRef<Recaptcha>(null);

  const handleOnchange = () => {
    const value = recaptchaRef.current?.getValue();
    value && setToken(value);
  };

  useQuery<IApiResponse<string>>(
    [QUERY_KEYS.GET_GOOGLE_RECAPTCHA_TOKEN],
    getGoogleRecaptchaSiteKey,
    {
      onSuccess: res => setSiteKey(res.data.data),
      refetchOnWindowFocus: false,
    }
  );

  return (
    <div className='w-full flex justify-center'>
      {
        siteKey && <Recaptcha
          ref={recaptchaRef}
          sitekey={siteKey}
          size='normal'
          onChange={handleOnchange}
          onExpired={() => setToken('')}
        />
      }
    </div>
  );
};
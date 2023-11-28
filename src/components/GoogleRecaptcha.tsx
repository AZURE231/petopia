import { useEffect, useRef, useState } from 'react';
import Recaptcha from 'react-google-recaptcha';
import { useQuery } from '../utils/hooks';
import { EVENT_NAMES, QUERY_KEYS } from '../utils/constants';
import { IApiResponse } from '../interfaces/common';
import { getGoogleRecaptchaSiteKey } from '../services/authentication.api';
import { subscribe, unsubscribe } from '../services/event';

interface IGoogleRecaptcha{
  setToken: (value: string) => void,
}

export const GoogleRecaptcha = (props: IGoogleRecaptcha) => {
  const { setToken } = props;
  const [siteKey, setSiteKey] = useState<string>('');
  const ref = useRef<Recaptcha>(null);

  const handleOnchange = () => {
    const value = ref.current?.getValue();
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

  useEffect(() => {
    subscribe(
      EVENT_NAMES.RESET_RECAPTCHA,
      () => {
        ref.current?.reset();
      }
    );

    return () => {
      unsubscribe(
        EVENT_NAMES.RESET_RECAPTCHA,
        () => {
          ref.current?.reset();
        }
      );
    };
  }, []);

  return (
    <div className='w-full flex justify-center'>
      {
        siteKey && <Recaptcha
          ref={ref}
          sitekey={siteKey}
          size='normal'
          onChange={handleOnchange}
          onExpired={() => setToken('')}
        />
      }
    </div>
  );
};
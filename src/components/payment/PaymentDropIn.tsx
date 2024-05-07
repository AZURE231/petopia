import { useQuery } from '@/src/utils/hooks';
import { getPaymentToken } from '@/src/services/payment.api';
import { useEffect, useState } from 'react'; // Removed unnecessary import
import { IApiResponse } from '@/src/interfaces/common';
import { QUERY_KEYS } from '@/src/utils/constants';
import { Alert } from '../general/Alert';
import * as braintree from 'braintree-web-drop-in'; // Changed import statement

export default function PaymentDropIn() {
  const [clientToken, setClientToken] = useState<string>('');
  const [alertShow, setAlertShow] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string>('');
  const [alertFailed, setAlertFailed] = useState<boolean>(false);

  useQuery<IApiResponse<string>>(
    [QUERY_KEYS.GET_PAYMENT_TOKEN],
    () => getPaymentToken(),
    {
      onSuccess: (data) => {
        setClientToken(data.data.data);
      },
      onError: () => {
        setAlertMessage('Server thanh toán gặp lỗi. Vui lòng thử lại sau.');
        setAlertFailed(true);
        setAlertShow(true);
      },
    }
  );

  useEffect(() => {
    const dropinContainer = document.getElementById('dropin-container');
    if (clientToken && dropinContainer) {
      braintree.create(
        {
          authorization: clientToken,
          container: '#dropin-container',
          card: {
            cardholderName: {
              required: true,
            },
            overrides: {
              fields: {
                cvv: {
                  placeholder: '123',
                  selector: '#dropin-container #cvv',
                },
              },
              styles: {
                input: {
                  'font-size': '16px',
                  'font-family': 'courier, monospace',
                  color: '#3A3A3A',
                },
                ':focus': {
                  color: 'black',
                },
                '.valid': {
                  color: '#4F8A10',
                },
                '.invalid': {
                  color: '#D8000C',
                },
              },
            },
          },
        },
        (error, dropinInstance) => {
          if (error) {
            console.error('Braintree error:', error);
            return;
          }
        }
      );
    }
  }, [clientToken]);

  return (
    <div style={{ maxWidth: '400px', margin: 'auto', marginTop: '50px' }}>
      <h1 style={{ textAlign: 'center' }}>Thanh toán</h1>
      <div id="dropin-container"></div>
      <Alert
        message={alertMessage}
        show={alertShow}
        setShow={setAlertShow}
        failed={alertFailed}
      />
    </div>
  );
}

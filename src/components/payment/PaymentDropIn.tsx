import { useQuery } from '@/src/utils/hooks';
import { getPaymentToken } from '@/src/services/payment.api';
import { useEffect, useState } from 'react';
import { IApiResponse } from '@/src/interfaces/common';
import { QUERY_KEYS } from '@/src/utils/constants';
import { Alert } from '../general/Alert';
import * as braintree from 'braintree-web-drop-in';

export default function PaymentDropIn({
  setNonce,
}: {
  setNonce: (nonce: string) => void;
}) {
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
    if (clientToken) {
      braintree.create(
        {
          authorization: clientToken,
          container: '#dropin-container',
          card: {
            cardholderName: {
              required: true,
            },
            overrides: {
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
          let submitButton = document.getElementById('payment-btn');
          submitButton?.addEventListener('click', () => {
            dropinInstance?.requestPaymentMethod((error, payload) => {
              if (error) {
                console.error('Braintree error:', error);
                setAlertMessage('Thẻ không hợp lệ. Vui lòng thử lại.');
                setAlertFailed(true);
                setAlertShow(true);
                return;
              }
              setNonce(payload.nonce);
            });
          });
        }
      );
    }
  }, [clientToken]);

  return (
    <div style={{ maxWidth: '400px', margin: 'auto' }}>
      <div id="dropin-container"></div>
      {clientToken && (
        <button
          id="payment-btn"
          className="btn btn-primary text-center w-full border rounded border-gray-400 hover:bg-gray-100"
        >
          Xác nhận thẻ
        </button>
      )}

      <Alert
        message={alertMessage}
        show={alertShow}
        setShow={setAlertShow}
        failed={alertFailed}
      />
    </div>
  );
}

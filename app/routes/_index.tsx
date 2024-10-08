import type { MetaFunction } from "@remix-run/node";
import GooglePayButton from '@google-pay/button-react';
import { useState } from "react";
export const meta: MetaFunction = () => {
  return [
    { title: "GPay Checkout" },
    { name: "description", content: "Checkout with GPay" },
  ];
};

const products = [
  {
    name: "Blue t-shirt",
    price: 29.99,
  },
  {
    name: "Green t-shirt",
    price: 39.99,
  },
];

export default function Index() {
  const [paymentData, setPaymentData] = useState(null);
  return (
    <div className="flex h-screen items-center justify-center">
        <div className="w-full max-w-md p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">Checkout</h2>
          <ul className="space-y-4 mb-6">
            {products.map((product) => (
              <li className="flex justify-between items-center">
              <span className="text-gray-700 dark:text-gray-300">{product.name}</span>
              <span className="font-medium text-gray-900 dark:text-gray-100">${product.price}</span>
            </li>
            ))}
          </ul>
          <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mb-6">
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold text-gray-900 dark:text-white">Total</span>
              <span className="text-lg font-semibold text-gray-900 dark:text-white">${products.reduce((acc, product) => acc + product.price, 0)}</span>
            </div>
          </div>
          <div >
            <div className="flex justify-center items-center">
          <GooglePayButton
                environment="PRODUCTION"
                buttonColor="black"

                paymentRequest={{
                  callbackIntents: ['PAYMENT_AUTHORIZATION'],
                  apiVersion: 2,
                  apiVersionMinor: 0,
                  allowedPaymentMethods: [
                    {
                      type: 'CARD',
                      parameters: {
                        allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
                        allowedCardNetworks: ['MASTERCARD', 'VISA'],
                      },
                      tokenizationSpecification: {
                        type: 'PAYMENT_GATEWAY',
                        parameters: {
                          gateway: 'ariane',
                          gatewayMerchantId: 'exampleGatewayMerchantId',
                        },
                      },
                    },
                  ],
                  merchantInfo: {
                    merchantId: '14697717800897553235',
                    merchantName: 'Demo Merchant',
                  },
                  transactionInfo: {
                    totalPriceStatus: 'FINAL',
                    totalPriceLabel: 'Total',
                    totalPrice: `${products.reduce((acc, product) => acc + product.price, 0)}`,
                    currencyCode: 'USD',
                    countryCode: 'US',
                  },
                }}
                onPaymentAuthorized={paymentData => {
                  console.log('payment authorized', paymentData);
                  setPaymentData(paymentData);
                  return {
                    transactionState: 'SUCCESS',
                  };
                }}
              /> 
              </div>
              {
                paymentData && (
                  <div className="overflow-x-auto overflow-y-scroll mt-4">
                <pre className="text-sm text-gray-700 dark:text-gray-300 
                whitespace-pre-wrap break-words bg-gray-100 dark:bg-gray-800 p-4 rounded-md
                max-h-96
                 overflow-y-scroll">
                  {JSON.stringify(paymentData, null, 2)}
                </pre>
                </div>
                )
              }
          </div>
        </div>
    </div>
  );
}
/**
 * Lazy Paystack Inline SDK Loader
 * Dynamically loads the Paystack v1 inline popup SDK on demand, avoiding blocking the initial page bundle.
 */

let paystackPromise = null;

export const loadPaystackScript = () => {
  if (typeof window === 'undefined') return Promise.reject(new Error('Window not available'));

  if (window.PaystackPop) {
    return Promise.resolve(window.PaystackPop);
  }

  if (paystackPromise) {
    return paystackPromise;
  }

  paystackPromise = new Promise((resolve, reject) => {
    // Check if script already exists in DOM
    const existingScript = document.querySelector('script[src*="paystack.co/v1/inline.js"]');
    if (existingScript) {
      existingScript.addEventListener('load', () => resolve(window.PaystackPop));
      existingScript.addEventListener('error', (err) => reject(new Error('Failed to load Paystack script')));
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://js.paystack.co/v1/inline.js';
    script.async = true;
    script.id = 'paystack-inline-js';

    script.onload = () => {
      if (window.PaystackPop) {
        resolve(window.PaystackPop);
      } else {
        reject(new Error('PaystackPop not found on window after script load'));
      }
    };

    script.onerror = (error) => {
      paystackPromise = null;
      reject(new Error('Failed to load Paystack inline script: ' + error));
    };

    document.head.appendChild(script);
  });

  return paystackPromise;
};

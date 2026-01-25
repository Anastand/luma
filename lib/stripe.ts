import Stripe from 'stripe';

let stripeInstance: Stripe | null = null;

// export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!); only for dev

export const stripe = (): Stripe => { // for deployment
  if (!stripeInstance) {
    const secretKey = process.env.STRIPE_SECRET_KEY;
    if (!secretKey) {
      throw new Error('STRIPE_SECRET_KEY is not set');
    }
    stripeInstance = new Stripe(secretKey);
  }
  return stripeInstance;
};
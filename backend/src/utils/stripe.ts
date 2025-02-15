import Stripe from 'stripe';
import dotenv from 'dotenv';

dotenv.config();

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
if (!stripeSecretKey) {
    throw new Error('STRIPE_SECRET_KEY is not defined in environment variables.');
}


const stripe = new Stripe(stripeSecretKey, { apiVersion: '2025-01-27.acacia' });

export const createCheckoutSession = async (
    amount: number,
    couponCode?: string,
    currency: string = 'usd',
    domain: string = 'http://localhost:5173',
    metadata?: { [key: string]: string }
): Promise<Stripe.Checkout.Session> => {
    let finalAmount = amount;
    if (couponCode) {
        const coupons: { [code: string]: number } = {
            'DISCOUNT10': 0.10, 
            'DISCOUNT20': 0.20,
        };
        const discount = coupons[couponCode.toUpperCase()];
        if (discount) {
            finalAmount = Math.round(amount * (1 - discount));
        }
    }

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
            {
                price_data: {
                    currency,
                    product_data: {
                        name: 'Parcel Delivery Fee',
                    },
                    unit_amount: finalAmount,
                },
                quantity: 1,
            },
        ],
        mode: 'payment',
        success_url: `${domain}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${domain}/cancel`,
        metadata,
    });
    return session;
};


export const getCheckoutSession = async (sessionId: string): Promise<Stripe.Checkout.Session> => {
    try {
        const session = await stripe.checkout.sessions.retrieve(sessionId);
        return session;
    } catch (error: any) {
        throw new Error(`Failed to retrieve checkout session: ${error.message}`);
    }
};


export const LOCATIONS: string[] = [
    'nairobi',
    'nyeri',
    'kisumu',
    'kiambu',
    'narok',
    'nanyuki',
    'meru',
    'kakamega',
    'mombasa',
    'thika',
    'nakuru',
];

export default stripe;

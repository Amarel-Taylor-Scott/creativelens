import { Router, Request, Response } from 'express';
import { z } from 'zod';

const router = Router();

const PLANS = {
  free: { price_monthly: 0, price_yearly: 0, api_limit: 100, analyses: 5 },
  pro: { price_monthly: 1900, price_yearly: 19000, api_limit: 1000, analyses: -1 },
  agency: { price_monthly: 7900, price_yearly: 79000, api_limit: 5000, analyses: -1 },
};

const checkoutSchema = z.object({
  tier: z.enum(['pro', 'agency']),
  billing_period: z.enum(['monthly', 'yearly']).default('monthly'),
});

// GET /api/v1/subscription - Get current subscription
router.get('/', async (_req: Request, res: Response) => {
  try {
    // TODO: Requires auth
    // const sub = await db('subscriptions').where({ user_id: req.user.id }).first();

    res.json({
      success: true,
      data: {
        tier: 'free',
        stripe_customer_id: null,
        current_period_start: null,
        current_period_end: null,
        cancel_at_period_end: false,
        credits: {
          premium: 0,
          gift: 0,
          signup: 5,
          referral: 0,
        },
      },
    });
  } catch (err) {
    console.error('Get subscription error:', err);
    res.status(500).json({ success: false, error: 'Failed to fetch subscription' });
  }
});

// POST /api/v1/checkout - Create Stripe checkout session
router.post('/checkout', async (req: Request, res: Response) => {
  try {
    const body = checkoutSchema.parse(req.body);

    // TODO: Requires auth + Stripe integration
    // const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    // const session = await stripe.checkout.sessions.create({
    //   customer_email: req.user.email,
    //   line_items: [{ price: priceId, quantity: 1 }],
    //   mode: 'subscription',
    //   success_url: `${process.env.ORIGIN}/settings/billing?success=true`,
    //   cancel_url: `${process.env.ORIGIN}/pricing`,
    // });

    res.json({
      success: true,
      data: {
        checkout_url: '#stripe-checkout-placeholder',
        tier: body.tier,
        billing_period: body.billing_period,
        message: 'Connect Stripe to enable checkout',
      },
    });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return res.status(400).json({ success: false, error: 'Validation failed', details: err.errors });
    }
    console.error('Checkout error:', err);
    res.status(500).json({ success: false, error: 'Failed to create checkout session' });
  }
});

// POST /api/v1/webhooks/stripe - Stripe webhook handler
router.post('/webhooks/stripe', async (req: Request, res: Response) => {
  try {
    // TODO: Verify webhook signature
    // const sig = req.headers['stripe-signature'];
    // const event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
    //
    // switch (event.type) {
    //   case 'checkout.session.completed':
    //     // Create or update subscription
    //     break;
    //   case 'invoice.paid':
    //     // Extend subscription period
    //     break;
    //   case 'customer.subscription.deleted':
    //     // Downgrade to free
    //     break;
    // }

    res.json({ received: true });
  } catch (err) {
    console.error('Stripe webhook error:', err);
    res.status(400).json({ success: false, error: 'Webhook processing failed' });
  }
});

// GET /api/v1/billing/history - Get billing history
router.get('/billing/history', async (_req: Request, res: Response) => {
  try {
    // TODO: Requires auth + Stripe
    // const invoices = await stripe.invoices.list({ customer: sub.stripe_customer_id });

    res.json({
      success: true,
      data: { invoices: [] },
    });
  } catch (err) {
    console.error('Billing history error:', err);
    res.status(500).json({ success: false, error: 'Failed to fetch billing history' });
  }
});

export default router;

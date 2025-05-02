import { Injectable } from '@nestjs/common'
import { envs } from 'src/config'
import Stripe from 'stripe'
import { PaymentSessionDto } from './dto/payment-session.dto'
import { Request, Response } from 'express'

@Injectable()
export class PaymentsService {
  private readonly stripe = new Stripe(envs.stripeSecret)

  async createPaymentSession(paymentSessionDto: PaymentSessionDto) {
    const { currency, items } = paymentSessionDto

    const lineItems = items.map((item) => {
      return {
        price_data: {
          currency: currency,
          product_data: {
            name: item.name,
          },
          unit_amount: Math.round(item.price * 100),
        },
        quantity: item.quantity,
      }
    })

    const session = await this.stripe.checkout.sessions.create({
      //* Colocar aqui el ID de mi orden
      payment_intent_data: {
        metadata: {},
      },

      //* Colocar los items que se está comprando
      line_items: lineItems,
      mode: 'payment',
      success_url: 'http://localhost:3003/payments/success',
      cancel_url: 'http://localhost:3003/payments/cancel',
    })

    return session
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  async stripeWebhook(req: Request, res: Response) {
    const sig = req.headers['stripe-signature']

    console.log({ sig })
    return res.status(200).json({ sig })
  }
}

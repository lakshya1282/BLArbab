
import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { sendSMS } from '@/lib/sms'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabase = createClient(supabaseUrl, supabaseAnonKey)

export async function POST(request: Request) {
  try {
    const { orderId, status, mobile, customerName, type, paymentStatus } = await request.json()

    // Handle Payment Status Update
    if (type === 'payment') {
      const { error } = await supabase
        .from('orders')
        .update({ payment_status: paymentStatus })
        .eq('id', orderId)

      if (error) throw error
      return NextResponse.json({ success: true })
    }

    // Handle Order Status Update
    const { error } = await supabase
      .from('orders')
      .update({ status })
      .eq('id', orderId)

    if (error) throw error

    // Send SMS notification
    let message = ""
    switch (status) {
      case 'preparing':
        message = `Hello ${customerName}, your order is now being prepared! 🍳`
        break
      case 'ready':
        message = `Hello ${customerName}, your order is READY! Please pick it up at the counter. ☕`
        break
      case 'completed':
        message = `Thank you for dining with Brownland Coffee! We hope to see you again soon. ✨`
        break
      case 'cancelled':
        message = `Hello ${customerName}, unfortunately your order has been cancelled. Please contact staff for details.`
        break
    }

    if (message) {
      // Basic number formatting
      let formattedMobile = mobile.trim()
      if (!formattedMobile.startsWith('+')) {
         // Default to India +91 if 10 digits provided
         if (formattedMobile.length === 10) formattedMobile = `+91${formattedMobile}`
         else formattedMobile = `+${formattedMobile}`
      }
      
      await sendSMS(formattedMobile, message)
    }

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('Error updating order:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

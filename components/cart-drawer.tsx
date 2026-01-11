"use client"

import { useCart } from "@/lib/cart-context"
import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"
import { toast } from "sonner"

import { X, Plus, Minus, ShoppingBag, Printer, Check, Coffee, ClipboardList,Utensils, PackageCheck } from "lucide-react"

export function CartDrawer() {
  const { items, updateQuantity, clearCart, total, isOpen, setIsOpen } = useCart()
  const [step, setStep] = useState<"cart" | "checkout" | "status">("cart")
  const [loading, setLoading] = useState(false)
  const [activeOrder, setActiveOrder] = useState<any>(null)
  
  const [name, setName] = useState("")
  const [mobile, setMobile] = useState("")
  const [paymentMode, setPaymentMode] = useState("cash")

  // Load persistence and active order
  useEffect(() => {
    setName(localStorage.getItem("customer_name") || "")
    setMobile(localStorage.getItem("customer_mobile") || "")
    
    const storedOrderId = localStorage.getItem("active_order_id")
    if (storedOrderId) fetchActiveOrder(storedOrderId)
  }, [isOpen])

  // Real-time Update Listener
  useEffect(() => {
    if (!activeOrder?.id) return
    const channel = supabase
      .channel(`order-${activeOrder.id}`)
      .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'orders', filter: `id=eq.${activeOrder.id}` }, 
        (payload) => setActiveOrder(payload.new)
      ).subscribe()
    return () => { supabase.removeChannel(channel) }
  }, [activeOrder?.id])

  const fetchActiveOrder = async (orderId: string) => {
    const { data } = await supabase.from("orders").select("*").eq("id", orderId).single()
    if (data && !["completed", "cancelled"].includes(data.status)) {
      setActiveOrder(data)
      setStep("status")
    }
  }

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      localStorage.setItem("customer_name", name)
      localStorage.setItem("customer_mobile", mobile)

      const { data: order, error } = await supabase.from("orders").insert({
        customer_name: name, customer_mobile: mobile, total_amount: total,
        status: "pending", payment_status: "pending", payment_mode: paymentMode
      }).select().single()

      if (error) throw error
      const orderItems = items.map(i => ({ order_id: order.id, item_name: i.name, quantity: i.quantity, price: i.price }))
      await supabase.from("order_items").insert(orderItems)

      clearCart()
      localStorage.setItem("active_order_id", order.id)
      setActiveOrder(order)
      setStep("status")
      toast.success("Order received!")
    } catch (err: any) { toast.error(err.message) }
    finally { setLoading(false) }
  }

  // Helper for Status Card Styling
  const getStatusWeight = (s: string) => {
    const weights: Record<string, number> = { pending: 1, preparing: 2, ready: 3, completed: 4 }
    return weights[s] || 0
  }

  const StatusCard = ({ label, target, icon: Icon }: { label: string, target: string, icon: any }) => {
    const isActive = activeOrder?.status === target
    const isDone = getStatusWeight(activeOrder?.status) > getStatusWeight(target)
    
    return (
      <div className={`flex items-center gap-4 p-4 rounded-xl border transition-all duration-500 ${
        isActive ? "bg-[#834024] border-[#834024] shadow-md" : "bg-white/40 border-[#834024]/10"
      }`}>
        <div className={`p-2 rounded-lg ${isActive ? "bg-white/20 text-white" : "bg-[#834024]/10 text-[#834024]"}`}>
          {isDone ? <Check size={20} /> : <Icon size={20} />}
        </div>
        <div className="flex-1 text-left">
          <p className={`font-['Bebas_Neue'] tracking-wider text-lg ${isActive ? "text-white" : "text-[#834024]"}`}>{label}</p>
          <p className={`text-xs ${isActive ? "text-white/70" : "text-[#834024]/50"}`}>
            {isActive ? "Currently in this stage" : isDone ? "Completed" : "Waiting..."}
          </p>
        </div>
      </div>
    )
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setIsOpen(false)} />
      
      <div className="relative w-full max-w-md bg-[#F6EEE5] h-full shadow-2xl flex flex-col border-l border-[#834024]/20">
        {/* Header & Tabs */}
        <div className="p-6 bg-white/60 border-b border-[#834024]/10">
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-['Awesome_Serif'] italic text-3xl text-[#834024]">Brownland</h2>
            <button onClick={() => setIsOpen(false)} className="text-[#834024] p-1"><X size={28} /></button>
          </div>

          {activeOrder && (
            <div className="flex bg-[#834024]/5 p-1 rounded-xl">
              <button onClick={() => setStep("cart")} className={`flex-1 py-2 rounded-lg text-sm font-bold ${step !== 'status' ? 'bg-[#834024] text-white shadow-lg' : 'text-[#834024]'}`}>Order More</button>
              <button onClick={() => setStep("status")} className={`flex-1 py-2 rounded-lg text-sm font-bold ${step === 'status' ? 'bg-[#834024] text-white shadow-lg' : 'text-[#834024]'}`}>Track Order</button>
            </div>
          )}
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {step === "status" && activeOrder ? (
            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4">
              <div className="text-center py-4">
                <p className="font-['Bebas_Neue'] text-[#834024]/40 tracking-[0.2em]">ORDER #{activeOrder.order_number}</p>
                <h3 className="text-4xl font-bold text-[#5D2B18] font-['Awesome_Serif'] italic mt-1">Tracker</h3>
              </div>
              
              <StatusCard label="Order Received" target="pending" icon={ClipboardList} />
              <StatusCard label="Kitchen is Preparing" target="preparing" icon={Coffee} />
              <StatusCard label="Ready for Pickup" target="ready" icon={PackageCheck} />

              <button className="w-full flex items-center justify-center gap-2 text-[#834024] font-bold py-4 mt-6 border-2 border-dashed border-[#834024]/20 rounded-xl hover:bg-[#834024]/5">
                <Printer size={18} /> Download Receipt
              </button>
            </div>
          ) : step === "checkout" ? (
            <form id="checkout-form" onSubmit={handleCheckout} className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-[#834024]">Full Name</label>
                <input type="text" required value={name} onChange={(e) => setName(e.target.value)} className="w-full p-4 rounded-xl bg-white border border-[#834024]/20 text-[#5D2B18] focus:ring-2 ring-[#834024]/20 outline-none" placeholder="Your name" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-[#834024]">Mobile Number</label>
                <input type="tel" required value={mobile} onChange={(e) => setMobile(e.target.value)} className="w-full p-4 rounded-xl bg-white border border-[#834024]/20 text-[#5D2B18] focus:ring-2 ring-[#834024]/20 outline-none" placeholder="10-digit mobile" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-[#834024]">Payment Method</label>
                <div className="grid grid-cols-2 gap-2">
                  {['cash', 'upi'].map((m) => (
                    <button key={m} type="button" onClick={() => setPaymentMode(m)} className={`p-4 rounded-xl border font-bold capitalize ${paymentMode === m ? 'bg-[#834024] text-white border-[#834024]' : 'bg-white text-[#834024] border-[#834024]/20'}`}>{m}</button>
                  ))}
                </div>
              </div>
            </form>
          ) : (
            <>
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full opacity-30 text-[#834024]">
                  <ShoppingBag size={64} strokeWidth={1} />
                  <p className="mt-4 font-['Bebas_Neue'] text-2xl tracking-widest">Cart is empty</p>
                </div>
              ) : (
                items.map(item => (
                  <div key={item.name} className="flex justify-between items-center bg-white/60 p-5 rounded-2xl border border-[#834024]/5 shadow-sm">
                    <div className="space-y-1">
                      <h4 className="font-bold text-[#5D2B18] text-lg leading-none">{item.name}</h4>
                      <p className="text-[#834024] font-['Awesome_Serif'] italic font-bold">₹{item.price * item.quantity}</p>
                    </div>
                    <div className="flex items-center bg-[#834024] rounded-lg p-1 text-white">
                       <button onClick={() => updateQuantity(item.name, item.quantity - 1)} className="p-1 hover:bg-white/10 rounded"><Minus size={16}/></button>
                       <span className="w-8 text-center font-bold">{item.quantity}</span>
                       <button onClick={() => updateQuantity(item.name, item.quantity + 1)} className="p-1 hover:bg-white/10 rounded"><Plus size={16}/></button>
                    </div>
                  </div>
                ))
              )}
            </>
          )}
        </div>

        {/* Footer actions */}
        {step !== "status" && items.length > 0 && (
          <div className="p-6 bg-white/80 border-t border-[#834024]/10">
            <div className="flex justify-between mb-4">
              <span className="text-[#834024]/60 font-bold uppercase text-xs tracking-widest">To Pay</span>
              <span className="text-2xl font-['Awesome_Serif'] font-bold text-[#5D2B18]">₹{total}</span>
            </div>
            <button 
              onClick={() => step === 'cart' ? setStep('checkout') : undefined}
              form={step === 'checkout' ? 'checkout-form' : undefined}
              type={step === 'checkout' ? 'submit' : 'button'}
              disabled={loading}
              className="w-full bg-[#834024] text-white py-5 rounded-2xl font-['Bebas_Neue'] text-xl tracking-[0.2em] shadow-xl hover:bg-[#5D2B18] transition-colors disabled:opacity-50"
            >
              {loading ? "PROCESSING..." : step === "cart" ? "PROCEED TO CHECKOUT" : "CONFIRM & PLACE ORDER"}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
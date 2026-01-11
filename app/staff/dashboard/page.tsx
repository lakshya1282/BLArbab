"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"
import { toast } from "sonner"
import { LogOut, RefreshCcw, ChefHat, CheckCircle, XCircle, Search, Lock, Zap } from "lucide-react"

type Order = {
  id: string
  order_number: number
  customer_name: string
  customer_mobile: string
  status: string
  payment_status: string
  payment_mode: string
  total_amount: number
  created_at: string
  order_items: {
    id: string
    item_name: string
    quantity: number
    price: number
  }[]
}

export default function StaffDashboard() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const router = useRouter()

  // 1. Initial Fetch
  const fetchOrders = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from("orders")
      .select("*, order_items(*)")
      .order("created_at", { ascending: false })

    if (error) {
      toast.error("Failed to fetch orders")
    } else {
      setOrders(data || [])
    }
    setLoading(false)
  }

  // 2. Setup Realtime Subscription
  useEffect(() => {
    const user = localStorage.getItem("staff_user")
    if (!user) {
      router.push("/staff/login")
      return
    }

    fetchOrders()

    // Listen for ALL changes (INSERT, UPDATE, DELETE)
    const channel = supabase
      .channel('realtime_orders')
      .on(
        'postgres_changes', 
        { event: '*', schema: 'public', table: 'orders' }, 
        (payload) => {
          console.log('Change received!', payload)
          // Instead of just calling fetchOrders(), we handle the UI update immediately
          fetchOrders() 
        }
      )
      .subscribe((status) => {
        if (status === 'SUBSCRIBED') {
          console.log('Realtime connected!')
        }
      })

    return () => {
      supabase.removeChannel(channel)
    }
  }, [])

  const updateOrderStatus = async (order: Order, status: string) => {
    if (status === "completed" && order.payment_status !== "paid") {
      toast.error("Payment Required", {
        description: `Order #${order.order_number} must be 'Paid' before completion.`,
      })
      return
    }

    // Optimistic UI Update
    setOrders(prev => prev.map(o => o.id === order.id ? { ...o, status } : o))
    
    try {
      const res = await fetch('/api/orders/update-status', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderId: order.id,
          status,
          mobile: order.customer_mobile,
          customerName: order.customer_name
        })
      })

      if (!res.ok) throw new Error('Failed to update')
      toast.success(`Order #${order.order_number} is now ${status}`)
    } catch (error) {
      toast.error("Sync failed")
      fetchOrders() 
    }
  }

  const updatePaymentStatus = async (order: Order, paymentStatus: string) => {
    setOrders(prev => prev.map(o => o.id === order.id ? { ...o, payment_status: paymentStatus } : o))
    
    try {
       const res = await fetch('/api/orders/update-status', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderId: order.id,
          paymentStatus,
          type: 'payment'
        })
      })
       if (!res.ok) throw new Error('Failed to update')
       toast.success("Payment Updated")
    } catch (error) {
      toast.error("Failed to update payment")
      fetchOrders()
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("staff_user")
    router.push("/staff/login")
  }

  const filteredOrders = orders.filter(order => 
    order.customer_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.order_number.toString().includes(searchTerm) ||
    order.customer_mobile.includes(searchTerm)
  )

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-500/10 text-yellow-700 border-yellow-200'
      case 'preparing': return 'bg-blue-500/10 text-blue-700 border-blue-200'
      case 'ready': return 'bg-purple-500/10 text-purple-700 border-purple-200'
      case 'completed': return 'bg-green-500/10 text-green-700 border-green-200'
      case 'cancelled': return 'bg-red-500/10 text-red-700 border-red-200'
      default: return 'bg-gray-100 text-gray-700 border-gray-200'
    }
  }

  return (
    <div className="min-h-screen bg-[#F6EEE5]">
      <header className="bg-[#834024] text-[#F6EEE5] px-6 py-4 shadow-md sticky top-0 z-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h1 className="font-['Awesome_Serif'] italic text-2xl font-bold">Staff Portal</h1>
            <div className="flex items-center gap-1 bg-green-500/20 px-2 py-0.5 rounded-full border border-green-500/30">
               <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
               <span className="text-[10px] font-bold uppercase tracking-widest text-green-200">Live</span>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
             <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50" size={16} />
              <input 
                type="text" 
                placeholder="Search orders..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-white/10 border border-white/20 rounded-full pl-10 pr-4 py-1.5 text-sm text-white placeholder:text-white/50 focus:outline-none focus:bg-white/20"
              />
            </div>
            <button 
              onClick={fetchOrders} 
              className="p-2 hover:bg-white/10 rounded-full transition-colors"
              title="Manual Sync"
            >
              <RefreshCcw size={20} className={loading ? "animate-spin" : ""} />
            </button>
            <button 
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors font-['Bebas_Neue'] tracking-wider text-sm"
            >
              <LogOut size={16} />
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="p-6">
        <div className="bg-white/80 backdrop-blur rounded-xl shadow-xl border border-[#834024]/10 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
                <thead className="bg-[#834024]/5 border-b border-[#834024]/10 font-['Bebas_Neue'] tracking-wider text-[#834024]">
                <tr>
                    <th className="px-6 py-4 w-16">ID</th>
                    <th className="px-4 py-4">Time</th>
                    <th className="px-4 py-4">Customer</th>
                    <th className="px-4 py-4 w-1/3">Items</th>
                    <th className="px-4 py-4 text-right">Total</th>
                    <th className="px-4 py-4">Payment</th>
                    <th className="px-4 py-4">Status</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                </tr>
                </thead>
                <tbody className="divide-y divide-[#834024]/10 font-['Lato']">
                {filteredOrders.length === 0 ? (
                    <tr>
                    <td colSpan={8} className="px-4 py-12 text-center text-[#834024]/50 italic">
                        No orders currently in the queue
                    </td>
                    </tr>
                ) : (
                    filteredOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-[#834024]/5 transition-colors group">
                        <td className="px-6 py-4 font-bold text-[#834024]">#{order.order_number}</td>
                        <td className="px-4 py-4 text-[#834024]/60 whitespace-nowrap">
                        {new Date(order.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </td>
                        <td className="px-4 py-4">
                        <div className="font-bold text-[#834024]">{order.customer_name}</div>
                        <div className="text-xs text-[#834024]/60">{order.customer_mobile}</div>
                        </td>
                        <td className="px-4 py-4">
                        <div className="flex flex-col gap-1">
                            {order.order_items.map((item, i) => (
                            <div key={i} className="text-[#834024] flex justify-between">
                                <span><span className="font-bold text-xs bg-[#834024]/10 px-1.5 py-0.5 rounded mr-2">{item.quantity}</span> {item.item_name}</span>
                            </div>
                            ))}
                        </div>
                        </td>
                        <td className="px-4 py-4 text-right font-bold text-[#834024]">₹{order.total_amount}</td>
                        <td className="px-4 py-4">
                        <div className="flex flex-col gap-1.5">
                            <span className="text-[10px] text-[#834024]/50 uppercase font-black tracking-widest">{order.payment_mode || 'CASH'}</span>
                            <select 
                            value={order.payment_status || 'pending'}
                            onChange={(e) => updatePaymentStatus(order, e.target.value)}
                            className={`text-[11px] px-2 py-1 rounded border font-bold uppercase cursor-pointer focus:outline-none transition-all ${
                                order.payment_status === 'paid' 
                                ? 'bg-green-500 text-white border-green-600' 
                                : 'bg-yellow-400 text-yellow-900 border-yellow-500'
                            }`}
                            >
                            <option value="pending">Pending</option>
                            <option value="paid">Paid</option>
                            </select>
                        </div>
                        </td>
                        <td className="px-4 py-4">
                        <span className={`text-[10px] px-2.5 py-1 rounded-full border font-black uppercase tracking-widest ${getStatusColor(order.status)}`}>
                            {order.status}
                        </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-2 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
                            {order.status === "pending" && (
                            <button onClick={() => updateOrderStatus(order, "preparing")} className="p-2 bg-blue-500 text-white rounded-lg shadow-sm hover:bg-blue-600" title="Start Preparing">
                                <ChefHat size={18} />
                            </button>
                            )}
                            {order.status === "preparing" && (
                            <button onClick={() => updateOrderStatus(order, "ready")} className="p-2 bg-purple-500 text-white rounded-lg shadow-sm hover:bg-purple-600" title="Mark Ready">
                                <CheckCircle size={18} />
                            </button>
                            )}
                            {order.status === "ready" && (
                            <button 
                                onClick={() => updateOrderStatus(order, "completed")} 
                                className={`p-2 rounded-lg shadow-sm transition-all ${
                                    order.payment_status === 'paid' 
                                    ? "bg-green-600 text-white hover:bg-green-700" 
                                    : "bg-gray-200 text-gray-400 cursor-not-allowed"
                                }`} 
                                title={order.payment_status === 'paid' ? "Complete Order" : "Payment Required"}
                            >
                                {order.payment_status === 'paid' ? <CheckCircle size={18} /> : <Lock size={18} />}
                            </button>
                            )}
                            {!["completed", "cancelled"].includes(order.status) && (
                            <button onClick={() => updateOrderStatus(order, "cancelled")} className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200" title="Cancel">
                                <XCircle size={18} />
                            </button>
                            )}
                        </div>
                        </td>
                    </tr>
                    ))
                )}
                </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  )
}
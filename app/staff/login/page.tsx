
"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"
import { toast } from "sonner"
import { Eye, EyeOff, Lock, User } from "lucide-react"

export default function StaffLogin() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const { data, error } = await supabase
        .from("staff_users")
        .select("*")
        .eq("username", username)
        .eq("password_hash", password) // Simple check for now
        .single()

      if (error || !data) {
        throw new Error("Invalid credentials")
      }

      // Set session (simplified)
      localStorage.setItem("staff_user", JSON.stringify(data))
      toast.success("Login successful")
      router.push("/staff/dashboard")
    } catch (error: any) {
      toast.error(error.message || "Login failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#F6EEE5] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white/60 backdrop-blur-xl border border-[#834024]/10 p-8 rounded-2xl shadow-xl">
        <div className="text-center mb-8">
          <h1 className="font-['Awesome_Serif'] italic text-4xl text-[#834024] mb-2">Staff Login</h1>
          <p className="font-['Lato'] text-[#834024]/60">Access the order management system</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="font-['Bebas_Neue'] tracking-wider text-[#834024]">Username</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 text-[#834024]/40" size={20} />
              <input 
                type="text" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white/60 border border-[#834024]/20 rounded-lg focus:outline-none focus:border-[#834024] text-[#834024]"
                placeholder="Enter username"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="font-['Bebas_Neue'] tracking-wider text-[#834024]">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-[#834024]/40" size={20} />
              <input 
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-12 py-3 bg-white/60 border border-[#834024]/20 rounded-lg focus:outline-none focus:border-[#834024] text-[#834024]"
                placeholder="Enter password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#834024]/40 hover:text-[#834024]"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#834024] text-[#F6EEE5] py-4 rounded-lg font-['Bebas_Neue'] tracking-widest text-lg hover:bg-[#834024]/90 transition-colors disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  )
}

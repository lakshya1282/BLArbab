
"use client"

import React, { createContext, useContext, useState, useEffect } from "react"
import { toast } from "sonner"

export type CartItem = {
  name: string
  price: number
  quantity: number
}

type CartContextType = {
  items: CartItem[]
  addItem: (item: Omit<CartItem, "quantity">) => void
  removeItem: (name: string) => void
  updateQuantity: (name: string, quantity: number) => void
  clearCart: () => void
  total: number
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [isOpen, setIsOpen] = useState(false)

  // Load cart from local storage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("cart")
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart))
      } catch (e) {
        console.error("Failed to parse cart", e)
      }
    }
  }, [])

  // Save cart to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(items))
  }, [items])

  const addItem = (item: Omit<CartItem, "quantity">) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.name === item.name)
      if (existing) {
        toast.success(`Increased quantity of ${item.name}`)
        return prev.map((i) =>
          i.name === item.name ? { ...i, quantity: i.quantity + 1 } : i
        )
      }
      toast.success(`Added ${item.name} to cart`)
      return [...prev, { ...item, quantity: 1 }]
    })
  }

  const removeItem = (name: string) => {
    setItems((prev) => prev.filter((i) => i.name !== name))
    toast.info("Item removed from cart")
  }

  const updateQuantity = (name: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(name)
      return
    }
    setItems((prev) =>
      prev.map((i) => (i.name === name ? { ...i, quantity } : i))
    )
  }

  const clearCart = () => {
    setItems([])
    localStorage.removeItem("cart")
  }

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        total,
        isOpen,
        setIsOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}

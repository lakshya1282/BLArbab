
-- Run these commands in your Supabase SQL Editor

-- Table for Menu Items (Optional if you want to manage menu dynamically)
CREATE TABLE IF NOT EXISTS menu_items (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  category TEXT,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table for Orders
CREATE TABLE IF NOT EXISTS orders (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  customer_name TEXT NOT NULL,
  customer_mobile TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending', -- pending, preparing, ready, completed, cancelled
  total_amount DECIMAL(10, 2) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table for Order Items
CREATE TABLE IF NOT EXISTS order_items (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
  item_name TEXT NOT NULL,
  quantity INTEGER NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table for Staff Users
CREATE TABLE IF NOT EXISTS staff_users (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL, -- Store hashed passwords
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert a default staff user (password: admin123)
-- Note: In a real app, use proper hashing (bcrypt). This is a placeholder for simple comparison.
INSERT INTO staff_users (username, password_hash) 
VALUES ('admin', 'admin123')
ON CONFLICT (username) DO NOTHING;

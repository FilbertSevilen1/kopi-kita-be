import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

dotenv.config()

const supabaseUrl = process.env.SUPABASE_URL
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceRoleKey) {
  console.error('Missing env vars')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

async function main() {
  const { data, error } = await supabase.auth.admin.createUser({
    email: 'admin@gmail.com',
    password: '123456',
    email_confirm: true
  })

  if (error) {
    if (error.message.includes('already exists')) {
       console.log('User already exists')
    } else {
       console.error('Error creating user:', error)
    }
  } else {
    console.log('User created:', data.user.email)
  }
}

main()


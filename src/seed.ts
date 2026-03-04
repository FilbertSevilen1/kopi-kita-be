import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

dotenv.config()


const supabaseAdmin = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

async function seed() {
  console.log('[seed] Seeding admin user...')

  const { data, error } = await supabaseAdmin.auth.admin.createUser({
    email: 'admin@kopikita.com',
    password: '123456',
    email_confirm: true,
  })

  if (error) {
    if (error.message.toLowerCase().includes('already') || error.message.toLowerCase().includes('duplicate')) {
      console.log('[seed] Admin user already exists, skipping.')
    } else {
      console.error('[seed] Error creating admin user:', error.message)
      process.exit(1)
    }
  } else {
    console.log('[seed] Admin user created:', data.user?.email)
  }

  console.log('[seed] Done.')
  process.exit(0)
}

seed()

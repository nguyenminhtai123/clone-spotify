import Head from 'next/head'
import { Inter } from 'next/font/google'
import Sidebar from '@/components/Sidebar'
import Center from '@/components/Center'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <div className='bg-black h-screen overflow-hidden'>
      <Head>
        <title>Spotify 2.0</title>
        <meta name="description" content="Spotify by Tychicus web dev" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className='flex'>
        <Sidebar/>
        <Center/>
      </main>
    </div>
  )
}

import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
// import styles from '@/styles/Home.module.css'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
		<div class="columns has-background-primary">
			<div class="column">
				First column
			</div>
			<div class="column">
				Second column
			</div>
			<div class="column">
				Third column
			</div>
			<div class="column">
				Fourth column
			</div>
		</div>
    </>
  )
}

import type { NextPage } from 'next'
import 'bootstrap/dist/css/bootstrap.min.css';
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Layout from '../components/layout';
import { signIn, signOut, useSession } from "next-auth/client";

const Home: NextPage = () => {
  return (
    <div className="d-flex flex-column h-full">
    </div>
  )
}

export default Home

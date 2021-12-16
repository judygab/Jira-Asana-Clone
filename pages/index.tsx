import React, { useEffect } from "react";
import type { NextPage } from 'next'
import 'bootstrap/dist/css/bootstrap.min.css';
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Layout from '../components/layout';
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from 'next/router';

const Home: NextPage = () => {
    const { data: session } = useSession()
    const router = useRouter();

    useEffect(() => {
      if (!session) {
          router.push('/login')
        }
    }, [session])

  return (
    <p>Loading...</p>
  )
}

export default Home

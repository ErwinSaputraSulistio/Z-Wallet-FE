import Head from 'next/head'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'

export default function Verification() {
   const router = useRouter()
   const { id } = router.query
   const setVerifyStatus = (stat) => {
      if(id !== undefined) { 
         localStorage.setItem("verifyStatus", stat)
         router.push("/login") 
      }
   }
   useEffect(() => {
      if(id !== undefined) {
         axios.get(process.env.SERVER + "/users/verify/" + id)
         .then(() => { setVerifyStatus("Success") })
         .catch(() => { setVerifyStatus("Failed") })
      }
   }, [id])
   return(
      <div>
         <Head>
            <title>Z-Wallet | Verification</title>
         </Head>
      </div>
   )
}
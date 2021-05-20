import css from '../styles/css/others/TopUp.module.css'
import Head from 'next/head'
import CustomButton from '../components/diminutive/CustomButton'
import Navbar from '../components/substantial/Navbar'
import Sidemenu from '../components/substantial/Sidemenu'
import Footer from '../components/substantial/Footer'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import axios from 'axios'

// TOP-UP
export default function TopUp() {
   const router = useRouter()
   const [saldoAmount, setSaldoAmount] = useState(null)
   const [userData, setUserData] = useState(null)
   const saldoOption = [25000, 50000, 75000, 100000]
   // SALDO FUNCTION
   const topUpSaldo = () => {
      axios.post(process.env.SERVER + "/saldo/top-up/" + userData.user_id, {saldo: saldoAmount}, {
         headers: { authorization: 'Bearer ' + localStorage.getItem("jwtToken"), 'Content-Type': 'application/json' }
      })
      .then((res) => {
         Swal.fire(
            "Top-up berhasil!", 
            userData.user_name + ", top-up saldo kamu sebesar " + saldoAmount + " sudah selesai, nih! Sekarang, silahkan cek saldo kamu!", 
            "success") 
         .then(() => { router.push("/home") })
      })
      .catch((err) => { Swal.fire( "Oops!", err.response.data.errorMessage, "error") })
   }
   // USE EFFECT
   useEffect(() => {
      localStorage.setItem("selectedSidemenu", "Top Up")
      axios.post(process.env.SERVER + "/users/jwt", null, {
      headers: { authorization: 'Bearer ' + localStorage.getItem("jwtToken"), 'Content-Type': 'application/json' }
      })
      .then((res) => { setUserData(res.data.outputData) })
      .catch((err) => { console.log(err.response.data.errorMessage) })
   }, [])
   // RETURN
   return(
      <div className="showInAnimation">
         <Head>
            <title>Z-Wallet | Top Up</title>
         </Head>
         <Navbar/>
         <div className={css.topUp}>
            <Sidemenu/>
            <div className={"displayColumn " + css.topUpSaldo}>
               <div>
                  <div className={css.topUpSaldoTitle}>Top-Up Saldo</div>
                  <div className={css.topUpSaldoText}>Need more saldo to transfer? top-up here right now!</div>
                  <div className={css.topUpSaldoText}>Top-up process complete in less than 5 minutes!</div>
               </div>
               <div className={css.saldoAmountGroup}>
                  {saldoOption.map((item) => 
                     <div onClick = { () => { setSaldoAmount(item) } }>
                        <CustomButton
                           btnCls={css.selectAmountBtn}
                           bgClr={saldoAmount === item ? "#3CB371" : "#DADADA"}
                           btnBrdr={saldoAmount === item ? "0.15vw solid black" : "0.1vw solid #DADADA"}
                           btnDsbl={false}
                           txClr={saldoAmount === item ? "white" : "#88888F"}
                           btnType="submit"
                           value={item}
                        />
                     </div>
                  )}
               </div>
               <div>
                  <div className={css.topUpSaldoBtn} onClick={ () => { topUpSaldo() } }>
                     <CustomButton
                        btnCls={css.topUpSaldoBtnStyling}
                        bgClr={saldoAmount === null ? "#DADADA" : "#6379F4"}
                        btnBrdr={saldoAmount === null ? "0.1vw solid #DADADA" : "0.1vw solid #6379F4"}
                        btnDsbl={saldoAmount === null ? true : false}
                        txClr={saldoAmount === null ? "#88888F" : "white"}
                        btnType="submit"
                        value="Top Up"
                     />
                  </div>
                  <div className={css.topUpNote}>After top-up is <b>complete</b>,</div>
                  <div className={css.topUpNote}>we recommend you to <b>re-login</b> for avoiding unnecessary <b>bugs</b>!</div>
               </div>
            </div>
         </div>
         <Footer/>
      </div>
   )
}
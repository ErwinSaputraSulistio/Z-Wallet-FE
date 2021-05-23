import css from '../../styles/css/Substantial.module.css'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
// IMPORT IMAGE
import Dashboard from '../../public/img/sidemenuDashboard.png'
import Transfer from '../../public/img/sidemenuTransfer.png'
import Topup from '../../public/img/sidemenuTopup.png'
import Profile from '../../public/img/sidemenuProfile.png'
import DashboardActive from '../../public/img/sidemenuDashboardActive.png'
import TransferActive from '../../public/img/sidemenuTransferActive.png'
import TopupActive from '../../public/img/sidemenuTopupActive.png'
import ProfileActive from '../../public/img/sidemenuProfileActive.png'
import Logout from '../../public/img/logout.png'

export default function Sidemenu() {
   const router = useRouter()
   const [localStorageData, setLocalStorageData] = useState(null)
   const logout = () => {
      localStorage.clear()
      Swal.fire("Berhasil", "Logout sukses, mengarahkan kembali ke halaman login ~", "success")
      .then(() => { router.push("/login") })
   }
   // USE EFFECT
   useEffect(() => {
      setLocalStorageData(localStorage.getItem("selectedSidemenu"))
      if(localStorage.getItem("jwtToken") === null) { 
         Swal.fire("Login dulu, yuk?", "Kamu harus login dulu baru bisa akses halaman ini yah ~", "question")
         .then(() => { router.push("/login") }) 
      }
   }, [])
   useEffect(() => { setLocalStorageData(localStorage.getItem("selectedSidemenu")) }, [localStorageData])
   // RETURN SIDEMENU
   return(
      <div className={"displayColumn " + css.sidemenu}>
         <div className={css.sidemenuFourButton}> 
            {/* DASHBOARD */}
            <div 
            className={localStorageData === "Dashboard" ? "displayRow hoverThis " + css.sidemenuButtonActive : "displayRow hoverThis " + css.sidemenuButton} onClick={() => { router.push("/home") }}>
               <img className={css.sidemenuButtonLogo} src={localStorageData === "Dashboard" ? DashboardActive : Dashboard}/>
               <span className={css.sidemenuButtonText}>Dashboard</span>
            </div>
            {/* TRANSFER */}
            <div 
            className={localStorageData === "Transfer" ? "displayRow hoverThis " + css.sidemenuButtonActive : "displayRow hoverThis " + css.sidemenuButton} onClick={() => { router.push("/transfer") }}>
               <img className={css.sidemenuButtonLogo} src={localStorageData === "Transfer" ? TransferActive : Transfer}/>
               <span className={css.sidemenuButtonText}>Transfer</span>
            </div>
            {/* TOP-UP */}
            <div 
            className={localStorageData === "Top Up" ? "displayRow hoverThis " + css.sidemenuButtonActive : "displayRow hoverThis " + css.sidemenuButton} onClick={() => { router.push("/top-up") }}>
               <img className={css.sidemenuButtonLogo} src={localStorageData === "Top Up" ? TopupActive : Topup}/>
               <span className={css.sidemenuButtonText}>Top Up</span>
            </div>
            {/* PROFILE */}
            <div 
            className={localStorageData === "Profile" ? "displayRow hoverThis " + css.sidemenuButtonActive : "displayRow hoverThis " + css.sidemenuButton} onClick={() => { router.push("/profile/" + localStorage.getItem("userId")) }}>
               <img className={css.sidemenuButtonLogo} src={localStorageData === "Profile" ? ProfileActive : Profile}/>
               <span className={css.sidemenuButtonText}>Profile</span>
            </div>
         </div>
         {/* LOG OUT */}
         <div 
            className={"displayRow hoverThis " + css.sidemenuButton} onClick={() => { logout() }}>
               <img className={css.sidemenuButtonLogo} src={Logout}/>
               <span className={css.sidemenuButtonText}>Logout</span>
            </div>
      </div>
   )
}
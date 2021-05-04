import css from '../../styles/css/Substantial.module.css'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
// IMPORT IMAGE
import Dashboard from '../../img/sidemenuDashboard.png'
import Transfer from '../../img/sidemenuTransfer.png'
import Topup from '../../img/sidemenuTopup.png'
import Profile from '../../img/sidemenuProfile.png'
import DashboardActive from '../../img/sidemenuDashboardActive.png'
import TransferActive from '../../img/sidemenuTransferActive.png'
import TopupActive from '../../img/sidemenuTopupActive.png'
import ProfileActive from '../../img/sidemenuProfileActive.png'
import Logout from '../../img/logout.png'
import Cookies from 'js-cookie'

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
         <div className="displayColumn" style={{marginTop: "2vw"}}> 
            {/* DASHBOARD */}
            <div 
            className={localStorageData === "Dashboard" ? "displayRow hoverThis " + css.sidemenuButtonActive : "displayRow hoverThis " + css.sidemenuButton} onClick={() => { router.push("/home") }}>
               <img src={localStorageData === "Dashboard" ? DashboardActive : Dashboard} style={{height: "1.77vw", width: "1.77vw"}}/>
               <span style={{fontSize: "1.1vw", margin: "0 1.5vw"}}>Dashboard</span>
            </div>
            {/* TRANSFER */}
            <div 
            className={localStorageData === "Transfer" ? "displayRow hoverThis " + css.sidemenuButtonActive : "displayRow hoverThis " + css.sidemenuButton} onClick={() => { router.push("/transfer") }}>
               <img src={localStorageData === "Transfer" ? TransferActive : Transfer} style={{height: "1.77vw", width: "1.77vw"}}/>
               <span style={{fontSize: "1.1vw", margin: "0 1.5vw"}}>Transfer</span>
            </div>
            {/* TOP-UP */}
            <div 
            className={localStorageData === "Top Up" ? "displayRow hoverThis " + css.sidemenuButtonActive : "displayRow hoverThis " + css.sidemenuButton} onClick={() => { router.push("/top-up") }}>
               <img src={localStorageData === "Top Up" ? TopupActive : Topup} style={{height: "1.77vw", width: "1.77vw"}}/>
               <span style={{fontSize: "1.1vw", margin: "0 1.5vw"}}>Top Up</span>
            </div>
            {/* PROFILE */}
            <div 
            className={localStorageData === "Profile" ? "displayRow hoverThis " + css.sidemenuButtonActive : "displayRow hoverThis " + css.sidemenuButton} onClick={() => { router.push("/profile/" + localStorage.getItem("userId")) }}>
               <img src={localStorageData === "Profile" ? ProfileActive : Profile} style={{height: "1.77vw", width: "1.77vw"}}/>
               <span style={{fontSize: "1.1vw", margin: "0 1.5vw"}}>Profile</span>
            </div>
         </div>
         {/* LOG OUT */}
         <div 
            className={"displayRow hoverThis " + css.sidemenuButton} onClick={() => { logout() }}>
               <img src={Logout} style={{height: "1.77vw", width: "1.77vw"}}/>
               <span style={{fontSize: "1.1vw", margin: "0 1.5vw"}}>Logout</span>
            </div>
      </div>
   )
}
import css from '../../styles/css/Substantial.module.css'
import BlackBell from '../../public/img/bellBlack.png'
import WhiteBell from '../../public/img/bellWhite.png'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Swal from 'sweetalert2'
import axios from 'axios'

export default function Navbar({ updatedImage }) {
   const router = useRouter()
   const [userData, setUserData] = useState({user_image: "https://clikiads.com/static/images/blank_profile.png", user_name: "Anonymous", user_phone: "813 93N 5H1N"})
   useEffect(() => {
      axios.post(process.env.SERVER + "/users/jwt", null, {
         headers: { authorization: 'Bearer ' + localStorage.getItem("jwtToken"), 'Content-Type': 'multipart/form-data' }
      })
      .then((res) => { setUserData(res.data.outputData) })
      .catch((err) => { 
         if(err.response.data.errorMessage === "Token JWT sudah expired!") { 
            Swal.fire("Login ulang, yuk?", "JWT token kamu sudah expired nih, jadi harus login ulang deh demi keamanan ~", "warning") 
            .then(() => { 
               localStorage.clear()
               router.push("/login")
            })
         }
         else { console.log(err.response.data.errorMessage) } 
      })
   }, [])
   return(
      <div className={"displayRow " + css.navbar}>
         <div className={css.zWalletNavbarText}>Z-Wallet</div>
         <div className={"displayRow " + css.navbarUser}>
            <img className={css.navbarProfilePicture} src={ updatedImage !== undefined ? updatedImage : userData.user_image }/>
            <div className={"displayColumn " + css.navbarUserInformation}>
               <div className={css.navbarHelloUser}>Hello,</div>
               <div className={css.navbarUserName}>{userData.user_name}</div>
               <div className={css.navbarUserPhoneNumber}>{"+62 " + userData.user_phone}</div>
            </div>
            <img className={css.navbarBlackBell} src={BlackBell}/>
            <img className={css.navbarWhiteBell} src={WhiteBell}/>
         </div>
      </div>
   )
}
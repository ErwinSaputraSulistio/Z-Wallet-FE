import css from '../styles/css/UserAuth.module.css'
import Head from 'next/head'
import CustomButton from '../components/diminutive/CustomButton'
import CustomInput from '../components/diminutive/CustomInput'
import ZWalletInfo from '../components/substantial/ZWalletInfo'
import { useRouter } from 'next/router'
import { useState } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
// IMPORT LOGIN LOGO
import EmptyMailLogo from '../public/img/emptyMailLogo.png'
import FilledMailLogo from '../public/img/filledMailLogo.png'

// LOGIN FUNCTION
export default function Login() {
   // SET LOGIN CONFIG
   const router = useRouter()
   const [inputData, setInputData] = useState({})
   const [inputValidation, setInputValidation] = useState({email: null})
   // SET LOGIN FUNCTION
   const inputChange = (e) => {
      setInputData({...inputData, [e.target.name]: e.target.value})
      if(e.target.value !== "") { setInputValidation({...inputValidation, [e.target.name]: true}) }
      else { setInputValidation({...inputValidation, [e.target.name]: null}) } 
   }
   // SEND RESET PASSWORD EMAIL
   const sendMail = (e) => {
      e.preventDefault()
      const sendThisResetMail = { userEmail: inputData.email }
      axios.post(process.env.SERVER + "/users/reset/send-mail", sendThisResetMail)
      .then(() => {
         Swal.fire("Berhasil!", "Silahkan cek email kamu untuk melanjutkan proses reset password!", "success")
         .then(() => { router.push("/login") })
      })
      .catch(() => { Swal.fire("Error?!", "Terjadi sebuah kesalahan, silahkan coba lagi!", "error") })
   }
   // RETURN
   return(
      <div className="displayRow showInAnimation">
         <Head>
            <title>Z-Wallet | Reset Old Password</title>
         </Head>
         <ZWalletInfo/>
         <div className={css.zWalletMobileTextArea}><span className={"displayRow " + css.zWalletMobileText}>Z-Wallet</span></div>
         <div className={css.authRight}>
            {/* RESET PASSWORD TEXT - DESKTOP */}
            <div className={css.startAccessingBankingNeeds}>
               Did You Forgot Your Password?
               Don’t Worry, You Can Reset Your
               Password In a Minutes.
            </div>
            <div className={css.transferringMoneyIsEasierThanEver}>
               To reset your password, you must type your e-mail and 
               we will send a link to your email and you will be directed to the 
               reset password screens.
            </div>
            {/* RESET PASSWORD TEXT - MOBILE */}
            <div className={css.authText}>Reset Password</div>
            <div className={css.authToYourExistingAccount}>
               <div style={{color: "#9F9F9F"}}>Enter your Z-Wallet e-mail so we can send you a password reset link.</div>
            </div>
            <form onSubmit={(e) => { sendMail(e) }} >
               <CustomInput 
                  ipClsBrdr={inputValidation.email === null ? "emptyInput " + css.authInputOuterBorderStyling : "filledInput " + css.authInputOuterBorderStyling}
                  ipClsImgLg={css.inputImageSize}
                  ipClsInpBx={css.authInputBox}
                  ipCg={(e) => { inputChange(e) }} 
                  ipDt={inputData} 
                  ipImg={inputValidation.email === null ? EmptyMailLogo : FilledMailLogo} 
                  ipNm="email" 
                  ipPlcHldr="Enter your e-mail"
                  ipTxClr={inputValidation.email === null ? "#A9A9A9" : "#6379F4"}
                  ipTy="email"
               />
               <div style={{marginTop: "8vh", width: "100%"}}>
                  <CustomButton
                     btnCls={css.bigGapAuthButton}
                     bgClr={inputValidation.email === null ? "#DADADA" : "#6379F4"}
                     btnBrdr={inputValidation.email === null ? "0.1vw solid #DADADA" : "0.1vw solid #6379F4"}
                     btnDsbl={inputValidation.email === null ? true : false}
                     btnType="submit"
                     txClr={inputValidation.email === null ? "#88888F" : "white"}
                     value="Confirm"
                  />
               </div>
            </form>
         </div>
      </div>
   )
}
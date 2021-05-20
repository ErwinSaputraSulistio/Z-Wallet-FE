import css from '../styles/css/UserAuth.module.css'
import Head from 'next/head'
import CustomButton from '../components/diminutive/CustomButton'
import CustomInput from '../components/diminutive/CustomInput'
import ZWalletInfo from '../components/substantial/ZWalletInfo'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
// IMPORT LOGIN LOGO
import EmptyMailLogo from '../img/emptyMailLogo.png'
import EmptyPassLogo from '../img/emptyPassLogo.png'
import FilledMailLogo from '../img/filledMailLogo.png'
import FilledPassLogo from '../img/filledPassLogo.png'
import EmptyEyeLogoHide from '../img/emptyEyeLogoHide.png'
import EmptyEyeLogoShow from '../img/emptyEyeLogoShow.png'
import FilledEyeLogoHide from '../img/filledEyeLogoHide.png'
import FilledEyeLogoShow from '../img/filledEyeLogoShow.png'

// LOGIN FUNCTION
export default function Login() {
   // SET LOGIN CONFIG
   const router = useRouter()
   const [inputData, setInputData] = useState({})
   const [inputValidation, setInputValidation] = useState({email: null, password: null})
   // USE EFFECT
   useEffect(() => {
      if(localStorage.getItem("jwtToken") !== null) { 
         Swal.fire("Ada apa ini ?!","Anda sudah login, jika ingin mengganti akun harap logout terlebih dahulu!", "warning")
         .then(() => { router.push("/home") })
      }
   })
   // SET LOGIN FUNCTION
   const inputChange = (e) => {
      setInputData({...inputData, [e.target.name]: e.target.value})
      if(e.target.value !== "") { setInputValidation({...inputValidation, [e.target.name]: true}) }
      else { setInputValidation({...inputValidation, [e.target.name]: null}) } 
   }
   const loginProcess = (e) => {
      e.preventDefault()
      const loginData = { email: inputData.email, password: inputData.password }
      axios.post(process.env.SERVER + "/users/login", loginData, { withCredentials: true })
      .then((res) => {
         localStorage.setItem("userId", res.data.outputData.user_id)
         localStorage.setItem("jwtToken", res.data.outputData.jwtToken)
         localStorage.setItem("selectedSidemenu", "Dashboard")
         Swal.fire("Berhasil login!", "Selamat datang, " + res.data.outputData.user_name + "!", "success")
         .then(() => { router.push("/home") })
      })
      .catch((err) => { Swal.fire("Gagal login?!", err.response.data.errorMessage, "error") })
   }
   // RETURN
   return(
      <div className="displayRow showInAnimation">
         <Head>
            <title>Z-Wallet | Login</title>
         </Head>
         <ZWalletInfo/>
         <div className={css.zWalletMobileTextArea}><span className={"displayRow " + css.zWalletMobileText}>Z-Wallet</span></div>
         <div className={css.authRight}>
            {/* LOGIN TEXT - DESKTOP */}
            <div className={css.startAccessingBankingNeeds}>
               Start Accessing Banking Needs
               With All Devices and All Platforms
               With 30.000+ Users
            </div>
            <div className={css.transferringMoneyIsEasierThanEver}>
               Transferring money is easier than ever, 
               you can access Zwallet wherever you are. Desktop, laptop, mobile phone? 
               we cover all of that for you!
            </div>
            {/* LOGIN TEXT - MOBILE */}
            <div className={css.authText}>Login</div>
            <div className={css.authToYourExistingAccount}>
               <div style={{color: "#9F9F9F"}}>Login to your existing account to access all the features in Zwallet.</div>
            </div>
            <form onSubmit = {(e) => { loginProcess(e) }}>
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
               <CustomInput 
                  ipClsBrdr={inputValidation.password === null ? "emptyInput " + css.authInputOuterBorderStyling : "filledInput " + css.authInputOuterBorderStyling}
                  ipClsImgLg={css.inputImageSize}
                  ipClsInpBx={css.authInputBox}
                  ipCg={(e) => { inputChange(e) }} 
                  ipDt={inputData} 
                  ipImg={inputValidation.password === null ? EmptyPassLogo : FilledPassLogo} 
                  ipNm="password" 
                  ipPlcHldr="Enter your password"
                  ipPwOrNo="Y"
                  ipTxClr={inputValidation.password === null ? "#A9A9A9" : "#6379F4"}
                  ipTy="password"
                  pwEyeHd={inputValidation.password === null ? EmptyEyeLogoHide : FilledEyeLogoHide}
                  pwEyeSh={inputValidation.password === null ? EmptyEyeLogoShow : FilledEyeLogoShow}
               />
               <div className={css.forgotPassword}>
                  <span className="hoverThis" onClick={() => {router.push("/reset-password")}}>Forgot password?</span>
               </div>
               <div style={{marginTop: "8vh", width: "100%"}}>
                  <CustomButton
                     btnCls={css.smallGapAuthButton}
                     bgClr={inputValidation.email === null || inputValidation.password === null ? "#DADADA" : "#6379F4"}
                     btnBrdr={inputValidation.email === null || inputValidation.password === null ? "0.1vw solid #DADADA" : "0.1vw solid #6379F4"}
                     btnDsbl={inputValidation.email === null || inputValidation.password === null ? true : false}
                     txClr={inputValidation.email === null || inputValidation.password === null ? "#88888F" : "white"}
                     btnType="submit"
                     value="Login"
                  />
               </div>
            </form>
            <div className={css.dontHaveAnAccountLetsSignUp}>Don't have an account? Let's
               <span className="hoverThis" onClick={() => {router.push("/register")}} style={{color: "#6379F4", fontWeight: "bold"}}> Sign Up</span>
            </div>
         </div>
      </div>
   )
}
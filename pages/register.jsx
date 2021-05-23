import css from '../styles/css/UserAuth.module.css'
import Head from 'next/head'
import CustomButton from '../components/diminutive/CustomButton'
import CustomInput from '../components/diminutive/CustomInput'
import InputPIN from '../components/diminutive/InputPIN'
import ZWalletInfo from '../components/substantial/ZWalletInfo'
import { useRouter } from 'next/router'
import { useState } from 'react'
// IMPORT REGISTER LOGO
import EmptyNameLogo from '../public/img/emptyNameLogo.png'
import EmptyMailLogo from '../public/img/emptyMailLogo.png'
import EmptyPassLogo from '../public/img/emptyPassLogo.png'
import FilledNameLogo from '../public/img/filledNameLogo.png'
import FilledMailLogo from '../public/img/filledMailLogo.png'
import FilledPassLogo from '../public/img/filledPassLogo.png'
import EmptyEyeLogoHide from '../public/img/emptyEyeLogoHide.png'
import EmptyEyeLogoShow from '../public/img/emptyEyeLogoShow.png'
import FilledEyeLogoHide from '../public/img/filledEyeLogoHide.png'
import FilledEyeLogoShow from '../public/img/filledEyeLogoShow.png'
import Swal from 'sweetalert2'
import axios from 'axios'

// REGISTER FUNCTION
export default function Register() {
   // SET REGISTER CONFIG
   const router = useRouter()
   const [inputData, setInputData] = useState({})
   const [inputValidation, setInputValidation] = useState({name: null, email: null, password: null, pin1: null, pin2: null, pin3: null, pin4: null, pin5: null, pin6: null})
   const [checkIfDataIsValid, setCheckData] = useState(false)
   // SET INPUT PIN CONFIG
   const {pin1, pin2, pin3, pin4, pin5, pin6} = inputData
   const joinAllPIN = pin1 + pin2 + pin3 + pin4 + pin5 + pin6
   // SET REGISTER FUNCTION
   const inputChange = (e) => {
      setInputData({...inputData, [e.target.name]: e.target.value})
      if(e.target.value !== "") { setInputValidation({...inputValidation, [e.target.name]: true}) }
      else { setInputValidation({...inputValidation, [e.target.name]: null}) } 
   }
   const register = (e) => {
      e.preventDefault()
      axios.post(process.env.SERVER + "/users/check", {email: inputData.email})
      .then(() => { setCheckData(true) })
      .catch((err) => { Swal.fire("Gagal buat akun!", err.response.data.errorMessage, "error") })
   }
   // SET INPUT PIN FUNCTION
   const inputPINChange = (e) => {
      if(e.target.value.length > 1) { null }
      else {
         setInputData({...inputData, [e.target.name]: e.target.value})
         if(e.target.value !== "") { setInputValidation({...inputValidation, [e.target.name]: true}) }
         else { setInputValidation({...inputValidation, [e.target.name]: null}) } 
      }
   }
   const checkAllPIN = async() => {
      await router.push("/login")
      if(
         pin1 === undefined || 
         pin2 === undefined || 
         pin3 === undefined || 
         pin4 === undefined || 
         pin5 === undefined || 
         pin6 == undefined
      ){ Swal.fire("Gagal?", "Tolong pastikan sudah memasukkan total 6 angka PIN yah ~", "error") }
      else { Swal.fire("Berhasil!", "PIN baru kamu berhasil di buat, gunakan PIN ini untuk melakukan Top-Up ataupun Transfer!", "success") }
   }
   // REGISTER NEW USER FUNCTION (FINALLY)
   const registerUserAfterInputPIN = (e) => {
      e.preventDefault()
      const { name, email, password } = inputData
      const createNewAccountData = { name, email, password, pin: joinAllPIN, phone: "81312345678" }
      axios.post(process.env.SERVER + "/users", createNewAccountData)
      .then((res) => { Swal.fire("Berhasil buat akun!", res.data.outputData.message, "success").then(() => { router.push("/login") }) })
      .catch((err) => { 
         console.log(err.response)
         Swal.fire("Gagal buat akun!", err.response.data.errorMessage, "error") })
   }
   // RETURN
   return(
      <div className="showInAnimation">
         {checkIfDataIsValid === false ?
         // REGISTER FIRST
         <div className="displayRow" style={checkIfDataIsValid === true ? {display: "none"} : null}>
            <Head>
               <title>Z-Wallet | Register</title>
            </Head>
            <ZWalletInfo/>
            <div className={css.zWalletMobileTextArea}><span className={"displayRow " + css.zWalletMobileText}>Z-Wallet</span></div>
            <div className={css.signUpPage}>
               {/* REGISTER TEXT - DESKTOP */}
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
               {/* REGISTER TEXT - MOBILE */}
               <div className={css.authText}>Sign Up</div>
               <div className={css.authToYourExistingAccount}>
                  <div style={{color: "#9F9F9F"}}>Create your account to access Zwallet.</div>
               </div>
               <form onSubmit = {() => { router.push("/login") }}>
                  <CustomInput 
                     ipClsBrdr={inputValidation.name === null ? "emptyInput " + css.authInputOuterBorderStyling : "filledInput " + css.authInputOuterBorderStyling}
                     ipClsImgLg={css.inputImageSize}
                     ipClsInpBx={css.authInputBox}
                     ipCg={(e) => { inputChange(e) }} 
                     ipDt={inputData} 
                     ipImg={inputValidation.name === null ? EmptyNameLogo : FilledNameLogo} 
                     ipNm="name" 
                     ipPlcHldr="Enter your name"
                     ipTxClr={inputValidation.name === null ? "#A9A9A9" : "#6379F4"}
                     ipTy="text"
                  />
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
                  <div style={{marginTop: "8vh", width: "100%"}} onClick={ (e) => register(e) }>
                     <CustomButton
                        btnCls={css.smallGapAuthButton}
                        bgClr={inputValidation.name === null || inputValidation.email === null || inputValidation.password === null ? "#DADADA" : "#6379F4"}
                        btnBrdr={inputValidation.name === null || inputValidation.email === null || inputValidation.password === null ? "0.1vw solid #DADADA" : "0.1vw solid #6379F4"}
                        btnDsbl={inputValidation.name === null || inputValidation.email === null || inputValidation.password === null ? true : false}
                        btnType="submit"
                        txClr={inputValidation.name === null || inputValidation.email === null || inputValidation.password === null ? "#88888F" : "white"}
                        value="Sign Up"
                     />
                  </div>
               </form>
               <div className={css.dontHaveAnAccountLetsSignUp}>Already have an account? Let's
                  <span className="hoverThis" onClick={() => { router.push("/login") }} style={{color: "#6379F4", fontWeight: "bold"}}> Login</span>
               </div>
            </div>
         </div>
         :
         // CREATE NEW PIN AFTER REGISTER
         <div className="displayRow showInAnimation">
            <Head>
               <title>Z-Wallet | Create New PIN</title>
            </Head>
            <ZWalletInfo/>
            <div className={css.zWalletMobileTextArea}><span className={"displayRow " + css.zWalletMobileText}>Z-Wallet</span></div>
            <div className={css.authRight}>
               {/* CREATE PIN - DESKTOP */}
               <div className={css.startAccessingBankingNeeds}>
                  Secure Your Account, Your Wallet,
                  and Your Data With 6 Digits PIN
                  That You Created Yourself.
               </div>
               <div className={css.transferringMoneyIsEasierThanEver}>
                  Create 6 digits pin to secure all your money and your data in 
                  Zwallet app. Keep it secret and don’t tell anyone about your 
                  Zwallet account password and the PIN.
               </div>
               {/* CREATE PIN - MOBILE */}
               <div className={css.authText}>Create Security PIN</div>
               <div className={css.authToYourExistingAccount}>
                  <div style={{color: "#9F9F9F"}}>Create a PIN that’s contain 6 digits number for security purpose in Zwallet.</div>
               </div>
               <form onSubmit={() => { checkAllPIN() }} >
                  <div className="displayRow" style={{alignItems: "center", justifyContent: "space-between"}}>
                     <InputPIN 
                        pibr={inputValidation.pin1 === null ? css.emptyInputBorderCreatePIN : css.filledInputBorderCreatePIN} 
                        pibx={inputValidation.pin1 === null ? css.emptyInputBoxCreatePIN : css.filledInputBoxCreatePIN} 
                        piid={inputData} 
                        pinm="pin1" 
                        pioc={(e) => { inputPINChange(e) }}
                     />
                     <InputPIN 
                        pibr={inputValidation.pin2 === null ? css.emptyInputBorderCreatePIN : css.filledInputBorderCreatePIN} 
                        pibx={inputValidation.pin2 === null ? css.emptyInputBoxCreatePIN : css.filledInputBoxCreatePIN} 
                        piid={inputData} 
                        pinm="pin2" 
                        pioc={(e) => { inputPINChange(e) }}
                     />
                     <InputPIN 
                        pibr={inputValidation.pin3 === null ? css.emptyInputBorderCreatePIN : css.filledInputBorderCreatePIN} 
                        pibx={inputValidation.pin3 === null ? css.emptyInputBoxCreatePIN : css.filledInputBoxCreatePIN} 
                        piid={inputData} 
                        pinm="pin3" 
                        pioc={(e) => { inputPINChange(e) }}
                     />
                     <InputPIN 
                        pibr={inputValidation.pin4 === null ? css.emptyInputBorderCreatePIN : css.filledInputBorderCreatePIN} 
                        pibx={inputValidation.pin4 === null ? css.emptyInputBoxCreatePIN : css.filledInputBoxCreatePIN} 
                        piid={inputData} 
                        pinm="pin4" 
                        pioc={(e) => { inputPINChange(e) }}
                     />
                     <InputPIN 
                        pibr={inputValidation.pin5 === null ? css.emptyInputBorderCreatePIN : css.filledInputBorderCreatePIN} 
                        pibx={inputValidation.pin5 === null ? css.emptyInputBoxCreatePIN : css.filledInputBoxCreatePIN} 
                        piid={inputData} 
                        pinm="pin5" 
                        pioc={(e) => { inputPINChange(e) }}
                     />
                     <InputPIN 
                        pibr={inputValidation.pin6 === null ? css.emptyInputBorderCreatePIN : css.filledInputBorderCreatePIN} 
                        pibx={inputValidation.pin6 === null ? css.emptyInputBoxCreatePIN : css.filledInputBoxCreatePIN} 
                        piid={inputData} 
                        pinm="pin6" 
                        pioc={(e) => { inputPINChange(e) }}
                     />
                  </div>
                  <div style={{marginTop: "8vh", width: "100%"}} onClick={(e) => { registerUserAfterInputPIN(e) }}>
                     <CustomButton
                        btnCls={css.bigGapAuthButton}
                        bgClr={
                           inputValidation.pin1 === null || 
                           inputValidation.pin2 === null || 
                           inputValidation.pin3 === null ||
                           inputValidation.pin4 === null || 
                           inputValidation.pin5 === null || 
                           inputValidation.pin6 === null ? "#DADADA" : "#6379F4"}
                        btnBrdr={
                           inputValidation.pin1 === null || 
                           inputValidation.pin2 === null || 
                           inputValidation.pin3 === null ||
                           inputValidation.pin4 === null || 
                           inputValidation.pin5 === null || 
                           inputValidation.pin6 === null ? "0.1vw solid #DADADA" : "0.1vw solid #6379F4"}
                        btnDsbl={
                           inputValidation.pin1 === null || 
                           inputValidation.pin2 === null || 
                           inputValidation.pin3 === null ||
                           inputValidation.pin4 === null || 
                           inputValidation.pin5 === null || 
                           inputValidation.pin6 === null ? true : false}
                        btnType="submit"
                        txClr={
                           inputValidation.pin1 === null || 
                           inputValidation.pin2 === null || 
                           inputValidation.pin3 === null ||
                           inputValidation.pin4 === null || 
                           inputValidation.pin5 === null || 
                           inputValidation.pin6 === null ? "#88888F" : "white"}
                        value="Confirm"
                     />
                  </div>
               </form>
            </div>
         </div>
         }
      </div>
   )
}
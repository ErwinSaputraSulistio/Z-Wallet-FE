import css from '../styles/css/UserAuth.module.css'
import Head from 'next/head'
import CustomButton from '../components/diminutive/CustomButton'
import CustomInput from '../components/diminutive/CustomInput'
import ZWalletInfo from '../components/substantial/ZWalletInfo'
import { useRouter } from 'next/router'
import { useState } from 'react'
// IMPORT CREATE PASSWORD LOGO
import EmptyPassLogo from '../img/emptyPassLogo.png'
import FilledPassLogo from '../img/filledPassLogo.png'
import EmptyEyeLogoHide from '../img/emptyEyeLogoHide.png'
import EmptyEyeLogoShow from '../img/emptyEyeLogoShow.png'
import FilledEyeLogoHide from '../img/filledEyeLogoHide.png'
import FilledEyeLogoShow from '../img/filledEyeLogoShow.png'

// CREATE PASSWORD FUNCTION
export default function CreateNewPassword() {
   // SET CREATE PASSWORD CONFIG
   const router = useRouter()
   const [inputData, setInputData] = useState({})
   const [inputValidation, setInputValidation] = useState({enterNewPassword: null, retypeNewPassword: null})
   // SET CREATE PASSWORD FUNCTION
   const inputChange = (e) => {
      setInputData({...inputData, [e.target.name]: e.target.value})
      if(e.target.value !== "") { setInputValidation({...inputValidation, [e.target.name]: true}) }
      else { setInputValidation({...inputValidation, [e.target.name]: null}) } 
   }
   // RETURN
   return(
      <div className="displayRow showInAnimation">
         <Head>
            <title>Z-Wallet | Create New Password</title>
         </Head>
         <ZWalletInfo/>
         <div className={css.zWalletMobileTextArea}><span className={"displayRow " + css.zWalletMobileText}>Z-Wallet</span></div>
         <div className={css.authRight}>
            {/* CREATE PASSWORD TEXT - DESKTOP */}
            <div className={css.startAccessingBankingNeeds}>
               Did You Forgot Your Password?
               Don’t Worry, You Can Reset Your
               Password In a Minutes.
            </div>
            <div className={css.transferringMoneyIsEasierThanEver}>
               Now you can create a new password for your Zwallet 
               account. Type your password twice so we can confirm your 
               new passsword.
            </div>
            {/* CREATE PASSWORD TEXT - MOBILE */}
            <div className={css.authText}>Reset Password</div>
            <div className={css.authToYourExistingAccount}>
               <div style={{color: "#9F9F9F"}}>Create and confirm your new password so you can login to Z-Wallet.</div>
            </div>
            <form onSubmit={() => { router.push("/login") }}>
               <CustomInput 
                  ipClsBrdr={inputValidation.enterNewPassword === null ? "emptyInput " + css.authInputOuterBorderStyling : "filledInput " + css.authInputOuterBorderStyling}
                  ipClsImgLg={css.inputImageSize}
                  ipClsInpBx={css.authInputBox}
                  ipCg={(e) => { inputChange(e) }} 
                  ipDt={inputData} 
                  ipImg={inputValidation.enterNewPassword === null ? EmptyPassLogo : FilledPassLogo} 
                  ipNm="enterNewPassword" 
                  ipPlcHldr="Create a new password"
                  ipPwOrNo="Y"
                  ipTxClr={inputValidation.enterNewPassword === null ? "#A9A9A9" : "#6379F4"}
                  ipTy="password"
                  pwEyeHd={inputValidation.enterNewPassword === null ? EmptyEyeLogoHide : FilledEyeLogoHide}
                  pwEyeSh={inputValidation.enterNewPassword === null ? EmptyEyeLogoShow : FilledEyeLogoShow}
               />
               <CustomInput 
                  ipClsBrdr={inputValidation.retypeNewPassword === null ? "emptyInput " + css.authInputOuterBorderStyling : "filledInput " + css.authInputOuterBorderStyling}
                  ipClsImgLg={css.inputImageSize}
                  ipClsInpBx={css.authInputBox}
                  ipCg={(e) => { inputChange(e) }} 
                  ipDt={inputData} 
                  ipImg={inputValidation.retypeNewPassword === null ? EmptyPassLogo : FilledPassLogo} 
                  ipNm="retypeNewPassword" 
                  ipPlcHldr="Retype your password"
                  ipPwOrNo="Y"
                  ipTxClr={inputValidation.retypeNewPassword === null ? "#A9A9A9" : "#6379F4"}
                  ipTy="password"
                  pwEyeHd={inputValidation.retypeNewPassword === null ? EmptyEyeLogoHide : FilledEyeLogoHide}
                  pwEyeSh={inputValidation.retypeNewPassword === null ? EmptyEyeLogoShow : FilledEyeLogoShow}
               />
               <div style={{marginTop: "8vh", width: "100%"}}>
                  <CustomButton
                     btnCls={css.smallGapAuthButton}
                     bgClr={inputValidation.enterNewPassword === null || inputValidation.retypeNewPassword === null ? "#DADADA" : "#6379F4"}
                     btnBrdr={inputValidation.enterNewPassword === null || inputValidation.retypeNewPassword === null ? "0.1vw solid #DADADA" : "0.1vw solid #6379F4"}
                     btnDsbl={inputValidation.enterNewPassword === null || inputValidation.retypeNewPassword === null ? true : false}
                     btnType="submit"
                     txClr={inputValidation.enterNewPassword === null || inputValidation.retypeNewPassword === null ? "#88888F" : "white"}
                     value="Reset Password"
                  />
               </div>
            </form>
         </div>
      </div>
   )
}
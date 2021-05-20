import css from '../../styles/css/others/Profile.module.css'
import Head from 'next/head'
import CustomButton from '../../components/diminutive/CustomButton'
import CustomInput from '../../components/diminutive/CustomInput'
import InputPIN from '../../components/diminutive/InputPIN'
import Navbar from '../../components/substantial/Navbar'
import Sidemenu from '../../components/substantial/Sidemenu'
import Footer from '../../components/substantial/Footer'
import EditImage from '../../img/editProfilePicture.png'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import axios from 'axios'
// IMPORT IMAGE
import EmptyPassLogo from '../../img/emptyPassLogo.png'
import FilledPassLogo from '../../img/filledPassLogo.png'
import EmptyEyeLogoHide from '../../img/emptyEyeLogoHide.png'
import EmptyEyeLogoShow from '../../img/emptyEyeLogoShow.png'
import FilledEyeLogoHide from '../../img/filledEyeLogoHide.png'
import FilledEyeLogoShow from '../../img/filledEyeLogoShow.png'

export default function Profile() {
   // BASE CONF
   const router = useRouter()
   const [userData, setUserData] = useState({})
   const [chosenOption, chooseOption] = useState(null)
   const [inputData, setInputData] = useState({})
   const [inputValidation, setInputValidation] = useState({
      oldpin1: null, 
      oldpin2: null, 
      oldpin3: null, 
      oldpin4: null, 
      oldpin5: null, 
      oldpin6: null, 
      newpin1: null, 
      newpin2: null, 
      newpin3: null, 
      newpin4: null, 
      newpin5: null, 
      newpin6: null, 
      oldPassword: null, 
      newPassword: null, 
      retypePassword: null,
      user_name: null,
      user_phone: null
   })
   const [updatedImage, setUpdateImage] = useState("https://raw.githubusercontent.com/Codelessly/FlutterLoadingGIFs/master/packages/cupertino_activity_indicator.gif")
   const [currentPINFilled, setCurrentPINFilled] = useState(false)
   // CHANGE USER PROFILE
   const changeAvatar = () => {
      Swal.fire({
         icon: "info",
         title: "Change Avatar",
         text: "Silahkan pilih sebuah gambar dari komputer-mu untuk dijadikan Profile Picture baru kamu :", 
         input: 'file',
         inputAttributes: {
            'accept': 'image/*',
            'aria-label': 'Upload your profile picture'
         },
         confirmButtonText: 'Upload',
         showCancelButton: true,
         closeOnConfirm: false,
         animation: "slide-from-top"
         })
      .then((res) => {
         if(res.value === null){ 
            Swal.fire({
               icon: "question",
               title: "Kosong ?!", 
               text: "Gimana uploadnya nih kalau gambarnya gak ada? XD",
               })
          }
         else{
            // UPDATE AVATAR TO BACKEND
            const packValue = res.value
            const data = new FormData()
            data.append("user_image", res.value)
            axios.patch(process.env.SERVER + "/users/change/avatar/" + userData.user_id, data, {
               headers: { authorization: 'Bearer ' + localStorage.getItem("jwtToken"), 'Content-Type': 'multipart/form-data' }
            })
            .then((res) => {
               if(res.data.checkResult === "Failed"){
                  Swal.fire({
                     icon: "warning",
                     title: "Security Issue?!", 
                     text: res.data.jwtError,
                  }).then(() => {
                     localStorage.clear()
                     router.push("/login")
                  })
               }
               else if(res.data.statusCode === 400){
                  Swal.fire({
                     icon: "error",
                     title: "Gagal ~", 
                     text: "Perubahan gambar profile user dibatalkan, tidak ada yang berubah ~",
                  })
               }
               else{
                  // AUTO UPDATE AVATAR FRONTEND
                  const reader = new FileReader()
                  reader.addEventListener("load", () => {
                  setUpdateImage(reader.result)
                  })
                  reader.readAsDataURL(packValue)
                  Swal.fire({
                     icon: "success",
                     title: "Berhasil!", 
                     text: "Gambar profile kamu sudah berhasil di ganti nih!",
                  })
               }
               
            })
            .catch((err) => {
               if(err.response.data.statusCode === 401){
                  Swal.fire({
                     icon: "warning",
                     title: "Login ulang dulu, yuk?!", 
                     text: err.response.data.jwtError,
                  })
                  .then(() => {
                     localStorage.clear()
                     router.push("/login")
                  })
               }
               else{
                  Swal.fire({
                     icon: "error",
                     title: "Error!", 
                     text: err.response.data.errorMessage,
                  }) 
               }
            })
            // cek format gambar -  code64, httpbin
            // axios.post("http://httpbin.org/anything", data)
            // .then((res) => {console.log(res)})
         }
      })
      .catch((err) => {
         Swal.fire({
            icon: "error",
            title: "Batal~", 
            text: "Perubahan gambar profile user dibatalkan!",
            })
         console.log(err)
      })
   }
   // SET PROFILE UPDATE CHANGE
   const changeProfileUpdateChange = (e) => { 
      setUserData({...userData, [e.target.name]: e.target.value})
      if(e.target.value !== "") { setInputValidation({...inputValidation, [e.target.name]: true}) }
      else { setInputValidation({...inputValidation, [e.target.name]: null}) } 
   }
   const updateUserProfile = (e) => {
      e.preventDefault()
      if(userData.user_name.length < 3 || userData.user_name.length > 33) { Swal.fire("Gagal ubah data ?!","Pastikan nama user terdiri dari 3 sampai 33 karakter yah ~","error") }
      else if(userData.user_phone.length < 8 || userData.user_phone.length > 12) { Swal.fire("Gagal ubah data ?!","Pastikan nomor handphone terdiri dari 8 sampai 12 digit angka yah ~","error") }
      else {
         axios.put(process.env.SERVER + "/users/" + userData.user_id, {name: userData.user_name, phone: userData.user_phone}, {
         headers: { authorization: 'Bearer ' + localStorage.getItem("jwtToken"), 'Content-Type': 'application/json' }
      })
      .then((res) => { 
         Swal.fire("Berhasil ubah data!", "Informasi personal user berhasil di ubah!","success")
         .then(() => { router.push("/home") }) 
      })
      .catch((err) => { Swal.fire("Gagal ubah data ?!", err.response.data.errorMessage, "error") })
      }
   }
   // SET PASSWORD CONFIG
   const inputChange = (e) => {
      setInputData({...inputData, [e.target.name]: e.target.value})
      if(e.target.value !== "") { setInputValidation({...inputValidation, [e.target.name]: true}) }
      else { setInputValidation({...inputValidation, [e.target.name]: null}) } 
   }
   const changeUserPassword = (e) => {
      e.preventDefault()
      if(inputData.newPassword !== inputData.retypePassword) { Swal.fire("Gagal ganti password ?!","Input password baru dan retype password baru harus sama!","error") }
      else {
         axios.patch(process.env.SERVER + "/users/change/password/" + userData.user_id, {old_password: inputData.oldPassword, new_password: inputData.newPassword}, {
         headers: { authorization: 'Bearer ' + localStorage.getItem("jwtToken"), 'Content-Type': 'application/json' }
      })
      .then((res) => { 
         Swal.fire("Berhasil ganti password!", "Password berhasil di ubah, silahkan login ulang demi keamanan data!","success")
         .then(() => {
            localStorage.clear()
            router.push("/login")
         }) 
      })
      .catch((err) => { Swal.fire("Gagal ganti password ?!", err.response.data.errorMessage, "error") })
         
      }
   }
   // SET PIN CONFIG
   const {oldpin1, newpin1, oldpin2, newpin2, oldpin3, newpin3, oldpin4, newpin4, oldpin5, newpin5, oldpin6, newpin6} = inputData
   const joinAllOldPIN = oldpin1 + oldpin2 + oldpin3 + oldpin4 + oldpin5 + oldpin6
   const joinAllNewPIN = newpin1 + newpin2 + newpin3 + newpin4 + newpin5 + newpin6
   const inputPINChange = (e) => {
      if(e.target.value.length > 1) { null }
      else {
         setInputData({...inputData, [e.target.name]: e.target.value})
         if(e.target.value !== "") { setInputValidation({...inputValidation, [e.target.name]: true}) }
         else { setInputValidation({...inputValidation, [e.target.name]: null}) } 
      }
   }
   const changeUserPIN = (e) => {
      e.preventDefault()
      axios.patch(process.env.SERVER + "/users/change/pin/" + userData.user_id, {old_pin: joinAllOldPIN, new_pin: joinAllNewPIN}, {
         headers: { authorization: 'Bearer ' + localStorage.getItem("jwtToken"), 'Content-Type': 'application/json' }
      })
      .then((res) => { 
         Swal.fire("Berhasil ganti PIN!", "PIN berhasil di ubah, silahkan login ulang demi keamanan data!", "success")
         .then(() => { 
            localStorage.clear()
            router.push("/login")
         })
      })
      .catch((err) => { 
         Swal.fire("Gagal ganti PIN ?!", err.response.data.errorMessage, "error")
         .then(() => {
            setInputValidation({
               oldpin1: null, 
               oldpin2: null, 
               oldpin3: null, 
               oldpin4: null, 
               oldpin5: null, 
               oldpin6: null, 
               newpin1: null, 
               newpin2: null, 
               newpin3: null, 
               newpin4: null, 
               newpin5: null, 
               newpin6: null
            })
            setCurrentPINFilled(false) 
         })
      })
   }
   // USE EFFECT
   useEffect(() => {
      localStorage.setItem("selectedSidemenu", "Profile")
      axios.post(process.env.SERVER + "/users/jwt", null, {
      headers: { authorization: 'Bearer ' + localStorage.getItem("jwtToken"), 'Content-Type': 'multipart/form-data' }
      })
      .then((res) => { 
         setUserData(res.data.outputData) 
         setUpdateImage(res.data.outputData.user_image)
      })
      .catch((err) => { console.log(err.response.data.errorMessage) })
   }, [])
   // RETURN
   return(
      <div className="showInAnimation">
         <Head>
            <title>Z-Wallet | Profile</title>
         </Head>
         <Navbar updatedImage={updatedImage}/>
         <div className={css.profile}>
            <Sidemenu/>
            {
            chosenOption === "Personal Information" ?
            <div className={"displayColumn showInAnimation " + css.insidePersonalInformation}>
               <div className={css.personalInformationText}>Personal Information</div>
               <div className={css.weGotYourPersonalText}>
                  <div>We got your personal information from the sign up process.</div>
                  <div>If you want to make changes on your information, do it here.</div>
               </div>
               <form className={css.updatePersonalInformationFormZone}>
                  <div className={"displayColumn " + css.updateProfileInputBorder}>
                     <div className={css.inputProfileLabel}>Verified E-mail</div>
                     <div className={css.inputProfile}>{userData.user_email} <span className={css.inputProfileLabel}>(can't be changed)</span></div>
                  </div>
                  <div className={"displayColumn " + css.updateProfileInputBorder}>
                     <div className={css.inputProfileLabel}>Your Name</div>
                     <input className={css.inputProfile} name="user_name" onChange={ (e) => { changeProfileUpdateChange(e) } } placeholder="Input your name here ..." type="text" value={userData.user_name}/>
                  </div>
                  <div className={"displayColumn " + css.updateProfileInputBorder}>
                     <div className={css.inputProfileLabel}>Phone Number</div>
                     <div className="displayRow" style={{alignItems: "center"}}>
                        <div className={css.plus62}>+ 62 </div>
                        <input className={css.inputProfile} name="user_phone" onChange={ (e) => { changeProfileUpdateChange(e) } } placeholder="Input your phone number here ..." type="number" value={userData.user_phone}/>
                     </div>
                  </div>
                  <div className={css.profileUpdateButtonArea} onClick={(e) => { updateUserProfile(e) }}>
                     <CustomButton
                        btnCls={css.profileUpdateButton}
                        bgClr={inputValidation.user_name === null && inputValidation.user_phone === null ? "#DADADA" : "#6379F4"}
                        btnBrdr={inputValidation.user_name === null && inputValidation.user_phone === null ? "0.1vw solid #DADADA" : "0.1vw solid #6379F4"}
                        btnDsbl={inputValidation.user_name === null && inputValidation.user_phone === null ? true : false}
                        btnType="submit"
                        txClr={inputValidation.user_name === null && inputValidation.user_phone === null ? "#88888F" : "white"}
                        value="Update"
                     />
                  </div>
               </form>
            </div>
            :
            chosenOption === "Change Password" ?
            <div className={"displayColumn showInAnimation " + css.insideChangePassword}>
               <div className={css.changeNewPasswordText}>Change Password</div>
               <div className={css.typeNewPasswordText}>Type your new password to use in Z-Wallet.</div>
               <form>
                  <div className={css.profileChangePasswordAreaZone}>
                     <CustomInput 
                        ipClsBrdr={inputValidation.oldPassword === null ? "emptyInput " + css.authInputOuterBorderStyling : "filledInput " + css.authInputOuterBorderStyling}
                        ipClsImgLg={css.inputImageSize}
                        ipClsInpBx={css.authInputBox}
                        ipCg={(e) => { inputChange(e) }} 
                        ipDt={inputData} 
                        ipImg={inputValidation.oldPassword === null ? EmptyPassLogo : FilledPassLogo} 
                        ipNm="oldPassword" 
                        ipPlcHldr="Enter your current password"
                        ipPwOrNo="Y"
                        ipTxClr={inputValidation.oldPassword === null ? "#A9A9A9" : "#6379F4"}
                        ipTy="password"
                        pwEyeHd={inputValidation.oldPassword === null ? EmptyEyeLogoHide : FilledEyeLogoHide}
                        pwEyeSh={inputValidation.oldPassword === null ? EmptyEyeLogoShow : FilledEyeLogoShow}
                     />
                     <CustomInput 
                        ipClsBrdr={inputValidation.newPassword === null ? "emptyInput " + css.authInputOuterBorderStyling : "filledInput " + css.authInputOuterBorderStyling}
                        ipClsImgLg={css.inputImageSize}
                        ipClsInpBx={css.authInputBox}
                        ipCg={(e) => { inputChange(e) }} 
                        ipDt={inputData} 
                        ipImg={inputValidation.newPassword === null ? EmptyPassLogo : FilledPassLogo} 
                        ipNm="newPassword" 
                        ipPlcHldr="Enter your new password"
                        ipPwOrNo="Y"
                        ipTxClr={inputValidation.newPassword === null ? "#A9A9A9" : "#6379F4"}
                        ipTy="password"
                        pwEyeHd={inputValidation.newPassword === null ? EmptyEyeLogoHide : FilledEyeLogoHide}
                        pwEyeSh={inputValidation.newPassword === null ? EmptyEyeLogoShow : FilledEyeLogoShow}
                     />
                     <CustomInput 
                        ipClsBrdr={inputValidation.retypePassword === null ? "emptyInput " + css.authInputOuterBorderStyling : "filledInput " + css.authInputOuterBorderStyling}
                        ipClsImgLg={css.inputImageSize}
                        ipClsInpBx={css.authInputBox}
                        ipCg={(e) => { inputChange(e) }} 
                        ipDt={inputData} 
                        ipImg={inputValidation.retypePassword === null ? EmptyPassLogo : FilledPassLogo} 
                        ipNm="retypePassword" 
                        ipPlcHldr="Retype your new password"
                        ipPwOrNo="Y"
                        ipTxClr={inputValidation.retypePassword === null ? "#A9A9A9" : "#6379F4"}
                        ipTy="password"
                        pwEyeHd={inputValidation.retypePassword === null ? EmptyEyeLogoHide : FilledEyeLogoHide}
                        pwEyeSh={inputValidation.retypePassword === null ? EmptyEyeLogoShow : FilledEyeLogoShow}
                     />
                  </div>
                  <div className={css.profileChangePasswordAreaZone} onClick={(e) => { changeUserPassword(e) }}>
                     <CustomButton
                        btnCls={css.profileChangePINButton}
                        bgClr={
                           inputValidation.newPassword === null || 
                           inputValidation.retypePassword === null ? "#DADADA" : "#6379F4"}
                        btnBrdr={
                           inputValidation.newPassword === null || 
                           inputValidation.retypePassword === null ? "0.1vw solid #DADADA" : "0.1vw solid #6379F4"}
                        btnDsbl={
                           inputValidation.newPassword === null || 
                           inputValidation.retypePassword === null ? true : false}
                        btnType="submit"
                        txClr={
                           inputValidation.newPassword === null || 
                           inputValidation.retypePassword === null ? "#88888F" : "white"}
                        value="Change Password"
                     />
                  </div>
               </form>
            </div>
            :
            chosenOption === "Change PIN" ?
            <div className="showInAnimation">
               {currentPINFilled === true ? 
               <div className={"displayColumn " + css.insideChangePIN}>
                  <div className={css.changeNewPINText}>Change PIN</div>
                  <div className={css.typeNewPINText}>Type your new 6 digits security PIN to use in Z-Wallet.</div>
                  <form onSubmit={() => { checkAllPIN() }} style={{marginTop: "8vw"}}>
                     <div className={"displayRow " + css.inputNewPINAreaZoneSpecial}>
                        <InputPIN 
                           pibr={inputValidation.newpin1 === null ? css.emptyInputBorderCreatePIN : css.filledInputBorderCreatePIN} 
                           pibx={inputValidation.newpin1 === null ? css.emptyInputBoxCreatePIN : css.filledInputBoxCreatePIN} 
                           piid={inputData} 
                           pinm="newpin1" 
                           pioc={(e) => { inputPINChange(e) }}
                        />
                        <InputPIN 
                           pibr={inputValidation.newpin2 === null ? css.emptyInputBorderCreatePIN : css.filledInputBorderCreatePIN} 
                           pibx={inputValidation.newpin2 === null ? css.emptyInputBoxCreatePIN : css.filledInputBoxCreatePIN} 
                           piid={inputData} 
                           pinm="newpin2" 
                           pioc={(e) => { inputPINChange(e) }}
                        />
                        <InputPIN 
                           pibr={inputValidation.newpin3 === null ? css.emptyInputBorderCreatePIN : css.filledInputBorderCreatePIN} 
                           pibx={inputValidation.newpin3 === null ? css.emptyInputBoxCreatePIN : css.filledInputBoxCreatePIN} 
                           piid={inputData} 
                           pinm="newpin3" 
                           pioc={(e) => { inputPINChange(e) }}
                        />
                        <InputPIN 
                           pibr={inputValidation.newpin4 === null ? css.emptyInputBorderCreatePIN : css.filledInputBorderCreatePIN} 
                           pibx={inputValidation.newpin4 === null ? css.emptyInputBoxCreatePIN : css.filledInputBoxCreatePIN} 
                           piid={inputData} 
                           pinm="newpin4" 
                           pioc={(e) => { inputPINChange(e) }}
                        />
                        <InputPIN 
                           pibr={inputValidation.newpin5 === null ? css.emptyInputBorderCreatePIN : css.filledInputBorderCreatePIN} 
                           pibx={inputValidation.newpin5 === null ? css.emptyInputBoxCreatePIN : css.filledInputBoxCreatePIN} 
                           piid={inputData} 
                           pinm="newpin5" 
                           pioc={(e) => { inputPINChange(e) }}
                        />
                        <InputPIN 
                           pibr={inputValidation.newpin6 === null ? css.emptyInputBorderCreatePIN : css.filledInputBorderCreatePIN} 
                           pibx={inputValidation.newpin6 === null ? css.emptyInputBoxCreatePIN : css.filledInputBoxCreatePIN} 
                           piid={inputData} 
                           pinm="newpin6" 
                           pioc={(e) => { inputPINChange(e) }}
                        />
                     </div>
                     <div style={{margin: "auto", marginTop: "3vw", width: "50%"}} onClick={(e) => { changeUserPIN(e) }}>
                        <CustomButton
                           btnCls={css.profileChangePINButton}
                           bgClr={
                              inputValidation.newpin1 === null || 
                              inputValidation.newpin2 === null || 
                              inputValidation.newpin3 === null ||
                              inputValidation.newpin4 === null || 
                              inputValidation.newpin5 === null || 
                              inputValidation.newpin6 === null ? "#DADADA" : "#6379F4"}
                           btnBrdr={
                              inputValidation.newpin1 === null || 
                              inputValidation.newpin2 === null || 
                              inputValidation.newpin3 === null ||
                              inputValidation.newpin4 === null || 
                              inputValidation.newpin5 === null || 
                              inputValidation.newpin6 === null ? "0.1vw solid #DADADA" : "0.1vw solid #6379F4"}
                           btnDsbl={
                              inputValidation.newpin1 === null || 
                              inputValidation.newpin2 === null || 
                              inputValidation.newpin3 === null ||
                              inputValidation.newpin4 === null || 
                              inputValidation.newpin5 === null || 
                              inputValidation.newpin6 === null ? true : false}
                           btnType="submit"
                           txClr={
                              inputValidation.newpin1 === null || 
                              inputValidation.newpin2 === null || 
                              inputValidation.newpin3 === null ||
                              inputValidation.newpin4 === null || 
                              inputValidation.newpin5 === null || 
                              inputValidation.newpin6 === null ? "#88888F" : "white"}
                           value="Change PIN"
                        />
                     </div>
                  </form>
               </div>
               :
               <div className={"displayColumn " + css.insideChangePIN}>
                  <div className={css.changeNewPINText}>Change PIN</div>
                  <div className={css.typeNewPINText}>Enter your current 6 digits Z-Wallet PIN below to continue to the next steps.</div>
                     <div className={"displayRow " + css.inputOldPINAreaZoneSpecial} style={{marginTop: "7.7vw"}}>
                        <InputPIN 
                           pibr={inputValidation.oldpin1 === null ? css.emptyInputBorderCreatePIN : css.filledInputBorderCreatePIN} 
                           pibx={inputValidation.oldpin1 === null ? css.emptyInputBoxCreatePIN : css.filledInputBoxCreatePIN} 
                           piid={inputData} 
                           pinm="oldpin1" 
                           pioc={(e) => { inputPINChange(e) }}
                        />
                        <InputPIN 
                           pibr={inputValidation.oldpin2 === null ? css.emptyInputBorderCreatePIN : css.filledInputBorderCreatePIN} 
                           pibx={inputValidation.oldpin2 === null ? css.emptyInputBoxCreatePIN : css.filledInputBoxCreatePIN} 
                           piid={inputData} 
                           pinm="oldpin2" 
                           pioc={(e) => { inputPINChange(e) }}
                        />
                        <InputPIN 
                           pibr={inputValidation.oldpin3 === null ? css.emptyInputBorderCreatePIN : css.filledInputBorderCreatePIN} 
                           pibx={inputValidation.oldpin3 === null ? css.emptyInputBoxCreatePIN : css.filledInputBoxCreatePIN} 
                           piid={inputData} 
                           pinm="oldpin3" 
                           pioc={(e) => { inputPINChange(e) }}
                        />
                        <InputPIN 
                           pibr={inputValidation.oldpin4 === null ? css.emptyInputBorderCreatePIN : css.filledInputBorderCreatePIN} 
                           pibx={inputValidation.oldpin4 === null ? css.emptyInputBoxCreatePIN : css.filledInputBoxCreatePIN} 
                           piid={inputData} 
                           pinm="oldpin4" 
                           pioc={(e) => { inputPINChange(e) }}
                        />
                        <InputPIN 
                           pibr={inputValidation.oldpin5 === null ? css.emptyInputBorderCreatePIN : css.filledInputBorderCreatePIN} 
                           pibx={inputValidation.oldpin5 === null ? css.emptyInputBoxCreatePIN : css.filledInputBoxCreatePIN} 
                           piid={inputData} 
                           pinm="oldpin5" 
                           pioc={(e) => { inputPINChange(e) }}
                        />
                        <InputPIN 
                           pibr={inputValidation.oldpin6 === null ? css.emptyInputBorderCreatePIN : css.filledInputBorderCreatePIN} 
                           pibx={inputValidation.oldpin6 === null ? css.emptyInputBoxCreatePIN : css.filledInputBoxCreatePIN} 
                           piid={inputData} 
                           pinm="oldpin6" 
                           pioc={(e) => { inputPINChange(e) }}
                        />
                     </div>
                     <div style={{margin: "auto", marginTop: "-4.4vw", width: "50%"}} onClick={() => { setCurrentPINFilled(true) }}>
                        <CustomButton
                           btnCls={css.profileChangePINButton}
                           bgClr={
                              inputValidation.oldpin1 === null || 
                              inputValidation.oldpin2 === null || 
                              inputValidation.oldpin3 === null ||
                              inputValidation.oldpin4 === null || 
                              inputValidation.oldpin5 === null || 
                              inputValidation.oldpin6 === null ? "#DADADA" : "#6379F4"}
                           btnBrdr={
                              inputValidation.oldpin1 === null || 
                              inputValidation.oldpin2 === null || 
                              inputValidation.oldpin3 === null ||
                              inputValidation.oldpin4 === null || 
                              inputValidation.oldpin5 === null || 
                              inputValidation.oldpin6 === null ? "0.1vw solid #DADADA" : "0.1vw solid #6379F4"}
                           btnDsbl={
                              inputValidation.oldpin1 === null || 
                              inputValidation.oldpin2 === null || 
                              inputValidation.oldpin3 === null ||
                              inputValidation.oldpin4 === null || 
                              inputValidation.oldpin5 === null || 
                              inputValidation.oldpin6 === null ? true : false}
                           btnType="submit"
                           txClr={
                              inputValidation.oldpin1 === null || 
                              inputValidation.oldpin2 === null || 
                              inputValidation.oldpin3 === null ||
                              inputValidation.oldpin4 === null || 
                              inputValidation.oldpin5 === null || 
                              inputValidation.oldpin6 === null ? "#88888F" : "white"}
                           value="Continue"
                        />
                     </div>
               </div>
               }
            </div>
            :
            <div className={"displayColumn " + css.insideProfile}>
               <div className="displayColumn" style={{alignItems: "center"}}>
                  <img className={css.profileImage} src={updatedImage}/>
                  <img className={"hoverThis " + css.editImage} onClick={ () => { changeAvatar() } } src={EditImage}/>
                  <div className={css.profileUserNameAndPhoneInfo}>
                     <div className={css.profileUserName}>{userData.user_name}</div>
                     <div className={css.profileUserPhone}>{"+62 " + userData.user_phone}</div>
                  </div>
               </div>
               <div className="displayColumn" style={{alignItems: "center"}}>
                  <div onClick={ () => {chooseOption("Personal Information")} }>
                     <CustomButton
                        btnCls={css.profileBottomButton}
                        bgClr="#E5E8ED"
                        btnBrdr="0.1vw solid #E5E8ED"
                        btnDsbl={false}
                        txClr="black"
                        btnType="submit"
                        value="Personal Information"
                     />
                  </div>
                  <div onClick={ () => {chooseOption("Change Password")} }>
                     <CustomButton
                        btnCls={css.profileBottomButton}
                        bgClr="#E5E8ED"
                        btnBrdr="0.1vw solid #E5E8ED"
                        btnDsbl={false}
                        txClr="black"
                        btnType="submit"
                        value="Change Password"
                     />
                  </div>
                  <div onClick={ () => {chooseOption("Change PIN")} }>
                     <CustomButton
                        btnCls={css.profileBottomButton}
                        bgClr="#E5E8ED"
                        btnBrdr="0.1vw solid #E5E8ED"
                        btnDsbl={false}
                        txClr="black"
                        btnType="submit"
                        value="Change PIN"
                     />
                  </div>
               </div>
            </div>
            }
         </div>
         <Footer/>
      </div>
   )
}

export const getStaticProps = async(ctx) => {
   const id = ctx.params.id
   const resultProps = await axios.get(process.env.SERVER + "/users/" + id)
   const propUser = resultProps.data.outputData
   return { props: { propUser } }
}
 
export const getStaticPaths = async() => {
   const resultPaths = await axios.get(process.env.SERVER + "/users")
   const pathUser = resultPaths.data.outputData
   const paths = pathUser.map((item)=>{ return { params: { id: item.user_id } } })
   return { fallback: true, paths: paths }
}
import css from '../styles/css/others/Transfer.module.css'
import Head from 'next/head'
import CustomButton from '../components/diminutive/CustomButton'
import InputPIN from '../components/diminutive/InputPIN'
import Navbar from '../components/substantial/Navbar'
import Sidemenu from '../components/substantial/Sidemenu'
import Footer from '../components/substantial/Footer'
import Search from '../public/img/searchLogo.png'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import axios from 'axios'
import Close from '../public/img/closeButton.png'

// TOP-UP
export default function Transfer() {
   // BASE CONFIG
   const router = useRouter()
   const [userData, setUserData] = useState(null)
   const [receiverData, setReceiverData] = useState([])
   const [selectedReceiverData, setSelectedReceiverData] = useState(null)
   const [saldoAmount, setSaldoAmount] = useState("")
   const [transferNote, setTransferNote] = useState("")
   const [showInputPIN, switchTriggerPIN] = useState(false)
   const [inputData, setInputData] = useState({})
   const [inputValidation, setInputValidation] = useState({pin1: null, pin2: null, pin3: null, pin4: null, pin5: null, pin6: null})
   // ONCHANGE PIN
   const inputPINChange = (e) => {
      if(e.target.value.length > 1) { null }
      else {
         setInputData({...inputData, [e.target.name]: e.target.value})
         if(e.target.value !== "") { setInputValidation({...inputValidation, [e.target.name]: true}) }
         else { setInputValidation({...inputValidation, [e.target.name]: null}) } 
      }
   }
   // ONCHANGE SEARCH
   const searchChange = (e) => {
      if(e.target.value === "") { setReceiverData([]) }
      else {
         axios.get(process.env.SERVER + "/users/all/search?name=" + e.target.value)
         .then((res) => { setReceiverData(res.data.outputData) })
         .catch((err) => { setReceiverData([]) })
      }
   }
   // SELECT A RECEIVER
   const selectThisReceiver = (receiverId) => {
      axios.get(process.env.SERVER + "/users/" + receiverId)
      .then((res) => { setSelectedReceiverData(res.data.outputData) })
      .catch((err) => { console.log(err.response.data.errorMessage) })
   }
   // SALDO CHANGE
   const saldoChange = (e) => { setSaldoAmount(e.target.value) }
   // TRANSFER NOTE CHANGE
   const noteChange = (e) => { setTransferNote(e.target.value) }
   // INPUT PIN FIRST BEFORE TRANSFER
   const triggerInputPIN = () => {
      if(parseInt(saldoAmount) < 10000) { Swal.fire("Gagal transfer ?!", "Minimal transfer saldo adalah 10 ribu yah ~", "error") }
      else if(transferNote.length < 8) { Swal.fire("Gagal transfer ?!", "Minimal nota harus terdiri dari 8 karakter yah ~", "error") }
      else { switchTriggerPIN(true) }
   }
   // TRANSFER SALDO
   const {pin1, pin2, pin3, pin4, pin5, pin6} = inputData
   const joinAllPIN = pin1 + pin2 + pin3 + pin4 + pin5 + pin6
   const transferSaldo = () => {
      switchTriggerPIN(false)
      if(parseInt(saldoAmount) < 10000) { Swal.fire("Gagal transfer ?!", "Minimal transfer saldo adalah 10 ribu yah ~", "error") }
      else { 
         const transferData = {sender: userData.user_id, receiver: selectedReceiverData.user_id, saldo: saldoAmount, note: transferNote, pin: joinAllPIN}
         axios.post(process.env.SERVER + "/saldo/transfer", transferData, {
            headers: { authorization: 'Bearer ' + localStorage.getItem("jwtToken"), 'Content-Type': 'application/json' }
         })
         .then(() => { 
            Swal.fire("Berhasil transfer!", "Transfer saldo berhasil, silahkan cek histori untuk melihat detail transfer ini!", "success")
            .then(() => { router.push("/home") }) 
         })
         .catch((err) => { Swal.fire("Gagal transfer ?!", err.response.data.errorMessage, "error") })
      }
   }
   // USE EFFECT
   useEffect(() => {
      localStorage.setItem("selectedSidemenu", "Transfer")
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
            <title>Z-Wallet | Transfer</title>
         </Head>
         <Navbar/>
         <div className={css.transfer}>
            <Sidemenu/>
            {selectedReceiverData === null ?
            <div className={"displayColumn " + css.transferSaldo}>
               <div className={css.searchReceiverText}>Search Receiver</div>
               <div className={"displayRow " + css.searchReceiverInputBorder}>
                  <img className={css.transferSearchLogo} src={Search}/>
                  <input className={"nunitoFont " + css.searchReceiverInputBox} onChange={ (e) => {searchChange(e)} } placeholder="Search receiver here" type="text"/>
               </div>
                  {receiverData.map((item) =>
                     <div className={"displayRow hoverThis " + css.receiverBorder} onClick={ () => { selectThisReceiver(item.user_id) } }>
                        <img className={css.receiverImage}  src={item.user_image}/>
                        <div className={"displayColumn " + css.receiverUserData}>
                           <div className={css.receiverName}>{item.user_name}</div>
                           <div className={css.receiverPhone}>{"+62 " + item.user_phone}</div>
                        </div>
                     </div>
                  )}
            </div>
            :
            <div className={"displayColumn " + css.transferSaldo}>
               <div className={css.searchReceiverText}>Transfer Money</div>
               <div className={"displayRow " + css.selectedReceiverBorder}>
                  <img className={css.receiverImage}  src={selectedReceiverData.user_image}/>
                  <div className={"displayColumn " + css.receiverUserData}>
                     <div className={css.receiverName}>{selectedReceiverData.user_name}</div>
                     <div className={css.receiverPhone}>{"+62 " + selectedReceiverData.user_phone}</div>
                  </div>
               </div>
               <div className={css.receiverBelowText}>Type the amount you want to transfer and then</div>
               <div className={css.receiverBelowText}>press continue to the next steps.</div>
               <div style={{textAlign: "center"}}>
                  <input className={css.inputTransferSaldoAmount} onChange={ (e) => { saldoChange(e) } } placeholder="Input saldo amount" type="number"/>
               </div>
               <div className={css.yourAvailableSaldo}>Your available saldo : <b>Rp.{userData.user_saldo}</b></div>
               <div style={{textAlign: "center"}}>
                  <input className={css.inputTransferNote} onChange={ (e) => { noteChange(e) } } placeholder="Input transfer note" type="text"/>
               </div>  
               <div className={css.transferOuterBorder} onClick={ () => { triggerInputPIN() } }>
                  <CustomButton
                     btnCls={css.confirmTransferButton}
                     bgClr={saldoAmount === "" ? "#DADADA" : "#6379F4"}
                     btnBrdr={saldoAmount === "" ? "0.1vw solid #DADADA" : "0.1vw solid #6379F4"}
                     btnDsbl={saldoAmount === "" ? true : false}
                     btnType="submit"
                     txClr={saldoAmount === "" ? "#88888F" : "white"}
                     value="Continue"
                  />
               </div>
            </div>
            }
         </div>
         <Footer/>
         <div className={"displayRow " + css.showInputPIN} style={ showInputPIN === false ? {display: "none"} : null }/>
         <div className={"displayColumn " + css.inputTransferPINBorder} style={ showInputPIN === false ? {display: "none"} : null }>
            <div className={"displayRow " + css.inputPINClose}>
               <div className={css.enterPINText}>Enter PIN to Confirm Transfer</div>
               <img className={"hoverThis " + css.closeButton} onClick={ () => { switchTriggerPIN(false) } } src={Close}/>
            </div>
            <div className={css.enterYourDigitPINText}>
               <div>Enter your 6 digits PIN for confirmation to</div> 
               <div>continue transferring money.</div> 
            </div>
            <div className={"displayRow " + css.inputPINZone}>
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
               <CustomButton
                  btnCls={css.transferSaldoButton}
                  bgClr={
                     inputValidation.pin1 === null ||
                     inputValidation.pin2 === null ||
                     inputValidation.pin3 === null ||
                     inputValidation.pin4 === null ||
                     inputValidation.pin5 === null ||
                     inputValidation.pin6 === null 
                  ? 
                  "#DADADA" : "#6379F4"
                  }
                  btnBrdr={
                     inputValidation.pin1 === null ||
                     inputValidation.pin2 === null ||
                     inputValidation.pin3 === null ||
                     inputValidation.pin4 === null ||
                     inputValidation.pin5 === null ||
                     inputValidation.pin6 === null 
                  ? 
                  "0.1vw solid #DADADA" : "0.1vw solid #6379F4"}
                  btnDsbl={
                     inputValidation.pin1 === null ||
                     inputValidation.pin2 === null ||
                     inputValidation.pin3 === null ||
                     inputValidation.pin4 === null ||
                     inputValidation.pin5 === null ||
                     inputValidation.pin6 === null 
                  ? 
                  true : false}
                  func={ () => { transferSaldo() } }
                  txClr={
                     inputValidation.pin1 === null ||
                     inputValidation.pin2 === null ||
                     inputValidation.pin3 === null ||
                     inputValidation.pin4 === null ||
                     inputValidation.pin5 === null ||
                     inputValidation.pin6 === null 
                  ? 
                  "#88888F" : "white"}
                  value="Transfer"
               />
         </div>
      </div>
   )
}
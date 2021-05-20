import css from '../styles/css/others/History.module.css'
import Head from 'next/head'
import Navbar from '../components/substantial/Navbar'
import Sidemenu from '../components/substantial/Sidemenu'
import Footer from '../components/substantial/Footer'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import axios from 'axios'
import DeleteButton from '../img/deleteButton.png'
import Confused from '../img/confused.gif'

// HISTORY FUNCTION
export default function History() {
   const router = useRouter()
   const [userData, setUserData] = useState({})
   const [transferHistory, getTransferHistory] = useState([])
   const [sortPagination, getSortPagination] = useState({page: 1, limit: 3, sort: null})
   const [totalPage, getTotalPage] = useState([])
   // COUNT TOTAL PAGE FOR PAGINATION
   const countPage = (pageLength) => { for(let i = 1; i <= pageLength; i++) { getTotalPage(totalPage => [...totalPage, i]) } }
   // DELETE TRANSFER HISTORY
   const deleteTransferHistory = (id) => {
      axios.delete(process.env.SERVER + "/saldo/history/" + id)
      .then(() => { 
         Swal.fire("Berhasil hapus histori transfer!", "Histori transfer yang di pilih berhasil di hapus!", "success") 
         .then(() => { getSortPagination({...sortPagination, page: 1}) }) 
      })
      .catch((err) => { console.log(err.response) })
   }
   // const showTransferDetail = (item) => {
   //    let oppositeRole = ""
   //    if(item.login_role.role === "Sender") { oppositeRole += "Receiver" }
   //    else if(item.login_role.role === "Receiver") { oppositeRole += "Sender" }
   //    Swal.fire({
   //       html: 
   //          "<h1>Transfer History Detail</h1>"
   //          + "<img src='" + item.login_role.user_image + "' style='border-radius: 24px; height: 200px; margin-bottom: 24px; width: 200px;'/><br>"
   //          + "<div style='display: flex; width: 100%;'>"
   //             + "<div style='margin: auto; text-align: left;'>"
   //                + "<b>" + oppositeRole + "</b> : " + item.login_role.user_name + "<br>"
   //                + "<b>Saldo</b> : Rp." + item.login_role.transfer_saldo + "<br>"
   //                + "<b>Note</b> : " + item.login_role.transfer_note
   //             + "</div>"
   //          + "</div>"
   //    })
   // }
   // USE EFFECT
   useEffect(() => {
      localStorage.setItem("selectedSidemenu", "Dashboard")
      // CONFIRM JWT TOKEN
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
   useEffect(() => {
      // GET TRANSFER HISTORY
      axios.get(process.env.SERVER + "/saldo/history?id=" + userData.user_id)
      .then((res) => { 
         getTransferHistory(res.data.outputData[0])
         getTotalPage([])
         countPage(res.data.outputData[1].totalPage) 
      })
      .catch((err) => { console.log(err.response) })
   }, [userData])
   useEffect(() => {
      // GET TRANSFER HISTORY
      if(sortPagination.sort === "Sender" || sortPagination.sort === "Receiver") {
         axios.get(process.env.SERVER + "/saldo/history?id=" + userData.user_id + "&page=" + sortPagination.page + "&limit=" + sortPagination.limit + "&sort=" + sortPagination.sort)
         .then((res) => { 
            getTransferHistory(res.data.outputData[0])
            getTotalPage([])
            countPage(res.data.outputData[1].totalPage)
         })
         .catch((err) => { 
            console.log(err.response.statusText)
            getTransferHistory([])
            getTotalPage([]) 
          })
      }
      else {
         axios.get(process.env.SERVER + "/saldo/history?id=" + userData.user_id + "&page=" + sortPagination.page + "&limit=" + sortPagination.limit )
         .then((res) => { 
            getTransferHistory(res.data.outputData[0])
            getTotalPage([])
            countPage(res.data.outputData[1].totalPage)
         })
         .catch((err) => { 
            console.log(err.response.statusText)
            getTransferHistory([])
            getTotalPage([]) 
         })
      }
   }, [sortPagination])
   return(
      <div className="showInAnimation" style={{background: "#FAFCFF"}}>
         <Head>
            <title>Z - Wallet | Transfer History</title>
         </Head>
         <Navbar/>
         <div className={css.history}>
            <Sidemenu/>
            <div className={"displayColumn " + css.insideHistory}>
               <div className={css.transferHistoryText}>Transfer History</div>
               <div className={"displayRow " + css.sortArea}>
                  <div 
                     className={"displayRow hoverThis " + css.historySenderButton + " " + css.sortButton} 
                     style={sortPagination.sort === "Sender" ? { background: "#6379F4", color: "white", fontWeight: "bold" } : null}
                     onClick={() => { getSortPagination({...sortPagination, page: 1, sort: "Sender"}) }}
                  >
                  Send
                  </div>
                  <div 
                     className={"displayRow hoverThis " + css.historyAllButton + " " + css.sortButton} 
                     style={sortPagination.sort === null ? { background: "#6379F4", color: "white", fontWeight: "bold" } : null}
                     onClick={() => { getSortPagination({...sortPagination, page: 1, sort: null}) }}
                  >
                  All
                  </div>
                  <div 
                     className={"displayRow hoverThis " + css.historyReceiverButton + " " + css.sortButton} 
                     style={sortPagination.sort === "Receiver" ? { background: "#6379F4", color: "white", fontWeight: "bold" } : null}
                     onClick={() => { getSortPagination({...sortPagination, page: 1, sort: "Receiver"}) }}
                  >
                  Receive
                  </div>
               </div>
               <div className={css.transferHistoryDataZone}>
                  {
                  transferHistory.length === 0 ?
                  <div className={"displayColumn " + css.noTransferHistoryText}>
                     <div className={css.noTransferHistoryBigText}>Histori transaksi tidak di temukan!</div>
                     <div className={css.noTransferHistorySmallText}>
                        <div>Hmm, kami tidak bisa menemukan satupun histori</div>
                        <div>
                        {
                        sortPagination.sort === "Sender" ? " dari setiap saldo yang sudah kamu kirim" 
                        : 
                        sortPagination.sort === "Receiver" ? " dari setiap saldo yang telah kamu terima"
                        :
                        " dari semua transaksi milik-mu"
                        }
                        , nih?
                        </div>
                     </div>
                     <img className={css.confusedGif} src={Confused}/>
                  </div>
                  :
                  transferHistory.map((item) => 
                     <div className={"displayRow hoverThis " + css.transferHistoryData}>
                        <div className={"displayRow " + css.transferHistoryDataInfo}>
                           <img className={css.transferHistoryDataImg} src={item.login_role.user_image}/>
                           <div className="displayColumn">
                              <div className={css.transferUserName}>{item.login_role.user_name}</div>
                              <div className={css.transferCategory}>{item.login_role.transfer_note}</div>
                           </div>
                        </div>
                        <div className="displayRow">
                           <div className={css.transferAmount} style={item.login_role.role === "Sender" ? {color: "#FF5B37"} : {color: "#3CB371"}}>
                              {item.login_role.role === "Sender" ? "-" : "+"} Rp.{item.login_role.transfer_saldo}
                           </div>
                           <div className={css.transferHistoryDeleteButton}>
                              <img className={"hoverThis " + css.deleteButton} onClick={ () => { deleteTransferHistory(item.login_role.id) } } src={DeleteButton}/>
                           </div>
                        </div>
                     </div>
                  )}
               </div>
               <div className={"displayRow " + css.paginationArea}>
                  {totalPage.map((item) => 
                  <div 
                     className={"displayRow hoverThis " + css.paginationButton} 
                     style={sortPagination.page === item ? {background: "#6379F4", color: "white", fontWeight: "bold"} : null}
                     onClick={ () => {getSortPagination({...sortPagination, page: item})} }
                  >
                  {item}
                  </div>)}
               </div>
            </div>
         </div>
         <Footer/>
      </div>
   )
}
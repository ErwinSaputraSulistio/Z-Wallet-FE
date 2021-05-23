import css from '../styles/css/others/Home.module.css'
import Head from 'next/head'
import Navbar from '../components/substantial/Navbar'
import Sidemenu from '../components/substantial/Sidemenu'
import Footer from '../components/substantial/Footer'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import axios from 'axios'
import db from '../configs/db'
// IMPORT IMAGE
import TransferDashboard from '../public/img/transferButtonDashboard.png'
import TopupDashboard from '../public/img/topupButtonDashboard.png'
import Income from '../public/img/income.png'
import Expense from '../public/img/expense.png'
import DashboardGraphic from '../public/img/dashboardGraphic.png'

// HOME FUNCTION
export default function Home({ history }) {
   const router = useRouter()
   const [userData, setUserData] = useState({user_saldo: 0, user_phone: "813 93N 5H1N"})
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
   // RETURN
   return(
      <div className="showInAnimation" style={{background: "#FAFCFF"}}>
         <Head>
            <title>Z-Wallet | Home</title>
         </Head>
         <Navbar/>
         <div className={css.home}>
            <Sidemenu/>
            <div className={"displayColumn " + css.homeBalanceAndData}>
               <div className={css.topDashboard}>
                  <div className={"displayColumn " + css.topDashboardMobile}>
                     <div className={css.dashboardBalanceText}>Balance</div>
                     <div className={css.userDashboardBalance}>{"Rp." + userData.user_saldo}</div>
                     <div className={css.userDashboardPhone}>{"+62 " + userData.user_phone}</div>
                  </div>
                  <div className={css.topDashboardButtonArea}>
                     <div className={"displayRow hoverThis " + css.topDashboardButton} onClick={ () => { router.push("/transfer") } }>
                        <img className={css.topDashboardButtonLogo} src={TransferDashboard}/>
                        Transfer
                     </div>
                     <div className={"displayRow hoverThis " + css.topDashboardButton} onClick={ () => { router.push("/top-up") } }>
                        <img className={css.topDashboardButtonLogo} src={TopupDashboard}/>
                        Topup
                     </div>
                  </div>
               </div>
               <div className={css.bottomDashboard}>
                  <div className={css.bottomDashboardLeft}>
                     <div className={css.bottomDashboardIncomeExpenseArea}>
                        <div className={css.bottomDashboardIncomeExpense}>
                           <img className={css.incomeExpenseArrow} src={Income}/>
                           <div className={css.dashboardIncomeExpenseText}>Income</div>
                           <div className={css.dashboardIncomeExpenseAmount}>Rp2.120.000</div>
                        </div>
                        <div className={css.bottomDashboardIncomeExpense}>
                           <img className={css.incomeExpenseArrow} src={Expense}/>
                           <div className={css.dashboardIncomeExpenseText}>Expense</div>
                           <div className={css.dashboardIncomeExpenseAmount}>Rp1.560.000</div>
                        </div>
                     </div>
                     <img className={css.bottomDashboardGraphic} src={DashboardGraphic}/>
                  </div>
                  <div className={css.bottomDashboardRight}>
                     <div className={"displayRow " + css.bottomDashboardRightTop}>
                        <div className={css.transactionHistoryText}>Transfer History</div>
                        <div className={"hoverThis " + css.seeAllText} onClick={ () => router.push("/history") }>See all</div>
                     </div>
                     {JSON.parse(history).map((item) => 
                        <div className={"displayRow " + css.transactionHistoryData}>
                           <div className={"displayRow " + css.transactionHistoryDataInfo}>
                              <img className={css.transactionHistoryDataImg} src={item.login_role.user_image}/>
                              <div className="displayColumn">
                                 <div className={css.transactionUserName}>{item.login_role.user_name}</div>
                                 <div className={css.transactionCategory}>{
                                    item.login_role.transfer_note.length < 15 ?
                                    item.login_role.transfer_note
                                    :
                                    item.login_role.transfer_note.slice(0,15) + "..."}
                                 </div>
                              </div>
                           </div>
                           <div className={css.transactionAmount} style={item.login_role.role === "Sender" ? {color: "#FF5B37"} : {color: "#3CB371"}}>
                              {item.login_role.role === "Sender" ? "-" : "+"} Rp.{item.login_role.transfer_saldo}
                           </div>
                        </div>
                     )}
                  </div>
               </div>
            </div>
         </div>
         <Footer/>
      </div>
   )
}

export const getServerSideProps = async(ctx) => {
   let id = null
   ctx.req.headers.cookie === undefined ? null : id = ctx.req.headers.cookie.substring(7)
   let newTransferQuery =
      "FROM (SELECT CASE WHEN sender_id = '" + id + "' \
      THEN JSON_BUILD_OBJECT(\
         'role', 'Sender', \
         'user_image', receiver.user_image, \
         'user_name', receiver.user_name, \
         'id', transaction_id, \
         'transfer_saldo', transfer_saldo, \
         'transfer_note', transfer_note, \
         'created_at', transfer_history.created_at) \
      ELSE JSON_BUILD_OBJECT(\
         'role', 'Receiver', \
         'user_image', sender.user_image, \
         'user_name', sender.user_name, \
         'id', transaction_id, \
         'transfer_saldo', transfer_saldo, \
         'transfer_note', transfer_note, \
         'created_at', transfer_history.created_at) \
      END AS login_role from transfer_history \
      INNER JOIN user_data sender ON sender.user_id = sender_id \
      INNER JOIN user_data receiver ON receiver.user_id = receiver_id \
      WHERE sender_id = '" + id + "' \
      OR receiver_id = '" + id + "' ORDER BY transfer_history.created_at DESC) AS transfer_history"
   const result = await new Promise((resolve, reject) => {
      db.query("SELECT * " + newTransferQuery + " OFFSET " + ((1 - 1) * 4) + " LIMIT " + 4, (err, result) => {
         if(result.rows.length === 0) { resolve([]) }
         else if (!err) { resolve(result.rows) }
         else { reject(err) }
      })
   })
   return{ props: { history: JSON.stringify(result) } }
 }
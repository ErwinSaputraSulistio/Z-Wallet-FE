import css from '../../styles/css/UserAuth.module.css'
import TwoPhones from '../../public/img/twoPhones.png'

export default function ZWalletInfo() {
   return(
      <div className={" displayColumn " + css.authLeft} style={{color: "white"}}>
         <div style={{fontSize: "2vw", fontWeight: "bold", padding: "0 2vw"}}>Z-Wallet</div>
         <img className="twoPhonesImg" src={TwoPhones} style={{height: "32vw", width: "28vw"}}/>
         <div style={{fontSize: "1.5vw", fontWeight: "bold", marginBottom: "2vw", padding: "0 2vw"}}>App that Covering Banking Needs.</div>
         <div style={{fontSize: "1vw", lineHeight: "2vw", padding: "0 2vw"}}>
            Zwallet is an application that focussing in banking needs for all users
            in the world. Always updated and always following world trends.
            5000+ users registered in Zwallet everyday with worldwide
            users coverage.
         </div>
      </div>
   )
}
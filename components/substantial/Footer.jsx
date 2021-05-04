import css from '../../styles/css/Substantial.module.css'

export default function Footer() {
   return(
      <div className={"displayRow " + css.footer}>
         <div style={{color: "#EFEFEF"}}>2020 Z-Wallet. All right reserved.</div>
         <div className="displayRow" style={{fontWeight: "bold", justifyContent: "space-between", width: "30%"}}>
            <div>+62 813 1419 8161</div>
            <div>contact@ciwin-zwallet.com</div>
         </div>
      </div>
   )
}
export default function CustomButton({btnCls, bgClr, btnBrdr, btnDsbl, btnType, func, txClr, value}) {
   return(
      <div>
         {btnType === "submit" && btnDsbl === true ? 
         <button className={btnCls} style={{
            background: bgClr,
            border: btnBrdr,
            color: txClr
         }} disabled>
            {value}
         </button>
         :
         btnType === "submit" && btnDsbl === false ? 
         <button className={"hoverThis " + btnCls} style={{
            background: bgClr,
            border: btnBrdr,
            color: txClr,
            transitionDuration: "0.5s"
         }}>
            {value}
         </button>
         :
         <div 
            className={"hoverThis " + btnCls} 
            style={{
               background: bgClr,
               border: btnBrdr,
               color: txClr,
               transitionDuration: "0.5s"
            }}
            onClick={func}
         >
            {value}
         </div>
         }
      </div>
   )
}
import { useState } from 'react'

/* THIS PARAMS NOTES - DICTIONARY
ipClsBrdr = "input class of outer/first border/parent div border"
ipClsInpBx = "input class of the INPUT BOX"
ipClsImgLg = "input class of image logo inside parent's border (for setup logo's size, etc)"
ipCg = "onchange props (function)"
ipDt = "inputData/useState variable props (var)"
ipImg = "the image logo input/logo picture"
ipNm = "the input's name (for onchange condition - e.target.name)"
ipPlcHldr = "input placeholder"
ipTxClr = "input text color (why it's separated? b'coz the input text's color needs condition in the page (empty = grey, filled = blue, wrong = red), 
         while the other's styling except logo and border are not"
ipTy = "input type (text, password, etc)"
ipPwOrNo = "custom set condition if the input is for password validation (Y/N)"
pwEyeHd = "eye logo (hide) for hiding password"
pwEyeSh = "eye logo (show) for showing password"
*/

export default function CustomInput({ipClsBrdr, ipClsInpBx, ipClsImgLg, ipCg, ipDt, ipImg, ipNm, ipPlcHldr, ipTxClr, ipTy, ipPwOrNo, pwEyeHd, pwEyeSh}) {
   // INPUT CONFIGURATION
   const [passwordVisibility, setPasswordVisible] = useState(false)
   // RETURN INPUT
   return(
      <div className={"displayRow " + ipClsBrdr}>
         <div className="displayRow" style={{alignItems: "center", width: "100%"}}>
            <img className={ipClsImgLg} src={ipImg}/>
            {/* INPUT BOX BORDER ALREADY REMOVED IN GLOBAL CSS CONFIG, SO NO NEED TO REMOVE AGAIN! */}
            <input className={ipClsInpBx} name={ipNm} onChange={ipCg} placeholder={ipPlcHldr} required style={{color: ipTxClr}} type={passwordVisibility === false ? ipTy : "text"} value={ipDt.ipNm}/>
         </div>
         {ipPwOrNo === "Y" ?
         <img className={"hoverThis " + ipClsImgLg} onClick={() => { setPasswordVisible(!passwordVisibility) }} src={passwordVisibility === false ? pwEyeHd : pwEyeSh}/>
         :
         null
         }
      </div>
   )
}
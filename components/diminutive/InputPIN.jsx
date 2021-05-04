/*
pibr = PIN input border (outer border)
pibx = PIN input box (data input)
piid = PIN input data from page (variable pass as props here)
pinm = PIN input name (1-6)
pioc = PIN input onchange (function)
*/

export default function InputPIN({pibr, pibx, piid, pinm, pioc}) {
   return( 
      <div className={pibr}>
         <input 
            className={pibx} 
            min="0" 
            max="9" 
            maxLength="1" 
            name={pinm} 
            onChange={pioc}
            required 
            type="number" 
            value={piid.pinm}/>
      </div> 
   ) 
}
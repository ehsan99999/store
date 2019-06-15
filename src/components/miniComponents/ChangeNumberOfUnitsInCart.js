import React  from 'react';
import minusB from '../../img/minus-b.png'
import addB from '../../img/add-b.png'

export default function ChangeNumberOfUnitsInCart({numberOfUnits,modifyNumberOfUnits,productId}) {
    return (
        <div className="changeNumberOfItemsInCart float-left rounded-pill align-middle mr-3 pt-1" >
            <center>
                <button onClick={() => modifyNumberOfUnits('DECREMENT',productId)} className="pl-2 align-middle"><img src={minusB} alt="reduce Icon"  /></button>
                <b className="px-2 ">{(numberOfUnits > 9)? numberOfUnits : "0"+numberOfUnits}</b>
                <button  onClick={() => modifyNumberOfUnits('INCREMENT',productId)} className="pr-2"><img src={addB} alt="add Icon" /></button>
            </center>
        </div>
    )
}
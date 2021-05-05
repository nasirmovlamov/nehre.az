import React from 'react'

function Deposites() {
    return (
        <div className="cabinetCont address deposites">
        <p className="title">Deposites</p>
        <p className="myAdress ">Your Current balance is <span className="money"> 1300$ </span></p>
        <table>
            <tr className="start"> <td>Date</td> <td>Price</td> </tr>
            <tr> <td>21.01.2020</td> <td>5000AZN</td> </tr>
            <tr> <td>21.01.2020</td> <td>5000AZN</td> </tr>
            <tr> <td>21.01.2020</td> <td>5000AZN</td> </tr>
            <tr> <td>21.01.2020</td> <td>5000AZN</td> </tr>
        </table>
    </div>
    )
}

export default Deposites

import axios from "axios"
import { useEffect, useState } from "react"
import styles from './dashboard.module.css'

export default function Dashboard ({database}) {

    //State for save the Api
    const[apiCrypto, setApiCrypto] = useState([])
    //State for save the convertion
    const[calConvertion, setcalConvertion] = useState({})
    //States for crypto coins 
    const[cBTC, setcBTC] = useState([])
    const[cETH, setcETH] = useState([])
    const[cXRP, setcXRP] = useState([])
    //States operations
    const[cCFinalBTC, setcCFinalBTC] = useState()
    const[cCFinalETH, setcCFinalETH] = useState()
    const[cCFinalXRP, setcCFinalXRP] = useState()
   
    //Operation Variables 
    let convertionFinalBTC 
    let convertionFinalETH 
    let convertionFinalXRP
    
    useEffect(()=>{
        
        function repeat() {
           let time = setInterval(repeatCharge, 1000);
          }
          
          function repeatCharge() {
            axios.get("https://min-api.cryptocompare.com/data/pricemultifull?fsyms=BTC,ETH,XRP&tsyms=USD")
            .then((response)=>{ 
                setApiCrypto(response.data.DISPLAY)
                setcBTC([response.data.DISPLAY.BTC.USD])
                setcETH([response.data.DISPLAY.ETH.USD])
                setcXRP([response.data.DISPLAY.XRP.USD])
            })
          }

          repeat()
    },[])


    //----------------------------------------------------------------------------------------------------
    function handleChange(e){   
        e.preventDefault();
        setcalConvertion({
            ...calConvertion,
            [e.target.name]:e.target.value,
        })
        //Cryptocurrency conversion calculation
        let priceBTC = apiCrypto.BTC.USD.PRICE //Price
        let priceBTCnosymbol =  priceBTC.slice(1,priceBTC.length)//Remove the symbol $
        setcCFinalBTC(priceBTCnosymbol.replaceAll(',', '')) //Remove the symbol , and save the result

        let priceETH = apiCrypto.ETH.USD.PRICE//Price
        let priceETHnosymbol =  priceETH.slice(1,priceETH.length)//Remove the symbol $
        setcCFinalETH(priceETHnosymbol.replaceAll(',', ''))//Remove the symbol , and save the result

        let priceXRP = apiCrypto.XRP.USD.PRICE//Price
        let priceXRPnosymbol =  priceXRP.slice(1,priceXRP.length)//Remove the symbol $
        setcCFinalXRP(priceXRPnosymbol.replaceAll(',', ''))//Remove the symbol , and save the result
    }
    
    //--------------Convertions--------------------------------------------------------------------------
    convertionFinalBTC = Number(calConvertion.calc)*cCFinalBTC //Variable that shows the result of the calculation
    convertionFinalETH = Number(calConvertion.calc)*cCFinalETH //Variable that shows the result of the calculation
    convertionFinalXRP = Number(calConvertion.calc)*cCFinalXRP //Variable that shows the result of the calculation
    //----------------------------------------------------------------------------------------------------

    return (
        <div>
            
            <div className={styles.container}>
                <p className={styles.item1}>{database.name} {database.lastname}</p>
                <p className={styles.item2}>{database.email}</p>
                <p className={styles.item3}>{database.phone}</p>
            </div>
            <h2 className={styles.title}>CRYPTOS TODAY</h2>
            <div className={styles.containercoins}>
                <div className={styles.item5}>
                <h1>BTC</h1>
            {
                    cBTC.map((element)=>{
                        return(
                        <div>
                             <table className={styles.subitem5}>
	                            <tbody>
	                                <tr>
		                            <td>Market:</td>
		                            <td>{element.MARKET}</td>
	                                </tr>
	                                <tr>
		                            <td>Open Day:</td>
		                            <td>{element.OPENDAY}</td>
	                                </tr>
	                                <tr>
		                            <td>Price:</td>
		                            <td>{element.PRICE}</td>
	                                </tr>
	                                <tr>
		                            <td>LasMarket: </td>
		                            <td>{element.LASTMARKET}</td>
	                                </tr>
                                	</tbody>
                                </table>
                        </div>
                        )
                    })
            }
                </div>
            
            <div className={styles.item6}>
                <h1>ETH</h1>
            {
                    cETH.map((element)=>{
                        return(
                        <div>
                        <table className={styles.subitem6}>
	                            <tbody>
	                                <tr>
		                             <td>Market:</td>
		                            <td>{element.MARKET}</td>
	                                </tr>
	                                <tr>
		                            <td>Open Day:</td>
		                            <td>{element.OPENDAY}</td>
	                                </tr>
	                                <tr>
		                            <td>Price:</td>
		                            <td>{element.PRICE}</td>
	                                </tr>
	                                <tr>
		                            <td>LastMarket: </td>
		                            <td>{element.LASTMARKET}</td>
	                                </tr>
                                	</tbody>
                                </table>
                        </div>
                        )
                    })
            }
            </div>
            <div className={styles.item7}>
            <h1>XRP</h1>
            {
                    cXRP.map((element)=>{
                        return(
                        <div className={styles.divitem7}>

                        <table className={styles.subitem7}>
	                            <tbody>
	                                <tr>
		                             <td>Market:</td>
		                            <td>{element.MARKET}</td>
	                                </tr>
	                                <tr>
		                            <td>Open Day:</td>
		                            <td>{element.OPENDAY}</td>
	                                </tr>
	                                <tr>
		                            <td>Price:</td>
		                            <td>{element.PRICE}</td>
	                                </tr>
	                                <tr>
		                            <td>LastMarket: </td>
		                            <td>{element.LASTMARKET}</td>
	                                </tr>
                                	</tbody>
                                </table>

                        </div>
                        )
                    })
            }
        </div>
        </div>
        <h2 className={styles.title1}>CONVERT YOU CURRENCY</h2>
        <div className={styles.containerconvertion}>
            <form className={styles.item8}>
            <h2>MXN</h2>
            <input type="text" name="calc" onChange={handleChange} value={calConvertion.calc} placeholder="Convert you currency" className={styles.input}/>
            </form>
            <div className={styles.item9}>
            <h2>BTC</h2>
            <p>{convertionFinalBTC? convertionFinalBTC:0.0}</p>
            </div>
            <div className={styles.item10}>
            <h2>ETH</h2>
            <p>{convertionFinalETH? convertionFinalETH:0.0}</p>
            </div>
            <div className={styles.item11}>
            <h2>XRP</h2>
            <p>{convertionFinalXRP? convertionFinalXRP:0.0}</p>
            </div>
        </div>
        </div>    
 
    )
}


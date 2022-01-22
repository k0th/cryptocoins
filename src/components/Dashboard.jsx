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
    const[cXRP, setXRP] = useState([])
    //States operations
    const[cCFinal, setcCFinal] = useState()
    const[cCFinalETH, setcCFinalETH] = useState()
    const[cCFinalXRP, setcCFinalXRP] = useState()
   
    let convertionFinalBTC 
    let convertionFinalETH 
    let convertionFinalXRP
    
    useEffect(()=>{
        axios.get("https://min-api.cryptocompare.com/data/pricemultifull?fsyms=BTC,ETH,XRP&tsyms=USD")
        .then((response)=>{ 
            setApiCrypto(response.data.DISPLAY)
            setcBTC([response.data.DISPLAY.BTC.USD])
            setcETH([response.data.DISPLAY.ETH.USD])
            setXRP([response.data.DISPLAY.XRP.USD])
        })
    },[])


    //----------------------------------------------------------------------------------------------------
    function handleChange(e){   
        e.preventDefault();
        setcalConvertion({
            ...calConvertion,
            [e.target.name]:e.target.value,
        })

        let priceBTC = apiCrypto.BTC.USD.PRICE
        let priceBTCnosymbol =  priceBTC.slice(1,priceBTC.length)
        setcCFinal(priceBTCnosymbol.replaceAll(',', ''))

        let priceETH = apiCrypto.ETH.USD.PRICE
        let priceETHnosymbol =  priceETH.slice(1,priceETH.length)
        setcCFinalETH(priceETHnosymbol.replaceAll(',', ''))

        let priceXRP = apiCrypto.XRP.USD.PRICE
        let priceXRPnosymbol =  priceXRP.slice(1,priceXRP.length)
        setcCFinalXRP(priceXRPnosymbol.replaceAll(',', ''))
    }
    
    //--------------Convertions--------------------------------------------------------------------------
    convertionFinalBTC = Number(calConvertion.calc)*cCFinal
    convertionFinalETH = Number(calConvertion.calc)*cCFinalETH
    convertionFinalXRP = Number(calConvertion.calc)*cCFinalXRP
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


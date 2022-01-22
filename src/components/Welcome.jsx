import { useState } from "react"
import { useNavigate} from 'react-router'
import styles from './welcome.module.css'

export default function Welcome({database}){

    const[userInformation, setUserInformation] = useState({})

    let navigate = useNavigate()
    
    function onSelectChange(e){
        e.preventDefault();
        setUserInformation({
            ...userInformation,
            [e.target.name]:e.target.value,
        })
    }

    function onSubmit(e){
        e.preventDefault();
        //Update de information in the object "database"
        database.name = userInformation.name
        database.lastname = userInformation.lastname
        database.email = userInformation.email
        database.phone = userInformation.phone
        //Check if the name property exist
        database.name? navigate("/dashboard") : alert("Please complete the form")
    }

    return (
            <div>
            <form onSubmit={onSubmit}  className={styles.form}>
            <h1  className={styles.h1}>Welcome!</h1>
            <div>
            <label>Name</label>
            <input onChange={onSelectChange} type='text' name="name" value={userInformation.name} placeholder="Name"  className={styles.input}/>
            </div>
            <div>
            <label>Lastname</label>
            <input onChange={onSelectChange} type='text' name="lastname" value={userInformation.lastname} placeholder="Lastname"  className={styles.input}/>
            </div>
            <div>
            <label>Email</label>
            <input onChange={onSelectChange} type='email' name="email" value={userInformation.email} placeholder="Email"  className={styles.input}/>
            </div>
            <div>
            <label>Phone</label>
            <input onChange={onSelectChange} type='tel' name="phone" value={userInformation.phone} placeholder="Phone"  className={styles.input}/>
            </div>
            <div>
            <button type="submit" value="Submit" className={styles.button}>SUBMIT</button>
            </div>
            </form>
        </div>
    )
}
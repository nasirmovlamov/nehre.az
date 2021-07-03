import { fabClasses } from "@material-ui/core"
import axios from "axios"

export const authcheck = async () => {
    var status = 0
    if (JSON.parse(localStorage.getItem('LoginUserData')) !== null) {
        try {
            const res = await axios.get(`https://nehra.az/public/api/checkstatus?user_id=${JSON.parse(localStorage.getItem('LoginUserData')).id}`)
            status = res.data
        } catch (error) {
        }
    }
    return status
}
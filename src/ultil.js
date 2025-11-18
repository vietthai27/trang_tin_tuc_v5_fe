import { toast } from "react-toastify"

// export const host = 'http://localhost:8080'
export const host = 'https://chiatien.fly.dev'
export const apiBank = '/bank'
export const apiUser = '/user'
export const apiAccount = '/bank-account'
export const apiBill = '/bill'
export const apiCheckToken = '/permit/tokenIsExpired'

export const notify = (status, message) => {
    if(status === 'success') {
        toast.success(message)
    } else if (status === 'warning') {
        toast.warning(message)
    } else if (status === 'error') {
        toast.error(message)
    }
}



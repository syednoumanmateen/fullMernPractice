export const setLogin = (data) => {
    localStorage.setItem("login", JSON.stringify(data))
}

export const getLogin = () => {
    const data = localStorage.getItem("login")
    return JSON.parse(data)
}

export const getIsLogin = () => {
    const { isLogin } = getLogin()
    if (isLogin) {
        return true
    } else {
        return false
    }
}
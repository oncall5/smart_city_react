export const setLocalStorage=(key, value)=> {
    window.localStorage.setItem(key, JSON.stringify(value))
  }
export const getLocalStorage=(key)=>{
    const value = window.localStorage.getItem(key)
      if (value) {
        return JSON.parse(value)
      }
      return null
}
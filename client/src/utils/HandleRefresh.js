const HandleRefresh  = (time) => {
    
    const refresh = () => {
            setTimeout(() => {
                window.location.reload()
            }, time);
        }
        
    refresh()
}

export default HandleRefresh


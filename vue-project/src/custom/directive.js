const vcapitalize = {
  mounted(el){
    el.addEventListener('input', () => {
      if (!el.value) return
      console.log("inside vcaptilize")
      const formatted =
        el.value.charAt(0).toUpperCase() +
        el.value.slice(1).toLowerCase()
      if(el.value === formatted)return 
      el.value = formatted
      el.dispatchEvent(new Event('input'))
    })
  }
}

export default vcapitalize

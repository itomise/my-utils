const load = (url) => {
  return new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest()
    xhr.open('GET', url)
    xhr.onload = () => {
      if (xhr.readyState === 4 && xhr.status === 200) {
        resolve(JSON.parse(xhr.responseText))
      } else {
        reject(new Error(xhr.status))
      }
    }
    xhr.onerror = () => {
      reject(new Error(xhr.status))
    }
    xhr.send(null)
  })
}

export default load

import axios from "axios"

const instance = axios.create({
  baseURL: "https://j7a704.p.ssafy.io/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
})

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken")
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

instance.interceptors.response.use(
  async (res) => {
    if (res.headers["Access-Token"]) {
      localStorage.setItem("accessToken", res.headers["Access-Token"])
      console.log(`accessToken was changed to ${res.headers["Access-Token"]}`)
    }
    return res
  },
  async (err) => {
    const originalConfig = err.config

    if (err.response) {
      // Access Token was expired
      if (err.response.status === 401 && !originalConfig._retry) {
        originalConfig._retry = true

        try {
          const refreshToken = localStorage.getItem("refreshToken")
          const accessToken = localStorage.getItem("accessToken")
          originalConfig.headers["Refresh-Token"] = refreshToken
          originalConfig.headers["Authorization"] = `Bearer ${accessToken}`

          return instance(originalConfig)
        } catch (_error) {
          if (_error.response && _error.response.data) {
            return Promise.reject(_error.response.data)
          }

          return Promise.reject(_error)
        }
      }
    }

    return Promise.reject(err)
  }
)

export { instance }

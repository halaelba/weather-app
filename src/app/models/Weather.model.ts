export class Weather {
  city: string
  feelsLike: number
  temp: number
  tempMin: number
  tempMax: number
  main: string
  description: string
  icon: string
  date: Date

  constructor(res: WeatherServerResponse) {
    this.city = res.name
    this.main = res.weather[0]?.main
    this.description = res.weather[0]?.description
    this.feelsLike = Math.round(res.main.feels_like)
    this.temp = Math.round(res.main.temp)
    this.tempMin = Math.round(res.main.temp_min)
    this.tempMax = Math.round(res.main.temp_max)
    this.icon = res.weather[0]?.icon
    this.date = new Date(res.dt * 1000)
  }

}

export class WeatherServerResponse {
  id!: number
  name!: string // city name
  dt!: number // date
  main!: {
    feels_like: number
    temp: number
    temp_max: number
    temp_min: number
  }
  weather!: {
    id: number
    description: string
    icon: string
    main: string
  }[]
}

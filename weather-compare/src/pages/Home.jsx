import React, { Component } from "react"
import './css/Home.css'

const url = 'http://localhost:3001'

class Home extends Component {

    constructor(props) {
        super(props)
        this.state = {
            blocker: true,
            countryNames: [],
            ids: new Map(),

            city_1: null,
            city_1_input: '',
            city_1_details: null,

            city_2: null,
            city_2_details: null,
            city_2_input: '',

            format: 'c',
        }
    }

    componentDidMount() {
        fetch(url + '/countryNames')
            .then(async (response) => {
                return await response.json()
            })
            .then((response) => {
                const dataList = document.getElementById('country-names')
                response.forEach(({ id, name }) => {
                    const option = document.createElement('option')
                    option.innerText = name
                    this.state.ids.set(name, id)
                    dataList.appendChild(option)
                })
            })
            .catch((error) => {
                console.log(error)
            })
            .finally(() => {
                this.setState({ blocker: false })
            })
    }

    inputOnChange(event) {
        const { id, value } = event.target
        console.log(value)
        const city_id = this.state.ids.get(value) || null
        this.setState({ [id]: city_id })
        this.setState({ [id + '_input']: value })
    }

    async compare() {
        if (this.state.city_1 === null) {
            alert('City 1 value is not defined in list')
            return
        }
        if (this.state.city_2 === null) {
            alert('City 2 value is not defined in list')
            return
        }
        this.setState({
            blocker: true,
            city_1_details: null,
            city_2_details: null
        })
        let city_1_details = await (await fetch(url + '/details/' + this.state.city_1)).json()
        let city_2_details = await (await fetch(url + '/details/' + this.state.city_2)).json()
        const setTempAvg = async (details) => {
            const lat = details.latitude
            const lon = details.longitude
            const link = `https://www.7timer.info/bin/astro.php?lon=${lon}&lat=${lat}&ac=0&unit=metric&output=json&tzshift=0`
            const temp = await (await fetch(link)).json()
            let tmp = 0
            let n = Math.min(5, temp.dataseries?.length || 0)
            for (let i = 0; i < n; ++i) {
                tmp += temp.dataseries[i]["temp2m"]
            }
            tmp /= n
            details.temp = tmp
            details.ftemp = (9 * tmp / 5) + 32
        }
        await setTempAvg(city_1_details)
        await setTempAvg(city_2_details)
        console.log(city_1_details)
        console.log(city_2_details)
        if (city_1_details.temp === city_2_details.temp) {
            city_1_details.className = 'mid'
            city_2_details.className = 'mid'
        } else if (city_1_details.temp > city_2_details.temp) {
            city_1_details.className = 'hot'
            city_2_details.className = 'cold'
        } else if (city_1_details.temp < city_2_details.temp) {
            city_1_details.className = 'cold'
            city_2_details.className = 'hot'
        }
        this.setState({
            city_1_details: city_1_details,
            city_2_details: city_2_details,
            blocker: false
        })
    }

    changeFormat(format) {
        this.setState({ format: format })
    }

    render() {
        return (
            <div className="w-screen min-h-screen relative bg-slate-200">
                {
                    this.state.blocker &&
                    <div className="blocker bg-gray-800 opacity-50 a-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none"
                            viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                            </path>
                        </svg>
                    </div>
                }
                <div className="a-center pt-10">
                    <div className="pt-5">
                        <div className="px-10 py-5 bg-orange-700 rounded-lg">
                            <span className="text-xl text-center text-white font-semibold">Weather Compare</span>
                        </div>
                    </div>
                </div>
                <div className="lg:flex md:flex block justify-around mt-[100px]">
                    <div className="w-full md:w-9/12 lg:w-8/12 block md:flex lg:flex justify-around">
                        <div className="w-full md:w-1/2 lg:w-1/2 px-8 py-2 md:py-0 lg:py-0">
                            <p className="p-1 text-sm font-semibold">City 1</p>
                            <div className="flex flex-col justify-end lg:h-12 md:h-12 h-10 border rounded-lg">
                                <input placeholder="Enter City 1" value={this.state.city_1_input} onChange={(e) => this.inputOnChange(e)} name="city-1" id="city_1" list="country-names"
                                    className="uppercase text-xs rounded-sm w-full h-10 px-3 font-semibold" type="text" />
                            </div>
                        </div>
                        <div className="w-full md:w-1/2 lg:w-1/2 px-8 py-2 md:py-0 lg:py-0">
                            <p className="p-1 text-sm font-semibold">City 2</p>
                            <div className="flex flex-col justify-end lg:h-12 md:h-12 h-10 border rounded-lg">
                                <input placeholder="Enter City 2" value={this.state.city_2_input} onChange={(e) => this.inputOnChange(e)} name="city-2" id="city_2" list="country-names"
                                    className="uppercase text-xs rounded-sm w-full h-10 px-3 font-semibold" type="text" />
                            </div>
                        </div>
                    </div>
                    <div className="lg:w-4/12 md:w-3/12 w-full flex flex-col justify-end">
                        {
                            !this.state.blocker &&
                            <div className="flex justify-center lg:mt-0 md:mt-0 mt-5">
                                <button onClick={() => this.compare()} className="text-sm mb-1 px-5 py-2 bg-indigo-600 text-white rounded-sm font-semibold">
                                    COMPARE
                                </button>
                            </div>
                        }
                        {
                            this.state.blocker &&
                            <div className="flex justify-center lg:mt-0 md:mt-0 mt-5">
                                <button className="mb-1 px-5 py-2 bg-indigo-800 text-white rounded-sm font-semibold">
                                    Loading...
                                </button>
                            </div>
                        }
                    </div>
                </div>
                <datalist id="country-names"></datalist>

                <div className="my-12 lg:flex block">
                    <div className="lg:w-8/12 w-full flex">
                        <div className="w-1/2">
                            <div className="a-center">
                                <div className="city-1-temp-timezone timezone">{this.state.city_1_details?.timezone || 'UTC+0:00'}</div>
                            </div>
                            <div className="a-center">
                                <div className={"a-center " + (this.state.city_1_details?.className || 'mid')}>
                                    <span className="text-2xl font-semibold flex">
                                        {
                                            this.state.format === 'c' &&
                                            <span className="mx-1">{this.state.city_1_details?.temp || 'NA'}</span>
                                        }
                                        {
                                            this.state.format === 'f' &&
                                            <span className="mx-1">{this.state.city_1_details?.ftemp || 'NA'}</span>
                                        }
                                        <span className="text-3xl">&deg;</span>
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="w-1/2">
                            <div className="a-center">
                                <div className="city-2-temp-timezone timezone">{this.state.city_2_details?.timezone || 'UTC+0:00'}</div>
                            </div>
                            <div className="a-center">
                                <div className={"a-center " + (this.state.city_2_details?.className || 'mid')}>
                                    <span className="text-2xl font-semibold flex">
                                        {
                                            this.state.format === 'c' &&
                                            <span className="mx-1">{this.state.city_2_details?.temp || 'NA'}</span>
                                        }
                                        {
                                            this.state.format === 'f' &&
                                            <span className="mx-1">{this.state.city_2_details?.ftemp || 'NA'}</span>
                                        }
                                        <span className="text-3xl">&deg;</span>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="lg:w-4/12 w-full lg:mt-0 mt-5 a-center">
                        <div>
                            <span className="block">
                                <p>
                                    <label className="flex">
                                        <input onClick={() => this.changeFormat('c')} checked={this.state.format === 'c'} className="mr-1 cursor-pointer" name="temperature" id="celsius" type="radio" value="c" />
                                        <span className="cursor-pointer">Celsius</span>
                                    </label>
                                </p>
                                <p>
                                    <label className="flex">
                                        <input onClick={() => this.changeFormat('f')} checked={this.state.format === 'f'} className="mr-1 cursor-pointer" name="temperature" id="fahrenheit" type="radio" value="f" />
                                        <span className="cursor-pointer">Fahrenheit</span>
                                    </label>
                                </p>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Home

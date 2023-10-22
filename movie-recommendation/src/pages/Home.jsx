import { useState, useEffect } from 'react'
import Movie from '../components/Movie'
import ListItem from '../components/ListItem'
import WarningAlert from '../components/WarningAlert'
import MailModal from '../components/MailModal'

export default function Home({ readMore }) {

    const [searchBar, setSearchbar] = useState('')
    const [searchList, setSearchList] = useState([])
    const [watchList, setWatchList] = useState([])
    const [loading, setLoading] = useState(false)
    const [warningAlert, setWarningAlert] = useState(false)
    const [mailModal, setMailModal] = useState(false)

    useEffect(() => {
        const findMovies = (search) => {
            if (searchBar.trim() === '') {
                return
            }
            setSearchList([])
            setLoading(true)
            fetch(`https://itunes.apple.com/search?term=${search}`)
                .then(async (response) => await response.json())
                .then((data) => {
                    setSearchList(data.results)
                })
                .catch((error) => console.log(error))
                .finally(() => setLoading(false))
        }

        const debounceId = setTimeout(() => {
            findMovies(searchBar)
        }, 500)

        return () => {
            clearInterval(debounceId)
        }
    }, [searchBar])

    useEffect(() => {
        setSearchbar(localStorage.getItem('searchBar') || '')
        setWatchList(JSON.parse(localStorage.getItem('watchList')) || [])
    }, [])

    const addWatchList = (name, trackId) => {
        if (watchList.filter(x => x.id === trackId).length > 0) {
            setWarningAlert('Track Already Added')
            setTimeout(() => {
                setWarningAlert(false)
            }, 1000)
            return
        }
        if (watchList.length >= 5) {
            setWarningAlert('Only 5 Movies are allowed')
            setTimeout(() => {
                setWarningAlert(false)
            }, 1000)
            return
        }
        setWatchList(prev => {
            const newList = [...prev, { name, id: trackId }]
            localStorage.setItem('watchList', JSON.stringify(newList))
            return newList
        })
    }

    const openMailModal = () => {
        if (watchList.length === 0) {
            setWarningAlert('Recommended List is empty')
            setTimeout(() => {
                setWarningAlert(false)
            }, 1000)
            return
        }
        setMailModal(true)
    }

    const removeWatchList = (trackId) => {
        setWatchList(prev => {
            return prev.filter(x => x.id !== trackId)
        })
    }

    const searchBarOnChange = (e) => {
        localStorage.setItem('searchBar', e.target.value)
        setSearchbar(e.target.value)
    }

    return (
        <div className="relative w-screen min-h-screen bg-slate-200 pb-24">
            {
                warningAlert && <WarningAlert message={warningAlert} />
            }
            {
                mailModal && <MailModal list={watchList} setMailModal={setMailModal} />
            }
            <div className={warningAlert || mailModal ? 'blur-sm' : ''}>
                <div className="flex justify-center">
                    <div className="bg-sky-800 opacity-50 p-3 rounded-lg mt-8">
                        <span className="lg:text-4xl md:text-3xl sm:text-2xl text-xl m-0 p-0 text-center text-slate-100">Movie
                            Recommendations</span>
                    </div>
                </div>
                <div className="lg:flex md:flex block justify-center my-20">
                    <div className="lg:w-2/3 md:w-10/12 w-full">
                        <div className="w-full flex a-center">
                            <div className="flex justify-center lg:w-2/3 md:w-10/12 w-full">
                                <div className="w-8/12 lg:h-auto md:h-auto h-10 px-2">
                                    <input id="search-bar" value={searchBar} onChange={searchBarOnChange}
                                        className="border w-full border-md px-3 h-full rounded-md " type="text" />
                                </div>
                                <div className="w-4/12 a-center">
                                    {
                                        loading
                                            ? <div className="w-full flex justify-end pr-1">
                                                <button
                                                    className="rounded-md h-full bg-indigo-800 text-slate-100 font-semibold truncate py-2 px-5 cursor-not-allowed opacity-90">Loading ...</button>
                                            </div>
                                            : <div className="w-full flex justify-end pr-1">
                                                <button
                                                    className="rounded-md h-full bg-indigo-800 text-slate-100 font-semibold py-2 px-7">Search</button>
                                            </div>
                                    }

                                </div>
                            </div>
                        </div>
                        <div className="flex justify-center">

                            <div className="relative search-list-container h-[400px] overflow-y-scroll mt-6 lg:w-2/3 md:w-10/12 w-full py-1">
                                {
                                    loading &&
                                    <div className="absolute left-0 top-0 w-full h-full bg-slate-300 rounded-md blocker hidden opacity-100 a-center">
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-75" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth={4}></circle>
                                            <path className="text-slate-700 opacity-100" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                    </div>
                                }
                                <div className="search-list">
                                    {
                                        searchList.map((item, index) => {
                                            const name = item.collectionCensoredName || item.collectionName
                                            return <Movie key={'movie-' + index} item={item} onAdd={() => { addWatchList(name, item.trackId) }} readMore={readMore} />
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="lg:w-1/2 md:w-8/12 w-full">
                        <div className="w-full a-center lg:mt-0 md:mt-0 mt-8">
                            <p className="text-slate-500 font-semibold">WATCHLIST</p>
                        </div>
                        <div className="flex justify-center">
                            <div className="flex flex-col">
                                <div className="flex justify-center">
                                    <span className="text-slate-600 font-semibold text-md">Selected Movies will appear here</span>
                                </div>
                                <div className="flex justify-center">
                                    <span className="text-slate-600 font-semibold text-md">[Click add button on the search results to add an item to the list]</span>
                                </div>
                                <div className="min-h-[350px] a-center">
                                    <div className="mt-4 watch-list">
                                        {
                                            watchList.map(item => {
                                                return <ListItem key={'item-' + item.id} name={item.name} removeTrack={() => removeWatchList(item.id)} />
                                            })
                                        }
                                    </div>
                                </div>
                                <div className="a-center">
                                    <button className="bg-indigo-800 rounded-md font-semibold text-white p-2 px-4" onClick={openMailModal}>MAIL RECOMMENDATIONS</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
import './css/ReadMore.css'
import { useState, useEffect } from 'react'

export default function ReadMore({ item }) {

    const [animation, setAnimation] = useState(false)

    useEffect(() => {
        setAnimation(true)
    }, [])

    return (
        <div className="w-screen min-h-screen bg-slate-200">
            <div className="a-center pt-10">
                <img className={"w-[150px] aspect-[2/3] rounded-md shadow-2xl img-hide " + (animation ? 'img-show' : '')} src={item.artworkUrl100} alt="" />
            </div>
            <div className="container mx-auto">
                <div className="p-5">
                    <div className="flex justify-center">
                        <p className="heading">Name</p>
                        <span className="spacer">:</span>
                        <p className="info">{item.collectionCensoredName || item.collectionName || 'unknown'}</p>
                    </div>
                    <div className="flex justify-center">
                        <p className="heading">Track Name</p>
                        <span className="spacer">:</span>
                        <p className="info">{item.trackName || 'unknown'}</p>
                    </div>
                    <div className="flex justify-center">
                        <p className="heading">View Track</p>
                        <span className="spacer">:</span>
                        <a href={item.trackViewUrl} target='_blank' className="py-2 font-semibold w-6/12 text-indigo-400" rel="noreferrer">Click Here</a>
                    </div>
                    <div className="flex justify-center">
                        <p className="heading">Collection Id</p>
                        <span className="spacer">:</span>
                        <p className="info">{item.collectionId || 'unknown'}</p>
                    </div>
                    <div className="flex justify-center">
                        <p className="heading">View Collection</p>
                        <span className="spacer">:</span>
                        <a href={item.collectionViewUrl} target='_blank' className="py-2 font-semibold w-6/12 text-indigo-400" rel="noreferrer">Click Here</a>
                    </div>
                    <div className="flex justify-center">
                        <p className="heading">Artist Name</p>
                        <span className="spacer">:</span>
                        <p className="info">{item.artistName || 'unknown'}</p>
                    </div>
                    <div className="flex justify-center">
                        <p className="heading">View Artist</p>
                        <span className="spacer">:</span>
                        <a href={item.collectionArtistViewUrl} target='_blank' className="py-2 font-semibold w-6/12 text-indigo-400" rel="noreferrer">Click Here</a>
                    </div>
                    <div className="flex justify-center">
                        <p className="heading">Artist Id</p>
                        <span className="spacer">:</span>
                        <p className="info">{item.collectionArtistId || 'unknown'}</p>
                    </div>
                    <div className="flex justify-center">
                        <p className="heading">Collection HD price</p>
                        <span className="spacer">:</span>
                        <p className="info">{(item.collectionHdPrice + ' ' + item.currency) || 'unknown'}</p>
                    </div>
                    <div className="flex justify-center">
                        <p className="heading">Track HD Rental price</p>
                        <span className="spacer">:</span>
                        <p className="info">{(item.trackHdRentalPrice + ' ' + item.currency) || 'unknown'}</p>
                    </div>
                    <div className="flex justify-center">
                        <p className="heading">Track HD price</p>
                        <span className="spacer">:</span>
                        <p className="info">{(item.trackHdPrice + ' ' + item.currency) || 'unknown'}</p>
                    </div>
                    <div className="flex justify-center">
                        <p className="heading">Collection price</p>
                        <span className="spacer">:</span>
                        <p className="info">{(item.collectionPrice + ' ' + item.currency) || 'unknown'}</p>
                    </div>
                    <div className="flex justify-center">
                        <p className="heading">Track Rental price</p>
                        <span className="spacer">:</span>
                        <p className="info">{(item.trackRentalPrice + ' ' + item.currency) || 'unknown'}</p>
                    </div>
                    <div className="flex justify-center">
                        <p className="heading">Track price</p>
                        <span className="spacer">:</span>
                        <p className="info">{(item.trackPrice + ' ' + item.currency) || 'unknown'}</p>
                    </div>
                    <div className="flex justify-center">
                        <p className="heading">Preview</p>
                        <span className="spacer">:</span>
                        <a href={item.previewUrl} target='_blank' className="py-2 font-semibold w-6/12 text-indigo-400" rel="noreferrer">Click Here</a>
                    </div>
                    <div className="flex justify-center">
                        <p className="heading">Rating</p>
                        <span className="spacer">:</span>
                        <p className="info">{item.contentAdvisoryRating || 'unknown'}</p>
                    </div>
                    <div className="flex justify-center">
                        <p className="heading">Country</p>
                        <span className="spacer">:</span>
                        <p className="info">{item.country || 'unknown'}</p>
                    </div>
                    <div className="flex justify-center">
                        <p className="heading">Description</p>
                        <span className="spacer">:</span>
                        <p className="info">{item.longDescription || 'unknown'}</p>
                    </div>
                    <div className="flex justify-center">
                        <p className="heading">Track Count</p>
                        <span className="spacer">:</span>
                        <p className="info">{item.trackCount || 'unknown'}</p>
                    </div>
                    <div className="flex justify-center">
                        <p className="heading">Release Date</p>
                        <span className="spacer">:</span>
                        <p className="info">{(item.releaseDate?.split('T')[0]?.replaceAll('-', '/')) || 'unknown'}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
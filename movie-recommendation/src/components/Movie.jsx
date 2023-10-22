import { useNavigate } from 'react-router-dom'

export default function Movie({ item, onAdd, readMore }) {

    const navigate = useNavigate()
    const image = item.artworkUrl100
    const name = item.collectionCensoredName || item.collectionName
    const { artistName } = item

    const navigateToReadMore = () => {
        readMore(item)
        navigate('/readmore')
    }

    return (
        <div className="bg-slate-300 rounded-lg m-2 p-2">
            <div className="flex">
                <div className="w-2/12 flex flex-col justify-center">
                    <img src={image} className="aspect-[5/6]" alt="item_image" />
                </div>
                <div className="w-7/12 flex flex-col justify-between p-2">
                    <p className="text-sm font-semibold text-slate-600">{name}</p>
                    <p className="text-sm font-semibold text-indigo-900">{artistName}</p>
                </div>
                <div className="w-3/12 flex flex-col justify-between p-2">
                    <button onClick={onAdd} className="bg-emerald-500 rounded-md p-2 text-white">ADD</button>
                    <button className="text-indigo-700 font-semibold text-center" onClick={navigateToReadMore} >read more</button>
                </div>
            </div>
        </div>
    )
}

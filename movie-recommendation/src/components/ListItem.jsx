export default function ListItem({ id, name, removeTrack }) {
    return (
        <div className="flex m-1 p-1" id={id}>
            <div className="a-center">
                <button onClick={removeTrack} type="button" className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                    <span className="sr-only">Close menu</span>
                    <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
            <div className="a-center px-2">
                <p className="text-slate-800 font-semibold movie-name" value={name}>{name}</p>
            </div>
        </div>
    )
}
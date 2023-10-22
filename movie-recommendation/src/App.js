import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import ReadMore from './pages/ReadMore'
import PageNotFound from './pages/PageNotFound'
import { useState } from 'react'

function App() {

	const [elementProps, setElementProps] = useState({
		"wrapperType": "track",
		"kind": "feature-movie",
		"collectionId": 1600477838,
		"trackId": 688163154,
		"artistName": "Jon Favreau",
		"collectionName": "Iron Man 3-Movie Collection",
		"trackName": "Iron Man",
		"collectionCensoredName": "Iron Man 3-Movie Collection",
		"trackCensoredName": "Iron Man",
		"collectionArtistId": 410641764,
		"collectionArtistViewUrl": "https://itunes.apple.com/us/artist/buena-vista-home-entertainment-inc/410641764?uo=4",
		"collectionViewUrl": "https://itunes.apple.com/us/movie/iron-man/id688163154?uo=4",
		"trackViewUrl": "https://itunes.apple.com/us/movie/iron-man/id688163154?uo=4",
		"previewUrl": "https://video-ssl.itunes.apple.com/itunes-assets/Video127/v4/67/dd/a4/67dda4b6-16a1-1568-f57a-e1717031ee93/mzvf_2347745602296364888.640x362.h264lc.U.p.m4v",
		"artworkUrl30": "https://is1-ssl.mzstatic.com/image/thumb/Video128/v4/89/74/cf/8974cfa0-5e27-1c5e-390a-e97e5d12a51d/contsched.rdzrzprk.lsr/30x30bb.jpg",
		"artworkUrl60": "https://is1-ssl.mzstatic.com/image/thumb/Video128/v4/89/74/cf/8974cfa0-5e27-1c5e-390a-e97e5d12a51d/contsched.rdzrzprk.lsr/60x60bb.jpg",
		"artworkUrl100": "https://is1-ssl.mzstatic.com/image/thumb/Video128/v4/89/74/cf/8974cfa0-5e27-1c5e-390a-e97e5d12a51d/contsched.rdzrzprk.lsr/100x100bb.jpg",
		"collectionPrice": 19.99,
		"trackPrice": 19.99,
		"trackRentalPrice": 3.99,
		"collectionHdPrice": 19.99,
		"trackHdPrice": 19.99,
		"trackHdRentalPrice": 3.99,
		"releaseDate": "2008-05-02T07:00:00Z",
		"collectionExplicitness": "notExplicit",
		"trackExplicitness": "notExplicit",
		"discCount": 1,
		"discNumber": 1,
		"trackCount": 3,
		"trackNumber": 1,
		"trackTimeMillis": 7589915,
		"country": "USA",
		"currency": "USD",
		"primaryGenreName": "Action & Adventure",
		"contentAdvisoryRating": "PG-13",
		"shortDescription": "After surviving an unexpected attack in enemy territory, jet-setting industrialist Tony Stark builds",
		"longDescription": "After surviving an unexpected attack in enemy territory, jet-setting industrialist Tony Stark builds a high-tech suit of armor and vows to protect the world as Iron Man. Straight from the pages of the legendary comic book, Iron Man is a hero who is built - not born - to be unlike any other.",
		"hasITunesExtras": true
	})

	return (
		<BrowserRouter>
			<Routes path="/">
				<Route index element={<Home readMore={setElementProps} />} />
				<Route path="home" element={<Home readMore={setElementProps} />} />
				<Route path="readmore" element={<ReadMore item={elementProps} />} />
				<Route path="*" element={<PageNotFound />} />
			</Routes>
		</BrowserRouter>
	)
}

export default App

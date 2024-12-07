import { useState, useEffect } from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import { PiBookOpenTextLight } from 'react-icons/pi'
import { BiUserCircle } from 'react-icons/bi'
import { CiCircleInfo, CiCalendar  } from 'react-icons/ci'
import { Buffer } from 'buffer'

const BookModal = ({ book, onClose }) => {

	const [imageUrl, setImageUrl] = useState('');

	const { title, cover } = book;

	useEffect(() => {
		if (cover && cover.data) {
			const base64String = Buffer.from(book.cover.data.data).toString('base64');
			setImageUrl(`data:${book.cover.contentType};base64,${base64String}`);
		}
	}, [])

	return (
		<div className="fixed bg-black bg-opacity-60 top-0 left-0 right-0 bottom-0 z-50 flex justify-center items-center" onClick={onClose}>
			<div onClick={event => event.stopPropagation()} className="w-4/5 h-5/6 bg-white shadow-md shadow-slate-800 rounded-xl p-8 grid grid-cols-auto-fit-300 relative">
				<div className="my-1 col-span-1 row-span-2 h-full w-full">
					<img className="w-5/6 h-4/5 object-cover rounded-xl shadow-lg shadow-slate-700 mx-auto" src={imageUrl} alt={title}/>
				</div>
				<AiOutlineClose className="transition duration-500 ease-in-out absolute right-4 top-4 text-3xl text-red-600 shadow-sm rounded-md cursor-pointer hover:scale-110" onClick={onClose}></AiOutlineClose>
				<div className="col-start-2 grid grid-cols-3">
					<div className="flex justify-start items-center gap-x-2">
						<PiBookOpenTextLight className="text-blue-500 m-2 text-2xl"></PiBookOpenTextLight>
						<h2 className="my-1 ">{book.title}</h2>
					</div>
					<div className="flex justify-start items-center gap-x-2">
						<BiUserCircle className="text-green-300 m-2 text-2xl"></BiUserCircle>
						<h2 className="my-1 ">{book.author}</h2>
					</div>
					<div className="flex justify-start items-center gap-x-2">
						<CiCalendar className="text-red-600 m-2 text-2xl"></CiCalendar>
						<h2 className="my-1 ">{book.publishYear}</h2>
					</div>
					<h4 className="w-full flex justify-center items-center gap-x-1 my-2 text-xs text-gray-500"><CiCircleInfo></CiCircleInfo>{book._id}</h4>
				</div>
				<div className="col-span-1 col-start-2 text-pretty">
					<p className="my-4">{book.description}</p>
				</div>
			</div>
		</div>
	)
}

export default BookModal
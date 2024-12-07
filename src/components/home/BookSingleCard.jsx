import { Link } from 'react-router-dom'
import { PiBookOpenTextLight } from 'react-icons/pi'
import { CiCircleInfo, CiCalendar } from "react-icons/ci";
import { BiUserCircle, BiShow } from 'react-icons/bi'
import { AiOutlineEdit } from 'react-icons/ai'
import { BsInfoCircle } from 'react-icons/bs'
import { MdOutlineDelete } from 'react-icons/md'
import React, { useState, useEffect } from 'react'
import { Buffer } from 'buffer'
import BookModal from './BookModal.jsx'

const BookSingleCard = ({ book }) => {
	const [showModal, setShowModal] = useState(false);
	const [imageUrl, setImageUrl] = useState('');
	useEffect(() => {
		if (book.cover && book.cover.data) {
					const base64String = Buffer.from(book.cover.data.data).toString('base64');
			setImageUrl(`data:${book.cover.contentType};base64,${base64String}`);
		}
	}, [])

	return (
		<div key={book._id} className="border border-slate-400 rounded-lg p-4 m-4 relative shadow-md shadow-slate-500 bg-black bg-opacity-60">
			<div style={{ backgroundImage: `url(${imageUrl})`}} className="bg-cover bg-center w-full h-full absolute inset-0 -z-50 rounded-lg"></div>
			<h4 className="w-full flex justify-center items-center gap-x-1 my-2 text-xs text-slate-100"><CiCircleInfo></CiCircleInfo>{book._id}</h4>
			<div className="flex justify-start items-center gap-x-2">
				<PiBookOpenTextLight className="text-blue-500 m-2 text-2xl"></PiBookOpenTextLight>
				<h2 className="my-1 text-white">{book.title}</h2>
			</div>
			<div className="flex justify-start items-center gap-x-2">
				<BiUserCircle className="text-green-300 m-2 text-2xl"></BiUserCircle>
				<h2 className="my-1 text-white">{book.author}</h2>
			</div>
			<div className="flex justify-start items-center gap-x-2">
				<CiCalendar className="text-red-600 m-2 text-2xl"></CiCalendar>
				<h2 className="my-1 text-white">{book.publishYear}</h2>
			</div>
			<div className="flex justify-between items-center gap-x-2 mt-4 p-4">
				<BiShow className="transition-colors duration-500 ease-in-out text-3xl text-blue-400 hover:text-white cursor-pointer" onClick={() => setShowModal(true)}></BiShow>
				<Link to={`/books/details/${book._id}`}>
					<BsInfoCircle className="transition-colors duration-500 ease-in-out text-2xl text-green-600 hover:text-white"></BsInfoCircle>
				</Link>
				<Link to={`books/edit/${book._id}`}>
					<AiOutlineEdit className="transition-colors duration-500 ease-in-out text-2xl text-yellow-600 hover:text-white"></AiOutlineEdit>
				</Link>
				<Link to={`/books/delete/${book._id}`}>
					<MdOutlineDelete className="transition-colors duration-500 ease-in-out text-2xl text-red-600 hover:text-white"></MdOutlineDelete>
				</Link>
			</div>
			{
				showModal && (
					<BookModal book={book} onClose={() => setShowModal(false)}></BookModal>
				)
			}
		</div>
	)
}

export default BookSingleCard
import React from 'react'
import { Link } from 'react-router-dom'
import { BsArrowLeft } from 'react-icons/bs'

const BackButton = ({ destination = "/" }) => {
	return (
		<div className="flex">
			<Link to={destination} className="transition duration-500 ease-in-out border-2 border-slate-200 px-4 py-2 rounded-lg w-fit hover:bg-slate-100">
				<BsArrowLeft className="text-3xl"></BsArrowLeft>
			</Link>
		</div>
	)
}

export default BackButton
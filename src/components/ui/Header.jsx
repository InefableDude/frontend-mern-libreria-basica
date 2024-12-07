import React from 'react'
import { PiBookOpenTextThin } from "react-icons/pi";

const Header = () => {
	return (
		<div className="border-b-4 border-slate-300 p-4 w-full flex flex-start items-center gap-x-4 shadow-lg">
			<PiBookOpenTextThin className="text-6xl text-blue-600"></PiBookOpenTextThin>
			<h1 className="text-4xl">My BookStore</h1>
		</div>
	)
}

export default Header
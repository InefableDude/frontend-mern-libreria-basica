import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Spinner from '../components/ui/Spinner.jsx'
import BooksTable from '../components/home/BooksTable.jsx'
import BooksCard from '../components/home/BooksCard.jsx'
import Header from '../components/ui/Header.jsx'
import { Link } from 'react-router-dom'
import { AiOutlineEdit } from 'react-icons/ai'
import { BsInfoCircle } from 'react-icons/bs'
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md'
import { RxTable } from "react-icons/rx";
import { RiLayoutGridLine } from "react-icons/ri";
import { IoLibraryOutline } from "react-icons/io5";

const Home = () => {
	const [books, setBooks] = useState([]);
	const [loading, setLoading] = useState(false);
	const [showType, setShowType] = useState(() => {
		return localStorage.getItem("show_type") || "table";
	});

	useEffect(() => {
		const fetchData = async () => {
			setLoading(true);

			try {
				const res = await axios.get('http://localhost:5555/books');
				setBooks(res.data.data);
			} catch(error) {
				console.error(error);
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, []);

	useEffect(() => {
		localStorage.setItem("show_type", showType);
	}, [showType]);


	return (
		<div>
			<Header></Header>
			<div className="p-4">	
				<div className="w-full flex justify-around items-center gap-x-4">
					<h2 className="text-3xl my-8 flex gap-x-2"><IoLibraryOutline className="text-4xl"></IoLibraryOutline> Mi lista de libros</h2>
					<div className="flex gap-x-4">
						<button className={`transition duration-500 ease-in-out border border-slate-300 shadow-lg px-4 py-2 rounded-lg flex gap-x-4 justify-between items-center w-fit text-lg ${showType === 'table' ? 'bg-black text-white hover:bg-slate-800' : 'bg-white text-black hover:bg-slate-100'}`} onClick={() => setShowType('table')}>{<RxTable className="text-2xl"></RxTable>}Tabla</button>
						<button className={`transition duration-500 ease-in-out border border-slate-300 shadow-lg px-4 py-2 rounded-lg flex gap-x-4 justify-between items-center w-fit text-lg ${showType === 'card' ? 'bg-black text-white hover:bg-slate-800' : 'bg-white text-black hover:bg-slate-100'}`} onClick={() => setShowType('card')}>{<RiLayoutGridLine className="text-2xl"></RiLayoutGridLine>}Tarjetas</button>
					</div>
					<Link to="/books/create">
						<MdOutlineAddBox className="transition-color duration-500 ease-in-out text-green-600 text-5xl hover:text-green-700"></MdOutlineAddBox>
					</Link>
				</div>
				{ loading ? (<Spinner></Spinner>) : showType === 'table' ? (<BooksTable books={books}></BooksTable>) : (<BooksCard books={books}></BooksCard>) }
			</div>
		</div>
	)
}

export default Home
import React, { useEffect, useState } from 'react'
import BackButton from '../components/ui/BackButton.jsx'
import Spinner from '../components/ui/Spinner.jsx'
import Header from '../components/ui/Header.jsx'
import axios from 'axios'
import { Buffer } from 'buffer';
import { useParams } from 'react-router-dom'

const ShowBook = () => {
	const [book, setBook] = useState({});
	const [imageUrl, setImageUrl] = useState('');
	const [loading, setLoading] = useState(false);
	const { id } = useParams();

	useEffect(() => {
		const fetchData = async () => {
			setLoading(true);

			try {
				const res = await axios.get(`http://localhost:5555/books/${id}`);
				const { book } = res.data;

				setBook(book);

				if (book.cover && book.cover.data) {
					const base64String = Buffer.from(book.cover.data.data).toString('base64');
					setImageUrl(`data:${book.cover.contentType};base64,${base64String}`);
				}

			} catch(error) {
				console.error(error);
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, [])



	return (
		<div>
			<Header></Header>
			<div className="p-4 w-full flex items-center">
				<BackButton></BackButton>
				<h2 className="text-3xl text-center my-4 w-full">Informacion del libro</h2>
			</div>
			{loading ? (
				<Spinner></Spinner>
			) : (
				<div className="flex flex-col border border-slate-300 shadow-md rounded-xl w-5/6 p-4 mx-auto my-4">
					<div className="w-full flex my-4 justify-center items-center gap-x-4">
						<span className="text-xl text-gray-500">Titulo - </span>
						<span className="text-3xl">{book.title}</span>
					</div>
					<div className="text-xs border-b border-slate-200">
						<span className="text-gray-500">Id - </span>
						<span>{book._id}</span>
					</div>
					<div className="w-full mx-auto my-4 flex justify-around items-center gap-x-4">
						<div>
							<span className="text-gray-500">Autor - </span>
							<span>{book.author}</span>
						</div>
						<div>
							<span className="text-gray-500">Año de publicacion - </span>
							<span>{book.publishYear}</span>
						</div>
						<div>
							<span className="text-gray-500">Fecha de creacion - </span>
							<span>{new Date(book.createdAt).toDateString()}</span>
						</div>
						<div>
							<span className="text-gray-500">Ultima actualizacion - </span>
							<span>{new Date(book.updatedAt).toDateString()}</span>
						</div>
					</div>
					<div className="my-4 w-3/4 mx-auto">
						<img className="w-full h-full object-cover rounded-xl shadow-md" src={imageUrl} alt={book.title} />
					</div>
					<div className="my-4 w-3/4 mx-auto">
						<p>{book.content}</p>
					</div>
				</div>
			)}
		</div>
	)
}

export default ShowBook
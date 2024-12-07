import React, { useState, useEffect } from 'react'
import BackButton from '../components/ui/BackButton.jsx'
import Spinner from '../components/ui/Spinner.jsx'
import Header from '../components/ui/Header.jsx'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import { useSnackbar } from 'notistack'

const DeleteBook = () => {
	const [loading, setLoading] = useState(false);
	const [title, setTitle] = useState('');
	const [author, setAuthor] = useState('');
	const [publishYear, setPublishYear] = useState('');
	const [description, setDescription] = useState('');
	const navigate = useNavigate();
	const { id } = useParams();
	const { enqueueSnackbar } = useSnackbar();

	useEffect(() => {
		const fetchData = async () => {
			setLoading(true);
			try {
				const res = await axios.get(`http://localhost:5555/books/${id}`);

				setTitle(res.data.book.title);
				setAuthor(res.data.book.author);
				setPublishYear(res.data.book.publishYear);
				setDescription(res.data.book.description);
			} catch(error) {
				enqueueSnackbar('Error', { variant: 'error' });
				console.error(error);
			} finally {
				setLoading(false);
			}
		}

		fetchData();
	}, [])


	const handleDeleteBook = async () => {
		setLoading(true);

		try {
			const res = await axios.delete(`http://localhost:5555/books/${id}`);
			enqueueSnackbar(`${title} eliminado correctamente`, { variant: 'info' });
			navigate('/');
		} catch(error) {
			enqueueSnackbar('Error', { variant: 'error' });
			console.error(error);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div>
			<Header></Header>
			<div className="p-4">
				<BackButton></BackButton>
				{loading ? <Spinner></Spinner> : ""}
				<div className="flex flex-col items-center border-2 border-slate-200 rounded-xl w-[600px] shadow-md p-8 mx-auto">
					<h2 className="text-3xl">Confirmar eliminacion</h2>
					<div className="flex flex-col w-5/6 my-4 justify-center items-start gap-y-2">
						<p className="text-lg">¿Estas seguro de que quieres eliminar el siguiente libro?</p>
						<p className="font-bold">Titulo - <span className="font-normal">{title}</span></p>
						<p className="font-bold">Autor - <span className="font-normal">{author}</span></p>
						<p className="font-bold">Año de publicacion - <span className="font-normal">{publishYear}</span></p>
						<p className="font-bold">Descripcion del libro - <span className="font-normal">{description}</span></p>
					</div>
					<button className="transition duration-500 ease-in-out p-4 shadow-md border border-red-800 bg-red-600 hover:bg-red-700 text-white rounded-xl m-8 w-3/4" onClick={handleDeleteBook}>Si, Borrar</button>
				</div>
			</div>
		</div>
	)
}

export default DeleteBook
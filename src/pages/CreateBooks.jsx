import React, { useState } from 'react'
import BackButton from '../components/ui/BackButton.jsx'
import Spinner from '../components/ui/Spinner.jsx'
import Header from '../components/ui/Header.jsx'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useSnackbar } from 'notistack'

const CreateBooks = () => {
	const [title, setTitle] = useState('');
	const [author, setAuthor] = useState('');
	const [publishYear, setPublishYear] = useState('');
	const [description, setDescription] = useState('');
	const [content, setContent] = useState('');
	const [cover, setCover] = useState(null);
	const [loading, setLoading] = useState(false);

	const { enqueueSnackbar } = useSnackbar();
	const navigate = useNavigate();
	
	const updateHeight = event => {
		const textarea = event.target;
		textarea.style.height = "auto";
		textarea.style.height = `${textarea.scrollHeight}px`;
	}

	const handleSaveBook = async () => {
		const data = {
			title,
			author,
			publishYear,
			description,
			content,
			cover,
		};

		setLoading(true);

		try {
			const res = await axios.post('http://localhost:5555/books', data, { headers: { "Content-Type": "multipart/form-data", }, });
			enqueueSnackbar(`${data.title} creado correctamente`, { variant: 'success' });
			navigate('/');
		} catch(error) {
			enqueueSnackbar(`${error.response.data.message}`, { variant: 'error' });
			console.error(error);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div>
			<Header></Header>
			<div className="p-4">
				<div className="p-4 w-full flex items-center">
					<BackButton></BackButton>
					<h2 className="text-3xl text-center my-4 w-full">Crear un libro</h2>
				</div>
				{loading ? (<Spinner></Spinner>) : ('')}
				<div className="flex flex-col border border-slate-200 rounded-xl w-[600px] p-4 mx-auto shadow-md">
					<div className="my-4">
						<label className="text-xl text-gray-500">Titulo</label>
						<input type="text" value={title} onChange={e => setTitle(e.target.value)} className="border border-slate-200 shadow-md rounded-xl px-4 py-2 w-full"/>
					</div>
					<div className="my-4">
						<label className="text-xl text-gray-500">Autor</label>
						<input type="text" value={author} onChange={e => setAuthor(e.target.value)} className="border border-slate-200 shadow-md rounded-xl px-4 py-2 w-full"/>
					</div>
					<div className="my-4">
						<label className="text-xl text-gray-500">Año de publicacion</label>
						<input type="number" min="0" value={publishYear} onChange={e => setPublishYear(e.target.value)} className="border border-slate-200 shadow-md rounded-xl px-4 py-2 w-full"/>
					</div>
					<div className="my-4">
						<label className="text-xl text-gray-500">Descripcion del libro</label>
						<textarea value={description} maxlenght="900" onChange={e => {setDescription(e.target.value); updateHeight(e);}} className="overflow-hidden resize-none border border-slate-200 shadow-md rounded-xl px-4 py-2 w-full"></textarea>
					</div>
					<div className="my-4">
						<label className="text-xl text-gray-500">Contenido del libro</label>
						<textarea value={content} onChange={e => {setContent(e.target.value); updateHeight(e)}} className="overflow-hidden resize-none border border-slate-200 shadow-md rounded-xl px-4 py-2 w-full"></textarea>
					</div>
					<div className="my-4">
						<label className="text-xl text-gray-500">Portada del libro</label>
						<input type="file" onChange={e => setCover(e.target.files[0])} className="border border-slate-200 shadow-md rounded-xl px-4 py-2 w-full"/>
					</div>
					<button className="transition duration-500 ease-in-out hover:bg-green-500 p-2 border border-green-200 bg-green-400 text-xl text-white m-8 shadow-md rounded-xl" onClick={handleSaveBook}>Crear</button>
				</div>
			</div>
		</div>
	)
}

export default CreateBooks
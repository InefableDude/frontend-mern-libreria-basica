import React from 'react'
import { Link } from 'react-router-dom'
import { AiOutlineEdit } from 'react-icons/ai'
import { BsInfoCircle } from 'react-icons/bs'
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md'

const BooksTable = ({ books }) => {
	return (
		<table className="w-full shadow-lg">
			<thead>
				<tr className="border-b h-12 text-left">
					<th className="p-4">No</th>
					<th>Titulo</th>
					<th className="text-center max-md:hidden">Autor</th>
					<th className="text-center max-md:hidden">Año de publicacion</th>
					<th className="text-center">Operaciones</th>
				</tr>
			</thead>
			<tbody>
				{books.map((book, index) => (
					<tr key={book._id} className="text-left h-12 border-b">
						<td className="text-center w-16">
							{index + 1}
						</td>
						<td className="w-max">
							{book.title}
						</td>
						<td  className="text-center max-md:hidden">
							{book.author}
						</td>
						<td  className="text-center max-md:hidden">
							{book.publishYear}
						</td>
						<td className="w-fit">
							<div className="flex justify-center gap-x-4 ">
								<Link className="transition-colors duration-500 ease-in-out flex gap-x-4 p-4 border border-slate-200 my-2 rounded-lg shadow-md hover:bg-slate-100" to={`/books/details/${book._id}`}>
									<BsInfoCircle className="text-2xl text-green-800"></BsInfoCircle>
									Ver Libro
								</Link>
								<Link className="transition-colors duration-500 ease-in-out flex gap-x-4 p-4 border border-slate-200 my-2 rounded-lg shadow-md hover:bg-slate-100" to={`/books/edit/${book._id}`}>
									<AiOutlineEdit className="text-2xl text-yellow-600"></AiOutlineEdit>
									Editar Libro
								</Link>
								<Link className="transition-colors duration-500 ease-in-out flex gap-x-4 p-4 border border-slate-200 my-2 rounded-lg shadow-md hover:bg-slate-100" to={`/books/delete/${book._id}`}>
									<MdOutlineDelete className="text-2xl text-red-600"></MdOutlineDelete>
									Eliminar Libro
								</Link>
							</div>
						</td>
					</tr>
				))}
			</tbody>
		</table>
	)
}

export default BooksTable
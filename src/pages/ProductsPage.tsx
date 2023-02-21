import { CreateProduct } from "../components/CreateProducts";
import { ErrorMessage } from "../components/ErrorMessage";
import { Loader } from "../components/Loader"; 
import { Product } from "../components/Product"; 
import { useProducts } from "../hooks/products"; 
import { Modal } from "../components/Modal";
import React, { useContext } from 'react'
import { IProduct } from "../models";
import { ModalContext } from "../context/ModalContext"; 


export function ProductsPage() {
	const { loading, error, products, addProduct } = useProducts();
	const {
	  modal,
	  open: openModal,
	  close: closeModal,
	} = useContext(ModalContext);
 
	const createHandler = (product: IProduct) => {
	  closeModal();
	  addProduct(product);
	};
 
	return (
	  <div className="container mx-auto max-w-2xl pt-5">
		 {loading && <Loader />}
		 {error && <ErrorMessage error={error} />}
		 {products.map((product) => (
			<Product product={product} key={product.id} />
		 ))}
 
		 {modal && (
			<Modal title="Create new product" onClose={closeModal}>
			  <CreateProduct onCreate={createHandler} />
			</Modal>
		 )}
 
		 <button
			className="fixed bottom-5 right-5 rounded-full bg-red-700 text-white text-2xl px-4 py-2"
			onClick={openModal}
		 >
			+
		 </button>
	  </div>
	);
}
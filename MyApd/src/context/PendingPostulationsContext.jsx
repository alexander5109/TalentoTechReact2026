import { useState, useContext, createContext } from 'react';

export const PendingPostulationsContext = createContext();

export function usePendingPostulations() {
	const context = useContext(PendingPostulationsContext);
	if (!context) {
		throw new Error('usePendingPostulations debe ser usado dentro de un CartProvider');
	}
	return context;
};

export function PendingPostulationsProvider({ children }) {
	const [cart, setCart] = useState([]);
	const addToCart = (product, quantity) => {
		const itemInCart = cart.find(item => item.id === product.id);
		if (itemInCart) {
			const updatedCart = cart.map(item =>
				item.id === product.id
					? { ...item, quantity: item.quantity + quantity }
					: item
			);
			setCart(updatedCart);
		} else {
			setCart(prevCart => [...prevCart, { ...product, quantity }]);
		}
	};
	const clearCart = () => setCart([]);
	const getCartQuantity = () => cart.reduce((acc, item) => acc + item.quantity, 0);
	const getCartTotal = () => cart.reduce((acc, item) => acc + item.precio * item.quantity, 0);
	return (
		<PendingPostulationsContext.Provider value={{
			cart, addToCart, clearCart,
			getCartQuantity, getCartTotal
		}}>
			{children}
		</PendingPostulationsContext.Provider>
	);
};

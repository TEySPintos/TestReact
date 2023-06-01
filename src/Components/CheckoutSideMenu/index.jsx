import { useContext } from "react";
import { Link } from "react-router-dom";
import { ShoppingCartContext } from "../../Context"
import './styles.css'
import OrderCard from "../../Components/OrderCard";
import { totalPrice } from '../../Utils'
import { XMarkIcon } from '@heroicons/react/24/solid'

const CheckoutSideMenu = () => {
    const context = useContext(ShoppingCartContext);

    const handleDelete = (id) => {
        const filteredProducts = context.cartProducts.filter(product => product.id != id);

        context.setCartProducts(filteredProducts);
        context.setCount(context.count - 1);
    };

    const handleCheckout = () => {
        const orderToAdd = {
            date: '31/05/2023',
            products: context.cartProducts,
            totalProducts: context.cartProducts.length,
            totalPrice: totalPrice(context.cartProducts),
        }

        context.setOrder([...context.order, orderToAdd]);
        context.setCartProducts([]);
        //context.setCount(0);
        context.setSearchByTitle(null);
    };

    return (
        <aside 
            className={`${context.isCheckoutSideMenuOpen ? 'flex' : 'hidden'} checkout-side-menu flex-col fixed right-0 border border-black rounded-lg bg-white`}
        >
            <div className='flex justify-between item-center p-6'>
                <h2 className='font-medium text-xl'>My Order</h2>
                <div onClick={() => context.closeCheckoutSideMenu()}>
                    <XMarkIcon className='w-6 h-6 text-black cursor-pointer' />
                </div>
            </div>
            <div className='px-6 overflow-y-auto flex-1'>
                {
                    context.cartProducts.map(product => (
                        <OrderCard 
                            key={product.id}
                            id={product.id}
                            title={product.title} 
                            imageUrl={product.images}
                            price={product.price}
                            handleDelete={handleDelete}
                        />
                    ))
                }
            </div>
            <div className='px-6 mb-6'>
                <p className='flex justify-between items-center mb-2'>
                    <span className='font-light'>Total:</span>
                    <span className='font-medium text-2xl'>${totalPrice(context.cartProducts)}</span>
                </p>
                <Link to='/my-orders/last'>
                    <button className='bg-black py-3 text-white w-full rounded-lg' onClick={() => handleCheckout()}>Checkout</button>
                </Link>
            </div>
        </aside>
    );
}

export default CheckoutSideMenu
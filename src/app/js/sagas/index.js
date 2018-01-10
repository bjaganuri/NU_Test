import { takeLatest } from 'redux-saga';
import { fork } from 'redux-saga/effects';
import { FetchProdList, AddToCart, RemoveFromCart } from './shoppingCart';

export function* sagas() {
	yield [
		fork(takeLatest, 'fetchProdList', FetchProdList),
		fork(takeLatest, 'additemtocart', AddToCart),
		fork(takeLatest, 'removeItemFromCart', RemoveFromCart),
	];
}

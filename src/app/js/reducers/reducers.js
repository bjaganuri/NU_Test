const InitialProdList = {
	catalog: [],
	cart: {},
	fetchStatus: "INPROGRESS"
};

const InitialProdSearchRes = {
	category: "All Categories",
	text: ""
}

export const productListReducer = (state = InitialProdList, action) => {
	switch (action.type){
		case "PROD_LIST_FETCH_SUCCESS":
			state = {
				...state,
				fetchStatus: "SUCCESS",
				catalog: [...action.payload.catalog]
			}
			break;
		case "PROD_LIST_FETCH_REJECTED":
			state = {
				...state,
				fetchStatus: "FAILED",
				catalog: [...state.catalog]
			}
			break;
		case "ADD_TO_CART":
			if(state.cart.hasOwnProperty("item_"+action.payload.id)){
				state = {
					...state
				}
				state.cart["item_"+action.payload.id] = {
					details: {
						...state.cart["item_"+action.payload.id].details,
					},
					quantity: parseInt(state.cart["item_"+action.payload.id].quantity)+1
				}
			}
			else{
				state = {
					...state,
				}
				state.cart["item_"+action.payload.id] = {
					details: {
						...action.payload["item_"+action.payload.id].details
					},
					quantity: 1
				}
			}
			break;
		case "REMOVE_FROM_CART":
			if(state.cart.hasOwnProperty("item_"+action.payload)){
				state = {
					...state
				};
				if(parseInt(state.cart["item_"+action.payload].quantity) > 1) {
					state.cart["item_"+action.payload].quantity = state.cart["item_"+action.payload].quantity-1;
				}
				else {
					delete state.cart["item_"+action.payload];
				}
			}
			break;
	}
	return state;
};

export const prodSearchResReducer = (state = InitialProdSearchRes, action) => {
	switch (action.type){
		case "UPDATE_SEARCH_PARAMS":
			state = {
				...action.payload
			}
			break;
	}
	return state;
};
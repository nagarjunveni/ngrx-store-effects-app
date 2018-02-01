
import {ActionReducerMap,createFeatureSelector,createSelector} from '@ngrx/store';
import * as fromPizzas from './pizzas.reducers' ;

export interface ProductState{
    pizzas:fromPizzas.PizzaState
}

export const reducers:ActionReducerMap<ProductState> = {
    pizzas:fromPizzas.reducer
}

export const getProductsState = createFeatureSelector<ProductState>('products');

//pizza state
export const getPizzaState = createSelector(getProductsState,(state:ProductState)=>state.pizzas)

export const getPizzaEntities = createSelector(getPizzaState,fromPizzas.getPizzasEntities);
export const getAllPizzas = createSelector(getPizzaEntities,
    (entities)=> {
        return Object.keys(entities).map(id => entities[parseInt(id,10)])
    });
export const getAllPizzasLoaded = createSelector(getPizzaState,fromPizzas.getPizzasLoaded);
export const getAllPizzasLoading = createSelector(getPizzaState,fromPizzas.getPizzasLoading);
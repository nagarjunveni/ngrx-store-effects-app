import * as fromPizzas from '../actions/pizzas.actions';
import {Pizza} from '../../models/pizza.model'

export interface PizzaState{
    entities:{[id:number]:Pizza},
    loaded:boolean,
    loading:boolean
}

export const initalState:PizzaState= {
    entities:{},
    loaded:false,
    loading:false
};

export function reducer(state=initalState,action:fromPizzas.PizzaAction):PizzaState{

    switch(action.type){
        case fromPizzas.LOAD_PIZZAS:{
            return {
                ...state,loading:true
            }
        }
        case fromPizzas.LOAD_PIZZAS_FAIL:{
            return {
                ...state,loading:false,loaded:false
            }
        }
        case fromPizzas.LOAD_PIZZAS_SUCCESS:{
            const pizzas = action.payload;
            const entities = pizzas.reduce((entities:{[id:number]:Pizza},pizza)=>{
                return {
                    ...entities,
                    [pizza.id]: pizza
                }
            },
            {...state.entities})

            return {
                ...state,loading:false,loaded:true,entities
            }
        }
    }
    return state;
}

export const getPizzasLoading = (state:PizzaState) => state.loading;
export const getPizzasLoaded = (state:PizzaState) => state.loaded;
export const getPizzasEntities = (state:PizzaState) => state.entities;
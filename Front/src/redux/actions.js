export const ORDER = "ORDER";
export const FILTER = "FILTER";
export const ADD_FAVORITE = "ADD_FAVORITE";
export const DELETE_FAVORITE = "DELETE_FAVORITE";
import axios from 'axios';

export const addFavorite = (character) => {
    // return { type: ADD_FAVORITE, payload: character }
    return async (dispatch) => {
        const result = await axios.post('http://localhost:3001/rickandmorty/fav', character);
        const data = result.data;

        return dispatch({
            type: ADD_FAVORITE, payload: data
        })
    }
}

export const deleteFavorite = (id) => {
    //return { type: DELETE_FAVORITE, payload: id }
    return async () => {
       const result = await axios.delete(`http://localhost:3001/rickandmorty/fav/${id}`);
       const data = result.data;

       return dispatch({
        type: DELETE_FAVORITE, payload: data 
       })
    }
}

export const filterCards = (status) => {
    return { type: FILTER, payload: status }
}

export const orderCards = (id) => {
    return { type: ORDER, payload: id}
}



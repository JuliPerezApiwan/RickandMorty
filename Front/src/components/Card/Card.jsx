import { Link } from "react-router-dom";
import { addFavorite, deleteFavorite } from "../../redux/actions";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import style from './Card.module.css'

function Card({ name, gender, onClose, species, image, id }) {
   const dispatch = useDispatch();
   const { myFavorites } = useSelector(state => state);
   const [ isFav, setIsFav ] = useState(false);

   const handleFavorite = () => {
      if(isFav){
         setIsFav(false);
         dispatch(deleteFavorite(id));
      }
      else{
         setIsFav(true);
         dispatch(addFavorite({ name, gender, onClose, species, image, id }));
      }
   }

   useEffect(() => {
      myFavorites.forEach((fav) => {
         if (fav.id === id) {
            setIsFav(true);
         }
      });
   }, [myFavorites]);

   return (
      <div >
         <div className={style.favorite} >
         {
            isFav ? (
               <button onClick={handleFavorite}>❤️</button>
            ) : (
               <button onClick={handleFavorite}>🤍</button>
            )
         }
         </div>
         <div className={style.card} >
         <button onClick={onClose}>X</button>
            
         
               <Link className={style.link} to={`/detail/${id}`} >
                  <h2>{name}</h2>
               </Link>
               <h3>Specie: {species}</h3>
               <h3>Gender: {gender}</h3>
               <img src={image} alt={name} />
           
               
            
         </div>
      </div>
   );
}


export default Card;

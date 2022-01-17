import { v4 as uuidv4 } from 'uuid';

const Characters = (props) => {

        const {characters} = props;
        const checkThumbnail = (item) => {
            return item === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg' ? {objectFit: 'initial'} : {objectFit: 'cover'};
        }

        const everyChar= characters.map(item => {

            return (
                <li className="char__item" key={uuidv4()}>
                    <img style={checkThumbnail(item.thumbnail)} src={item.thumbnail} alt={item.name}/>
                    <div className="char__name">{item.name}</div>
                </li>
            )
        })


        return (
            <ul className="char__grid">
              {everyChar}
            </ul>
        )
}

export default Characters;
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import useMarvelService from '../../services/MarvelService';

import '../../style/button.scss';
import './charSearch.scss';


const validate = values => {
    const errors = {};

    if (!values.searchValue) {
        errors.searchValue = 'This field is required';
    } else if (values.searchValue.length < 3) {
        errors.searchValue = 'Minimum 3 characters to fill'
    }

    return errors;
}

const CharSearch = () => {
    const {getCharacterByName} = useMarvelService();

    const [charData, setCharData] = useState('')

    const formik = useFormik({
        initialValues: {
          searchValue: ''
        },
        validate,
        onSubmit: value => {
            getCharacterByName(value.searchValue)
                .then(res => {setCharData(res); console.log(charData)})
                .catch(err => {console.log(err)})
        }
    });



    return (
            <form onSubmit={formik.handleSubmit} className='charSearchForm'>
                <label htmlFor="searchValue" className='charSearchForm__lable'>Or find a character by name:</label>
                <div className="charSearchForm__searchBlock">
                    <input
                        id="searchValue"
                        name="searchValue"
                        type="text"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.searchValue}
                        className='charSearchForm__input'
                    />
                    <button type="submit" className='charSearchForm__buttons button button__main'>
                        <div className="inner">FIND</div>
                    </button>
                </div>
                    {
                        formik.errors.searchValue && formik.touched.searchValue ?
                            <div className='charSearchForm__error checkInput'>
                                {formik.errors.searchValue}
                            </div>
                        : !formik.errors.searchValue && charData.name && charData.name !== 'nothing' ?
                            <div className='charSearchForm__buttonsBox'>
                                <div className='charSearchForm__finded checkInput'>
                                    {`There is! Visit ${charData.name} page?`}
                                </div>
                                <Link to={`/characters/${charData.id}`} >
                                    <button className='charSearchForm__buttons button button__secondary'>
                                        <div className="inner">TO PAGE</div>
                                    </button>
                                </Link>
                            </div>
                        : !formik.errors.searchValue && charData === 'nothing'?
                            <div className='charSearchForm__error checkInput'>
                                The character was not found. Check the name and try again
                            </div>
                        : null
                    }
            </form>
    );
}

export default CharSearch;
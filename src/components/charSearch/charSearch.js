import React from 'react';
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
    const {getCharacterBySearch} = useMarvelService();

    const formik = useFormik({
        initialValues: {
          searchValue: ''
        },
        validate,
        onSubmit: value=> {
            getCharacterBySearch(value.searchValue)
                .then(el => console.log(el))
                .catch(err => console.log(err))
        },
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
                        <button type="submit" className='charSearchForm__submit button button__main'>
                            <div className="inner">FIND</div>
                        </button>
                    </div>
                {formik.errors.searchValue && formik.touched.searchValue ?
                    <div className='charSearchForm__error'>{formik.errors.searchValue}</div> : null
                }
            </form>
    );
}

export default CharSearch;
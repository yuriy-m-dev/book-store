import React from 'react'
import { Formik, FormikHelpers } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import { setSearchQuery } from '../redux/reducers/books'

const searchFormValidate = (values: any) => {
  const errors = {}
  return errors
}

type ValuesType = {
  query: string
}

const SearchForm = () => {

  const dispatch = useDispatch()

  const submit = (values: ValuesType, { setSubmitting }: FormikHelpers<ValuesType>) => {
    dispatch(setSearchQuery(values.query))
    setSubmitting(false)
  }

  return (
    <Formik initialValues={{ query: '' }}
      validate={searchFormValidate}
      onSubmit={submit}
    >
      {({ values, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
        <form className='header__search-form' onSubmit={handleSubmit}>
          <div className='header__search-inner'>
            <input
              type="text"
              name="query"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.query}
            />
            <button type="submit" disabled={isSubmitting}>Search</button>
          </div>
        </form>
      )}
    </Formik>
  )
}


export default SearchForm
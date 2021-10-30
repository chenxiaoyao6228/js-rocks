import {useState, useCallback} from 'react'

const useForm = (initialValues = {}, validators: any)=> {
    const [values, setValues] = useState(initialValues)
    const getInitialErros = (initialValues: any)=>{
        let keys = Object.keys(initialValues)
        let err:any = {}
        keys.forEach(key=>{
            err[key] = null
        })
        return err
    }
    const [errors, setErrors] = useState(getInitialErros(initialValues))

    const setFieldValue = useCallback((name, value)=> {
        setValues({
            ...values,
            [name]: value
        })

        if(validators[name]){
            const errMsg = validators[name](value)
            setErrors({
                ...errors,
                [name]: errMsg || null
            })
        }
    },[validators, values, errors, setErrors])

    const resetFields = useCallback(()=> {
        setValues(initialValues)
        setErrors(getInitialErros(initialValues))
    },[initialValues])

    return { values, setFieldValue, errors , resetFields}
}

export default useForm;
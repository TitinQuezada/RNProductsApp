import { useEffect, useRef, useState } from 'react';
import { FormState, useValidation } from 'react-simple-form-validator';
import { Anything } from '../interfaces/Anything';
import { FormProperty } from '../interfaces/FormProperty';

export const useForm = (initialState: Anything<FormProperty>) => {
    const [formValidations, setformValidations] = useState({});
    const [formResult, setformResult] = useState<FormState>({});
    const keys = useRef<Array<string>>([]);

    useEffect(() => {
        const firstPosition = 0;
        const secondPosition = 1

        let validation: any = {};
        let state: any = {};

        keys.current = Object.keys(initialState);

        const values = Object.values(initialState);

        keys.current.forEach((key, index) => {
            validation[key] = values[index][secondPosition];
        })

        keys.current.forEach((key, index) => {
            state[key] = values[index][firstPosition];
        });

        setformValidations(validation);
        setformResult(state);
    }, []);


    const { isFormValid, getFailedRulesInField } = useValidation({
        fieldsRules: formValidations,
        state: formResult
    });

    const onChange = (propertyName: string, value: any) => {
        if (!initialState.hasOwnProperty(propertyName)) {
            throw new Error(`Property ${propertyName} does not exist in the form`);
        }

        setformResult({
            ...formResult,
            [propertyName]: value
        });
    }

    return {
        values: {
            ...formResult
        },
        onChange,
        isFormValid,
        getFailedRulesInField,
    };
};

import React, { useEffect, useState } from 'react';
import { KeyboardTypeOptions, TextInput, View } from 'react-native';
import { KeyboardTypes } from '../../enums/KeyboardTypes';
import { BasicText } from '../BasicText/BasicText';
import { BasicInputStyles } from './BasicInputStyles';

interface Props {
    id: string;
    label: string;
    placeholder: string;
    value: string;
    onChange: (id: string, value: string) => void;
    type?: KeyboardTypes;
    getFailedRulesInField?: (id: string) => Array<string>;
}
export const BasicInput = ({ id, label, placeholder, value, onChange, getFailedRulesInField, type = KeyboardTypes.text }: Props) => {
    const [keyboardType, setkeyboardType] = useState<KeyboardTypeOptions>('default');
    const [isTouched, setisTouched] = useState(false);

    useEffect(() => {
        switch (type) {
            case KeyboardTypes.text:
                setkeyboardType('default');
                break;

            case KeyboardTypes.email:
                setkeyboardType('email-address');
                break;

            case KeyboardTypes.password:
                setkeyboardType('default');
                break;

            default:
                setkeyboardType('default');
                break;
        }
    }, []);

    const changeValue = (text: string) => {
        onChange(id, text);
        value = text;
        setisTouched(true);
    }

    return (
        <View style={{ ...BasicInputStyles.container }}>
            <BasicText style={{ ...BasicInputStyles.label }}>{label}</BasicText>

            <TextInput
                style={{ ...BasicInputStyles.input }}
                keyboardType={keyboardType}
                value={value}
                secureTextEntry={type === KeyboardTypes.password}
                underlineColorAndroid={!isTouched ? 'white' : getFailedRulesInField && getFailedRulesInField(id).length ? 'red' : 'white'}
                placeholder={placeholder}
                placeholderTextColor={'rgba(255,255,255,0.5)'}
                onChangeText={changeValue}
                autoCapitalize={type === KeyboardTypes.email || type === KeyboardTypes.password ? 'none' : 'sentences'}
                autoCorrect={type === KeyboardTypes.email || type === KeyboardTypes.password ? false : true}
            />

            {
                isTouched && getFailedRulesInField &&
                <BasicText style={{ ...BasicInputStyles.errorText, ...BasicInputStyles.label }}>
                    {
                        getFailedRulesInField(id).some(validation => validation == 'required') ? `El ${label.toLowerCase()} es requerido` :
                            getFailedRulesInField(id).some(validation => validation == 'email') ? `El ${label.toLowerCase()} es invalido` :
                                getFailedRulesInField(id).some(validation => validation == 'minlength') ? `El ${label.toLowerCase()} debe contener mas caracteres` :
                                    getFailedRulesInField(id).some(validation => validation == 'hasUpperCase') ? `El ${label.toLowerCase()} debe contener al menos una letra mayuscula` :
                                        getFailedRulesInField(id).some(validation => validation == 'hasLowerCase') ? `El ${label.toLowerCase()} debe contener al menos una letra minuscula` :
                                            getFailedRulesInField(id).some(validation => validation == 'hasNumber') ? `El ${label.toLowerCase()} debe contener al menos un numero` :
                                                getFailedRulesInField(id).some(validation => validation == 'hasSpecialCharacter') ? `El ${label.toLowerCase()} debe contener al menos un caracter especial` : ''
                    }
                </BasicText>
            }
        </View>
    );
};
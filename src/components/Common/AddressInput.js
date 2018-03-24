import React from 'react'
import { validateAddress } from '../../utils/validations'
import { Field } from 'react-final-form'
import { InputField2 } from './InputField2'

export const AddressInput = ({ side, name, description, label, errorStyle }) => (
  <Field
    validate={validateAddress}
    component={InputField2}
    type="text"
    side={side}
    name={name}
    description={description}
    label={label}
    errorStyle={errorStyle}
  />
)

import React from 'react'
import '../../assets/stylesheets/application.css'
import { Field } from 'react-final-form'

export const RadioInputField = (props) => {
  const inputs = props.items
    .map((item, index) => (
      <label className="radio-inline" key={index}>
        <Field
          type="radio"
          component="input"
          name={props.name}
          value={item.value}
        />
        <span className="title">{item.label}</span>
      </label>
    ))

  return (
    <div className={props.extraClassName}>
      <label className="label">{props.title}</label>
      <div className="radios-inline">
        {inputs}
      </div>
      <p className="description">{props.description}</p>
    </div>
  )
}

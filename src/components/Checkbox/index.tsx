import React from 'react'

type Props = {
  label: string
  name: string
  checked: boolean
  onChange: (name: string, checked: boolean) => void
}

function Checkbox({ label, name, checked, onChange }: Props) {
  return (
    <label htmlFor={name}>
      <input
        type="checkbox"
        id={name}
        name={name}
        checked={checked}
        onChange={() => onChange(name, !checked)}
      />
      <div className="label-text">{label}</div>
    </label>
  )
}

export default Checkbox

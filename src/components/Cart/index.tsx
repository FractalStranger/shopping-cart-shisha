import React from 'react'
import classnames from 'classnames'
import { flavors } from '../../constants/flavors'
import Checkbox from '../Checkbox'
import { stepLabels } from '../../constants/steps'

type Props = {
  activeStep: number
  proceed: (step: number) => void
  items: any[]
  lang: string
  addToCart: (name: string) => void
  removeFromCart: (name: string) => void
}

function Cart({ activeStep, proceed, items, lang, addToCart, removeFromCart }: Props) {
  const updateCart = (name: string, checked: boolean) => {
    if (checked) {
      addToCart(name)
    } else {
      removeFromCart(name)
    }
  }
  const validate = () => console.log('Add error into redux')
  return (
    <div className="shopping-cart-step_cart">
      <div className="cart-header">
        <h4>Vyberte si príchute</h4>
        <div>(1 príchuť je v cene balíka)</div>
      </div>
      <div className="cart-flavors-list">
        {flavors.map((flavor) => (
          <Checkbox
            key={flavor.name}
            label={flavor.label}
            name={flavor.name}
            checked={items.indexOf(flavor.name) !== -1}
            onChange={updateCart}
          />
        ))}
      </div>
      <button
        type="button"
        className="next-button"
        onClick={items.length ? () => proceed(activeStep + 1) : validate}
      >
        {stepLabels.next[activeStep - 1].label}
        <i className={stepLabels.next[activeStep - 1].iconClasses} />
      </button>
    </div>
  )
}

export default Cart

/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect, useRef } from 'react'
import classnames from 'classnames'

import { stepHeaders, stepLabels } from '../../constants/steps'
import { scrollToRef } from '../../utils'

type Props = {
  activeStep: number
  proceed: (step: number) => void
}

function Progress({ activeStep, proceed }: Props) {
  const myRef = useRef(null)
  const redirectToCollection = () => {
    window.location.href = '/fajky'
  }
  useEffect(() => {
    scrollToRef(myRef)
  }, [activeStep])
  return (
    <div className="shopping-cart-ref-container">
      <div className="shopping-cart-main-ref" ref={myRef} />
      {activeStep === 5 ? (
        <h1>
          <i className="fas fa-check-circle" aria-hidden="true" />
          Your order was successful
        </h1>
      ) : (
        <>
          {activeStep !== 4 && (
            <button
              type="button"
              className="secondary back-button"
              onClick={
                activeStep === 1 ? () => redirectToCollection() : () => proceed(activeStep - 1)
              }
            >
              {stepLabels.back[activeStep - 1].label}
              <i className={stepLabels.back[activeStep - 1].iconClasses} />
            </button>
          )}
          <h1 className="main-header">Objednávka</h1>
          <div className="shopping-cart-step-list">
            <ul>
              {stepHeaders.map((step: string, index: number) => (
                <li
                  key={step}
                  className={classnames(
                    activeStep === index + 1 && 'active',
                    activeStep > index + 1 && 'filled',
                  )}
                >
                  <span
                    className="inner"
                    onClick={index + 1 < activeStep ? () => proceed(index + 1) : undefined}
                    style={{ cursor: index + 1 < activeStep ? 'pointer' : 'default' }}
                  >
                    <span className="value">{index + 1}</span>
                    <span className="text">{step}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  )
}

export default Progress

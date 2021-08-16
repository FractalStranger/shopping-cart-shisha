import React from 'react'

type Props = {
  orderData: any
}

function OrderConfirmation({ orderData }: Props) {
  return (
    <div className="container">
      <div className="shopping-cart-inner-wrapper">
        <div className="row">
          <div className="col-lg-6 offset-lg-3">
            <div className="shopping-cart-step_confirmation">
              {/* <h2>Order number: {orderData.orderId}</h2> */}
              <div className="success-icon">
                <i className="fas fa-check-circle" />
              </div>
              <h2>Vaša objednávka bola odoslaná</h2>
              Vaša objednávka je potvrdená s povinnosťou platby. Bližšie informácie o objednávke a
              jej stave vám budú doručené mailom na <strong>enfroz@hotmail.com</strong>
              <div className="confirmation-list">
                <div className="confirmation-list-item">
                  <div className="confirmation-list-label">Vybranný balík:</div>
                  <div>Balík GOLD</div>
                </div>
                <div className="confirmation-list-item">
                  <div className="confirmation-list-label">Príchute:</div>
                  <div>Malina, Jahoda, Ananás</div>
                </div>
                <div className="confirmation-list-item">
                  <div className="confirmation-list-label">Dátum a čas doručenia:</div>
                  <div>24. 2. 2021 o 17:00</div>
                </div>
                <div className="confirmation-list-item">
                  <div className="confirmation-list-label">Dátum a čas odovzdania:</div>
                  <div>27. 2. 2021 o 17:00 (3 dni)</div>
                </div>
                <div className="confirmation-list-item">
                  <div className="confirmation-list-label">Miesto:</div>
                  <div>Vodnofajková 9, Bratislava</div>
                </div>
                <div className="confirmation-list-item">
                  <div className="confirmation-list-label">Osobné údaje:</div>
                  <div>
                    <div>Meno Priezvisko</div>
                    <div>meno@priezvisko.sk</div>
                    <div>+421 999 999 999</div>
                  </div>
                </div>
              </div>
              <a className="button" href="/">
                Návrat na hlavnú stránku
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderConfirmation

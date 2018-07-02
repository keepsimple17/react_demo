import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import Button from './Button';
import QuantityBar from './QuantityBar';

import { addToCart } from './../actions/cartActions';
import { syncQuantity } from './../actions/catalogActions';

@connect((store) => {  
  return {
    cataLog: store.catalog
  }
})

export default class Item extends Component {
  constructor(props) {
    console.log('testing...', props.cataLog.items);
    super(props);
    if (!window.isFirst) {
      for (const item of  props.cataLog.items) {
        this._addToCart(item.unit_price, '', item.name, item.quantity);
      }
      window.isFirst = true;
    }

  }
  
  _addToCart = (price, brandName, productName, quantity) => {
    const itemDetails = {
      item: productName,
      quantity: quantity,
      price: price,
      brand: brandName
    }

    this.setState({
      quantity: 1
    })

    const syncCatalog = {
      item: productName,
      quantity: quantity
    }

    this.props.dispatch(addToCart(itemDetails));
    this.props.dispatch(syncQuantity(syncCatalog));
  };

  render() {
    const { thumbnail, brandName, name, packageDetail, unit_price, quantity } = this.props;

    return (
      <div className="item-wrapper">
        <div className="item-container">
          <div className="product-img">
            <img src={thumbnail} alt={name} />
          </div>
          <div className="product-details">
            <div className="brand-name">
              {brandName}
            </div>
            <div className="product-name">
              {name}
            </div>
            <div className="package-detail">
                {packageDetail}
            </div>
            <div className="product-price">
              $ {unit_price}
            </div>
            {(quantity === 0 || quantity === undefined) ? <Button onClick={() => { this._addToCart(unit_price, brandName, name, 1) }} /> : <QuantityBar item={name} />}
          </div>
        </div>
      </div>
    )
  }
}
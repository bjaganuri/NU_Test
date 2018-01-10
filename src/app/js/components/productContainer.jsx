import React from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux";
import { Link } from "react-router";
import { Image  } from "react-bootstrap";
import { Control, Form, actions, Errors } from "react-redux-form";
import { Glyphicon  } from "react-bootstrap";

class ProductContainer extends React.Component {
	constructor (props) {
		super(props);
		this.updateCart = this.updateCart.bind(this);
	}
	updateCart (item, removeItemFromCart){
		if(!removeItemFromCart){
			this.props.dispatch({
				type: "additemtocart",
				payload: item
			})
		}
		else {
			this.props.dispatch({
				type: "removeItemFromCart",
				payload: item
			})
		}
	}
	render () {
		const price = parseInt(this.props.data.price);
		let footerclass = "productContainerFooter productContainerFooter-100";
		let addRemoveItemButton = (
			<button className="btn" onClick={() => this.updateCart(this.props.data,false)}>Add to cart</button>
		);
		if(this.props.isCart) {
			addRemoveItemButton = (
				<h4>
					<Glyphicon glyph="minus-sign" onClick={() => this.updateCart(this.props.data,true)}/>
					<span className="quanityValIndicator">{this.props.data.quantity}</span>
					<Glyphicon glyph="plus-sign" onClick={() => this.updateCart(this.props.data,false)}/>
				</h4>
			);
		}
		else {
			addRemoveItemButton = (
				<button className="btn" onClick={() => this.updateCart(this.props.data,false)}>Add to cart</button>
			);
		}
		if(price <= 100){
			footerclass = "productContainerFooter productContainerFooter-100";
		}
		else if(price> 100  && price <= 250){
			footerclass = "productContainerFooter productContainerFooter-250";
		}
		else if(price > 250){
			footerclass = "productContainerFooter productContainerFooter-500";
		}
		return (
			<div className="productContainer col-lg-3">
				<Image src={this.props.data.imageURL} rounded />
				<h4 className="productName">{this.props.data.name}</h4>
				<div className={footerclass}>
					<h2>{price}{this.props.data.currency}</h2>
					{addRemoveItemButton}
					<p className="text-right">
						<Link to={"home"}>More info >>></Link>
					</p>
				</div>
			</div>	
		)
	}
}

export default connect(null,null)(ProductContainer);
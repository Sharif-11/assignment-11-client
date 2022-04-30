import React from "react";
import "./InventoryItem.css";
const InventoryItem = ({ data }) => {
	const { name, img, description, quantity, price } = data;
	return (
		<div className="inventory-item-container shadow">
			<img src={img} alt="" />
			<h4 className="text-center my-2">{name}</h4>
			<p className="text-center">{description}</p>
			<p className="text-center">Quantity in stocks: {quantity}</p>
			<p className="text-center">Price: ${price}</p>
			<button className="py-2">Manage</button>
		</div>
	);
};

export default InventoryItem;
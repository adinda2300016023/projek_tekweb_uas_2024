import React from "react";
import { Card, Col } from "react-bootstrap";

const CardComponent = ({ product, setCart }) => {
  const handleClick = () => {
    setCart((cart) => {
      const cartItem = {
        id: cart.length + 1,
        name: product.name,
        price: product.price,
        qty: 1,
        totalPrice: product.price,
        productId: product.id
      };

      const existingItem = cart.find(item => item.productId === product.id);
      if (existingItem) {
        return cart.map(item => 
          item.productId === product.id 
            ? { 
                ...item, 
                qty: item.qty + 1,
                totalPrice: (item.qty + 1) * item.price
              } 
            : item
        );
      }

      return [...cart, cartItem];
    });
  };

  return (
    <Col md={6} xs={6} className="mb-4">
      <Card className="shadow">
        <Card.Img
          variant="top"
          src={product.image}
          style={{ height: "15rem", objectFit: "cover" }}
        />
        <Card.Body>
          <Card.Title>{product.name}</Card.Title>
          <Card.Text>Rp. {product.price.toLocaleString('id-ID')}</Card.Text>
          {product.is_ready ? (
            <button className="btn btn-primary w-100" onClick={handleClick}>
              Tambah ke Keranjang
            </button>
          ) : (
            <button className="btn btn-secondary w-100" disabled>
              Stok Habis
            </button>
          )}
        </Card.Body>
      </Card>
    </Col>
  );
};

export default CardComponent;
  import { Col, Row } from "react-bootstrap";
  import { useSelector, useDispatch } from "react-redux";
  import { useEffect } from "react";
  import {
    getProduct,
    selectProductData,
    selectProductLoading,
    selectProductError,
  } from "../features/ProductSlice";

  const ProductDetail = ({ setCart }) => {
    const products = useSelector(selectProductData);
    const loading = useSelector(selectProductLoading);
    const error = useSelector(selectProductError);
    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(getProduct());
    }, [dispatch]);

    const getImageUrl = (path) => {
      return path.replace('/frontend/public', '');
    };

    return (
      <Col md={7} className="mt-3">
        <h4>Product Detail</h4>
        {error ? error : ""}
        <hr />
        <Row className="g-3">
          {products ? (
            products.map((product) => (
              <Col md={6} key={product.id}>
                <div className="card">
                  <img 
                    src={getImageUrl(product.image)} 
                    className="card-img-top" 
                    alt={product.name}
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{product.name}</h5>
                    <p className="card-text text-muted small">{product.code}</p>
                    <p className="card-text">Rp. {product.price.toLocaleString('id-ID')}</p>
                    {product.is_ready ? (
                      <button 
                        className="btn btn-primary w-100"
                        onClick={() => {
                          setCart((prevCart) => {
                            const cartItem = {
                              id: prevCart.length + 1,
                              name: product.name,
                              price: product.price,
                              qty: 1,
                              totalPrice: product.price,
                              productId: product.id
                            };
                            
                            const existingItem = prevCart.find(item => item.productId === product.id);
                            
                            if (existingItem) {
                              return prevCart.map(item => 
                                item.productId === product.id 
                                  ? {
                                      ...item,
                                      qty: item.qty + 1,
                                      totalPrice: (item.qty + 1) * item.price
                                    }
                                  : item
                              );
                            }
                            
                            return [...prevCart, cartItem];
                          });
                        }}
                      >
                        Tambah ke Keranjang
                      </button>
                    ) : (
                      <button className="btn btn-secondary w-100" disabled>
                        Stok Habis
                      </button>
                    )}
                  </div>
                </div>
              </Col>
            ))
          ) : loading ? (
            <p>Loading...</p>
          ) : (
            <p>Tidak ada data</p>
          )}
        </Row>
      </Col>
    );
  };

  export default ProductDetail;
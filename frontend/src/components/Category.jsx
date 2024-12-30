// Category.jsx
import { Col, ListGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { categorySelectors, getAllCategory } from "../features/CategorySlice";
import { getProduct, getProductByCategory } from "../features/ProductSlice"; // Tambahkan import ini
import { useEffect, useState } from "react";
import { FaUtensils } from "react-icons/fa";
import { CiCoffeeCup } from "react-icons/ci";
import { IoFastFood } from "react-icons/io5";
import { FaBowlFood } from "react-icons/fa6";

const Category = () => {
  const dispatch = useDispatch();
  const category = useSelector(categorySelectors.selectAll);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(getAllCategory()).finally(() => setLoading(false));
  }, [dispatch]);

  const setActive = (elem) => {
    const activeElements = document.getElementsByClassName("active");
    for (let i = 0; i < activeElements.length; i++) {
      activeElements[i].classList.remove("active");
    }
    elem.classList.add("active");
  };

  const categories = [
    { id: 1, name: "sushi", icon: <FaUtensils /> },
    { id: 2, name: "ramen", icon: <FaBowlFood /> },  
    { id: 3, name: "minuman", icon: <CiCoffeeCup /> }, 
];

  const showAll = () => {
    dispatch(getProduct());
  };

  const categoryClicked = (id) => {
    dispatch(getProductByCategory(id));
  };

  return (
    <Col md={2}>
      <h4>Product Kategori</h4>
      <p>{loading ? "Loading..." : ""}</p>
      <hr />
      <ListGroup>
        <ListGroup.Item
          id="all001"
          className="mb-1 shadow-sm"
          active
          action
          onClick={() => {
            setActive(document.getElementById("all001"));
            showAll(); 
          }}
        >
          <IoFastFood /> All Product
        </ListGroup.Item>
        {categories.map((item) => (
          <ListGroup.Item
            key={item.id}
            id={`key${item.id}`}
            className="mb-1 shadow-sm"
            action
            onClick={() => {
              setActive(document.getElementById(`key${item.id}`));
              categoryClicked(item.id); 
            }}
          >
            {item.icon} {item.name}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Col>
  );
};

export default Category;
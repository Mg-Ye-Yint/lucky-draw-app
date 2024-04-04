"use client";

import Image from "next/image";
import { useState } from "react";


export default function Home() {
  const [toggle, setToggle] = useState(false);

  const [tick, setTick] = useState(false);

  const [products, setProducts] = useState([]);

  const [won, setWon] = useState(null);

  const [newItem, setNewItem] = useState({
    name: "",
    quantity: 0,
    imageUrl: "",
  });

  const [editable, setEditAble] = useState(false);

  const [editingIndex, setEditingIndex] = useState(null);
  const [isDisabled, setIsDisabled] = useState(false);

  const [newName, setNewName] = useState("");
  const [newQuantity, setNewQuantity] = useState("");

  const [editlimit, setEditLimit] = useState(false);

  const buttonClick = () => {
    let randomProduct;

    do {
      randomProduct = Math.floor(Math.random() * products.length);
    } while (products[randomProduct].quantity === 0);

    const updatedProducts = [...products];
    updatedProducts[randomProduct].quantity -= 1;
    setProducts(updatedProducts);

    setWon(products[randomProduct]);
    setToggle(!toggle);
  };

  const repeatClick = () => {
    setToggle(!toggle);
  };

  const action = () => {
    setProducts((previousItems) => [...previousItems, newItem]);
    setNewItem({ name: "", quantity: 0, imageUrl: "" });
  };

  const editItem = (index) => {
    const editproduct = [...products];

    if (editingIndex === index) {
      setEditingIndex(null);
      editproduct[index].background = "none";
      setIsDisabled(false);
    } else {
      if (editingIndex !== null) {
        editproduct[editingIndex].background = "none";
      }
      setEditingIndex(index);
      editproduct[index].background =
        "linear-gradient(to right, rgba(5, 155, 22, 0.8), rgba(0, 60, 255, 0.8))";
      setIsDisabled(true);
    }
    setProducts(editproduct);
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleQuantityChange = (event) => {
    setNewQuantity(event.target.value);
  };

  const editProduct = (index) => {
    const updatedProducts = [...products];
    const updatedProduct = {
      ...updatedProducts[index],
      name: newName.trim() !== "" ? newName : updatedProducts[index].name,
      quantity: editlimit
        ? Infinity
        : newQuantity !== ""
        ? newQuantity
        : updatedProducts[index].quantity,
      newProperty: "new value",
    };

    updatedProducts[index] = updatedProduct;

    setProducts(updatedProducts);
    setNewName("");
    setNewQuantity("");
  };

  const editunlimited = (index) => {
    setEditLimit(!editlimit);
  };

  const removeItem = (index) => {
    const updatedProducts = [...products];
    updatedProducts.splice(index, 1);

    if (editingIndex !== null) {
      if (index === editingIndex) {
        setEditingIndex(null);
        setIsDisabled(false);
      } else if (index < editingIndex) {
        setEditingIndex(editingIndex - 1);
      }
    }

    setProducts(updatedProducts);
  };
  const toggleInfinity = () => {
    setNewItem((prevItem) => ({
      ...prevItem,
      quantity: prevItem.quantity === Infinity ? 1 : Infinity,
    }));
  };

  const cleartext = () => {
    setNewItem({ ...newItem, name: "" });
  };

  const tips = () => {
    const img = event.target;
    img.style.transform = "translate(3px, 3px)";
    setTick(!tick);
  };
  return (
    <div id="container" className="flex justify-center items-center">
      <p className="headtext">
        <b>Customize your own lucky draw</b>
      </p>

      {toggle ? (
        ""
      ) : (
        <div
          onClick={tips}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              tips();
            }
          }}
          role="button"
          tabIndex={0}
        >
          <img className="mainimg" src="/luckydraw.png" alt="Wheel" />
        </div>
      )}

      {tick ? (
        <div className="tipsContainer">
          <h2 className="tips">
            This is a lucky draw generator that you can used for various
            purposes. <br />
            You can add your items and their quanitties to your list and you can
            remove it back too.
            <br /> It will generate you the item you win randomly. And
            displaying the <br />
            quantities of items left.For items withunlimited quanitties, please
            click the button &lsquo;Unlimited&apos;.
          </h2>
        </div>
      ) : (
        ""
      )}
      {products.map((product, index) => (
        <div key={index}>
          <p style={{ background: product.background }}>
            {product.name} ={" "}
            <span className="mydiv">
              {product.quantity == 0
                ? "Out of stock"
                : product.quantity === Infinity
                ? "Unlimited Items left"
                : product.quantity > 1
                ? product.quantity + " items left"
                : product.quantity + " item left"}{" "}
              <button className="editbutton" onClick={() => editItem(index)}>
                Edit
              </button>
              <button
                className="deletebutton"
                onClick={() => removeItem(index)}
              >
                X
              </button>
            </span>
          </p>
          {editingIndex === index && (
            <div>
              {editlimit ? (
                <button
                  className="editlimitbutton"
                  onClick={() => editunlimited(index)}
                >
                  Limited
                </button>
              ) : (
                <button
                  className="editlimitbutton"
                  onClick={() => editunlimited(index)}
                >
                  Unlimited
                </button>
              )}
              <input
                type="text"
                className="textinput"
                value={newName}
                onChange={handleNameChange}
                placeholder="New Name"
              />
              {editlimit ? (
                <>
                  {" "}
                  <p className="EditUnlimitedText">
                    {" "}
                    Unlimited <br />
                    quantity
                  </p>
                </>
              ) : (
                <input
                  type="number"
                  min="0"
                  value={editlimit ? "Infinity" : newQuantity}
                  onChange={handleQuantityChange}
                  placeholder="New Quantity"
                  className="numberinput"
                />
              )}
              <button
                className="updatebutton"
                onClick={(e) => {
                  e.stopPropagation();
                  editProduct(index);
                }}
              >
                Update
              </button>
            </div>
          )}
        </div>
      ))}

      {editable ? (
        <div className="Editor">
          <label>
            Edit Name:
            <input
              type="text"
              placeholder="name..."
              value={newItem.name}
              onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
            />
            <div>
              <button onClick={cleartext} className="infinitybutton2">
                Clear
              </button>
            </div>
          </label>

          {newItem.quantity === Infinity ? (
            <div>
              <div className="thistext">
                Edit Quantity:
                {" "}
                <br />
                <div className="thistext2">Unlimited</div>
              </div>
              <button onClick={toggleInfinity} className="infinitybutton">
                Limited
              </button>
            </div>
          ) : (
            <label className="quantity-input-container">
              Quantity:
              <input
                type="number"
                min="1"
                value={newItem.quantity}
                onChange={(e) =>
                  setNewItem({ ...newItem, quantity: Number(e.target.value) })
                }
              />
              <div>
                <button onClick={toggleInfinity} className="infinitybutton2">
                  Unlimited
                </button>
              </div>
            </label>
          )}
          {!newItem.name || !newItem.name.trim() || newItem.quantity === 0 ? (
            <button className="changebutton"> Change </button>
          ) : (
            <button className="changebutton" onClick={action}>
              Change{" "}
            </button>
          )}
        </div>
      ) : (
        ""
      )}

      <div className="Adder">
        <label>
          Item:
          <input
            type="text"
            placeholder="name..."
            value={newItem.name}
            onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
          />
          <div>
            <button onClick={cleartext} className="clearbutton">
              Clear
            </button>
          </div>
        </label>

        {newItem.quantity === Infinity ? (
          <div>
            <div className="thistext">
              Quantity: <br />
              {"           "}
              
              <div className="thistext2">Unlimited</div>
            </div>
            <button onClick={toggleInfinity} className="infinitybutton">
              Limited
            </button>
          </div>
        ) : (
          <label className="quantity-input-container">
            Quantity:
            <input
              type="number"
              min="1"
              value={newItem.quantity}
              onChange={(e) =>
                setNewItem({ ...newItem, quantity: Number(e.target.value) })
              }
            />
            <div>
              <button onClick={toggleInfinity} className="infinitybutton">
                Unlimited
              </button>
            </div>
          </label>
        )}
        {!newItem.name || !newItem.name.trim() || newItem.quantity === 0 ? (
          <button className="addbutton"> Add</button>
        ) : (
          <button className="addbutton" onClick={action}>
            {" "}
            Add
          </button>
        )}
      </div>
      <div className="itemimage">
        {toggle ? (
          won === null ? null : (
            <div>
              <img className="secimg" src="/congratulations.png" alt="" />
              <div className="resulttext"> You got the {won.name}.</div>
            </div>
          )
        ) : (
          ""
        )}
      </div>

      {products.length === 0 ? (
        <div>
          <img className="buttonimg" src="/button.png" alt="" />
        </div>
      ) : products.every((product) => product.quantity === 0) ? (
        toggle ? (
          <div
            onClick={repeatClick}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                repeatClick();
              }
            }}
            role="button"
            tabIndex={0}
          >
            <img className="repeat" src="/repeat.png" alt="" />
          </div>
        ) : (
          <div>
            <img className="buttonimg" src="/button.png" alt="" />
          </div>
        )
      ) : (
        <div
          onClick={() => {
            if (!toggle) {
              buttonClick();
            } else {
              repeatClick();
            }
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              if (!toggle) {
                buttonClick();
              } else {
                repeatClick();
              }
            }
          }}
          role="button"
          tabIndex={0}
        >
          {toggle ? (
            <img className="repeat" src="/repeat.png" alt="Repeat" />
          ) : (
            <img className="buttonimg" src="/button.png" alt="Button" />
          )}
        </div>
      )}
      <p className="copyright">
        &copy; 2024 Ye Yint Thway. All rights reserved.
      </p>
    </div>
  );
}

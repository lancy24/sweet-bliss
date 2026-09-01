import React, { useState, useEffect } from "react";
import {
  getProducts,
  deleteProduct,
  updateProduct,
  getOrders,
  updateOrderStatus,
} from "./api/productApi";
import axios from "axios";
import "./AdminPanel.css";

const ADMIN_PASSWORD = "blissful123";
const BASE_URL = "http://localhost:5000";

export default function AdminPanel() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [activeTab, setActiveTab] = useState("products");

  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [editImage, setEditImage] = useState(null);
  const [editImagePreview, setEditImagePreview] = useState(null);
  const [editLoading, setEditLoading] = useState(false);

  const [addForm, setAddForm] = useState({
    name: "", description: "", category: "cake",
    inStock: true, price500gm: "", price1kg: "", pricePiece: "",
  });
  const [addImage, setAddImage] = useState(null);
  const [addImagePreview, setAddImagePreview] = useState(null);
  const [addLoading, setAddLoading] = useState(false);
  const [addSuccess, setAddSuccess] = useState("");

  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem("blissfulUser");
    if (savedUser) {
      const user = JSON.parse(savedUser);
      if (user.role === "admin") setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = () => {
    const savedUser = localStorage.getItem("blissfulUser");
    if (savedUser) {
      const user = JSON.parse(savedUser);
      if (user.role === "admin") { setIsLoggedIn(true); return; }
    }
    if (password === ADMIN_PASSWORD) {
      setIsLoggedIn(true); setPasswordError("");
    } else {
      setPasswordError("Wrong password! Try again.");
    }
  };

  const fetchProducts = async () => {
    setLoadingProducts(true);
    try { const data = await getProducts(); setProducts(data); }
    catch (error) { console.error(error); }
    finally { setLoadingProducts(false); }
  };

  const fetchOrders = async () => {
    setLoadingOrders(true);
    try { const data = await getOrders(); setOrders(data); }
    catch (error) { console.error(error); }
    finally { setLoadingOrders(false); }
  };

  useEffect(() => {
    if (isLoggedIn) { fetchProducts(); fetchOrders(); }
  }, [isLoggedIn]);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this product?")) return;
    try {
      await deleteProduct(id);
      setProducts((prev) => prev.filter((p) => p._id !== id));
      alert("Product deleted!");
    } catch { alert("Failed to delete!"); }
  };

  const handleEditClick = (product) => {
    setEditingProduct(product._id);
    setEditImage(null);
    setEditImagePreview(
      product.image
        ? product.image.startsWith("http")
          ? product.image
          : `${BASE_URL}/uploads/${product.image}`
        : null
    );
    setEditForm({
      name: product.name,
      description: product.description || "",
      category: product.category,
      inStock: product.inStock,
      price500gm: product.sizes?.find((s) => s.weight === "500gm")?.price || "",
      price1kg: product.sizes?.find((s) => s.weight === "1kg")?.price || "",
      pricePiece: product.sizes?.find((s) => s.weight === "per piece")?.price || product.sizes?.[0]?.price || "",
    });
  };

  const handleEditImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setEditImage(file);
    setEditImagePreview(URL.createObjectURL(file));
  };

  const handleEditSave = async (product) => {
    setEditLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", editForm.name);
      formData.append("description", editForm.description);
      formData.append("category", editForm.category);
      formData.append("inStock", editForm.inStock);

      if (editForm.price500gm && editForm.price1kg) {
        formData.append("sizes[0][weight]", "500gm");
        formData.append("sizes[0][price]", editForm.price500gm);
        formData.append("sizes[1][weight]", "1kg");
        formData.append("sizes[1][price]", editForm.price1kg);
      } else if (editForm.pricePiece) {
        formData.append("sizes[0][weight]", product.sizes?.[0]?.weight || "per piece");
        formData.append("sizes[0][price]", editForm.pricePiece);
      }

      if (editImage) {
        formData.append("image", editImage);
      }

      const savedUser = localStorage.getItem("blissfulUser");
      const token = savedUser ? JSON.parse(savedUser).token : "";

      await axios.put(`${BASE_URL}/api/products/${product._id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      setEditingProduct(null);
      setEditImage(null);
      setEditImagePreview(null);
      fetchProducts();
      alert("Product updated successfully!");
    } catch (error) {
      console.error(error);
      alert("Failed to update product!");
    } finally {
      setEditLoading(false);
    }
  };

  const handleAddImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setAddImage(file);
    setAddImagePreview(URL.createObjectURL(file));
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    if (!addForm.name || (!addForm.price500gm && !addForm.pricePiece)) {
      alert("Please fill name and at least one price!"); return;
    }
    setAddLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", addForm.name);
      formData.append("description", addForm.description);
      formData.append("category", addForm.category);
      formData.append("inStock", addForm.inStock);

      if (addForm.price500gm) {
        formData.append("sizes[0][weight]", "500gm");
        formData.append("sizes[0][price]", addForm.price500gm);
        if (addForm.price1kg) {
          formData.append("sizes[1][weight]", "1kg");
          formData.append("sizes[1][price]", addForm.price1kg);
        }
      } else if (addForm.pricePiece) {
        formData.append("sizes[0][weight]", "per piece");
        formData.append("sizes[0][price]", addForm.pricePiece);
      }

      if (addImage) formData.append("image", addImage);

      await axios.post(`${BASE_URL}/api/products`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setAddSuccess("Product added successfully! 🎂");
      setAddForm({ name: "", description: "", category: "cake", inStock: true, price500gm: "", price1kg: "", pricePiece: "" });
      setAddImage(null);
      setAddImagePreview(null);
      fetchProducts();
      setTimeout(() => setAddSuccess(""), 3000);
    } catch { alert("Failed to add product!"); }
    finally { setAddLoading(false); }
  };

  const handleStatusChange = async (id, status) => {
    try {
      await updateOrderStatus(id, status);
      setOrders((prev) => prev.map((o) => (o._id === id ? { ...o, status } : o)));
    } catch { alert("Failed to update status!"); }
  };

  if (!isLoggedIn) {
    return (
      <div className="admin-login">
        <div className="login-box">
          <h2>🔐 Admin Login</h2>
          <p>Blissful Bites Admin Panel</p>
          <input type="password" placeholder="Enter admin password" value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleLogin()} />
          {passwordError && <p className="login-error">{passwordError}</p>}
          <button onClick={handleLogin}>Login</button>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-panel">
      <div className="admin-header">
        <h1>🧁 Blissful Bites — Admin Panel</h1>
        <button className="logout-btn" onClick={() => setIsLoggedIn(false)}>Logout</button>
      </div>

      <div className="admin-tabs">
        <button className={activeTab === "products" ? "active" : ""} onClick={() => setActiveTab("products")}>
          🛍️ Products ({products.length})
        </button>
        <button className={activeTab === "add" ? "active" : ""} onClick={() => setActiveTab("add")}>
          ➕ Add Product
        </button>
        <button className={activeTab === "orders" ? "active" : ""} onClick={() => setActiveTab("orders")}>
          📦 Orders ({orders.length})
        </button>
      </div>

      {/* PRODUCTS TAB */}
      {activeTab === "products" && (
        <div className="admin-section">
          <h2>All Products</h2>
          {loadingProducts ? <p>Loading products...</p> : (
            <div className="products-table">
              {products.map((product) => (
                <div key={product._id} className="product-row">
                  {editingProduct === product._id ? (
                    <div className="edit-form">
                      {/* Image upload in edit */}
                      <div className="edit-image-section">
                        <label className="edit-image-label">Product Image:</label>
                        {editImagePreview && (
                          <img src={editImagePreview} alt="preview" className="edit-image-preview" />
                        )}
                        <label className="upload-btn-label">
                          📷 {editImage ? "Change Image" : "Upload New Image"}
                          <input type="file" accept="image/*" onChange={handleEditImageChange} style={{ display: "none" }} />
                        </label>
                        {editImage && <small className="upload-filename">✅ {editImage.name}</small>}
                      </div>

                      <input value={editForm.name} onChange={(e) => setEditForm({ ...editForm, name: e.target.value })} placeholder="Product name" />
                      <input value={editForm.description} onChange={(e) => setEditForm({ ...editForm, description: e.target.value })} placeholder="Description" />
                      <select value={editForm.category} onChange={(e) => setEditForm({ ...editForm, category: e.target.value })}>
                        <option value="cake">Cake</option>
                        <option value="cupcake">Cupcake</option>
                        <option value="pastry">Pastry</option>
                        <option value="cookie">Cookie</option>
                        <option value="bread">Bread</option>
                        <option value="other">Other</option>
                      </select>
                      {product.sizes?.length > 1 ? (
                        <div className="price-inputs">
                          <input type="number" value={editForm.price500gm} onChange={(e) => setEditForm({ ...editForm, price500gm: e.target.value })} placeholder="500gm price" />
                          <input type="number" value={editForm.price1kg} onChange={(e) => setEditForm({ ...editForm, price1kg: e.target.value })} placeholder="1kg price" />
                        </div>
                      ) : (
                        <input type="number" value={editForm.pricePiece} onChange={(e) => setEditForm({ ...editForm, pricePiece: e.target.value })} placeholder="Price per piece" />
                      )}
                      <div className="edit-buttons">
                        <button className="save-btn" onClick={() => handleEditSave(product)} disabled={editLoading}>
                          {editLoading ? "Saving..." : "✅ Save"}
                        </button>
                        <button className="cancel-btn" onClick={() => { setEditingProduct(null); setEditImage(null); setEditImagePreview(null); }}>
                          ✖ Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="product-info">
                      <div className="admin-img-wrap">
                        {product.image ? (
                          <img
                            src={product.image.startsWith("http") ? product.image : `${BASE_URL}/uploads/${product.image}`}
                            alt={product.name}
                            className="admin-product-img"
                            onError={(e) => { e.target.style.display = "none"; }}
                          />
                        ) : (
                          <div className="admin-no-img">📷</div>
                        )}
                      </div>
                      <div className="product-details">
                        <h4>{product.name}</h4>
                        <p>{product.category} | {product.inStock ? "✅ In Stock" : "❌ Out of Stock"}</p>
                        <p>{product.sizes?.map((s) => `${s.weight}: ₹${s.price}`).join(" | ")}</p>
                      </div>
                      <div className="product-actions">
                        <button className="edit-btn" onClick={() => handleEditClick(product)}>✏️ Edit</button>
                        <button className="delete-btn" onClick={() => handleDelete(product._id)}>🗑️ Delete</button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ADD PRODUCT TAB */}
      {activeTab === "add" && (
        <div className="admin-section">
          <h2>Add New Product</h2>
          {addSuccess && <p className="success-msg">{addSuccess}</p>}
          <form className="add-product-form" onSubmit={handleAddProduct}>

            {/* Image upload preview */}
            <div className="form-group">
              <label>Product Image</label>
              <div className="add-image-section">
                {addImagePreview && (
                  <img src={addImagePreview} alt="preview" className="add-image-preview" />
                )}
                <label className="upload-btn-label">
                  📷 {addImage ? "Change Image" : "Choose Image"}
                  <input type="file" accept="image/*" onChange={handleAddImageChange} style={{ display: "none" }} />
                </label>
                {addImage && <small className="upload-filename">✅ {addImage.name}</small>}
              </div>
            </div>

            <div className="form-group">
              <label>Product Name</label>
              <input type="text" placeholder="e.g. Black Forest Cake" value={addForm.name} onChange={(e) => setAddForm({ ...addForm, name: e.target.value })} required />
            </div>
            <div className="form-group">
              <label>Description</label>
              <input type="text" placeholder="Short description" value={addForm.description} onChange={(e) => setAddForm({ ...addForm, description: e.target.value })} />
            </div>
            <div className="form-group">
              <label>Category</label>
              <select value={addForm.category} onChange={(e) => setAddForm({ ...addForm, category: e.target.value })}>
                <option value="cake">Cake</option>
                <option value="cupcake">Cupcake</option>
                <option value="pastry">Pastry</option>
                <option value="cookie">Cookie</option>
                <option value="bread">Bread</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>500gm Price (₹)</label>
                <input type="number" placeholder="e.g. 450" value={addForm.price500gm} onChange={(e) => setAddForm({ ...addForm, price500gm: e.target.value })} />
              </div>
              <div className="form-group">
                <label>1kg Price (₹)</label>
                <input type="number" placeholder="e.g. 850" value={addForm.price1kg} onChange={(e) => setAddForm({ ...addForm, price1kg: e.target.value })} />
              </div>
            </div>
            <div className="form-group">
              <label>Per Piece Price (₹)</label>
              <input type="number" placeholder="e.g. 60" value={addForm.pricePiece} onChange={(e) => setAddForm({ ...addForm, pricePiece: e.target.value })} />
            </div>
            <div className="form-group">
              <label>
                <input type="checkbox" checked={addForm.inStock} onChange={(e) => setAddForm({ ...addForm, inStock: e.target.checked })} />
                {" "}In Stock
              </label>
            </div>
            <button type="submit" className="add-btn" disabled={addLoading}>
              {addLoading ? "Adding..." : "➕ Add Product"}
            </button>
          </form>
        </div>
      )}

      {/* ORDERS TAB */}
      {activeTab === "orders" && (
        <div className="admin-section">
          <h2>All Orders</h2>
          {loadingOrders ? <p>Loading orders...</p> : orders.length === 0 ? <p>No orders yet!</p> : (
            <div className="orders-list">
              {orders.map((order) => (
                <div key={order._id} className="order-card">
                  <div className="order-header">
                    <div>
                      <h4>#{order._id.slice(-8).toUpperCase()}</h4>
                      <p>{new Date(order.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" })}</p>
                    </div>
                    <select value={order.status} onChange={(e) => handleStatusChange(order._id, e.target.value)} className={`status-select status-${order.status}`}>
                      <option value="pending">⏳ Pending</option>
                      <option value="confirmed">✅ Confirmed</option>
                      <option value="delivered">🚚 Delivered</option>
                      <option value="cancelled">❌ Cancelled</option>
                    </select>
                  </div>
                  <div className="order-body">
                    <div className="customer-info">
                      <p><b>{order.customerName}</b></p>
                      <p>📞 {order.phone}</p>
                      <p>📍 {order.address}, {order.city} - {order.pincode}</p>
                      <p>💳 {order.paymentMethod}</p>
                    </div>
                    <div className="order-items">
                      {order.orderItems?.map((item, i) => (
                        <div key={i} className="order-item-row">
                          <span>{item.name} {item.size ? `(${item.size})` : ""}</span>
                          <span>×{item.quantity}</span>
                          <span>₹{(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                      ))}
                    </div>
                    <div className="order-total">
                      {order.discount > 0 && <p className="discount-line">Discount: -₹{order.discount?.toFixed(2)}</p>}
                      <p><b>Total: ₹{order.finalPrice?.toFixed(2)}</b></p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

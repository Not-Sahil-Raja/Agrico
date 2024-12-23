import { useState } from "react";
import {
  Loader2,
  Plus,
  ImageIcon,
  DollarSign,
  Package,
  Tag,
  FilePlus2,
} from "lucide-react";
import { useAuth } from "@clerk/clerk-react";
import axios from "axios";
import { useSelector } from "react-redux";

export default function AddProduct() {
  const seller = useSelector((state) => state.sellerDetail);
  const { getToken } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [itemImage, setItemImage] = useState(null);

  const [itemName, setItemName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [itemInStock, setItemInStock] = useState(false);
  const [productImg, setProductImg] = useState(null);

  const handleSubmit = async (e) => {
    if (!seller.sellerDetails.email) return "Insufficient details!!";
    e.preventDefault();
    setIsSubmitting(true);
    const token = await getToken();
    const formData = new FormData();
    formData.append("email", seller.sellerDetails.email);
    formData.append("itemName", itemName);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("price", price);
    formData.append("quantity", quantity);
    formData.append("itemInStock", itemInStock);
    if (productImg) formData.append("productImg", productImg);

    axios
      .post(`${import.meta.env.VITE_SERVER}/product/add`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setItemName("");
        setDescription("");
        setCategory("");
        setPrice("");
        setQuantity("");
        setItemInStock(false);
        setItemImage(null);
        setProductImg(null);
      })
      .catch((err) => console.error(err));

    setIsSubmitting(false);
  };

  const handleFileChanges = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setProductImg(file);
      setItemImage(URL.createObjectURL(file));
    }
  };

  return (
    <div className="p-8 space-y-8 font-Archivo bg-stone-100">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-primary">Add New Product</h1>
        <button className="border border-gray-300 rounded px-4 py-2 flex items-center">
          <Plus className="mr-2 h-4 w-4" /> Quick Add
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="p-4 bg-white rounded-lg shadow">
          <div className="mb-4">
            <h2 className="text-lg font-bold">Item Details</h2>
            <p className="text-sm text-gray-500">
              Provide the basic information about your item.
            </p>
          </div>
          <div className="grid gap-6">
            <div className="grid gap-2">
              <label
                htmlFor="itemName"
                className="block text-sm font-medium text-gray-700"
              >
                Item Name
              </label>
              <div className="relative">
                <Tag className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                <input
                  id="itemName"
                  placeholder="Enter item name"
                  className="block w-full border border-gray-300 rounded pl-8 px-3 py-2"
                  value={itemName}
                  onChange={(e) => setItemName(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="grid gap-2">
              <label
                htmlFor="itemDescription"
                className="block text-sm font-medium text-gray-700"
              >
                Description
              </label>
              <textarea
                id="itemDescription"
                placeholder="Describe your item"
                className="block w-full border border-gray-300 rounded px-3 py-2"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <label
                htmlFor="itemCategory"
                className="block text-sm font-medium text-gray-700"
              >
                Category
              </label>
              <select
                id="itemCategory"
                className="block w-full border border-gray-300 rounded px-3 py-2"
                required
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="" disabled>
                  Select a category
                </option>
                <option value="fruits">Fruits</option>
                <option value="vegetables">Vegetables</option>
                <option value="dairy">Dairy</option>
                <option value="meat">Meat</option>
                <option value="grains">Grains</option>
              </select>
            </div>
          </div>
        </div>
        <div className=" flex gap-3">
          <div className="p-4 bg-white rounded-lg shadow grow">
            <div className="mb-4">
              <h2 className="text-lg font-bold">Pricing and Inventory</h2>
              <p className="text-sm text-gray-500">
                Set the price and manage inventory for your item.
              </p>
            </div>
            <div className="grid gap-6">
              <div className="grid gap-2">
                <label
                  htmlFor="itemPrice"
                  className="block text-sm font-medium text-gray-700"
                >
                  Price
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                  <input
                    id="itemPrice"
                    type="number"
                    min="0"
                    step="0.01"
                    placeholder="0.00"
                    className="block w-full border border-gray-300 rounded pl-8 px-3 py-2"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <label
                  htmlFor="itemQuantity"
                  className="block text-sm font-medium text-gray-700"
                >
                  Quantity
                </label>
                <div className="relative">
                  <Package className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                  <input
                    id="itemQuantity"
                    type="number"
                    min="0"
                    placeholder="0"
                    className="block w-full border border-gray-300 rounded pl-8 px-3 py-2"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="itemInStock"
                  className="toggle-checkbox p-2 h-4 w-4 text-primary border-gray-300 rounded focus:ring-primary"
                  checked={itemInStock}
                  onChange={(e) => setItemInStock(e.target.checked)}
                />
                <label
                  htmlFor="itemInStock"
                  className="block  font-medium text-gray-700"
                >
                  Item is in stock
                </label>
              </div>
            </div>
          </div>

          <div className="p-4 bg-white rounded-lg shadow grow">
            <div className="mb-4">
              <h2 className="text-lg font-bold">Item Image</h2>
              <p className="text-sm text-gray-500">
                Upload an image of your item.
              </p>
            </div>
            <div className="grid gap-6">
              <div className="grid gap-2">
                <div className="flex items-center gap-4">
                  {itemImage ? (
                    <img
                      src={itemImage}
                      alt="Item preview"
                      className="w-36 h-36 object-cover rounded"
                    />
                  ) : (
                    <div className="w-36 h-36 bg-gray-200 rounded flex items-center justify-center">
                      <ImageIcon className="h-8 w-8 text-gray-500" />
                    </div>
                  )}
                  <label
                    htmlFor="itemImage"
                    className="border border-gray-300 bg-zinc-50 border-dotted rounded px-4 py-2 cursor-pointer flex flex-col items-center justify-center w-36 h-36 "
                  >
                    <FilePlus2 className="mr-2 h-6 w-6" />
                    Select File
                    <input
                      id="itemImage"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleFileChanges}
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="border border-[#91a75f] bg-[#DAF0A8] rounded px-4 py-2 flex items-center disabled:opacity-65"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Adding Item...
              </>
            ) : (
              <>
                <Plus className="mr-2 h-4 w-4" />
                Add Item
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

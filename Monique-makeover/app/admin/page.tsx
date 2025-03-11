"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { products } from "@/lib/data"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { useToast } from "@/components/ui/use-toast"
import type { Product } from "@/lib/types"

export default function AdminPage() {
  const [localProducts, setLocalProducts] = useState<Product[]>([])
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    // Load products from localStorage if available, otherwise use the default products
    const savedProducts = localStorage.getItem("products")
    if (savedProducts) {
      setLocalProducts(JSON.parse(savedProducts))
    } else {
      setLocalProducts(products)
      localStorage.setItem("products", JSON.stringify(products))
    }
  }, [])

  const handleSaveProducts = () => {
    localStorage.setItem("products", JSON.stringify(localProducts))
    toast({
      title: "Products saved",
      description: "Your product changes have been saved to local storage.",
    })
  }

  const handleEditProduct = (product: Product) => {
    setSelectedProduct({ ...product })
    setIsEditing(true)
  }

  const handleUpdateProduct = () => {
    if (!selectedProduct) return

    const updatedProducts = localProducts.map((p) => (p.id === selectedProduct.id ? selectedProduct : p))

    setLocalProducts(updatedProducts)
    setIsEditing(false)
    setSelectedProduct(null)

    toast({
      title: "Product updated",
      description: "Remember to save changes to persist them.",
    })
  }

  const handleDeleteProduct = (id: string) => {
    const updatedProducts = localProducts.filter((p) => p.id !== id)
    setLocalProducts(updatedProducts)

    toast({
      title: "Product deleted",
      description: "Remember to save changes to persist them.",
      variant: "destructive",
    })
  }

  const handleAddNewProduct = () => {
    const newProduct: Product = {
      id: `new-${Date.now()}`,
      name: "New Product",
      brand: "Brand Name",
      price: 1000,
      image: "/placeholder.svg",
      rating: 5,
      reviewCount: 0,
      description: "Product description",
      category: "makeup",
      stock: 10,
      isNew: true,
    }

    setLocalProducts([...localProducts, newProduct])
    handleEditProduct(newProduct)

    toast({
      title: "New product added",
      description: "Edit the details and save changes.",
    })
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Product Management</h1>
          <div className="space-x-2">
            <Button onClick={handleAddNewProduct}>Add New Product</Button>
            <Button onClick={handleSaveProducts} className="bg-green-600 hover:bg-green-700">
              Save All Changes
            </Button>
          </div>
        </div>

        {isEditing && selectedProduct ? (
          <div className="bg-white p-6 rounded-lg shadow-sm border mb-6">
            <h2 className="text-xl font-semibold mb-4">Edit Product</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="space-y-2">
                <Label htmlFor="name">Product Name</Label>
                <Input
                  id="name"
                  value={selectedProduct.name}
                  onChange={(e) => setSelectedProduct({ ...selectedProduct, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="brand">Brand</Label>
                <Input
                  id="brand"
                  value={selectedProduct.brand}
                  onChange={(e) => setSelectedProduct({ ...selectedProduct, brand: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="price">Price (KSh)</Label>
                <Input
                  id="price"
                  type="number"
                  value={selectedProduct.price}
                  onChange={(e) => setSelectedProduct({ ...selectedProduct, price: Number(e.target.value) })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Input
                  id="category"
                  value={selectedProduct.category || ""}
                  onChange={(e) => setSelectedProduct({ ...selectedProduct, category: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="stock">Stock</Label>
                <Input
                  id="stock"
                  type="number"
                  value={selectedProduct.stock || 0}
                  onChange={(e) => setSelectedProduct({ ...selectedProduct, stock: Number(e.target.value) })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="image">Image URL</Label>
                <Input
                  id="image"
                  value={selectedProduct.image}
                  onChange={(e) => setSelectedProduct({ ...selectedProduct, image: e.target.value })}
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={selectedProduct.description || ""}
                  onChange={(e) => setSelectedProduct({ ...selectedProduct, description: e.target.value })}
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="isNew">New Arrival</Label>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="isNew"
                    checked={selectedProduct.isNew || false}
                    onChange={(e) => setSelectedProduct({ ...selectedProduct, isNew: e.target.checked })}
                    className="mr-2"
                  />
                  <Label htmlFor="isNew">Mark as new arrival</Label>
                </div>
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
              <Button onClick={handleUpdateProduct}>Update Product</Button>
            </div>
          </div>
        ) : null}

        <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Product
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Stock
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {localProducts.map((product) => (
                  <tr key={product.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 flex-shrink-0">
                          <img
                            src={product.image || "/placeholder.svg"}
                            alt={product.name}
                            className="h-10 w-10 object-cover rounded-md"
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{product.name}</div>
                          <div className="text-sm text-gray-500">{product.brand}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{product.category}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">Ksh {product.price.toLocaleString()}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{product.stock || 0}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <Button
                        variant="ghost"
                        className="text-blue-600 hover:text-blue-900 mr-2"
                        onClick={() => handleEditProduct(product)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="ghost"
                        className="text-red-600 hover:text-red-900"
                        onClick={() => handleDeleteProduct(product.id)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}


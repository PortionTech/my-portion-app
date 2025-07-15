import { Plus } from "lucide-react"
import { useState } from "react"
import { VendorProductCard } from "../shared/ProductCard"
import ProductDetailsModal from "./ProductDetailsModal"
import type { ProductAttribute } from "@shared/types/product"

interface ProductsContentProps {
  vendorProducts: ProductAttribute[]
  onAddProduct: () => void
  onEditProduct: (product: ProductAttribute) => void
  onShareProduct: (product: ProductAttribute) => void
  // onViewProduct: (product: ProductAttribute) => void
}

const ProductsContent = ({ 
  vendorProducts, 
  onAddProduct, 
  onEditProduct, 
  onShareProduct 
}: ProductsContentProps) => {
  const [selectedProduct, setSelectedProduct] = useState<ProductAttribute | null>(null)
  const [showDetailsModal, setShowDetailsModal] = useState(false)

  const handleViewProduct = (product: ProductAttribute) => {
    setSelectedProduct(product)
    setShowDetailsModal(true)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-xl sm:text-2xl font-semibold">My Products</h2>
        <button 
          onClick={onAddProduct}
          className="bg-green-500 text-white px-4 sm:px-6 py-2 rounded-lg hover:bg-green-600 flex items-center w-full sm:w-auto justify-center"
        >
          <Plus size={20} className="mr-2" />
          Add Product
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {vendorProducts.map(product => (
          <VendorProductCard 
            key={product.id} 
            product={product}
            onEdit={onEditProduct}
            onShare={onShareProduct}
            onView={handleViewProduct}
          />
        ))}
      </div>

      {/* Product Details Modal */}
      <ProductDetailsModal
        isOpen={showDetailsModal}
        onClose={() => setShowDetailsModal(false)}
        product={selectedProduct}
        onEdit={onEditProduct}
        onShare={onShareProduct}
      />
    </div>
  )
}

export default ProductsContent 
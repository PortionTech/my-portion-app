import type { ProductAttribute } from "@shared/types/product"
import { Status } from "@shared/enums"
import { Package, Plus, Share2, Edit3 } from "lucide-react"
import { useState } from "react"
import WithdrawFundsModal from "./WithdrawFundsModal"

interface DashboardContentProps {
  vendorProducts: ProductAttribute[]
  dashboardStats: {
    walletBalance: number
    newOrders: number
    productViews: number
  }
  bankDetails: {
    bankName: string
    accountNumber: string
    accountName: string
  }
  kycStatus: boolean
  onAddProduct: () => void
  onEditProduct: (product: ProductAttribute) => void
  onShareProduct: (product: ProductAttribute) => void
  onWithdrawFunds: (amount: number) => void
  onRedirectToBank?: () => void
}

const DashboardContent = ({ 
  vendorProducts, 
  dashboardStats, 
  bankDetails,
  kycStatus,
  onAddProduct, 
  onEditProduct, 
  onShareProduct, 
  onWithdrawFunds,
  onRedirectToBank
}: DashboardContentProps) => {
  const hasProducts = vendorProducts.length > 0
  const [showWithdrawModal, setShowWithdrawModal] = useState(false)

  const handleWithdrawClick = () => {
    setShowWithdrawModal(true)
  }

  const handleWithdraw = async (amount: number) => {
    await onWithdrawFunds(amount)
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">

      <div className="lg:col-span-2">
        <div className="bg-white rounded-lg shadow-sm border p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <h2 className="text-lg sm:text-xl font-semibold">Your Live Products</h2>
            <button 
              onClick={onAddProduct}
              className="bg-green-500 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg hover:bg-green-600 flex items-center font-medium w-full sm:w-auto justify-center"
            >
              <Plus size={20} className="mr-2" />
              Add New Product
            </button>
          </div>

          {!hasProducts ? (
            // State 1: Empty Store - First Time Experience
            <div className="text-center py-8 sm:py-12">
              <div className="w-20 h-20 sm:w-24 sm:h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <Package className="w-10 h-10 sm:w-12 sm:h-12 text-green-600" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">
                Welcome to Portions!
              </h3>
              <p className="text-gray-600 mb-6 sm:mb-8 max-w-md mx-auto text-sm sm:text-base">
                Your storefront is ready. Let's add your first product to start selling.
              </p>
              <button 
                onClick={onAddProduct}
                className="bg-green-500 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg hover:bg-green-600 flex items-center mx-auto text-base sm:text-lg font-semibold w-full sm:w-auto justify-center"
              >
                <Plus size={20} className="mr-2" />
                ADD MY FIRST PRODUCT
              </button>
            </div>
          ) : (
            // State 2: Active Store - Day-to-Day Experience
            <div className="space-y-4">
              {vendorProducts.map(product => (
                <div key={product.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-2">
                        <h3 className="font-semibold text-base sm:text-lg">{product.name}</h3>
                        <span className={`px-2 py-1 rounded text-xs font-medium w-fit ${
                          product.status === Status.Delivered ? 'bg-green-100 text-green-800' :
                          product.status === Status.Pending ? 'bg-yellow-100 text-yellow-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {product.status === Status.Delivered ? Status.Delivered : 
                           product.status === Status.Pending ? Status.Pending : Status.Cancelled}
                        </span>
                      </div>
                      
                      <p className="text-green-600 font-bold text-base sm:text-lg mb-2">₦{product.price_per_portion}</p>
                      {/* <p className="text-gray-600 text-sm mb-3">{product.quantity_unit} • {product.category}</p> */}
                      
                      {product.status === Status.Pending && (
                        <p className="text-sm text-gray-600 mb-3">
                          {product.available_portions } of {(product.total_quantity / product.portion_size)} portions booked
                        </p>
                      )}
                      
                      {product.status === Status.Pending && (
                        <p className="text-sm text-yellow-600 mb-3">
                          We're reviewing your product. It will be live shortly.
                        </p>
                      )}
                      
                      {product.available_portions == 0 && (
                        <p className="text-sm text-red-600 mb-3 font-medium">
                          Sold Out!
                        </p>
                      )}
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                      {product.status === Status.Pending && (
                        <>
                          <button 
                            onClick={() => onShareProduct(product)}
                            className="bg-blue-500 text-white px-3 sm:px-4 py-2 rounded text-sm hover:bg-blue-600 flex items-center justify-center"
                          >
                            <Share2 size={16} className="mr-1" />
                            Share Listing
                          </button>
                          <button 
                            onClick={() => onEditProduct(product)}
                            className="bg-gray-500 text-white px-3 sm:px-4 py-2 rounded text-sm hover:bg-gray-600 flex items-center justify-center"
                          >
                            <Edit3 size={16} className="mr-1" />
                            Edit
                          </button>
                        </>
                      )}
                      
                      {/* {product.bookedPortions === product.totalPortions && product.status === 'active' && (
                        <button className="bg-green-500 text-white px-3 sm:px-4 py-2 rounded text-sm hover:bg-green-600">
                          Re-list this Product
                        </button>
                      )} */}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Action Sidebar */}
      <div className="space-y-4 sm:space-y-6">
        {/* Wallet */}
        <div className="bg-white rounded-lg shadow-sm border p-4 sm:p-6">
          <h3 className="text-base sm:text-lg font-semibold mb-4">Your Wallet</h3>
          <div className="text-center mb-4">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">₦{dashboardStats.walletBalance}</h1>
            <p className="text-sm text-gray-600">Available for withdrawal</p>
          </div>
          <button 
            onClick={handleWithdrawClick}
            className="w-full bg-green-500 text-white py-2 sm:py-3 rounded-lg hover:bg-green-600 font-medium"
          >
            Withdraw Funds
          </button>
        </div>

        {/* Performance */}
        <div className="bg-white rounded-lg shadow-sm border p-4 sm:p-6">
          <h3 className="text-base sm:text-lg font-semibold mb-4">Performance This Week</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600 text-sm sm:text-base">New Orders:</span>
              <span className="font-semibold">{dashboardStats.newOrders}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 text-sm sm:text-base">Product Views:</span>
              <span className="font-semibold">{dashboardStats.productViews}</span>
            </div>
          </div>
        </div>

      </div>

      {/* Withdraw Funds Modal */}
      <WithdrawFundsModal
        isOpen={showWithdrawModal}
        onClose={() => setShowWithdrawModal(false)}
        onWithdraw={handleWithdraw}
        walletBalance={dashboardStats.walletBalance}
        bankDetails={bankDetails}
        kycStatus={kycStatus}
        onRedirectToBank={onRedirectToBank}
      />
    </div>
  )
}

export default DashboardContent 
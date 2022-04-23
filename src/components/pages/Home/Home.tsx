import React, { useState, useEffect } from "react"
import ReactPaginate from "react-paginate"
import { useDispatch, useSelector } from "react-redux"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBagShopping } from "@fortawesome/free-solid-svg-icons"
import _ from "lodash"

import PacmanLoader from "react-spinners/PacmanLoader"

import {
  filterGenerator,
  paginate,
  pipe,
} from "../../../services/utils/filters"

import CartItem from "../../organisms/cart-item/Cart-Item"
import RadioFilter from "../../organisms/radio-filter/Radio-Filter"
import CheckboxFilter from "../../organisms/checkbox-filter/Checkbox-Filter"
import Button from "../../atoms/button/Button"
import Card from "../../organisms/card/Card"
import { addToCart } from "../../../redux/features/cartSlice"

import Products from "../../../services/repositories/items.json"

import { cartTotalPriceSelector } from "../../../redux/selectors/cart"
import { getImages } from "../../../redux/features/imagesSlice"

const sortOptions = [
  { title: "Price Low To High", value: "LTH" },
  { title: "Price High To Low", value: "HTL" },
  { title: "New To Old", value: "NTO" },
  { title: "Old To New", value: "OTN" },
]

const Home = () => {
  // UseSelector

  // @ts-ignore:next-line
  const cartItems = useSelector((state) => state.cart)
  const dispatch = useDispatch()
  const totalPrice: number = useSelector(cartTotalPriceSelector)

  // UseState
  const [loading, setLoading] = useState<boolean>(false)

  const [selectedSort, setSelectedSort] = useState<string>("")
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [selectedType, setSelectedType] = useState<string>("mug")

  const [categories, setCategories] = useState<string[]>([])
  const [brands, setBrands] = useState<string[]>([])
  const [tags, setTags] = useState<string[]>([])

  const [filters, setFilters] = useState({
    currentProducts: [],
    sort: "",
    brands: [],
    tags: [],
  })

  const [filtered, setFiltered] = useState<any[]>([])

  // Pagination States
  const [currentItems, setCurrentItems] = useState<any[]>([])
  const [pageCount, setPageCount] = useState<number>(0)
  const [itemOffset, setItemOffset] = useState<number>(0)

  // Handlers
  const handleRadio = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedSort(event.target.value)
  }

  const handleBrands = (event: any) => {
    const checked = event.target.checked
    if (checked) {
      setSelectedBrands((prevState) => [...prevState, event.target.value])
    } else {
      const index = selectedBrands.indexOf(event.target.value)
      selectedBrands.splice(index, 1)
      setSelectedBrands((prevState) => [...prevState])
    }
  }
  const handleTags = (event: any) => {
    const checked = event.target.checked
    if (checked) {
      setSelectedTags((prevState) => [...prevState, event.target.value])
    } else {
      const index = selectedTags.indexOf(event.target.value)
      selectedTags.splice(index, 1)
      setSelectedTags((prevState) => [...prevState])
    }
  }

  const handlePageClick = (event: any) => {
    const newOffset = (event.selected * 16) % filtered.length
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    )
    setItemOffset(newOffset)
  }

  const onAddHandler = (item: any) => {
    dispatch(addToCart({ name: item.name, price: item.price }))
  }

  // UseEffects

  useEffect(() => {
    setLoading(true)
    dispatch(getImages(16))
    setCategories(filterGenerator(Products, "itemType"))
    setBrands(filterGenerator(Products, "manufacturer"))
    setTags(filterGenerator(Products, "tags"))
    setLoading(false)
  }, [dispatch])

  useEffect(() => {
    setLoading(true)
    setCurrentItems(paginate(itemOffset, filtered))
    setPageCount(Math.ceil(filtered.length / 16))
    setLoading(false)
  }, [itemOffset, selectedType, selectedSort, selectedBrands, filtered])

  useEffect(() => {
    setLoading(true)
    setFilters((prevState: any) => ({
      ...prevState,
      currentProducts: _.filter(Products, (p) => p.itemType === selectedType),
      sort: selectedSort,
      brands: selectedBrands,
      tags: selectedTags,
    }))
    setLoading(false)
  }, [selectedBrands, selectedSort, selectedType, selectedTags])

  useEffect(() => {
    setLoading(true)
    setFiltered(
      pipe(
        { tags: filters.tags, manufacturer: filters.brands },
        filters.sort,
        filters.currentProducts
      )
    )
  }, [filters])

  return (
    <>
      <header className="header">
        <div className="container">
          <div className="header_container">
            <div className="header_logo">Logo</div>
            <div className="header_cart">
              <div className="header_cart-icon">
                <FontAwesomeIcon icon={faBagShopping} />
              </div>
              <div className="header_cart-total">₺{totalPrice.toFixed(2)}</div>
            </div>
          </div>
        </div>
      </header>
      <div className="container">
        <main className="main">
          {/* Cart */}
          <section className="column-1">
            <div className="cart">
              {/* @ts-ignore */}
              <CartItem items={cartItems} />
            </div>
            <div className="cart_total">₺{totalPrice.toFixed(2)}</div>
          </section>
          {/* Product List */}
          <section className="column-2">
            <h2>Products</h2>
            <div className="category-switcher">
              {categories.map((c, index) => (
                <div className="switch" key={index}>
                  <Button
                    content={_.capitalize(c)}
                    type={selectedType === c ? "primary" : "secondary"}
                    onClick={(e) =>
                      setSelectedType(e.target.innerHTML.toLowerCase())
                    }
                  />
                </div>
              ))}
            </div>
            {loading ? (
              <div className="loading">
                <PacmanLoader />
              </div>
            ) : (
              <div className="itemsWrapper">
                <div className="items">
                  {currentItems.map((product, index) => (
                    <Card
                      key={index}
                      title={product.name}
                      price={product.price}
                      onAdd={() => onAddHandler(product)}
                    />
                  ))}
                </div>
                {/* @ts-ignore:next-line */}
                <ReactPaginate
                  breakLabel="..."
                  nextLabel="Next >"
                  onPageChange={handlePageClick}
                  pageRangeDisplayed={5}
                  pageCount={pageCount}
                  previousLabel="< Prev"
                  containerClassName="paginate_container"
                  pageClassName="paginate_page"
                />
              </div>
            )}
          </section>
          {/* Filters */}
          <section className="column-3">
            <div className="filters">
              <div className="filters_item">
                <span className="filters_title">Sorting</span>
                <div className="filters_sorting">
                  <RadioFilter
                    onChangeHandler={handleRadio}
                    state={selectedSort}
                    options={sortOptions}
                  />
                </div>
              </div>
              <div className="filters_item">
                <span className="filters_title">Brands</span>
                <CheckboxFilter
                  options={brands}
                  checkboxHandler={handleBrands}
                  placeholder="Search Brand"
                />
              </div>
              <div className="filters_item">
                <span className="filters_title">Tags</span>
                <CheckboxFilter
                  options={tags}
                  checkboxHandler={handleTags}
                  placeholder="Search Tag"
                />
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  )
}

export default Home

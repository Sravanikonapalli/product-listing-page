import { Component } from "react";
import '../styles/products.css';
import { TiArrowSortedDown } from "react-icons/ti";
import { FaHeart, FaRegHeart } from "react-icons/fa";

class Products extends Component {
    state = {
        products: [],
        loading: true,
        showFilters: false,
        showRecommended: false,
        selectedSort: 'Recommended',
        toggleFavorite: {},
        toggleDescription: {}
    };

    componentDidMount() {
        this.fetchProducts();
    }

    fetchProducts = async () => {
        this.setState({ loading: true });
        try {
            const response = await fetch("https://fakestoreapi.com/products");
            const data = await response.json();
            this.setState({ products: data, loading: false });
        } catch (error) {
            console.error("Error fetching products:", error);
            this.setState({ loading: false });
        }
    };

    toggleFilters = () => {
        this.setState((prevState) => ({ showFilters: !prevState.showFilters }));
    };

    toggleRecommended = () => {
        this.setState((prevState) => ({ showRecommended: !prevState.showRecommended }));
    };

    toggleFavorite = (id) => {
        this.setState((prevState) => ({
            toggleFavorite: { ...prevState.toggleFavorite, [id]: !prevState.toggleFavorite[id] 
        }}));
    }

    toggleDescription = (id) => {
        this.setState((prevState) => ({
            toggleDescription: { ...prevState.toggleDescription, [id]: !prevState.toggleDescription[id] 
        }}));
    };

    setSort = (sortOption) => {
        this.setState({ selectedSort: sortOption, showRecommended: false });
    };

    getSortedProducts = () => {
        const { products, selectedSort } = this.state;
        let sortedProducts = [...products];

        switch (selectedSort) {
            case 'Price : High to Low':
                sortedProducts.sort((a, b) => b.price - a.price);
                break;
            case 'Price : Low to High':
                sortedProducts.sort((a, b) => a.price - b.price);
                break;
            case 'Newest First':
                sortedProducts.sort((a, b) => b.id - a.id);//higher id means newer product
                break;
            case 'Popular':
                sortedProducts.sort((a, b) => b.rating?.rate - a.rating?.rate); //based on rating
                break;
            default:
                break; 
        }

        return sortedProducts;
    };

    render() {
        const { loading, showFilters, showRecommended, selectedSort,toggleFavorite,toggleDescription } = this.state;
        const sortedProducts = this.getSortedProducts();

        return (
            <div className="products-page-container">
                <div className="products-above-container">
                    <p>{sortedProducts.length} ITEMS</p>
                    <button onClick={this.toggleFilters}>
                        {showFilters ? 'Hide Filters' : 'Show Filters'}
                    </button>

                    <div className="recommendation-wrapper">
                        <button onClick={this.toggleRecommended}>
                            {selectedSort} {TiArrowSortedDown}
                        </button>
                        {showRecommended && (
                            <ul className="recommendation-dropdown">
                                {['Recommended', 'Newest First', 'Popular', 'Price : High to Low', 'Price : Low to High']
                                    .map((option) => (
                                        <li key={option} onClick={() => this.setSort(option)}>
                                            {option}
                                        </li>
                                    ))}
                            </ul>
                        )}
                    </div>
                </div>
                <hr />

                <div className="products-container-wrapper">
                    {showFilters && (
                        <div className="filters-container">
                            <h4>CUSTOMIZABLE</h4>
                        
                            <div className="filter-group">
                                <h4>Ideal For</h4>
                                <label><input type="checkbox" name="idealFor" value="men" /> Men</label>
                                <label><input type="checkbox" name="idealFor" value="women" /> Women</label>
                                <label><input type="checkbox" name="idealFor" value="kids" /> Baby & Kids</label>
                            </div>
                            
                            <div className="filter-group">
                                <h4>Occasion</h4>
                                <label><input type="checkbox" name="occasion" value="work" /> Work</label>
                                <label><input type="checkbox" name="occasion" value="casual" /> Casual</label>
                            </div>

                            <div className="filter-group">
                                <h4>Fabric</h4>
                                <label><input type="checkbox" name="fabric" value="cotton" /> Cotton</label>
                                <label><input type="checkbox" name="fabric" value="linen" /> Linen</label>
                            </div>

                            <div className="filter-group">
                                <h4>Price</h4>
                                <label><input type="checkbox" name="price" value="under50" /> Under $50</label>
                                <label><input type="checkbox" name="price" value="50-100" /> $50 - $100</label>
                                <label><input type="checkbox" name="price" value="above100" /> Above $100</label>
                            </div>

                            <div className="filter-group">
                                <h4>Segment</h4>
                                <p>All</p>
                                <hr />
                                <h4>Suitable For</h4>
                                <p>All</p>
                                <hr />
                                <h4>Raw Materials</h4>
                                <p>All</p>
                                <hr />
                                <h4>Pattern</h4>
                                <p>All</p>
                            </div>
                        </div>
                    )}

                    <div className="products-container">
                        {loading ? (
                            <p style={{ color: 'red' }}>Loading...</p>
                        ) : (
                            sortedProducts.map((product) => (
                                <div key={product.id} className="product-card">
                                    <img src={product.image} alt={product.title} className="image" />
                                    <div>
                                    <h3 className="product-heading">{product.title}
                                    <span className="heart-icon" onClick={() => this.toggleFavorite(product.id)}>
                                    {toggleFavorite[product.id] ? <FaHeart color="red"/> : <FaRegHeart/>}
                                        </span>
                                    </h3>    
                                    </div>
                                    <p>{toggleDescription[product.id]?
                                    product.description:`${product.description.slice(0,80)}...`}
                                    <br/>
                                    <button onClick={() => this.toggleDescription(product.id)}>
                                        {toggleDescription[product.id] ? 'Show Less' : 'Show More'}
                                    </button>
                                    </p>
                                    <p>${product.price.toFixed(2)}</p>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        );
    }
}

export default Products;

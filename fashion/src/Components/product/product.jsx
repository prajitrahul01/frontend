import './product.css'

const Product = (props) => {
    return (
        <div className="center">
            <h2>{props.name}</h2>
        </div>
    )
}

export default Product;
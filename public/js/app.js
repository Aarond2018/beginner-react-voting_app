class ProductList extends React.Component {
    state = {
        products : [],
    }

    componentDidMount() {
        this.setState({products: Seed.products });
    }

    handleProductUpVote = (id) => {
        const updatedProducts = this.state.products.map(product => {
            if (product.id === id) {
                return Object.assign({}, product, {
                    votes: product.votes + 1
                })
            } else {
                return product;
            }
        })
        this.setState({
            products: updatedProducts
        })
    }

    render() {
        //sort the products from seed.js
        const sortedProducts = this.state.products.sort((a, b) => b.votes - a.votes);
        
        const productComponents = sortedProducts.map(product => (
            <Product 
                key={'product-' + product.id}
                id={product.id}
                title={product.title}
                description={product.description}
                url={product.url}
                votes={product.votes}
                submitterAvatarUrl={product.submitterAvatarUrl}
                productImageUrl={product.productImageUrl}
                onVote={this.handleProductUpVote}
             />
        ));
    
        return (
            <div className="main-container">
                {productComponents}
            </div>
        )
    }
}

class Product extends React.Component {
    handleUpVote = () => {
        this.props.onVote(this.props.id)
    } 

    render() {
        //products markup
        return (
            <div className="box">
                <div className="box-image">
                    <img src={this.props.productImageUrl}></img>
                </div>
                <div className = "box-content">
                    <div className="box-contenthead">
                        <div className="box-upArrow" onClick={this.handleUpVote}></div>
                        <p className="box-number">{this.props.votes}</p>
                    </div>
                    <p className="box-title">{this.props.title}</p>
                    <p className="box-desc">{this.props.description}</p>
                    <div className="box-submit">
                        <p className="box-submit-text">Submitted by: </p>
                        <img src={this.props.submitterAvatarUrl}></img>
                    </div>
                    
                </div>
            </div>
        )
    }
}

ReactDOM.render(<ProductList />, document.getElementById("content"));
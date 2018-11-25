import React from 'react';
import {render} from 'react-dom';
import ProductCatalogItem from "./productCatalogItem.jsx";

export class ProductCatalog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {products: []};
        this.GetCatalogItems = this.GetCatalogItems.bind(this);
        this.GroupCollection = this.GroupCollection.bind(this);
    }

    GetCatalogItems() {
        fetch('/get-products/everyday', {method: 'GET'})
            .then(res => res.json())
            .then(items => this.GroupCollection(items));
    }

    GroupCollection(collection) {
        let product_collection = [];
        let product_collections = [];
        // In case our number of products is not evenly divisible by 4,
        // put the items that will not make the cut into a separate array
        let leftOver = collection.length % 3;
        let leftOvers = collection.slice(collection.length - leftOver, collection.length);

        for (let i = 0; i < collection.length; i++) {
            product_collection.push(collection[i]);
            if (((product_collection.length % 3 === 0))) {
                product_collections.push(product_collection);
                product_collection = [];
            }
        }

        product_collections.push(leftOvers);
        this.setState({products: product_collections});
    }

    componentWillMount() {
        this.GetCatalogItems();
    }

    render() {
        return (
            this.state.products.map((productCollection, i) => (
                    <div className={i > 0 ? 'd-flex justify-content-center align-items-center flex-mobile-column mobile-hidden':
                        'd-flex justify-content-center align-items-center flex-mobile-column' }>
                        {
                            productCollection.map(product => (
                                <ProductCatalogItem name={product.name} desc={product.desc} image={product.image}/>
                            ))
                        }
                    </div>
                )
            )
        )
    }
}

render(<ProductCatalog/>, document.getElementById('everyday-container'));
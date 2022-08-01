export class ProductDTO {
    constructor(product) {
        this.id = product._id;
        this.name = product.name;
        this.category = product.category;
        this.price = product.clientPrice;
    }   
}




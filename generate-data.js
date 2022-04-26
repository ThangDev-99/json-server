const { faker } = require('@faker-js/faker');
const fs = require('fs');

faker.locale = "vi";

const randomCategoryList = (n) => {
    if (n <= 0) return [];
    const categoryList = []
    Array.from(new Array(n)).forEach(() => {

        const category = {
            id: faker.random.uuid(),
            name: faker.commerce.department(),
            createdAt: Date.now(),
            updatedAt: Date.now(),
        }
        categoryList.push(category)
    })
    return categoryList
}
const randomProductList = (categoryList, numOfProduct) => {
    if (numOfProduct <= 0) return [];
    const productList = [];

    for (const category of categoryList) {
        Array.from(new Array(numOfProduct)).forEach(() => {
            const product = {
                categoryId: category.id,
                id: faker.random.uuid(),
                name: faker.commerce.productName(),
                color: faker.commerce.color(),
                price: Number.parseFloat(faker.commerce.price()),
                description: faker.commerce.productDescription(),
                createdAt: Date.now(),
                updatedAt: Date.now(),
                thumbnailUrl: faker.image.imageUrl(400, 400),
            }
            productList.push(product);
        })
    }

    return productList
}


(() => {
    const categoryList = randomCategoryList(4);
    const productList = randomProductList(categoryList, 5);
    const db = {
        categories: categoryList,
        products: productList,
        profile: { name: "Travis Phan" }
    }
    fs.writeFile("db.json", JSON.stringify(db), () => { console.log("Generate data successfully!!!") })
})()
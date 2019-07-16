export const productDataTransformer = data => {
    return data.map(item => {
        return {
            id: item.id,
            productname: item.productName
        };
    });
};

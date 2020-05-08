// eslint-disable-next-line import/prefer-default-export
export const imageUrlWorks = (imgUrl) => { // logic from https://stackoverflow.com/questions/9714525/javascript-image-url-verify
    if (imgUrl !== undefined) {
        return (imgUrl.match(/\.(jpeg|jpg|gif|png)$/) != null);
    } else {
        return null;
    }
};

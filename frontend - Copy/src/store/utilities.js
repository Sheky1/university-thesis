export const fileToBase64 = (files) => {
    return new Promise((resolve) => {
        const file = files;
        const reader = new FileReader();
        // Read file content on file loaded event
        reader.onload = (event) => {
            resolve(event.target.result);
        };
        // Convert data to base64
        reader.readAsDataURL(file);
    });
};

export const handleErrors = (error) => {
    error.response && error.response !== null && error.response !== undefined
        ? console.log(Object.values(error.response.data.errors)[0][0])
        : console.log(error);
    if (
        error.response &&
        error.response !== null &&
        error.response !== undefined &&
        Object.values(error.response.data.errors)[0][0] !== undefined
    ) {
        return Object.values(error.response.data.errors)[0][0];
    } else return null;
};

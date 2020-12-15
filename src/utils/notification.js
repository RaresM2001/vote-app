const notifySuccess = (title, message, vuesax) => {
    vuesax.notification({
        progress: "auto",
        color: "success",
        position: "top-right",
        title: title,
        text: message,
    });
}

const notifyFail = (title, message, vuesax) => {
    vuesax.notification({
        progress: "auto",
        color: "danger",
        position: "top-right",
        title: title,
        text: message,
    });
}

export default {
    notifyFail,
    notifySuccess
}
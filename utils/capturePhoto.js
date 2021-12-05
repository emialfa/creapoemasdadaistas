import domtoimage from 'dom-to-image';

export async function capturePhoto(e, text) {
    var test = document.getElementById("blanksheet");
    const photo = await domtoimage.toPng(test).then(function (dataUrl) {
        var img = new Image();
        img.src = dataUrl;
    return img
});
return photo;
};
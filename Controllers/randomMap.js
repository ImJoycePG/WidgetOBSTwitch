const imageList = [
    'Ascent.webp',
    'Bind.webp',
    'Breeze.webp',
    'Fracture.webp',
    'Haven.webp',
    'Icebox.webp',
    'Lotus.webp',
    'Pearl.webp',
    'Split.webp'
];

let selectedMap = getRandomMap();

function getRandomMap() {
    const randomIndex = Math.floor(Math.random() * imageList.length);
    const randomImage = imageList[randomIndex];

    const imageFormat = `${randomImage}`;
    const nameMap = randomImage.split(".")[0];

    return {imageFormat, nameMap};
}

function getMapSelect() {
    return selectedMap;
}

function setMapSelect(map) {
    selectedMap = map;
}

module.exports = {
    getRandomMap,
    getMapSelect,
    setMapSelect
};

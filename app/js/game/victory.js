let victory = function (field, countShip) {
    let hitShips = 0;
   field.forEach(function (item) {
        if (item.ship == true && item.hit == true) {
            hitShips += 1;
        }
    });
    if (hitShips == countShip) {
        return true;
    }
    else{
        return false;
    }
};

export default victory;
function createExplosion(x, y, sizeX, sizeY, color) {
    const explosion = document.createElement('div');
    document.body.appendChild(explosion);
    explosion.setAttribute("class", "explosion");

    explosion.style.left = `${Math.ceil(x - (sizeX / 2))}px`;
    explosion.style.top = `${Math.ceil(y - (sizeY / 2))}px`;
    explosion.style.width = `${sizeX}px`;
    explosion.style.height = `${sizeY}px`;
    explosion.style.backgroundColor = color;

    setTimeout(() => explosion.remove(), 550);
}

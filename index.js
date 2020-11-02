import { Tilestream } from './src/Tilestream.js';
import { Tile } from './src/Tile.js';

var demoTiles = [
    new Tile('./demo/city1.jpg', 'City Demo 1', 'City Demo 1'),
    new Tile('./demo/city2.jpg', 'City Demo 2', 'City Demo 2'),
    new Tile('./demo/city5.jpg', 'City Demo 5', 'City Demo 5'),
    new Tile('./demo/city4.jpg', 'City Demo 4', 'City Demo 4'),
    new Tile('./demo/city3.jpg', 'City Demo 3', 'City Demo 3'),
    new Tile('./demo/city6.jpg', 'City Demo 6', 'City Demo 6'),
    new Tile('./demo/city7.jpg', 'City Demo 7', 'City Demo 7'),
    new Tile('./demo/city8.jpg', 'City Demo 8', 'City Demo 8'),
    new Tile('./demo/city9.jpg', 'City Demo 9', 'City Demo 9')
]

var demoStream = new Tilestream(demoTiles);

demoStream.render(document.getElementById('stream'));

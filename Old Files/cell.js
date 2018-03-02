// Minersweeper Game Adv Higher Project
// Stephen Graham
function Tile(i, j, tileLength) {     // Tile Class Definition

//Constructor for Tile Class properties

  this.i = i;              //columns definition
  this.j = j;              //rows definition
  this.x = tileLength * i;          //x-axis definition
  this.y = tileLength * j;          //y-axis definition
  this.tileLength = tileLength;     //Tile's Length definition
  this.noNeighbours = 0;  //No. Neighbours definition
  this.revealed = false;    //Revealed State definition
  this.flagged = false;
  this.mine = false;
}


Tile.prototype.reveal = function() {
  if (this.flagged === false) {
     this.revealed = true;   // Reveals a tile if not flagged
     unopened-- // decrements the unopened variable each time a tile is revealed
     if (this.mine === false) {
     score++  //increments the score each time a tile is revealed that isn't a mine
    }
  if (timerStart === false) {
    timerStart = true;
    startTimer();

    }
  }      
   if (this.noNeighbours === 0) {
    this.floodFill();
   }
}

Tile.prototype.contains = function(x, y) {
  return (x > this.x && x < this.x + this.tileLength && y > this.y && y < this.y + this.tileLength);         //returns the value of the current position
}


Tile.prototype.show = function() {
  stroke(0);                                                  // Defines the black border for each cell
  noFill();                                                   // Prevents the entire cell from being filled with a specific colour
  rect(this.x, this.y, this.tileLength, this.tileLength);     // draws a rectangle for each cell
  if (this.flagged) {
    fill(178,34,34);
    ellipse(this.x + this.tileLength * 0.5, this.y + this.tileLength * 0.5, this.tileLength * 0.75, this.tileLength * 0.75);
  }

  if (this.revealed) {
    if (this.mine) {
      fill(127);
      ellipse(this.x + this.tileLength * 0.5, this.y + this.tileLength * 0.5, this.tileLength * 0.75, this.tileLength * 0.75); //draw ellipse if the revealed tile contains a mine
    } else {

      fill(200);
      rect(this.x, this.y, this.tileLength, this.tileLength);
      if (this.noNeighbours > 0) {
        textAlign(CENTER);
        fill(0);
        text(this.noNeighbours, this.x + this.tileLength * 0.5, this.y + this.tileLength - 5); // Fills the tile with the number of surrounding mines
      }
      }
     }
    }
  

Tile.prototype.getNeighbours = function() {
  if (this.mine) {
    this.noNeighbours = -1;      // Returns -1 so that mines themselves aren't accounted as neigbours
    return;
  }
  var total = 0;
  for (var xoffset = -1; xoffset <= 1; xoffset++) {    
    var i = this.i + xoffset;              // Calculates x -offset
    if (i < 0 || i >= cols) continue;   // Checks to ensure tile is on grid

    for (var yoffset = -1; yoffset <= 1; yoffset++) {
      var j = this.j + yoffset;              // Calculates y-offset
      if (j < 0 || j >= rows) continue;   // Checks to ensure tile is on grid


      var neighbour = grid[i][j];
      if (neighbour.mine) {
        total++;    //increments the total if a neighbour is a bee
      }
    }
  }
  this.noNeighbours  = total;
}

Tile.prototype.floodFill = function() {

   for (var xoffset = -1; xoffset <= 1; xoffset++) {
    var i = this.i + xoffset;
    if (i < 0 || i >= cols) continue;

    for (var yoffset = -1; yoffset <= 1; yoffset++) {
      var j = this.j + yoffset;
      if (j < 0 || j >= rows) continue;


      var floodCells = grid[i][j];
      if (floodCells.revealed === false) {
        floodCells.reveal();
      }
     }
    }
  }

Tile.prototype.flagTile = function() {
  this.flagged = true;
}

Tile.prototype.unflag = function() {
  this.flagged = false;
}

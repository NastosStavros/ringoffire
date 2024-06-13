import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Game } from '../../models/game';
import { PlayerComponent } from '../player/player.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { GameInfoComponent } from '../game-info/game-info.component';



@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule, PlayerComponent, MatButtonModule, MatIconModule, GameInfoComponent],
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'] // styleUrl -> styleUrls
})
export class GameComponent implements OnInit {
  pickCardAnimation = false;
  currentCard = '';
  game!: Game;
  constructor(public dialog: MatDialog) {

  }


  ngOnInit(): void {
    this.newgame();
  }

  newgame() {
    this.game = new Game();
    console.log(this.game);
  }

  takeCard() {
    if (!this.pickCardAnimation) {
      const card = this.game.stack.pop();
      if (card !== undefined) {
        this.currentCard = card;
        console.log(this.currentCard);
        this.pickCardAnimation = true;

        this.game.currentPlayer = (this.game.currentPlayer + 1) % this.game.players.length;

        setTimeout(() => {
          if (this.currentCard) { // Sicherstellen, dass currentCard nicht undefined ist
            this.game.playedCards.push(this.currentCard);
            console.log(this.game);
          }
          this.pickCardAnimation = false;
        }, 1250);
      }
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);

    dialogRef.afterClosed().subscribe(name => {
      if (name && name.length > 0) {
        this.game.players.push(name);
      }
    });
  }
}



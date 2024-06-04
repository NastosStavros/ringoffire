import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Game } from '../../models/game';
import { PlayerComponent } from '../player/player.component';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { MatDialogModule } from '@angular/material/dialog';
import { AppComponent } from '../app.component';






@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule, PlayerComponent, MatButtonModule, MatIconModule, AppComponent],
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'] // styleUrl -> styleUrls
})
export class GameComponent implements OnInit {
  pickCardAnimation = false;
  currentCard: string | undefined = '';
  game!: Game;
  constructor( public dialog: MatDialog) { 
    
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
      this.currentCard = this.game.stack.pop();
      console.log(this.currentCard);
      this.pickCardAnimation = true;

      setTimeout(() => {
        if (this.currentCard) { // Sicherstellen, dass currentCard nicht undefined ist
          this.game.playedCards.push(this.currentCard);
          console.log(this.game);
        }
        this.pickCardAnimation = false;
      }, 1250);
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}



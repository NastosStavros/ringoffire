import { Component, Input } from '@angular/core';
import { GameComponent } from '../game/game.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-player',
  standalone: true,
  imports: [GameComponent, CommonModule],
  templateUrl: './player.component.html',
  styleUrl: './player.component.scss'
})
export class PlayerComponent {
  @Input() name!: string;
  @Input() playerActive: boolean = false;
}

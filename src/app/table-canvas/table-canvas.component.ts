
import { Component, ElementRef, Input, OnInit, ViewChild, Renderer2 } from '@angular/core';
import { HashTableService } from '../hash-table.service';

@Component({
  selector: 'app-table-canvas',
  templateUrl: './table-canvas.component.html',
  styleUrls: ['./table-canvas.component.scss']
})
export class TableCanvasComponent implements OnInit {
  @ViewChild('canvas', { static: true }) canvas!: ElementRef<HTMLCanvasElement>;
  private ctx!: CanvasRenderingContext2D;

  @Input() table!: Array<string>[];

  private animatingKey: string | null = null;
  private animatingIndex: number = -1;
  private animatingChainPosition: number = -1;
  private currentX: number = 0;
  private currentY: number = 0;
  private targetX: number = 0;
  private targetY: number = 0;
  private movingToIndex: boolean = true;
  private animationStep: number = 0;
  private animationRequestId: number | null = null;

  private CELL_WIDTH = 100;
  private CELL_HEIGHT = 20;
  private PADDING = 5;
  private ANIMATION_STEPS = 20;

  constructor(private renderer: Renderer2) {}

  ngOnInit(): void {
    this.ctx = this.canvas.nativeElement.getContext('2d') as CanvasRenderingContext2D;
    this.drawTable();
  }

  ngOnChanges(): void {
    this.drawTable();
  }

  drawTable(): void {
    const canvas = this.canvas.nativeElement;
    this.ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < this.table.length; i++) {
      let x = this.PADDING;
      const y = i * (this.CELL_HEIGHT + this.PADDING) + this.PADDING;

      this.ctx.strokeStyle = 'blue';
      this.ctx.strokeRect(x, y, this.CELL_WIDTH, this.CELL_HEIGHT);
      this.ctx.strokeText(String(i), x + this.PADDING, y + this.CELL_HEIGHT / 2 + this.PADDING);

      for (let j = 0; j < this.table[i].length; j++) {
        const previousX = x;
        x += this.CELL_WIDTH + this.PADDING;
        this.ctx.strokeRect(x, y, this.CELL_WIDTH, this.CELL_HEIGHT);
        this.ctx.strokeText(this.table[i][j], x + this.PADDING, y + this.CELL_HEIGHT / 2 + this.PADDING);
        this.ctx.beginPath();
        this.ctx.moveTo(previousX + this.CELL_WIDTH, y + this.CELL_HEIGHT / 2);
        this.ctx.lineTo(x, y + this.CELL_HEIGHT / 2);
        this.ctx.stroke();
      }

      if (this.table[i].length > 0) {
        const previousX = x;
        x += this.CELL_WIDTH + this.PADDING;
        this.ctx.beginPath();
        this.ctx.moveTo(previousX + this.CELL_WIDTH, y + this.CELL_HEIGHT / 2);
        this.ctx.lineTo(x, y + this.CELL_HEIGHT / 2  );
        this.ctx.stroke();

        this.ctx.beginPath();
        this.ctx.moveTo(x, y + this.PADDING);
        this.ctx.lineTo(x, y + this.CELL_HEIGHT - this.PADDING -5);
        this.ctx.stroke();

        this.ctx.beginPath();
        this.ctx.moveTo(x, y + this.PADDING);
        this.ctx.lineTo(x, y + this.CELL_HEIGHT - this.PADDING -5 + 11);
        this.ctx.stroke();

        this.ctx.beginPath();
        this.ctx.moveTo(x, y + this.PADDING);
        this.ctx.lineTo(x, y + this.CELL_HEIGHT - this.PADDING -15);
        this.ctx.stroke();




        // Draw the three lines
        this.ctx.beginPath();
        this.ctx.moveTo(x, y + this.PADDING );
        this.ctx.lineTo(x + 10, y + this.CELL_HEIGHT - this.PADDING);
        this.ctx.stroke();

        this.ctx.beginPath();
        this.ctx.moveTo(x + 10 , y + this.PADDING + 20  );
        this.ctx.lineTo(x , y + this.CELL_HEIGHT - this.PADDING);
        this.ctx.stroke();
      }
    }

    if (this.animatingKey !== null) {
      this.ctx.fillStyle = 'black';
      this.ctx.fillText(this.animatingKey, this.currentX + this.PADDING, this.currentY + this.CELL_HEIGHT / 2 + this.PADDING);
    }
  }

  startAnimation(key: string, index: number): void {
    this.animatingKey = key;
    this.animatingIndex = index;
    this.animatingChainPosition = this.table[index].length;
    this.animationStep = 0;

    this.currentX = this.PADDING;
    this.currentY = -this.CELL_HEIGHT;
    this.targetX = this.PADDING + (this.CELL_WIDTH + this.PADDING);
    this.targetY = index * (this.CELL_HEIGHT + this.PADDING) + this.PADDING;
    this.movingToIndex = true;

    if (this.animationRequestId !== null) {
      cancelAnimationFrame(this.animationRequestId);
    }

    this.animate();
  }

  animate(): void {
    if (this.animationStep < this.ANIMATION_STEPS) {
      this.currentX += (this.targetX - this.currentX) / (this.ANIMATION_STEPS - this.animationStep + 1);
      this.currentY += (this.targetY - this.currentY) / (this.ANIMATION_STEPS - this.animationStep + 1);
      this.drawTable();
    } else {
      if (this.movingToIndex) {
        this.movingToIndex = false;
        this.animationStep = 0;
        this.targetX = this.PADDING + (this.CELL_WIDTH + this.PADDING) * (this.animatingChainPosition + 1);
      } else {
        this.currentX += (this.targetX - this.currentX) / (this.ANIMATION_STEPS - this.animationStep + 1);
        if (this.animationStep >= this.ANIMATION_STEPS) {
          if (!this.table[this.animatingIndex].includes(this.animatingKey!)) {
            this.table[this.animatingIndex].push(this.animatingKey!);
          }
          this.animatingKey = null;
          this.drawTable();
          return;
        }
      }
    }

    this.animationStep++;
    this.animationRequestId = requestAnimationFrame(() => this.animate());
  }
}

import { DOCUMENT } from '@angular/common';
import { Component, DestroyRef, ElementRef, inject, signal, viewChild } from '@angular/core';
import { VisualPreferences } from '../../core/services/visual-preferences';

@Component({
  selector: 'app-visual-settings',
  imports: [],
  templateUrl: './visual-settings.html',
  styleUrl: './visual-settings.css',
})
export class VisualSettings {
  readonly preferences = inject(VisualPreferences);
  readonly isOpen = signal(false);

  private readonly document = inject(DOCUMENT);
  private readonly dialog = viewChild.required<ElementRef<HTMLDialogElement>>('settingsDialog');
  private readonly trigger = viewChild.required<ElementRef<HTMLButtonElement>>('settingsTrigger');
  private previousOverflow: string | null = null;

  constructor() {
    inject(DestroyRef).onDestroy(() => {
      if (this.isOpen()) this.dialog().nativeElement.close();
      this.restoreScroll();
    });
  }

  open(): void {
    if (this.isOpen()) return;

    this.previousOverflow = this.document.body.style.overflow;
    this.document.body.style.overflow = 'hidden';
    this.dialog().nativeElement.showModal();
    this.isOpen.set(true);
  }

  close(): void {
    if (!this.isOpen()) return;

    this.dialog().nativeElement.close();
    this.onClosed();
  }

  onClosed(): void {
    if (!this.isOpen() || this.dialog().nativeElement.open) return;

    this.isOpen.set(false);
    this.restoreScroll();
    this.trigger().nativeElement.focus({ preventScroll: true });
  }

  onCancel(event: Event): void {
    event.preventDefault();
    this.close();
  }

  onBackdropClick(event: MouseEvent): void {
    const dialog = this.dialog().nativeElement;
    if (event.target !== dialog) return;

    const rect = dialog.getBoundingClientRect();
    if (
      event.clientX < rect.left || event.clientX > rect.right ||
      event.clientY < rect.top || event.clientY > rect.bottom
    ) {
      this.close();
    }
  }

  private restoreScroll(): void {
    if (this.previousOverflow === null) return;

    this.document.body.style.overflow = this.previousOverflow;
    this.previousOverflow = null;
  }
}

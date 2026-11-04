import { DOCUMENT } from '@angular/common';
import { Component, AfterViewInit, ElementRef, OnDestroy, ViewChild, computed, inject, input, output, signal } from '@angular/core';
import type { ProjectDetails } from '../../core/models/project';

@Component({
  selector: 'app-modal',
  imports: [],
  templateUrl: './modal.html',
  styleUrl: './modal.css',
})

export class Modal implements AfterViewInit, OnDestroy {
  readonly project = input.required<ProjectDetails>();
  readonly closed = output<void>();

  readonly imageIndex = signal(0);

  readonly currentImage = computed(
    () => this.project().images[this.imageIndex()]
  );

  @ViewChild('dialog', { static: true })
  private dialog!: ElementRef<HTMLDialogElement>;

  private readonly document = inject(DOCUMENT);

  private previousOverflow = '';
  private opener: HTMLElement | null = null;

  ngAfterViewInit(): void {
    this.opener = this.document.activeElement as HTMLElement | null;
    this.previousOverflow = this.document.body.style.overflow;

    this.document.body.style.overflow = 'hidden';
    this.dialog.nativeElement.showModal()
  }

  changeImage(direction: number, event?: Event): void {
    event?.preventDefault();

    const total = this.project().images.length;

    if (total < 2) return

    this.imageIndex.update(
      (index) => (index + direction + total) % total
    );
  }

  closeModal(): void {
    this.closed.emit();
  }

  onCancel(event: Event): void {
    event.preventDefault();
    this.closeModal();
  }

  onBackdropClick(event: MouseEvent): void {
    const dialog = this.dialog.nativeElement;

    if (event.target !== dialog) return;

    const rect = dialog.getBoundingClientRect();

    const clickedOutside =
      event.clientX < rect.left ||
      event.clientX > rect.right ||
      event.clientY < rect.top ||
      event.clientY > rect.bottom;

      if (clickedOutside) this.closeModal();
  }

  ngOnDestroy(): void {
    this.dialog.nativeElement.close();
    this.document.body.style.overflow = this.previousOverflow;
    this.opener?.focus();
  }
}
